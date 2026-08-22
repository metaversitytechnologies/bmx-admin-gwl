import { convertCode } from "../../../../store/constant";

export const formatDescription = (text) =>
  text?.replace(/\((.*?)\)/g, (match, code) => `(${convertCode(code)})`);
