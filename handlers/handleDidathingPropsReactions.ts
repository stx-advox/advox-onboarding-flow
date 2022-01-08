import { Client } from "discord.js";

export const handleDidathingPropsReactions = (client: Client) => {
  client.on("messageCreate", async (message) => {
    // didathing and props channel ids
    try {
      const priorityChannels = [
        "872124843225653278",
        "872124900431769620",
        "872645232112582707",
      ];

      const shouldReact = priorityChannels.includes(message.channelId);
      if (shouldReact) {
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("🧸");
        await message.react("🐺");
        await message.react("🐢");
      }
    } catch (e) {
      console.log("error", e);
    }
  });
};
