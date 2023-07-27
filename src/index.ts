import App from './app';
import { SERVER_PORT, NODE_ENV } from './config';

import AuthController from './Auth/AuthController';

const app = new App(
    [new AuthController()],
    SERVER_PORT
);

if(NODE_ENV !== 'test') {
    app.listen();
}

export default app;