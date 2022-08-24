import {
  ButtonInteraction,
  Interaction,
  TextChannel,
  ThreadChannel,
} from "discord.js";
import { getChannelByIdFromInteraction } from "../../util/getChannelByIdFromInteraction";
import {
  TEMP_ADVOCATE_ROLE,
  SC_BOT_COMMANDS_CHANNEL,
  START_HERE_CHANNEL,
  RESOURCES_CHANNEL,
  UPDATE_NAME_COMMAND,
  WELCOME_TEAM_ROLE_ID,
  ADVOCATE_ROLE,
  DIDATHING_CHANNEL,
  PROPS_CHANNEL,
} from "../../util/constants";

export const handleAcceptAdvocate = async (interaction: Interaction) => {
  try {
    if (
      interaction instanceof ButtonInteraction &&
      interaction.customId === "interview_went_well"
    ) {
      const guild = await interaction.guild?.fetch();
      const member = await guild?.members.fetch(interaction.user.id);
      const isWelcomer =
        member?.roles.cache.has(ADVOCATE_ROLE) &&
        member?.roles.cache.has(WELCOME_TEAM_ROLE_ID);

      if (isWelcomer) {
        const welcomer = interaction.user;
        const thread = (await interaction.channel?.fetch()) as ThreadChannel;
        const starterMessage = await thread.fetchStarterMessage();
        const guild = await thread.guild.fetch();
        const member = await guild.members.fetch(starterMessage!.author.id);
        await member.roles.add(TEMP_ADVOCATE_ROLE);
        await interaction.reply(
          `All good and done! <@${member.id}>, to complete the registration just a few steps:

- Let us know your latest contributions to the ecosystem here <#${DIDATHING_CHANNEL}>

- Go to <#${SC_BOT_COMMANDS_CHANNEL}> and send \`${UPDATE_NAME_COMMAND} [your btc name]\` so that we know where to send your rewards!

- Check out <#${START_HERE_CHANNEL}> and <#${RESOURCES_CHANNEL}> for more information!`
        );
        const props = (await getChannelByIdFromInteraction(
          interaction,
          PROPS_CHANNEL
        )) as TextChannel;
        props.send(
          `Props to <@${welcomer.id}> for welcoming our latest newcomer! check the interview here <#${thread.id}>!`
        );
      } else {
        await interaction.reply({
          ephemeral: true,
          content: "Sorry, this action is only allowed for the welcome team!",
        });
      }
    }
  } catch (error) {
    console.log("[handleAcceptAdvocate]:", error);
  }
};
