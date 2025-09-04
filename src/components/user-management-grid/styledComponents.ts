import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  color: gray;
  font-size: 1rem;
  margin-bottom: 20px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

export const Pill = styled.span`
  padding: 8px 12px;
  border-radius: 10px;
  background: #e6edff;
  color: #2563eb;
  font-weight: 500;
  font-size: 0.95rem;
`;

export const Heading = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #111113;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border: 1px solid #ddd;
`;

export const TableHeader = styled.th`
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  font-weight: 500;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
`;

// export const Button = styled.button`
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   cursor: pointer;
//   border-radius: 5px;
//   font-size: 1rem;
//   margin-right: 10px;
// `;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10000;
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background: white;
  padding: 20px;
`;

export const BaseInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  margin-right: 10px;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

export const BaseSelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 36px 8px 12px; /* space for the arrow */
  font-size: 15px;
  color: #5c5c6a; /* matches your example text color */
  cursor: pointer;
  margin-right: 10px;
  appearance: none; /* hide native arrow */
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='%235c5c6a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 8 12 14 18 8'/></svg>")
    no-repeat right 12px center;
  background-color: #fff;
  background-size: 20px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;



export const Button = styled.button`
  background: #0030E3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #1e40af;
  }
  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

export const Icon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #888;
  transition: background 0.2s;

  svg path,
  svg circle,
  svg ellipse {
    transition: stroke 0.2s;
  }

  &:hover svg path,
  &:hover svg circle,
  &:hover svg ellipse {
    stroke: #007bff; /* your blue color */
  }
`;

export const SortArrows = styled.span`
  margin-left: 0.3rem;
  display: inline-flex;
  flex-direction: column;
  font-size: 0.8em;
`;
export const Arrow = styled.span`
  cursor: pointer;
  color: #aaa;
  &.active {
    color: #000;
  }
`;
