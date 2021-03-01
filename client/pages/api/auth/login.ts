// for local testing

export default (req: any, res: any) => {
  console.log(req.body);
  if(req.body.password === 'test'){
    res.status(200).json({ msg: 'auth completed' })
  } else {
    res.status(401).json({ msg: 'not matched password' })
  }
}