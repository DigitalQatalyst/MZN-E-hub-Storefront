import React from 'react';
import styled from 'styled-components';

// Mock data for the bar graph (replace with your actual data)
const barData = [50, 80, 70, 90, 60, 85, 75];

// Styled Components
const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #777;
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8px;
`;

// Define props interface for Change
interface ChangeProps {
  isPositive?: boolean;
  isNeutral?: boolean;
}

const Change = styled.div<ChangeProps>`
  font-size: 1rem;
  color: ${({ isPositive, isNeutral }) => {
    if (isPositive) {
      return '#14B339'; // Green for positive
    } else if (isNeutral) {
      return '#4E97FD'; // Blue for neutral
    } else {
      return '#e74c3c'; // Red for negative (or default)
    }
  }};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const GraphContainer = styled.div`
  width: 40%;
  align-self: center;
  display: flex;
  align-items: flex-end;
  height: 80px;
`;

const Bar = styled.div<{ heightPercentage: number }>`
  width: 8px;
  background-color: #3498db;
  margin: 0 3px;
  height: ${({ heightPercentage }) => `${heightPercentage}%`};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const TargetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TargetPercentage = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: black;
  position: absolute;
  top: 50%;
  left: -7rem;
  transform: translate(-50%, -50%);
`;

const TargetLabel = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-top: 5px;
  position: absolute;
  top: 60%;
  left: -7rem;
  transform: translate(-50%, -50%);
`;

const TransactionTypesContainer = styled.div`
  padding-top: 5rem;
`;

const TransactionType = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-left: -25rem;
`;

// Define props interface for ColorDot
interface ColorDotProps {
  color: string;
}

const ColorDot = styled.div<ColorDotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 8px;
`;

// Component
interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  isChangePositive?: boolean;
  isChangeNeutral?: boolean;
  graphImage?: string;
  isTargetCard?: boolean;
  targetPercentage?: string;
  transactionTypes?: { color: string; label: string }[];
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  isChangePositive,
  isChangeNeutral,
  graphImage,
  isTargetCard,
  targetPercentage,
  transactionTypes,
}) => {
  const renderBarGraph = () => (
    <GraphContainer>
      {barData.map((data, index) => (
        <Bar key={index} heightPercentage={data} />
      ))}
    </GraphContainer>
  );

  return (
    <CardContainer>
      <LeftContent>
        <Title>{title}</Title>
        <Value>{value}</Value>
        <Change isPositive={isChangePositive} isNeutral={isChangeNeutral}>
          {change}
        </Change>
      </LeftContent>
      {title === 'Weekly Sales' ? (
        renderBarGraph()
      ) : (
        graphImage && <img src={graphImage} alt={`${title} graph`} style={{ width: '40%', alignSelf: 'center' }} />
      )}
      {isTargetCard && (
        <TargetContainer>
          <TargetPercentage>{targetPercentage}</TargetPercentage>
          <TargetLabel>Target</TargetLabel>
        </TargetContainer>
      )}
      {transactionTypes && (
        <TransactionTypesContainer>
          {transactionTypes.map((type, index) => (
            <TransactionType key={index}>
              <ColorDot color={type.color} />
              <span>{type.label}</span>
            </TransactionType>
          ))}
        </TransactionTypesContainer>
      )}
    </CardContainer>
  );
};

// Main Component to Render all cards
const DashboardItems: React.FC = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      <DashboardCard
        title="Weekly Sales"
        value="60,000 AED"
        change="▲ 25.25%"
        isChangeNeutral={true}
      />
      <DashboardCard
        title="Service Utilization"
        value="39.56%"
        change="▲ 10.25%"
        isChangePositive={true}
        isTargetCard={true}
        targetPercentage="65%"
        graphImage="/assets/images/graphs/Group 2473.svg"
      />
      <DashboardCard
        title="Transaction Volume"
        value="86,600 AED"
        change="▼ 2.65%"
        isChangePositive={false}
        graphImage="/assets/images/graphs/Group 1344.svg"
      />
      <DashboardCard
        title="Transaction Types"
        value=""
        change=""
        transactionTypes={[
          { color: 'blue', label: 'Incoming' },
          { color: 'orange', label: 'Outgoing' },
          { color: 'gray', label: 'Grants' },
        ]}
        graphImage="/assets/images/graphs/Group 2454.svg"
      />
    </div>
  );
};

export default DashboardItems;