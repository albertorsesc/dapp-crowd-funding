import { useContext, createContext } from 'react';
import {
	useAddress,
	useContract,
	useMetamask,
	useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const { contract } = useContract(
		'0xCF8929b56f4b22Eff56438A15f3b7eCD00cd5420'
	);
	const { mutateAsync: createCampaign } = useContractWrite(
		contract,
		'createCampaign'
	);

	const address = useAddress();
	const connect = useMetamask();

	const publishCampaign = async (form) => {
		try {
			const data = await createCampaign([
				address,
				form.title,
				form.description,
				form.target,
				new Date(form.deadline).getTime(),
				form.image,
			]);
		} catch (error) {
			console.log('contract creation error: ', error);
		}
	};

	const getCampaigns = async () => {
		const campaigns = await contract.call('getCampaigns');

		const parsedCampaigns = campaigns.map((campaign, index) => ({
			owner: campaign.owner,
			title: campaign.title,
			description: campaign.description,
			target: ethers.utils.formatEther(campaign.targetAmount.toString()),
			deadline: campaign.deadline.toNumber(),
			amountCollected: ethers.utils.formatEther(
				campaign.amountCollected.toString()
			),
			image: campaign.image,
			pId: index,
		}));

		return parsedCampaigns;
	};

	const getUserCampaigns = async () => {
		const allCampaigns = await getCampaigns();

		const filteredCampaigns = allCampaigns.filter(
			(campaign) => campaign.owner === address
		);

		return filteredCampaigns;
	};

	return (
		<StateContext.Provider
			value={{
				address,
				contract,
				connect,
				createCampaign: publishCampaign,
				getCampaigns,
				getUserCampaigns,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
