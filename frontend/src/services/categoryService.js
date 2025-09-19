// --- START OF FILE src/services/categoryService.js ---

import { supabase } from 'lib/supabaseClient';

/**
 * 카테고리 서비스
 * 'categories' 테이블과 관련된 모든 데이터베이스 통신을 담당합니다.
 */

// --- READ ---

/**
 * 모든 카테고리 목록을 플랫(flat)한 배열로 조회합니다.
 * @returns {Promise<Array>} 카테고리 객체의 배열
 */
export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('모든 카테고리 조회 오류:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 ID를 가진 카테고리 하나를 조회합니다.
 * @param {number|string} categoryId - 조회할 카테고리의 ID
 * @returns {Promise<object|null>} 카테고리 객체 또는 null
 */
export const getCategoryById = async (categoryId) => {
  if (!categoryId) throw new Error('조회할 카테고리의 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error(`ID(${categoryId}) 카테고리 조회 오류:`, error);
    throw error;
  }
  return data;
};

/**
 * 모든 메인 카테고리(최상위 카테고리) 목록을 조회합니다.
 * parent_id가 null인 카테고리들입니다.
 * @returns {Promise<Array>} 메인 카테고리 객체의 배열
 */
export const getMainCategories = async () => {
  console.log('getMainCategories 호출됨');
  console.log('getMainCategories 내부의 supabase 객체:', supabase);
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .order('name', { ascending: true });

  if (error) {
    console.error('메인 카테고리 조회 오류:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 부모 카테고리에 속한 모든 서브 카테고리 목록을 조회합니다.
 * @param {number|string} parentId - 부모 카테고리의 ID
 * @returns {Promise<Array>} 서브 카테고리 객체의 배열
 */
export const getSubCategories = async (parentId) => {
  if (!parentId) throw new Error('서브 카테고리를 조회할 부모 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('parent_id', parentId)
    .order('name', { ascending: true });
    
  if (error) {
    console.error(`ID(${parentId})의 서브 카테고리 조회 오류:`, error);
    throw error;
  }
  return data;
};

/**
 * [고급] 모든 메인 카테고리와 그에 속한 서브 카테고리들을 함께 조회합니다. (중첩 구조)
 * 한 번의 API 호출로 전체 카테고리 구조를 가져올 수 있어 효율적입니다.
 * @returns {Promise<Array>} 중첩된 카테고리 구조를 가진 객체 배열
 */
export const getCategoriesWithSubCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*, sub_categories:categories(*)') // 'categories' 테이블을 다시 참조하여 sub_categories로 별칭 부여
      .is('parent_id', null) // 최상위 카테고리만 선택
      .order('name', { ascending: true });

    if (error) {
        console.error('중첩 카테고리 조회 오류:', error);
        throw error;
    }
    return data;
};


// --- CREATE ---

/**
 * 새로운 카테고리를 생성합니다.
 * @param {object} categoryData - 생성할 카테고리 데이터
 * @param {string} categoryData.name - 카테고리 이름 (필수)
 * @param {number} [categoryData.parent_id] - 부모 카테고리 ID (서브 카테고리일 경우)
 * @param {string} [categoryData.description] - 설명
 * @param {string} [categoryData.slug] - URL 슬러그
 * @returns {Promise<object>} 생성된 카테고리 객체
 */
export const createCategory = async (categoryData) => {
  if (!categoryData || !categoryData.name) {
    throw new Error('카테고리를 생성하려면 이름(name)은 필수입니다.');
  }

  const { data, error } = await supabase
    .from('categories')
    .insert([categoryData])
    .select()
    .single();

  if (error) {
    console.error('카테고리 생성 오류:', error);
    throw error;
  }
  return data;
};


// --- UPDATE ---

/**
 * 기존 카테고리 정보를 수정합니다.
 * @param {number|string} categoryId - 수정할 카테고리의 ID
 * @param {object} updateData - 수정할 데이터
 * @returns {Promise<object>} 수정된 카테고리 객체
 */
export const updateCategory = async (categoryId, updateData) => {
  if (!categoryId || !updateData) {
    throw new Error('카테고리를 수정하려면 ID와 수정할 데이터가 필요합니다.');
  }

  const { data, error } = await supabase
    .from('categories')
    .update(updateData)
    .eq('id', categoryId)
    .select()
    .single();

  if (error) {
    console.error(`ID(${categoryId}) 카테고리 수정 오류:`, error);
    throw error;
  }
  return data;
};


// --- DELETE ---

/**
 * 특정 ID를 가진 카테고리를 삭제합니다.
 * DB 스키마에 'on delete CASCADE'가 설정되어 있으므로,
 * 부모 카테고리를 삭제하면 해당 부모를 참조하는 모든 자식 카테고리도 함께 삭제됩니다.
 * @param {number|string} categoryId - 삭제할 카테고리의 ID
 * @returns {Promise<void>}
 */
export const deleteCategory = async (categoryId) => {
  if (!categoryId) throw new Error('삭제할 카테고리의 ID가 필요합니다.');

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) {
    console.error(`ID(${categoryId}) 카테고리 삭제 오류:`, error);
    throw error;
  }
  console.log(`ID(${categoryId}) 카테고리가 성공적으로 삭제되었습니다.`);
};

const categoryService = {
  getAllCategories,
  getCategoryById,
  getMainCategories,
  getSubCategories,
  getCategoriesWithSubCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
// --- END OF FILE src/services/categoryService.js ---