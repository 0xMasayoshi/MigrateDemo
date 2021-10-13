import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@sushiswap/sdk'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { tokenList } from '../constants/tokens'

export function useTokenList() {
  const { chainId } = useWeb3React<Web3Provider>()
  const tokens = useMemo(() => tokenList(chainId || ChainId.MAINNET), [chainId])
  return tokens
}
