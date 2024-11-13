// app/admin/components/SkillForm.js
'use client';

import { useState } from 'react';

export default function SkillForm({ skill = {} }) {
  const [formData, setFormData] = useState({
    category: skill.category || '',
    skills: skill.skills ? skill.skills.join(', ') : '',
    isVisible: skill.isVisible || true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(skill => skill.trim());
    const dataToSubmit = { ...formData, skills: skillsArray };
    // Aquí iría la lógica para enviar los datos al servidor
    console.log(dataToSubmit);
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
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Categoría</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="skills" className="block text-gray-700 font-bold mb-2">Habilidades</label>
        <textarea
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          rows="4"
          placeholder="Ingrese las habilidades separadas por comas"
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
        Guardar Habilidades
      </button>
    </form>
  );
}