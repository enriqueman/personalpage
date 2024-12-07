import React from "react";

export const metadata = {
  title: "404 - Página No Encontrada",
  description: "La página que buscas no existe",
};
export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-4xl text-center font-bold mt-20 mb-10">404 - Página no encontrada</h1>
      <p className="text-lg mb-2">Lo sentimos, la página que buscas no existe.</p>
    </div>
  );
}
