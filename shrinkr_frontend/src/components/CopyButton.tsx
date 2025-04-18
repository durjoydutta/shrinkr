"use client"

import { useState } from "react"
import { showToast } from "./Toast"
import "./CopyButton.css"

interface CopyButtonProps {
  textToCopy: string
  small?: boolean
}

const CopyButton = ({ textToCopy, small = false }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      showToast("Copied to clipboard!", "success")

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
      showToast("Failed to copy to clipboard", "error")
    }
  }

  return (
    <button
      className={`copy-button ${copied ? "copied" : ""} ${small ? "small" : ""}`}
      onClick={(e) => {
        e.stopPropagation()
        handleCopy()
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? "Copied!" : small ? "Copy" : "Copy URL"}
    </button>
  )
}

export default CopyButton
