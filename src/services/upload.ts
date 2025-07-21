
// import { NextFunction, Request, Response } from 'express';
// import config from '../config/configSetup';
const cloudinary = require('cloudinary').v2
import { randomUUID } from "crypto";
import multer from "multer";
const fs = require('fs')
const path = require('path')



// cloudinary configuration
cloudinary.config({
    cloud_name: 'dqth56myg',
    api_key: '774921177923962',
    api_secret: 'dDUKTJBycDHC4gjOKZ9UAHw8SAM'
});


const pathExistsOrCreate = (folder: string): string => {
    let filepath: string = path.resolve(__dirname, '../../public/', folder)
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
        console.log(`Directory created: ${filepath}`);
    }

    return filepath;
};



const storeImage = () => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            switch (file.fieldname) {
                case 'avatar':
                    cb(null, pathExistsOrCreate('uploads/avatars'));
                    break;
                case 'file':
                    cb(null, pathExistsOrCreate('uploads/documents'));
                    break;
                default:
                    cb(new Error('Invalid field name'), '');
            }
        },
        filename: (req, file, cb) => {
            let filename = randomUUID() + '.' + file.mimetype.split('/')[1];
            cb(null, filename.replace(/\s+/g, ''))
        }
    });
}



export const uploads = multer({
    storage: storeImage(),
})


// const storage = multer.memoryStorage();

// export const uploads = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB
// });



export const upload_cloud = async (path: string) => {
    const result = await cloudinary.uploader.upload(path, { resource_type: 'auto' })
    console.log(result.secure_url)
    return result.secure_url;
}
