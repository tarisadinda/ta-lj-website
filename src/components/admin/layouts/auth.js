import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material';
import Footer from '../footer';
import { Inter } from "next/font/google"

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

const inter = Inter({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
})

export default function LayoutAuth({ children }) {
  return (
    <>
      <style jsx global>{`
        // .auth-wrap {
        //     height: 100%;
        //     position: absolute;
        //     top: 50%;
        //     left: 50%;
        //     transform: translate(-50%, -50%);
        //     display: flex;
        //     flex-direction: column;
        //     padding: 50px 0px 30px 0px;
        // }

        .main {
            height: auto;
            width: auto;
            display: flex;
            align-items: center;
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <div className={inter.className}>
          <div className='container'>
            <main className='main flex-grow-1'>{children}</main>
            <div className='mt-4'>
              <Footer />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>  
  )
}