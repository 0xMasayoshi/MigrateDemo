import { BigNumber } from '@ethersproject/bignumber'
import { signERC2612Permit } from 'eth-permit'
import { useCallback } from 'react'
import { Contract } from '@ethersproject/contracts'
import { SUSHI_ROLL } from '../constants/addresses'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { LPToken } from '../types'
import SUSHI_ROLL_ABI from '../abis/SushiRoll.json'

const useSushiRoll = () => {
  const { chainId, library, account } = useWeb3React<Web3Provider>()

  const migrate = useCallback(
    async (lpToken: LPToken, amount: BigNumber) => {
      if (chainId && library) {
        const sushiRoll = new Contract(SUSHI_ROLL[chainId], SUSHI_ROLL_ABI, library.getSigner())
        const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 10
        const args = [
          lpToken.tokenA.address,
          lpToken.tokenB.address,
          amount,
          BigNumber.from(0),
          BigNumber.from(0),
          deadline,
        ]

        const gasLimit = await sushiRoll.estimateGas.migrate(...args)
        const tx = sushiRoll.migrate(...args, {
          gasLimit: gasLimit.mul(120).div(100),
        })

        return tx
      }
    },
    [library, chainId]
  )

  const migrateWithPermit = useCallback(
    async (lpToken: LPToken, amount: BigNumber) => {
      if (account && chainId && library) {
        const sushiRoll = new Contract(SUSHI_ROLL[chainId], SUSHI_ROLL_ABI, library.getSigner())
        const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 10
        const permit = await signERC2612Permit(
          library,
          lpToken.address,
          account,
          sushiRoll.address,
          amount.toString(),
          deadline
        )
        const args = [
          lpToken.tokenA.address,
          lpToken.tokenB.address,
          amount,
          BigNumber.from(0),
          BigNumber.from(0),
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ]

        const gasLimit = await sushiRoll.estimateGas.migrateWithPermit(...args)
        const tx = await sushiRoll.migrateWithPermit(...args, {
          gasLimit: gasLimit.mul(120).div(100),
        })

        return tx
      }
    },
    [account, library, chainId]
  )

  return {
    migrate,
    migrateWithPermit,
  }
}

export default useSushiRoll
