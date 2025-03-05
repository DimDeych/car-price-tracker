
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsTabProps {
  notifications: Notification[];
}

export const NotificationsTab = ({ notifications }: NotificationsTabProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
      
      {notifications.length ? (
        <div className="space-y-4">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0 ${!notification.read ? 'bg-primary/5 -mx-4 px-4 py-3 rounded-md' : ''}`}
            >
              <div className="bg-primary/10 rounded-full p-2 mt-1">
                <Bell className={`w-5 h-5 ${!notification.read ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1">
                <div className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-700'}`}>
                  {notification.message}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {notification.date}
                </div>
              </div>
              {!notification.read && (
                <Button variant="ghost" size="sm">
                  Отметить прочитанным
                </Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Bell className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p>У вас пока нет уведомлений</p>
        </div>
      )}
    </div>
  );
};
