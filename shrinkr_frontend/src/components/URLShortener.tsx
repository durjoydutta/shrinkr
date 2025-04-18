"use client"

import { useState, type FormEvent } from "react"
import { shortenUrl } from "../services/api"
import { showToast } from "./Toast"
import CopyButton from "./CopyButton"
import "./URLShortener.css"

interface URLShortenerProps {
  onUrlShortened: (longUrl: string, shortCode: string) => void
}

const URLShortener = ({ onUrlShortened }: URLShortenerProps) => {
  const [longUrl, setLongUrl] = useState("")
  const [shortCode, setShortCode] = useState("")
  const [shortenedUrl, setShortenedUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCustomCode, setIsCustomCode] = useState(false)

  // const validateUrl = (url: string): boolean => {
  //   try {
  //     new URL(url)
  //     return true
  //   } catch (err) {
  //     return false
  //   }
  // }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // if (!validateUrl(longUrl)) {
    //   showToast("Please enter a valid URL", "error")
    //   return
    // }

    setIsLoading(true)

    try {
      const code = await shortenUrl(longUrl, isCustomCode ? shortCode : undefined)
      const resultUrl = `${window.location.origin}/${code}`

      setShortenedUrl(resultUrl)
      onUrlShortened(longUrl, code)
      showToast("URL shortened successfully!", "success")
    } catch (error) {
      console.error("Error shortening URL:", error)
      showToast("Failed to shorten URL. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setLongUrl("")
    setShortCode("")
    setShortenedUrl("")
  }

  return (
    <div className="url-shortener">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL here"
            disabled={isLoading}
            required
          />
        </div>

        <div className="custom-code-toggle">
          <label>
            <input
              type="checkbox"
              checked={isCustomCode}
              onChange={() => setIsCustomCode(!isCustomCode)}
              disabled={isLoading}
            />
            <span>Use custom short code</span>
          </label>
        </div>

        {isCustomCode && (
          <div className="input-group">
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="Enter custom short code"
              disabled={isLoading}
              required={isCustomCode}
            />
          </div>
        )}

        <button type="submit" className={`submit-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {shortenedUrl && (
        <div className="result">
          <h3>Your shortened URL:</h3>
          <div className="shortened-url">
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
            <CopyButton textToCopy={shortenedUrl} />
          </div>

          <div className="share-buttons">
            <button
              onClick={() =>
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shortenedUrl)}`, "_blank")
              }
            >
              Share on Twitter
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shortenedUrl)}`,
                  "_blank",
                )
              }
            >
              Share on Facebook
            </button>
          </div>

          <button className="new-url-button" onClick={resetForm}>
            Shorten another URL
          </button>
        </div>
      )}
    </div>
  )
}

export default URLShortener
