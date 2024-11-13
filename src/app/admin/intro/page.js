'use client';

import { useState, useEffect } from 'react';
// import AdminLayout from '../components/AdminLayout';
import IntroForm from '../../../components/admin/IntroForm';

export default function IntroAdmin() {
  const [intro, setIntro] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIntro();
  }, []);

  const fetchIntro = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/intro');
      if (!response.ok) throw new Error('Failed to fetch intro data');
      const data = await response.json();
      setIntro(data);
    } catch (error) {
      console.error('Error fetching intro:', error);
      setError('Failed to load intro data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      const method = intro ? 'PUT' : 'POST';
      const response = await fetch('/api/intro', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save intro');
      const updatedIntro = await response.json();
      setIntro(updatedIntro);
      alert('Intro saved successfully!');
    } catch (error) {
      console.error('Error saving intro:', error);
      alert('Failed to save intro. Please try again.');
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Introduction</h1>
        {/* {isLoading ? (
          <p className="text-gray-600">Loading intro data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {intro ? 'Edit Introduction' : 'Create Introduction'}
            </h2>
            <IntroForm intro={intro} onSave={handleSave} />
          </div>
        )} */}
        holi
      </div>
    </>
  );
}