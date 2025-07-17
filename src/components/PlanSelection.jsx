import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Star, Clock, Gift, Infinity, MapPin, Car } from "lucide-react";

const plans = [
  // Bike Plans
  {
    id: "bike-daily-dusting-steam",
    name: "DAILY DUSTING+ STANDARD STEAM CAR WASH",
    price: 450,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["bike"],
    features: [
      "Daily dusting service",
      "Standard steam cleaning",
      "Quick exterior wash",
      "Basic chain cleaning",
      "Eco-friendly process",
      "Weekly maintenance"
    ],
    description: "Daily dusting with steam cleaning for bikes"
  },
  {
    id: "bike-daily-dusting",
    name: "DAILY DUSTING",
    price: 250,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["bike"],
    features: [
      "Daily dusting service",
      "Quick exterior wipe",
      "Basic seat cleaning",
      "Mirror & headlight clean",
      "Minimal water usage",
      "Eco-friendly approach"
    ],
    description: "Quick daily dusting service for bikes"
  },
  {
    id: "bike-premium-monthly",
    name: "MONTHLY PREMIUM BIKE WASH",
    price: 800,
    validity: "30 days",
    bonusCredits: 2,
    vehicleTypes: ["bike"],
    features: [
      "Complete bike wash",
      "Engine cleaning",
      "Chain lubrication",
      "Polish & shine",
      "Seat cleaning",
      "2 Bonus wash credits"
    ],
    popular: true,
    description: "Complete premium bike care package"
  },
  {
    id: "bike-pay-per-use",
    name: "BIKE PAY PER USE",
    price: 299,
    validity: "Unlimited",
    bonusCredits: 1,
    vehicleTypes: ["bike"],
    features: [
      "Single premium bike wash",
      "Engine degreasing",
      "Chain maintenance",
      "1 Bonus wash credit",
      "No expiry date",
      "Flexible timing"
    ],
    description: "Perfect for occasional bike cleaning"
  },
  {
    id: "bike-weekly-care",
    name: "WEEKLY BIKE CARE",
    price: 600,
    validity: "30 days",
    bonusCredits: 0,
    vehicleTypes: ["bike"],
    features: [
      "Weekly professional wash",
      "Chain lubrication service",
      "Basic engine cleaning",
      "Tire shine",
      "Quick maintenance check",
      "Weather protection"
    ],
    description: "Regular weekly maintenance for your bike"
  },
  {
    id: "bike-express-wash",
    name: "BIKE EXPRESS WASH",
    price: 350,
    validity: "14 days",
    bonusCredits: 0,
    vehicleTypes: ["bike"],
    features: [
      "Quick exterior wash",
      "Basic chain cleaning",
      "Seat wipe down",
      "Quick dry",
      "Express service",
      "15-minute completion"
    ],
    description: "Fast and efficient bike cleaning"
  },

  // Hatchback Plans
  {
    id: "hatchback-daily-dusting-steam",
    name: "DAILY DUSTING+ STANDARD STEAM CAR WASH",
    price: 650,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["hatchback"],
    features: [
      "Daily dusting service",
      "Standard steam cleaning",
      "Exterior wash & polish",
      "Interior wipe down",
      "Eco-friendly process",
      "Weekly maintenance"
    ],
    description: "Daily dusting with steam cleaning for hatchbacks"
  },
  {
    id: "hatchback-daily-dusting",
    name: "DAILY DUSTING",
    price: 400,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["hatchback"],
    features: [
      "Daily dusting service",
      "Quick exterior wipe",
      "Dashboard cleaning",
      "Window cleaning",
      "Minimal water usage",
      "Eco-friendly approach"
    ],
    description: "Quick daily dusting service for hatchbacks"
  },
  {
    id: "hatchback-premium-monthly",
    name: "MONTHLY PREMIUM HATCHBACK WASH",
    price: 1200,
    validity: "30 days",
    bonusCredits: 1,
    vehicleTypes: ["hatchback"],
    features: [
      "Complete exterior wash",
      "Interior vacuum & wipe",
      "Premium foam treatment",
      "Tire shine & polish",
      "Dashboard cleaning",
      "1 Bonus wash credit"
    ],
    popular: true,
    description: "Complete premium service for compact cars"
  },
  {
    id: "hatchback-pay-per-use",
    name: "HATCHBACK PAY PER USE",
    price: 799,
    validity: "Unlimited",
    bonusCredits: 1,
    vehicleTypes: ["hatchback"],
    features: [
      "Single premium wash",
      "No expiry date",
      "Use anytime",
      "1 Bonus wash credit",
      "All premium features",
      "Flexible scheduling"
    ],
    description: "Perfect for occasional compact car cleaning"
  },
  {
    id: "hatchback-steam-wash",
    name: "HATCHBACK STEAM WASH",
    price: 950,
    validity: "30 days",
    bonusCredits: 0,
    vehicleTypes: ["hatchback"],
    features: [
      "Eco-friendly steam cleaning",
      "Interior sanitization",
      "Exterior polish",
      "Wheel cleaning",
      "Glass treatment",
      "Environment friendly"
    ],
    description: "Eco-friendly steam cleaning for hatchbacks"
  },

  // Sedan Plans
  {
    id: "sedan-daily-dusting-steam",
    name: "DAILY DUSTING+ STANDARD STEAM CAR WASH",
    price: 750,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["sedan"],
    features: [
      "Daily dusting service",
      "Standard steam cleaning",
      "Exterior wash & polish",
      "Interior vacuum & wipe",
      "Eco-friendly process",
      "Weekly maintenance"
    ],
    description: "Daily dusting with steam cleaning for sedans"
  },
  {
    id: "sedan-daily-dusting",
    name: "DAILY DUSTING",
    price: 500,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["sedan"],
    features: [
      "Daily dusting service",
      "Quick exterior wipe",
      "Dashboard cleaning",
      "Window cleaning",
      "Minimal water usage",
      "Eco-friendly approach"
    ],
    description: "Quick daily dusting service for sedans"
  },
  {
    id: "sedan-premium-monthly",
    name: "MONTHLY PREMIUM SEDAN WASH",
    price: 1400,
    validity: "30 days",
    bonusCredits: 1,
    vehicleTypes: ["sedan"],
    features: [
      "Complete exterior wash",
      "Interior vacuum & wipe",
      "Premium foam treatment",
      "Tire shine & polish",
      "Dashboard cleaning",
      "1 Bonus wash credit"
    ],
    popular: true,
    description: "Complete premium service for mid-size cars"
  },
  {
    id: "sedan-pay-per-use",
    name: "SEDAN PAY PER USE",
    price: 899,
    validity: "Unlimited",
    bonusCredits: 1,
    vehicleTypes: ["sedan"],
    features: [
      "Single premium wash",
      "No expiry date",
      "Use anytime",
      "1 Bonus wash credit",
      "All premium features",
      "Flexible scheduling"
    ],
    description: "Perfect for occasional sedan cleaning"
  },
  {
    id: "sedan-deluxe-package",
    name: "SEDAN DELUXE PACKAGE",
    price: 1600,
    validity: "30 days",
    bonusCredits: 2,
    vehicleTypes: ["sedan"],
    features: [
      "Premium exterior wash",
      "Deep interior cleaning",
      "Wax coating",
      "Engine bay cleaning",
      "Trunk organization",
      "2 Bonus wash credits"
    ],
    description: "Deluxe package with extra features"
  },

  // SUV Plans
  {
    id: "suv-daily-dusting-steam",
    name: "DAILY DUSTING+ STANDARD STEAM CAR WASH",
    price: 850,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["suv"],
    features: [
      "Daily dusting service",
      "Standard steam cleaning",
      "Exterior wash & polish",
      "Interior vacuum & wipe",
      "Eco-friendly process",
      "Weekly maintenance"
    ],
    description: "Daily dusting with steam cleaning for SUVs"
  },
  {
    id: "suv-daily-dusting",
    name: "DAILY DUSTING",
    price: 600,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["suv"],
    features: [
      "Daily dusting service",
      "Quick exterior wipe",
      "Dashboard cleaning",
      "Window cleaning",
      "Minimal water usage",
      "Eco-friendly approach"
    ],
    description: "Quick daily dusting service for SUVs"
  },
  {
    id: "suv-premium-monthly",
    name: "MONTHLY PREMIUM SUV WASH",
    price: 1600,
    validity: "30 days",
    bonusCredits: 1,
    vehicleTypes: ["suv"],
    features: [
      "Complete exterior wash",
      "Interior vacuum & wipe",
      "Premium foam treatment",
      "Tire shine & polish",
      "Dashboard cleaning",
      "1 Bonus wash credit"
    ],
    popular: true,
    description: "Complete premium service for SUVs"
  },
  {
    id: "suv-pay-per-use",
    name: "SUV PAY PER USE",
    price: 1099,
    validity: "Unlimited",
    bonusCredits: 1,
    vehicleTypes: ["suv"],
    features: [
      "Single premium wash",
      "No expiry date",
      "Use anytime",
      "1 Bonus wash credit",
      "All premium features",
      "Flexible scheduling"
    ],
    description: "Perfect for occasional SUV cleaning"
  },
  {
    id: "suv-off-road-special",
    name: "SUV OFF-ROAD SPECIAL",
    price: 1800,
    validity: "30 days",
    bonusCredits: 2,
    vehicleTypes: ["suv"],
    features: [
      "Deep undercarriage cleaning",
      "Mud & dirt removal",
      "Protective coating",
      "Wheel well cleaning",
      "Interior deep clean",
      "2 Bonus wash credits"
    ],
    description: "Special package for off-road SUVs"
  },

  // XUV Plans
  {
    id: "xuv-daily-dusting-steam",
    name: "DAILY DUSTING+ STANDARD STEAM CAR WASH",
    price: 950,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["xuv"],
    features: [
      "Daily dusting service",
      "Standard steam cleaning",
      "Exterior wash & polish",
      "Interior vacuum & wipe",
      "Eco-friendly process",
      "Weekly maintenance"
    ],
    description: "Daily dusting with steam cleaning for large SUVs"
  },
  {
    id: "xuv-daily-dusting",
    name: "DAILY DUSTING",
    price: 700,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["xuv"],
    features: [
      "Daily dusting service",
      "Quick exterior wipe",
      "Dashboard cleaning",
      "Window cleaning",
      "Minimal water usage",
      "Eco-friendly approach"
    ],
    description: "Quick daily dusting service for large SUVs"
  },
  {
    id: "xuv-premium-monthly",
    name: "MONTHLY PREMIUM XUV WASH",
    price: 1800,
    validity: "30 days",
    bonusCredits: 2,
    vehicleTypes: ["xuv"],
    features: [
      "Complete exterior wash",
      "Interior vacuum & wipe",
      "Premium foam treatment",
      "Tire shine & polish",
      "Dashboard cleaning",
      "2 Bonus wash credits"
    ],
    popular: true,
    description: "Complete premium service for large SUVs"
  },
  {
    id: "xuv-pay-per-use",
    name: "XUV PAY PER USE",
    price: 1299,
    validity: "Unlimited",
    bonusCredits: 1,
    vehicleTypes: ["xuv"],
    features: [
      "Single premium wash",
      "No expiry date",
      "Use anytime",
      "1 Bonus wash credit",
      "All premium features",
      "Flexible scheduling"
    ],
    description: "Perfect for occasional large SUV cleaning"
  },
  {
    id: "xuv-family-package",
    name: "XUV FAMILY PACKAGE",
    price: 2000,
    validity: "30 days",
    bonusCredits: 3,
    vehicleTypes: ["xuv"],
    features: [
      "Premium exterior wash",
      "Deep interior cleaning",
      "Seat conditioning",
      "Carpet shampooing",
      "Air freshening",
      "3 Bonus wash credits"
    ],
    description: "Family-focused package for large vehicles"
  },

  // Premium Plans
  {
    id: "premium-daily-dusting-steam",
    name: "DAILY DUSTING+ STANDARD STEAM CAR WASH",
    price: 1200,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["premium"],
    features: [
      "Daily dusting service",
      "Premium steam cleaning",
      "Hand wash exterior",
      "Luxury interior wipe",
      "Eco-friendly process",
      "Weekly maintenance"
    ],
    description: "Daily dusting with premium steam cleaning for luxury cars"
  },
  {
    id: "premium-daily-dusting",
    name: "DAILY DUSTING",
    price: 800,
    validity: "7 days",
    bonusCredits: 0,
    vehicleTypes: ["premium"],
    features: [
      "Daily dusting service",
      "Quick exterior wipe",
      "Premium dashboard cleaning",
      "Luxury window cleaning",
      "Minimal water usage",
      "Eco-friendly approach"
    ],
    description: "Quick daily dusting service for luxury vehicles"
  },
  {
    id: "premium-luxury-monthly",
    name: "MONTHLY LUXURY PREMIUM WASH",
    price: 2500,
    validity: "30 days",
    bonusCredits: 3,
    vehicleTypes: ["premium"],
    features: [
      "Hand wash exterior",
      "Premium leather treatment",
      "Ceramic coating",
      "Engine detailing",
      "Luxury interior care",
      "3 Bonus wash credits"
    ],
    popular: true,
    description: "Ultimate luxury car care experience"
  },
  {
    id: "premium-pay-per-use",
    name: "PREMIUM PAY PER USE",
    price: 1899,
    validity: "Unlimited",
    bonusCredits: 2,
    vehicleTypes: ["premium"],
    features: [
      "Single luxury wash",
      "No expiry date",
      "Use anytime",
      "2 Bonus wash credits",
      "All luxury features",
      "Priority scheduling"
    ],
    description: "Perfect for occasional luxury car cleaning"
  },
  {
    id: "premium-concierge-service",
    name: "PREMIUM CONCIERGE SERVICE",
    price: 3000,
    validity: "30 days",
    bonusCredits: 4,
    vehicleTypes: ["premium"],
    features: [
      "White glove service",
      "Paint protection",
      "Interior restoration",
      "Custom detailing",
      "Pick-up & delivery",
      "4 Bonus wash credits"
    ],
    description: "Concierge-level service for luxury vehicles"
  }
];

