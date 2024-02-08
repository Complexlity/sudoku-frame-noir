// @ts-nocheck
import { NextRequest } from "next/server";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import hello_json from "@/../circuit/target/hello.json";

export async function POST<ResponseData>(request: NextRequest) {
  //@ts-expect-error
  const backend = new BarretenbergBackend(hello_json)
  //@ts-expect-error
  const noir = new Noir(sudoku_json, backend)

  const input = {
    x,
    y
  }
  let proof
  console.log({noir})
  try {
    proof = await noir.generateFinalProof(input)
    console.log({proof})
  } catch (error) {
    console.log({error})
    return NextResponse.json({ error }, {status: 500})
  }
	return NextResponse.json({ proof }, { status: 200})
}

export const GET = POST;

