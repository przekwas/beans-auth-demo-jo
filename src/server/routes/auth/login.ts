import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../../config';

const router = express.Router();

const userid = 69;
const email = 'test@test.com';
const password = 'password123';

const checkCredentials = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	// lookup email in db
	if (req.body.email !== email) {
		res.status(401).json({ msg: 'fuck you' });
		return;
	}

	// bcrypt call
	if (req.body.password !== password) {
		res.status(401).json({ msg: 'fuck you' });
		return;
	}

    // done(null, user);
    //@ts-ignore
    req.payload = {
        userid,
        email
    };

    // go to the route logic
	next();
};

// POST /auth/login/
// { email: string, password: string }
router.post('/', checkCredentials, (req: any, res) => {

	const token = jwt.sign(req.payload, config.jwt.secret as string);
	res.json({ msg: 'login successful', token });

});

export default router;
