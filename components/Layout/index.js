import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <body className='bg-yellow-300'>
      <div>
        <Header />
        <div>
          {children}
        </div>
        <Footer />
      </div>
    </body>
  )
}

export default Layout