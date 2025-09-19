import React, { createContext, useContext } from 'react';

// 1. 택배 회사를 설립합니다. (초기값은 null)
const AuthContext = createContext(null);

// 2. 다른 컴포넌트에서 쉽게 택배를 받을 수 있도록 커스텀 훅을 만들어 줍니다. (강력 추천)
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. 택배 회사를 다른 파일에서 쓸 수 있도록 export 합니다.
export default AuthContext;