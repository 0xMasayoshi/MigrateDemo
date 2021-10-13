export type Token = {
  name: string
  symbol: string
  address: string
  decimals: number
}

export type LPToken = {
  address: string
  tokenA: Token
  tokenB: Token
}
