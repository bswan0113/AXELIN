import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Card, CardContent, CardMedia, Grid, Avatar, Link } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Placeholder data
const placeholderAssets = [
  { id: 1, title: '블로그 글쓰기 AI 템플릿', description: 'SEO 최적화 블로그 글을 30분만에 작성하세요.', image: '', price: '10,000원' },
  { id: 2, title: '마케팅 이메일 자동화 봇', description: '고객에게 개인화된 이메일을 자동으로 발송합니다.', image: '', price: '15,000원' },
  { id: 3, title: '소셜 미디어 콘텐츠 생성기', description: '다양한 플랫폼에 맞는 소셜 미디어 콘텐츠를 만듭니다.', image: '', price: '12,000원' },
  { id: 4, title: '광고 문구 자동 생성 AI', description: '클릭률 높은 광고 문구를 빠르게 생성합니다.', image: '', price: '8,000원' },
];

const placeholderTools = [
  { id: 1, name: '뤼튼', description: 'AI 글쓰기 도우미', logo: '', link: 'https://wrtn.ai/' },
  { id: 2, name: 'Notion AI', description: '노션 내 AI 기능', logo: '', link: 'https://www.notion.so/product/ai' },
  { id: 3, name: 'Vrew', description: 'AI 기반 영상 편집', logo: '', link: 'https://vrew.com/' },
];

const placeholderCreators = [
  { id: 1, name: '김블로그', specialty: '블로그 콘텐츠 전문가', avatar: '' },
  { id: 2, name: '박마케터', specialty: '디지털 마케팅 전략가', avatar: '' },
];

const placeholderContents = [
  { id: 1, title: 'SEO에 최적화된 블로그 글, AI로 30분 만에 완성하는 법', summary: 'AI를 활용하여 검색 엔진에 잘 노출되는 블로그 글을 효율적으로 작성하는 노하우를 공개합니다.', link: '#' },
  { id: 2, title: '마케팅 자동화, 우리 회사에 어떻게 적용할까?', summary: '마케팅 자동화 툴 도입부터 실제 캠페인 운영까지, 성공적인 전략을 위한 가이드.', link: '#' },
  { id: 3, title: 'AI 시대, 콘텐츠 크리에이터의 새로운 역할', summary: 'AI 기술 발전이 콘텐츠 창작 환경에 미치는 영향과 크리에이터의 미래 전략.', link: '#' },
];

const gradientColor = 'linear-gradient(to right, #FF6B8F, #B46BFF, #6B8FFF)';

const SearchInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    backgroundColor: '#ffffff',
    padding: '5px 20px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease-in-out',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    fontSize: '1.1rem',
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
  width: 'min(700px, 90%)',
  [theme.breakpoints.down('md')]: {
    width: '95%',
  },
}));

