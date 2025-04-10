import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import Table from '../common/Table';
import { Info, Settings } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

type RedemptionRecord = {
  id: string;
  date: string;
  amount: string;
  address: string;
  status: 'pending' | 'completed' | 'failed';
};

const RedeemTokens: React.FC = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    amount: '',
    address: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [redemptionHistory, setRedemptionHistory] = useState<RedemptionRecord[]>([
    {
      id: '1',
      date: '2025-04-05T11:30:00Z',
      amount: '500',
      address: '0x1234...5678',
      status: 'completed',
    },
    {
      id: '2',
      date: '2025-04-03T09:15:00Z',
      amount: '300',
      address: '0x1234...5678',
      status: 'completed',
    },
    {
      id: '3',
      date: '2025-04-09T14:45:00Z',
      amount: '750',
      address: '0x1234...5678',
      status: 'pending',
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      showNotification('error', 'Please enter a valid amount to redeem.');
      return;
    }
    
    if (!formData.address) {
      showNotification('error', 'Please enter a valid address to receive carbon credits.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be replaced with actual blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Add new redemption record
      const newRecord: RedemptionRecord = {
        id: (redemptionHistory.length + 1).toString(),
        date: new Date().toISOString(),
        amount: formData.amount,
        address: formData.address,
        status: 'pending',
      };
      
      setRedemptionHistory([newRecord, ...redemptionHistory]);
      
      // Simulate success
      showNotification('success', `Successfully initiated redemption of ${formData.amount} CCT tokens!`);
      
      // Reset form
      setFormData({
        amount: '',
        address: '',
      });
    } catch (err) {
      showNotification('error', 'Failed to redeem tokens. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusBadge = (status: RedemptionRecord['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="badge badge-success">
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="badge badge-warning">
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="badge badge-danger">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const columns = [
    { 
      header: 'ID', 
      accessor: (item: RedemptionRecord) => `#${item.id}` 
    },
    { 
      header: 'Date', 
      accessor: (item: RedemptionRecord) => formatDate(item.date) 
    },
    { 
      header: 'Amount', 
      accessor: (item: RedemptionRecord) => `${item.amount} CCT` 
    },
    { 
      header: 'Wallet Address', 
      accessor: (item: RedemptionRecord) => item.address,
      className: 'font-mono' 
    },
    { 
      header: 'Status', 
      accessor: (item: RedemptionRecord) => getStatusBadge(item.status),
      className: 'text-center' 
    },
  ];

  return (
    <div>
      <h2 className="page-title">Redeem Tokens</h2>
      
      <div className="kyber-card mb-6">
        <div className="kyber-card-header">
          <div>
            <div className="kyber-card-title">Redeem Carbon Credits</div>
            <div className="kyber-card-subtitle">Convert your tokens back to registry credits</div>
          </div>
          <button className="swap-settings-btn" title="Settings">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="redemption-box">
          <p>
            Redeem your Carbon Credit Tokens (CCT) for actual carbon credits in the registry.
            The carbon credits will be transferred to the specified address.
          </p>
          
          <div className="redemption-detail">
            <div className="redemption-label">
              Available Balance
              <span className="info-icon" title="Your current token balance available for redemption">
                <Info size={14} />
              </span>
            </div>
            <div className="redemption-value">1,000 CCT</div>
          </div>
          
          <div className="redemption-detail">
            <div className="redemption-label">
              Redemption Fee
              <span className="info-icon" title="Fee charged for redeeming tokens back to carbon credits">
                <Info size={14} />
              </span>
            </div>
            <div className="redemption-value">0.5%</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="kyber-card-section">
          <div className="kyber-input-container">
            <label className="kyber-input-label">Amount of CCT to Redeem</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount to redeem"
              value={formData.amount}
              onChange={handleInputChange}
              className="kyber-input"
              required
            />
          </div>
          
          <div className="kyber-input-container">
            <label className="kyber-input-label">Receive Carbon Credit Address</label>
            <input
              id="address"
              placeholder="0x..."
              value={formData.address}
              onChange={handleInputChange}
              className="kyber-input"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="kyber-btn kyber-btn-warning" 
            style={{ width: '100%', marginTop: '1.5rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Redeeming...' : 'Redeem CCT'}
          </button>
        </form>
      </div>
      
      <div className="kyber-card">
        <div className="kyber-card-header">
          <div className="kyber-card-title">Redemption History</div>
        </div>
        
        <Table
          columns={columns}
          data={redemptionHistory}
          keyExtractor={(item: RedemptionRecord) => item.id}
          emptyMessage="No redemption records found."
        />
      </div>
    </div>
  );
};

export default RedeemTokens;
