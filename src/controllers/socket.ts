import { Server, Socket } from "socket.io";
import { Emit, Listen } from "../utils/events";
import { Message, ChatRoom, OnlineStatus, User, Provider, Specialization, Seeker } from "../models/Models"
import { Op } from "sequelize";
import { randomId } from "../utils/modules";
import http from "http";
import path from "path";
import fs from "fs";
import { decryptMessage, encryptMessage } from "../utils/cryptography";
import { UserRole } from "../utils/enum";
import { sendPushNotification } from "../services/notification";
import { socketAuthorize } from "../middleware/authorize";

export interface ChatMessage {
    to: string;
    from: string;
    text: string;
    room: string;
}

export const sendMessage = async (io: Server, socket: Socket, data: ChatMessage) => {

    let room = await ChatRoom.findOne({
        where: {
            name: data.room
        }
    })

    if (!room) {
        return
    }

    const message = await Message.create({
        text: encryptMessage(data.text),
        from: data.from,
        timestamp: new Date(),
        chatroomId: room?.id
    })

    let to = room.members.split(",").filter((member) => member !== data.from)[0];

    let otherUser = await User.findOne({
        where: {
            id: to
        },
        include: [OnlineStatus]
    })

    if (otherUser && !otherUser.onlineStatus.isOnline) {
        //send push notification
        let user = await User.findOne({
            where: {
                userId: data.from
            },
        })

        let profile;

        if (user?.role === UserRole.SEEKER) {
            profile = await Seeker.findOne({
                where: {
                    userId: user.id
                }
            })
        }
        else {
            profile = await Provider.findOne({
                where: {
                    userId: user?.id
                }
            })
        }

        await sendPushNotification(
            otherUser.deviceToken,
            `${profile?.firstName} ${profile?.lastName} sent you a message`,
            data.text,
            {}
        )
    }

    io.to(room.name).emit(Emit.RECV_MSG, { ...data, timestamp: message.timestamp });
}

export const onConnect = async (socket: Socket) => {
    console.log('a user connected', socket.id);

    const [onlineStatus, created] = await OnlineStatus.findOrCreate({
        where: { userId: socket.user.id },
        defaults: {
            socketId: socket.id,
            lastActive: new Date(),
            isOnline: true,
        }
    })

    if (!created) {
        onlineStatus.socketId = socket.id;
        onlineStatus.lastActive = new Date();
        onlineStatus.isOnline = true;
        await onlineStatus.save();
    }

    //global.onlineUsers[socket.user.id] = socket.id

    const chatrooms = await ChatRoom.findAll({
        where: {
            members: {
                [Op.like]: `%${socket.user.id}%`
            }
        }
    })

    chatrooms.forEach(async (chatroom) => {
        socket.join(chatroom.name)
    })

    //emit latest job
    //await emitLatestJob(io, socket);
}


export const onDisconnect = async (socket: Socket) => {
    console.log(`User disconnected: ${socket.id}`);

    const onlineStatus = await OnlineStatus.findOne({ where: { userId: socket.user.id } });
    if (onlineStatus) {
        onlineStatus.isOnline = false;
        onlineStatus.lastActive = new Date();
        await onlineStatus.save();
    }
}

export const getContacts = async (io: Server, socket: Socket) => {
    let token = socket.handshake.auth.token;
    const user = socket.user;

    if (!user) {
        return
    }

    let contacts
    if (user.role === UserRole.SEEKER) {
        contacts = await User.findAll({
            attributes: { exclude: ['password'] },
            where: {
                [Op.and]: [
                    { role: UserRole.PROVIDER },
                    { [Op.not]: [{ id: user.id }] }
                ],
            },
            include: [{
                model: Provider,
                include: [{
                    model: Specialization
                }]
            }]
        })
    } else if (user.role === UserRole.PROVIDER) {
        contacts = await User.findAll({
            attributes: { exclude: ['password'] },
            where: {
                [Op.and]: [
                    { role: UserRole.SEEKER },
                    { [Op.not]: [{ id: user.id }] }
                ],
            },
            include: [{
                model: Seeker,
            }]
        })
    }

    socket.emit(Emit.ALL_CONTACTS, contacts);
}

