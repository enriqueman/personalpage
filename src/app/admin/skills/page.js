'use client';

import { useState, useEffect } from 'react';
import SkillForm from '../../../components/admin/SkillForm';

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/skills');
      if (!response.ok) throw new Error('Failed to fetch skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to load skills. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = editingId ? `/api/skills/${editingId}` : '/api/skills';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save skill');
      await fetchSkills();
      setEditingId(null);
      alert('Skill saved successfully!');
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Failed to save skill. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this skill category?')) return;
    try {
      const response = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete skill');
      await fetchSkills();
      alert('Skill deleted successfully!');
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Failed to delete skill. Please try again.');
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? 'Edit Skill Category' : 'Add New Skill Category'}
          </h2>
          <SkillForm
            skill={editingId ? skills.find(skill => skill.id === editingId) : {}}
            onSave={handleSave}
          />
        </div>
        {isLoading ? (
          <p className="text-gray-600">Loading skills...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Existing Skill Categories</h2>
            {/* {skills.map((skill) => (
              <div key={skill.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold">{skill.category}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skill.skills.map((item, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(skill.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))} */}
            holi
          </div>
        )}
      </div>
    </>
  );
}