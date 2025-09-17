import { createClient } from '@supabase/supabase-js'

// 하드코딩된 값 대신 process.env 객체에서 값을 불러옵니다.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// 만약 값이 없다면 에러를 발생시켜 실수를 방지합니다.
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Anon Key must be defined in the .env file");
}

export const supabase = createClient(supabaseUrl, supabaseKey)