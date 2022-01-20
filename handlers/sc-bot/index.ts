import { Client } from "discord.js";
import { SC_BOT_COMMANDS_CHANNEL } from "../../util/constants";
import { handlePing } from "./handlePing";
import { handleSetBNSName } from "./handleSetBNSName";

export const handleSCBot = (client: Client) => {
  client.on("messageCreate", async (message) => {
    try {
      const isSCBotCommands = message.channelId === SC_BOT_COMMANDS_CHANNEL;
      if (isSCBotCommands) {
        handleSetBNSName(message);
        handlePing(message);
      }
    } catch (error) {
      console.log("[handleSetBNSName]:", error);
    }
  });
};
