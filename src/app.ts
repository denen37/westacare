import express from 'express';
import db from './config/db';
import cors from 'cors';
import config from './config/configSetup';
import { isAuthorized } from './middleware/authorize';
import routes from './routes/routes';
import { initializeReminders } from './services/reminder';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    res.send('Hello, TypeScript!');
});

app.all('*', isAuthorized);
app.use('/api', routes);

initializeReminders();

db.sync({ alter: true }).then(() => {
    app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));
})
    .catch(err => console.error('Error connecting to the database', err));

