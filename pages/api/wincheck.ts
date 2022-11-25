import { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors';
import { isWinner } from "src/utilities";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  const parsed = JSON.parse(req.body)
  const board = parsed.board
  const player = parsed.player

  if(!board || !player){
     res.status(400).json({message: "board and player are required"})
  }

  const winner = isWinner(player,board)

  if (!winner){
    res.status(200).json({gameOver: false, winner: null})
  }
  if(winner){
    res.status(200).json({gameOver: true, winner: player})
  }
}
