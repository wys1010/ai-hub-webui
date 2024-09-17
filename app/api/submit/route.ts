import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth/next';

import authOptions from '../auth/[...nextauth]/options';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function POST(req: NextRequest) {
  try {
    // 获取用户会话
    console.log('authOptions', authOptions);
    const session = await getServerSession(authOptions);
    console.log('session', session);

    // 检查用户是否已登录
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized. Please login with Google.' }, { status: 401 });
    }

    // 检查是否是 Google 登录
    if (!session.user.email?.endsWith('@gmail.com')) {
      return NextResponse.json({ error: 'Only Google login is allowed.' }, { status: 403 });
    }

    // 解析请求体
    const { name, url } = await req.json();

    // 检查必要的字段
    if (!name || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 200 });
    }

    // 检查 URL 是否已存在
    const { data: existingEntry, error: existingEntryError } = await supabase
      .from('submit')
      .select()
      .eq('url', url)
      .maybeSingle();

    if (existingEntryError) {
      return NextResponse.json({ error: 'submit failed' }, { status: 500 });
    }

    if (existingEntry) {
      return NextResponse.json({ error: 'URL already exists' }, { status: 409 });
    }

    // 插入新数据
    const { error: insertError } = await supabase.from('submit').insert({
      name,
      url,
      email: session.user.email,
    });

    if (insertError) {
      console.error('Error inserting new entry:', insertError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
