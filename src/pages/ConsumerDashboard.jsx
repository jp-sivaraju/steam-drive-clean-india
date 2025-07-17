import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Car, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  CheckCircle,
  AlertCircle,
  LogOut,
  Plus
} from "lucide-react";


const ConsumerDashboard = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([
    {
      id: "SD-123456",
      carType: "Sedan",
      plan: "MONTHLY PREMIUM CAR WASH",
      status: "in-progress",
      pickupType: "pickup",
      address: "123 Main Street, City Center",
      scheduledDate: "2025-01-16",
      price: 1400,
      progress: 65
    },
    {
      id: "SD-123455",
      carType: "SUV",
      plan: "PAY PER USE",
      status: "completed",
      pickupType: "drop",
      scheduledDate: "2025-01-10",
      price: 899,
      progress: 100
    }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/consumer-login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-secondary text-secondary-foreground";
      case "in-progress": return "bg-primary text-primary-foreground";
      case "pending": return "bg-muted text-muted-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "in-progress": return <Clock className="h-4 w-4" />;
      case "pending": return <AlertCircle className="h-4 w-4" />;
      case "cancelled": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background dark-pattern">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-foreground">Steam & Drive</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Booking
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Active Services</h2>
          <div className="grid gap-6">
            {services.filter(service => service.status !== "completed").map((service) => (
              <Card key={service.id} className="p-6 bg-card border-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Order #{service.id}</h3>
                    <p className="text-muted-foreground">{service.plan}</p>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {getStatusIcon(service.status)}
                    <span className="ml-1 capitalize">{service.status.replace('-', ' ')}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{service.carType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{new Date(service.scheduledDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground capitalize">{service.pickupType}</span>
                  </div>
                </div>

                {service.address && (
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{service.address}</span>
                  </div>
                )}

                {service.status === "in-progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Service Progress</span>
                      <span className="text-primary">{service.progress}%</span>
                    </div>
                    <Progress value={service.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {service.progress < 30 && "Vehicle picked up, heading to facility"}
                      {service.progress >= 30 && service.progress < 70 && "Service in progress"}
                      {service.progress >= 70 && service.progress < 100 && "Final touches and quality check"}
                      {service.progress === 100 && "Service completed, ready for pickup"}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <span className="text-lg font-semibold text-foreground">₹{service.price.toLocaleString()}</span>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Service History */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Service History</h2>
          <div className="grid gap-4">
            {services.filter(service => service.status === "completed").map((service) => (
              <Card key={service.id} className="p-4 bg-card border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-foreground">Order #{service.id}</h3>
                    <p className="text-sm text-muted-foreground">{service.plan} - {service.carType}</p>
                    <p className="text-sm text-muted-foreground">{new Date(service.scheduledDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(service.status)}>
                      {getStatusIcon(service.status)}
                      <span className="ml-1">Completed</span>
                    </Badge>
                    <p className="text-sm text-foreground mt-1">₹{service.price.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;