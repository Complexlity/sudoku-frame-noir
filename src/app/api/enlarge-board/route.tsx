// @ts-nocheckk
import * as fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import satori from "satori";
import sharp from "sharp";

const interRegPath = join(process.cwd(), "public/Inter-Regular.ttf");
let interReg = fs.readFileSync(interRegPath);
console.log({ interRegPath });

const interBoldPath = join(process.cwd(), "public/Inter-Bold.ttf");
let interBold = fs.readFileSync(interBoldPath);
console.log({ interBoldPath });

export async function POST(request: NextRequest) {
  const sudokuArray = [
    5, 3, 0, 0, 7, 0, 0, 0, 0, 6, 0, 0, 1, 9, 5, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0,
    6, 0, 8, 0, 0, 0, 6, 0, 0, 0, 3, 4, 0, 0, 8, 0, 3, 0, 0, 1, 7, 0, 0, 0, 2,
    0, 0, 0, 6, 0, 6, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 4, 1, 9, 0, 0, 5, 0, 0, 0,
    0, 8, 0, 0, 7, 9,
  ];

  const styles = {
    innerBoard: {
      display: "flex",
      flexWrap: "wrap",
      width: "2250px", // Adjust this according to your preference
      height: "2250px", // Adjust this according to your preference
      border: "none",
      margin: "0",
    },
    cell: {
      width: "250px",
      height: "250px",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "250px",
      borderCollapse: "collapse",
      margin: "0 auto",
      padding: "15px 15px"
    },
  };

  const getCellBorder = (index: number) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const borderStyle = {
      borderTop: row % 3 === 0 ? "10px solid black" : "2.5px solid black",
      borderBottom: row % 3 === 2 ? "10px solid black" : "2.5px solid black",
      borderLeft: col % 3 === 0 ? "10px solid black" : "2.5px solid black",
      borderRight: col % 3 === 2 ? "10px solid black" : "2.5px solid black",
    };
    if (row === 0) borderStyle.borderTop = "15px solid black";
    if (row === 8) borderStyle.borderBottom = "15px solid black";
    if (col === 0) borderStyle.borderLeft = "15px solid black";
    if (col === 8) borderStyle.borderRight = "15px solid black";
    return borderStyle;
  };

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        fontSize: 15,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "black",
        justifyContent: "center",
        margin:  "0 auto"
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
          fontSize: 28,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        {/* @ts-expect-error */}
        <div style={styles.innerBoard}>
          {sudokuArray.map((num, index) => (
            <div
              key={index}
              // @ts-expect-error
              style={{ ...styles.cell, ...getCellBorder(index) }}
            >
              {num !== 0 ? num : ""}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      width: 2250,
      height: 2250,
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

  const img = await sharp(Buffer.from(svg))
    .resize(2340)
    .toFormat("png")
    .toBuffer();
  return new NextResponse(img, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "max-age=10",
    },
  });
}

export const GET = POST;
