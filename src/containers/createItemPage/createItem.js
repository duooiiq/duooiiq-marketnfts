import { useState } from 'react'
import addresses from "../../constants/contracts";
import NftContract from "../../abis/nft.json";
import Web3 from 'web3';

const web3 = new Web3(window.ethereum)

async function CreateItem() {
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
  const contract = new web3.eth.Contract(NftContract.abi, "0xfD2812A89Fca51D37Ef4adeB33B909a9020e4D8b")
    contract.methods.mint("2", "myNft", "https://i.ibb.co/9qZ242D/descarga-1.png", "common").send({ from: accounts[0], gas: 2500000 })
}
async function WearItem() {
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
  const contract = new web3.eth.Contract(NftContract.abi, "0xfD2812A89Fca51D37Ef4adeB33B909a9020e4D8b")
  contract.methods.wearItem("3").send({ from: accounts[0], gas: 2500000 })
}

export default function CreatePage() {

return (
        <div>
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
        />
        <input
        placeholder='Asset URI'
        className='url'
        />
        <button onClick={CreateItem}>Crear</button>
        <button onClick={WearItem}>Wear Item</button>
        </div>
    )
}
