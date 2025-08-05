import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getUserById,
  updateUserById,
  updateUserImageById,
} from '../redux/slices/user.slice';
import { UpdateUserDto } from '../interfaces/users.interface';

const MyDetails = () => {
  const dispatch = useAppDispatch();

  const { currentUser,loading, error } = useAppSelector((state) => state.user);
  const authUser = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(getUserById(Number(authUser.id)));
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    if (currentUser && !isInitialized) {
      setName(currentUser.name || '');
      setMobile(currentUser.phone || '');
      setEmail(currentUser.email || '');
      setProfileImage(currentUser.profileImage || '');
      setIsInitialized(true); 
    }
  }, [currentUser, isInitialized]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && authUser?.id) {
      const file = e.target.files[0];
      
      // Validate file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        alert('File size must be less than 1MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
      
      setIsUploadingImage(true);
      
      try {
        console.log("Sending file:", file);

        // Upload the image using Redux slice
        const result = await dispatch(updateUserImageById({ 
          userId: Number(authUser.id), 
          imageFile: file 
        })).unwrap();
        
        // Update the profile image state with the server response
        if (result.profileImage) {
          setProfileImage(result.profileImage);
        }
        
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Failed to upload image:', error);
        // Reset preview on error
        setPreviewUrl(null);
        alert('Failed to upload image. Please try again.');
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser?.id) return;

    const payload: UpdateUserDto = {
      name,
      phone: mobile,
      email,
    };

    dispatch(updateUserById({ id: Number(authUser.id), data: payload }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-2">My Details</h2>
      <p className="text-gray-500 mb-6">Update your profile information below.</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-red-500 mb-4">{loading}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-sm">
            {previewUrl || profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>
          <label className={`mt-3 inline-block cursor-pointer px-4 py-2 text-sm rounded-md shadow-sm transition font-medium ${
            isUploadingImage 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}>
            {isUploadingImage ? 'Uploading...' : 'Upload Image'}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              disabled={isUploadingImage}
              hidden 
            />
          </label>
          <p className="text-xs text-gray-400 mt-1">Max file size: 1MB</p>
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium text-sm mb-1">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        {/* Submit Button */}
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
