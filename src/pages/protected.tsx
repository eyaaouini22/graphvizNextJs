import type { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { Button } from "~/components"
import { NavbarLayout } from "~/layouts"
import { logout } from "~/service/auth"

const Protected: NextPage = () => {
  const router = useRouter()

  return (
    <NavbarLayout>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p className="mb-3">{"You're logged in."}</p>

        <Button
          text="Logout"
          onClick={() => {
            console.log("Logout")
            logout()
            router.push("/")
          }}
        />
      </div>
    </NavbarLayout>
  )
}

export default Protected
