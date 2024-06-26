import { useAccount, useSignTypedData } from "wagmi";

const SignTypedData = () => {
    const { isConnected,chain } = useAccount();
    const {
        data: typedData,
        error: typedError,
        signTypedData
    } = useSignTypedData();
    
    return (
        <div>
            <button
                disabled={!isConnected}
                onClick={() => signTypedData({
                    domain: {
                        chainId: chain?.id,
                        name: "Ether Mail",
                        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
                        version: "1"
                    },
                    message: {
                        contents: "Hello, Bob!",
                        from: {
                            name: "Cow",
                            wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
                        },
                        to: {
                            name: "Bob",
                            wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
                        }
                    },
                    primaryType: "Mail",
                    types: {
                        Mail: [
                            { name: "from", type: "Person" },
                            { name: "to", type: "Person" },
                            { name: "contents", type: "string" }
                        ],
                        Person: [
                            { name: "name", type: "string" },
                            { name: "wallet", type: "address" }
                        ]
                    }
                })}
                type="button"
            >
                Sign Typed Data
            </button>
            <div>
                {typedData && (
                    <div style={{ wordBreak: "break-all" }}>
                        Typed Data Signature: {typedData}
                    </div>
                )}
                {typedError && <div>Error signing typed message</div>}
            </div>
        </div>
    );
};

export default SignTypedData;
