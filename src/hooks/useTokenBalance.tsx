import { useEffect, useReducer, useState } from 'react'
import { isAddress } from '@ethersproject/address'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ZERO_ADDRESS } from '../constants/addresses'
import { BigNumber } from '@ethersproject/bignumber'
import useERC20 from './useERC20'

export function useTokenBalance(address) {
  const { account } = useWeb3React<Web3Provider>()

  const [balance, setBalance] = useState<BigNumber>(undefined)
  const [refreshNeeded, refresh] = useReducer((x) => x + 1, 0)
  const refreshBalance = () => {
    refresh()
  }

  const { balanceOf } = useERC20()

  useEffect(() => {
    async function getBalance() {
      const balance = await balanceOf(address, account)
      setBalance(balance)
    }

    if (!address || address === ZERO_ADDRESS) return setBalance(undefined)
    if (account && isAddress(address)) getBalance()
  }, [account, address, refreshNeeded])

  return { balance, refreshBalance }
}
