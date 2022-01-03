import { useEffect, useState } from 'react'
import addresses from "../../constants/contracts";
import NftContract from "../../abis/nft.json";
import { ethers } from 'ethers';
import { atom, DefaultValue, selector, useRecoilState, useRecoilValue } from "recoil";
import {
  allItems,
  itemData,
  myAddress,
  transactionData,
  itemIdAtom,
} from "../../recoils/atoms";
import { render } from 'react-dom';
import Web3 from 'web3';
import { create as ipfsHttpClient } from 'ipfs-http-client'

const web3 = new Web3(window.ethereum)
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function WearItems() {
  const [fileUrl, setFileUrl] = useState(null)
  const [itemName, setItemName] = useState('');
    async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  async function CreateItems() {
  const contract = new web3.eth.Contract(NftContract.abi, addresses.NFT_CONTRACTS_ADDRESS)
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
  let name = (Object.values(itemName)).toString();
  let url =  (Object.values(fileUrl)).toString();
  contract.methods.mint("4", name, url, "common").send({
    from: accounts[0],
    gas: 2500000
  })
  console.log(name)
  console.log(url)
  const h2 = document.getElementById('name');
  h2.innerText = name;
  const h22 = document.getElementById('url');
  h22.innerText = url;
}
}
  return (
    <div>
    <input
    type="text"
    placeholder="Your asset name"
    onInput={event => setItemName({ itemName: event.target.value })}
    />
    <input
    type="file"
    onChange={onChange}
    />
     {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
    <button onClick={CreateItems}>Click to create !</button>
    <h2 id="name"></h2>
    <h2 id="url"></h2>
    </div>
  );
}