import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
