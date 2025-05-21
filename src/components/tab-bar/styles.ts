import styled from 'styled-components';

export const TabBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface TabProps {
  active?: boolean;
}

export const Tab = styled.div<TabProps>`
  cursor: pointer;
  padding: 10px 15px;
  transition: color 0.3s, border-bottom 0.3s;
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: var(--Label-Large-Size, 14px);
  font-style: normal;
  font-weight: ${(props) => (props.active ? 'bold' : '500')};
  line-height: var(--Label-Large-Line-Height, 20px);
  letter-spacing: var(--Label-Large-Tracking, 0.1px);
  
  color: ${(props) => (props.active ? '#0077cc' : '#747474')};  /* Active color vs Inactive color */
  
  ${(props) =>
    props.active &&
    `
    border-bottom: 2px solid #0077cc;
  `}
  
  &:hover {
    color: #0077cc;
    border-bottom: 2px solid #0077cc;
  }

  /* Aligning the icon to the left of the text */
  display: flex;
  align-items: center;
  gap: 8px;  /* Adds space between the icon and the text */

  img {
    width: 20px;  /* Set the size of the icon */
    height: 20px;
  }
`;
