import styled from "styled-components";
export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
  background-color: #022142;
  -webkit-animation: 3s 0.875s cubic-bezier(0.9, 0, 0.1, 1) forwards
    background_color;
  animation: 3s 0.875s cubic-bezier(0.9, 0, 0.1, 1) forwards background_color;

  @keyframes background_color {
    33.3333333333% {
      background-color: #00677955;
    }
    66.6666666667% {
      background-color: #225c2f53;
    }
    100% {
      background-color: #0457b655;
    }
    133.3333333333% {
      background-color: #d50a0a55;
    }
  }
  .count {
    width: 75vmin;
    height: 75vmin;
    box-shadow: 0 0 0 1.875vmin,
      inset 3.75vmin 3.75vmin 7.5vmin rgba(0, 0, 0, 0.125),
      3.75vmin 3.75vmin 7.5vmin rgba(0, 0, 0, 0.125);
    font-size: 37.5vmin;
    text-shadow: 3.75vmin 3.75vmin 7.5vmin rgba(0, 0, 0, 0.125);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: white;
    border-radius: 50%;
    font-weight: 700;

    @media (min-width: 600px) {
      width: 50vmin;
      height: 50vmin;
      box-shadow: 0 0 0 1.25vmin,
        inset 2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125),
        2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125);
      font-size: 25vmin;
      text-shadow: 2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125);
    }

    &:before {
      content: "3";
      -webkit-animation: 3s 1s forwards timer_countdown, 1s 0.875s 3 timer_beat;
      animation: 3s 1s forwards timer_countdown, 1s 0.875s 3 timer_beat;
    }
    @-webkit-keyframes timer_beat {
      40%,
      80% {
        transform: none;
      }
      50% {
        transform: scale(1.125);
      }
    }
    @keyframes timer_beat {
      40%,
      80% {
        transform: none;
      }
      50% {
        transform: scale(1.125);
      }
    }
    @-webkit-keyframes timer_countdown {
      0% {
        content: "3";
      }
      33.3333333333% {
        content: "2";
      }
      66.6666666667% {
        content: "1";
      }
      100% {
        content: "0";
      }
    }
    @keyframes timer_countdown {
      0% {
        content: "3";
      }
      33.3333333333% {
        content: "2";
      }
      66.6666666667% {
        content: "1";
      }
      100% {
        content: "0";
      }
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3000;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.125);
      -webkit-animation: 3s 1s linear forwards timer_indicator;
      animation: 3s 1s linear forwards timer_indicator;
    }
    @-webkit-keyframes timer_indicator {
      100% {
        transform: translateY(100%);
      }
    }
    @keyframes timer_indicator {
      100% {
        transform: translateY(100%);
      }
    }
  }
`;
