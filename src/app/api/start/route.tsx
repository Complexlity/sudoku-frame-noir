// handle frame actions
// ./app/frames/route.ts

import { Frame, getFrameHtml } from "frames.js";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest){

  const initialFrame: Frame = {
    image: "https://picsum.photos/seed/frames.js/1146/600",
    version: "vNext",
    buttons: [
      {
        label: "Easy",
        action: "post",
      },
      {
        label: "Medium",
        action: "post",
      },
      {
        label: "Hard",
        action: "post",
      },
    ],
    postUrl: `${process.env.HOST}/frames`,
    imageAspectRatio: "1:1",
  };

  // Return the frame as HTML
  const html = getFrameHtml(initialFrame);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
    status: 200,
  });
}
