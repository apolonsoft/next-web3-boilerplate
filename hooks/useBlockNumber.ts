import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { Web3Provider } from "@ethersproject/providers";

function getBlockNumber(library: Web3Provider) {
  return async () => {
    return library.getBlockNumber();
  };
}

export default function useBlockNumber() {
  const { library } = useWeb3React<Web3Provider>();
  const shouldFetch = !!library;

  return useSWR(shouldFetch ? ["BlockNumber"] : null, getBlockNumber(library), {
    refreshInterval: 10 * 1000,
  });
}
