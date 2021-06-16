import { useWeb3React } from "@web3-react/core";
import useETHBalance from "../hooks/useETHBalance";
import { Web3Provider } from "@ethersproject/providers";

const ETHBalance = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account);

  return <p>Balance: Ξ{data}</p>;
};

export default ETHBalance;
