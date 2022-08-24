import { ButtonInteraction, Interaction } from "discord.js";
import { validateOnlyStarter } from "../../util/auth/interaction-only-starter";
import { finishAnsweringText } from "./templates/finishAnswersTemplate";

export const handleFinishAnswering = async (interaction: Interaction) => {
  try {
    if (
      interaction instanceof ButtonInteraction &&
      interaction.customId === "did_answer_question" &&
      !interaction.replied &&
      (await validateOnlyStarter(interaction as ButtonInteraction))
    ) {
      await interaction.reply(finishAnsweringText);
    }
  } catch (error) {
    console.log("[handleFinishAnswering]:", error);
  }
};
