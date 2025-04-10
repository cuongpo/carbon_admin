import React, { useState } from 'react';
import { Info, Settings } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const MintTokens: React.FC = () => {
  const { showNotification } = useNotification();
  const [amount, setAmount] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmed(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirmed) {
      showNotification('error', 'You must confirm that you are locking equivalent carbon credits.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be replaced with actual blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate success
      showNotification('success', `Successfully minted ${amount} CCT tokens!`);
      
      // Reset form
      setAmount('');
      setConfirmed(false);
    } catch (err) {
      showNotification('error', 'Failed to mint tokens. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">Mint Carbon Credit Tokens</h2>
      
      <div className="kyber-stats-grid">
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Available to Mint</div>
          <div className="kyber-stat-value">10,000 CCT</div>
          <div className="kyber-stat-subtitle">Based on registry balance</div>
        </div>
        
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Total Minted</div>
          <div className="kyber-stat-value">5,230 CCT</div>
          <div className="kyber-stat-subtitle">All time</div>
        </div>
        
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Your Minted Balance</div>
          <div className="kyber-stat-value">1,000 CCT</div>
          <div className="kyber-stat-subtitle">Available for trading</div>
        </div>
      </div>
      
      <div className="kyber-card">
        <div className="kyber-card-header">
          <div>
            <div className="kyber-card-title">Mint Tokens</div>
            <div className="kyber-card-subtitle">Convert registry credits to CCT tokens</div>
          </div>
          <button className="swap-settings-btn" title="Settings">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="kyber-card-section">
          <div className="kyber-data-row">
            <div className="kyber-data-label">Registry Balance</div>
            <div className="kyber-data-value">10,000 Credits</div>
          </div>
          <div className="kyber-data-row">
            <div className="kyber-data-label">Conversion Rate</div>
            <div className="kyber-data-value">1 Credit = 1 CCT</div>
          </div>
          <div className="kyber-data-row">
            <div className="kyber-data-label">
              Minting Fee
              <span className="info-icon" title="Fee charged for minting new tokens">
                <Info size={14} />
              </span>
            </div>
            <div className="kyber-data-value">0.1%</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="kyber-input-container">
            <label className="kyber-input-label">Amount of CCT to Mint</label>
            <input
              type="number"
              placeholder="Enter amount to mint"
              value={amount}
              onChange={handleAmountChange}
              className="kyber-input"
              required
            />
          </div>
          
          <div className="kyber-checkbox-container">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={handleConfirmChange}
              className="kyber-checkbox"
              id="confirm-checkbox"
            />
            <label htmlFor="confirm-checkbox" className="kyber-checkbox-label">
              I confirm that I am locking equivalent carbon credits in the registry
            </label>
          </div>
          
          <button 
            type="submit" 
            className="kyber-btn kyber-btn-minting" 
            style={{ width: '100%' }}
            disabled={isLoading || !amount || !confirmed}
          >
            {isLoading ? 'Minting...' : 'Mint CCT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MintTokens;
