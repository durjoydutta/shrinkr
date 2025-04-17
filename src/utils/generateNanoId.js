import { nanoid } from "nanoid";

// generate nanoid with a customAlphabet and length
const customAlphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateCustomId = (length) => nanoid(length, { alphabet: customAlphabet });

export default generateCustomId;