import Request from 'supertest';
import Path from 'path';
import Server from '../src/app';

describe('Routes Upload - Test', () => {
    it('Upload - Without Image', async () => {
        const request = await Request(Server).post('/api/upload');
        expect(request.statusCode).toEqual(400);
    });

    it('Upload - with extname wrong', async () => {
        const potateTxt = Path.join(__dirname, 'assets/potate.txt');
        const request = await Request(Server)
            .post('/api/upload')
            .attach('file', potateTxt);

        expect(request.body).toHaveProperty('message');
        expect(request.body).toHaveProperty('FilesTypeAccept');
        expect(request.statusCode).toEqual(400);
    });

    it('Upload - with extname correct', async () => {
        const potateJpg = Path.join(__dirname, 'assets/potate.jpg');
        const request = await Request(Server)
            .post('/api/upload')
            .attach('file', potateJpg);

        expect(request.statusCode).toEqual(204);
    });
});
