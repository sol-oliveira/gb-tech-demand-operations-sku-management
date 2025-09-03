import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <main className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-semibold text-gray-800">
              Sistema de Gestão de SKUs
            </h1>
            <p className="text-xl sm:text-2xl text-gray-500 font-light">
              Cosméticos & Beleza
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Gerencie todos os SKUs do seu catálogo de produtos de beleza e
              cosméticos de forma simples e eficiente.
            </p>
          </div>

          <div>
            <Link
              href="/skus"
              className="inline-flex items-center px-10 py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 font-medium"
            >
              <span className="mr-3 text-lg">🔍</span>
              Gerenciar SKUs
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
