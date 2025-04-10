import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { 
  Settings, 
  PlusCircle, 
  Users, 
  CreditCard, 
  History, 
  RefreshCw, 
  BarChart3 
} from 'lucide-react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  to: string;
  buttonText: string;
  buttonVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'minting' | 'secondary' | 'outline';
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  iconBgColor,
  to, 
  buttonText, 
  buttonVariant = 'primary' 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="feature-card">
      <div className="feature-card-icon" style={{ backgroundColor: iconBgColor }}>
        {icon}
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
      <Button 
        variant={buttonVariant} 
        onClick={() => navigate(to)}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div>
        <h2 className="page-title">Carbon Credit Tokenization Dashboard</h2>
        
        <div className="kyber-card mb-6">
          <div className="kyber-card-header">
            <div className="kyber-card-title">Welcome to the Dashboard</div>
          </div>
          <div className="kyber-card-section">
            <p className="welcome-text mb-4">
              Welcome to the Carbon Credit Tokenization Dashboard. This platform allows you to create, manage, mint, 
              trade, and redeem tokenized carbon credits on the blockchain.
            </p>
            <p className="welcome-text">
              Use the sidebar navigation to access different sections of the dashboard or select one of the quick actions below.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Admin Actions</h3>
          <div className="grid-container">
            <FeatureCard
              title="Registry Endpoint"
              description="Configure the connection to the carbon credit registry"
              icon={<Settings size={24} color="white" />}
              iconBgColor="var(--color-primary)"
              to="/admin/endpoint"
              buttonText="Configure Endpoint"
              buttonVariant="primary"
            />
            <FeatureCard
              title="Create Token"
              description="Create a new carbon credit token on the blockchain"
              icon={<PlusCircle size={24} color="white" />}
              iconBgColor="var(--color-success)"
              to="/admin/create-token"
              buttonText="Create New Token"
              buttonVariant="success"
            />
            <FeatureCard
              title="Whitelist Management"
              description="Manage addresses allowed to mint tokens"
              icon={<Users size={24} color="white" />}
              iconBgColor="var(--color-info)"
              to="/admin/whitelist"
              buttonText="Manage Whitelist"
              buttonVariant="outline"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Minter Actions</h3>
          <div className="grid-container">
            <FeatureCard
              title="Mint Tokens"
              description="Mint new carbon credit tokens against verified carbon credits"
              icon={<CreditCard size={24} color="white" />}
              iconBgColor="var(--color-minting)"
              to="/minter/mint"
              buttonText="Mint Tokens"
              buttonVariant="minting"
            />
            <FeatureCard
              title="Mint History"
              description="View history of all minting operations"
              icon={<History size={24} color="white" />}
              iconBgColor="var(--color-neutral-600)"
              to="/minter/history"
              buttonText="View History"
              buttonVariant="secondary"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Trader Actions</h3>
          <div className="grid-container">
            <FeatureCard
              title="Swap Tokens"
              description="Swap carbon credit tokens for other cryptocurrencies"
              icon={<RefreshCw size={24} color="white" />}
              iconBgColor="var(--color-primary-dark)"
              to="/trader/swap"
              buttonText="Swap Tokens"
              buttonVariant="primary"
            />
            <FeatureCard
              title="Redeem Tokens"
              description="Redeem carbon credit tokens for the underlying carbon credits"
              icon={<BarChart3 size={24} color="white" />}
              iconBgColor="var(--color-warning)"
              to="/trader/redeem"
              buttonText="Redeem Tokens"
              buttonVariant="warning"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
