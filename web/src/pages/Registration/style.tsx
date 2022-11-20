import styled from "styled-components";
import theme from "../../styles/theme";
import bgRegister from "../../assets/bg_register.jpg";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-size: 1.5rem;
      color: ${theme.colors.red};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      width: 90%;
    }
  }
`;

export const Pic = styled.div`
  width: 50%;
  height: 100vh;

  background-image: url(${bgRegister});
  background-size: cover;
  background-position: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;
