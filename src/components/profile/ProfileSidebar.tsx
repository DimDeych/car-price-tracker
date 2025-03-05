
import { useState } from "react";
import { User, Settings, Bell, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileSidebarProps {
  name: string;
  email: string;
  memberSince: string;
  lastLogin: string;
  isEditing: boolean;
  editableName: string;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
}

export const ProfileSidebar = ({
  name,
  email,
  memberSince,
  lastLogin,
  isEditing,
  editableName,
  onNameChange,
  onSave,
  onCancelEdit,
  onStartEdit
}: ProfileSidebarProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="bg-primary/10 rounded-full p-6">
            <User className="w-12 h-12 text-primary" />
          </div>
          {isEditing ? (
            <div className="w-full space-y-2">
              <Input
                value={editableName}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Ваше имя"
                className="text-center"
              />
              <div className="flex gap-2">
                <Button onClick={onSave} size="sm" className="flex-1">Сохранить</Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancelEdit}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-xl font-semibold">{name}</div>
              <Button variant="outline" onClick={onStartEdit} size="sm">
                Изменить имя
              </Button>
            </>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Email</div>
            <div className="font-medium">{email}</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Дата регистрации</div>
            <div>{memberSince}</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Последний вход</div>
            <div>{lastLogin}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold">Настройки</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold">Уведомления</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold">Безопасность</span>
        </div>
      </div>
    </div>
  );
};
