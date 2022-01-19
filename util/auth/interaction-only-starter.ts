import { ButtonInteraction, Interaction, ThreadChannel } from "discord.js";

export const validateOnlyStarter = async (interaction: ButtonInteraction) => {
  const channelOptional = interaction.channel as ThreadChannel;
  const thread = (await channelOptional.fetch()) as ThreadChannel;
  const starterMessage = await thread.fetchStarterMessage();
  const member = starterMessage.author;
  if (member.id !== interaction.member.user.id) {
    interaction.reply({
      ephemeral: true,
      content: "Only the interviewee might do this yo!",
    });
    return false;
  }
  return true;
};
