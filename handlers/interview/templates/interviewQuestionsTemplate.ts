import { MessageOptions } from "discord.js";

export const INTERVIEW_QUESTIONS_COMPONENT = {
  content: `Hello there and welcome to the stacks advocates program!
a welcomer will be reviewing your answers so read carefully
Take your time to answer by sending messages in this thread
and then click on "All done, check answers!" whenever you feel comfortable with your answers!!`,
  components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          customId: `have_bns_name`,
          placeholder: `Do you have a BNS name?`,
          maxValues: 1,
          minValues: 1,
          type: "SELECT_MENU",
          options: [
            {
              label: `yes`,
              value: `has_name`,
              description: `I have a bns name`,
              default: false,
            },
            {
              label: `No, but I can get one`,
              value: `has_stx_to_get_name`,
              description: `I have enough STX to register a name`,
              default: false,
            },
            {
              label: `No, and I can't get one`,
              value: `needs_help`,
              description: `I'll need some STX to get a name, or help in general`,
              default: false,
            },
          ],
        },
      ],
    },
    {
      type: "ACTION_ROW",
      components: [
        {
          customId: "did_answer_question",
          type: "BUTTON",
          label: "All done, check answers!",
          style: "SUCCESS",
          emoji: {
            name: "☑️",
          },
        },
      ],
    },
  ],
  embeds: [
    {
      type: "rich" as any,
      title: `Let's get you set up`,
      description: "",
      color: 0x00ffff,
      fields: [
        {
          name: `How do you see yourself contributing to the stacks ecoystem?`,
          value: `Examples include translations, dev work, moderation, tweets.`,
        },
        {
          name: `Do you have a bns name?`,
          value: `We need that to know where to send the STX rewards, if you don't have enough STX to register one we'll be happy to provide that within a week`,
        },
      ],
    },
  ],
} as MessageOptions;
