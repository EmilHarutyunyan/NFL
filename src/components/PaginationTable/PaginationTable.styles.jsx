import styled from "styled-components";
export const Wrapper = styled.div`
  justify-content: center;
  display: flex;
  gap: 15px;
  margin-top: 30px;
  button {
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid #004ea3;
    max-width: 35px;
    min-height: 35px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &.active {
      background-color: #004ea3;
      color: #fff;
    }
  }
`;