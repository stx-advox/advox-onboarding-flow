// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";
import { STACKS_GUILD } from "./util/constants";
import { config } from "dotenv";
import { handleGiveTempRole } from "./handlers/handleGiveTempRole";
import { handleVouch } from "./handlers/handleVouch";
import { handleActivateAdvocate } from "./handlers/handleActivateAdvocate";
import { handleInterview } from "./handlers/handleInterview";
import { handleDidathingPropsReactions } from "./handlers/handleDidathingPropsReactions";
import { handleSCBot } from "./handlers/sc-bot";
import { handleTreasuryTx } from "./handlers/handleTreasuryTx";
import mongoose from "mongoose";

import scheduler from "node-schedule";
import { BNSUpdate } from "./models/BNSUpdate";
import { loadLedger } from "./util/sc";
import { persistLedger } from "./util/sc";
config();

const token = process.env["DISCORD_TOKEN"];

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

// When the client is ready, run this code (only once)
client.once("ready", async () => {
  await client.guilds.fetch(STACKS_GUILD);

  console.log("Ready!");
  const credentials = process.env.MONGO_CERT_PATH as string;
  await mongoose
    .connect(process.env.MONGO_URI as string, {
      sslKey: credentials,
      sslCert: credentials,
    })
    .then((instance) => {
      console.log("Connected to mongo");
      return instance;
    })
    .catch((err) => {
      console.log("couldn't connect cuz", err);
    });

  scheduler.scheduleJob(
    "update ledger accounts",
    "* 4,8,12,16,20,0 * * * *",
    async () => {
      const jobs = await BNSUpdate.find({}).exec();
      const messages: string[] = ["SC Ledger updates:"];
      if (jobs.length) {
        const ledger = await loadLedger();
        for (const job of jobs) {
          const { newName, identityId } = job;
          const discordAccount = ledger.accountByAddress(
            `N\u0000sourcecred\u0000discord\u0000MEMBER\u0000user\u0000${identityId}\u0000`
          );

          // update the name of the identity related with the author's id with the new bns name
          ledger.renameIdentity(discordAccount.identity.id, newName);
          ledger.activate(discordAccount.identity.id);
          messages.push(`Opted the user ${newName} in to receive rewards!`);
        }
        if (messages.length > 1) {
          await persistLedger(messages.join("\n"));
        }
      }
    }
  );

  handleGiveTempRole(client);
  handleVouch(client);
  handleActivateAdvocate(client);
  handleSCBot(client);
  handleInterview(client);
  handleDidathingPropsReactions(client);
  handleTreasuryTx(client);
});

// Login to Discord with your client's token
client.login(token);
