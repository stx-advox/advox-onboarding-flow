import fetch from "node-fetch";
export const checkNameValid = async (name) => {
  const result = await fetch(
    `https://stacks-node-api.mainnet.stacks.co/v1/names/${name}`
  );
  const body = await result.json();
  console.log(body);
  return !body.error;
};
