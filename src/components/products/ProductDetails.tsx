"use client";

import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { H3, H4, Paragraph, SemiSpan } from "@component/Typography";
import Product from "@models/product.model";
import { useState } from "react";
import styled from "styled-components";

const TabButton = styled(Button)<{ active?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 1px solid #d0dcff;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  color: ${({ active }) => (active ? '#0030E3' : '#111')};
  font-weight: ${({ active }) => (active ? 600 : 500)};
  background-color: ${({ active }) => (active ? '#fff' : '#f9f9f9')};
  margin-right: 4px;
  box-shadow: ${({ active }) => (active ? '0 -2px 0 #0030E3 inset' : 'none')};

  &:hover {
    background-color: #fff;
    color: #0030E3;
  }
`;


const TabContainer = styled(Box)`
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #d0dcff;
  padding: 0 0.5rem;
  border-radius: 8px 8px 0 0;
`;


const ContentBox = styled(Box)`
  padding: 1.5rem 2rem;
  background: #FFFFFF;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid #E0E0E0;
  max-height: 180px;
  overflow-y: auto;
`;

const DocumentItem = styled(Paragraph)`
  font-size: 14px;
  color: #333333;
  margin-bottom: 0.75rem;
`;

type TabType = 'documents' | 'cost' | 'steps' | 'terms';

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('documents');

  const renderDocuments = () => (
    <ContentBox>
      <H4 color="#002180" mb="1rem">The following documents must be submitted during the application</H4>
      {product.requiredDocuments && product.requiredDocuments.length > 0 ? (
        product.requiredDocuments.map((doc, index) => (
          <DocumentItem key={index}>{doc}</DocumentItem>
        ))
      ) : (
        <DocumentItem>No documents listed.</DocumentItem>
      )}
    </ContentBox>
  );

  const renderCost = () => (
    <ContentBox>
      <H4 color="#002180" mb="1rem">Service Cost Details</H4>
      <DocumentItem>{product.cost || "No cost information available."}</DocumentItem>
    </ContentBox>
  );

  const renderSteps = () => (
    <ContentBox>
      <H4 color="#002180" mb="1rem">Application Process</H4>
      {product.steps && product.steps.length > 0 ? (
        product.steps.map((step, index) => (
          <DocumentItem key={index}>{step}</DocumentItem>
        ))
      ) : (
        <DocumentItem>No steps listed.</DocumentItem>
      )}
    </ContentBox>
  );

  const renderTerms = () => (
    <ContentBox>
      <H4 color="#002180" mb="1rem">Terms of Service</H4>
      {product.termsOfService && product.termsOfService.length > 0 ? (
        product.termsOfService.map((term, index) => (
          <DocumentItem key={index}>{term}</DocumentItem>
        ))
      ) : (
        <DocumentItem>No terms listed.</DocumentItem>
      )}
    </ContentBox>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'documents': return renderDocuments();
      case 'cost': return renderCost();
      case 'steps': return renderSteps();
      case 'terms': return renderTerms();
    }
  };

  return (
    <Box mt="2rem">
      
        <TabContainer>
          <TabButton active={activeTab === 'documents'} onClick={() => setActiveTab('documents')}>
            Required Documents
          </TabButton>
          <TabButton active={activeTab === 'cost'} onClick={() => setActiveTab('cost')}>
            Cost
          </TabButton>
          <TabButton active={activeTab === 'steps'} onClick={() => setActiveTab('steps')}>
            Steps
          </TabButton>
          <TabButton active={activeTab === 'terms'} onClick={() => setActiveTab('terms')}>
            Terms Of Service
          </TabButton>
        </TabContainer>

        {renderTabContent()}  
      

      <Box mt="3rem">
        <H3 color="#002180" mb="1.5rem">Related Services</H3>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item md={4} sm={6} xs={12} key={item}>
              <Box 
                p="1.5rem" 
                style={{ 
                  backgroundColor: '#F5F7FF',
                  borderRadius: '8px',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SemiSpan color="#002180">Related Service {item}</SemiSpan>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
