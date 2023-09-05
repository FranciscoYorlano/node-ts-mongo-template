import { Request, Response, Router } from 'express';
import { errorMessages } from '../../../utils/bug_tracking/bug_tracking.messages';
import { errorResponse } from '../../response';
import authRouter from './auth.router';
import apiRouter from './api.router';

const routerv1 = Router();

routerv1.use('/api', apiRouter);
routerv1.use('/auth', authRouter);

/**
 * Not found
 */
routerv1.use('*', (req: Request, res: Response) => {
    errorResponse(res, errorMessages.NOT_FOUND, null);
});

export default routerv1;
