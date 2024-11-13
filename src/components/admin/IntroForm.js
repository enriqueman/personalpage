// app/admin/components/IntroForm.js
'use client';

import { useState } from 'react';

export default function IntroForm({ intro = {} }) {
  const [formData, setFormData] = useState({
    fullName: intro.fullName || '',
    title: intro.title || '',
    summary: intro.summary || '',
    isVisible: intro.isVisible || true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al servidor
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título Profesional</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="summary" className="block text-gray-700 font-bold mb-2">Resumen</label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          rows="6"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isVisible"
            checked={formData.isVisible}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-gray-700 font-bold">Visible en el CV</span>
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Guardar Introducción
      </button>
    </form>
  );
}