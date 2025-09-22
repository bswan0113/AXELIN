import { supabase } from '../lib/supabaseClient';

/**
 * 주문 관련 서비스
 * 'orders' 테이블 및 'order_items' 테이블과 관련된 데이터베이스 통신을 담당합니다.
 */

const TABLE_NAME = 'orders';
const ITEMS_TABLE_NAME = 'order_items';

/**
 * 새로운 주문을 생성합니다.
 * @param {object} orderData - 생성할 주문 데이터 (예: { user_id, total_amount, status, ... })
 * @returns {Promise<object|null>} 생성된 주문 객체 또는 null
 */
export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([orderData])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 ID의 주문을 조회합니다.
 * @param {string} orderId - 조회할 주문의 ID
 * @returns {Promise<object|null>} 조회된 주문 객체 또는 null
 */
export const getOrder = async (orderId) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', orderId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116: No rows found
    console.error('Error fetching order:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 ID의 주문을 업데이트합니다.
 * @param {string} orderId - 업데이트할 주문의 ID
 * @param {object} updates - 업데이트할 필드와 값
 * @returns {Promise<object|null>} 업데이트된 주문 객체 또는 null
 */
export const updateOrder = async (orderId, updates) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 ID의 주문을 삭제합니다.
 * @param {string} orderId - 삭제할 주문의 ID
 * @returns {Promise<void>} 
 */
export const deleteOrder = async (orderId) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', orderId);

  if (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

/**
 * 특정 사용자의 모든 주문 목록을 가져옵니다.
 * @param {string} userId - 주문 목록을 가져올 사용자의 ID
 * @returns {Promise<Array<object>>} 사용자의 주문 목록 배열
 */
export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('buyer_id', userId) // Assuming 'orders' table has a 'buyer_id' column
    .order('created_at', { ascending: false }); // Assuming 'orders' table has a 'created_at' column

  if (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
  return data;
};

/**
 * 특정 주문의 모든 아이템 목록을 가져옵니다.
 * @param {string} orderId - 아이템 목록을 가져올 주문의 ID
 * @returns {Promise<Array<object>>} 주문 아이템 목록 배열
 */
export const getOrderItems = async (orderId) => {
  const { data, error } = await supabase
    .from(ITEMS_TABLE_NAME)
    .select('*')
    .eq('order_id', orderId);

  if (error) {
    console.error('Error fetching order items:', error);
    throw error;
  }
  return data;
};

const orderService = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getOrderItems,
};

export default orderService;
