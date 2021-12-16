import { Client, Guild } from "discord.js";
import { STACKS_GUILD } from "./constants";

export const getStacksServer = (client: Client) =>
  client.guilds.cache.get(STACKS_GUILD) as Guild;
