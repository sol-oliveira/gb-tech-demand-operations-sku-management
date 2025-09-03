"use client";
import { useSKUs } from "@/queries/skus/sku-list";
import { SKUTableComponent } from "@/components/skus/SKUTableComponent";
import { SKUStatusCardComponent } from "@/components/skus/SKUStatusCardComponent";
import { DataNotFoundComponent } from "@/components/shared/DataNotFoundComponent";
import { SKUHeaderComponent } from "@/components/skus/SKUHeaderComponent";
import { LoadingSpinnerComponent } from "@/components/shared/LoadingSpinnerComponent";

export default function SKUsPage() {
  const { data: skus, isLoading } = useSKUs();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SKUHeaderComponent />
        <SKUStatusCardComponent skus={skus || []} />
        {!isLoading && skus?.length === 0 && <DataNotFoundComponent />}
        {isLoading ? (
          <LoadingSpinnerComponent />
        ) : (
          <SKUTableComponent skus={skus || []} />
        )}
      </div>
    </div>
  );
}
