import React from 'react'
import { Container, Grid } from '@material-ui/core/'
import { TokenList } from '../components/TokenList'
import { SushiRoll } from '../components/SushiRoll'

export default function Index() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TokenList />
        </Grid>
        <Grid item xs={6}>
          <SushiRoll />
        </Grid>
      </Grid>
    </Container>
  )
}
