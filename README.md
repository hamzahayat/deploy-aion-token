# Deploying and Sending Token on AION

> Quick bit of handy code to deploy a token on the AION blockchain.

## Getting Started

- Install Dependencies using `npm install`
- Run `index.js` file using `npm run start`

### NOTE:

Be sure to add your own credentials into a `credentials.js` file with the following variables.

- `PRIVATE_KEY` Either create a wallet programatically, or use [AIWA]: https://getaiwa.com to create a wallet and then grab testnet Aion from the [faucet]: https://faucets.blockxlabs.com/aion
- `NODESMITH_API` Use Nodesmith to obtain an endpoint to access the blockchain [here]: https://nodesmith.io/
- `CONTRACT_ADDRESS` The contract address of a deployed token, if you wish to utilize the `transferToken` function.
- `TO_ADDRESS` An address that you would like to send the deployed token to.
