import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 10px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 18px;

  div {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  button {
    padding: 10px 20px;
    background: transparent;
    border-left: 2px solid ${theme.colors.stroke};
    color: ${theme.colors.text_secondary};
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${theme.colors.text_on_brand_color};
    }
  }
`;
