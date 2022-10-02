import { PteroServer, PteroSocket } from '..';
import 'dotenv/config';

test('PteroSocket', async () => {
	const server = new PteroServer(process.env.TEST_SERVER_ID);
	server.authorize(process.env.API_KEY);

	const socket = new PteroSocket(server);
	await socket.connect();

	expect(socket.socket).toBeDefined();
});