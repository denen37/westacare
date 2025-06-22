"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const configSetup_1 = __importDefault(require("./config/configSetup"));
const authorize_1 = require("./middleware/authorize");
const routes_1 = __importDefault(require("./routes/routes"));
const reminder_1 = require("./services/reminder");
const logRoutes_1 = require("./middleware/logRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true }));
app.use(logRoutes_1.logRoutes);
app.get('/', (req, res) => {
    res.send('Hello world! The API is working.');
});
app.all('*', authorize_1.isAuthorized);
app.use('/api', routes_1.default);
db_1.default.sync({ alter: true }).then(() => {
    app.listen(configSetup_1.default.PORT, () => console.log(`Server is running on http://localhost:${configSetup_1.default.PORT}`));
    (0, reminder_1.initializeReminders)();
})
    .catch(err => console.error('Error connecting to the database', err));
