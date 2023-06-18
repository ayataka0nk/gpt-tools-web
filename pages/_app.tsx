import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Suspense } from 'react'
import CSR from '../components/CSR/CSR'
import { LoadingPage } from '../components/common/LoadingPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CSR>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingPage />}>
          <Component {...pageProps} />
        </Suspense>
      </QueryClientProvider>
    </CSR>
  )
}

export default MyApp
