import App from './app';
import { SERVER_PORT, NODE_ENV } from './config';

const app = new App(
    [],
    SERVER_PORT
);

if(NODE_ENV !== 'test') {
    app.listen();
}

export default app;