import { Router } from 'express';
import StationRouter from './stationRoute.js';
import MyBikeRouter from './myBikeRoute.js';
import UserRouter from './UserRoute.js';
const router = Router();
router.use('/', StationRouter);
router.use('/', MyBikeRouter);
router.use('/', UserRouter);
export default router;