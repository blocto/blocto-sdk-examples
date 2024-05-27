import { useState } from "react";
import "./App.css";
import { bloctoSDK } from "./services/ethereum";
import BLTButton from "./components/Button";

const handleAdd = async () => {
  try {
    await bloctoSDK?.ethereum?.request({
      method: "wallet_addEthereumChain", // add chain first
      params: [
        {
          chainId: "0x61", // Polygon testnet
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"]
        }
      ]
    });
    console.log(bloctoSDK?.ethereum?.chainId, bloctoSDK?.ethereum?.rpc);
  } catch (error) {
    console.error(error);
  }
};
const handleSwitch = async (chainId) => {
  try {
    await bloctoSDK?.ethereum?.request({
      method: "wallet_switchEthereumChain", // add chain first
      params: [
        {
          chainId
        }
      ]
    });
    console.log(bloctoSDK?.ethereum?.chainId, bloctoSDK?.ethereum?.rpc);
  } catch (error) {
    console.error(error);
  }
};

export default function App() {
  const [address, setAddress] = useState(null);
  const [message, setMessage] = useState(
    JSON.stringify(bloctoSDK?.ethereum?.switchableNetwork)
  );
  const [chainId, setChainId] = useState(bloctoSDK?.ethereum?.chainId);
  const loginHandler = async () => {
    const accounts = await bloctoSDK?.ethereum?.enable();
    console.log("accounts", accounts[0]);
    setAddress(accounts[0]);
  };

  const logoutHandler = async () => {
    await bloctoSDK?.ethereum?.request({ method: "wallet_disconnect" });
    localStorage.removeItem("sdk.session");
    setAddress(null);
  };

  return (
    <div className="App">
      {address ? (
        <>
          <BLTButton onClick={logoutHandler}>Logout</BLTButton>
          <BLTButton
            onClick={() => {
              handleAdd().then(() => {
                setMessage(
                  JSON.stringify(bloctoSDK?.ethereum?.switchableNetwork)
                );
              });
            }}
          >
            Add chain 0x13882
          </BLTButton>
          <BLTButton
            onClick={() => {
              handleSwitch("0x61").then(() => {
                setChainId(bloctoSDK?.ethereum?.chainId);
              });
            }}
          >
            Switch to 0x13882
          </BLTButton>
          <BLTButton
            onClick={() => {
              handleSwitch("0x13882").then(() => {
                setChainId(bloctoSDK?.ethereum?.chainId);
              });
            }}
          >
            Switch to 0x61
          </BLTButton>
          <br />
          Switchable chainId inside sdk now:
          <p>{message}</p>
          <br />
          chainId now:
          <p>{chainId}</p>
        </>
      ) : (
        <BLTButton onClick={loginHandler}>Login</BLTButton>
      )}
    </div>
  );
}
