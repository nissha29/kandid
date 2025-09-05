import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const GET = async (req: NextRequest) => {
  const response = await auth.api.getSession({
    headers: await req.headers,
  });
  return NextResponse.json(response);
};

export const POST = async (req: NextRequest) => {
  const response = await auth.api.getSession({
    headers: await req.headers,
  });
  return NextResponse.json(response);
};
