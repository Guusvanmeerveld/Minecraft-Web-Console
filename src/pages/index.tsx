import Page from '@components/Page';

import { NextPage } from 'next';

const Home: NextPage = () => (
	<Page description="Home page" title="Home">
		<button className="button">Hello world!</button>
	</Page>
);

export default Home;
