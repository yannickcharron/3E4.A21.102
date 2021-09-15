import express from 'express';
import dayjs from 'dayjs';

import database from './libs/database.js';

import methodMiddleware from './middlewares/method.js';
import errorMiddleware from './middlewares/errors.js';

import planetsRoutes from './routes/planets.routes.js';
import elementsRoutes from './routes/elements.routes.js';

database();

const app = express();

app.use(express.json());
app.use(methodMiddleware);

app.use('/planets', planetsRoutes);
app.use('/elements', elementsRoutes);

app.use(errorMiddleware);

export default app;