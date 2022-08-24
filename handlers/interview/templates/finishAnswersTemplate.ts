import {
  ButtonStyle,
  ComponentType,
  InteractionReplyOptions,
} from "discord.js";
import { ADVOCATE_WELCOME_ROLE } from "../../../util/constants";

export const finishAnsweringText: InteractionReplyOptions = {
  content: `Thank you for that, we're glad to have you, let's connect you to the <@&${ADVOCATE_WELCOME_ROLE}> team`,
  embeds: [
    {
      color: 0x00ffff,
      title: "Hello there welcomer!",
      description: `The next section is made especially for you 💖, whenever you feel satisfied with the answers just click on "Went well!"
If not after the discussion then thank you for contributing and let's leave the discussion speak for itself!`,
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        {
          customId: "interview_went_well",
          type: ComponentType.Button,
          label: "Went well!",
          style: ButtonStyle.Success,
          emoji: {
            name: "☑️",
          },
        },
      ],
    },
  ],
};
