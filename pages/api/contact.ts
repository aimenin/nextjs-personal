import { NextApiRequest, NextApiResponse } from 'next';

interface ContactNextApiRequest extends NextApiRequest {
  email: string;
  name: string;
  message: string;
}

const handler = (req: ContactNextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    // Store in database

    const newMessage = {
      email,
      name,
      message,
    };

    console.log('newMessage ', newMessage);
  }
};

export default handler;
