import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const WrapperTable = styled.div`
  font-size: 18px;
  display: flex;

  tbody {
    width: 100%;
  }

  tr {
    margin-bottom: 10px;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    border-radius: ${theme.borderRadius.lg};
    display: flex;
    @media (max-width: ${theme.breakpoints.mobile}) {
      padding: 0 10px;
    }
  }
  tr:nth-child(odd) {
    background: linear-gradient(
      to right,
      ${theme.colors.background},
      ${theme.colors.surface_primary}
    );
  }
  td {
    display: flex;
    gap: 15px;
    color: ${theme.colors.text_secondary};
  }
  td:first-child {
    align-items: center;

    span {
      padding: 15px;
      color: ${theme.colors.text_secondary};
      background-color: ${theme.colors.surface_primary};
      border-radius: ${theme.borderRadius.md};
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      color: ${theme.colors.text_primary};
      font-size: 18px;
      letter-spacing: 1px;
    }
  }
  td:last-child {
    align-items: center;
    justify-content: space-between;
    color: ${theme.colors.text_on_brand_color};
    width: 15%;
    span {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .debitedAccount {
    color: ${theme.colors.green};
  }
  .creditedAccount {
    color: ${theme.colors.red};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 14px;
    td:last-child {
      width: 25%;
      text-align: center;
    }
  }
`;
