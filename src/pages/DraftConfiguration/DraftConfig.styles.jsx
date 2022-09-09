import styled from "styled-components";

export const DraftConfigWrap = styled.section`
  margin-top: 40px;
  margin-bottom: 200px;
  .line {
    margin-top: 100px;
  }
`;
export const DraftContainer = styled.div`
  
`;
export const DraftHeading = styled.div`
  margin-bottom: 80px;
  .title {
    color: #000000;
    font-size: 36px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 400;
    margin-bottom: 0;
  }
  p {
    color: #3E464F;
    font-size: 20px;
    font-family: 'Saira Semi Condensed', sans-serif;
    font-weight: 400;
    }
`;
export const DraftTeams = styled.div`

`;
export const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 650px;
  width: 100%;
  margin: auto;
  margin-top: 100px;
`;
export const StepItem = styled.div`
  span {
    background: #e5e5e5;
    padding: 0 20px;
    color: #3e464f;
    font-size: 36px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 700;
    border: 1px solid #004ea3;
    border-radius: 4px;
    margin: 0 auto;
    display: table;
  }
  span.active-step {
    background-color: #00438b !important;
    color: white;
  }
  p {
    color: #3e464f;
    font-size: 20px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 400;
    margin-top: 24px;
  }
`;
