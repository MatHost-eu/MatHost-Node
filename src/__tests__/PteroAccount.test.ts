import { PteroAccount } from '..';
import 'dotenv/config';

test('PteroAccount AccountData', async () => {
  const account = new PteroAccount();
  account.authorize(process.env.API_KEY!);

  const accountData = await account.getAccountData().catch();
  expect(accountData).toBeDefined();
});
