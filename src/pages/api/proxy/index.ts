import type { NextApiRequest, NextApiResponse } from 'next';

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const allowedOrigins = process.env.PROXY_ORIGINS?.split(',');

  const url = req.query.url;
  if (!url) {
    res.status(400).json({ message: "Missing 'url' param" });
    return;
  }
  if (typeof url !== 'string') {
    res.status(400).json({ message: "Invalid 'url' param" });
    return;
  }
  let origin = '';
  try {
    origin = new URL(url).origin;
  } catch (error) {
    res.status(400).json({ message: "Invalid 'url' param" });
    return;
  }
  if (!allowedOrigins?.includes(origin)) {
    res.status(400).json({ message: "The origin of the url is not supported" });
    return;
  }

  try {
    const response = await fetch(url);
    const body = await response.json();
    res.status(response.status);
    res.json(body);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching URL' });
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return GET(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed", });
  }
}