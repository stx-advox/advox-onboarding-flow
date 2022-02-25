export const WELCOME_TEAM_ROLE_ID = "908118835150856212";
export const ADVOCATE_ROLE = "872124401129246822";
export const TEMP_ADVOCATE_ROLE = "908077356986540062";
export const DIDATHING_CHANNEL = "872124843225653278";
export const PROPS_CHANNEL = "872124900431769620";
export const VOUCH_CHANNEL = "872534998790586389";
export const STACKS_GUILD = "621759717756370964";
export const JOIN_REQUESTS_CHANNEL = "892790172444414012";
export const SC_BOT_COMMANDS_CHANNEL = "873229729363275808";
export const UPDATE_NAME_COMMAND = "!sc update-bns-name";
export const DEACTIVATE_COMMAND = "!sc opt-out";
export const PING_COMMAND = "!sc ping";
export const ADVOCATE_WELCOME_ROLE = "908118835150856212";
export const START_HERE_CHANNEL = "916371047102705704";
export const RESOURCES_CHANNEL = "872646462675226654";
export const GRAIN_DISCUSSION_CHANNEL = "872214986452242462";

export const advocatesChannels = [DIDATHING_CHANNEL, PROPS_CHANNEL];

export const treasuryId = "ymd8xn3ZA3CmoAm0DCEmvQ";

export const getTxUrl = (txId: string) =>
  `https://explorer.stacks.co/txid/${txId}?chain=mainnet`;
