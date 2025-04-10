import React from 'react';
import Layout from '../../components/layout/Layout';
import MintTokens from '../../components/minter/MintTokens';

const MintTokensPage: React.FC = () => {
  return (
    <Layout>
      <MintTokens />
    </Layout>
  );
};

export default MintTokensPage;
