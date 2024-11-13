'use client';

import { useState, useEffect } from 'react';
import EducationForm from '../../../components/admin/EducationForm';

export default function EducationAdmin() {
  const [educations, setEducations] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await fetch('/api/education');
      if (!response.ok) throw new Error('Failed to fetch educations');
      const data = await response.json();
      setEducations(data);
    } catch (error) {
      console.error('Error fetching educations:', error);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = editingId ? `/api/education/${editingId}` : '/api/education';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save education');
      await fetchEducations();
      setEditingId(null);
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta entrada educativa?')) return;
    try {
      const response = await fetch(`/api/education/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete education');
      await fetchEducations();
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Gestionar Educación</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? 'Editar Educación' : 'Añadir Nueva Educación'}
          </h2>
          <EducationForm
            education={editingId ? educations.find(edu => edu.id === editingId) : {}}
            onSave={handleSave}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Entradas Educativas Existentes</h2>
          {/* {educations.map((education) => (
            <div key={education.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold">{education.degree}</h3>
              <p className="text-gray-600">{education.institution}</p>
              <p className="text-gray-500">{education.period}</p>
              <p className="mt-2">{education.description}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(education.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(education.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))} */}
          holi
        </div>
      </div>
    </>
  );
}