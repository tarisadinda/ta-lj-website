import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.scss'
import { ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

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
