import { Frame, getFrameFlattened } from "frames.js";
import type { Metadata } from "next";

// Declare the frame
const initialFrame: Frame = {
  image: `${process.env.HOST}/sudoku.png`,
  version: "vNext",
  buttons: [
    {
      label: "Noob",
      action: "post",
    },
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
  postUrl: `${process.env.HOST}/sudoku`,
  imageAspectRatio: "1:1",
  accepts: [
    {
      id: "farcaster",
      version: "vNext",
    },
    {
      id: "xmtp",
      version: "vNext",
    },
  ],
};

// Export Next.js metadata
export const metadata: Metadata = {
  title: "Sudoku on Frames",
  description: "This is a playable sudoku game powered by noir and frames.js",
  openGraph: {
    images: [
      {
        url: `${process.env.HOST}/sudoku.png`,
      },
    ],
  },
  other: {
    ...getFrameFlattened(initialFrame),
    "of:accepts:xmtp": "vNext",
  },
};

export default function Page() {
  return <div></div>;
}
