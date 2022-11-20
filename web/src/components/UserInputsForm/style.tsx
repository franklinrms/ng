import styled from "styled-components";
import theme from "../../styles/theme";

const Form = styled.form`
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 1.5rem;
  margin: 30px 0;

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
  button {
    border-radius: ${theme.borderRadius.md};
    padding: 20px 30px;
    background: ${theme.colors.brand};
    font-size: 20px;
    font-weight: 500;
    color: ${theme.colors.text_on_brand_color};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export default Form;
