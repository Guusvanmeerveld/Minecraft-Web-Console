import { NextApiHandler } from 'next';

import { CPUGraphData } from '@models/cpu';

const handler: NextApiHandler<CPUGraphData> = (req, res) => {
	res.end('je moeder');
};

export default handler;
