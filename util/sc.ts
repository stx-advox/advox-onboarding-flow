import { config } from "dotenv";
import { sourcecred } from "sourcecred";
export const AUTHOR = {
  name: "hz",
  email: "13457698+hozzjss@users.noreply.github.com",
};

config();
const storage = new sourcecred.ledger.storage.WritableGithubStorage({
  apiToken: process.env.GH_API_TOKEN,
  repo: process.env.REPO,
  branch: process.env.BRANCH,
});

export const manager = new sourcecred.ledger.manager.LedgerManager({ storage });

export const loadLedger = async () => {
  await manager.reloadLedger();
  return manager.ledger;
};

export const persistLedger = async (message?: string, author = AUTHOR) => {
  const persistRes = await manager.persist(message, author);

  if (persistRes.error) {
    console.log(
      `\nAn error occurred when trying to commit the new ledger: ${persistRes.error}`
    );
  }
};
