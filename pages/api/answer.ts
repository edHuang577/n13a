import { NextApiRequest, NextApiResponse } from "next";

export default function handleAnswer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { answer } = req.body;
  console.log(`Received answer: ${answer}`);
  res.status(200).json({ message: "Answer received" });
}
