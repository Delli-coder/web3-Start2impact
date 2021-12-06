    window.userWalletAddress = null;
    const loginButton = document.getElementById('loginButton');
    const tokenPrice = document.getElementById('tokenPrice');
    const buyButton = document.getElementById('buy');
    const tokenId = document.getElementById('tokenId');

    window.web3 = new Web3(window.ethereum);


    function toggleButton() {
      if (!window.ethereum) {
        loginButton.innerText = 'MetaMask is not installed';
        return false;
      }
      loginButton.addEventListener('click', loginWithMetaMask);
    };

    async function loginWithMetaMask() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
          console.error(e.message)
          return
        });
      if (!accounts) { return };

      window.userWalletAddress = accounts[0];
      loginButton.innerText = 'Logged';
      buyButton.addEventListener('click', transactionProve);
      buyButton.disabled = false;
    };
    function transactionProve() {
            var abi = [
              {
                "inputs": [
                  {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                  }
                ],
                "name": "supportsInterface",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Approval",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "ApprovalForAll",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Transfer",
                "type": "event"
              },
              {
                "inputs": [
                  {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                  }
                ],
                "name": "supportsInterface",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  }
                ],
                "name": "balanceOf",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "ownerOf",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "name",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "tokenURI",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "getApproved",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                  }
                ],
                "name": "supportsInterface",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Approval",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "ApprovalForAll",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Transfer",
                "type": "event"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  }
                ],
                "name": "balanceOf",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "getApproved",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "ownerOf",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "internalType": "bool",
                    "name": "_approved",
                    "type": "bool"
                  }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                  }
                ],
                "name": "supportsInterface",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "name",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "tokenURI",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                  }
                ],
                "name": "onERC721Received",
                "outputs": [
                  {
                    "internalType": "bytes4",
                    "name": "",
                    "type": "bytes4"
                  }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Approval",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "ApprovalForAll",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Transfer",
                "type": "event"
              },
              {
                "inputs": [
                  {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                  }
                ],
                "name": "supportsInterface",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  }
                ],
                "name": "balanceOf",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "ownerOf",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "getApproved",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "internalType": "bool",
                    "name": "_approved",
                    "type": "bool"
                  }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "last_completed_migration",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [],
                "name": "owner",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "completed",
                    "type": "uint256"
                  }
                ],
                "name": "setCompleted",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                  }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
              },
              {
                "inputs": [],
                "name": "owner",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                  }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Approval",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "ApprovalForAll",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                  }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Transfer",
                "type": "event"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  }
                ],
                "name": "balanceOf",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "getApproved",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [],
                "name": "name",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [],
                "name": "owner",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "ownerOf",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                  }
                ],
                "name": "supportsInterface",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "tokenURI",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                  }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "initialize",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_newBaseURI",
                    "type": "string"
                  }
                ],
                "name": "setBaseURI",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "getAllOnSale",
                "outputs": [
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                      },
                      {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                      },
                      {
                        "internalType": "string",
                        "name": "uri",
                        "type": "string"
                      },
                      {
                        "internalType": "bool",
                        "name": "sale",
                        "type": "bool"
                      },
                      {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                      }
                    ],
                    "internalType": "struct newCompany.TokenMeta[]",
                    "name": "",
                    "type": "tuple[]"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                  }
                ],
                "name": "getAllTokenUser",
                "outputs": [
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                      },
                      {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                      },
                      {
                        "internalType": "string",
                        "name": "uri",
                        "type": "string"
                      },
                      {
                        "internalType": "bool",
                        "name": "sale",
                        "type": "bool"
                      },
                      {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                      }
                    ],
                    "internalType": "struct newCompany.TokenMeta[]",
                    "name": "",
                    "type": "tuple[]"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "tokenSale",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "_sale",
                    "type": "bool"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                  }
                ],
                "name": "setTokenSale",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                  }
                ],
                "name": "setTokenPrice",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "tokenPrice",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "tokenMeta",
                "outputs": [
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                      },
                      {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                      },
                      {
                        "internalType": "string",
                        "name": "uri",
                        "type": "string"
                      },
                      {
                        "internalType": "bool",
                        "name": "sale",
                        "type": "bool"
                      },
                      {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                      }
                    ],
                    "internalType": "struct newCompany.TokenMeta",
                    "name": "",
                    "type": "tuple"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "purchaseToken",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function",
                "payable": true
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_tokenURI",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "_sale",
                    "type": "bool"
                  }
                ],
                "name": "newToken",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "idToken",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                  }
                ],
                "name": "giftToken",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ]
            const myContract =  new window.web3.eth.Contract(abi, 'contract address');
            var price = web3.utils.toWei(tokenPrice.value, 'ether');
            var prove =  myContract.methods.purchaseToken(tokenId.value).send({from: window.userWalletAddress, value: price, gasPrice: '32000000000'});
            console.log(prove);
    };
    window.addEventListener('DOMContentLoaded', () => {
    toggleButton()
    })
    window.addEventListener('load', function () {
    });
