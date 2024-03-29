import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getByYear } from "@utilities/cars/carUtils";

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
  if (!year) {
    return res
      .status(400)
      .json({
        error:
          "YEAR is required to search makes. please ensure your request contains a valid query param for year",
      });
  }
  const data = getByYear(year);

  res.status(200).json({ data });
}
