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
import { handleDidathingPropsReactions } from "./handlers/handleDidathingPropsReactions";
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

  handleGiveTempRole(client);
  handleVouch(client);
  handleActivateAdvocate(client);
  handleSetBNSName(client);
  handleInterview(client);
  handleDidathingPropsReactions(client);
});

// Login to Discord with your client's token
client.login(token);
