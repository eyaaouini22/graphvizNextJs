import { render } from "@testing-library/react"
import React from "react"
import Seo from "~/components/seo"

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    }
  }
})

describe("Seo component", () => {
  const props = {
    name: "Test Page title",
    description: "A test page description"
  }

  it("renders the title and description correctly", () => {
    render(<Seo {...props} />, { container: document.head })
    expect(document.title).toBe(props.name)
    expect(
      document.head
        .querySelector("meta[name='description']")
        ?.getAttribute("content")
    ).toBe(props.description)
  })
})
