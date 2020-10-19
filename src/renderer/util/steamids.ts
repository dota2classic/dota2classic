import BigNumber from "bignumber.js";

const magic = new BigNumber("76561197960265728");
export const extractSteam32 = (steam32: string) => steam32.substring(1, steam32.length - 1).split(":")[2]
export const steam32to64 = (steam32: string): string => {
  const converted = new BigNumber(
    steam32.substring(1, steam32.length - 1).split(":")[2]
  );

  const steam64 = magic.plus(converted);

  return steam64.toString();
};

export const steam64to32 = (steam64s: string): string => {
  const steam64 = new BigNumber(steam64s);

  const steam32 = steam64.minus(magic);

  return `[U:1:${steam32}]`;
};
