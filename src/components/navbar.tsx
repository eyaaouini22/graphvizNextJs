import { Navbar as FlowbiteNavbar } from "flowbite-react"
import Image from "next/image"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "~/store"

const Navbar = () => {
  const selectedPage = useSelector((state: RootState) => state.navbar.selected)

  return (
    <FlowbiteNavbar fluid={true} rounded={true}>
      <FlowbiteNavbar.Brand href="https://flowbite.com/">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          width={36}
          height={36}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibol">
          Navbar
        </span>
      </FlowbiteNavbar.Brand>
      <FlowbiteNavbar.Toggle />
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link href="/" active={selectedPage === "Home"}>
          Home
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/about" active={selectedPage === "About"}>
          Upload
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/login">Login</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/protected">
          Protected Page
        </FlowbiteNavbar.Link>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  )
}

export default Navbar
