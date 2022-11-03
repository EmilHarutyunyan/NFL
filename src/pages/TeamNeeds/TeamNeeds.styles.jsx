
import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  &.main-container {
    margin-top: 40px;
    margin-bottom: 68px;
  }
  
`;

export const AccardinWrapper = styled.article`
  margin-bottom: 24px;
`;

export const TeamSummary = styled.div`
  display: flex;
  align-items: center;
  gap:40px;
`;
export const ImgWrap = styled.div`
  img {
    display: block;
    object-fit: cover;
  }
`;
export const TeamPosition = styled.ul`
  display: flex;
  align-items: center;

`;
export const TeamPositionItem = styled.li`
    padding: 16px;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #3E464F;
    ${props =>
    props.primary &&
    css`
      color: #004EA3;
    `};
`;
