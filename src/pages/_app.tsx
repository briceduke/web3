import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import { AppProps } from 'next/app';
import Web3 from 'web3';

import theme from '../theme';

const getLibrary = (provider) => {
	return new Web3(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Component {...pageProps} />
			</Web3ReactProvider>
		</ChakraProvider>
	);
}

export default MyApp;
