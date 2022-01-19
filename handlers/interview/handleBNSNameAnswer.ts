import { Interaction, SelectMenuInteraction } from "discord.js";

export const handleBNSNameAnswer = async (interaction: Interaction) => {
  try {
    if (
      interaction instanceof SelectMenuInteraction &&
      interaction.customId === "have_bns_name" &&
      !interaction.replied
    ) {
      let content: string = "";
      switch (interaction.values[0]) {
        case "has_name": {
          content =
            "Alright we're glad you have a name, you'll use it later in the process";
          break;
        }
        case "has_stx_to_get_name": {
          content = "Alright, be sure to register one before next Saturday!";
          break;
        }
        case "needs_help": {
          content =
            "No worries we're here to help just ask your welcomer for assistance";
          break;
        }
      }

      if (content) {
        interaction.reply({
          content,
          ephemeral: true,
        });
      }
    }
  } catch (error) {
    console.log("[handleBNSNameAnswer]:", error);
  }
};
