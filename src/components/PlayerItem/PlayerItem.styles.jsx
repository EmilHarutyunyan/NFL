import styled from "styled-components";

export const Wrapper = styled.article`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 0px 24px;
  margin-bottom: 12px;
  border-radius: 10px;
  gap:24px;

`
export const Table = styled.table`
  width: 100%;
`;

export const Tr = styled.tr`
  
`;

export const Th = styled.th`
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #46484a;
  &.player {
    &-name {
      width: 30%;
    }
    &-possition {
      width: 6%;
    }
    &-college {
      width: 17%;
    }
    &-conferance {
      width: 19%;
    }
    &-rating {
      width: 10%;
    }
  }
`;

export const Td = styled.td`
  padding-top: 8px;
  font-size: 28px;
  line-height: 42px;
  color: #022142;
`;

