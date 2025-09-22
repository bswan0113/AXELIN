import React, { useContext } from 'react';
import AuthContext from 'contexts/AuthContext';
import BuyerMypage from './BuyerMypage';
import SellerMypage from './SellerMypage';
import MasterMypage from './MasterMypage';
import AdminMypage from './AdminMypage';
import UnAuthorizedPage from 'pages/UnAuthorizedPage';

function Mypage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!user) {
    // Handle loading state or redirect to login
    return <div>Loading user data... or Please log in.</div>;
  }

  switch (user.role) {
    case 'BUYER':
      return <BuyerMypage />;
    case 'SELLER':
      return <SellerMypage />;
    case 'MASTER':
      return <MasterMypage />;
    case 'ADMIN':
      return <AdminMypage />;
    default:
      return <UnAuthorizedPage />
  }
}

export default Mypage;
