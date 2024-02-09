// handle frame actions
// ./app/frames/route.ts

import { Frame, getFrameHtml, validateFrameMessage } from "frames.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
				label: "Button 1",
				action: "post"
      },
      {
				// label: `Next (pressed by ${message.data.fid})`,'
				label: "Button 2",
				action: "post"
      },
      {
				// label: `Next (pressed by ${message.data.fid})`,'
				label: "Button 3",
				action: "post"
      },
      {
				// label: `Next (pressed by ${message.data.fid})`,'
				label: "Button 4",
				action: "post"
      },
    ],
    ogImage: `${imageUrlBase}/600`,
    postUrl: `${process.env.HOST}/frames`,
  }

  // Return the frame as HTML
  const html = getFrameHtml(frame);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
    status: 200,
  });
}
