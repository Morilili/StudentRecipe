import React from 'react';

const InfoCard = ({ info }) => {
  return (
    <div className="card">
      <h2>{info.name}</h2>
      <h4>{info.value}</h4>
    </div>
  );
};

export default InfoCard;