import '../styles/globals.scss'
import '../styles/nprogress.css'
import { NextComponentType, NextPage } from 'next'
import Layout from '../components/layouts/Layout'
import { ThemeProvider } from 'next-themes'
import AlertProvider from '../components/Alert/AlertProvider'
import { Fragment, ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App(
  {
    Component,
    pageProps,
  }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  console.log(Component.getLayout)
  return (
    <ThemeProvider attribute='class'>
      <AlertProvider>
        <Layout>
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </AlertProvider>
    </ThemeProvider>
  )
}
