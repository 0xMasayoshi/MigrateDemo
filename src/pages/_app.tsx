import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { Box } from '@material-ui/core/'
import { ThemeProvider } from '@material-ui/core/styles'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Header } from '../components/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Sushi Roll</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
        </Web3ReactProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}
