// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mcqoa from "../../components/mcqoa";
import mcqoa2 from "components/mcqoa";

type returnType = mcqoa2;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<returnType>
) {
  let r2 = new mcqoa();

  let r3 = new mcqoa2();
  console.log(r3);
  console.log("===========");
  r2.boxId = "2";
  r2.quesId = "3";
  r2.question = "to be or not to be";
  r2.answer = "that's answer!!";
  r2.choices = ["opt1", "opt2", "opt3", r2.answer];
  r2.shuffleOpt();
  console.log(r2);

  res.status(200).json(r2);
}
