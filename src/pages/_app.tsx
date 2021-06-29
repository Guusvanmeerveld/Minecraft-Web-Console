import type { AppProps } from 'next/app';
import React from 'react';

import 'milligram';

import 'styles/ubuntu.css';
import 'styles/roboto.css';
import 'styles/globals.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => <Component {...pageProps} />;

export default App;
