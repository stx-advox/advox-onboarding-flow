import { Client, Guild } from "discord.js";
// @ts-ignore
import { STACKS_GUILD } from "./constants.ts";

export const getStacksServer = (client: Client) =>
  client.guilds.cache.get(STACKS_GUILD) as Guild;
