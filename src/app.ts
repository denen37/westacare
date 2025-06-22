import express from 'express';
import db from './config/db';
import cors from 'cors';
import config from './config/configSetup';
import { isAuthorized } from './middleware/authorize';
import routes from './routes/routes';
import { initializeReminders } from './services/reminder';
import { logRoutes } from './middleware/logRoutes';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use(logRoutes);

app.get('/', (req, res) => {
    res.send('Hello world! The API is working.');
});

app.all('*', isAuthorized);
app.use('/api', routes);


db.sync({ alter: true }).then(() => {
    app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));
    initializeReminders();
})
    .catch(err => console.error('Error connecting to the database', err));

