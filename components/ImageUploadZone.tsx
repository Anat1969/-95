'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface ImageUploadZoneProps {
  principleId: string
}

export function ImageUploadZone({ principleId }: ImageUploadZoneProps) {
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const staticUrl = `/images/principles/${principleId}.png`
    const img = new Image()
    img.onload = () => setImage(staticUrl)
    img.onerror = () => {
      fetch('/api/images')
        .then((res) => res.json())
        .then((data) => {
          if (data[principleId]) setImage(data[principleId])
        })
        .catch(() => {})
    }
    img.src = staticUrl
  }, [principleId])

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    const preview = URL.createObjectURL(file)
    setImage(preview)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('id', principleId)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        setImage(data.url)
      }
    } catch {} finally {
      setUploading(false)
    }
  }, [principleId])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }, [uploadFile])

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
        if (file) uploadFile(file)
        break
      }
    }
  }, [uploadFile])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }, [uploadFile])

  if (image) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          border: 'var(--border)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
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
        {uploading && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--white)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
          }}>
            שומר...
          </div>
        )}
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
      {uploading ? (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--forest)' }}>
          שומר...
        </span>
      ) : (
        <>
          <div style={{
            width: '48px', height: '48px',
            border: '2px solid var(--fog)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 'var(--space-2)',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-light)', color: 'var(--earth)', lineHeight: 1,
            }}>+</span>
          </div>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-bold)', color: 'var(--ink)' }}>
            העלאת תמונה
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--earth)', textAlign: 'center', lineHeight: 'var(--leading-normal)' }}>
            גרור לכאן, הדבק, או לחץ לבחירה
          </span>
        </>
      )}
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
