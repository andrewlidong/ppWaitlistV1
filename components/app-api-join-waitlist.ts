'use client'

import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Add email to the waitlist set
    await kv.sadd('waitlist', email)

    return NextResponse.json({ message: 'Successfully joined the waitlist' }, { status: 200 })
  } catch (error) {
    console.error('Error joining waitlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}