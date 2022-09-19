import React from "react"
import DynamicRenderer from "../../../documentation/DynamicRenderer"

const CurrentYear = new Date().getFullYear()

export const SectionFAQ = () => {
  return (
    <DynamicRenderer
      year={CurrentYear}
      slug={"data-browser-graphs-faq"}
      showBackLink={false}
    />
  )
}
