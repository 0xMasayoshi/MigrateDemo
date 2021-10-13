import { useEffect, useReducer, useState } from 'react'
import { isAddress } from '@ethersproject/address'
import { ZERO_ADDRESS } from '../constants/addresses'
import { BigNumber } from '@ethersproject/bignumber'

import useERC20 from './useERC20'

export function useTokenAllowance(address, owner, spender) {
  const [allowance, setAllowance] = useState<BigNumber>(undefined)

  const [refreshNeeded, refresh] = useReducer((x) => x + 1, 0)
  const refreshAllowance = () => {
    refresh()
  }

  const { allowance: tokenAllowance } = useERC20()

  useEffect(() => {
    async function getAllowance() {
      const allowance = await tokenAllowance(address, owner, spender)
      setAllowance(allowance)
    }

    if (!address || address === ZERO_ADDRESS) return setAllowance(undefined)
    if (owner && spender && isAddress(owner) && isAddress(spender) && isAddress(address)) getAllowance()
  }, [owner, spender, address, refreshNeeded])

  return { allowance, refreshAllowance }
}
