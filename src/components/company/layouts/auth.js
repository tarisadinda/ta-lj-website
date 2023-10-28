import React from 'react'
import Footer from '../footer'

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
                padding: 100px 0px 30px 0px;
            }

            .main {
                height: auto;
                width: auto;
            }
        `}</style>
        <div className='container auth-wrap'>
            <main className='main flex-grow-1'>{children}</main>
            <Footer />
        </div>
      </>  
    )
}