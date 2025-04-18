"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./Toast.css"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: number
  message: string
  type: ToastType
}

// Global state for toasts
let toasts: Toast[] = []
let toastCounter = 0
let setToastsState: React.Dispatch<React.SetStateAction<Toast[]>> | null = null

// Function to show a toast from anywhere in the app
export const showToast = (message: string, type: ToastType = "info") => {
  const id = toastCounter++
  const newToast = { id, message, type }

  toasts = [...toasts, newToast]
  if (setToastsState) {
    setToastsState([...toasts])
  }

  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

// Function to remove a toast
export const removeToast = (id: number) => {
  toasts = toasts.filter((toast) => toast.id !== id)
  if (setToastsState) {
    setToastsState([...toasts])
  }
}

// Toast container component
export const ToastContainer = () => {
  const [toastsState, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    setToastsState = setToasts
    return () => {
      setToastsState = null
    }
  }, [])

  return ReactDOM.createPortal(
    <div className="toast-container">
      {toastsState.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">{toast.message}</div>
          <button className="toast-close" onClick={() => removeToast(toast.id)} aria-label="Close notification">
            ×
          </button>
        </div>
      ))}
    </div>,
    document.body,
  )
}
