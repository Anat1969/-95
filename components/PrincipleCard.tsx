'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import type { Principle } from '@/types'
import { DimensionBadge } from './DimensionBadge'

interface PrincipleCardProps {
  principle: Principle
  imageUrl?: string
  onImageUploaded?: (principleId: string, url: string) => void
}

export function PrincipleCard({ principle, imageUrl, onImageUploaded }: PrincipleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('id', principle.id)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url && onImageUploaded) {
        onImageUploaded(principle.id, data.url)
      }
    } catch {} finally {
      setUploading(false)
    }
  }, [principle.id, onImageUploaded])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }, [uploadFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleUploadClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }, [uploadFile])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        e.preventDefault()
        const file = items[i].getAsFile()
        if (file) uploadFile(file)
        break
      }
    }
  }, [uploadFile])

  return (
    <div
      style={{ position: 'relative', height: '100%' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onPaste={handlePaste}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsDragging(false) }}
      tabIndex={0}
    >
      <Link
        href={`/principles/${principle.id}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
      >
        <div
          style={{
            position: 'relative',
            background: 'var(--white)',
            border: isHovered || isDragging ? '1px solid var(--ink)' : 'var(--border)',
            padding: 'var(--space-6)',
            transition: 'var(--transition-base)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Background image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${imageUrl || `/images/principles/${principle.id}.png`})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.12,
              transition: 'var(--transition-base)',
            }}
          />

          {/* Card content — above background */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--earth)',
                textAlign: 'right',
              }}
            >
              #{principle.priority.toString().padStart(2, '0')}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--weight-regular)',
                lineHeight: 'var(--leading-snug)',
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              {principle.title}
            </h3>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-sans)',
                color: 'var(--earth)',
                lineHeight: 'var(--leading-normal)',
                margin: 0,
              }}
            >
              {principle.summary}
            </p>

            <div style={{ marginTop: 'auto' }}>
              <DimensionBadge dimension={principle.dimension} accentColor={principle.accentColor} principleId={principle.id} size="lg" />
            </div>

            {principle.tags && principle.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                {principle.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 'var(--text-xs)',
                      padding: 'var(--space-1) var(--space-2)',
                      border: '1px solid var(--fog)',
                      color: 'var(--earth)',
                      display: 'inline-block',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      </Link>

      {/* Upload button — appears on hover */}
      {isHovered && (
        <button
          onClick={handleUploadClick}
          style={{
            position: 'absolute',
            top: 'var(--space-2)',
            left: 'var(--space-2)',
            width: '28px',
            height: '28px',
            background: uploading ? 'var(--forest)' : 'var(--ink)',
            color: 'var(--white)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-bold)',
            zIndex: 10,
            transition: 'var(--transition-base)',
          }}
        >
          {uploading ? '...' : '+'}
        </button>
      )}

      {/* Drag overlay */}
      {isDragging && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(45, 74, 62, 0.08)',
            border: '2px dashed var(--forest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--forest)', fontWeight: 'var(--weight-bold)' }}>
            שחרר לשמירה
          </span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
