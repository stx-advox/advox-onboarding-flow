// Require the necessary discord.js classes
import { Client, Intents } from "discord.js";
import { loadLedger, persistLedger } from "./util/sc";
import { STACKS_GUILD } from "./util/constants";
import { config } from "dotenv";
import { handleGiveTempRole } from "./handlers/handleGiveTempRole";
import { handleVouch } from "./handlers/handleVouch";
import { handleActivateAdvocate } from "./handlers/handleActivateAdvocate";
import { handleSetBNSName } from "./handlers/handleSetBNSName";
import { handleInterview } from "./handlers/handleInterview";
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

  handleGiveTempRole(client);
  handleVouch(client);
  handleActivateAdvocate(client);
  handleSetBNSName(client, ledger);
  handleInterview(client);

  setInterval(async () => {
    await loadLedger();
    await persistLedger();
  }, 24 * 60 * 60 * 1000);
});

// Login to Discord with your client's token
client.login(token);
