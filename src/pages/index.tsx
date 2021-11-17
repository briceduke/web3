import { Button, Container } from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';

import { getBalance, getWallet } from '../../lib/Client';

interface Props {}

export default function Index({}: Props): ReactElement {
	const [balance, setBalance] = useState(0);
	const [walletAddress, setWalletAddress] = useState('');

	const fetchBalance = async () => {
		const bal = await getBalance().catch((err) => console.error(err));

		setBalance(bal);
	};

	const fetchWalletAddress = async () => {
		const wallet = await getWallet();

		setWalletAddress(wallet);
	};

	useEffect(() => {
		fetchBalance();
		fetchWalletAddress();
	}, []);

	return (
		<Container height="100vh">
			<h1>Your balance is {balance}</h1>
			<h1>Wallet address: {walletAddress}</h1>
			<Button onClick={fetchBalance}>Refresh</Button>
		</Container>
	);
}
