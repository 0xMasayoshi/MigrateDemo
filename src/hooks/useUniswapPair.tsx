import { useEffect, useState } from 'react'
import { isAddress } from '@ethersproject/address'
import { useUniswapFactory } from './useUniswapFactory'

export function useUniswapPair(token0, token1) {
  const uniswapFactory = useUniswapFactory()

  const [pair, setPair] = useState<string>(undefined)

  useEffect(() => {
    async function getPair() {
      const pair = await uniswapFactory.getPair(token0, token1)
      setPair(pair.toLowerCase())
    }

    if (!token0 || !token1) return setPair(undefined)
    if (isAddress(token0) && isAddress(token1)) getPair()
  }, [token0, token1])

  return pair
}
