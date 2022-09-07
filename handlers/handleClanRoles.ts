import { ButtonInteraction, Client } from "discord.js";
const allRoles = [
  // wolfMale
  "979393824881246209",
  // wolfFemale
  "979393911971778580",
  // turtleMale
  "979394021636050985",
  // turtleFemale
  "979394052501950485",
  // bearMale
  "979394149780447262",
  // bearFemale
  "979394185134239794",
];

const clanRoles = {
  wolfMale: "979393824881246209",
  wolfFemale: "979393911971778580",
  turtleMale: "979394021636050985",
  turtleFemale: "979394052501950485",
  bearMale: "979394149780447262",
  bearFemale: "979394185134239794",
};

export const handleClanRolesToggle = (client: Client) => {
  client.on("interactionCreate", async (interaction) => {
    if (
      interaction instanceof ButtonInteraction &&
      interaction.guild &&
      interaction.customId.startsWith("toggle_role")
    ) {
      const roleToToggle = interaction.customId.replace("toggle_role_", "");
      await interaction.deferReply({ ephemeral: true });
      const otherRoles = allRoles.filter((role) => role !== roleToToggle);
      const userId = interaction.user.id;
      const guild = await interaction.guild.fetch();
      const member = await guild.members.fetch(userId);
      const alreadyHasRole = member.roles.cache.has(roleToToggle);
      const hasAnyOther = member.roles.cache.hasAny(...otherRoles);
      if (hasAnyOther) {
        await member.roles.remove(otherRoles);
      }

      if (alreadyHasRole) {
        interaction.editReply({
          content: "You already have this role",
        });
      } else {
        await member.roles.remove(otherRoles);

        await member.roles.add(roleToToggle);
        await interaction.editReply({
          content: "Toggled your role successfully!",
        });
      }
    }
  });
};
