import type { NextPage } from "next"
import Link from "next/link"
import React from "react"
import { useDispatch } from "react-redux"
import { ToastContainer } from "react-toastify"
import Upload from "~/components/Upload"
import { NavbarLayout } from "~/layouts"
import { setSelected } from "~/store/navbar-slice"
import 'react-toastify/dist/ReactToastify.css'
const About: NextPage = () => {
  const dispatch = useDispatch()
  dispatch(setSelected("About"))
  return (
    <NavbarLayout>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          UPLOAD   GRAPHVIZ
          <Upload/>
          <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="/">
          Home
        </Link>
      </div>
    
    </NavbarLayout>
  )
}

export default About
