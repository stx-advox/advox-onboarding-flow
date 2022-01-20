import { Message } from "discord.js";
import { PING_COMMAND } from "../../util/constants";

export const handlePing = (message: Message) => {
  try {
    const isValidCommand = message.content === PING_COMMAND;
    if (isValidCommand) {
      // check that the bns name is valid
      message.reply("pong!");
    }
  } catch (error) {
    console.log("[handleSetBNSName]:", error);
  }
};
