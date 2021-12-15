import {
  Client,
  GuildMember,
  MessagePayload,
  SelectMenuInteraction,
} from "discord.js";

import {
  JOIN_REQUESTS_CHANNEL,
  INTERVIEW_QUESTIONS_COMPONENT,
  // @ts-ignore
} from "../util/constants.ts";
// @ts-ignore
import { handleAcceptAdvocate } from "./interview/handleAcceptAdvocate.ts";
// @ts-ignore
import { handleBNSNameAnswer } from "./interview/handleBNSNameAnswer.ts";
// @ts-ignore
import { handleFinishAnswering } from "./interview/handleFinishAnswering.ts";

export const handleInterview = (client: Client) => {
  client.on("messageCreate", async (message) => {
    const isJoinRequests = message.channelId === JOIN_REQUESTS_CHANNEL;
    if (isJoinRequests) {
      const member = message.member as GuildMember;

      const thread = await message.startThread({
        name: `Welcome ${member.nickname || member.user.username}!`,
        autoArchiveDuration: "MAX",
      });
      const interviewQuestions = new MessagePayload(
        thread,
        INTERVIEW_QUESTIONS_COMPONENT
      );
      thread.send(interviewQuestions);
    }
  });
  client.on("interactionCreate", (interaction) => {
    handleBNSNameAnswer(interaction);
    handleFinishAnswering(interaction);
    handleAcceptAdvocate(interaction);
  });
};
