import Web3 from 'web3'; // Make sure to import the Web3 library

import abi from "./abi/abi.json";

const sepolia = new Promise(async (res, rej) => {
  async function meta() {
    if (typeof window.ethereum === "undefined") {
      rej("You should install Metamask");
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account:", accounts[0]);

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        abi,
        "0x109f1E03A8D7dbDAd659364979eADAf2fEF6e90c"
      );

      const totalSupply = await contract.methods.totalSupply().call({
        from: accounts[0],
      });
      console.log("Total Supply", totalSupply);

      const maxSupply = await contract.methods.maxSupply().call({
        from: accounts[0],
      });
      console.log("Max Supply", maxSupply);

      const objects = await contract.methods.getOwnerObjects().call({
        from: accounts[0],
      });
      console.log("Your objects", objects);

      const supply = await contract.methods.totalSupply().call({
        from: accounts[0],
      });
      const data = await contract.methods.getObjects().call({
        from: accounts[0],
      });

      res({ supply: supply, nft: data });
    } catch (error) {
      rej(error.message);
    }
  }

  meta();
});

export default sepolia;
