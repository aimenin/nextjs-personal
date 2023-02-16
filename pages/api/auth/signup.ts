import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

interface AuthNextApiRequest extends NextApiRequest {
  email: string;
  password: string;
}

const handler = async (req: AuthNextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }
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

  const existingUsers = await db.collection('users').findOne({ email: email });

  if (existingUsers) {
    res.status(422).json({ message: 'Users exists already' });
    await client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  client.close();
  res.status(201).json({ message: 'Created User!' });
};

export default handler;
