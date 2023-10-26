import React from 'react'
import Navbar from '@/components/navbar'
import { Inter } from "next/font/google"
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

const inter = Inter({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
})

export default function LayoutMain({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={inter.className}>
          <Navbar />
          <main
            style={{
              margin: '0px 50px 0px 265px',
              padding: '100px 0px'
            }}
          >
            {children}
          </main>
        </div>
      </ThemeProvider>
    </>  
  )
}