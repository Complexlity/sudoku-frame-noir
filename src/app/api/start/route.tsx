import { Frame, getFrameHtml } from "frames.js";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest){

 const nextFrame: Frame = {
   version: "vNext",
   image: `${process.env.HOST}/sudoku.png`,
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
   ogImage: `${process.env.HOST}/sudoku.png`,
   postUrl: `${process.env.HOST}/frames`,
   imageAspectRatio: "1:1",
 };

 // Return the frame as HTML
 const html = getFrameHtml(nextFrame);

 return new Response(html, {
   headers: {
     "Content-Type": "text/html",
   },
   status: 200,
 });}


export const GET = POST