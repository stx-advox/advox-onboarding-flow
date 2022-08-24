import scheduler from "node-schedule";
import { loadLedger, persistLedger } from "../util/sc";
import { BNSUpdate } from "../models/BNSUpdate";
const job = async () => {
  const jobs = await BNSUpdate.find({}).exec();
  const messages: string[] = ["SC Ledger updates:"];
  if (jobs.length) {
    const ledger = await loadLedger();
    for (const job of jobs) {
      const { newName, identityId } = job;
      const discordAccount = ledger.accountByAddress(
        `N\u0000sourcecred\u0000discord\u0000MEMBER\u0000user\u0000${identityId}\u0000`
      );
      const oldName = discordAccount.identity.name;
      // update the name of the identity related with the author's id with the new bns name
      if (discordAccount && oldName !== newName) {
        ledger.renameIdentity(discordAccount.identity.id, newName);
        messages.push(`Updated the user ${oldName} to new name ${newName}!`);
      }
      if (discordAccount && !discordAccount.active) {
        ledger.activate(discordAccount.identity.id);
        messages.push(`Opted the user ${newName} in to receive rewards!`);
      }
      await job.delete();
    }
    if (messages.length > 1) {
      await persistLedger(messages.join("\n"));
      jobs.forEach((job) => job.remove());
    }
  }
};

export const bnsNameCron = () => {
  scheduler.scheduleJob(
    "update ledger accounts",
    "* 4,8,12,16,20,0 * * *",
    job
  );
};
