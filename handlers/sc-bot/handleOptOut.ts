import { Message } from "discord.js";
import { persistLedger, loadLedger } from "../../util/sc";
import { DEACTIVATE_COMMAND } from "../../util/constants";

export const deactivateAccount = async (message: Message) => {
  const ledger = await loadLedger();

  const discordAccount = ledger.accountByAddress(
    `N\u0000sourcecred\u0000discord\u0000MEMBER\u0000user\u0000${message.author.id}\u0000`
  );

  if (discordAccount.active) {
    message.reply(
      "Aight, dude I just opted you out from receiving STX rewards"
    );

    ledger.deactivate(discordAccount.identity.id);
    await persistLedger(
      `Opted the user ${discordAccount.identity.name} from receiving rewards`
    );
  } else {
    message.reply({ content: "You've already opted out!" });
  }
};

export const handleOptOut = (message: Message) => {
  try {
    const isValidCommand = message.content.startsWith(DEACTIVATE_COMMAND);
    if (isValidCommand) {
      deactivateAccount(message);
    }
  } catch (error) {
    console.log("[handleOptOut]:", error);
  }
};
