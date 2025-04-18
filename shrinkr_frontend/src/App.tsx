"use client"

import { useState, useEffect } from "react"
import URLShortener from "./components/URLShortener"
import URLHistory from "./components/URLHistory"
import Redirect from "./components/Redirect"
import { ToastContainer } from "./components/Toast"
import "./App.css"

function App() {
  const [urlHistory, setUrlHistory] = useState<Array<{ longUrl: string; shortCode: string; createdAt: Date }>>([])
  const [shortCode, setShortCode] = useState<string | null>(null)

  useEffect(() => {
    // Check if current path is a short URL
    const path = window.location.pathname
    if (path.length > 1) { // More than just "/"
      setShortCode(path.slice(1)) // Remove leading slash
    }
  }, [])

  const addToHistory = (longUrl: string, shortCode: string) => {
    const newEntry = {
      longUrl,
      shortCode,
      createdAt: new Date(),
    }

    setUrlHistory((prev) => [newEntry, ...prev].slice(0, 5))
  }

  // If there's a short code, show the redirect component
  if (shortCode) {
    return <Redirect shortCode={shortCode} />
  }

  return (
    <div className="app-container">
      <header>
        <h1>Shrinkr</h1>
        <p>Shorten your URLs with ease</p>
      </header>

      <main>
        <URLShortener onUrlShortened={addToHistory} />
        {urlHistory.length > 0 && <URLHistory history={urlHistory} />}
      </main>

      <footer>
        <p className="text-amber-300">© {new Date().getFullYear()} Shrinkr - Modern URL Shortener • Made with ❤️ by <a href="https://github.com/durjoydutta" target="_blank" rel="noopener noreferrer">@durjoydutta</a></p>
      </footer>

      <ToastContainer />
    </div>
  )
}

export default App
