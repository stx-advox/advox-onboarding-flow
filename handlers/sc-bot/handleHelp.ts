import { Message } from "discord.js";
import { HELP_COMMAND } from "../../util/constants";

export const handleHelp = (message: Message) => {
  try {
    const isValidCommand = message.content === HELP_COMMAND;
    if (isValidCommand) {
      // check that the bns name is valid
      message.reply({
        embeds: [
          {
            title: `SC bot help`,
            description: `Hi, my name's SourceCred Bot, I handle some SourceCred related actions. All my commands are prefixed by !sc. Refer to the list below for a list of my commands!

            **!sc help**
            Lists all commands.

            **!sc update-bns-name**
            Automatically sets your preferred bns name, and opts you in to receive rewards, the stacks address that owns this name would receive the rewards, you can get yours here https://btc.us

            **!sc ping**
            Just sends back a pong making sure that the bot is running

            **!sc opt-out**
            Opts you out of receiving stacks rewards, if you feel secure enough and don't need stacks you could use this command to give the stacks allocated to you to everybody else in the program`,
            color: 0x00ffff,
            image: {
              url: `https://gaia.blockstack.org/hub/1KnTB4Xkj3Lwqb1PUVegfCc4V6WMUsgGQY/2c69befaf70fe5c3a9feb1703b7a5c5344dcbd28e3de3856ba3c2ecf13353d59.jpg`,
            },
            timestamp: new Date(),
            footer: {
              text: `Stacks Advocates DAO`,
            },
          },
        ],
      });
    }
  } catch (error) {
    console.log("[handleSetBNSName]:", error);
  }
};