export const joinRoom = async (io: Server, socket: Socket, data: any) => {
    //get the ids
    let room = await ChatRoom.findOne({
        where: {
            [Op.and]: [{
                members: {
                    [Op.like]: `%${socket.user.id}%`
                }
            }, {
                members: {
                    [Op.like]: `%${data.contactId}%`
                }
            }],

        }
    })


    if (!room) {
        room = await ChatRoom.create({
            name: randomId(12),
            members: `${socket.user.id},${data.contactId}`
        })
    }

    const existingRoom = io.of("/").adapter.rooms.get(room.name);

    if (!existingRoom?.has(socket.id))
        socket.join(room.name);

    const onlineStatus = await OnlineStatus.findOne({
        where: {
            userId: data.contactId
        }
    })

    if (onlineStatus) {
        const sid = onlineStatus.socketId;

        if (sid && !existingRoom?.has(sid)) {
            const userSocket = io.sockets.sockets.get(sid);

            userSocket?.join(room.name);
        }

    }

    io.to(room.name).emit(Emit.JOINED_ROOM, room.name);

    console.log("joined room", room.name);
}

export const getMsgs = async (io: Server, socket: Socket, data: any) => {
    const chatroom = await ChatRoom.findOne({
        where: {
            name: data.room
        },
        include: [{
            model: Message,
        }]
    })

    const members = chatroom?.members.split(",");

    const normalizedMessages: any[] = []

    chatroom?.messages.forEach((msg) => {
        normalizedMessages.push({
            to: members?.filter((member) => Number(member) !== msg.from)[0],
            from: msg.from,
            text: decryptMessage(msg.text),
            timestamp: msg.timestamp,
        })
    })

    io.to(data.room).emit(Emit.RECV_MSGs, normalizedMessages);
}

export const getPrevChats = async (io: Server, socket: Socket, data: any) => {

    const chatrooms = await ChatRoom.findAll({
        where: {
            members: {
                [Op.like]: `%${socket.user.id}%`
            }
        }
    });

    const partners = chatrooms.map((room) => {
        const members = room.members.split(",");
        return members.filter((member) => member !== socket.user.id)[0];
    })



    const prevChats = await User.findAll({
        attributes: { exclude: ['password'] },
        where: {
            id: partners
        },
        include: [{
            model: Provider,
            include: [{
                model: Specialization
            }]
        }, {
            model: OnlineStatus
        }]
    })

    socket.emit(Emit.GOT_PREV_CHATS, prevChats);
}


export const uploadFile = async (io: Server, socket: Socket, data: any) => {
    const { image, fileName } = data;
    const uploadDir = path.join(__dirname, "../../public/uploads");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const fileExt = path.extname(fileName).toLowerCase();

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const documentExtensions = [".pdf", ".doc", ".docx", ".txt", ".xlsx"];

    let tag = ""
    if (imageExtensions.includes(fileExt)) {
        tag = '<img>'
    } else if (documentExtensions.includes(fileExt)) {
        tag = '<doc>'
    }

    const filePath = path.join(uploadDir, `${Date.now()}-${fileName}`);

    fs.writeFile(filePath, Buffer.from(image), async (err) => {
        if (err) {
            console.error("Error saving image:", err);
            return;
        }

        const imageUrl = `/uploads/${path.basename(filePath)}`;
        console.log(`Image saved and broadcasted: ${imageUrl}`);

        let room = await ChatRoom.findOne({
            where: {
                name: data.room
            }
        })

        if (!room) {
            return
        }

        let url = `${tag}${imageUrl}`

        const message = await Message.create({
            text: encryptMessage(url),
            from: data.from,
            timestamp: new Date(),
            chatroomId: room?.id
        })

        io.to(room.name).emit(Emit.RECV_FILE, { ...message.dataValues, text: url });
    });
}