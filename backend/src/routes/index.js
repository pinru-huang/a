import { Router } from 'express';
import StationRouter from './stationRoute.js';
import MyBikeRouter from './myBikeRoute.js'
const router = Router();
router.use('/', StationRouter);
router.use('/', MyBikeRouter)
export default router;