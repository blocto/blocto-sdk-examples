import Head from "next/head";
import { useState } from "react";
import { web3, bloctoSDK } from "../services/ethereum";
import ButtonWithResult from "../components/ButtonWithResult";
const userOp = {
  sender: "0x9fd042a18e90ce326073fa70f111dc9d798d9a52",
  nonce: "123",
  initCode: "0x68656c6c6f",
  callData: "0x776F726C64",
  callGasLimit: "1000",
  verificationGasLimit: "2300",
  preVerificationGas: "3100",
  maxFeePerGas: "8500",
  maxPriorityFeePerGas: "1",
  paymasterAndData: "0x626c6f63746f",
  signature: "0x636c656d656e74",
};

const callData =
  "b61d27f600000000000000000000000000005ea00ac477b1030ce78506496e8c2de24bf5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000084161ac21f000000000000000000000000fd8ec18d48ac1f46b600e231da07d1da8209ceef0000000000000000000000000000a26b00c1f0df003000390027140000faa7190000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000";

export default function Home() {
  const [address, setAddress] = useState<undefined | string>(undefined);
  const [userOpHash, setUserOpHash] = useState<string>("");
  const [estimateUserOpHash, setEstimateUserOpHash] = useState<string>("");
  const [userOpByHash, setUserOpByHash] = useState<string>("");
  const [entryPoint, setEntryPoint] = useState<string[]>([]);
  const [chainId, setChainId] = useState<string | null>(null);
  const [userOpReceipt, setUserOpReceipt] = useState<string>("");
  const [generateUserOpHash, setGenerateUserOpHash] = useState<string>("");
  const [userOpHashInput, setUserOpHashInput] = useState<string>("");
  const [userOperationReceiptInput, setUserOperationReceiptInput] =
    useState<string>("");

  const connectHandler = async () => {
    const accounts = await bloctoSDK?.ethereum?.enable();
    const [addr] = accounts || [];
    setAddress(addr);
  };

  const disconnectHandler = async () => {
    await bloctoSDK?.ethereum?.request({ method: "wallet_disconnect" });
    setAddress(undefined);
    setUserOpHash("");
    setEntryPoint([]);
    setUserOpReceipt("");
    setEstimateUserOpHash("");
    setUserOpByHash("");
    setGenerateUserOpHash("");
    setChainId(null);
  };

  const getChainId = async () => {
    try {
      const result = await web3.eth.getChainId();
      setChainId(String(result));
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const getEntryPoint = async () => {
    try {
      const result = await web3.EIP4337.supportedEntryPoints();
      setEntryPoint(result);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const sendUserOp = async () => {
    try {
      if (entryPoint.length === 0) {
        await getEntryPoint();
      }
      const result = await web3.EIP4337.sendUserOperation(
        // @ts-ignore
        {
          callData,
        },
        entryPoint[0]
      );
      setUserOpHash(result);
    } catch (error) {
      console.error("sendUserOp error", error);
    }
  };

  const getUserOperationReceipt = async () => {
    try {
      const result = await web3.EIP4337.getUserOperationReceipt(
        userOperationReceiptInput
      );
      setUserOpReceipt(JSON.stringify(result));
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const estimateUserOpGas = async () => {
    try {
      if (entryPoint.length === 0) {
        await getEntryPoint();
      }
      const result = await web3.EIP4337.estimateUserOperationGas(
        { ...userOp, sender: address as string, callData },
        entryPoint[0]
      );
      console.log("result: ", result);
      setEstimateUserOpHash(JSON.stringify(result));
    } catch (error) {
      console.error("estimateUserOpGas error: ", error);
    }
  };

  const getUserOpByHash = async () => {
    if (!userOpHashInput) {
      return console.error("userOpHashInput is not defined");
    }
    try {
      const result = await web3.EIP4337.getUserOperationByHash(userOpHashInput);
      if (result) {
        console.log("result: ", result);
        setUserOpByHash(JSON.stringify(result));
      }
    } catch (error) {
      console.error("getUserOpByHash error: ", error);
    }
  };

  const generateUserOpHashHandler = async () => {
    try {
      if (!chainId) {
        throw new Error("chainId is not defined");
      }
      if (!entryPoint[0]) {
        throw new Error("entryPoint is not defined");
      }
      const result = await web3.EIP4337.generateUserOpHash(
        userOp,
        entryPoint[0],
        chainId
      );
      setGenerateUserOpHash(JSON.stringify(result));
    } catch (error) {
      console.error("generateUserOpHashHandler error: ", error);
    }
  };

  return (
    <>
      <Head>
        <title>Web3js-plugin-4337 with Blocto</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {address ? (
          <div>
            <div className="connect_btn">
              <ButtonWithResult action={disconnectHandler} label="Disconnect" />
            </div>
            <div className="grid">
              <ButtonWithResult
                action={getChainId}
                result={chainId}
                label="getChainId"
              />
              <ButtonWithResult
                action={getEntryPoint}
                result={entryPoint}
                label="getEntryPoint"
              />
              <ButtonWithResult
                action={sendUserOp}
                result={userOpHash}
                label="sendUserOp"
              />
              <ButtonWithResult
                action={estimateUserOpGas}
                result={estimateUserOpHash}
                label="estimateUserOpGas"
                resultIsJson
              />
              <ButtonWithResult
                action={getUserOpByHash}
                result={userOpByHash}
                label="getUserOpByHash"
                resultIsJson
              >
                <input
                  value={userOpHashInput}
                  placeholder="please input userOpHash"
                  onChange={(e) => setUserOpHashInput(e.target.value)}
                />
              </ButtonWithResult>
              <ButtonWithResult
                action={getUserOperationReceipt}
                result={userOpReceipt}
                label="getUserOpReceipt"
                resultIsJson
              >
                <input
                  value={userOperationReceiptInput}
                  placeholder="hash a userOpHash value returned by eth_sendUserOperation"
                  onChange={(e) => setUserOperationReceiptInput(e.target.value)}
                />
              </ButtonWithResult>
              <ButtonWithResult
                action={generateUserOpHashHandler}
                result={generateUserOpHash}
                label="genUserOpHash"
              />
            </div>
          </div>
        ) : (
          <div className="connect_btn">
            <ButtonWithResult action={connectHandler} label="Connect" />
          </div>
        )}
      </main>
    </>
  );
}
