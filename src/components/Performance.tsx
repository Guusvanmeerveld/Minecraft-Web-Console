import { FC } from 'react';
import useSWR from 'swr';

import { ResponsiveLine } from '@nivo/line';
import { FaThermometerHalf } from 'react-icons/fa';

import styles from './Performance.module.scss';

import CPUData from '@models/cpu';

const DisplayStatistics: FC = () => {
	const { data, error } = useSWR<CPUData>('/api/cpu', { refreshInterval: 10000 });

	if (error) return <div>Failed to load data</div>;
	if (!data) return <div>Loading performance data</div>;

	return (
		<div>
			{data.temperature ? (
				<div>
					<h3>
						Temperature: {data.temperature.toPrecision(3)}
						<FaThermometerHalf size={20} />
					</h3>
				</div>
			) : (
				<h3>Failed to load temperature data</h3>
			)}

			{/* <ResponsiveLine
				// data={data}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			/> */}

			<h3>CPU Speed: {data.speed} GHz</h3>
		</div>
	);
};

const Performance: FC = () => {
	return (
		<div id="#performance" className={styles.performance}>
			<h1 className="header">Performance</h1>

			<DisplayStatistics />
		</div>
	);
};

export default Performance;
