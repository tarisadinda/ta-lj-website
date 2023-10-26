import React from 'react'
import Footer from '../footer'
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

export default function LayoutAuth({ children }) {
    return (
      <>
        <style jsx global>{`
            .auth-wrap {
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: column;
                padding: 60px 0px 30px 0px;
            }

            .main {
                height: auto;
                width: auto;
                display: flex;
                align-items: center;
            }
        `}</style>
        <ThemeProvider theme={theme}>
          <div className='container auth-wrap'>
              <main className='main flex-grow-1'>{children}</main>
              <div className='mt-5'>
                <Footer />
              </div>
          </div>
        </ThemeProvider>
      </>  
    )
}