import React from 'react'
import Navbar from '@/components/candidate/navbar'
import { Inter } from "next/font/google"
import { Provider } from 'react-redux'
import { store } from 'src/redux/store'

const inter = Inter({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

export default function LayoutMain({ children }) {
  return (
    <Provider store={store}>
      <div className={inter.className}>
        <Navbar />
        <main
          className='container'
          style={{
            paddingTop: '80px',
            marginBottom: '40px'
          }}
        >
          {children}
        </main>
      </div>
    </Provider>  
  )
}