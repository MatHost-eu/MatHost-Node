import { PteroServer } from '../index';
import 'dotenv/config';

test('PteroServer ServerData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID);
  server.authorize(process.env.API_KEY);

  const serverData = await server.getServerData();
  expect(serverData).toBeDefined();
});

test('PteroServer ServerDataAccount', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID);
  server.authorize(process.env.API_KEY);

  const accountData = await server.getAccountData();
  expect(accountData).toBeDefined();
});

test('PteroServer StatusData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID);
  server.authorize(process.env.API_KEY);

  const statusData = await server.getStatusData();
  expect(statusData).toBeDefined();
});

test('PteroServer GameData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID);
  server.authorize(process.env.API_KEY);

  const gameData = await server.getGameData();
  expect(gameData).toBeDefined();
});

test('PteroServer SocketData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID);
  server.authorize(process.env.API_KEY);

  const gameData = await server.getSocketData();
  expect(gameData).toBeDefined();
});

test('PteroServer ActivityData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID);
  server.authorize(process.env.API_KEY);

  const gameData = await server.getActivityData();
  expect(gameData).toBeDefined();
});