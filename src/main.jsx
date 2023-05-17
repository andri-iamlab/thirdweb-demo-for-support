import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import "./styles/globals.css";
import { TWApiKey, TWFactoryAddress, activeChain } from "../const/yourDetails";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      supportedWallets={[
        smartWallet({
          factoryAddress: TWFactoryAddress,
          thirdwebApiKey: TWApiKey,
          gasless: true,
          personalWallets: [localWallet({ persist: true })],
        }),
      ]}
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerUrl: 'https://api.defender.openzeppelin.com/autotasks/29a22ea4-1451-4360-80b3-62b0a434405b/runs/webhook/d94a33e8-6cb0-4414-86cf-9c752f5095e1/VWpVyVDnVvPyFD2eVFBaz4'
          }
        }
      }}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
