import { Button, Container } from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';

import { getBalance, getTokenName, getWallet } from '../../lib/Client';
import { DarkModeSwitch } from '../components/DarkModeSwitch';

interface Props {}

export default function Index({}: Props): ReactElement {
	const [balance, setBalance] = useState(0);
	const [walletAddress, setWalletAddress] = useState('');
	const [tokenName, setTokenName] = useState('');

	const fetchBalance = async () => {
		const bal = await getBalance().catch((err) => console.error(err));

		setBalance(bal);
	};

	const fetchWalletAddress = async () => {
		const wallet = await getWallet();

		setWalletAddress(wallet);
	};

	const fetchTokenName = async () => {
		const name = await getTokenName();

		setTokenName(name);
	};

	useEffect(() => {
		fetchBalance();
		fetchWalletAddress();
		fetchTokenName();
	}, []);

	return (
		<Container height="100vh">
			<h1>{tokenName}</h1>
			<h1>Your balance is {balance} HEDGE</h1>
			<h1>Wallet address: {walletAddress}</h1>
			<Button onClick={fetchBalance}>Refresh</Button>
			<DarkModeSwitch />
		</Container>
	);
}
