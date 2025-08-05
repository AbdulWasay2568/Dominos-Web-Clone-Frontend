import { Bell, X } from "lucide-react";
import { useState } from "react";

type Notification = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New Order Received",
    description: "Order #1243 placed by John Doe.",
    timestamp: "2 mins ago",
    read: false,
  },
  {
    id: 2,
    title: "Menu Item Updated",
    description: "Pepperoni Pizza price changed.",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: 3,
    title: "Low Stock Alert",
    description: "Cheese inventory is running low.",
    timestamp: "3 hours ago",
    read: false,
  },
];

 const Notifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const togglePanel = () => setIsOpen(!isOpen);

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={togglePanel}
        className="relative p-2 text-gray-500 hover:text-white"
      >
        <Bell className="w-6 h-6" />
        {notifications.some(n => !n.read) && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white text-black rounded-lg shadow-xl z-50">
          <div className="p-4 border-b font-semibold flex justify-between items-center">
            Notifications
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No new notifications</div>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {notifications.map(n => (
                <li
                  key={n.id}
                  className={`p-4 border-b hover:bg-gray-100 ${
                    !n.read ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{n.title}</p>
                      <p className="text-sm text-gray-600">{n.description}</p>
                      <span className="text-xs text-gray-400">{n.timestamp}</span>
                    </div>
                    <button
                      onClick={() => dismissNotification(n.id)}
                      className="text-gray-400 hover:text-red-500 ml-4"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;