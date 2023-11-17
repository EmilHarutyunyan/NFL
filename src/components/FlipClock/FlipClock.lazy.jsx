import React, { lazy, Suspense } from "react";

const LazyFlipClock = lazy(() => import("./FlipClock"));

const FlipClock = (props) => (
  <Suspense fallback={null}>
    <LazyFlipClock {...props} />
  </Suspense>
);

export default FlipClock;
