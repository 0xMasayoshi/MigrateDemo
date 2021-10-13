export type Token = {
  name: string
  symbol: string
  address: string
}

export type LPToken = {
  address: string
  tokenA: {
    address: string
  }
  tokenB: {
    address: string
  }
}
