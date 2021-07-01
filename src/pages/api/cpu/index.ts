import type { NextApiHandler } from 'next';

import CPUData from '@models/cpu';

import CPU from '@utils/cpu';

const handler: NextApiHandler<CPUData> = (req, res) =>
	Promise.all([CPU.getTemperature(), CPU.getUsage()])
		.then((data) => res.status(200).json({ temperature: data[0], ...data[1] }))
		.catch(() => res.status(500).end());

export default handler;
