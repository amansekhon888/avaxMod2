# HomeSecurity System Contract

## Overview

HomeSecurity is a smart contract written in Solidity that simulates a basic home security system. It allows the owner to manage access permissions for different users.

## Features

- **Access Management**: The owner can grant or revoke access to different users in the system.
- **User Verification**: Users' access status can be verified through the contract.

## Prerequisites

- Solidity ^0.8.0

## Contract Details

### Constructor

The constructor initializes the contract with the owner's address.

### Functions

- **grantAccess**: Allows the owner to grant access to a user.
- **revokeAccess**: Allows the owner to revoke access from a user.
- **hasAccess**: Allows anyone to check if a specific user has access.

### Events

- **AccessChanged**: Emitted when access is granted or revoked for a user.

## Usage

1. Deploy the `HomeSecurity` contract to your preferred Ethereum network.
2. Use the provided functions to manage user access permissions.

## License

This contract is provided under an unlicensed status. See the [UNLICENSE](UNLICENSE) file for details.

## Project Setup Instructions

To run this project on your computer after cloning the GitHub repository, follow the steps below:

1. **Install Dependencies:**
   - Navigate to the project directory in the terminal.
   - Run the following command to install project dependencies:
     ```bash
     npm install
     ```

2. **Start Ethereum Node:**
   - Open two additional terminals in your Visual Studio Code or preferred code editor.
   - In the second terminal, start the local Ethereum node using Hardhat:
     ```bash
     npx hardhat node
     ```

3. **Deploy Smart Contract:**
   - In the third terminal, deploy the smart contract to the local Ethereum network:
     ```bash
     npx hardhat run --network localhost scripts/deploy.js

 4. **Launch Front-end:**
   - Go back to the first terminal and start the front-end application:
     ```bash
     npm run dev
     ```
    ```

5. **Interact with the Contract:**
   - Use the functions provided in the contract to manage access permissions.
   - Interact with the contract using Hardhat or a frontend interface.

6. **Monitoring and Testing:**
   - Monitor transactions and events using Ethereum tools like Etherscan for a deployed network or Hardhat's local node for testing.
   - Use Hardhat's testing framework to write and run tests for your contract.

Now, the HomeSecurity system contract is ready for deployment and interaction on your preferred Ethereum network. Follow these steps in sequence for a smooth setup and testing process.


