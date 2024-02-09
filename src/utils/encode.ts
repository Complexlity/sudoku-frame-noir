// function encodeBase64(boardString: string): string {
//   return Buffer.from(boardString).toString("base64");
// }

// function decodeBase64(encodedString: string): string {
//   return Buffer.from(encodedString, "base64").toString("utf-8");
// }

// // Example usage:
// const encodedSudokuString =
//   "000450089406089020789120406014365800365897214897014305530642970600978500008531640";
// const encodedBase64 = encodeBase64(encodedSudokuString);
// console.log("Encoded Base64:", encodedBase64);

// const decodedBase64 = decodeBase64(encodedBase64);
// console.log("Decoded Sudoku String:", decodedBase64);

import {deflateSync, inflateSync} from "zlib";

function encodeShort(boardString: string): string {
  // Step 1: Compress the puzzle state string
  const compressed = deflateSync(boardString);

  // Step 2: Encode the compressed string using Base64
  const encodedBase64 = compressed.toString("base64");

  return encodedBase64;
}

function decodeShort(encodedString: string): string {
  // Step 1: Decode Base64
  const decodedBase64 = Buffer.from(encodedString, "base64");

  // Step 2: Decompress the decoded string
  const decompressed = inflateSync(decodedBase64);

  return decompressed.toString();
}

// Example usage:
const boardString =
  "000450089406089020789120406014365800365897214897014305530642970600978500008531640";
const encodedShort = encodeShort(boardString);
console.log("Encoded Short:", encodedShort);
console.log("Encode Length: ", encodedShort.length)

const decodedShort = decodeShort(encodedShort);
console.log("Decoded Short:", decodedShort);
console.log("Decoded Length:", decodedShort.length);
