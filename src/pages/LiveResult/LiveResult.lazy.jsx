import React, { lazy, Suspense } from "react";

const LazyLiveResult = lazy(() => import("./LiveResult"));

const LiveResult = (props) => (
  <Suspense fallback={null}>
    <LazyLiveResult {...props} />
  </Suspense>
);

export default LiveResult;
