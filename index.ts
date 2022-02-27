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
  handleSCBot(client);
  handleInterview(client);
  handleDidathingPropsReactions(client);
  handleTreasuryTx(client);
});

// Login to Discord with your client's token
client.login(token);
