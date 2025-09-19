// --- START OF FILE src/services/aiToolService.js ---

import { supabase } from 'lib/supabaseClient';

/**
 * AI 툴 서비스
 * 'ai_tools' 테이블과 관련된 모든 데이터베이스 통신을 담당합니다.
 */

// --- READ ---

/**
 * 모든 AI 툴 목록을 조회합니다.
 * @returns {Promise<Array>} AI 툴 객체의 배열
 */
export const getAiTools = async () => {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .order('created_at', { ascending: false }); // 최신순으로 정렬

  if (error) {
    console.error('AI 툴 목록 조회 오류:', error);
    throw error;
  }

  return data;
};

/**
 * 특정 ID를 가진 AI 툴 하나를 조회합니다.
 * @param {number|string} toolId - 조회할 AI 툴의 ID
 * @returns {Promise<object|null>} AI 툴 객체 또는 null
 */
export const getAiToolById = async (toolId) => {
  if (!toolId) throw new Error('조회할 AI 툴의 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('id', toolId)
    .single(); // 단일 객체를 반환, 없으면 null 반환

  if (error && error.code !== 'PGRST116') { // PGRST116: Row not found, which is not a critical error here
    console.error(`ID(${toolId}) AI 툴 조회 오류:`, error);
    throw error;
  }

  return data;
};


// --- CREATE ---

/**
 * 새로운 AI 툴을 생성합니다.
 * @param {object} toolData - 생성할 AI 툴의 데이터
 * @param {string} toolData.name - 툴 이름 (필수)
 * @param {string} [toolData.description] - 툴 설명
 * @param {string} [toolData.website_url] - 웹사이트 URL
 * @param {string} [toolData.logo_url] - 로고 이미지 URL
 * @returns {Promise<object>} 생성된 AI 툴 객체
 */
export const createAiTool = async (toolData) => {
  if (!toolData || !toolData.name) {
    throw new Error('AI 툴을 생성하려면 이름(name)은 필수입니다.');
  }

  const { data, error } = await supabase
    .from('ai_tools')
    .insert([toolData])
    .select()
    .single(); // 생성된 객체를 즉시 반환

  if (error) {
    console.error('AI 툴 생성 오류:', error);
    throw error;
  }

  return data;
};


// --- UPDATE ---

/**
 * 기존 AI 툴의 정보를 수정합니다.
 * @param {number|string} toolId - 수정할 AI 툴의 ID
 * @param {object} updateData - 수정할 데이터
 * @returns {Promise<object>} 수정된 AI 툴 객체
 */
export const updateAiTool = async (toolId, updateData) => {
  if (!toolId || !updateData) {
    throw new Error('AI 툴을 수정하려면 ID와 수정할 데이터가 필요합니다.');
  }

  const { data, error } = await supabase
    .from('ai_tools')
    .update(updateData)
    .eq('id', toolId)
    .select()
    .single(); // 수정된 객체를 즉시 반환

  if (error) {
    console.error(`ID(${toolId}) AI 툴 수정 오류:`, error);
    throw error;
  }

  return data;
};


// --- DELETE ---

/**
 * 특정 ID를 가진 AI 툴을 삭제합니다.
 * @param {number|string} toolId - 삭제할 AI 툴의 ID
 * @returns {Promise<void>}
 */
export const deleteAiTool = async (toolId) => {
  if (!toolId) throw new Error('삭제할 AI 툴의 ID가 필요합니다.');

  const { error } = await supabase
    .from('ai_tools')
    .delete()
    .eq('id', toolId);

  if (error) {
    console.error(`ID(${toolId}) AI 툴 삭제 오류:`, error);
    throw error;
  }

  console.log(`ID(${toolId}) AI 툴이 성공적으로 삭제되었습니다.`);
};

// 서비스 객체로 묶어서 내보내도 좋습니다.
const aiToolService = {
  getAiTools,
  getAiToolById,
  createAiTool,
  updateAiTool,
  deleteAiTool,
};

/**
 * 주어진 카테고리 ID 목록에 해당하는 AI 툴 목록을 조회합니다.
 * @param {Array<number>} categoryIds - 조회할 카테고리 ID의 배열
 * @returns {Promise<Array<object>>} AI 툴 객체의 배열
 */
export const fetchToolsByCategoryIds = async (categoryIds) => {
  try {
    // 1. (1순위) 사용자의 관심사와 일치하는 AI 툴을 먼저 조회합니다.
    let interestBasedTools = [];
    if (categoryIds && categoryIds.length > 0) {
      const { data: interestData, error: interestError } = await supabase
        .from('ai_tools')
        .select(`*, ai_tool_categories!inner(category_id)`)
        .in('ai_tool_categories.category_id', categoryIds);

      if (interestError) {
        console.error('관심사 기반 AI 툴 조회 오류:', interestError);
        throw interestError;
      }

      // 중복 제거 로직
      const uniqueTools = new Map();
      interestData.forEach(tool => {
        const { ai_tool_categories, ...restOfTool } = tool;
        if (!uniqueTools.has(restOfTool.id)) {
          uniqueTools.set(restOfTool.id, restOfTool);
        }
      });
      interestBasedTools = Array.from(uniqueTools.values());
    }

    // 2. 만약 관심사 기반 툴이 5개 이상이면, 그대로 반환합니다.
    // (관련성 높은 결과가 많으면 더 보여주는 것이 좋습니다.)
    if (interestBasedTools.length >= 5) {
      return interestBasedTools;
    }

    // 3. (2순위) 5개에 부족한 만큼 최신순으로 AI 툴을 추가로 조회합니다.
    const neededCount = 5 - interestBasedTools.length;
    const existingIds = interestBasedTools.map(tool => tool.id);

    // Supabase 쿼리를 만듭니다.
    let query = supabase.from('ai_tools').select('*');

    // 이미 가져온 툴은 제외합니다 (중복 방지).
    if (existingIds.length > 0) {
      query = query.not('id', 'in', `(${existingIds.join(',')})`);
    }

    // 최신순(등록순)으로 정렬하고, 부족한 개수만큼만 가져옵니다.
    const { data: fallbackData, error: fallbackError } = await query
      .order('created_at', { ascending: false })
      .limit(neededCount);

    if (fallbackError) {
      console.error('폴백 AI 툴 조회 오류:', fallbackError);
      throw fallbackError;
    }

    // 4. 1순위 결과와 2순위 결과를 합쳐서 최종 반환합니다.
    return [...interestBasedTools, ...fallbackData];

  } catch (error) {
    console.error('fetchToolsByCategoryIds 함수 전체 오류:', error);
    return []; // 에러 발생 시 항상 빈 배열을 반환하여 앱의 안정성을 높입니다.
  }
};

export default aiToolService;
// --- END OF FILE src/services/aiToolService.js ---