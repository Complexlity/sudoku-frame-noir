import { Frame, getFrameFlattened } from "frames.js";
import type { Metadata } from "next";

// Declare the frame
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
  imageAspectRatio: "1:1"
};

// Export Next.js metadata
export const metadata: Metadata = {
  title: "Random Image Frame",
  description: "This is an example of a simple frame using frames.js",
  openGraph: {
    images: [
      {
        url: "https://picsum.photos/seed/frames.js/600",
      },
    ],
  },
  other: getFrameFlattened(initialFrame),
};

export default function Page() {
  return (
    <div>Hello world</div>
  )
}

