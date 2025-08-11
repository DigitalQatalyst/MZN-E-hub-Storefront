'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, CheckCircle, X } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';
import Container from '@component/Container';
import Card from '@component/Card';
import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import Typography from '@component/Typography';

interface ApplicationProgressProps {
  // Props are now optional since we'll get data from URL params and API
}

interface ProgressStep {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
}

// Styled Components using Bonik patterns
const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #0030E3;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 24px;
  transition: color 0.2s ease;

  &:hover {
    color: #0025b8;
  }

  svg {
    margin-right: 8px;
  }
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 12px 24px;
  background-color: ${({ isActive }) => isActive ? '#E6EFFF' : 'transparent'};
  color: ${({ isActive }) => isActive ? '#0030E3' : '#6b7280'};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isActive }) => isActive ? '#E6EFFF' : '#f3f4f6'};
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const ProgressStep = styled.div<{ status: 'completed' | 'current' | 'pending' }>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StepNumber = styled.div<{ status: 'completed' | 'current' | 'pending' }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  margin-right: 12px;
  color: ${({ status }) => {
    switch (status) {
      case 'completed': return '#7367F0';
      case 'current': return '#7367F0';
      case 'pending': return '#9ca3af';
      default: return '#9ca3af';
    }
  }};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StepIcon = styled.div<{ status: 'completed' | 'current' | 'pending' }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  border: 2px solid;
  
  border-color: ${({ status }) => {
    switch (status) {
      case 'completed': return '#7367F0';
      case 'current': return '#7367F0';
      case 'pending': return '#e5e7eb';
      default: return '#e5e7eb';
    }
  }};
  
  background-color: ${({ status }) => {
    switch (status) {
      case 'completed': return '#7367F0';
      case 'current': return 'white';
      case 'pending': return 'white';
      default: return 'white';
    }
  }};
  
  color: ${({ status }) => {
    switch (status) {
      case 'completed': return 'white';
      case 'current': return '#7367F0';
      case 'pending': return '#9ca3af';
      default: return '#9ca3af';
    }
  }};
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled.div<{ status: 'completed' | 'current' | 'pending' }>`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ status }) => {
    switch (status) {
      case 'completed': return '#111827';
      case 'current': return '#111827';
      case 'pending': return '#9ca3af';
      default: return '#9ca3af';
    }
  }};
`;

const ConnectorLine = styled.div<{ isCompleted: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ isCompleted }) => isCompleted ? '#7367F0' : '#e5e7eb'};
  margin: 0 24px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

const DetailValue = styled.span<{ color?: string }>`
  font-size: 14px;
  color: ${({ color }) => color || '#111827'};
  font-weight: 500;
`;

const StatusBadge = styled.span`
  color: #FF9F43;
  background-color: #FF9F4329;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
`;

const SuccessMessage = styled(Card)`
  background-color: #28C76F29;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  padding: 16px;
  margin-top: 32px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #28C76F;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(40, 199, 111, 0.1);
  }
`;

const ApplicationProgressPage: React.FC<ApplicationProgressProps> = () => {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<'progress' | 'chat'>('progress');
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Mock application data - in real app, this would come from props or API
  const applicationData = {
    title: 'Request for Funding Application',
    status: 'Under Review',
    lastUpdate: '20-04-2025',
    slaIndicator: '3 days until target close'
  };

  const progressSteps: ProgressStep[] = [
    { id: 1, title: 'Application Submitted', status: 'completed' },
    { id: 2, title: 'Under Review', status: 'current' },
    { id: 3, title: 'Funding Application Approved', status: 'pending' }
  ];

  const handleBack = () => {
    // Navigate back to the non-financial-records page
    router.push('/non-financial-records');
  };

  return (
    <Box p={isMobile ? '16px' : '24px'} minHeight="100vh">
      <Container maxWidth="1200px">
        {/* Back Button */}
        <BackButton onClick={handleBack}>
          <ChevronLeft size={20} />
          Back to Financial Records
        </BackButton>

        {/* Tab Navigation */}
        <FlexBox mb="0">
          <TabButton
            isActive={activeTab === 'progress'}
            onClick={() => setActiveTab('progress')}
          >
            Your Application Progress
          </TabButton>
          <TabButton
            isActive={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
          >
            In-Service Chat
          </TabButton>
        </FlexBox>

        {/* Main Content Card */}
        <Card border="1px solid #e5e7eb" borderRadius="8px" p="32px" bg="white" mt="32px">
          {/* Application Title */}
          <Typography
            fontSize={isMobile ? '18px' : '22px'}
            fontWeight="600"
            color="#6b7280"
            mb="32px"
          >
            {applicationData.title}
          </Typography>

          {/* Progress Indicator */}
          <ProgressContainer>
            {progressSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <ProgressStep status={step.status}>
                  <StepNumber status={step.status}>
                    {String(step.id).padStart(2, '0')}
                  </StepNumber>
                  <StepIcon status={step.status}>
                    {step.status === 'completed' && (
                      <Check size={14} />
                    )}
                  </StepIcon>
                  <StepContent>
                    <StepTitle status={step.status}>{step.title}</StepTitle>
                  </StepContent>
                </ProgressStep>
                
                {/* Connector line between steps */}
                {index < progressSteps.length - 1 && (
                  <ConnectorLine isCompleted={step.status === 'completed'} />
                )}
              </React.Fragment>
            ))}
          </ProgressContainer>

          {/* Tracking Details */}
          <Box mt="48px">
            <Typography
              fontSize="14px"
              fontWeight="600"
              color="#6b7280"
              mb="16px"
              textTransform="uppercase"
              letterSpacing="0.05em"
            >
              Tracking Details
            </Typography>
            
            <Box>
              <DetailRow>
                <DetailLabel>Status</DetailLabel>
                <StatusBadge>{applicationData.status}</StatusBadge>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Last update</DetailLabel>
                <DetailValue>{applicationData.lastUpdate}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>SLA Indicator</DetailLabel>
                <DetailValue>{applicationData.slaIndicator}</DetailValue>
              </DetailRow>
            </Box>
          </Box>
        </Card>

        {/* Success Message */}
        {showSuccessMessage && (
          <Card border="1px solid #e5e7eb" borderRadius="8px" p="32px" bg="white" mt="32px">
            <Typography
              fontSize={isMobile ? '18px' : '20px'}
              fontWeight="600"
              color="#6b7280"
              mb="16px"
            >
              Application Submitted Successfully
            </Typography>
            
            <SuccessMessage>
              <CloseButton onClick={() => setShowSuccessMessage(false)}>
                <X size={16} />
              </CloseButton>
              
              <FlexBox alignItems="flex-start">
                <Box mr="12px" mt="2px">
                  <CheckCircle size={20} color="#28C76F" />
                </Box>
                
                <Box flex="1">
                  <Typography
                    fontSize="14px"
                    fontWeight="600"
                    color="#28C76F"
                    mb="4px"
                  >
                    Message
                  </Typography>
                  
                  <Typography
                    fontSize="14px"
                    color="#28C76F"
                    lineHeight="1.5"
                  >
                    Your application has been successfully submitted and is now under review. You can track the progress and review your application details below. We will notify you via email and SMS whenever there is an update or change in the status of your application.
                  </Typography>
                </Box>
              </FlexBox>
            </SuccessMessage>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default ApplicationProgressPage;