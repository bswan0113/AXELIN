// --- START OF FILE src/services/tagService.js ---

import { supabase } from 'lib/supabaseClient';

/**
 * 태그 서비스
 * 'tags' 테이블과 관련된 모든 데이터베이스 통신을 담당합니다.
 */

// --- READ ---

/**
 * 모든 태그 목록을 조회합니다.
 * @returns {Promise<Array>} 태그 객체의 배열
 */
export const getTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true }); // 이름순으로 정렬

  if (error) {
    console.error('태그 목록 조회 오류:', error);
    throw error;
  }

  return data;
};

/**
 * 특정 ID를 가진 태그 하나를 조회합니다.
 * @param {number|string} tagId - 조회할 태그의 ID
 * @returns {Promise<object|null>} 태그 객체 또는 null
 */
export const getTagById = async (tagId) => {
  if (!tagId) throw new Error('조회할 태그의 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('id', tagId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error(`ID(${tagId}) 태그 조회 오류:`, error);
    throw error;
  }

  return data;
};

/**
 * 특정 슬러그(slug)를 가진 태그 하나를 조회합니다.
 * URL을 통해 태그 페이지에 접근할 때 유용합니다.
 * @param {string} slug - 조회할 태그의 슬러그
 * @returns {Promise<object|null>} 태그 객체 또는 null
 */
export const getTagBySlug = async (slug) => {
  if (!slug) throw new Error('조회할 태그의 slug가 필요합니다.');

  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error(`Slug(${slug}) 태그 조회 오류:`, error);
    throw error;
  }

  return data;
};


// --- CREATE ---

/**
 * 새로운 태그를 생성합니다.
 * @param {object} tagData - 생성할 태그의 데이터
 * @param {string} tagData.name - 태그 이름 (필수)
 * @param {string} tagData.slug - URL 슬러그 (필수, unique)
 * @param {string} [tagData.description] - 설명
 * @returns {Promise<object>} 생성된 태그 객체
 */
export const createTag = async (tagData) => {
  if (!tagData || !tagData.name || !tagData.slug) {
    throw new Error('태그를 생성하려면 이름(name)과 슬러그(slug)는 필수입니다.');
  }

  const { data, error } = await supabase
    .from('tags')
    .insert([tagData])
    .select()
    .single();

  if (error) {
    console.error('태그 생성 오류:', error);
    throw error;
  }

  return data;
};


// --- UPDATE ---

/**
 * 기존 태그의 정보를 수정합니다.
 * @param {number|string} tagId - 수정할 태그의 ID
 * @param {object} updateData - 수정할 데이터
 * @returns {Promise<object>} 수정된 태그 객체
 */
export const updateTag = async (tagId, updateData) => {
  if (!tagId || !updateData) {
    throw new Error('태그를 수정하려면 ID와 수정할 데이터가 필요합니다.');
  }

  const { data, error } = await supabase
    .from('tags')
    .update(updateData)
    .eq('id', tagId)
    .select()
    .single();

  if (error) {
    console.error(`ID(${tagId}) 태그 수정 오류:`, error);
    throw error;
  }

  return data;
};


// --- DELETE ---

/**
 * 특정 ID를 가진 태그를 삭제합니다.
 * @param {number|string} tagId - 삭제할 태그의 ID
 * @returns {Promise<void>}
 */
export const deleteTag = async (tagId) => {
  if (!tagId) throw new Error('삭제할 태그의 ID가 필요합니다.');

  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('id', tagId);

  if (error) {
    console.error(`ID(${tagId}) 태그 삭제 오류:`, error);
    throw error;
  }

  console.log(`ID(${tagId}) 태그가 성공적으로 삭제되었습니다.`);
};

const tagService = {
  getTags,
  getTagById,
  getTagBySlug,
  createTag,
  updateTag,
  deleteTag,
};

export default tagService;
// --- END OF FILE src/services/tagService.js ---