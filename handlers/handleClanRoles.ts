import { ButtonInteraction, Client } from "discord.js";

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
    if (interaction instanceof ButtonInteraction) {
      const isToggle = interaction.customId.startsWith("toggle_role");
      const roleToToggle = interaction.customId.replace("toggle_role_", "");
      const roleExists = Object.values(clanRoles).includes(roleToToggle);

      if (interaction.guild && isToggle && roleExists) {
        await interaction.deferReply({ ephemeral: true });
        const userId = interaction.user.id;
        const guild = await interaction.guild.fetch();
        const member = await guild.members.fetch(userId);

        if (member.roles.cache.has(roleToToggle)) {
          await member.roles.remove(roleToToggle);
        } else {
          await member.roles.add(roleToToggle);
        }
        await interaction.editReply({
          content: "Toggled your role successfully!",
        });
      }
    }
  });
};
