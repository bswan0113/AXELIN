// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // 폰트를 전역으로 적용합니다.
  typography: {
    fontFamily: "'Pretendard', sans-serif",
  },
  // 새로운 색상 팔레트를 정의합니다.
  palette: {
    primary: {
      main: '#5E5CE6', // 세련된 보라색/파란색 계열
      light: '#918efa',
      dark: '#1d32b2',
    },
    secondary: {
      main: '#00C896', // 강조를 위한 민트색 계열
      light: '#62fcc7',
      dark: '#009668',
    },
    background: {
      default: '#F5F7FA', // 기본 배경색을 살짝 부드럽게
    },
  },
  // 컴포넌트 기본 스타일을 오버라이딩합니다.
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // 버튼의 기본 그림자를 제거하여 깔끔하게
          '&:hover': {
            boxShadow: 'none', // hover 시에도 그림자 없앰
          }
        }
      }
    }
  }
});

export default theme;