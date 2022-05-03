const POX_START_BLOCK = 666050 + 2000;

export const getCycleBounds = (
  cycleId: number
): [startBlock: number, endBlock: number] => {
  const startBlock = POX_START_BLOCK + cycleId * 2100;
  const endBlock = POX_START_BLOCK + (cycleId + 1) * 2100;
  return [startBlock, endBlock];
};
