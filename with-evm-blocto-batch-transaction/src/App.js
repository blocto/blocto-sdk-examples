import { useState } from "react";
import "./App.css";
import { bloctoSDK, web3, contract } from "./services/ethereum";
import BLTButton from "./components/Button";

export default function App() {
  const [address, setAddress] = useState(null);
  const [txHash, setTxHash] = useState(null);

  const loginHandler = async () => {
    const accounts = await bloctoSDK?.ethereum?.request({
      method: "eth_requestAccounts"
    });
    setAddress(accounts[0]);
  };

  const withJsonRPC = async () => {
    try {
      const recipient = "0xc61B4Aa62E5FD40cceB08C602Eb5D157b257b49a"; // replace with the recipient's address

      const _txHash = await bloctoSDK.ethereum.request({
        method: "wallet_sendMultiCallTransaction",
        params: [
          [...web3.eth.sendTransaction.request({
            from: address,
            to: recipient,
            data: contract.methods.setValue(123).encodeABI()
          }).params,
          ...web3.eth.sendTransaction.request({
            from: address,
            to: recipient,
            data: contract.methods.setValue(123).encodeABI()
          }).params],
          true,
        ]
      });
      setTxHash(_txHash);
    } catch (error) {
      console.log(error);
    }
  };

  const withWeb3Batch = async () => {
    try {
      const recipient = "0xc61B4Aa62E5FD40cceB08C602Eb5D157b257b49a"; // replace with the recipient's address
      const batch = new web3.BatchRequest();
      batch.add(
        web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', () => { console.log('callback') }),
      );
      batch.add(web3.eth.sendTransaction.request({
        from: address,
        to: recipient,
        data: contract.methods.setValue(123).encodeABI()
      }));
      batch.add(web3.eth.sendTransaction.request({
        from: address,
        to: recipient,
        data: contract.methods.setValue(123).encodeABI()
      }));
      batch.add(web3.eth.sendTransaction.request({
        from: address,
        to: recipient,
        data: contract.methods.setValue(123).encodeABI()
      }));
      batch.add(
        web3.eth.getBalance.request('0x5082F249cDb2f2c1eE035E4f423c46EA2daB3ab1', 'latest', () => { console.log('callback') }),
      );
      batch.execute();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="App">
      {address ? (
        <>
          <BLTButton onClick={withJsonRPC}>JSON-RPC</BLTButton>
          <p>txHash: {txHash}</p>
          <BLTButton onClick={withWeb3Batch}>Web3.js Batch</BLTButton>
        </>
      ) : (
        <BLTButton onClick={loginHandler}>Login</BLTButton>
      )}
    </div>
  );
}
