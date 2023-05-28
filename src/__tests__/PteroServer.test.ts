import { PteroServer, SCPSLGameData } from '..';
import 'dotenv/config';

test('PteroServer ServerData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID!);
  server.authorize(process.env.API_KEY!);

  const serverData = await server.getServerData().catch();
  expect(serverData).toBeDefined();
});

test('PteroServer ServerDataAccount', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID!);
  server.authorize(process.env.API_KEY!);

  const accountData = await server.getAccountData().catch();
  expect(accountData).toBeDefined();
});

test('PteroServer StatusData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID!);
  server.authorize(process.env.API_KEY!);

  const statusData = await server.getStatusData().catch();
  expect(statusData).toBeDefined();
});

// eslint-disable-next-line jest/no-commented-out-tests
// test('PteroServer GameData', async () => {
// 	const server = new PteroServer(process.env.TEST_SERVER_ID);
// 	server.authorize(process.env.API_KEY);
//
// 	const gameData = await server.getGameData().catch();
// 	console.log((gameData as SCPSLGameData).info.bans);
// 	expect(gameData).toBeDefined();
// });
//
// eslint-disable-next-line jest/no-commented-out-tests
// test('PteroServer PublicData', async () => {
// 	const server = new PteroServer(process.env.TEST_SERVER_ID);
// 	server.authorize(process.env.API_KEY);
//
// 	const publicData = await server.getPublicData().catch();
// 	expect(publicData).toBeDefined();
// });

test('PteroServer SocketData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID!);
  server.authorize(process.env.API_KEY!);

  const socketData = await server.getSocketData().catch();
  expect(socketData).toBeDefined();
});

test('PteroServer ActivityData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID!);
  server.authorize(process.env.API_KEY!);

  const activityData = await server.getActivityData().catch();
  expect(activityData).toBeDefined();
});
