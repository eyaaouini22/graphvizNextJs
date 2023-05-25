import type { Meta, StoryFn } from "@storybook/react"
import React from "react"
import { Button } from "~/components"

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    text: {
      type: "string",
      description: "Button text"
    },

    onClick: {
      type: "function",
      description: "onClick function"
    }
  }
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})

Default.args = {
  text: "Default"
}
