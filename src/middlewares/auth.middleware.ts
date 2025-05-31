import jwt from 'jsonwebtoken';


const authenticate = (req: any, res: any, next: any) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err: any) {
    console.error('Inavlid Token', err.message)
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticate;
