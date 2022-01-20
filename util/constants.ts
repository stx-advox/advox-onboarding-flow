import { MessageOptions } from "discord.js";

export const WELCOME_TEAM_ROLE_ID = "908118835150856212";
export const ADVOCATE_ROLE = "872124401129246822";
export const TEMP_ADVOCATE_ROLE = "908077356986540062";
export const DIDATHING_CHANNEL = "872124843225653278";
export const PROPS_CHANNEL = "872124900431769620";
export const VOUCH_CHANNEL = "872534998790586389";
export const STACKS_GUILD = "621759717756370964";
export const JOIN_REQUESTS_CHANNEL = "892790172444414012";
export const SC_BOT_COMMANDS_CHANNEL = "873229729363275808";
export const UPDATE_NAME_COMMAND = "!sc update-bns-name";
export const PING_COMMAND = "!sc ping";
export const ADVOCATE_WELCOME_ROLE = "908118835150856212";
export const START_HERE_CHANNEL = "916371047102705704";
export const RESOURCES_CHANNEL = "872646462675226654";
export const advocatesChannels = [DIDATHING_CHANNEL, PROPS_CHANNEL];

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

export const finishAnsweringText: MessageOptions = {
  content: `Thank you for that, we're glad to have you, let's connect you to the <@&${ADVOCATE_WELCOME_ROLE}> team`,
  embeds: [
    {
      color: "AQUA",
      title: "Hello there welcomer!",
      description: `The next section is made especially for you 💖, whenever you feel satisfied with the answers just click on "Went well!"
If not after the discussion then thank you for contributing and let's leave the discussion speak for itself!`,
    },
  ],
  components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          customId: "interview_went_well",
          type: "BUTTON",
          label: "Went well!",
          style: "SUCCESS",
          emoji: {
            name: "☑️",
            id: null,
          },
        },
      ],
    },
  ],
};
