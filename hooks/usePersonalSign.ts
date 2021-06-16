import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export const hexlify = (message: string) =>
  "0x" + Buffer.from(message, "utf8").toString("hex");

export default function usePersonalSign() {
  const { library, account } = useWeb3React<Web3Provider>();

  return async (message: string) => {
    return library.send("personal_sign", [hexlify(message), account]);
  };
}
