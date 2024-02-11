import { generateSudoku } from "@/utils/sudoku";
import Image from "next/image";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const robotoMono400 = fetch(
    new URL(
      "../../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());
	const noirImagePath = "https://i.ibb.co/yXtJRRb/logo-1.png";
const frameImagePath = "https://i.ibb.co/xfnR1cL/frame.png";


  // const svg = await satori(
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 24,
          fontWeight: 24,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: "black",
          justifyContent: "center",
          margin: "0 auto",
          backgroundImage: "url(https://i.ibb.co/mN0KLTZ/1.png"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            fontFamily: 'Inter, "Material Icons"',
            fontSize: 24,
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <div>
              Hello world
          </div>
					{/* <img src={frameImagePath} alt="noir image"/>
					<img src={noirImagePath} alt="noir image"/> */}
				</div>
      </div>
    ),
    {
      width: 900,
      height: 900,
      fonts: [
        { name: "Roboto_Mono_400", data: await robotoMono400, weight: 400 },
      ],
    }
  );

  // const img = await sharp(Buffer.from(svg))
  //   .resize(sizes.sharpResize)
  //   .toFormat("png")
  //   .toBuffer();
  // return new NextResponse(img, {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "image/png",
  //     "Cache-Control": "max-age=10",
  //   },
  // });
}


export const runtime = "edge";
