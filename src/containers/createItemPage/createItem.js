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
import './createItem.css'

const web3 = new Web3(window.ethereum)
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function WearItems() {
  const [fileUrl, setFileUrl] = useState(null)
  const [itemName, setItemName] = useState('')
  const [description, setDescription] = useState('')
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
    }
  async function CreateItems() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
  const contract = new ethers.Contract(addresses.NFT_CONTRACTS_ADDRESS, NftContract.abi, signer)
  let itemDesc = (Object.values(description)).toString();
  let name = (Object.values(itemName)).toString();
  const mint = await contract.mint(itemDesc, name, fileUrl, "common", {
    gasLimit: 2500000
  })
  await mint.wait();
  window.location.href = "/marketplace"
}
  return (
    <>
    <div align="center">
      <h2>Item Name:</h2>
    <input
    type="text"
    placeholder="Your asset name"
    className="formName"
    onInput={event => setItemName({ itemName: event.target.value })}
    />
    </div>
    <div align="center">
      <h2>Item Image:</h2>
    <input
    type="file"
    onChange={onChange}
    />
     {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
      <div align="center">
        <h2>Item Description:</h2>
        <input
        type="text"
        onInput={event => setDescription({ description: event.target.value })}
        />
      </div>
    <button onClick={CreateItems}>Click to create !</button>
    <h2 id="name"></h2>
    <h2 id="url"></h2>
    </div>
    </>
  );
}