// --- START OF FILE src/services/userInterestService.js ---

import { supabase } from 'lib/supabaseClient';

/**
 * 사용자 관심사 서비스
 * 'user_interests' 테이블과 관련된 모든 데이터베이스 통신을 담당합니다.
 */

/**
 * 특정 사용자의 모든 관심사(카테고리 ID 목록)를 조회합니다.
 * @param {string} userId - 조회할 사용자의 ID
 * @returns {Promise<Array<number>>} 카테고리 ID의 배열
 */
export const getUserInterests = async (userId) => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from('user_interests')
    .select('category_id')
    .eq('user_id', userId);

  if (error) {
    console.error('사용자 관심사 조회 오류:', error);
    throw error;
  }

  // [{ category_id: 1 }, { category_id: 5 }] -> [1, 5] 형태로 변환
  return data ? data.map(interest => interest.category_id) : [];
};

/**
 * 사용자의 관심사를 저장합니다. (기존 데이터를 모두 지우고 새로 추가하는 방식)
 * 이 방식은 사용자가 온보딩을 다시 하거나 프로필에서 관심사를 수정할 때 더 안정적입니다.
 * @param {string} userId - 사용자의 ID
 * @param {Array<number|string>} interestIds - 저장할 카테고리 ID의 배열
 * @returns {Promise<Array>} 새로 저장된 관심사 객체의 배열
 */
export const setUserInterests = async (userId, interestIds) => {
  if (!userId) throw new Error('사용자 ID가 필요합니다.');
  
  // 1. 기존의 모든 관심사를 삭제합니다.
  const { error: deleteError } = await supabase
    .from('user_interests')
    .delete()
    .eq('user_id', userId);

  if (deleteError) {
    console.error('기존 관심사 삭제 오류:', deleteError);
    throw deleteError;
  }

  // 2. 새로운 관심사가 있을 경우에만 추가합니다.
  if (interestIds && interestIds.length > 0) {
    const interestsToInsert = interestIds.map(id => ({
      user_id: userId,
      category_id: id,
    }));

    const { data, error: insertError } = await supabase
      .from('user_interests')
      .insert(interestsToInsert)
      .select();

    if (insertError) {
      console.error('새로운 관심사 저장 오류:', insertError);
      throw insertError;
    }
    
    console.log("[UserInterestService] 사용자 관심사가 성공적으로 저장되었습니다.");
    return data;
  }

  // 저장할 새로운 관심사가 없는 경우
  console.log("[UserInterestService] 기존 관심사 삭제 후 새로 저장할 관심사가 없습니다.");
  return [];
};

const userInterestService = {
  getUserInterests,
  setUserInterests,
};

export default userInterestService;
// --- END OF FILE src/services/userInterestService.js ---