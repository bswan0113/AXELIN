// --- START OF FILE src/contexts/AuthContext.js ---

import { createContext } from 'react';

/**
 * 전역 인증 상태를 제공하는 React Context입니다.
 * Provider를 통해 user 객체를 하위 컴포넌트로 전달합니다.
 */
const AuthContext = createContext(null);

export default AuthContext;

// --- END OF FILE src/contexts/AuthContext.js ---