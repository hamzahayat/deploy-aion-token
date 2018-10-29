export const CONTRACT_ABI = [
  {
    outputs: [{ name: '', type: 'string' }],
    constant: true,
    payable: false,
    inputs: [],
    name: 'name',
    type: 'function'
  },
  {
    outputs: [{ name: '', type: 'uint128' }],
    constant: true,
    payable: false,
    inputs: [],
    name: 'liquidSupply',
    type: 'function'
  },
  {
    outputs: [{ name: '', type: 'uint128' }],
    constant: true,
    payable: false,
    inputs: [],
    name: 'totalSupply',
    type: 'function'
  },
  {
    outputs: [{ name: '', type: 'address' }],
    constant: true,
    payable: false,
    inputs: [],
    name: 'specialAddress',
    type: 'function'
  },
  {
    outputs: [{ name: '', type: 'uint8' }],
    constant: true,
    payable: false,
    inputs: [],
    name: 'decimals',
    type: 'function'
  },
  {
    outputs: [{ name: '', type: 'uint128' }],
    constant: true,
    payable: false,
    inputs: [],
    name: 'granularity',
    type: 'function'
  },
  {
    outputs: [],
    constant: false,
    payable: false,
    inputs: [
      { name: '_foreignNetworkId', type: 'bytes32' },
      { name: '_recipient', type: 'address' },
      { name: '_amount', type: 'uint128' },
      { name: '_foreignData', type: 'bytes' }
    ],
    name: 'thaw',
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
    outputs: [{ name: '', type: 'uint128' }],
    constant: true,
    payable: false,
    inputs: [{ name: '_tokenHolder', type: 'address' }],
    name: 'balanceOf',
    type: 'function'
  },
  {
    outputs: [{ name: '', type: 'address' }],
    constant: true,
    payable: false,
    inputs: [],
    name: 'registry',
    type: 'function'
  },
  {
    outputs: [{ name: 'success', type: 'bool' }],
    constant: false,
    payable: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint128' }
    ],
    name: 'transferFrom',
    type: 'function'
  },
  {
    outputs: [{ name: 'success', type: 'bool' }],
    constant: false,
    payable: false,
    inputs: [{ name: '_spender', type: 'address' }, { name: '_amount', type: 'uint128' }],
    name: 'approve',
    type: 'function'
  },
  {
    outputs: [],
    constant: false,
    payable: false,
    inputs: [{ name: '_operator', type: 'address' }],
    name: 'authorizeOperator',
    type: 'function'
  },
  {
    outputs: [{ name: '', type: 'string' }],
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
    inputs: [{ name: '_registry', type: 'address' }],
    name: 'setRegistry',
    type: 'function'
  },
  {
    outputs: [],
    constant: false,
    payable: false,
    inputs: [
      { name: '_tokenHolder', type: 'address' },
      { name: '_amount', type: 'uint128' },
      { name: '_holderData', type: 'bytes' },
      { name: '_operatorData', type: 'bytes' }
    ],
    name: 'operatorBurn',
    type: 'function'
  },
  {
    outputs: [{ name: '', type: 'bool' }],
    constant: true,
    payable: false,
    inputs: [{ name: '_operator', type: 'address' }, { name: '_tokenHolder', type: 'address' }],
    name: 'isOperatorFor',
    type: 'function'
  },
  {
    outputs: [{ name: 'remaining', type: 'uint128' }],
    constant: true,
    payable: false,
    inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }],
    name: 'allowance',
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
    outputs: [],
    constant: false,
    payable: false,
    inputs: [
      { name: '_foreignNetworkId', type: 'bytes32' },
      { name: '_foreignRecipient', type: 'bytes32' },
      { name: '_amount', type: 'uint128' },
      { name: '_localData', type: 'bytes' }
    ],
    name: 'freeze',
    type: 'function'
  },
  {
    outputs: [],
    constant: false,
    payable: false,
    inputs: [{ name: '_amount', type: 'uint128' }, { name: '_holderData', type: 'bytes' }],
    name: 'burn',
    type: 'function'
  },
  {
    outputs: [],
    constant: false,
    payable: false,
    inputs: [{ name: '_operator', type: 'address' }],
    name: 'revokeOperator',
    type: 'function'
  },
  {
    outputs: [{ name: 'success', type: 'bool' }],
    constant: false,
    payable: false,
    inputs: [{ name: '_to', type: 'address' }, { name: '_amount', type: 'uint128' }],
    name: 'transfer',
    type: 'function'
  },
  {
    outputs: [],
    payable: false,
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_symbol', type: 'string' },
      { name: '_granularity', type: 'uint128' },
      { name: '_totalSupply', type: 'uint128' },
      { name: '_specialAddress', type: 'address' }
    ],
    name: '',
    type: 'constructor'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: '_foreignNetworkId', type: 'bytes32' },
      { indexed: true, name: '_recipient', type: 'address' },
      { indexed: true, name: '_amount', type: 'uint128' },
      { indexed: false, name: '_foreignData', type: 'bytes' }
    ],
    name: 'Thaw',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: '_foreignNetworkId', type: 'bytes32' },
      { indexed: true, name: '_foreignRecipient', type: 'bytes32' },
      { indexed: true, name: '_amount', type: 'uint128' },
      { indexed: false, name: '_localData', type: 'bytes' }
    ],
    name: 'Freeze',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [{ indexed: true, name: '_registry', type: 'address' }],
    name: 'RegistrySet',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint128' }
    ],
    name: 'Transfer',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint128' }
    ],
    name: 'Approval',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: '_totalSupply', type: 'uint128' },
      { indexed: true, name: '_specialAddress', type: 'address' }
    ],
    name: 'Created',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: '_operator', type: 'address' },
      { indexed: true, name: '_from', type: 'address' },
      { indexed: true, name: '_to', type: 'address' },
      { indexed: false, name: '_amount', type: 'uint128' },
      { indexed: false, name: '_holderData', type: 'bytes' },
      { indexed: false, name: '_operatorData', type: 'bytes' }
    ],
    name: 'Sent',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: '_operator', type: 'address' },
      { indexed: true, name: '_to', type: 'address' },
      { indexed: false, name: '_amount', type: 'uint128' },
      { indexed: false, name: '_operatorData', type: 'bytes' }
    ],
    name: 'Minted',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: '_operator', type: 'address' },
      { indexed: true, name: '_from', type: 'address' },
      { indexed: false, name: '_amount', type: 'uint128' },
      { indexed: false, name: '_holderData', type: 'bytes' },
      { indexed: false, name: '_operatorData', type: 'bytes' }
    ],
    name: 'Burned',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: '_operator', type: 'address' },
      { indexed: true, name: '_tokenHolder', type: 'address' }
    ],
    name: 'AuthorizedOperator',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [
      { indexed: true, name: '_operator', type: 'address' },
      { indexed: true, name: '_tokenHolder', type: 'address' }
    ],
    name: 'RevokedOperator',
    anonymous: false,
    type: 'event'
  }
];
