import { sourcecred } from "sourcecred";

const writableStorage = new sourcecred.ledger.storage.WritableGithubStorage({
  apiToken: process.env.GH_API_TOKEN,
  repo: process.env.REPO,
  branch: process.env.BRANCH,
});

const storage = new sourcecred.ledger.storage.GithubStorage({
  apiToken: process.env.GH_API_TOKEN,
  repo: process.env.REPO,
  branch: process.env.BRANCH,
});
storage.set = writableStorage.set;

export const manager = new sourcecred.ledger.manager.LedgerManager({ storage });

export const loadLedger = async () => {
  await manager.reloadLedger();
  return manager.ledger;
};

export const persistLedger = async () => {
  const persistRes = await manager.persist();

  if (persistRes.error) {
    console.log(
      `\nAn error occurred when trying to commit the new ledger: ${persistRes.error}`
    );
  }
};
