import Link from "next/link";

export function SKUHeaderComponent() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            SKUs de Cosméticos
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie e visualize todos os SKUs de produtos de beleza e
            cosméticos
          </p>
        </div>
        <Link
          href="/skus/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          + Novo SKU
        </Link>
      </div>
    </div>
  );
}
