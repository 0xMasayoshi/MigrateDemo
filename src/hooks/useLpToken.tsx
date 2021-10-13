import { useCallback } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { LPToken } from '../types'
import { BigNumber } from '@ethersproject/bignumber'
import { CurrencyAmount, Pair, Token } from '@sushiswap/sdk'
import { calculateSlippageAmount } from '../functions'
import { DEFAULT_SLIPPAGE } from '../constants'
import UNISWAP_PAIR_ABI from '../abis/UniswapV2Pair.json'

export const useLpToken = () => {
  const { chainId, library } = useWeb3React<Web3Provider>()

  const getReserves = useCallback(
    async (address) => {
      if (chainId && address) {
        const lpToken = new Contract(address, UNISWAP_PAIR_ABI, library)
        const balance = await lpToken.getReserves()

        return balance
      }
    },
    [chainId, library]
  )

  const totalSupply = useCallback(
    async (address) => {
      if (address) {
        const lpToken = new Contract(address, UNISWAP_PAIR_ABI, library)
        const totalSupply = await lpToken.totalSupply()

        return totalSupply
      }
    },
    [chainId, library]
  )

  const getMinAmounts = useCallback(
    async (lpToken: LPToken, amount: BigNumber) => {
      const reserves = await getReserves(lpToken.address)
      const lpTotalSupply = await totalSupply(lpToken.address)

      const pair = new Pair(
        CurrencyAmount.fromRawAmount(new Token(chainId, lpToken.tokenA.address, lpToken.tokenA.decimals), reserves[0]),
        CurrencyAmount.fromRawAmount(new Token(chainId, lpToken.tokenB.address, lpToken.tokenB.decimals), reserves[1])
      )

      const total = CurrencyAmount.fromRawAmount(pair.liquidityToken, lpTotalSupply)
      const balance = CurrencyAmount.fromRawAmount(pair.liquidityToken, amount.toString())

      const token0MinAmount = calculateSlippageAmount(
        pair.getLiquidityValue(pair.token0, total, balance, false),
        DEFAULT_SLIPPAGE
      )[0]
      const token1MinAmount = calculateSlippageAmount(
        pair.getLiquidityValue(pair.token1, total, balance, false),
        DEFAULT_SLIPPAGE
      )[0]

      return { token0MinAmount, token1MinAmount }
    },
    [chainId, library]
  )

  return {
    getReserves,
    totalSupply,
    getMinAmounts,
  }
}

export default useLpToken
