import { PteroServer } from '../index';
import 'dotenv/config';
import { PteroSocket } from '../classes/PteroSocket';

test('PteroServer ServerData', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID);
  server.authorize(process.env.API_KEY);

  const serverData = await server.getServerData();
  expect(serverData).toBeDefined();
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

test('PteroServer PteroSocket', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID);
  server.authorize(process.env.API_KEY);

  const socket = new PteroSocket(server);
  expect(socket).toBeDefined();
});