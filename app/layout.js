import '../styles/globals.css'
import Navbar from "../components/Navbar";
import Layout from "../components/layout";
import Loading from "./loading";
import {Suspense} from "react";

function RootLayout({ children }) {
  return (
          <html lang="en">
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
              <Navbar/>
              <Layout>
                  <Suspense fallback={<Loading/>}>
                    {children}
                  </Suspense>
              </Layout>
          </body>
          </html>

  )
}

export default RootLayout
