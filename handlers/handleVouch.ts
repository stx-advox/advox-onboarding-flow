import { Client, Message } from "discord.js";
import {
  ADVOCATE_ROLE,
  JOIN_REQUESTS_CHANNEL,
  TEMP_ADVOCATE_ROLE,
  VOUCH_CHANNEL,
} from "../util/constants";
import { getStacksServer } from "../util/discordUtils";

export const handleVouch = async (client: Client) => {
  const stacks = getStacksServer(client);
  client.on("messageCreate", async (message) => {
    try {
      const isVouch = message.channelId === VOUCH_CHANNEL;

      if (isVouch) {
        const mentions = message.mentions;
        const member = await stacks.members.fetch(message.author.id);
        if (member.roles.cache.has(ADVOCATE_ROLE) && mentions.members) {
          const allVouched = Array.from(mentions.members.values())
            .map((a) => `<@${a.id}>`)
            .join(" ");
          message.reply(`${allVouched}, glad to have you on board!
could you please give us an introduction in <#${JOIN_REQUESTS_CHANNEL}>`);
        }
      }
    } catch (error) {
      console.log("[handleVouch]:", error);
    }
  });
};
