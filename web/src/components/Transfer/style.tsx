import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  margin-top: 50px;
  border: 2px solid ${theme.colors.surface_secondary};
  border-radius: ${theme.borderRadius.lg};

  h3 {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 1px;
  }
  span {
    font-size: 1.5rem;
    color: ${theme.colors.red};
  }
`;

export const WrapperTransfer = styled.div`
  display: flex;

  p {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 1px;
    margin-top: 30px;
  }

  form {
    margin: 0 auto;
    display: flex;
    margin-top: 50px;
    margin-bottom: 50px;
    gap: 20px;
  }

  input {
    background: ${theme.colors.surface_primary};
    border-radius: ${theme.borderRadius.md};
    color: ${theme.colors.text_primary};
    font-size: 18px;
    height: 100%;
    padding: 20px 30px;
    width: 100%;
    border: 2px solid transparent;

    &:focus {
      border: 2px solid ${theme.colors.brand};
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  button {
    border-radius: ${theme.borderRadius.md};
    padding: 20px 30px;
    background: ${theme.colors.brand};
    font-size: 20px;
    font-weight: 500;
    color: ${theme.colors.text_on_brand_color};
  }
`;
