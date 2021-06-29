import { GetServerSideProps, NextPage } from 'next';

import Page from '@components/Page';
import Layout from '@components/Layout';

import Performance from '@components/Performance';

const Home: NextPage<{ temperature: string }> = ({ temperature }) => (
	<Page description="Home page" title="Home">
		<Layout>
			<div className="container">
				<Performance temperature={temperature} />
			</div>
		</Layout>
	</Page>
);

import cpu from '@utils/cpu';

export const getServerSideProps: GetServerSideProps = async () => {
	const temperature: string = (await cpu.getTemperature()).toPrecision(3);

	return {
		props: {
			temperature,
		},
	};
};

export default Home;
