import { ButtonInteraction, Interaction, ThreadChannel } from "discord.js";
import {
  TEMP_ADVOCATE_ROLE,
  PROPS_CHANNEL,
  SC_BOT_COMMANDS_CHANNEL,
  START_HERE_CHANNEL,
  RESOURCES_CHANNEL,
  // @ts-ignore
} from "../../util/constants.ts";

export const handleAcceptAdvocate = async (interaction: Interaction) => {
  if (
    interaction instanceof ButtonInteraction &&
    interaction.customId === "interview_went_well"
  ) {
    const thread = (await interaction.channel?.fetch()) as ThreadChannel;
    const starterMessage = await thread.fetchStarterMessage();
    if (starterMessage.member) {
      const member = await starterMessage.member.fetch();

      member.roles.add(TEMP_ADVOCATE_ROLE);
      interaction.reply(
        `All good and done! <@${member.id}>, to complete the registration just a few steps:
        - If you feel grateful give props to your welcomer/s by mentioning them help in <#${PROPS_CHANNEL}>
          like so: Props to @someone for welcoming me to the advocates program
        - Go to <#${SC_BOT_COMMANDS_CHANNEL}> and send \`sc update-bns-name [your btc name]\` so that we know where to send your rewards!
        - Check out <#${START_HERE_CHANNEL}> and <#${RESOURCES_CHANNEL}> for more information!`
      );
    }
  }
};
