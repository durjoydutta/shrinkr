"use client"

import { useState } from "react"
import CopyButton from "./CopyButton"
import "./URLHistory.css"

interface HistoryItem {
  longUrl: string
  shortCode: string
  createdAt: Date
}

interface URLHistoryProps {
  history: HistoryItem[]
}

const URLHistory = ({ history }: URLHistoryProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleExpand = (shortCode: string) => {
    if (expandedItem === shortCode) {
      setExpandedItem(null)
    } else {
      setExpandedItem(shortCode)
    }
  }

  const formatUrl = (url: string): string => {
    if (url.length <= 40) return url
    return url.substring(0, 37) + "..."
  }

  const formatTime = (date: Date): string => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.floor((date.getTime() - Date.now()) / (1000 * 60)),
      "minute",
    )
  }

  return (
    <div className="url-history">
      <h2>Recent URLs</h2>
      <div className="history-list">
        {history.map((item) => {
          const shortUrl = `${window.location.origin}/${item.shortCode}`

          return (
            <div
              key={item.shortCode}
              className={`history-item ${expandedItem === item.shortCode ? "expanded" : ""}`}
              onClick={() => toggleExpand(item.shortCode)}
            >
              <div className="history-item-header">
                <div className="url-info">
                  <span className="short-url">{shortUrl}</span>
                  <span className="timestamp">{formatTime(item.createdAt)}</span>
                </div>
                <div className="actions">
                  <CopyButton textToCopy={shortUrl} small />
                </div>
              </div>

              {expandedItem === item.shortCode && (
                <div className="history-item-details">
                  <div className="long-url">
                    <span>Original URL:</span>
                    <a href={item.longUrl} target="_blank" rel="noopener noreferrer">
                      {formatUrl(item.longUrl)}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default URLHistory
