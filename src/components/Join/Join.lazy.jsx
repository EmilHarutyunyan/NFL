import React, { lazy, Suspense } from "react";

const LazyJoin = lazy(() => import("./Join"));

const Join = (props) => (
  <Suspense fallback={null}>
    <LazyJoin {...props} />
  </Suspense>
);

export default Join;
