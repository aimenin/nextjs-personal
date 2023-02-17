import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }
};

export default handler;
