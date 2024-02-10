// handle frame actions
// ./app/frames/route.ts

import { Frame, getFrameHtml, validateFrameMessage } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import { generateSudoku } from "@/utils/sudoku";

//TODO: Create function to generate a new sudoku puzzle
function getPuzzle(level: 1 | 2 | 3): string {
  const sudokuArray = generateSudoku(level);
  const sudokuStateAsString = sudokuArray.join("");
  return sudokuStateAsString;
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    body = {
      untrustedData: {
        buttonIndex: 1,
        fid: 213144,
        inputText: "4",
      },
    };
  }
  const { searchParams } = new URL(request.url);

  const buttonId = body.untrustedData.buttonIndex;
  let level = searchParams.get("level");
  let puzzleState = searchParams.get("puzzleState");
  if (!level || !puzzleState) {
    if (buttonId == 1) {
      level = "easy";
      puzzleState = getPuzzle(1);
    } else if (buttonId == 2) {
      level = "medium";
      puzzleState = getPuzzle(2);
    } else {
      level = "hard";
      puzzleState = getPuzzle(2);
    }

    const nextFrame: Frame = {
      version: "vNext",
      image: `${process.env.HOST}/api/board?puzzleState=${puzzleState}`,
      buttons: [
        {
          label: "Play",
          action: "post"

        },
        {
          label: "Enlarge Board",
          action: "link",
          target: `${process.env.HOST}/api/board?size=large&puzzleState=${puzzleState}`,
        },
        {
          label: "Verify",
          action: "post",
        },
      ],
      ogImage: `${process.env.HOST}/api/board`,
      postUrl: `${process.env.HOST}/frames?level=${level}&puzzleState=${puzzleState}`,
      inputText: "Enter next number",
      imageAspectRatio: "1:1"
    };

    const html = getFrameHtml(nextFrame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  }
  if (buttonId == 2) {
    return NextResponse.redirect(
      `${process.env.HOST}/api/board?size=large&puzzleState=${puzzleState}`,
      { status: 302 }
    );
  }
  if (buttonId == 3) {
    const payload = {
      solution: puzzleState
    }
    // verify puzzle state on teh backend server
    const proof = await fetch(`${process.env.PROOF_API_URL}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)

    });
    const result = await proof.json()

    let imageUrl = `${process.env.HOST}/try-again.gif`
    let isGameWon = false
    if (result.proof) {
      // Return error image
      isGameWon = true
      imageUrl = `${process.env.HOST}/congratulations.gif`
    }



    const nextFrame: Frame = {
      version: "vNext",
      // image: `${process.env.HOST}/api/final?gameStatus=${gameStatus}`,
      image: imageUrl,
      buttons: [
        {
          label: "Restart",
          action: "post",
        },
        {
          label: isGameWon ? "Learn Noir" : "Learn Sudoku",
          action: "link",
          target: isGameWon ? "https://noir-lang.org/" : "https://en.wikipedia.org/wiki/Sudoku",
        },
      ],
      // ogImage: `${process.env.HOST}/api/final?gameStatus=${gameStatus}`,
      ogImage: imageUrl,
      postUrl: `${process.env.HOST}`,
      imageAspectRatio: "1:1",
    };

    // Return the frame as HTML
    const html = getFrameHtml(nextFrame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });

  }

  //Else buttonId is 1
  const puzzleStateArray = puzzleState.split('')

  const playerMove = Number(body.untrustedData.inputText)



  //Player must enter a number in the input
  if (!(isNaN(playerMove)) && playerMove !== 0) {
    console.log("Is not NaN", playerMove)
    for (let i = 0; i < puzzleStateArray.length; i++) {
      const curr = Number(puzzleStateArray[i])
      if (curr === 0) {
        puzzleStateArray[i] = `${playerMove}`
        break
      }
    }
    puzzleState = puzzleStateArray.join('')

  }
  else {
  console.log("is NaN", playerMove);
  }

  // const body = await request.json();

  // Parse and validate the frame message
  // const { isValid, message } = await validateFrameMessage(body);
  // if (!isValid || !message) {
  //   return new Response("Invalid message", { status: 400 });
  // }


  // Use the frame message to build the frame
  const nextFrame: Frame = {
    version: "vNext",
    image: `${process.env.HOST}/api/board?puzzleState=${puzzleState}`,
    buttons: [
      {
        label: "Play",
        action: "post",
      },
      {
        label: "Enlarge Board",
        action: "link",
        target: `${process.env.HOST}/api/board?size=large&puzzleState=${puzzleState}`,
      },
      {
        label: "Verify",
        action: "post",
      },
    ],
    ogImage: `${process.env.HOST}/api/board`,
    postUrl: `${process.env.HOST}/frames?level=${level}&puzzleState=${puzzleState}`,
    inputText: "Enter next number",
    imageAspectRatio: "1:1"
  };

  // Return the frame as HTML
  const html = getFrameHtml(nextFrame);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
    status: 200,
  });
}
