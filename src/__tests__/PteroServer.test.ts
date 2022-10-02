import { PteroServer } from '..';
import 'dotenv/config';

test('PteroServer ServerData', async () => {
	const server = new PteroServer(process.env.TEST_SERVER_ID);
	server.authorize(process.env.API_KEY);

	const serverData = await server.getServerData().catch();
	expect(serverData).toBeDefined();
});

test('PteroServer ServerDataAccount', async () => {
	const server = new PteroServer(process.env.TEST_SERVER_ID);
	server.authorize(process.env.API_KEY);

	const accountData = await server.getAccountData().catch();
	expect(accountData).toBeDefined();
});

test('PteroServer StatusData', async () => {
	const server = new PteroServer(process.env.TEST_SERVER_ID);
	server.authorize(process.env.API_KEY);

	const statusData = await server.getStatusData().catch();
	expect(statusData).toBeDefined();
});

test('PteroServer GameData', async () => {
	const server = new PteroServer(process.env.TEST_SERVER_ID);
	server.authorize(process.env.API_KEY);

	const gameData = await server.getGameData().catch();
	expect(gameData).toBeDefined();
});

test('PteroServer SocketData', async () => {
	const server = new PteroServer(process.env.TEST_SERVER_ID);
	server.authorize(process.env.API_KEY);

	const gameData = await server.getSocketData().catch();
	expect(gameData).toBeDefined();
});

test('PteroServer ActivityData', async () => {
	const server = new PteroServer(process.env.TEST_SERVER_ID);
	server.authorize(process.env.API_KEY);

	const gameData = await server.getActivityData().catch();
	expect(gameData).toBeDefined();
});