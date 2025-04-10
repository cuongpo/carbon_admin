import React, { useState } from 'react';
import { Info, Settings, RefreshCw, Database, Key, User, Link2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const RegistryEndpoint: React.FC = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    endpoint: '',
    apiKey: '',
    accountId: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'untested' | 'success' | 'failed'>('untested');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Reset connection status when form is changed
    setConnectionStatus('untested');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate success
      showNotification('success', 'Registry endpoint configuration saved successfully!');
    } catch (err) {
      showNotification('error', 'Failed to save registry endpoint configuration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    setTestingConnection(true);
    
    try {
      // This would be replaced with actual API call to test connection
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate success
      setConnectionStatus('success');
      showNotification('success', 'Successfully connected to the registry!');
    } catch (err) {
      setConnectionStatus('failed');
      showNotification('error', 'Failed to connect to the registry. Please check your configuration.');
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">Registry Endpoint Configuration</h2>
      
      <div className="kyber-stats-grid">
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Connection Status</div>
          <div className="kyber-stat-value">
            {connectionStatus === 'untested' && (
              <span className="badge badge-warning">Not Tested</span>
            )}
            {connectionStatus === 'success' && (
              <span className="badge badge-success">Connected</span>
            )}
            {connectionStatus === 'failed' && (
              <span className="badge badge-danger">Failed</span>
            )}
          </div>
          <div className="kyber-stat-subtitle">Last tested: {connectionStatus !== 'untested' ? 'Just now' : 'Never'}</div>
        </div>
        
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Registry Type</div>
          <div className="kyber-stat-value">Carbon Credit Registry</div>
          <div className="kyber-stat-subtitle">Verified carbon standard</div>
        </div>
        
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">API Version</div>
          <div className="kyber-stat-value">v2.0</div>
          <div className="kyber-stat-subtitle">Latest supported version</div>
        </div>
      </div>
      
      <div className="kyber-card">
        <div className="kyber-card-header">
          <div>
            <div className="kyber-card-title">Registry Connection</div>
            <div className="kyber-card-subtitle">Configure the connection to your carbon credit registry</div>
          </div>
          <button className="swap-settings-btn" title="Settings">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="kyber-card-section">
          <form onSubmit={handleSubmit}>
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                <div className="flex items-center">
                  <Database size={16} className="mr-2" />
                  Registry API Endpoint
                  <span className="info-icon" title="The URL of the carbon credit registry API">
                    <Info size={14} />
                  </span>
                </div>
              </label>
              <div className="relative">
                <Link2 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="endpoint"
                  placeholder="https://api.registry.example.com"
                  value={formData.endpoint}
                  onChange={handleChange}
                  className="kyber-input pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                <div className="flex items-center">
                  <Key size={16} className="mr-2" />
                  API Key
                  <span className="info-icon" title="Your API key for authentication with the registry">
                    <Info size={14} />
                  </span>
                </div>
              </label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="apiKey"
                  type="password"
                  placeholder="Your API key"
                  value={formData.apiKey}
                  onChange={handleChange}
                  className="kyber-input pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  Registry Account ID
                  <span className="info-icon" title="Your account ID in the carbon credit registry">
                    <Info size={14} />
                  </span>
                </div>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="accountId"
                  placeholder="Your account ID"
                  value={formData.accountId}
                  onChange={handleChange}
                  className="kyber-input pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                type="submit" 
                className="kyber-btn kyber-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Configuration'}
              </button>
              
              <button 
                type="button" 
                className="kyber-btn kyber-btn-secondary"
                onClick={testConnection}
                disabled={testingConnection || !formData.endpoint || !formData.apiKey || !formData.accountId}
              >
                <RefreshCw size={16} className={`mr-2 ${testingConnection ? 'animate-spin' : ''}`} />
                {testingConnection ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="kyber-card">
        <div className="kyber-card-header">
          <div className="kyber-card-title">Connection Status</div>
        </div>
        
        <div className="kyber-card-section">
          {connectionStatus === 'untested' && (
            <div className="flex items-center justify-center py-8 flex-col">
              <AlertTriangle size={48} className="text-yellow-400 mb-4" />
              <div className="text-lg font-medium text-white mb-2">Connection Not Tested</div>
              <div className="text-sm text-gray-400 mb-4 text-center max-w-md">
                Please fill in all the required fields and test the connection to ensure your registry is properly configured.
              </div>
              <button 
                className="kyber-btn kyber-btn-secondary"
                onClick={testConnection}
                disabled={testingConnection || !formData.endpoint || !formData.apiKey || !formData.accountId}
              >
                <RefreshCw size={16} className={`mr-2 ${testingConnection ? 'animate-spin' : ''}`} />
                {testingConnection ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
          )}
          
          {connectionStatus === 'success' && (
            <div className="flex items-center justify-center py-8 flex-col">
              <CheckCircle size={48} className="text-green-400 mb-4" />
              <div className="text-lg font-medium text-white mb-2">Connection Successful</div>
              <div className="text-sm text-gray-400 mb-4 text-center max-w-md">
                Your registry connection has been successfully established. You can now proceed with token creation and minting operations.
              </div>
              <div className="kyber-data-row w-full max-w-md">
                <div className="kyber-data-label">Endpoint</div>
                <div className="kyber-data-value">{formData.endpoint}</div>
              </div>
              <div className="kyber-data-row w-full max-w-md">
                <div className="kyber-data-label">Account ID</div>
                <div className="kyber-data-value">{formData.accountId}</div>
              </div>
              <div className="kyber-data-row w-full max-w-md">
                <div className="kyber-data-label">API Version</div>
                <div className="kyber-data-value">v2.0</div>
              </div>
            </div>
          )}
          
          {connectionStatus === 'failed' && (
            <div className="flex items-center justify-center py-8 flex-col">
              <AlertTriangle size={48} className="text-red-400 mb-4" />
              <div className="text-lg font-medium text-white mb-2">Connection Failed</div>
              <div className="text-sm text-gray-400 mb-4 text-center max-w-md">
                Unable to establish a connection to the registry. Please check your configuration details and try again.
              </div>
              <button 
                className="kyber-btn kyber-btn-secondary"
                onClick={testConnection}
                disabled={testingConnection}
              >
                <RefreshCw size={16} className={`mr-2 ${testingConnection ? 'animate-spin' : ''}`} />
                {testingConnection ? 'Testing...' : 'Try Again'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistryEndpoint;
