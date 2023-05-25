import React from "react"
import Navbar from "~/components/navbar"

interface NavbarLayoutProps {
  children: React.ReactNode
}

const NavbarLayout = ({ children }: NavbarLayoutProps) => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50">
        <div>{children}</div>
      </section>
      <footer>Footer</footer>
    </>
  )
}

export default NavbarLayout
