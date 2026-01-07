import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleHeader from "@/components/ui/module-header";
import {
  Bell,
  Inbox,
  Star,
  Archive,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  CheckSquare,
  Square,
  ArrowLeft,
  Activity,
  Clock,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  User,
  Calendar,
} from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/mocks/notifications";

const Notifications = () => {
  const [selectedCategory, setSelectedCategory] = useState("inbox");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);

  const notifications = MOCK_NOTIFICATIONS;

  const categories = [
    { id: "inbox", label: "Inbox", icon: <Inbox className="h-4 w-4" />, count: notifications.filter(n => !n.archived).length },
    { id: "starred", label: "Starred", icon: <Star className="h-4 w-4" />, count: notifications.filter(n => n.starred).length },
    { id: "archived", label: "Archived", icon: <Archive className="h-4 w-4" />, count: notifications.filter(n => n.archived).length },
    { id: "alerts", label: "Alerts", icon: <AlertTriangle className="h-4 w-4" />, count: notifications.filter(n => n.type === "alert").length },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "forecast":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "market":
        return <Activity className="h-4 w-4 text-purple-600" />;
      case "system":
        return <Bell className="h-4 w-4 text-gray-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case "normal":
        return <Badge className="bg-blue-100 text-blue-800">Normal</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      default:
        return null;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (selectedCategory) {
      case "starred":
        return notification.starred;
      case "archived":
        return notification.archived;
      case "alerts":
        return notification.type === "alert";
      default:
        return !notification.archived;
    }
  });

  const toggleMessageSelection = (messageId: number) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const selectAllMessages = () => {
    if (selectedMessages.length === filteredNotifications.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredNotifications.map(n => n.id));
    }
  };

  if (selectedNotification) {
    const notification = notifications.find(n => n.id === selectedNotification);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedNotification(null)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Inbox
              </Button>
              <div className="flex-1">
                <h1 className="text-xl font-semibold">{notification?.subject}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Message Content */}
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{notification?.sender}</h3>
                      {getPriorityBadge(notification?.priority)}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>to me</span>
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      <span>{notification?.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeIcon(notification?.type)}
                  <Badge variant="outline">{notification?.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                  {notification?.body}
                </pre>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-6 pt-6 border-t">
                <Button size="sm">
                  Reply
                </Button>
                <Button size="sm" variant="outline">
                  Forward
                </Button>
                <Button size="sm" variant="outline">
                  Mark as Important
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleHeader
        icon={<Bell className="h-6 w-6" />}
        title="Joseph AI Notifications"
        description="Stay updated with system alerts, AI insights, and business updates"
        isConnected={true}
        lastUpdated={new Date()}
        connectionLabel="Live"
      />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* Sidebar - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block md:w-56 lg:w-64 space-y-2">
            <div className="bg-white rounded-lg border p-3 sm:p-4 sticky top-20">
              <Button className="w-full mb-4">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">New Notification</span>
                <span className="sm:hidden">New</span>
              </Button>

              <nav className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span>{category.label}</span>
                    </div>
                    {category.count > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile category selector */}
          <div className="md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {category.icon}
                  <span className="text-xs sm:text-sm">{category.label}</span>
                  {category.count > 0 && (
                    <Badge
                      variant={selectedCategory === category.id ? "default" : "secondary"}
                      className="text-xs min-w-5 h-5 flex items-center justify-center rounded-full p-0"
                    >
                      {category.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={selectAllMessages}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {selectedMessages.length === filteredNotifications.length && filteredNotifications.length > 0 ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                    <CardTitle className="capitalize">{selectedCategory}</CardTitle>
                  </div>
                  
                  {selectedMessages.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive ({selectedMessages.length})
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete ({selectedMessages.length})
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                      }`}
                      onClick={() => setSelectedNotification(notification.id)}
                    >
                      {/* Checkbox row */}
                      <div className="flex items-center gap-2 sm:gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMessageSelection(notification.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded flex-shrink-0"
                        >
                          {selectedMessages.includes(notification.id) ? (
                            <CheckSquare className="h-4 w-4" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Toggle starred
                          }}
                          className="p-1 hover:bg-gray-200 rounded flex-shrink-0 hidden sm:block"
                        >
                          <Star className={`h-4 w-4 ${notification.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                        </button>

                        <div className="flex-shrink-0 hidden sm:block">
                          {getTypeIcon(notification.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <span className={`text-sm ${!notification.read ? "font-semibold" : "font-medium"}`}>
                            {notification.sender}
                          </span>
                          <div className="flex items-center gap-1 flex-wrap">
                            {getPriorityBadge(notification.priority)}
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                          </div>
                        </div>
                        <div className={`text-sm ${!notification.read ? "font-medium" : ""} truncate`}>
                          {notification.subject}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {notification.preview}
                        </div>
                      </div>

                      {/* Timestamp and menu */}
                      <div className="flex-shrink-0 flex items-center justify-between sm:flex-col sm:text-right gap-2">
                        <div className="text-xs text-muted-foreground sm:mb-1">
                          {notification.timestamp}
                        </div>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12">
                    <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      Your {selectedCategory} is empty. New notifications will appear here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
