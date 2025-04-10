import React from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`content-card ${className}`}>
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
