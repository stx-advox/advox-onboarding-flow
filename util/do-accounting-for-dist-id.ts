import { getTxUrl, treasuryId } from "./constants";
import { manager } from "./sc";

export const doAccountingForDistId = async (distId: string, txId: string) => {
  const ledgerResult = await manager.reloadLedger();
  if (ledgerResult.error) {
    return {
      type: "FAILURE",
      error: `Error processing ledger events: ${ledgerResult.error}`,
    };
  }
  const { allocations } = manager.ledger.distribution(distId);
  for (let { receipts } of allocations) {
    for (let { id } of receipts) {
      const amount = manager.ledger.account(id).balance;
      if (Number(amount) > 0 && id !== treasuryId) {
        manager.ledger.transferGrain({
          from: id,
          to: treasuryId,
          amount,
          memo: getTxUrl(txId),
        });
      }
    }
  }

  await manager.persist();
};
