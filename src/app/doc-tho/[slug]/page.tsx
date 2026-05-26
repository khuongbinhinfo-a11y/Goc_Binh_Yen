import { Suspense } from "react";

import PoemDetailClient from "./PoemDetailClient";

export default function PoemDetailPage() {
  return (
    <Suspense fallback={null}>
      <PoemDetailClient />
    </Suspense>
  );
}
