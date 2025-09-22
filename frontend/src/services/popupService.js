import { supabase } from '../lib/supabaseClient';

/**
 * 팝업 관련 서비스
 * 'popups' 테이블과 관련된 데이터베이스 통신을 담당합니다.
 */

const TABLE_NAME = 'popups';

/**
 * 새로운 팝업을 생성합니다.
 * @param {object} popupData - 생성할 팝업 데이터
 * @returns {Promise<object|null>} 생성된 팝업 객체 또는 null
 */
export const createPopup = async (popupData) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([popupData])
    .select()
    .single();

  if (error) {
    console.error('Error creating popup:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 ID의 팝업을 조회합니다.
 * @param {string} popupId - 조회할 팝업의 ID
 * @returns {Promise<object|null>} 조회된 팝업 객체 또는 null
 */
export const getPopup = async (popupId) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', popupId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116: No rows found
    console.error('Error fetching popup:', error);
    throw error;
  }
  return data;
};

/**
 * 모든 팝업 목록을 가져옵니다.
 * @returns {Promise<Array<object>>} 모든 팝업 목록 배열
 */
export const getAllPopups = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all popups:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 ID의 팝업을 업데이트합니다.
 * @param {string} popupId - 업데이트할 팝업의 ID
 * @param {object} updates - 업데이트할 필드와 값
 * @returns {Promise<object|null>} 업데이트된 팝업 객체 또는 null
 */
export const updatePopup = async (popupId, updates) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', popupId)
    .select()
    .single();

  if (error) {
    console.error('Error updating popup:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 ID의 팝업을 삭제합니다.
 * @param {string} popupId - 삭제할 팝업의 ID
 * @returns {Promise<void>} 
 */
export const deletePopup = async (popupId) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', popupId);

  if (error) {
    console.error('Error deleting popup:', error);
    throw error;
  }
};

/**
 * 현재 활성화되어 있고, 특정 페이지 경로에 해당하는 팝업 목록을 가져옵니다.
 * @param {string} [currentPagePath] - 현재 페이지 경로 (선택 사항). 이 경로에 target_page가 일치하는 팝업을 필터링합니다.
 * @returns {Promise<Array<object>>} 활성화된 팝업 목록 배열
 */
export const getActivePopups = async (currentPagePath = null) => {
  let query = supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('is_active', true)
    .lte('start_date', new Date().toISOString())
    .or('end_date.is.null,end_date.gte.' + new Date().toISOString());

  if (currentPagePath) {
    // target_page가 null이거나 현재 페이지 경로와 일치하는 팝업을 찾습니다.
    // 부분 일치 또는 와일드카드 패턴을 처리하려면 더 복잡한 로직이 필요할 수 있습니다.
    query = query.or(`target_page.is.null,target_page.eq.${currentPagePath}`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active popups:', error);
    throw error;
  }
  return data;
};

const popupService = {
  createPopup,
  getPopup,
  getAllPopups,
  updatePopup,
  deletePopup,
  getActivePopups,
};

export default popupService;
