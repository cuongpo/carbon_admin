import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { ArrowDownUp, Info, Settings, Clock, ChevronDown } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

type Token = {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  icon?: string;
};

const SwapTokens: React.FC = () => {
  const { showNotification } = useNotification();
  const availableTokens: Token[] = [
    {
      id: 'cct',
      name: 'Carbon Credit Token',
      symbol: 'CCT',
      balance: '1000',
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      balance: '5.5',
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      balance: '2500',
    },
  ];

  const [fromToken, setFromToken] = useState<Token>(availableTokens[0]);
  const [toToken, setToToken] = useState<Token>(availableTokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isLoading, setIsLoading] = useState(false);

  // Mock exchange rate
  const exchangeRate = 0.02; // 1 CCT = 0.02 ETH

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    
    // Calculate to amount based on exchange rate
    if (value && !isNaN(parseFloat(value))) {
      const calculatedToAmount = (parseFloat(value) * exchangeRate).toString();
      setToAmount(calculatedToAmount);
    } else {
      setToAmount('');
    }
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToAmount(value);
    
    // Calculate from amount based on exchange rate
    if (value && !isNaN(parseFloat(value))) {
      const calculatedFromAmount = (parseFloat(value) / exchangeRate).toString();
      setFromAmount(calculatedFromAmount);
    } else {
      setFromAmount('');
    }
  };

  const handleFromTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedToken = availableTokens.find(token => token.id === e.target.value);
    if (selectedToken) {
      setFromToken(selectedToken);
      
      // Prevent selecting the same token for both sides
      if (selectedToken.id === toToken.id) {
        const otherToken = availableTokens.find(token => token.id !== selectedToken.id);
        if (otherToken) {
          setToToken(otherToken);
        }
      }
    }
  };

  const handleToTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedToken = availableTokens.find(token => token.id === e.target.value);
    if (selectedToken) {
      setToToken(selectedToken);
      
      // Prevent selecting the same token for both sides
      if (selectedToken.id === fromToken.id) {
        const otherToken = availableTokens.find(token => token.id !== selectedToken.id);
        if (otherToken) {
          setFromToken(otherToken);
        }
      }
    }
  };

  const handleSwapDirection = () => {
    // Swap tokens
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    // Swap amounts
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlippage(e.target.value);
  };

  const handleMaxAmount = () => {
    setFromAmount(fromToken.balance);
    const calculatedToAmount = (parseFloat(fromToken.balance) * exchangeRate).toString();
    setToAmount(calculatedToAmount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      showNotification('error', 'Please enter a valid amount to swap.');
      return;
    }
    
    if (parseFloat(fromAmount) > parseFloat(fromToken.balance)) {
      showNotification('error', `Insufficient ${fromToken.symbol} balance.`);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be replaced with actual blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate success
      showNotification('success', `Successfully swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}!`);
      
      // Reset form
      setFromAmount('');
      setToAmount('');
    } catch (err) {
      showNotification('error', 'Failed to complete swap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate minimum received amount considering slippage
  const minimumReceived = toAmount 
    ? (parseFloat(toAmount) * (1 - parseFloat(slippage) / 100)).toFixed(6)
    : '0';

  return (
    <div>
      <h2 className="page-title">Swap Tokens</h2>
      
      <div className="swap-container">
        <div className="swap-card">
          <div className="swap-header">
            <div className="swap-title">Swap</div>
            <div className="swap-settings">
              <button className="swap-settings-btn" title="Transaction History">
                <Clock size={18} />
              </button>
              <button className="swap-settings-btn" title="Settings">
                <Settings size={18} />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* From Token */}
            <div className="swap-box">
              <div className="swap-box-header">
                <div className="swap-box-label">You Pay</div>
                <div className="token-balance">
                  Balance: {fromToken.balance}
                  <button 
                    type="button" 
                    className="token-max-btn"
                    onClick={handleMaxAmount}
                  >
                    MAX
                  </button>
                </div>
              </div>
              
              <div className="swap-input-container">
                <input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={handleFromAmountChange}
                  className="swap-input"
                />
                
                <div className="token-selector">
                  <div className="token-icon"></div>
                  <div className="token-symbol">{fromToken.symbol}</div>
                  <ChevronDown size={16} className="token-chevron" />
                </div>
              </div>
            </div>
            
            {/* Swap Direction Button */}
            <div className="swap-direction-container">
              <button
                type="button"
                onClick={handleSwapDirection}
                className="swap-direction-btn"
              >
                <ArrowDownUp size={16} />
              </button>
            </div>
            
            {/* To Token */}
            <div className="swap-box">
              <div className="swap-box-header">
                <div className="swap-box-label">You Receive</div>
                <div className="token-balance">
                  Balance: {toToken.balance}
                </div>
              </div>
              
              <div className="swap-input-container">
                <input
                  type="number"
                  placeholder="0.0"
                  value={toAmount}
                  onChange={handleToAmountChange}
                  className="swap-input"
                />
                
                <div className="token-selector">
                  <div className="token-icon"></div>
                  <div className="token-symbol">{toToken.symbol}</div>
                  <ChevronDown size={16} className="token-chevron" />
                </div>
              </div>
            </div>
            
            {/* Swap Details */}
            <div className="swap-details">
              <div className="swap-detail-row">
                <div className="swap-detail-label">Rate</div>
                <div className="swap-detail-value">
                  1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}
                </div>
              </div>
              
              <div className="swap-detail-row">
                <div className="swap-detail-label">
                  Minimum Received
                  <span className="info-icon" title="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.">
                    <Info size={14} />
                  </span>
                </div>
                <div className="swap-detail-value">
                  {minimumReceived} {toToken.symbol}
                </div>
              </div>
              
              <div className="swap-detail-row">
                <div className="swap-detail-label">
                  Slippage Tolerance
                  <span className="info-icon" title="Your transaction will revert if the price changes unfavorably by more than this percentage.">
                    <Info size={14} />
                  </span>
                </div>
                <div className="swap-detail-value">
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={slippage}
                    onChange={handleSlippageChange}
                    className="slider-input mr-2"
                  />
                  <span>{slippage}%</span>
                </div>
              </div>
            </div>
            
            {/* Swap Button */}
            <button 
              type="submit" 
              className="swap-btn" 
              disabled={isLoading || !fromAmount || !toAmount}
            >
              {isLoading ? 'Swapping...' : 'Swap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SwapTokens;
