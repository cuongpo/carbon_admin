import React from 'react';
import Layout from '../../components/layout/Layout';
import WhitelistManagement from '../../components/admin/WhitelistManagement';

const WhitelistPage: React.FC = () => {
  return (
    <Layout>
      <WhitelistManagement />
    </Layout>
  );
};

export default WhitelistPage;
