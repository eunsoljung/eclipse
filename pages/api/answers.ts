import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'answers.json');

function readData() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '{}', 'utf8');
  }
  return JSON.parse(fs.readFileSync(dataFile, 'utf8') || '{}');
}

function writeData(data: Record<string, string>) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { date, answer } = req.body as { date: string; answer: string };
    const data = readData();
    data[date] = answer;
    writeData(data);
    res.status(200).json({ ok: true });
  } else if (req.method === 'GET') {
    const data = readData();
    res.status(200).json(data);
  } else {
    res.status(405).end();
  }
}
