import {
  ConnectButton,
  useChainModal,
  useAccountModal,
} from "@rainbow-me/rainbowkit";
import SendTransaction from "./components/SendTransaction";
import SignMessage from "./components/SignMessage";
import SignTypedData from "./components/SignTypedData";
import { useAccount } from "wagmi";

const App = () => {
  const { isConnected } = useAccount();
  const { openChainModal, chainModalOpen } = useChainModal();
  const { openAccountModal, accountModalOpen } = useAccountModal();

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "flex-start",
        padding: 12,
        gap: 12,
      }}
    >
      <ConnectButton />
      <div>
        {isConnected && (
          <>
            <div
              style={{
                display: "flex",
                gap: 12,
              }}
            >
              <div>Modal hooks</div>
              <button
                disabled={!openChainModal}
                onClick={openChainModal}
                type="button"
              >
                {chainModalOpen ? "Chain modal opened" : "Open chain modal"}
              </button>
              <button
                disabled={!openAccountModal}
                onClick={openAccountModal}
                type="button"
              >
                {accountModalOpen
                  ? "Account modal opened"
                  : "Open account modal"}
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              <h3>
                Example Actions {!isConnected && <span>(not connected)</span>}
              </h3>
              <div
                style={{
                  display: "grid",
                  gap: 12,
                }}
              >
                <SendTransaction />
                <SignMessage />
                <SignTypedData />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
