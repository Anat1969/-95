import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'principles/' })
    const images: Record<string, string> = {}

    for (const blob of blobs) {
      const id = blob.pathname.replace('principles/', '').split('.')[0]
      images[id] = blob.url
    }

    return NextResponse.json(images)
  } catch {
    return NextResponse.json({})
  }
}
