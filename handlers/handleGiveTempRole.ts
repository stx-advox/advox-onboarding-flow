import { Client, TextChannel } from "discord.js";
import {
  ADVOCATE_ROLE,
  JOIN_REQUESTS_CHANNEL,
  TEMP_ADVOCATE_ROLE,
  WELCOME_TEAM_ROLE_ID,
  // @ts-ignore
} from "../util/constants.ts";
// @ts-ignore
import { getStacksServer } from "../util/discordUtils.ts";

export const handleGiveTempRole = async (client: Client) => {
  const stacks = getStacksServer(client);
  const joinRequests = (await stacks.channels.fetch(JOIN_REQUESTS_CHANNEL, {
    cache: true,
  })) as TextChannel;
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
      const isInterviewDone = reaction.emoji.name === "✅";
      if (isWelcomer && isAdvocate && isInterviewDone) {
        await interviewee.roles.add(TEMP_ADVOCATE_ROLE);
      }
    }
  });
};
