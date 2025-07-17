import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  CheckCircle,
  AlertCircle,
  LogOut,
  Filter,
  Edit,
  Search,
  Users,
  TrendingUp,
  DollarSign,
  Package
} from "lucide-react";


const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("current");
  const [filterCarType, setFilterCarType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPlan, setEditingPlan] = useState(null);
  
  const [services] = useState([
    {
      id: "SD-123456",
      customerName: "John Doe",
      customerPhone: "+91 9876543210",
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
      customerName: "Jane Smith",
      customerPhone: "+91 9876543211",
      carType: "SUV",
      plan: "PAY PER USE",
      status: "completed",
      pickupType: "drop",
      scheduledDate: "2025-01-10",
      price: 899,
      progress: 100
    },
    {
      id: "SD-123454",
      customerName: "Mike Johnson",
      customerPhone: "+91 9876543212",
      carType: "Hatchback",
      plan: "DAILY DUSTING",
      status: "pending",
      pickupType: "pickup",
      address: "456 Oak Avenue, Downtown",
      scheduledDate: "2025-01-17",
      price: 500,
      progress: 0
    }
  ]);

  const [plans, setPlans] = useState([
    {
      id: "monthly-premium",
      name: "MONTHLY PREMIUM CAR WASH",
      price: 1400,
      carTypes: ["Sedan", "SUV", "Hatchback"],
      features: ["Complete exterior wash", "Interior vacuum & wipe", "Premium foam treatment"]
    },
    {
      id: "pay-per-use",
      name: "PAY PER USE",
      price: 899,
      carTypes: ["Sedan", "SUV", "Hatchback"],
      features: ["Single premium wash", "No expiry date", "Use anytime"]
    }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/admin-login");
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== "admin") {
      navigate("/admin-login");
      return;
    }
    setUser(user);
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

  const filteredServices = services.filter(service => {
    const matchesCarType = filterCarType === "all" || service.carType === filterCarType;
    const matchesSearch = service.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "current") {
      return matchesCarType && matchesSearch && service.status !== "completed";
    } else {
      return matchesCarType && matchesSearch && service.status === "completed";
    }
  });

  const stats = {
    totalServices: services.length,
    activeServices: services.filter(s => s.status !== "completed").length,
    completedServices: services.filter(s => s.status === "completed").length,
    totalRevenue: services.reduce((sum, s) => sum + s.price, 0)
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background dark-pattern">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-foreground">Steam & Drive Admin</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
            </div>
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
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Services</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalServices}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Services</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeServices}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <p className="text-2xl font-bold text-foreground">{stats.completedServices}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
          </Card>
          
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-secondary" />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current Services</TabsTrigger>
            <TabsTrigger value="completed">Completed Services</TabsTrigger>
            <TabsTrigger value="plans">Manage Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCarType} onValueChange={setFilterCarType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Car Types</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="p-6 bg-card border-border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Order #{service.id}</h3>
                      <p className="text-muted-foreground">{service.customerName} - {service.plan}</p>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {getStatusIcon(service.status)}
                      <span className="ml-1 capitalize">{service.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-foreground">{service.customerPhone}</span>
                    </div>
                  </div>

                  {service.address && (
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{service.address}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-foreground">₹{service.price.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Customer
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search completed services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCarType} onValueChange={setFilterCarType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Car Types</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {filteredServices.map((service) => (
                <Card key={service.id} className="p-4 bg-card border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-foreground">Order #{service.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.customerName} - {service.plan} - {service.carType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(service.scheduledDate).toLocaleDateString()}
                      </p>
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
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Manage Service Plans</h2>
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Add New Plan
              </Button>
            </div>

            <div className="grid gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className="p-6 bg-card border-border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-2xl font-bold text-primary">₹{plan.price.toLocaleString()}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPlan(plan)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Plan
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Car Types:</strong> {plan.carTypes.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Features:</strong> {plan.features.join(", ")}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;