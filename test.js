const server = require("server");
const { get, post } = server.router;

// Launch server with options and a couple of routes
let currentCount = 1

console.log('test');
server({ port: 8080 }, [
  get("/blocks", ctx => {

    let out = [
    {
      blockID: "5388DDACCE22C47DBD699F34B080AD1D78C1385E",
      header: {
        chainID: "OneLedger",
        height: currentCount + 1,
        time: "2018-12-04T21:05:29.747006263Z",
        numTxs: 5,
        blockSize: 64
      },
      txHashes: [
        "0xf9f345ec0acf3d0db80294597ddfe1880a58b99e",
        "0xbbcacc52fad195366bdc2c23fdfdb9ff7cf918d9",
        "0x8c53e7649e17f8092951e183d41742b5d1e4b138",
        "0x127f5f0cb487c5f6fc2fe0f44d9304fd2d80742f",
        "0xbfc16bb18c66c12e9a4ea83f79e4745ceb61433f",
        "0xbfc16bb18c66c12e9a4ea83f79e4745ceb61433f"
      ],
      precommits: [
        "0x6474652b2a1138f35f8dfad7774bb40c85356584",
        "0x7a8a171ea96097b0a088f5993826514e8842cadd",
        "0x748ed78f87b1f90a35f07d570c163844ad2d0c3b",
        "0x5f40d6f064991cb3996ff4945d80a93bac3128e9",
        "0x7aa2eca2fca32abf5295d979cb3d6b3d0561fad7"
      ]
    },
    {
      blockID: "84170C49AB50D2509F98A87E22F7D63054611F81",
      header: {
        chainID: "OneLedger",
        height: currentCount + 2,
        time: "2018-12-04T21:05:29.747006263Z",
        numTxs: 0,
        blockSize: 64
      },
      txHashes: [],
      precommits: [
        "0x6474652b2a1138f35f8dfad7774bb40c85356584",
        "0x7a8a171ea96097b0a088f5993826514e8842cadd",
        "0x748ed78f87b1f90a35f07d570c163844ad2d0c3b",
        "0x5f40d6f064991cb3996ff4945d80a93bac3128e9",
        "0x7aa2eca2fca32abf5295d979cb3d6b3d0561fad7"
      ]
    },
    {
      blockID: "F6AC3D3BF64EA89273B475EB87839D288D9160B1",
      header: {
        chainID: "OneLedger",
        height: currentCount + 3,
        time: "2018-12-04T21:05:29.747006263Z",
        numTxs: 0,
        blockSize: 64
      },
      txHashes: [],
      precommits: [
        "0x6474652b2a1138f35f8dfad7774bb40c85356584",
        "0x7a8a171ea96097b0a088f5993826514e8842cadd",
        "0x748ed78f87b1f90a35f07d570c163844ad2d0c3b",
        "0x5f40d6f064991cb3996ff4945d80a93bac3128e9",
        "0x7aa2eca2fca32abf5295d979cb3d6b3d0561fad7"
      ]
    }
  ]
  currentCount = currentCount + 3
  return out;
  }),
  post("/", ctx => console.log(ctx.data))
]);