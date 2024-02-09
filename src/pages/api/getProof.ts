import sudoku_program from "@/../circuit/target/sudoku.json";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(request: NextApiRequest, res: NextApiResponse) {
  const sudokuArray = [
    5, 3, 0, 0, 7, 0, 0, 0, 0, 6, 0, 0, 1, 9, 5, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0,
    6, 0, 8, 0, 0, 0, 6, 0, 0, 0, 3, 4, 0, 0, 8, 0, 3, 0, 0, 1, 7, 0, 0, 0, 2,
    0, 0, 0, 6, 0, 6, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 4, 1, 9, 0, 0, 5, 0, 0, 0,
    0, 8, 0, 0, 7, 9,
  ];

  const body = {
    puzzle: [
      [0, 1, 0, 0, 0, 8, 0, 0, 0],
      [0, 6, 2, 4, 0, 0, 0, 3, 5],
      [0, 0, 0, 0, 3, 2, 0, 0, 0],
      [6, 5, 0, 2, 0, 9, 0, 0, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 5, 0, 6, 0],
      [0, 0, 9, 0, 0, 0, 0, 7, 0],
      [3, 8, 0, 0, 0, 0, 2, 0, 1],
      [0, 0, 5, 0, 0, 0, 0, 9, 0],
    ],
    solution: [
      [7, 1, 3, 5, 9, 8, 4, 2, 6],
      [9, 6, 2, 4, 1, 7, 8, 3, 5],
      [5, 4, 8, 6, 3, 2, 9, 1, 7],
      [6, 5, 1, 2, 4, 9, 7, 8, 3],
      [8, 9, 7, 3, 6, 1, 5, 4, 2],
      [2, 3, 4, 7, 8, 5, 1, 6, 9],
      [4, 2, 9, 1, 5, 3, 6, 7, 8],
      [3, 8, 6, 9, 7, 4, 2, 5, 1],
      [1, 7, 5, 8, 2, 6, 3, 9, 4],
    ],
  };



  console.log({sudoku_program})
  const inputsFail = { solution: body.puzzle.flatMap(x => x) };
  const inputsCorrect = { solution: body.solution.flatMap(x => x) };
  // console.log({inputsFail, inputsCorrect})


  //@ts-expect-error
  const backend = new BarretenbergBackend(sudoku_program);
  console.log({backend})
  //@ts-expect-error
  const program = new Noir(sudoku_program, backend);
  console.log({program})


 try {
   console.log("Getting proof data...");
   const proofData = await program.generateFinalProof(inputsCorrect);

   console.log("done");
   console.log("Verifying proof");
   const verifiedProof = await program.verifyFinalProof(proofData);

   console.log("done");
   console.log({ verifiedProof });
	return res.status(200).json({ verifiedProof, proofData });

 }catch (error) {
  console.log({error})
   //@ts-expect-error
   return res.status(500).json({error: error.message})
 }




}

