import { Interaction } from "discord.js";

export const getChannelByIdFromInteraction = async (
  interaction: Interaction,
  channelId: string
) => {
  const guild = await interaction.guild?.fetch();
  return guild?.channels.fetch(channelId);
};
