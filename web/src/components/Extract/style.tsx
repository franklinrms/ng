import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .containerFilters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 0;
    h3 {
      font-size: 1.5rem;
      font-weight: 400;
      letter-spacing: 1px;
    }
    @media (max-width: ${theme.breakpoints.mobile}) {
      flex-direction: column;
      h3 {
        margin-bottom: 40px;
      }
    }
  }
  .wrapperFilters {
    display: flex;
    gap: 20px;

    input[type="date"] {
      border: 2px solid ${theme.colors.surface_secondary};
      padding: 15px;
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      color: ${theme.colors.text_primary};
      ::-webkit-calendar-picker-indicator {
        cursor: pointer;
        background-color: ${theme.colors.text_primary};
        padding: 5px;
        border-radius: ${theme.borderRadius.sm};
      }
    }
  }
`;

export const FilterButton = styled.button<{ active: boolean }>`
  background: ${({ active }) =>
    active ? theme.colors.brand : theme.colors.background};
  padding: 15px 20px;
  font-weight: bold;
  color: ${({ active }) =>
    active ? theme.colors.text_on_brand_color : theme.colors.text_primary};
  border-radius: ${theme.borderRadius.lg};
  border: 2px solid ${theme.colors.surface_secondary};
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
