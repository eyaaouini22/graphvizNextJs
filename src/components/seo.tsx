import Head from "next/head"
import React from "react"

type SeoProps = {
  name: string
  description: string
}

const Seo: React.FC<SeoProps> = ({ name, description }) => {
  return (
    <Head>
      <title>{name}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Seo
