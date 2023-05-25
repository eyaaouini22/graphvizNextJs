import type { NextPage } from "next"
import React from "react"
import { useDispatch } from "react-redux"
import { Counter, Seo } from "~/components"
import Upload from "~/components/Upload"
import { NavbarLayout } from "~/layouts"
import { setSelected } from "~/store/navbar-slice"
import FileList from "~/components/FileList"

const Home: NextPage = () => {
  const dispatch = useDispatch()
  dispatch(setSelected("Home"))
  return (
    <>
      <Seo name="Home" description="This is the home page" />

      <NavbarLayout>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       
        <FileList/>
      
       
        </div>
      </NavbarLayout>
    </>
  )
}

export default Home
