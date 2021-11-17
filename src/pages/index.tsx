import { Button, Container, Text } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import React, { ReactElement, useEffect, useState } from 'react';

import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { injected } from '../utils/connection';

interface Props {}

export default function Index({}: Props): ReactElement {
	const { active, activate, account } = useWeb3React();

	const connect = async () => {
		try {
			await activate(injected);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container height="100vh">
			<Button onClick={connect}>Connect to Metamask</Button>
			{active ? <Text>{account}</Text> : <span>Not connected!</span>}
			<DarkModeSwitch />
		</Container>
	);
}
