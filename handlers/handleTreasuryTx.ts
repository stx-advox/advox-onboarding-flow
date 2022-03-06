import { Client, TextChannel } from "discord.js";

import {
  connectWebSocketClient,
  TransactionsApi,
} from "@stacks/blockchain-api-client";
import fetch from "cross-fetch";
import {
  ContractCallTransaction,
  TransactionEventSmartContractLog,
} from "@stacks/stacks-blockchain-api-types";
import { getTxUrl, GRAIN_DISCUSSION_CHANNEL } from "../util/constants";
import { getStacksServer } from "../util/discordUtils";
import { doAccountingForDistId } from "../util/do-accounting-for-dist-id";

global.fetch = fetch;

function handleContractLogHex(repr: string) {
  if (repr?.startsWith("0x")) {
    try {
      return Buffer.from(repr.replace("0x", ""), "hex").toString("utf8");
    } catch (e) {
      return repr;
    }
  }
  return repr;
}

export const handleTreasuryTx = async (client: Client) => {
  try {
    const socket = await connectWebSocketClient("ws://localhost:3999");
    const txApi = new TransactionsApi();

    socket.subscribeAddressTransactions(
      "SPSTX06BNGJ2CP1F6WA8V49B6MYD784N6YZMK95G",
      async (update) => {
        const { tx_id, tx_status, tx_type } = update;
        const stacks = getStacksServer(client);
        const channel = stacks.channels.cache.get(
          GRAIN_DISCUSSION_CHANNEL
        ) as TextChannel;
        let message = `An advox treasury transaction was just sent!
Check it out here ${getTxUrl(tx_id)}`;

        if (tx_status === "pending") {
          await channel.send(message);
        } else if (tx_status === "success" && tx_type === "contract_call") {
          await channel.send(message.replace("sent", "confirmed"));

          const tx = (await txApi.getTransactionById({
            txId: tx_id,
          })) as ContractCallTransaction;

          const firstMemo = tx.events.find(
            (event) => event.event_type === "smart_contract_log"
          ) as TransactionEventSmartContractLog | undefined;
          if (firstMemo) {
            const [, memoText] = handleContractLogHex(
              firstMemo.contract_log.value.repr
            ).split(" ");
            await doAccountingForDistId(memoText, tx_id);
          }
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};
