import styled from "styled-components";
export const Wrapper = styled.div`
  padding: 0px 40px 0 40px;
  display: flex;
  justify-content: ${(props) =>
    props.myEventTeam !== null ? "space-between" : "center"};
  gap: ${(props) => (props.myEventTeam !== null ? "10px" : "60px")};
`;