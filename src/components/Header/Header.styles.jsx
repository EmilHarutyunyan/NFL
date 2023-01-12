import styled from "styled-components";

export const HeaderWrap = styled.header`
    background: #022142;
    padding: 16px 0;
`;
export const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
   & img {
      display: block;
      object-fit: cover;
      width: 52px;
    }
`;

export const Nav = styled.nav`
  ul {
    list-style-type: none;
    display: flex;
    align-items: center;

    li:not(:first-child) {
      margin-left: 40px;
    }
    li a {
      color: #ffffff;
      text-decoration: none;
      font-family: "Saira Semi Condensed", sans-serif;
      font-weight: 500;
    }
  }
`;
export const BtnWrap = styled.div`
  button {
    font-size: 16px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 600;
    padding: 4px 24px;
    border-radius: 4px;
    cursor: pointer;
  }
  button:first-child {
    border: 1px solid;
    color: white;
    background-color: transparent;
  }
  button:last-child {
    border: 1px solid;
    color: black;
    background-color: white;
    margin-left: 24px;
  }
`;