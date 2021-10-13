import { useEffect, useReducer, useState } from 'react'
import { isAddress } from '@ethersproject/address'
import { ZERO_ADDRESS } from '../constants/addresses'
import { BigNumber } from '@ethersproject/bignumber'

import useERC20 from './useERC20'

export function useTokenAllowance(tokenAddress, owner, spender) {
  const [allowance, setAllowance] = useState<BigNumber>(undefined)

  const [refreshNeeded, refresh] = useReducer((x) => x + 1, 0)
  const refreshAllowance = () => {
    refresh()
  }

  const token = useERC20(tokenAddress)

  useEffect(() => {
    async function getAllowance() {
      const allowance = await token.allowance(owner, spender)
      setAllowance(allowance)
    }

    if (!tokenAddress || tokenAddress === ZERO_ADDRESS) return setAllowance(undefined)
    if (owner && spender && tokenAddress && isAddress(owner) && isAddress(spender) && isAddress(tokenAddress))
      getAllowance()
  }, [owner, spender, tokenAddress, refreshNeeded])

  return { allowance, refreshAllowance }
}
