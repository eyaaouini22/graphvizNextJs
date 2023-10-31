import "../styles/globals.css"

import "../styles/api.css"
import "../styles/app.css"
import "../styles/site.css"
import type { AppProps } from "next/app"
import React from "react"
import { Provider } from "react-redux"
import Seo from "~/components/seo"
import store from "~/store"

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Seo name="Next Base" description="Hippo NextJS boilerplate " />
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
