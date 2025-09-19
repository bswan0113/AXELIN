// supabase/functions/delete-user/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts' // 이 부분을 위해 cors.ts 파일이 필요합니다.

serve(async (req) => {
  // CORS preflight 요청을 처리하는 부분입니다.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { user_id } = await req.json()
    if (!user_id) {
      throw new Error("삭제할 User ID가 제공되지 않았습니다.");
    }

    // 서비스 키를 사용하여 관리자 권한의 클라이언트를 생성합니다.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Auth에서 사용자 인증 정보를 삭제합니다.
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(user_id);

    if (authError) {
      throw new Error(`Supabase Auth 사용자 삭제 실패: ${authError.message}`);
    }

    return new Response(JSON.stringify({ message: `사용자 ${user_id} 삭제 완료` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})