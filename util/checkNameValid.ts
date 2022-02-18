import fetch from "cross-fetch";
export const checkNameValid = async (name: string) => {
  const result = await fetch(
    `https://stacks-node-api.mainnet.stacks.co/v1/names/${name}`
  );
  const body = (await result.json()) as any;
  console.log(body);
  return !body.error;
};
