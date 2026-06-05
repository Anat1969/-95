'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface ImageUploadZoneProps {
  storageKey: string
}

export function ImageUploadZone({ storageKey }: ImageUploadZoneProps) {
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setImage(saved)
    } catch {}
  }, [storageKey])

  const saveImage = useCallback((dataUrl: string) => {
    setImage(dataUrl)
    try {
      localStorage.setItem(storageKey, dataUrl)
    } catch {}
  }, [storageKey])

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      saveImage(dataUrl)
    }
    reader.readAsDataURL(file)
  }, [saveImage])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile()
        if (file) handleFile(file)
        break
      }
    }
  }, [handleFile])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleRemove = useCallback(() => {
    setImage(null)
    try {
      localStorage.removeItem(storageKey)
    } catch {}
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [storageKey])

  if (image) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          border: 'var(--border)',
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          alt="תמונת עיקרון"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <button
          onClick={handleRemove}
          style={{
            position: 'absolute',
            top: 'var(--space-2)',
            left: 'var(--space-2)',
            width: '32px',
            height: '32px',
            background: 'var(--ink)',
            color: 'var(--white)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--weight-bold)',
            transition: 'var(--transition-base)',
          }}
        >
          ×
        </button>
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onPaste={handlePaste}
      onClick={handleClick}
      tabIndex={0}
      style={{
        width: '100%',
        aspectRatio: '4 / 3',
        border: isDragging ? '2px dashed var(--forest)' : '2px dashed var(--fog)',
        background: isDragging ? 'rgba(45, 74, 62, 0.04)' : 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'var(--transition-base)',
        gap: 'var(--space-3)',
        padding: 'var(--space-6)',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '2px solid var(--fog)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--weight-light)',
            color: 'var(--earth)',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </div>

      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-bold)',
          color: 'var(--ink)',
        }}
      >
        העלאת תמונה
      </span>

      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          color: 'var(--earth)',
          textAlign: 'center',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        גרור לכאן, הדבק, או לחץ לבחירה
      </span>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
