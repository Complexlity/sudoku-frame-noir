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

type BoardSize = 'small' | 'large'
export interface SizeSchema {
  innerBoardWidth: string;
  innerBoardHeight: string;
  cellWidth: string;
  cellHeight: string;
  cellFontSize: string;
  cellPadding: string;
  thinBorder: string;
  semiThickBorder: string;
  thickBorder: string;
  mainDivFontSize: number;
  mainDivFontWeight: number;
  innerDivFontSize: number;
  satoriWidth: number;
  satoriHeight: number;
  sharpResize: number;
}

function getSizes(size: BoardSize): SizeSchema {
  switch (size) {
    case "large":
      return {
        innerBoardWidth: "2250px",
        innerBoardHeight: "2250px",
        cellWidth: "250px",
        cellHeight: "250px",
        cellFontSize: "250px",
        cellPadding: "15px 15px",
        thinBorder: "2.5px solid black",
        semiThickBorder: `10px solid black`,
        thickBorder: "15px solid black",
        mainDivFontSize: 15,
        mainDivFontWeight: 600,
        innerDivFontSize: 28,
        satoriWidth: 2250,
        satoriHeight: 2250,
        sharpResize: 2340,
      };
    default:
      return {
        innerBoardWidth: "360px",
        innerBoardHeight: "360px",
        cellWidth: "40px",
        cellHeight: "40px",
        cellFontSize: "30px",
        cellPadding: "2px 2px",
        thinBorder: "1px solid black",
        semiThickBorder: "1.5px solid black",
        thickBorder: "2px solid black",
        mainDivFontSize: 5,
        mainDivFontWeight: 600,
        innerDivFontSize: 20,
        satoriWidth: 600,
        satoriHeight: 400,
        sharpResize: 1200,
      };
  }
}


export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const size = (searchParams.get("size") || 'small') as BoardSize



  const sudokuArray = [
    5, 3, 0, 0, 7, 0, 0, 0, 0, 6, 0, 0, 1, 9, 5, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0,
    6, 0, 8, 0, 0, 0, 6, 0, 0, 0, 3, 4, 0, 0, 8, 0, 3, 0, 0, 1, 7, 0, 0, 0, 2,
    0, 0, 0, 6, 0, 6, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 4, 1, 9, 0, 0, 5, 0, 0, 0,
    0, 8, 0, 0, 7, 9,
  ];


  const sizes = getSizes(size)

  const styles = {
    innerBoard: {
      display: "flex",
      flexWrap: "wrap",
      width: sizes.innerBoardWidth, // Adjust this according to your preference
      height: sizes.innerBoardHeight, // Adjust this according to your preference
      border: "none",
      margin: "2px auto",
    },
    cell: {
      width: sizes.cellWidth,
      height: sizes.cellHeight,
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: sizes.cellFontSize,
      borderCollapse: "collapse",
      margin: "0 auto",
      padding: sizes.cellPadding
    },
  };

  const getCellBorder = (index: number) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const borderStyle = {
      borderTop: row % 3 === 0 ? sizes.semiThickBorder : sizes.thinBorder,
      borderBottom: row % 3 === 2 ? sizes.semiThickBorder : sizes.thinBorder,
      borderLeft: col % 3 === 0 ? sizes.semiThickBorder : sizes.thinBorder,
      borderRight: col % 3 === 2 ? sizes.semiThickBorder : sizes.thinBorder,
    };
    if (row === 0) borderStyle.borderTop = sizes.thickBorder ;
    if (row === 8) borderStyle.borderBottom = sizes.thickBorder;
    if (col === 0) borderStyle.borderLeft = sizes.thickBorder;
    if (col === 8) borderStyle.borderRight = sizes.thickBorder;
    return borderStyle;
  };

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        fontSize: sizes.mainDivFontSize,
        fontWeight: sizes.mainDivFontWeight,
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
          fontSize: sizes.innerDivFontSize,
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
      width: sizes.satoriWidth,
      height: sizes.satoriHeight,
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
    .resize(sizes.sharpResize)
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
