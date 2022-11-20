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
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;

  button {
    padding: 50px;
    border-radius: ${theme.borderRadius.lg};
    background: transparent;
    width: 40%;
    color: ${theme.colors.brand};
    border: 2px solid ${theme.colors.brand};
    font-size: 18px;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    letter-spacing: 2px;
    &:hover {
      color: ${theme.colors.text_on_brand_color};
      border: 2px solid ${theme.colors.text_on_brand_color};
      transform: scale(1.2);
    }
  }

  .balance {
    display: block;
    text-align: center;
    padding: 50px;
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text_on_brand_color};
    background: linear-gradient(
      150deg,
      ${theme.colors.brand},
      ${theme.colors.brand_secondary}
    );
    width: 55%;
    .value {
      font-size: 28px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    button {
      width: 95%;
    }
    .balance {
      width: 95%;
    }
  }
`;
