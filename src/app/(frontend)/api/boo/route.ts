import { STATUS_CODES } from '@/app/constants'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest) {
  return NextResponse.json({ message: 'boo' }, { status: STATUS_CODES.OK })
}
