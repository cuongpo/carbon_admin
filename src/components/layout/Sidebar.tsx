import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Settings, 
  PlusCircle, 
  Users, 
  CreditCard, 
  History, 
  BarChart3, 
  RefreshCw, 
  LogOut, 
  Wallet,
  Leaf,
  Home
} from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-item ${isActive ? 'active' : ''}`
      }
    >
      <span className="nav-item-icon">{icon}</span>
      {label}
    </NavLink>
  );
};

type NavGroupProps = {
  title: string;
  children: React.ReactNode;
};

const NavGroup: React.FC<NavGroupProps> = ({ title, children }) => {
  return (
    <div className="nav-group">
      <h3 className="nav-group-title">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { account, isConnected, connect, disconnect } = useWallet();
  
  // Format the wallet address for display
  const displayAddress = account 
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : 'Not connected';
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Leaf size={24} color="#31CB9E" />
        <h1 className="sidebar-title">Carbon Admin</h1>
      </div>
      
      <div className="sidebar-content">
        <NavItem
          to="/"
          icon={<Home size={18} />}
          label="Home"
        />
        
        <NavGroup title="Admin">
          <NavItem
            to="/admin/endpoint"
            icon={<Settings size={18} />}
            label="Registry Endpoint"
          />
          <NavItem
            to="/admin/create-token"
            icon={<PlusCircle size={18} />}
            label="Create Token"
          />
          <NavItem
            to="/admin/whitelist"
            icon={<Users size={18} />}
            label="Whitelist Management"
          />
        </NavGroup>
        
        <NavGroup title="Minter">
          <NavItem
            to="/minter/mint"
            icon={<CreditCard size={18} />}
            label="Mint Tokens"
          />
          <NavItem
            to="/minter/history"
            icon={<History size={18} />}
            label="Mint History"
          />
        </NavGroup>
        
        <NavGroup title="Trader">
          <NavItem
            to="/trader/swap"
            icon={<RefreshCw size={18} />}
            label="Swap Tokens"
          />
          <NavItem
            to="/trader/redeem"
            icon={<BarChart3 size={18} />}
            label="Redeem Tokens"
          />
        </NavGroup>
      </div>
      
      <div className="sidebar-footer">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wallet size={18} className="mr-2" color="#31CB9E" />
            <span className="text-sm truncate" title={account || ''}>
              {displayAddress}
            </span>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-sidebar-hover"
            onClick={isConnected ? disconnect : connect}
            title={isConnected ? "Disconnect wallet" : "Connect wallet"}
          >
            <LogOut size={18} color="#A6AFCA" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
