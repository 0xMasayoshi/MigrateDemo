import React, { useState } from 'react'
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton } from '@material-ui/core/'
import { useUniswapPair } from '../../hooks/useUniswapPair'
import { Address } from '../Address'
import { useTokenBalance } from '../../hooks/useTokenBalance'
import { formatNumber } from '../../functions/format'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { SUSHI_ROLL, ZERO_ADDRESS } from '../../constants/addresses'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { tryParseAmount } from '../../functions/parse'
import { useTokenAllowance } from '../../hooks/useTokenAllowance'
import { MaxUint256 } from '@sushiswap/sdk'
import { useTokenList } from '../../hooks/useTokenList'
import ClearIcon from '@material-ui/icons/Clear'
import useSushiRoll from '../../hooks/useSushiRoll'
import useUniswapFactory from '../../hooks/useUniswapFactory'
import useERC20 from '../../hooks/useERC20'

export function SushiRoll() {
  const { active, account, chainId } = useWeb3React<Web3Provider>()

  const sushiRoll = useSushiRoll()
  const uniswapFactory = useUniswapFactory()
  const tokenList = useTokenList()

  const [tokenA, setTokenA] = useState<string>('')
  const [tokenB, setTokenB] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const [createPairPending, setCreatePairPending] = useState<boolean>(false)
  const [migratePending, setMigratePending] = useState<boolean>(false)
  const [approvalPending, setApprovalPending] = useState<boolean>(false)

  const pair = useUniswapPair(tokenA, tokenB)
  const { approve: approveToken } = useERC20()
  const { balance, refreshBalance } = useTokenBalance(pair)
  const { allowance, refreshAllowance } = useTokenAllowance(pair, account, SUSHI_ROLL[chainId])
  const approved = balance && allowance && balance.lt(allowance)

  const parsedAmount = tryParseAmount(amount, 18)
  const amountError = balance && parsedAmount && BigNumber.from(parsedAmount).gt(BigNumber.from(balance))

  async function createPair() {
    const tx = await uniswapFactory.createPair(tokenA, tokenB)
    setCreatePairPending(true)

    const receipt = await tx.wait()
    setCreatePairPending(false)

    window.location.reload()
  }

  async function migrate(withPermit = false) {
    if (!parsedAmount) return

    const lpToken = {
      address: pair,
      tokenA: tokenList.find((token) => token.address === tokenA),
      tokenB: tokenList.find((token) => token.address === tokenB),
    }
    const tx = withPermit
      ? await sushiRoll.migrateWithPermit(lpToken, BigNumber.from(parsedAmount))
      : await sushiRoll.migrate(lpToken, BigNumber.from(parsedAmount))
    setMigratePending(true)

    const receipt = await tx.wait()
    setMigratePending(false)

    window.location.reload()
  }

  async function approve() {
    const tx = await approveToken(pair, SUSHI_ROLL[chainId], MaxUint256.toString())
    setApprovalPending(true)

    const receipt = await tx.wait()
    setApprovalPending(false)

    refreshAllowance()
  }

  return (
    <Paper elevation={4}>
      <Box width="100%">
        <Typography variant="h5" align="center">
          Sushi Roll
        </Typography>
        <Box display="flex" flexDirection="column" style={{ padding: 10 }}>
          <TextField
            label="Token A"
            value={tokenA}
            onChange={(event) => setTokenA(event.target.value)}
            disabled={!active}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disabled={!tokenA} onClick={() => setTokenA('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Token B"
            value={tokenB}
            onChange={(event) => setTokenB(event.target.value)}
            disabled={!active}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disabled={!tokenB} onClick={() => setTokenB('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
          <Typography>Pair:</Typography>
          {pair && pair !== ZERO_ADDRESS ? (
            <Address address={pair} />
          ) : pair && tokenA && tokenB ? (
            <Button
              disabled={createPairPending}
              onClick={async () => await createPair()}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          ) : (
            <Typography style={{ paddingRight: 16 }}>...</Typography>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
          <Typography>Balance:</Typography>
          <Typography style={{ paddingRight: 16 }}>
            {balance ? `${formatNumber(Number(balance) / Math.pow(10, 18))} LP` : '...'}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: 10 }}>
          <TextField
            label="Amount to migrate"
            disabled={!balance}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            error={amountError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button disabled={!balance} onClick={() => setAmount(formatUnits(BigNumber.from(balance), 18))}>
                    Max
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {approved ? (
            <Button variant="outlined" disabled={migratePending || !parsedAmount} onClick={async () => await migrate()}>
              Migrate
            </Button>
          ) : (
            <Button variant="outlined" disabled={approvalPending || !pair} onClick={async () => await approve()}>
              Approve
            </Button>
          )}
          <Button
            variant="outlined"
            disabled={migratePending || !parsedAmount}
            onClick={async () => await migrate(true)}
          >
            Migrate W/ Permit
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
