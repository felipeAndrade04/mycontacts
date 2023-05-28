import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: none;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  font-weight: bold;
  transition: background all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #cccccc;
    cursor: default;
  }
`;
