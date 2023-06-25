import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Suspense, useEffect, useState } from 'react'
import CSR from '../components/CSR/CSR'
import { LoadingPage } from '../components/common/LoadingPage'
import { useRouter } from 'next/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
})
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isRouterReady, setIsRouterReady] = useState(false)
  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true)
    }
  }, [router.isReady])
  if (!isRouterReady) {
    return <LoadingPage />
  }
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
