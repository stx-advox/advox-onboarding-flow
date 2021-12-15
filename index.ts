// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";
// @ts-ignore
import { loadLedger, persistLedger } from "./util/sc.ts";
// @ts-ignore
import { STACKS_GUILD } from "./util/constants.ts";
import { config } from "dotenv";
// @ts-ignore
import { handleGiveTempRole } from "./handlers/handleGiveTempRole.ts";
// @ts-ignore
import { handleVouch } from "./handlers/handleVouch.ts";
// @ts-ignore
import { handleActivateAdvocate } from "./handlers/handleActivateAdvocate.ts";
// @ts-ignore
import { handleSetBNSName } from "./handlers/handleSetBNSName.ts";
// @ts-ignore
import { handleInterview } from "./handlers/handleInterview.ts";
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
  const ledger = await loadLedger();

  console.log("Ready!");

  // handleGiveTempRole(client);
  // handleVouch(client);
  // handleActivateAdvocate(client);
  // handleSetBNSName(client, ledger);
  handleInterview(client);

  setInterval(async () => {
    await persistLedger();
  }, 24 * 60 * 60 * 1000);
});

// Login to Discord with your client's token
client.login(token);
