const Settings = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold">Notifications</h2>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Email Notifications
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> SMS Alerts
          </label>
        </div>

        <div>
          <h2 className="font-semibold">Danger Zone</h2>
          <button className="text-red-600 border border-red-600 px-4 py-2 rounded">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
