import { Client } from "discord.js";
import {
  advocatesChannels,
  ADVOCATE_ROLE,
  TEMP_ADVOCATE_ROLE,
} from "../util/constants";
import { getStacksServer } from "../util/discordUtils";

export const handleActivateAdvocate = async (client: Client) => {
  const stacks = getStacksServer(client);
  client.on("messageCreate", async (message) => {
    try {
      // a weighted channel is a channel where people can submit their work
      // something like props or didathings
      const isWeightedChannel = advocatesChannels.includes(message.channelId);
      if (isWeightedChannel) {
        const member = await stacks.members.fetch(message.author.id);
        const isTemp = member.roles.cache.has(TEMP_ADVOCATE_ROLE);
        if (isTemp) {
          await member.roles.remove(TEMP_ADVOCATE_ROLE);
          await member.roles.add(ADVOCATE_ROLE);
        }
      }
    } catch (error) {
      console.log("[handleActivateAdvocate]:", error);
    }
  });
};
