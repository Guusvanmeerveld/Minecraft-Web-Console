import { NextPage } from 'next';

import Page from '@components/Page';
import Layout from '@components/Layout';

import Performance from '@components/Performance';

const Home: NextPage = () => (
	<Page description="Home page" title="Home">
		<Layout>
			<div className="container">
				<Performance />
			</div>
		</Layout>
	</Page>
);

export default Home;
