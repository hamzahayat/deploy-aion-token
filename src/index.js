// Declare Imports
import AionKeystore from 'aion-web3-eth-accounts';
import Web3 from 'aion-web3';
import { readFileSync } from 'fs';
import { CONTRACT_ABI } from './contracts/ATS_ABI';
import { PRIVATE_KEY, TO_ADDRESS, CONTRACT_ADDRESS, NODESMITH_API } from '../credentials.js'; // This file has purposefully been omitted on github repo

// Initialize web3
const provider = new Web3.providers.HttpProvider(NODESMITH_API);
const web3 = new Web3(provider);

const deployContract = async () => {
  // Import Solidiy Contract
  const solContract = readFileSync('src/contracts/ATSImpl.sol', {
    encoding: 'utf8'
  });

  // Initilize Account
  const aionKeystore = new AionKeystore(NODESMITH_API);
  const account = aionKeystore.privateKeyToAccount(
    PRIVATE_KEY // Add Private Key of Account that will be used to deploy contract
  );

  // Compile Contract
  const compiledContract = await web3.eth.compileSolidity(solContract);
  const contractAbi = compiledContract.ATSBase.info.abiDefinition;
  const contractCode = compiledContract.ATSBase.code;

  // Declare Contract
  const contract = new web3.eth.Contract(contractAbi);

  // Deploy Contract
  const deployableContract = await contract.deploy({
    data: contractCode,
    arguments: ['TokenName', 'SYMBOL', 1, '10000000000000000000000000000000000000000000000000']
  });

  const contractData = deployableContract.encodeABI();

  // Get Transaction
  const transaction = await getTransactionObject(contractData, account.address, deployableContract);

  // Sign Transaction
  const signedTransaction = await account.signTransaction(transaction);
  console.log('Transaction signed!');

  // Send Raw Transaction
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

  console.log('Transaction Receipt : ', transactionReceipt);
  console.log('Contract Address : ', transactionReceipt.contractAddress);
};

const getTransactionObject = async (contractData, address, deployableContract) => {
  // Get Gas Estimates and Nonce
  const nonce = await web3.eth.getTransactionCount(address);
  const gasPrice = await web3.eth.getGasPrice();
  const gas = await deployableContract.estimateGas();

  // Declare Transaction Obj
  const transaction = {
    from: address,
    nonce,
    gasPrice,
    gas: 2000000,
    data: contractData
  };

  return transaction;
};

const transferToken = async () => {
  // Initilize Account
  const aionKeystore = new AionKeystore(NODESMITH_API);
  const account = aionKeystore.privateKeyToAccount(
    PRIVATE_KEY // Add Private Key of Account that will be used to deploy contract
  );

  const toAddress = TO_ADDRESS;
  const amount = 10;

  // Declare Contract Instance
  const tokenContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  // Get Contract Data
  const transferMethod = tokenContract.methods.transfer(toAddress, amount);

  // Get Nonce and Gas details
  const gas = await transferMethod.estimateGas(toAddress, amount, {
    from: account.address
  });
  const gasPrice = await web3.eth.getGasPrice();
  const nonce = await web3.eth.getTransactionCount(account.address);

  // Declare Transaction
  const transaction = {
    to: CONTRACT_ADDRESS,
    nonce,
    gasPrice,
    gas,
    data: transferMethod.encodeABI(),
    timestamp: Date.now() * 1000
  };

  // Sign Transaction
  const signedTransaction = await account.signTransaction(transaction);

  // Send Transaction
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

  // Write to console
  console.log('Transaction Reciept: ', transactionReceipt);
};

deployContract().catch(error => {
  console.log(error.message);
});

// transferToken();
