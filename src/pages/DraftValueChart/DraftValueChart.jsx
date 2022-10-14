import React from "react";
// Components
import Title from "../../components/Title/Title";

// Styles
import {
  DraftValueContent,
  RoundColumn,
  RoundColumnHead,
  Wrapper,
} from "./DraftValueChart.styles";

const DraftValueChart = () => {
  const roundColumn = 7;
  const team = 32;
  const bodyCol = 38;
  return (
    <Wrapper className="main-container">
      <Title titleText="Draft Value Chart" />
      <DraftValueContent>
        {[...Array(roundColumn).keys()].map((rt) => {
          return (
            <RoundColumn key={rt}>
              <RoundColumnHead>
                <p>Round {rt + 1}</p>
              </RoundColumnHead>
              <table>
                <thead>
                  <tr>
                    <th>Pik</th>
                    <th>Team</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(bodyCol).keys()].map((item) => {
                    if (team >= item) {
                      return (
                        <tr key={item}>
                          <td>{item}</td>
                          <td>Jax</td>
                          <td>3000</td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={item}>
                          <td> </td>
                          <td> </td>
                          <td>{""}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </RoundColumn>
          );
        })}
      </DraftValueContent>
    </Wrapper>
  );
};

export default DraftValueChart;
