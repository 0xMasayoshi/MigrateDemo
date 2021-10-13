import { useCallback } from 'react'
import { Contract } from '@ethersproject/contracts'
import { UNISWAP_FACTORY } from '../constants/addresses'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { isAddress } from '@ethersproject/address'
import UNISWAP_FACTORY_ABI from '../abis/UniswapV2Factory.json'

export const useUniswapFactory = () => {
  const { chainId, library, account } = useWeb3React<Web3Provider>()

  const createPair = useCallback(
    async (tokenA: string, tokenB: string) => {
      if (chainId && isAddress(tokenA) && isAddress(tokenB)) {
        const uniswapFactory = new Contract(UNISWAP_FACTORY[chainId], UNISWAP_FACTORY_ABI, library.getSigner())
        const tx = uniswapFactory.createPair(tokenA, tokenB)

        return tx
      }
    },
    [account, library, chainId]
  )

  const getPair = useCallback(
    async (tokenA: string, tokenB: string) => {
      if (chainId && isAddress(tokenA) && isAddress(tokenB)) {
        const uniswapFactory = new Contract(UNISWAP_FACTORY[chainId], UNISWAP_FACTORY_ABI, library.getSigner())
        const pair = await uniswapFactory.getPair(tokenA, tokenB)

        return pair
      }
    },
    [account, library, chainId]
  )

  return {
    getPair,
    createPair,
  }
}

export default useUniswapFactory
