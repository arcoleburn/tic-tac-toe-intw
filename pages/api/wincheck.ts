import { NextApiRequest, NextApiResponse } from "next";
import { isWinner } from "src/utilities";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const parsed = JSON.parse(req.body)
  const board = parsed.board
  const player = parsed.player
  const winner = isWinner(player,board)

  if (!winner){
    res.status(200).json({gameOver: false, winner: null})
  }
  if(winner){
    res.status(200).json({gameOver: true, winner: player})
  }
}
