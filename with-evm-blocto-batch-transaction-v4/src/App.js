/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { bloctoSDK, web3, contract } from "./services/ethereum";
import BLTButton from "./components/Button";

export default function App() {
  const [address, setAddress] = useState(null);
  const [result, setResult] = useState(null);

  const loginHandler = async () => {
    const accounts = await bloctoSDK?.ethereum?.request({
      method: "eth_requestAccounts"
    });
    setAddress(accounts[0]);
  };

  const sendBatchTransactionHandler = async () => {
    try {
      const recipient = "0xc61B4Aa62E5FD40cceB08C602Eb5D157b257b49a"; // replace with the recipient's address
      const recipient2 = "0x0000000000000000000000000000000000000000"; // replace with the recipient's address
      const batch = new web3.BatchRequest();

      const request0 = {
        jsonrpc: '2.0',
        id: 11,
        method:"eth_sendTransaction",
        params:[{
          from: address,
          to: recipient,
          data: contract.methods.setValue(123).encodeABI()
         }]
      }
      const request1 = {
        jsonrpc: '2.0',
        id: 10,
        method: 'eth_getBalance',
        params: ['0xf4ffff492596ac13fee6126846350433bf9a5021', 'latest'],
      };
      const request2 = {
        jsonrpc: '2.0',
        id: 12,
        method: 'eth_getBalance',
        params: ['0x5082F249cDb2f2c1eE035E4f423c46EA2daB3ab1', 'latest'],
      };
      const request3 = {
        jsonrpc: '2.0',
        id: 16,
        method:"eth_sendTransaction",
        params:[{
          from: address,
          to: recipient2,
          data: contract.methods.setValue(123).encodeABI()
         }]
      }
      batch.add(request0); 
      batch.add(request1); 
      batch.add(request3); 
      batch.add(request2); 

      const responses = await batch.execute({
        timeout: 500000,
      });
      console.log('responses: ', responses);
      setResult(JSON.stringify(responses))
    } catch (error) {
      console.log(error);
    }
  };
  const sendBatchWithRPC = async () => {
    try {
      const recipient = "0xc61B4Aa62E5FD40cceB08C602Eb5D157b257b49a"; // replace with the recipient's address
      const _txHash = await bloctoSDK.ethereum.request({
        method: "wallet_sendMultiCallTransaction",
        params: [
          [
            {
              from: address,
              to: recipient,
              data: contract.methods.setValue(123).encodeABI()
            },
            {
              from: address,
              to: recipient,
              data: contract.methods.setValue(123).encodeABI()
            }
          ],
          true
        ]
      });
      setResult(_txHash)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {address ? (
        <>
          <BLTButton onClick={sendBatchTransactionHandler}>Web3.js Batch</BLTButton>
          <BLTButton onClick={sendBatchWithRPC}>JSON-RPC</BLTButton>
          <p>Result: {result}</p>
        </>
      ) : (
        <BLTButton onClick={loginHandler}>Login</BLTButton>
      )}
    </div>
  );
}
