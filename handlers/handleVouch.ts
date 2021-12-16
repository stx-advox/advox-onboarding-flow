import { Client, Message } from "discord.js";
import {
  ADVOCATE_ROLE,
  TEMP_ADVOCATE_ROLE,
  VOUCH_CHANNEL,
} from "../util/constants";
import { getStacksServer } from "../util/discordUtils";

export const handleVouch = async (client: Client) => {
  const stacks = getStacksServer(client);
  client.on("messageCreate", async (message) => {
    const isVouch = message.channelId === VOUCH_CHANNEL;

    if (isVouch) {
      const mentions = message.mentions;
      const member = await stacks.members.fetch(message.author.id);
      if (member.roles.cache.has(ADVOCATE_ROLE) && mentions.members) {
        for (let member of mentions.members.values()) {
          await member.roles.add(TEMP_ADVOCATE_ROLE);
        }
      }
    }
  });
};
