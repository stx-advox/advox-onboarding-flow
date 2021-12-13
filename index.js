import { config } from "dotenv";

config();

const token = process.env["DISCORD_TOKEN"];

// Require the necessary discord.js classes
import {
  Client,
  Intents,
  TextChannel,
  MessageReaction,
  User,
  Message,
  MessageMentions,
  GuildMember,
} from "discord.js";
import { sourcecred } from "sourcecred";
import { checkNameValid } from "./util/checkNameValid.js";
import { loadLedger, persistLedger } from "./util/sc.js";

const WELCOME_TEAM_ROLE_ID = "908118835150856212";
const ADVOCATE_ROLE = "872124401129246822";
const TEMP_ADVOCATE_ROLE = "908077356986540062";
const DIDATHING_CHANNEL = "872124843225653278";
const PROPS_CHANNEL = "872124900431769620";
const VOUCH_CHANNEL = "872534998790586389";
const STACKS_GUILD = "621759717756370964";
const JOIN_REQUESTS_CHANNEL = "892790172444414012";
const SC_BOT_COMMANDS_CHANNEL = "918116813869563984";
const UPDATE_NAME_COMMAND = "!sc update-bns-name";

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
  const stacks = await client.guilds.fetch(STACKS_GUILD);
  const ledger = await loadLedger();

  console.log("Ready!");

  /**
   * @type {TextChannel}
   */
  const joinRequests = await stacks.channels.fetch(JOIN_REQUESTS_CHANNEL, {
    cache: true,
  });
  await joinRequests.messages.fetch();

  client.on("messageReactionAdd", async (reaction, user) => {
    const isJoinRequests = reaction.message.channelId === JOIN_REQUESTS_CHANNEL;
    if (isJoinRequests) {
      reaction = await reaction.fetch();
      const reviewer = await stacks.members.fetch(user.id);
      const isWelcomer = reviewer.roles.cache.has(WELCOME_TEAM_ROLE_ID);
      const isAdvocate = reviewer.roles.cache.has(ADVOCATE_ROLE);
      const message = await reaction.message.fetch();
      const interviewee = await stacks.members.fetch(message.author.id);
      const isInterviewDone = reaction._emoji.name === "✅";
      if (isWelcomer && isAdvocate && isInterviewDone) {
        await interviewee.roles.add(TEMP_ADVOCATE_ROLE);
      }
    }
  });

  client.on("messageCreate", async (message) => {
    const advocatesChannels = [DIDATHING_CHANNEL, PROPS_CHANNEL];
    const isAdvocateChannel = advocatesChannels.includes(message.channelId);
    const isSCBotCommands = message.channelId === SC_BOT_COMMANDS_CHANNEL;
    const isValidCommand =
      isSCBotCommands && message.content.startsWith(UPDATE_NAME_COMMAND);

    const isVouch = message.channelId === VOUCH_CHANNEL;
    if (isVouch) {
      /**
       * @type {MessageMentions}
       */
      const mentions = message.mentions;
      const member = await stacks.members.fetch(message.author.id);
      if (member.roles.cache.has(ADVOCATE_ROLE)) {
        for (let member of mentions.members.values()) {
          await member.roles.add(TEMP_ADVOCATE_ROLE);
        }
      }
    } else if (isAdvocateChannel) {
      const member = await stacks.members.fetch(message.author.id);
      const isTemp = member.roles.cache.has(TEMP_ADVOCATE_ROLE);
      if (isTemp) {
        await member.roles.remove(TEMP_ADVOCATE_ROLE);
        await member.roles.add(ADVOCATE_ROLE);
      }
    } else if (isValidCommand) {
      // check that the bns name is valid
      const [, , name] = message.content.split(" ");
      const isNameValid = await checkNameValid(name);
      const nameEscaped = name.replace(/\./g, "-");
      const isNameSet = ledger.accountByName(nameEscaped);
      console.log(isNameSet);
      if (!isNameValid || isNameSet) {
        return message.reply(
          "hey dude that name is not owned by any address, or is already registered, could you check again?"
        );
      }
      message.reply("Aight, we'll use this bns name to send you your rewards!");

      // get the ledger using github
      const discordAccount = ledger.accountByAddress(
        `N\u0000sourcecred\u0000discord\u0000MEMBER\u0000user\u0000${message.author.id}\u0000`
      );

      // update the name of the identity related with the author's id with the new bns name
      console.log(nameEscaped);
      ledger.renameIdentity(discordAccount.identity.id, nameEscaped);
      changes = true;
    }
  });

  setInterval(async () => {
    await persistLedger();
  }, 24 * 60 * 60 * 1000);
});

// Login to Discord with your client's token
client.login(token);
