export interface IStackerData {
  stackingTxs: StackingTxs;
  totalStacked: TotalStacked;
  blockRewards: BlockRewards;
}

interface BlockRewards {
  aggregate: Aggregate2;
  nodes: Node2[];
}

interface Node2 {
  reward_amount: number;
  reward_index: number;
  burn_block_height: number;
  burn_block_hash: string;
  recipient_address: string;
}

interface Aggregate2 {
  count: number;
  avg: Avg;
  sum: Avg;
}

interface Avg {
  reward_amount: number;
}

interface TotalStacked {
  aggregate: Aggregate;
}

interface StackingTxs {
  nodes: Node[];
  aggregate: Aggregate;
}

interface Aggregate {
  sum: Sum;
}

interface Sum {
  amount: number;
}

interface Node {
  txid: string;
  stx_address: string;
  amount: number;
  btc_address: string;
  num_cycles: number;
  last_cycle: number;
  is_delegator: boolean;
  first_cycle: number;
}

export const getStackerData = async (
  cycleId: number
): Promise<IStackerData> => {
  const response = await fetch(
    `https://api.stacking-club.com/api/stacker-data?variables=${process.env.STACKING_ADDRESS}____${cycleId}`
  );
  const data = await response.json();
  return data;
};
