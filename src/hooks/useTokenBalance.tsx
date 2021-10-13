import { useEffect, useReducer, useState } from 'react'
import { isAddress } from '@ethersproject/address'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ZERO_ADDRESS } from '../constants/addresses'
import { BigNumber } from '@ethersproject/bignumber'
import useERC20 from './useERC20'

export function useTokenBalance(tokenAddress) {
  const { account } = useWeb3React<Web3Provider>()

  const [balance, setBalance] = useState<BigNumber>(undefined)
  const [refreshNeeded, refresh] = useReducer((x) => x + 1, 0)
  const refreshBalance = () => {
    refresh()
  }

  const token = useERC20(tokenAddress)

  useEffect(() => {
    async function getBalance() {
      const balance = await token.balanceOf(account)
      setBalance(balance)
    }

    if (!tokenAddress || tokenAddress === ZERO_ADDRESS) return setBalance(undefined)
    if (account && isAddress(tokenAddress)) getBalance()
  }, [account, tokenAddress, refreshNeeded])

  return { balance, refreshBalance }
}
