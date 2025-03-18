
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Shield, CreditCard, Lock, Mail, Phone, LogOut } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSavePassword = () => {
    // Simple validation
    if (!profileData.currentPassword || !profileData.newPassword || !profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });
      // Clear password fields
      setProfileData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }, 1000);
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-xl text-muted-foreground mt-2 max-w-2xl mx-auto">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Sidebar */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=192&h=192" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{profileData.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                </div>
                <Button variant="outline" className="w-full">
                  Change Profile Picture
                </Button>
              </div>
              
              <div className="mt-8 space-y-2">
                <Button variant="ghost" className="justify-start w-full">
                  <User size={18} className="mr-2" />
                  <span>Personal Information</span>
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <CreditCard size={18} className="mr-2" />
                  <span>Payment Methods</span>
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <Bell size={18} className="mr-2" />
                  <span>Notifications</span>
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <Shield size={18} className="mr-2" />
                  <span>Security</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details here
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="flex">
                      <Lock className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={profileData.currentPassword}
                        onChange={handleProfileChange}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={handleProfileChange}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={handleProfileChange}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleSavePassword} 
                      disabled={loading}
                      className="mr-2"
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Protect your account with 2FA</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive account updates via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("emailNotifications", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive account updates via text message
                      </p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("smsNotifications", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">
                        Receive special offers and promotions
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("marketingEmails", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about suspicious activity
                      </p>
                    </div>
                    <Switch
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("securityAlerts", checked)
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={loading}>
                    {loading ? "Saving..." : "Save Preferences"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
