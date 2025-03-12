// src/app.ts
import express from 'express';
import db from './config/db';
import cors from 'cors';
import config from './config/configSetup';
import { isAuthorized } from './middleware/authorize';
import authRoutes from './routes/auth';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    res.send('Hello, TypeScript!');
});

app.all('*', isAuthorized);
app.use('/api', authRoutes);

db.sync({ alter: true }).then(() => {
    app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));
})
    .catch(err => console.error('Error connecting to the database', err));

