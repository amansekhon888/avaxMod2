import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import ashokPrasadWalletAbi from "../artifacts/contracts/Assessment.sol/HomeSecuritySystem.json";

export default function HomePage() {
  const [amanWallet, setamanWallet] = useState(undefined);
  const [ashokAccount, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  const changeKeyPrev = useRef();
  const changeKeyNew = useRef();
  const adminAccessAddr = useRef();
  const accessAddr = useRef();
  const openDoorKey = useRef();

  const contractAddress = "0x5D147C36248f2f3E822529A32b4a00653432caCc";
  const atmABI = ashokPrasadWalletAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setamanWallet(window.ethereum);
    }

    if (amanWallet) {
      try {
        const accounts = await amanWallet.request({ method: "eth_accounts" });
        accoundHandler(accounts);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const accoundHandler = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No ashokAccount found");
    }
  };

  const connectToMetamask = async () => {
    if (!amanWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await amanWallet.request({ method: "eth_requestAccounts" });
    accoundHandler(accounts);

    // once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(amanWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const changeSecretKey = async () => {
    let prevKey = Number(changeKeyPrev.current.value);
    let newKey = Number(changeKeyNew.current.value);
    try {
      if (atm) {
        let tx = await atm.changeSecretKey(prevKey, newKey);
        await tx.wait();
        console.log(`secret key change`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const giveAdminAccess = async () => {
    let addr = adminAccessAddr.current.value;

    try {
      if (atm) {
        let tx = await atm.giveAdminAccess(addr);
        await tx.wait();
        console.log(`new item added successfully`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const giveAccess = async () => {
    let addr = accessAddr.current.value;

    try {
      if (atm) {
        let tx = await atm.giveAccess(addr);
        await tx.wait();
        console.log(`new item added successfully`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const openDoor = async () => {
    let key = openDoorKey.current.value;

    try {
      if (atm) {
        let tx = await atm.openDoor(key);
        await tx.wait();
        console.log(`new item added successfully`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>🏠 Home Security System</h1>
        <p>Connect your wallet to access the system</p>
      </header>
      <div className="content">
        {!ashokAccount ? (
          <button className="connect-btn" onClick={connectToMetamask}>Connect Wallet</button>
        ) : (
          <>
            <div className="section">
              <h2>Owner's Dashboard</h2>
              <div className="action">
                <input ref={changeKeyPrev} type="password" placeholder="Previous Key" />
                <input ref={changeKeyNew} type="password" placeholder="New Key" />
                <button onClick={changeSecretKey}>Change Key</button>
              </div>
              <div className="action">
                <input ref={adminAccessAddr} type="text" placeholder="Address" />
                <button onClick={giveAdminAccess}>Give Admin Access</button>
              </div>
            </div>

            <div className="section">
              <h2>Admin's Panel</h2>
              <div className="action">
                <input ref={accessAddr} type="text" placeholder="Address" />
                <button onClick={giveAccess}>Give Access</button>
              </div>
            </div>

            <div className="section">
              <h2>Access Control</h2>
              <div className="action">
                <input ref={openDoorKey} type="password" placeholder="Key" />
                <button onClick={openDoor}>Open Door</button>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f7fafc;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        header {
          margin-bottom: 20px;
          text-align: center;
        }

        h1 {
          font-size: 32px;
          color: #333;
        }

        p {
          font-size: 18px;
          color: #666;
        }

        .content {
          width: 100%;
          max-width: 800px;
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .section {
          margin-bottom: 30px;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
        }

        .action {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        input {
          padding: 10px;
          margin-right: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          width: 200px;
        }

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          background-color: #007bff;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #0056b3;
        }

        .connect-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          background-color: #28a745;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .connect-btn:hover {
          background-color: #218838;
        }
      `}</style>
    </main>
  );
}
