import React, { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

const initialCategories: Category[] = [
  { id: 1, name: 'Pizzas' },
  { id: 2, name: 'Sides' },
  { id: 3, name: 'Drinks' },
];

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, name: newCategory }]);
    setNewCategory('');
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleSave = () => {
    setCategories(
      categories.map(cat => (cat.id === editingId ? { ...cat, name: editedName } : cat))
    );
    setEditingId(null);
    setEditedName('');
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Category Management</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
          >
            {editingId === cat.id ? (
              <div className="flex items-center gap-3 w-full">
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border px-3 py-1 rounded w-full"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat.id, cat.name)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
