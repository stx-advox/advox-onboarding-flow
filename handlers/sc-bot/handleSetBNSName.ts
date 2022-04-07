import { Message } from "discord.js";

import { checkNameValid } from "../../util/checkNameValid";
import { UPDATE_NAME_COMMAND } from "../../util/constants";
import { BNSUpdate } from "../../models/BNSUpdate";

export const setName = async (message: Message, name: string) => {
  const isNameValid = await checkNameValid(name);
  const nameEscaped = name.replace(/[\.-]/g, "-");

  if (isNameValid) {
    message.reply("Aight, we'll use this bns name to send you your rewards!");

    // get the ledger using github

    const update = new BNSUpdate({
      identityId: message.author.id,
      newName: nameEscaped,
    });

    await update.save();

    // } else if (!discordAccount) {
    //   message.reply(
    //     "Sorry dude, did you just join the server today? try again tomorrow!"
    //   );
    // } else if (isNameSet) {
    //   message.reply("Your btc name is already taken by another user");
  } else if (!isNameValid) {
    message.reply(
      "hey dude that name is not owned by any address could you check again?"
    );
  }
};

export const handleSetBNSName = (message: Message) => {
  try {
    const isValidCommand = message.content.startsWith(UPDATE_NAME_COMMAND);
    if (isValidCommand) {
      // check that the bns name is valid
      const [, , name] = message.content.split(" ");
      setName(message, name);
    }
  } catch (error) {
    console.log("[handleSetBNSName]:", error);
  }
};
