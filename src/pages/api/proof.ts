import sudoku_program from "@/../circuit/target/sudoku.json";
import { solveSudoku } from "@/utils/sudoku";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let solution;
  if (req.method === 'POST') {
    solution = req.body.solution
  }
  else {

    const puzzle=   [
      0, 2, 0, 0, 5, 0, 0, 8, 9, 0, 5, 6, 7, 0, 9, 1, 0, 3, 7, 8, 9, 0, 2, 3, 0, 0,
      6, 2, 1, 0, 3, 0, 5, 0, 9, 0, 3, 6, 5, 8, 9, 7, 0, 1, 4, 8, 0, 7, 2, 0, 4, 3,
      0, 5, 5, 3, 1, 6, 0, 0, 9, 7, 8, 6, 0, 2, 9, 0, 8, 0, 3, 1, 9, 7, 0, 5, 3, 1,
      6, 4, 2,
    ]
    solution = solveSudoku(puzzle)!
  }




  const input = { solution };



  //@ts-expect-error
  const backend = new BarretenbergBackend(sudoku_program);
  //@ts-expect-error
  const program = new Noir(sudoku_program, backend);


 try {
   const proofData = await program.generateFinalProof(input);
   const verifiedProof = await program.verifyFinalProof(proofData);
	return res.status(200).json({ verifiedProof, proofData });

 }catch (error) {
  console.log({error})
   //@ts-expect-error
   return res.status(500).json({error: error.message})
 }

}

