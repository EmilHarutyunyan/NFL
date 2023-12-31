import Router from "./router/router";
import { ScrollToTop } from "./scrollTop";
import socketIO from "socket.io-client";
// const socket = socketIO.connect("http://192.168.77.139:8000/");
function App() {

  return (
    <>
      <ScrollToTop />
      <Router />
    </>
  );
}

export default App;
