import { FC } from 'react';

import { BiCube } from 'react-icons/bi';
import { RiDashboard2Line } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { HiOutlineTerminal } from 'react-icons/hi';
import { MdSettings } from 'react-icons/md';

import styles from './Navbar.module.scss';

const Navbar: FC = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.header}>
				<BiCube size={30} />
				<p>Minecraft web console</p>
			</div>

			<ul className={styles.items}>
				<li>
					<a href="#performance">
						<RiDashboard2Line size={20} />
						<span>Performance</span>
					</a>
				</li>

				<li>
					<a href="#console">
						<HiOutlineTerminal size={20} />
						<span>Console</span>
					</a>
				</li>

				<li>
					<a href="#players">
						<FiUsers size={20} />
						<span>Players</span>
					</a>
				</li>

				<li>
					<a href="#settings">
						<MdSettings size={20} />
						<span>Settings</span>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
