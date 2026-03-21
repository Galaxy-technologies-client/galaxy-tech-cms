import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic' // Ensure it's never cached statically

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Perform a tiny query to keep the Supabase connection active
    await payload.find({
      collection: 'users',
      limit: 1,
    })

    return NextResponse.json({ status: 'active', message: 'Keepalive successful' })
  } catch (_error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to reach database' },
      { status: 500 },
    )
  }
}
