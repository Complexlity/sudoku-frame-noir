# SUDOKU on Frames
This is a [Farcaster Frame](https://docs.farcaster.xyz/reference/frames/spec) which lets users play sudoku on the platform.
The solution validator has been written in [Noir][https://noir-lang.org/]. Which is a domain specific language used for generating zero knowledge proofs

## Pre-requisite
- Nodejs 18+

## Getting Started

- Clone the repository
```
git clone https://github.com/Complexlity/sudoku-frame-noir.git
```

- Install dependencies
```
npm install
```

- Update ENV

```.env
HOST=http://localhost:3000
PROOF_API_URL=http://localhost:3000/api/proof
```

These are the only two values needed in development mode. In production, you should change the `HOST` to the url where the application is deployed.
Also the `PROOF_API_URL` for some reason, does not work when deployed so I have deployed the api differently using express and nodes and replaced used that url.
You can find the repo on [Github](https://github.com/Complexlity/express-noir). The codes work exactly the same way.

- Start Development Server

```
npm run dev
```

The frame would be started on [http://localhost:3000](http://localhost:3000)



