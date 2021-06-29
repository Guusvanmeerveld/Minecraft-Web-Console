import { FC } from 'react';

import { FaTemperatureLow } from 'react-icons/fa';

import styles from './Performance.module.scss';

const Performance: FC<{ temperature: string }> = ({ temperature }) => {
	return (
		<div id="#performance" className={styles.performance}>
			<h1 className="header">Performance</h1>

			<h3>
				<span>Temperature: {temperature}</span>
				<FaTemperatureLow size={20} />
			</h3>
		</div>
	);
};

export default Performance;
