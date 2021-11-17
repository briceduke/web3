import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import { abi } from './abi';

let selectedAccount: string;

let contract: Contract;

let isInitialized = false;

export const initWeb3 = async () => {
	let provider = (window as any).ethereum;

	if (typeof provider === 'undefined') return;

	provider
		.request({ method: 'eth_requestAccounts' })
		.then((accounts: string[]) => (selectedAccount = accounts[0]));

	provider.on(
		'accountsChanged',
		(accounts: string[]) => (selectedAccount = accounts[0])
	);

	const web3 = new Web3(provider);

	const networkId = await web3.eth.net.getId();

	contract = new web3.eth.Contract(
		abi,
		'0xE7784072FC769D8b7f8C0a3Fa008722eEF5dDDD5'
	);

	isInitialized = true;
};

export const getBalance = async () => {
	if (!isInitialized) await initWeb3();

	return contract.methods
		.balanceOf(selectedAccount)
		.call()
		.then((bal) => {
			return Web3.utils.fromWei(bal);
		});
};

export const getWallet = async () => {
	if (!isInitialized) await initWeb3();

	return selectedAccount;
};
