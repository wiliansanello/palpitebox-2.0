import React from 'react'
import Layout from '../components/Layout'
import '../css/styles.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <html>
      <head>
        <link href='https://api.mapbox.com/mapbox-g1-js/v1.12.0/mapbox-g1.css' rel='stylesheet' />
      </head>
      <body>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </body>
    </html >


  )
}

export default MyApp
