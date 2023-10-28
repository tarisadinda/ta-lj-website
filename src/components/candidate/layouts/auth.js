import React from 'react'

export default function LayoutAuth({ children }) {
    return (
      <>
        <div className='auth-wrap'>
            <main>{children}</main>
            <style jsx global>{`
                .auth-wrap {
                    margin: 50px 150px;
                    padding: auto;
                }
            `}</style>
        </div>
      </>  
    )
}