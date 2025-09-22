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
// --- [신규 추가] ID로 특정 상품 하나의 정보를 가져오는 함수 ---
/**
 * 주어진 ID에 해당하는 상품 하나의 상세 정보를 가져옵니다.
 * @param {string} productId - 조회할 상품의 UUID
 * @returns {Promise<Object|null>} - 상품 객체 또는 null
 */
export const fetchProductById = async (productId) => {
  /**
   * Supabase JOIN 문법 설명:
   * '*, seller:seller_id(nickname)' -> 이 부분은 Supabase가 자동으로 foreign key 관계를 추론하여 JOIN합니다.
   * 하지만 명시적으로 테이블을 지정해야 할 때가 있습니다.
   * '*, seller:users!seller_id(nickname)' -> 'products' 테이블의 'seller_id' 컬럼이 'users' 테이블의 primary key를 참조한다는 것을 명시합니다.
   * 'seller_id'가 users 테이블의 외래 키로 설정되어 있다면, 더 간단한 문법도 가능합니다.
   * 여기서는 가장 명확하고 안전한 방법을 사용합니다.
   */
  const { data, error } = await supabase
    .from('products')
    .select('*, seller:users(nickname)') // 'seller_id'를 통해 users 테이블의 nickname을 가져옵니다.
    .eq('id', productId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.warn(`Product with id ${productId} not found.`);
      return null;
    }
    console.error('Error fetching product by ID:', error.message);
    throw error;
  }
  
  // Supabase JOIN 결과는 배열로 반환될 수 있으므로, 단일 객체로 변환해줍니다.
  if (data && data.seller && Array.isArray(data.seller)) {
    data.seller = data.seller[0] || null;
  }
  
  return data;
};

/**
 * 특정 판매자(seller)가 등록한 모든 상품 목록을 조회합니다.
 * @param {string} sellerId - 판매자의 UUID
 * @returns {Promise<Array>} 해당 판매자의 상품 객체 배열
 */
export const getProductsBySellerId = async (sellerId) => {
  if (!sellerId) throw new Error('조회할 판매자의 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`판매자 ID(${sellerId})의 상품 조회 오류:`, error);
    throw error;
  }
  return data;
};
export default productService;