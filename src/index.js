// Declare Imports
import AionKeystore from 'aion-keystore';
import Web3 from 'aion-web3';
import { readFileSync } from 'fs';
import { CONTRACT_ABI } from './contracts/AIWA_ABI';
import { PRIVATE_KEY } from '../credentials.js';

// Initialize web3
const provider = new Web3.providers.HttpProvider('https://aion-mastery.jonpurdy.com');
const web3 = new Web3(provider);

const deployContract = async () => {
  // Import Solidiy Contract
  const solContract = readFileSync('src/contracts/ATSImpl.sol', {
    encoding: 'utf8'
  });

  // Initilize Account
  const aionKeystore = new AionKeystore();
  const account = aionKeystore.privateKeyToAccount(
    PRIVATE_KEY // Add Private Key of Account that will be used to deploy contract
  );

  // Compile Contract
  const compiledContract = web3.eth.compile.solidity(solContract);
  const contractAbi = compiledContract.ATSBase.info.abiDefinition;
  const contractCode = compiledContract.ATSBase.code;

  // Declare Contract
  const contract = web3.eth.contract(contractAbi);

  // Get Contract Data
  const contractData = contract.new.getData(
    'Token Name', // Name
    'TKN', // Symbol
    1, // Granularity, should be 1 by default
    400000, // Total Supply
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

const transferToken = async () => {
  // Initilize Account
  const aionKeystore = new AionKeystore();
  const account = aionKeystore.privateKeyToAccount(
    PRIVATE_KEY // Add Private Key of Account that will be used to deploy contract
  );

  const toAddress = '0xa06eb1780f9e8c0c3a86158f55c315b60966d64a3020bcbe0e3572ee67e2ca51';
  const amount = 10;
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

deployContract().catch(error => {
  console.log(error.message);
});

transferToken();
