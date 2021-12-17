import { ButtonInteraction, Interaction, ThreadChannel } from "discord.js";
import {
  TEMP_ADVOCATE_ROLE,
  PROPS_CHANNEL,
  SC_BOT_COMMANDS_CHANNEL,
  START_HERE_CHANNEL,
  RESOURCES_CHANNEL,
  UPDATE_NAME_COMMAND,
  WELCOME_TEAM_ROLE_ID,
  ADVOCATE_ROLE,
} from "../../util/constants";

export const handleAcceptAdvocate = async (interaction: Interaction) => {
  if (
    interaction instanceof ButtonInteraction &&
    interaction.customId === "interview_went_well"
    // !interaction.replied &&
    // !interaction.ephemeral
  ) {
    const guild = await interaction.guild?.fetch();
    const member = await guild?.members.fetch(interaction.user.id);
    const isWelcomer =
      member?.roles.cache.has(ADVOCATE_ROLE) &&
      member?.roles.cache.has(WELCOME_TEAM_ROLE_ID);

    if (isWelcomer) {
      const thread = (await interaction.channel?.fetch()) as ThreadChannel;
      const starterMessage = await thread.fetchStarterMessage();
      if (starterMessage.member) {
        const member = await starterMessage.member.fetch();

        member.roles.add(TEMP_ADVOCATE_ROLE);
        interaction.reply(
          `All good and done! <@${member.id}>, to complete the registration just a few steps:

- If you feel grateful give props to your welcomer/s by mentioning them in <#${PROPS_CHANNEL}>

like so: Props to @someone for welcoming me to the advocates program

- Go to <#${SC_BOT_COMMANDS_CHANNEL}> and send \`${UPDATE_NAME_COMMAND} [your btc name]\` so that we know where to send your rewards!

- Check out <#${START_HERE_CHANNEL}> and <#${RESOURCES_CHANNEL}> for more information!`
        );
      }
    } else {
      await interaction.reply({
        ephemeral: true,
        content: "Sorry, this action is only allowed for the welcome team!",
      });
    }
  }
};
