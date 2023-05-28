import { PteroServer, PteroFileManager } from '..';
import 'dotenv/config';

test('PteroFileManager FileList', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID!);
  server.authorize(process.env.API_KEY!);
  const files = new PteroFileManager(server);
  files.authorize(process.env.API_KEY!);

  const fileList = await files.getFiles().catch();
  expect(fileList).toBeDefined();
});

test('PteroFileManager FileContent', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID!);
  server.authorize(process.env.API_KEY!);
  const files = new PteroFileManager(server);
  files.authorize(process.env.API_KEY!);

  const fileContent = await files.getFile('package.json').catch();
  expect(fileContent).toBeDefined();
});

test('PteroFileManager WriteFile', async () => {
  const server = new PteroServer(process.env.TEST_SERVER_ID!);
  server.authorize(process.env.API_KEY!);
  const files = new PteroFileManager(server);
  files.authorize(process.env.API_KEY!);

  const fileContent = await files.writeFile('test.txt', 'Hello World!').catch();
  expect(fileContent).toBeDefined();
});
