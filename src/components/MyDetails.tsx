import React, { useState } from 'react';

const MyDetails = () => {
  const [firstName, setFirstName] = useState('Abdul');
  const [lastName, setLastName] = useState('Wasay');
  const [mobile, setMobile] = useState('+92 304-2345651');
  const [email, setEmail] = useState('awd.lhr@gmail.com');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Changes saved!');
    // Add submit logic
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-2">My Details</h2>
      <p className="text-gray-500 mb-6">Update your profile information below.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-sm">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile Preview" className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>
          <label className="mt-3 inline-block cursor-pointer bg-gray-100 px-4 py-2 text-sm rounded-md shadow-sm hover:bg-gray-200 transition">
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          </label>
          <p className="text-xs text-gray-400 mt-1">Max file size: 1MB</p>
        </div>

        {/* First Name */}
        <div>
          <label className="block font-medium text-sm mb-1">First Name *</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium text-sm mb-1">Last Name *</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-medium text-sm mb-1">Mobile Number *</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block font-medium text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full bg-gray-100 border rounded-md px-4 py-2 text-gray-500"
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block font-medium text-sm mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium text-sm mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyDetails;
