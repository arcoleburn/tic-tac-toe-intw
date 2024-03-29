import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getByYear, getByYearAndMake } from "@utilities/cars/carUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const query = req.query;

  const { year } = query;

  const make = query.make as string;

  if (!year || !make) {
    return res
      .status(400)
      .json({
        error:
          "YEAR and MAKE are required to search models. please ensure your request contains valid query params for both year and make",
      });
  }
  const data = getByYearAndMake(year, make);

  res.status(200).json({ data });
}
