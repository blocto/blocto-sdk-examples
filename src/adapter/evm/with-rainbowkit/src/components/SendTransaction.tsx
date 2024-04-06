import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

const SendTransaction = () => {
  const {
    data: transactionData,
    error: transactionError,
    sendTransaction,
  } = useSendTransaction();

  const { isConnected } = useAccount();

  return (
    <div>
      <button
        disabled={!isConnected || !sendTransaction}
        onClick={() =>
          sendTransaction?.({
            to: "0x945de2DeaDb397Da7005cC5FE37d36e4c674E83d", // send to address as Address,
            value: parseEther("0"),
          })
        }
        type="button"
      >
        Send Transaction
      </button>
      {transactionData && (
        <div>Transaction: {JSON.stringify(transactionData)}</div>
      )}
      {transactionError && <div>Error sending transaction</div>}
    </div>
  );
};
export default SendTransaction;
