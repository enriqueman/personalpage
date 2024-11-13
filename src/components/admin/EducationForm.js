// app/admin/components/EducationForm.js
'use client';

import { useState } from 'react';

export default function EducationForm({ education = {} }) {
  const [formData, setFormData] = useState({
    degree: education.degree || '',
    institution: education.institution || '',
    period: education.period || '',
    description: education.description || '',
    isVisible: education.isVisible || true,
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
        <label htmlFor="degree" className="block text-gray-700 font-bold mb-2">Título o Grado</label>
        <input
          type="text"
          id="degree"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="institution" className="block text-gray-700 font-bold mb-2">Institución</label>
        <input
          type="text"
          id="institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="period" className="block text-gray-700 font-bold mb-2">Periodo</label>
        <input
          type="text"
          id="period"
          name="period"
          value={formData.period}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          rows="4"
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
        Guardar Educación
      </button>
    </form>
  );
}