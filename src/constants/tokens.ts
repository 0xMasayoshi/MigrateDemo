import { ChainId, SUSHI_ADDRESS, WETH9_ADDRESS } from '@sushiswap/sdk'

export function tokenList(chainId) {
  return [
    {
      name: 'SushiToken',
      symbol: 'SUSHI',
      address: SUSHI_ADDRESS[chainId],
    },
    {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      address: WETH9_ADDRESS[chainId],
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      address: USDC_ADDRESS[chainId],
    },
    {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      address: DAI_ADDRESS[chainId],
    },
    {
      name: 'Wrapped BTC',
      symbol: 'WBTC',
      address: WBTC_ADDRESS[chainId],
    },
    {
      name: 'Uniswap',
      symbol: 'UNI',
      address: UNI_ADDRESS[chainId],
    },
    {
      name: 'Tether USD',
      symbol: 'USDT',
      address: USDT_ADDRESS[chainId],
    },
    {
      name: 'ChainLink Token',
      symbol: 'LINK',
      address: LINK_ADDRESS[chainId],
    },
    {
      name: 'Graph Token',
      symbol: 'GRT',
      address: GRT_ADDRESS[chainId],
    },
    {
      name: 'Maker',
      symbol: 'MKR',
      address: MKR_ADDRESS[chainId],
    },
  ]
}

const USDC_ADDRESS = {
  [ChainId.MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  [ChainId.RINKEBY]: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
}

const DAI_ADDRESS = {
  [ChainId.MAINNET]: '0x6b175474e89094c44da98b954eedeac495271d0f',
  [ChainId.RINKEBY]: '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
}

const UNI_ADDRESS = {
  [ChainId.MAINNET]: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  [ChainId.RINKEBY]: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
}

const WBTC_ADDRESS = {
  [ChainId.MAINNET]: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  [ChainId.RINKEBY]: '0x577d296678535e4903d59a4c929b718e1d575e0a',
}

const USDT_ADDRESS = {
  [ChainId.MAINNET]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  [ChainId.RINKEBY]: '0x40d3b2f06f198d2b789b823cdbecd1db78090d74',
}

const LINK_ADDRESS = {
  [ChainId.MAINNET]: '0x514910771af9ca656af840dff83e8264ecf986ca',
  [ChainId.RINKEBY]: '0x01be23585060835e02b77ef475b0cc51aa1e0709',
}

const GRT_ADDRESS = {
  [ChainId.MAINNET]: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
  [ChainId.RINKEBY]: '0x54fe55d5d255b8460fb3bc52d5d676f9ae5697cd',
}

const MKR_ADDRESS = {
  [ChainId.MAINNET]: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  [ChainId.RINKEBY]: '0xf9ba5210f91d0474bd1e1dcdaec4c58e359aad85',
}
