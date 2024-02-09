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


// Function to redirect with 302 nextjs
// return  NextResponse.redirect(
//       prevFrame.prevRedirects[
//         `${prevFrame.postBody?.untrustedData.buttonIndex}`
//       ]!,
//       { status: 302 }

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    body = {
      untrustedData: {
        buttonIndex: 1,
        fid: 213144,
      },
    };
  }
  const { searchParams } = new URL(request.url);

  const buttonId = body.untrustedData.buttonIndex;
  let level = searchParams.get("level");
  console.log({ level });
  let puzzleState = searchParams.get("puzzleState");
  console.log({ puzzleState });
  if (!level) {
    console.log("I am here because level is missing");
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
      image: `${process.env.HOST}/api/board`,
      buttons: [
        {
          // label: `Next (pressed by ${message.data.fid})`,'
          label: "Play",
          action: "post",
        },
        {
          // label: `Next (pressed by ${message.data.fid})`,'
          label: "Enlarge Board",
          action: "post_redirect",
        },
        {
          // label: `Next (pressed by ${message.data.fid})`,'
          label: "Verify",
          action: "post",
        },
      ],
      ogImage: `${process.env.HOST}/api/board`,
      postUrl: `${process.env.HOST}/frames?level=${level}&puzzleState=${puzzleState}`,
      inputText: "Enter next number",
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
  // const body = await request.json();

  // Parse and validate the frame message
  // const { isValid, message } = await validateFrameMessage(body);
  // if (!isValid || !message) {
  //   return new Response("Invalid message", { status: 400 });
  // }

  const randomInt = Math.floor(Math.random() * 100);
  const imageUrlBase = `https://picsum.photos/seed/${randomInt}`;

  // Use the frame message to build the frame
  const frame: Frame = {
    version: "vNext",
    image: `${imageUrlBase}/1146/600`,
    buttons: [
      {
        // label: `Next (pressed by ${message.data.fid})`,'
        label: "Easy",
        action: "post",
      },
      {
        // label: `Next (pressed by ${message.data.fid})`,'
        label: "Medium",
        action: "post",
      },
      {
        // label: `Next (pressed by ${message.data.fid})`,'
        label: "Hard",
        action: "post",
      },
    ],
    ogImage: `${imageUrlBase}/600`,
    postUrl: `${process.env.HOST}/frames`,
  };

  // Return the frame as HTML
  const html = getFrameHtml(frame);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
    status: 200,
  });
}