function MainContent() {
  const navigate = useNavigate();
  // Placeholder states for user login and preferences
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume logged in for demonstration
  const [userName, setUserName] = useState('홍길동'); // Placeholder user name
  const [userCategory, setUserCategory] = useState('콘텐츠 & 마케팅 자동화'); // Placeholder user category

  const getHeadline = () => {
    if (isLoggedIn && userName && userCategory) {
      return (
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#333' }}>
          <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userName}</Box>님을 위한 오늘의 AI 워크플로우
        </Typography>
      );
    } else if (isLoggedIn && userCategory) {
      return (
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#333' }}>
          <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userCategory}</Box> 전문가를 위한 AI 추천
        </Typography>
      );
    }
    return (
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#333' }}>
        당신의 문제를 해결할 AI를 찾아보세요
      </Typography>
    );
  };

  const getHeadlineDescription = () => {
    if (isLoggedIn && (userName || userCategory)) {
      return (
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#666', mb: 4 }}>
          AXELIN이 당신의 생산성을 극대화할 AI 솔루션을 제안합니다.
        </Typography>
      );
    }
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', color: '#666', mb: 4 }}>
        다양한 AI 에셋과 툴을 탐색하고, 당신의 비즈니스에 맞는 최적의 솔루션을 찾아보세요.
      </Typography>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, py: 4, bgcolor: '#f9f9f9' }}>
      <Container maxWidth="lg">
        {/* PART 1: Above the Fold */}
        <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {getHeadline()}
          {getHeadlineDescription()}
          <SearchInput
            placeholder="어떤 도움이 필요하세요? (예: 블로그 글쓰기, 이미지 생성)"
            variant="outlined"
          />
        </Box>

        {isLoggedIn && userCategory && (
          <Box sx={{ mt: 8 }}>
            {/* 맞춤형 추천 에셋 */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
              <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {userName ? `${userName}님` : userCategory}
              </Box>을 위한 추천 에셋
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
              AXELIN이 제안하는 당신의 목표 달성을 위한 최적의 AI 에셋을 만나보세요.
            </Typography>
            <Grid container spacing={3}>
              {placeholderAssets.map((asset) => (
                <Grid item xs={12} sm={6} md={3} key={asset.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 15px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={asset.image}
                      alt={asset.title}
                      sx={{ borderRadius: '12px 12px 0 0' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {asset.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {asset.description}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#555' }}>
                        {asset.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* 맞춤형 툴 추천 */}
            <Box sx={{ mt: 8 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
                <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {userName ? `${userName}님` : userCategory}
                </Box>께 유용한 AI 툴 디렉토리
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
                관심 분야({userCategory})에 최적화된 외부 AI 툴들을 한눈에 확인하세요.
              </Typography>
              <Grid container spacing={3}>
                {placeholderTools.map((tool) => (
                  <Grid item xs={12} sm={6} md={4} key={tool.id}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: '0px 4px 15px rgba(0,0,0,0.03)', borderRadius: '12px' }}>
                      <Avatar src={tool.logo} alt={tool.name} sx={{ width: 48, height: 48, mr: 2 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{tool.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{tool.description}</Typography>
                        <Link href={tool.link} target="_blank" rel="noopener" variant="body2" sx={{ mt: 0.5, display: 'block' }}>
                          자세히 보기
                        </Link>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* 관련 분야 인기 에셋 & 창작자 */}
            <Box sx={{ mt: 8 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
                지금, <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userCategory}</Box> 분야에서 인기 있는 에셋
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#444' }}>인기 에셋 Top 5</Typography>
                  <Box>
                    {placeholderAssets.slice(0, 5).map((asset, index) => (
                      <Box key={asset.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1.5, bgcolor: '#fff', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0,0,0,0.03)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2, color: '#B46BFF' }}>{index + 1}.</Typography>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#333' }}>{asset.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{asset.description}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#444' }}>이 분야를 이끄는 창작자들</Typography>
                  <Grid container spacing={2}>
                    {placeholderCreators.map((creator) => (
                      <Grid item xs={12} sm={6} key={creator.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, boxShadow: '0px 4px 15px rgba(0,0,0,0.05)', borderRadius: '12px', height: '100%' }}>
                          <Avatar src={creator.avatar} alt={creator.name} sx={{ width: 80, height: 80, mb: 2 }} />
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{creator.name}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{creator.specialty}</Typography>
                          <Button variant="outlined" size="small" sx={{ borderRadius: '20px', borderColor: '#B46BFF', color: '#B46BFF', '&:hover': { bgcolor: '#B46BFF10' } }}>
                            프로필 보기
                          </Button>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            {/* 심화 학습 콘텐츠 제안 */}
            <Box sx={{ mt: 8 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
                <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  관심 분야
                </Box> 심화 학습 콘텐츠
              </Typography>
              <Grid container spacing={3}>
                {placeholderContents.map((content) => (
                  <Grid item xs={12} sm={6} md={4} key={content.id}>
                    <Card sx={{ height: '100%', boxShadow: '0px 4px 15px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                          {content.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {content.summary}
                        </Typography>
                        <Link href={content.link} target="_blank" rel="noopener" sx={{ fontWeight: 'medium', color: '#6B8FFF' }}>
                          자세히 보기
                        </Link>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}

        {/* 전체 탐색 옵션 */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Link onClick={() => navigate('/explore')} sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#B46BFF', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            전체 카테고리 둘러보기
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default MainContent;
