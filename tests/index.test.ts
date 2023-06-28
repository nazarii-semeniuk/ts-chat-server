import supertest from 'supertest';
import application from '../src/index';
const app = application.app;
console.log(app)
import * as db from './db';
const request = supertest(app);

describe('Index', () => {

    beforeAll(async () => {
        await db.connect();
    });

    beforeEach(async () => {
        await db.clearDatabase();
    });

    afterAll(async () => {
        await db.closeDatabase();
    });

    describe('GET /', () => {
        
        test('It should respond with a 200 status code', async () => {
            const response = await request.get('/');
            expect(response.status).toBe(200);
        });

    });

});