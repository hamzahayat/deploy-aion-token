// Declare Imports
import AionKeystore from 'aion-keystore';
import Web3 from 'aion-web3';
import { readFileSync } from 'fs';
import BigNumber from 'bignumber.js';

// Initialize web3
const provider = new Web3.providers.HttpProvider('https://aion-mastery.jonpurdy.com');
const web3 = new Web3(provider);

const CONTRACT_ABI = [
  {
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    constant: true,
    payable: false,
    inputs: [],
    name: 'name',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        type: 'uint8'
      }
    ],
    constant: true,
    payable: false,
    inputs: [],
    name: 'decimals',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        type: 'uint128'
      }
    ],
    constant: true,
    payable: false,
    inputs: [],
    name: 'totalSupply',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        type: 'uint128'
      }
    ],
    constant: true,
    payable: false,
    inputs: [
      {
        name: '_tokenHolder',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    type: 'function'
  },
  {
    outputs: [],
    constant: false,
    payable: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint128' },
      { name: '_userData', type: 'bytes' }
    ],
    name: 'send',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    constant: true,
    payable: false,
    inputs: [],
    name: 'symbol',
    type: 'function'
  },
  {
    outputs: [],
    constant: false,
    payable: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint128' },
      { name: '_userData', type: 'bytes' },
      { name: '_operatorData', type: 'bytes' }
    ],
    name: 'operatorSend',
    type: 'function'
  },
  {
    outputs: [{ name: 'success', type: 'bool' }],
    constant: false,
    payable: false,
    inputs: [{ name: '_to', type: 'address' }, { name: '_amount', type: 'uint128' }],
    name: 'transfer',
    type: 'function'
  }
];

const init = async () => {
  // Import Solidiy Contract
  const solContract = readFileSync('src/contracts/ATSImpl.sol', {
    encoding: 'utf8'
  });

  // Initilize Account
  const aionKeystore = new AionKeystore();
  const account = aionKeystore.privateKeyToAccount(
    '0x5746bd483659b19d37a0724925972536b9625be0deb91f72550ab4fa403154920a984f798a95d1f45b6f31f0b15e00d993466036fe0c39962a69cc2bb3006b47' // Add Private Key of Account that will be used to deploy contract
  );

  // Compile Contract
  const compiledContract = web3.eth.compile.solidity(solContract);
  const contractAbi = compiledContract.ATSBase.info.abiDefinition;
  const contractCode = compiledContract.ATSBase.code;

  console.log(contractCode);

  // Declare Contract
  const contract = web3.eth.contract(contractAbi);

  // Get Contract Data
  const contractData = contract.new.getData(
    'AIWA3', // Name
    'AIWA', // Symbol
    1, // Granularity
    200000, // Total Supply
    '0xa09a2911ffcdc8724cfe13369534e3f33c07422d7c762b2dad0b1b3ba878ab04', // Special Address -> Account that will hold the total supply
    {
      data: contractCode
    }
  );

  // Get Transaction
  const transaction = await getTransactionObject(contractData, account.address);

  // Sign Transaction
  const signedTransaction = await account.signTransaction(transaction);

  // Send Raw Transaction
  const transactionHash = await web3.eth.sendRawTransaction(signedTransaction.rawTransaction);

  console.log('Transaction Hash: ', transactionHash);

  // Poll Transaction and get Transaction Receipt
  const transactionReceipt = getTransactionReceipt(transactionHash);

  // Write to console
  console.log('Transaction Hash: ', transactionHash);
  console.log('Contract Address: ', transactionReceipt.contractAddress);
};

const getTransactionReceipt = transactionHash => {
  let transactionReceipt = null;

  process.stdout.write('Transaction Pending');

  do {
    transactionReceipt = web3.eth.getTransactionReceipt(transactionHash);
    process.stdout.write('...');
  } while (transactionReceipt == null);

  console.log('Transaction Complete!');

  return transactionReceipt;
};

const getTransactionObject = async (contractData, address) => {
  // Get Gas Estimates and Nonce
  const nonce = web3.eth.getTransactionCount(address);
  const gasPrice = web3.eth.gasPrice;
  // const gas = await web3.eth.estimateGas({ data: contractData });

  // Declare Transaction Obj
  const transaction = {
    nonce,
    gasPrice,
    gas: 2200000,
    data: contractData,
    timestamp: Date.now() * 1000
  };

  return transaction;
};

// init().catch(error => {
//   console.log(error.message);
// });

const transferToken = async () => {
  // Initilize Account
  const aionKeystore = new AionKeystore();
  const account = aionKeystore.privateKeyToAccount(
    '0x5746bd483659b19d37a0724925972536b9625be0deb91f72550ab4fa403154920a984f798a95d1f45b6f31f0b15e00d993466036fe0c39962a69cc2bb3006b47' // Add Private Key of Account that will be used to deploy contract
  );

  const toAddress = '0xa06eb1780f9e8c0c3a86158f55c315b60966d64a3020bcbe0e3572ee67e2ca51';
  const amount = 10.1;
  const contractAddress = '0xa02210f678afce1cc5ce2eb57b5c6c12186742f71094761d7fbeea38dd3b0495';

  // Declare Contract Instance
  const tokenContract = web3.eth.contract(CONTRACT_ABI).at(contractAddress);

  // Get Contract Data
  const methodData = tokenContract.transfer.getData(toAddress, amount);

  // Get Nonce and Gas details
  const gas = await tokenContract.transfer.estimateGas(toAddress, amount, {
    from: account.address
  });
  const gasPrice = web3.eth.gasPrice;
  const nonce = web3.eth.getTransactionCount(account.address);

  // Declare Transaction
  const transaction = {
    to: contractAddress,
    nonce,
    gasPrice,
    gas,
    data: methodData,
    timestamp: Date.now() * 1000
  };

  console.log(methodData);

  // Sign Transaction
  const signedTransaction = await account.signTransaction(transaction);

  // Send Transaction
  const transactionHash = await web3.eth.sendRawTransaction(signedTransaction.rawTransaction);

  const transactionReceipt = getTransactionReceipt(transactionHash);

  // Write to console
  console.log('Transaction Hash: ', transactionHash);
  console.log('Transaction Reciept: ', transactionReceipt);
};

const newTest = () => {
  const transactionHash = '0x69f2211604485193eca9b4cb6b940a2e8c082ef874a3a4a0e74aa168d322984b';
  const transactionReceipt = web3.eth.getTransaction(transactionHash);

  console.log(transactionReceipt);
};

transferToken();
