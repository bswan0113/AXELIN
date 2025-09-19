// --- START OF FILE src/services/productService.js ---

import { supabase } from 'lib/supabaseClient';

/**
 * Product 서비스
 * 'products' 테이블과 관련된 모든 데이터베이스 통신을 담당합니다.
 */

// --- READ ---

/**
 * 모든 상품 목록을 조회합니다.
 * 최신 상품 순으로 정렬됩니다.
 * @returns {Promise<Array>} 상품 객체의 배열
 */
export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('모든 상품 조회 오류:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 ID를 가진 상품 하나를 조회합니다.
 * @param {string} productId - 조회할 상품의 UUID
 * @returns {Promise<object|null>} 상품 객체 또는 null
 */
export const getProductById = async (productId) => {
  if (!productId) throw new Error('조회할 상품의 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116: 결과가 0개일 때의 에러 코드
    console.error(`ID(${productId}) 상품 조회 오류:`, error);
    throw error;
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

/**
 * 특정 상태(status)의 모든 상품 목록을 조회합니다. (예: 'published', 'draft')
 * @param {string} status - 조회할 상품의 상태 ('draft', 'published', 'archived' 등)
 * @returns {Promise<Array>} 해당 상태의 상품 객체 배열
 */
export const getProductsByStatus = async (status) => {
    if (!status) throw new Error('조회할 상품의 상태(status)가 필요합니다.');

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`상태(${status}) 상품 조회 오류:`, error);
      throw error;
    }
    return data;
};


// --- CREATE ---

/**
 * 새로운 상품을 생성합니다.
 * @param {object} productData - 생성할 상품 데이터
 * @param {string} productData.seller_id - 판매자 UUID (필수)
 * @param {string} productData.title - 상품 제목 (필수)
 * @param {number} productData.price - 가격 (필수)
 * @param {string} productData.type - 상품 타입 (필수, 'product_type' ENUM)
 * @param {object} productData.content - 상품 상세 내용 (JSONB, 필수)
 * @param {number} [productData.target_tool_id] - 연관된 AI 도구 ID
 * @param {string} [productData.description] - 짧은 설명
 * @param {string} [productData.status] - 상품 상태 (기본값: 'draft')
 * @returns {Promise<object>} 생성된 상품 객체
 */
export const createProduct = async (productData) => {
  if (!productData || !productData.seller_id || !productData.title || productData.price == null || !productData.type || !productData.content) {
    throw new Error('상품을 생성하려면 seller_id, title, price, type, content는 필수입니다.');
  }

  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    console.error('상품 생성 오류:', error);
    throw error;
  }
  return data;
};


// --- UPDATE ---

/**
 * 기존 상품 정보를 수정합니다.
 * `updated_at` 필드는 데이터베이스에서 자동으로 갱신됩니다.
 * @param {string} productId - 수정할 상품의 UUID
 * @param {object} updateData - 수정할 데이터
 * @returns {Promise<object>} 수정된 상품 객체
 */
export const updateProduct = async (productId, updateData) => {
  if (!productId || !updateData) {
    throw new Error('상품을 수정하려면 ID와 수정할 데이터가 필요합니다.');
  }

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    console.error(`ID(${productId}) 상품 수정 오류:`, error);
    throw error;
  }
  return data;
};


// --- DELETE ---

/**
 * 특정 ID를 가진 상품을 삭제합니다.
 * @param {string} productId - 삭제할 상품의 UUID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) => {
  if (!productId) throw new Error('삭제할 상품의 ID가 필요합니다.');

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error(`ID(${productId}) 상품 삭제 오류:`, error);
    throw error;
  }
  console.log(`ID(${productId}) 상품이 성공적으로 삭제되었습니다.`);
};

const productService = {
  getAllProducts,
  getProductById,
  getProductsBySellerId,
  getProductsByStatus,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;

// --- END OF FILE src/services/productService.js ---