import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
  Typography,
} from '@material-ui/core/'
import { useTokenList } from '../../hooks/useTokenList'
import { Address } from '../Address'

export function TokenList() {
  const tokens = useTokenList()

  return (
    <Paper elevation={4}>
      <Box>
        <Typography variant="h5" align="center">
          Tokens
        </Typography>
        <TableContainer style={{ maxHeight: '90vh', overflow: 'scroll' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.address}>
                  <TableCell>{token.name}</TableCell>
                  <TableCell>{token.symbol}</TableCell>
                  <TableCell>
                    <Address address={token.address} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  )
}
