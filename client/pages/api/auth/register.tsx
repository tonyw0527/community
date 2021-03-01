// for local testing
interface AuthResult {
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  token: string;
}

export default (req: any, res: any) => {
  console.log(req.body);
  const { email, nickname } = req.body;
  res.status(200).json({
    user: {
      id: "12123123",
      email: email,
      nickname: nickname,
    },
    token: "#@#erwer@#$#@",
  });
};
