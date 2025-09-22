import React from 'react';
import MypageLayout from 'components/mypage/shared/MypageLayout';

// Buyer-specific components
import MyPurchasedAssetsList from 'components/mypage/roles/buyer/MyPurchasedAssetsList';
import WishlistManager from 'components/mypage/roles/buyer/WishlistManager';
import OrderHistoryTable from 'components/mypage/roles/buyer/OrderHistoryTable';
import SubscriptionManager from 'components/mypage/roles/buyer/SubscriptionManager';
import ReviewAndRatingManager from 'components/mypage/roles/buyer/ReviewAndRatingManager';

function BuyerMypage() {
  return (
    <MypageLayout>
      <div>
        <h1>Buyer My Page</h1>
        
          <MyPurchasedAssetsList />
          <WishlistManager />
          <OrderHistoryTable />
          <SubscriptionManager />
          <ReviewAndRatingManager />
       
      </div>
    </MypageLayout>
  );
}

export default BuyerMypage;