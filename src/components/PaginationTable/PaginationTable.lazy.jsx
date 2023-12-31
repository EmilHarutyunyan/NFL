import React, { lazy, Suspense } from "react";

const LazyPaginationTable = lazy(() => import("./PaginationTable"));

const PaginationTable = (props) => (
  <Suspense fallback={null}>
    <LazyPaginationTable {...props} />
  </Suspense>
);

export default PaginationTable;
