import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

interface ContactNextApiRequest extends NextApiRequest {
  email: string;
  name: string;
  message: string;
}

const handler = async (req: ContactNextApiRequest, res: NextApiResponse) => {
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

    const newMessage = {
      email,
      name,
      message,
    };

    try {
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.bllf1q7.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
      );

      const db = client.db();

      const result = await db.collection('messages').insertOne(newMessage);

      const messageAfterStoring = {
        ...newMessage,
        _id: result.insertedId,
      };

      client.close();
      res.status(201).json({
        message: 'Successfully stored message!',
        contactMessage: messageAfterStoring,
      });
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database' });
    }
  }
};

export default handler;
