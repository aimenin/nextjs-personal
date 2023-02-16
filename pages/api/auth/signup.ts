import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

interface AuthNextApiRequest extends NextApiRequest {
  email: string;
  password: string;
}

const handler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid input - password should contain at least 7 characters',
    });

    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const hashedPassword = hashPassword(password);

  db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created User!' });
};

export default handler;
