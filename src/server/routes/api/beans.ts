import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../../config';

const router = express.Router();

const beans = ['can o beans 1', 'can o beans 2', 'can o beans 3'];

const checkToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	// so, no head? *snaps skateboard*
	if (!req.headers.authorization) {
		res.status(401).json({ msg: 'fuck you' });
		return;
	}

	// not following the correct "protocol" or "scheme"
	if (req.headers.authorization?.split(' ')[0] !== 'Bearer') {
		res.status(401).json({ msg: 'fuck you' });
		return;
	}

    try {

        const payload = jwt.verify(req.headers.authorization?.split(' ')[1], config.jwt.secret as string);
        //@ts-ignore
        req.user = payload;
        next();

    } catch (error) {
        console.log(error);
		res.status(500).json({ msg: 'my code sucks', error: error.message });
        return;
    }
};

// GET /api/beans/
router.get('/', checkToken, (req: any, res) => {
	res.json({ msg: `thank you user ${req.user.userid}, here are the beans`, beans });
});

export default router;



/*
router.delete('/:blogid', checkToken, async (req, res) => {
    try {
        await db.blogs.destroy(req.params.blogid, req.user.userid);
        SELECT * FROM blogs WHERE id = ? AND authorid = ?
        res.json('deleted!');
    } catch (error) {
        console.log(error);
		res.status(500).json({ msg: 'my code sucks', error: error.message });
        return;
    }
});
*/
