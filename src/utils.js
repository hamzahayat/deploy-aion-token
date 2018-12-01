export const getTransactionReceipt = transactionHash => {
  let transactionReceipt = null;

  process.stdout.write('Transaction Pending');

  do {
    transactionReceipt = web3.eth.getTransactionReceipt(transactionHash);
    process.stdout.write('...');
  } while (transactionReceipt == null);

  console.log('Transaction Complete!');

  return transactionReceipt;
};
