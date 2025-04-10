import React, { useState } from 'react';
import { Edit2, Trash2, Info, Settings, Search, Plus } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

type WhitelistedAddress = {
  id: string;
  address: string;
  amount: string;
};

const WhitelistManagement: React.FC = () => {
  const { showNotification } = useNotification();
  const [addresses, setAddresses] = useState<WhitelistedAddress[]>([
    { id: '1', address: '0x1234567890abcdef1234567890abcdef12345678', amount: '1000' },
    { id: '2', address: '0xabcdef1234567890abcdef1234567890abcdef12', amount: '500' },
  ]);
  
  const [formData, setFormData] = useState({
    address: '',
    amount: '',
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (editingId) {
        // Update existing address
        setAddresses(addresses.map(addr => 
          addr.id === editingId 
            ? { ...addr, address: formData.address, amount: formData.amount } 
            : addr
        ));
        showNotification('success', 'Address updated successfully!');
        setEditingId(null);
      } else {
        // Add new address
        const newAddress: WhitelistedAddress = {
          id: Date.now().toString(),
          address: formData.address,
          amount: formData.amount,
        };
        setAddresses([...addresses, newAddress]);
        showNotification('success', 'Address added to whitelist successfully!');
      }
      
      // Reset form
      setFormData({
        address: '',
        amount: '',
      });
    } catch (err) {
      showNotification('error', 'Failed to update whitelist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (address: WhitelistedAddress) => {
    setFormData({
      address: address.address,
      amount: address.amount,
    });
    setEditingId(address.id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with actual blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setAddresses(addresses.filter(addr => addr.id !== id));
      showNotification('success', 'Address removed from whitelist successfully!');
    } catch (err) {
      showNotification('error', 'Failed to remove address from whitelist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      address: '',
      amount: '',
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredAddresses = addresses.filter(addr => 
    addr.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    addr.amount.includes(searchTerm)
  );

  return (
    <div>
      <h2 className="page-title">Whitelist Management</h2>
      
      <div className="kyber-stats-grid">
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Total Whitelisted</div>
          <div className="kyber-stat-value">{addresses.length}</div>
          <div className="kyber-stat-subtitle">Addresses with minting rights</div>
        </div>
        
        <div className="kyber-stat-card">
          <div className="kyber-stat-title">Total Allocation</div>
          <div className="kyber-stat-value">
            {addresses.reduce((sum, addr) => sum + parseInt(addr.amount), 0).toLocaleString()} CCT
          </div>
          <div className="kyber-stat-subtitle">Tokens allocated to whitelist</div>
        </div>
      </div>
      
      <div className="kyber-card">
        <div className="kyber-card-header">
          <div>
            <div className="kyber-card-title">
              {editingId ? 'Edit Whitelisted Address' : 'Add New Address to Whitelist'}
            </div>
            <div className="kyber-card-subtitle">
              {editingId ? 'Update an existing whitelisted address' : 'Grant minting permissions to a new address'}
            </div>
          </div>
          <button className="swap-settings-btn" title="Settings">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="kyber-card-section">
          <form onSubmit={handleSubmit}>
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                Wallet Address
                <span className="info-icon" title="Ethereum address to be whitelisted for minting">
                  <Info size={14} />
                </span>
              </label>
              <input
                id="address"
                placeholder="0x..."
                value={formData.address}
                onChange={handleInputChange}
                className="kyber-input"
                required
              />
            </div>
            
            <div className="kyber-input-container">
              <label className="kyber-input-label">
                Token Amount
                <span className="info-icon" title="Maximum amount of tokens this address can mint">
                  <Info size={14} />
                </span>
              </label>
              <input
                id="amount"
                type="number"
                placeholder="1000"
                value={formData.amount}
                onChange={handleInputChange}
                className="kyber-input"
                required
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                type="submit" 
                className={`kyber-btn ${editingId ? 'kyber-btn-primary' : 'kyber-btn-minting'}`}
                disabled={isLoading}
              >
                {isLoading 
                  ? (editingId ? 'Updating...' : 'Adding...') 
                  : (editingId ? 'Update Address' : 'Add to Whitelist')}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  className="kyber-btn kyber-btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      <div className="kyber-card">
        <div className="kyber-card-header">
          <div className="kyber-card-title">Whitelisted Addresses</div>
          
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search addresses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="kyber-input pl-10 py-2"
              style={{ minWidth: '250px' }}
            />
          </div>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Wallet Address</th>
                <th>Token Amount</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAddresses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    <div className="py-8">
                      <div className="text-lg font-medium text-white mb-2">No addresses found</div>
                      <div className="text-sm text-gray-400 mb-4">Add a new address to the whitelist</div>
                      <button 
                        className="kyber-btn kyber-btn-secondary inline-flex items-center"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          });
                        }}
                      >
                        <Plus size={16} className="mr-2" />
                        Add Address
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAddresses.map(address => (
                  <tr key={address.id}>
                    <td>#{address.id}</td>
                    <td className="font-mono">{address.address}</td>
                    <td>{address.amount} CCT</td>
                    <td className="text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(address)}
                          className="swap-settings-btn"
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(address.id)}
                          className="swap-settings-btn"
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WhitelistManagement;
