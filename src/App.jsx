import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
  useContractWrite,
  useContractRead
} from "@thirdweb-dev/react";
import "./styles/Home.css";
import { simpleStorageAddress } from "../const/yourDetails";
import { simpleStorageAbi } from "../simpleStorageAbi";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { useState } from "react";

export default function Home() {
  
  const { contract, isLoading, error } = useContract(simpleStorageAddress, simpleStorageAbi);
  const { mutateAsync } = useContractWrite(
    contract,
    "store"
  );

  const { data } = useContractRead(contract, 'retrieve');


  const [ myNumber, setMyNumber ] = useState(0);
  

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <h1>
          if read works, you should see a number below:
        </h1>

        <h1>
          { data && BigNumber.isBigNumber(data) && 
            formatUnits(data, 0)
          }
        </h1>

        <p className="description">
          Log in and change the number!
        </p>

        <div className="connect">
          <ConnectWallet
            dropdownPosition={{
              align: "center",
              side: "bottom",
            }}
            btnTitle="Login"
          />
        </div>

        <input value={ myNumber } onChange={(e) => setMyNumber(e.target.value)} type='number' />
        <br/>

        <Web3Button contractAddress={simpleStorageAddress}
        action={() => mutateAsync({
          args: [
            //this is the number that gets stored
            myNumber
        ]
        })} >
          change number
        </Web3Button>

      </main>
    </div>
  );
}
