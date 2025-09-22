// --- START OF FILE src/services/userService.js (Refactored for nickname) ---

import { supabase } from 'lib/supabaseClient';

/**
 * 사용자 프로필 서비스
 * 'users' 테이블과 관련된 데이터베이스 통신을 담당합니다.
 */

/**
 * Ensures a user profile exists in the public 'users' table.
 * This function should sync data provided by the auth provider (email, name, avatar).
 * It intentionally does NOT touch user-set fields like 'nickname' to prevent overwrites.
 * @param {object} session - The user's Supabase session object.
 */
export const syncUserProfile = async (session) => {
  console.log("[UserService] 'users' 테이블과 프로필 동기화를 시도합니다.");
  // [설명] nickname은 사용자가 직접 설정하는 값이므로, 이 동기화 로직에서는 건드리지 않습니다.
  // 그래야 사용자가 설정한 닉네임이 로그인 시 덮어씌워지는 것을 방지할 수 있습니다.
  const { error } = await supabase.from('users').upsert({
    id: session.user.id,
    email: session.user.email,
    name: session.user.user_metadata?.full_name,
    provider: session.user.app_metadata?.provider,
    avatar_url: session.user.user_metadata?.avatar_url
  }, { onConflict: 'id' });

  if (error) {
    console.error('Supabase 프로필 동기화 오류:', error);
    throw error;
  }
  console.log("[UserService] 사용자 프로필이 성공적으로 동기화되었습니다.");
};

/**
 * Fetches a user's profile from the 'users' table (without interests).
 * Includes the new 'nickname' field with a sensible fallback.
 * @param {object} session - The user's Supabase session object.
 * @returns {Promise<object|null>} The user profile object or null if not found.
 */
export const fetchUserProfile = async (session) => {
  try {
    const { data: profile, error } = await supabase
      .from('users')
      // [수정] select 쿼리에 'nickname'을 추가합니다.
      .select(`id, name, email, avatar_url, nickname, role`)
      .eq('id', session.user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase 프로필 조회 오류:', error);
      throw error;
    }
    
    // 공통으로 사용할 기본 프로필 정보 객체를 만듭니다.
    const baseProfile = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata?.full_name || '사용자',
      avatar_url: session.user.user_metadata?.avatar_url,
      role : 'BUYER', // 기본값 설정 (나중에 DB에서 덮어씌워질 예정)
    };

    if (profile) {
      const transformedProfile = {
        id: profile.id,
        email: profile.email,
        name: profile.name || baseProfile.name, // DB에 이름이 없으면 세션 정보 사용
        avatar_url: profile.avatar_url,
        // [추가] nickname 필드를 추가합니다. DB에 값이 없으면(NULL) 기본값을 사용합니다.
        nickname: profile.nickname || profile.name || '익명의 사용자',
        role: profile.role, // <-- Add this line
      };
      console.log('Fetched user profile from UserService:', transformedProfile);
      return transformedProfile;
    }
    
    console.log("Supabase 'users' 테이블에 프로필이 없어 세션 정보로 대체합니다.");
    // DB에 프로필이 없을 경우, 세션 정보를 기반으로 기본 닉네임을 설정해줍니다.
    return {
      ...baseProfile,
      nickname: baseProfile.name || '익명의 사용자',
    };

  } catch (error) {
    console.error('프로필 조회 중 예상치 못한 오류 발생:', error);
    // 예외 발생 시에도 기본 프로필 구조를 반환하여 앱이 멈추지 않도록 합니다.
    const fallbackProfile = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name || '사용자',
        avatar_url: session.user.user_metadata?.avatar_url,
    };
    return {
        ...fallbackProfile,
        nickname: fallbackProfile.name || '익명의 사용자',
    };
  }
};

/**
 * [추천] 사용자가 직접 프로필(닉네임 등)을 업데이트하는 함수입니다.
 * 프로필 수정 페이지에서 이 함수를 호출하여 사용합니다.
 * @param {string} userId - The ID of the user to update.
 * @param {object} updates - An object with the fields to update, e.g., { nickname: '새로운닉네임' }.
 * @returns {Promise<object>} The updated profile data.
 */
export const updateUserProfile = async (userId, updates) => {
  if (!userId || !updates) {
    throw new Error('User ID와 업데이트할 정보가 필요합니다.');
  }

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Supabase 프로필 업데이트 오류:', error);
    throw error;
  }
  
  console.log('[UserService] 사용자 프로필이 성공적으로 업데이트되었습니다:', data);
  return data;
};


const userService = {
  syncUserProfile,
  fetchUserProfile,
  updateUserProfile, // [추가] export 목록에 추가
};

export default userService;
// --- END OF FILE src/services/userService.js (Refactored for nickname) ---