import { FC } from 'react';

import Head from 'next/head';

const Page: FC<{
	title: string;
	description: string;
	children: JSX.Element[] | JSX.Element;
}> = ({ title, description, children }) => (
	<>
		<Head>
			<meta charSet="UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Minecraft | {title}</title>
			<meta name="description" content={description} />
			<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
		</Head>
		{children}
	</>
);

export default Page;
