import { Message } from "discord.js";
import { persistLedger, loadLedger } from "../../util/sc";
import { checkNameValid } from "../../util/checkNameValid";
import { UPDATE_NAME_COMMAND } from "../../util/constants";

export const setName = async (message: Message, name: string) => {
  const isNameValid = await checkNameValid(name);
  const nameEscaped = name.replace(/\./g, "-");
  const ledger = await loadLedger();

  const isNameSet = ledger.accountByName(nameEscaped);
  const discordAccount = ledger.accountByAddress(
    `N\u0000sourcecred\u0000discord\u0000MEMBER\u0000user\u0000${message.author.id}\u0000`
  );

  if (isNameValid && !isNameSet && discordAccount) {
    message.reply("Aight, we'll use this bns name to send you your rewards!");

    // get the ledger using github

    // update the name of the identity related with the author's id with the new bns name
    ledger.renameIdentity(discordAccount.identity.id, nameEscaped);
    ledger.activate(discordAccount.identity.id);
    await persistLedger();
  } else if (!discordAccount) {
    message.reply(
      "Sorry dude, did you just join the server today? try again tomorrow!"
    );
  } else if (isNameSet) {
    message.reply("Your btc name is already taken by another user");
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
