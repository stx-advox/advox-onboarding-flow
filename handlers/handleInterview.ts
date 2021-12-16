import {
  Client,
  GuildMember,
  MessagePayload,
  SelectMenuInteraction,
} from "discord.js";

import {
  JOIN_REQUESTS_CHANNEL,
  INTERVIEW_QUESTIONS_COMPONENT,
} from "../util/constants";
import { handleAcceptAdvocate } from "./interview/handleAcceptAdvocate";
import { handleBNSNameAnswer } from "./interview/handleBNSNameAnswer";
import { handleFinishAnswering } from "./interview/handleFinishAnswering";

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
