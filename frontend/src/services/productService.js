// 파일: src/services/productService.js

import { supabase } from 'lib/supabaseClient';

export const fetchProductsByCategoryIds = async (categoryIds) => {
  if (!categoryIds || categoryIds.length === 0) {
    return [];
  }
  try {
    // [수정] 호출하는 RPC 함수 이름을 새로 만든 것으로 변경합니다.
    const { data, error } = await supabase.rpc('get_products_with_seller_by_category_ids', {
      p_category_ids: categoryIds,
    });
    // ... (이하 동일)
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('카테고리별 상품 조회 오류:', error);
    return [];
  }
};

const productService = {
  fetchProductsByCategoryIds,
};

// --- [신규 추가 또는 수정] 최신 에셋을 가져오는 함수 ---
/**
 * 전체 에셋 중 가장 최신에 등록된 순서대로 가져옵니다.
 * (비로그인/온보딩 미완료 사용자를 위한 폴백 함수)
 * @param {number} limit - 가져올 에셋의 최대 개수
 * @returns {Promise<Array>} - 에셋 목록
 */
export const fetchPopularProducts = async (limit = 10) => {
  // 'created_at' 컬럼을 기준으로 내림차순(descending) 정렬하여 최신 항목이 위로 오게 합니다.
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false }) // 최신순 정렬
    .limit(limit);

  if (error) {
    console.error('Error fetching latest products:', error.message);
    throw error;
  }

  return data || [];
};

export default productService;