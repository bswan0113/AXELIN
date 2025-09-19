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

export default productService;