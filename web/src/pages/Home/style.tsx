import styled from "styled-components";
import theme from "../../styles/theme";
import bgHome from "../../assets/bg_home.jpg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 0 4rem; */
  background-image: url(${bgHome});
  background-size: cover;
  background-position: center;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .inner {
    padding: 0 4rem;
    flex-direction: column;
    @media (max-width: ${theme.breakpoints.mobile}) {
      padding: 0 20px;
    }
  }

  h1 {
    font-size: 3rem;
    z-index: 1;
  }
  h2 {
    z-index: 1;
    font-size: 2.5rem;
    font-weight: 400;
    margin-top: 20px;
  }

  button {
    z-index: 1;
    border-radius: ${theme.borderRadius.md};
    padding: 20px 30px;
    background: ${theme.colors.brand};
    font-size: 20px;
    font-weight: 600;
    color: ${theme.colors.text_on_brand_color};
  }
  .registration {
    background: transparent;
    border: 2px solid ${theme.colors.brand};
    font-weight: 500;
  }

  div {
    padding: 60px 0;
    display: flex;
    gap: 2rem;
  }
`;

export default Container;
