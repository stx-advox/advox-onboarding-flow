import {
  Client,
  GuildMember,
  MessagePayload,
  SelectMenuInteraction,
} from "discord.js";

import { JOIN_REQUESTS_CHANNEL } from "../util/constants";
import { handleAcceptAdvocate } from "./interview/handleAcceptAdvocate";
import { handleBNSNameAnswer } from "./interview/handleBNSNameAnswer";
import { handleFinishAnswering } from "./interview/handleFinishAnswering";
import { INTERVIEW_QUESTIONS_COMPONENT } from "./interview/templates/interviewQuestionsTemplate";

export const handleInterview = (client: Client) => {
  client.on("messageCreate", async (message) => {
    try {
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
    } catch (error) {
      console.log("[handleInterview]:", error);
    }
  });
  client.on("interactionCreate", (interaction) => {
    handleBNSNameAnswer(interaction);
    handleFinishAnswering(interaction);
    handleAcceptAdvocate(interaction);
  });
};
