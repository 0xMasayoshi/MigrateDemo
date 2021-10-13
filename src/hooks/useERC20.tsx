import { useCallback } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { isAddress } from '@ethersproject/address'
import { BigNumberish } from '@ethersproject/bignumber'
import ERC20_ABI from '../abis/ERC20.json'

export const useERC20 = (address) => {
  const { chainId, library } = useWeb3React<Web3Provider>()

  const balanceOf = useCallback(
    async (account) => {
      if (chainId && address && isAddress(account)) {
        const erc20 = new Contract(address, ERC20_ABI, library)
        const balance = await erc20.balanceOf(account)

        return balance
      }
    },
    [chainId, address, library]
  )

  const allowance = useCallback(
    async (owner: string, spender: string) => {
      if (chainId && address && isAddress(owner) && isAddress(spender)) {
        const erc20 = new Contract(address, ERC20_ABI, library)
        const allowance = await erc20.allowance(owner, spender)

        return allowance
      }
    },
    [chainId, address, library]
  )

  const approve = useCallback(
    async (spender: string, value: BigNumberish) => {
      if (address && isAddress(spender)) {
        const erc20 = new Contract(address, ERC20_ABI, library.getSigner())
        const tx = erc20.approve(spender, value)

        return tx
      }
    },
    [chainId, address, library]
  )

  const decimals = useCallback(async () => {
    if (address) {
      const erc20 = new Contract(address, ERC20_ABI, library)
      const decimals = await erc20.decimals()

      return decimals
    }
  }, [chainId, address, library])

  return {
    balanceOf,
    allowance,
    approve,
    decimals,
  }
}

export default useERC20
