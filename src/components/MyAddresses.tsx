import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getAddressesByUserId,
  addAddress,
  editAddress,
} from "../redux/slices/address.slice";

interface Address {
  id?: number;
  houseNo: string;
  street: string;
  society: string;
  city: string;
  zipCode: string;
}

const initialForm: Address = {
  houseNo: '',
  street: '',
  society: '',
  city: '',
  zipCode: '',
};

const MyAddresses = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.addresses);
  const user = useAppSelector((state) => state.auth.user);
  const [formState, setFormState] = useState<Address>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      dispatch(getAddressesByUserId(Number(user.id)));
    }
  }, [dispatch, user]);

  const handleChange = (field: keyof Address, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditInit = (addr: Address) => {
    setEditingId(addr.id!);
    setFormState(addr);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormState(initialForm);
  };

  const handleSave = async () => {
    const { houseNo, street, society, city, zipCode } = formState;
    if (!houseNo || !street || !society || !city || !zipCode) {
      alert("All fields are required");
      return;
    }

    if (editingId !== null) {
      await dispatch(editAddress({ id: editingId, data: formState }));
      setEditingId(null);
    } else {
      if (user?.id) {
        await dispatch(addAddress({ ...formState, userId: Number(user.id) }));
      }
    }

    setFormState(initialForm);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">My Addresses</h2>

      {/* Address List */}
      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses found.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              {editingId === addr.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(initialForm).map((field) => (
                    <div key={field}>
                      <label className="block font-medium text-sm mb-1 capitalize">
                        {field.replace(/([A-Z])/g, ' $1')} *
                      </label>
                      <input
                        type="text"
                        value={formState[field as keyof Address]}
                        onChange={(e) => handleChange(field as keyof Address, e.target.value)}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <div className="col-span-full flex gap-2 mt-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="text-gray-700 leading-relaxed space-y-1">
                    <div><strong>House:</strong> {addr.houseNo}</div>
                    <div><strong>Street:</strong> {addr.street}</div>
                    <div><strong>Society:</strong> {addr.society}</div>
                    <div><strong>City:</strong> {addr.city}</div>
                    <div><strong>Zip:</strong> {addr.zipCode}</div>
                  </div>
                  <button
                    onClick={() => handleEditInit(addr)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Address */}
      {editingId === null && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(initialForm).map((field) => (
              <div key={field}>
                <label className="block font-medium text-sm mb-1 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')} *
                </label>
                <input
                  type="text"
                  value={formState[field as keyof Address]}
                  onChange={(e) => handleChange(field as keyof Address, e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Address
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAddresses;
