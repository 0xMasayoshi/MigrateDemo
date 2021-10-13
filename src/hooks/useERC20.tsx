import { useCallback } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { isAddress } from '@ethersproject/address'
import { BigNumberish } from '@ethersproject/bignumber'
import ERC20_ABI from '../abis/ERC20.json'

export const useERC20 = () => {
  const { library } = useWeb3React<Web3Provider>()

  const balanceOf = useCallback(
    async (address: string, account: string) => {
      if (library && isAddress(address) && isAddress(account)) {
        const erc20 = new Contract(address, ERC20_ABI, library)
        const balance = await erc20.balanceOf(account)

        return balance
      }
    },
    [library]
  )

  const allowance = useCallback(
    async (address: string, owner: string, spender: string) => {
      if (library && isAddress(address) && isAddress(owner) && isAddress(spender)) {
        const erc20 = new Contract(address, ERC20_ABI, library)
        const allowance = await erc20.allowance(owner, spender)

        return allowance
      }
    },
    [library]
  )

  const approve = useCallback(
    async (address: string, spender: string, value: BigNumberish) => {
      if (library && isAddress(address) && isAddress(spender)) {
        const erc20 = new Contract(address, ERC20_ABI, library.getSigner())
        const tx = erc20.approve(spender, value)

        return tx
      }
    },
    [library]
  )

  const decimals = useCallback(
    async (address) => {
      if (library && isAddress(address)) {
        const erc20 = new Contract(address, ERC20_ABI, library)
        const decimals = await erc20.decimals()

        return decimals
      }
    },
    [library]
  )

  return {
    balanceOf,
    allowance,
    approve,
    decimals,
  }
}

export default useERC20
