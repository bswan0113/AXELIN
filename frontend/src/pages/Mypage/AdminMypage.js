import React from 'react';
import MypageLayout from 'components/mypage/shared/MypageLayout';

// Admin-specific components
import AdminDashboardOverview from 'components/mypage/roles/admin/AdminDashboardOverview';
import UserManagementTable from 'components/mypage/roles/admin/UserManagementTable';
import ProductApprovalQueue from 'components/mypage/roles/admin/ProductApprovalQueue';
import SettlementProcessingModule from 'components/mypage/roles/admin/SettlementProcessingModule';
import ContentManagementSystem from 'components/mypage/roles/admin/ContentManagementSystem';
import PlatformAnalyticsAndReports from 'components/mypage/roles/admin/PlatformAnalyticsAndReports';
import SystemConfigurationSettings from 'components/mypage/roles/admin/SystemConfigurationSettings';

function AdminMypage() {
  return (
    <MypageLayout>
      <div>
        <h1>Admin My Page</h1>
        
          <AdminDashboardOverview />
          <UserManagementTable />
          <ProductApprovalQueue />
          <SettlementProcessingModule />
          <ContentManagementSystem />
          <PlatformAnalyticsAndReports />
          <SystemConfigurationSettings />
       
      </div>
    </MypageLayout>
  );
}

export default AdminMypage;