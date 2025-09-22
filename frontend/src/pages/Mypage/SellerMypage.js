import React from 'react';
import MypageLayout from 'components/mypage/shared/MypageLayout';

// Seller-specific components
import SellerDashboardOverview from 'components/mypage/roles/seller/SellerDashboardOverview';
import ProductManagementTable from 'components/mypage/roles/seller/ProductManagementTable';
import SalesPerformanceChart from 'components/mypage/roles/seller/SalesPerformanceChart';
import RevenueAndSettlementRequest from 'components/mypage/roles/seller/RevenueAndSettlementRequest';
import CustomerInquiryManager from 'components/mypage/roles/seller/CustomerInquiryManager';
import ProductAnalyticsReport from 'components/mypage/roles/seller/ProductAnalyticsReport';

function SellerMypage() {
  return (
    <MypageLayout>
      <div>
        <h1>Seller My Page</h1>
        
          <SellerDashboardOverview />
          <ProductManagementTable />
          <SalesPerformanceChart />
          <RevenueAndSettlementRequest />
          <CustomerInquiryManager />
          <ProductAnalyticsReport />
       
      </div>
    </MypageLayout>
  );
}

export default SellerMypage;