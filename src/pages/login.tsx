import type { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { Button } from "~/components"
import { NavbarLayout } from "~/layouts"
import { login } from "~/service/auth"

const Login: NextPage = () => {
  const router = useRouter()
  return (
    <NavbarLayout>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Button
          text="Login"
          onClick={() => {
            console.log("Login")
            login()
            router.push("/protected")
          }}
        />
      </div>
    </NavbarLayout>
  )
}

export default Login
