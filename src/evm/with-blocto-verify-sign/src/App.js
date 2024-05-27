import { useState } from "react";
import "./App.css";
import { dappAuth } from "./services/ethereum";
import BLTButton from "./components/Button";

export default function App() {
  const [address, setAddress] = useState(
    "0x444d6CEb52453a1E1918455387Ed2eE9179527Bf"
  );
  const [message, setMessage] = useState("icecream");
  const [signature, setSignature] = useState(
    "0x458784dea317110adcf76ba1993b52f66f111a6f174c449a9ad76a39bffeaa8a2402c6651cec46f1dd5d93f0e77963d9506048fcdd819f8c1aa2d51db9d53f0181"
  );
  const [status, setStatus] = useState(null);

  const isAuthorizedSigner = async () => {
    if (!message || !signature || !address) return;
    try {
      const isAuthorizedSigner = await dappAuth.isAuthorizedSigner(
        message,
        signature,
        address
      );

      console.log(isAuthorizedSigner); // true
      setStatus(isAuthorizedSigner);
    } catch (e) {
      console.log(e);
      setStatus(false);
    }
  };

  return (
    <div className="App">
      personal message:&nbsp;
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <br />
      address:&nbsp;
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <br />
      signature:&nbsp;
      <input value={signature} onChange={(e) => setSignature(e.target.value)} />
      <br />
      <BLTButton onClick={isAuthorizedSigner}>Verify</BLTButton>
      <br />
      Result: {status != null && status.toString()}
    </div>
  );
}
