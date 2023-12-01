import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.scss'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from 'src/redux/store'
import { Inter } from 'next/font/google'

const inter = Inter({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  const theme = createTheme({
    typography: {
      fontFamily: inter.style.fontFamily,
    },
  })

  return getLayout(<>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  </>) 
}
