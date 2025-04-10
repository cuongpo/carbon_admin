import React, { useState } from 'react';
import { Info, Settings, HelpCircle } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const CreateToken: React.FC = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    decimals: '18',
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would be replaced with actual blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate success
      showNotification('success', `Token "${formData.name}" (${formData.symbol}) created successfully!`);
      
      // Reset form after successful creation
      setFormData({
        name: '',
        symbol: '',
        description: '',
        decimals: '18',
      });
    } catch (err) {
      showNotification('error', 'Failed to create token. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">Create Carbon Credit Token</h2>
      
      <div className="kyber-stats-grid">
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Total Tokens</div>
          <div className="kyber-stat-value">5</div>
          <div className="kyber-stat-subtitle">Active carbon credit tokens</div>
        </div>
        
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Total Supply</div>
          <div className="kyber-stat-value">25,000 CCT</div>
          <div className="kyber-stat-subtitle">Across all tokens</div>
        </div>
        
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Registry Connection</div>
          <div className="kyber-stat-value">
            <span className="badge badge-success">Active</span>
          </div>
          <div className="kyber-stat-subtitle">Last synced 5 minutes ago</div>
        </div>
      </div>
      
      <div className="kyber-card">
        <div className="kyber-card-header">
          <div>
            <div className="kyber-card-title">Create New Token</div>
            <div className="kyber-card-subtitle">Deploy a new carbon credit token to the blockchain</div>
          </div>
          <button className="swap-settings-btn" title="Settings">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="kyber-card-section">
          <div className="kyber-card-section-header">
            <div className="kyber-card-section-title">Token Information</div>
            <HelpCircle size={16} className="text-gray-400" />
          </div>
          
          <form onSubmit={handleSubmit} data-component-name="CreateToken">
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                Token Name
                <span className="info-icon" title="The full name of your carbon credit token">
                  <Info size={14} />
                </span>
              </label>
              <input
                id="name"
                placeholder="e.g., Carbon Credit Token"
                value={formData.name}
                onChange={handleInputChange}
                className="kyber-input"
                required
              />
            </div>
            
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                Symbol
                <span className="info-icon" title="The ticker symbol for your token (usually 3-5 characters)">
                  <Info size={14} />
                </span>
              </label>
              <input
                id="symbol"
                placeholder="e.g., CCT"
                value={formData.symbol}
                onChange={handleInputChange}
                className="kyber-input"
                required
              />
            </div>
            
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                Description
                <span className="info-icon" title="Describe the purpose and source of this carbon credit token">
                  <Info size={14} />
                </span>
              </label>
              <textarea
                id="description"
                placeholder="Describe the purpose and source of this carbon credit token"
                value={formData.description}
                onChange={handleTextAreaChange}
                className="kyber-input"
                rows={4}
                required
              />
            </div>
            
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                Decimals
                <span className="info-icon" title="The number of decimal places the token can be divided into. 18 is standard for ERC-20 tokens.">
                  <Info size={14} />
                </span>
              </label>
              <input
                id="decimals"
                type="number"
                placeholder="18"
                value={formData.decimals}
                onChange={handleInputChange}
                className="kyber-input"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="kyber-btn kyber-btn-primary" 
              style={{ width: '100%', marginTop: '1.5rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Token...' : 'Create Token'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateToken;
