import { InjectedConnector } from "@web3-react/injected-connector";
import { supportedChains } from "./chains";

export const injectedConnector = new InjectedConnector({ supportedChainIds: supportedChains })
