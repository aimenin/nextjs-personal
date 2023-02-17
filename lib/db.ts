import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.bllf1q7.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
  );

  return client;
};
