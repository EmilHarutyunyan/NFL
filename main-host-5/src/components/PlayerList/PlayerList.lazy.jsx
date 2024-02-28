import React, { lazy, Suspense } from "react";

const LazyPlayerList = lazy(() => import("./PlayerList"));

const PlayerList = (props) => (
  <Suspense fallback={null}>
    <LazyPlayerList {...props} />
  </Suspense>
);

export default PlayerList;
