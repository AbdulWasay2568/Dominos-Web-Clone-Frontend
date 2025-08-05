import React, { useEffect, useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const dummyMenu: MenuItem[] = [
  {
    id: 1,
    name: "Margherita",
    description: "Classic cheese pizza with tomato sauce.",
    price: 799,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Loaded with spicy pepperoni and cheese.",
    price: 999,
    imageUrl: "https://via.placeholder.com/100",
  },
];

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<Partial<MenuItem>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setMenuItems(dummyMenu);
  }, []);

  const handleSave = () => {
    if (!form.name || !form.description || !form.price) return;

    if (editingId !== null) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...form } as MenuItem : item
        )
      );
    } else {
      setMenuItems((prev) => [
        ...prev,
        {
          ...(form as MenuItem),
          id: Date.now(),
          imageUrl: form.imageUrl || "https://via.placeholder.com/100",
        },
      ]);
    }

    setForm({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item: MenuItem) => {
    setForm(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <button
          onClick={() => {
            setForm({});
            setEditingId(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Item
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 shadow-md rounded-md space-y-4 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Name"
            value={form.name || ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description || ""}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price || ""}
            onChange={(e) => setForm((f) => ({ ...f, price: +e.target.value }))}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.imageUrl || ""}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex gap-4 justify-end">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingId !== null ? "Update" : "Add"} Item
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="font-bold text-blue-700">Rs {item.price}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 text-sm border border-red-400 text-red-600 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
