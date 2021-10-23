import '../styles/globals.css'
import CeramicClient from '@ceramicnetwork/http-client'
import { useEffect, useState, Fragment } from 'react'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import DataModels from './components/DataModels'
import Image from 'next/image'
import Projects from './projects/index'
import Tasks from './tasks/index'
import Feedback from './feedback/index'
import Profile from './profile/index'
import Issuers from './issuers/index'

import { API_URL } from './config/index'

function MyApp() {
  const [testDoc, setTestDoc] = useState();
  const [loadedDoc, setLoadedDoc] = useState();
  const [updatedDoc, setUpdatedDoc] = useState();
  const [streamId, setStreamId] = useState();
  const [ceramic, setCeramic] = useState();
  const [urlPath, setUrlPath] = useState();
  const [ethAddresses, setEthAddresses] = useState();
  const [ethereum, setEthereum] = useState();
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    if(window.ethereum) {
      setEthereum(window.ethereum);
      (async() => {
        try {
          const addresses = await window.ethereum.request({ method: 'eth_requestAccounts'})
          setEthAddresses(addresses)
        }
        catch(e) {
          console.log(e);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if(ethereum && ethAddresses) {
      (async () => {

        const fullPath = window.location.href
        const parts = fullPath.split('/')
        const path = parts[3]
        setUrlPath(path)

        const newCeramic = new CeramicClient(API_URL)

        const resolver = {
          ...ThreeIdResolver.getResolver(newCeramic),
        }
        const did = new DID({ resolver })
        newCeramic.did = did;
        const threeIdConnect = new ThreeIdConnect()
        const authProvider = new EthereumAuthProvider(ethereum, ethAddresses[0]);
        await threeIdConnect.connect(authProvider)

        const provider = await threeIdConnect.getDidProvider();
        newCeramic.did.setProvider(provider);
        await newCeramic.did.authenticate();

        setCeramic(newCeramic);
      })();
    }
  }, [ethereum, ethAddresses]);

  function renderProjects() {
    return <Projects />
  }

  function renderTasks() {
    return <Tasks />
  }

  function renderFeedback() {
    return <Feedback ceramic={ceramic} ethereum={ethereum} />
  }

  function renderProfile() {
    return <Profile ceramic={ceramic} ethereum={ethereum} />
  }

  function renderIssuers() {
    return <Issuers />
  }

  switch (urlPath) {
    case 'feadback':
      return (
        <div>
          {
            renderFeedback()
          }
        </div>
        )
      break
    case 'profile':
      return (
        <div>
          {
            renderProfile()
          }
        </div>
        )
      break
    case 'issuers':
      return (
        <div>
          {
            renderIssuers()
          }
        </div>
        )
      break
    case 'tasks':
      return (
        <div>
          {
            renderTasks()
          }
        </div>
        )
      break
    default:
      return (
        <div>
          {
            renderProjects()
          }
        </div>
        )
  }
}

export default MyApp;
