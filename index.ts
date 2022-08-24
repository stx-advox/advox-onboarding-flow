// Require the necessary discord.js classes
import { Client, IntentsBitField } from "discord.js";
import { STACKS_GUILD } from "./util/constants";
import { config } from "dotenv";
import { handleGiveTempRole } from "./handlers/handleGiveTempRole";
import { handleVouch } from "./handlers/handleVouch";
import { handleActivateAdvocate } from "./handlers/handleActivateAdvocate";
import { handleInterview } from "./handlers/handleInterview";
import { handleDidathingPropsReactions } from "./handlers/handleDidathingPropsReactions";
import { handleSCBot } from "./handlers/sc-bot";
// import { handleTreasuryTx } from "./handlers/handleTreasuryTx";
import mongoose from "mongoose";
import { setupCronJobs } from "./cron";
import { handleClanRolesToggle } from "handlers/handleClanRoles";
config();

const token = process.env["DISCORD_TOKEN"];

// Create a new client instance
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
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

  // setup cron jobs
  setupCronJobs();

  handleGiveTempRole(client);
  handleVouch(client);
  handleActivateAdvocate(client);
  handleSCBot(client);
  handleInterview(client);
  handleDidathingPropsReactions(client);
  handleClanRolesToggle(client);
  // handleTreasuryTx(client);
});

// Login to Discord with your client's token
client.login(token);
