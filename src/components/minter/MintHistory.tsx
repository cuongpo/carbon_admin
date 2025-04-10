import React, { useState, useEffect } from 'react';
import { Filter, Download, ChevronDown } from 'lucide-react';

type MintRecord = {
  id: string;
  date: string;
  amount: string;
  minter: string;
  status: 'pending' | 'completed' | 'failed';
};

const MintHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mintRecords, setMintRecords] = useState<MintRecord[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchMintHistory = async () => {
      try {
        // This would be replaced with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Mock data
        const mockData: MintRecord[] = [
          {
            id: '1',
            date: '2025-04-08T14:30:00Z',
            amount: '1000',
            minter: '0x1234...5678',
            status: 'completed',
          },
          {
            id: '2',
            date: '2025-04-07T10:15:00Z',
            amount: '500',
            minter: '0x1234...5678',
            status: 'completed',
          },
          {
            id: '3',
            date: '2025-04-06T09:45:00Z',
            amount: '750',
            minter: '0xabcd...ef12',
            status: 'completed',
          },
          {
            id: '4',
            date: '2025-04-05T16:20:00Z',
            amount: '300',
            minter: '0x1234...5678',
            status: 'failed',
          },
          {
            id: '5',
            date: '2025-04-10T08:05:00Z',
            amount: '1200',
            minter: '0x1234...5678',
            status: 'pending',
          },
        ];
        
        setMintRecords(mockData);
      } catch (error) {
        console.error('Failed to fetch mint history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMintHistory();
  }, []);

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

  const getStatusBadge = (status: MintRecord['status']) => {
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

  const filteredRecords = activeTab === 'all' 
    ? mintRecords 
    : mintRecords.filter(record => record.status === activeTab);

  return (
    <div>
      <h2 className="page-title">Mint History</h2>
      
      <div className="kyber-card">
        <div className="kyber-card-header">
          <div className="kyber-card-title">Minting Activity</div>
          
          <div className="flex items-center gap-3">
            <button className="kyber-btn kyber-btn-secondary" style={{ padding: '0.5rem 0.75rem' }}>
              <Filter size={16} className="mr-2" />
              Filter
              <ChevronDown size={16} className="ml-2" />
            </button>
            
            <button className="kyber-btn kyber-btn-secondary" style={{ padding: '0.5rem 0.75rem' }}>
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        <div className="kyber-tabs">
          <div 
            className={`kyber-tab ${activeTab === 'all' ? 'kyber-tab-active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </div>
          <div 
            className={`kyber-tab ${activeTab === 'completed' ? 'kyber-tab-active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </div>
          <div 
            className={`kyber-tab ${activeTab === 'pending' ? 'kyber-tab-active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </div>
          <div 
            className={`kyber-tab ${activeTab === 'failed' ? 'kyber-tab-active' : ''}`}
            onClick={() => setActiveTab('failed')}
          >
            Failed
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-pulse text-primary">Loading...</div>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-lg font-medium text-white mb-2">No records found</div>
            <div className="text-sm text-gray-400">Try changing your filter settings</div>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Minter</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>#{record.id}</td>
                    <td>{formatDate(record.date)}</td>
                    <td>{record.amount} CCT</td>
                    <td className="font-mono">{record.minter}</td>
                    <td>{getStatusBadge(record.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintHistory;
