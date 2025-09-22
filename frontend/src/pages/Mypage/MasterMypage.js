import React from 'react';
import MypageLayout from 'components/mypage/shared/MypageLayout';

// Master-specific components
import MasterCuratedContentReview from 'components/mypage/roles/master/MasterCuratedContentReview';
import MentorshipProgramManager from 'components/mypage/roles/master/MentorshipProgramManager';
import PlatformContributionMetrics from 'components/mypage/roles/master/PlatformContributionMetrics';
import DelegatedAdminTasks from 'components/mypage/roles/master/DelegatedAdminTasks';

function MasterMypage() {
  return (
    <MypageLayout>
      <div>
        <h1>Master My Page</h1>
        
          <MasterCuratedContentReview />
          <MentorshipProgramManager />
          <PlatformContributionMetrics />
          <DelegatedAdminTasks />
       
      </div>
    </MypageLayout>
  );
}

export default MasterMypage;