import React, { lazy, Suspense } from "react";

const LazyCountdownStart = lazy(() => import("./CountdownStart"));



const CountdownStart = (props) => (
  <Suspense fallback={null}>
    <LazyCountdownStart {...props} />
  </Suspense>
);

export default CountdownStart;
