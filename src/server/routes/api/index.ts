import * as express from 'express';
import beansRouter from './beans';

const router = express.Router();

router.use('/beans', beansRouter);

export default router;