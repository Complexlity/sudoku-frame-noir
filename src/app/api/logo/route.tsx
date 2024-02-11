import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";
import noirImage from '@/../public/noir.png'
import frameImage from '@/../public/frame.png'
import satori from "satori";
import { join } from "path";
import * as fs from 'fs'

const interRegPath = join(process.cwd(), "public/Inter-Regular.ttf");
let interReg = fs.readFileSync(interRegPath);
console.log({ interRegPath });

const interBoldPath = join(process.cwd(), "public/Inter-Bold.ttf");
let interBold = fs.readFileSync(interBoldPath);
console.log({ interBoldPath });



export async function POST(request: NextRequest) {
  const imagePath = process.env.HOST + '/noir.png'
  console.log({imagePath})


  const svg = await satori(
    <div
      style={{
        display: "flex",
        fontSize: 40,
        fontWeight: 200,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "black",
        justifyContent: "center",
        margin: "0 auto",
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
        <img
          src={imagePath}
          width={200}
          height={300}
          alt="Noir Image"
        />
        Hello world
      </div>
    </div>,
    {
      width: 800,
      height: 800,
      fonts: [
        {
          name: "Inter",
          data: interReg,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 800,
          style: "normal",
        },
      ],
    }
  );

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "max-age=10",
    },
  });


}

export const GET = POST;