const PlanSelection = ({ selectedCarType, onPlanSelect, selectedPlan }) => {
  const [selectedPickupType, setSelectedPickupType] = useState("pickup");
  const [currentSelectedPlan, setCurrentSelectedPlan] = useState(undefined);

  // Filter plans based on selected vehicle type
  const filteredPlans = plans.filter(plan => 
    plan.vehicleTypes.includes(selectedCarType.id)
  );

  const handlePlanClick = (plan) => {
    setCurrentSelectedPlan(plan);
  };

  const handleProceed = () => {
    if (currentSelectedPlan) {
      onPlanSelect({ ...currentSelectedPlan, pickupType: selectedPickupType });
    }
  };

  const handleQuickSelect = (plan) => {
    // For quick selection without service type (makes it optional)
    onPlanSelect({ ...plan, pickupType: "pickup" }); // Default to pickup
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect cleaning plan for your <span className="text-primary font-semibold">{selectedCarType.name}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const isSelected = currentSelectedPlan?.id === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  isSelected
                    ? "border-primary bg-gradient-primary text-primary-foreground shadow-primary"
                    : "border-border hover:border-primary/50 hover:shadow-elegant"
                } ${plan.popular ? "ring-2 ring-secondary/20" : ""}`}
                onClick={() => handlePlanClick(plan)}
              >
                <div className="p-6">
                  {plan.popular && (
                    <Badge className="mb-4 bg-secondary text-secondary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  
                  <h3 className={`text-lg font-bold mb-2 ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className={`text-3xl font-bold ${isSelected ? "text-primary-foreground" : "text-primary"}`}>
                      ₹{plan.price.toLocaleString()}
                    </div>
                    <div className={`flex items-center text-sm ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      <Clock className="h-4 w-4 mr-1" />
                      Valid for {plan.validity}
                    </div>
                    {plan.bonusCredits > 0 && (
                      <div className={`flex items-center text-sm mt-1 ${isSelected ? "text-secondary" : "text-secondary"}`}>
                        <Gift className="h-4 w-4 mr-1" />
                        {plan.bonusCredits} Bonus Credit{plan.bonusCredits > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className={`flex items-center text-sm ${isSelected ? "text-primary-foreground/90" : "text-foreground"}`}>
                        <Check className={`h-4 w-4 mr-2 flex-shrink-0 ${isSelected ? "text-secondary" : "text-secondary"}`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant={isSelected ? "secondary" : "default"}
                    className="w-full mb-2"
                  >
                    {isSelected ? "Selected" : "Choose This Plan"}
                  </Button>
                  
                  {/* Quick Select Option - bypasses service type selection */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickSelect(plan);
                    }}
                  >
                    Quick Select (Pickup)
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {currentSelectedPlan && (
          <div className="mt-12">
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-card border-primary/20">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-secondary mr-2" />
                  <p className="text-lg font-medium text-foreground">
                    Plan Selected: <span className="text-primary font-bold">{currentSelectedPlan.name}</span>
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Perfect! You've chosen the {currentSelectedPlan.name} for your {selectedCarType.name}.
                </p>
              </div>

              {/* Pickup/Drop Selection */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Service Type
                </h3>
                <RadioGroup 
                  value={selectedPickupType} 
                  onValueChange={(value) => setSelectedPickupType(value)}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/20">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Pickup Service</p>
                          <p className="text-sm text-muted-foreground">We'll pick up your car and return it after service</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/20">
                    <RadioGroupItem value="drop" id="drop" />
                    <Label htmlFor="drop" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Drop-off Service</p>
                          <p className="text-sm text-muted-foreground">Bring your car to our facility</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="text-center">
                <Button variant="hero" size="lg" onClick={handleProceed}>
                  Proceed to Summary
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanSelection;