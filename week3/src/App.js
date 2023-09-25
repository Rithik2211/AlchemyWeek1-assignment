import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactData, setTransactData] = useState(null); 
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  }, []);

  useEffect(()=>{
    async function getTransaction(){
      if(blockNumber !== undefined){
        setTransactData(await alchemy.core.getBlockWithTransactions(blockNumber))
      }
    }
    getTransaction()
  },[blockNumber]);


  const selectedData = (obj) => {
    setData(obj);
  }

  return (
    <div style={{display:"flex"}}>
      <div>
        <div className="App">Block Number Data: {blockNumber}</div>
        <ul>
          {transactData &&
            transactData.transactions.map((data) => (
              <li key={data.chainId} onClick={() => selectedData(data)} style={{padding:"1rem"}}>
                {data.blockHash}
              </li>
            ))}
        </ul>
      </div>
      <div>
        {data ? (
          <div>
            <h2>Transaction Details:</h2>
            <pre>{JSON.stringify(data,null,2)}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
