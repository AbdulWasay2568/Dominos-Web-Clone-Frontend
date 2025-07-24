import { useState } from 'react';

const VendorProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Vendor Name',
    email: 'vendor@example.com',
    phone: '03001234567',
  });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vendor Profile</h1>
      <form className="space-y-4">
        <input className="input" type="text" value={profile.name} />
        <input className="input" type="email" value={profile.email} />
        <input className="input" type="text" value={profile.phone} />
        <button className="btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default VendorProfile;
