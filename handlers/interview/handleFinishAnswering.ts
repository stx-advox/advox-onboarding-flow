import { ButtonInteraction, Interaction } from "discord.js";
import { ADVOCATE_WELCOME_ROLE } from "../../util/constants";

export const handleFinishAnswering = async (interaction: Interaction) => {
  try {
    if (
      interaction instanceof ButtonInteraction &&
      interaction.customId === "did_answer_question" &&
      !interaction.replied
    ) {
      await interaction.reply({
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
      });
    }
  } catch (error) {
    console.log("[handleFinishAnswering]:", error);
  }
};
