import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Star, Clock, Gift, Infinity, MapPin, Car } from "lucide-react";
import type { CarType } from "./CarTypeSelection";

interface Plan {
  id: string;
  name: string;
  price: number;
  validity: string;
  bonusCredits: number;
  features: string[];
  popular?: boolean;
  description: string;
}

const plans: Plan[] = [
  {
    id: "monthly-premium",
    name: "MONTHLY PREMIUM CAR WASH",
    price: 1400,
    validity: "30 days",
    bonusCredits: 1,
    features: [
      "Complete exterior wash",
      "Interior vacuum & wipe",
      "Premium foam treatment",
      "Tire shine & polish",
      "Dashboard cleaning",
      "1 Bonus wash credit"
    ],
    popular: true,
    description: "Complete premium service with bonus credits"
  },
  {
    id: "pay-per-use",
    name: "PAY PER USE",
    price: 899,
    validity: "Unlimited",
    bonusCredits: 1,
    features: [
      "Single premium wash",
      "No expiry date",
      "Use anytime",
      "1 Bonus wash credit",
      "All premium features",
      "Flexible scheduling"
    ],
    description: "Perfect for occasional users"
  },
  {
    id: "daily-dusting-premium",
    name: "DAILY DUSTING + PREMIUM CAR WASH",
    price: 1300,
    validity: "30 days",
    bonusCredits: 0,
    features: [
      "Daily external dusting",
      "Weekly premium wash",
      "Maintenance protection",
      "Quick touch-ups",
      "Priority booking",
      "Weather protection"
    ],
    description: "Daily care with weekly deep cleaning"
  },
  {
    id: "daily-dusting-steam",
    name: "DAILY DUSTING + STANDARD STEAM CAR WASH",
    price: 1050,
    validity: "30 days",
    bonusCredits: 0,
    features: [
      "Daily external dusting",
      "Bi-weekly steam wash",
      "Eco-friendly cleaning",
      "Quick maintenance",
      "Standard detailing",
      "Regular care routine"
    ],
    description: "Eco-friendly daily maintenance"
  },
  {
    id: "daily-dusting",
    name: "DAILY DUSTING",
    price: 500,
    validity: "30 days",
    bonusCredits: 0,
    features: [
      "Daily external dusting",
      "Quick cleaning",
      "Dust removal",
      "Basic maintenance",
      "Weather protection",
      "Entry-level care"
    ],
    description: "Basic daily maintenance plan"
  }
];

interface PlanSelectionProps {
  selectedCarType: CarType;
  onPlanSelect: (plan: Plan & { pickupType: "pickup" | "drop" }) => void;
  selectedPlan?: Plan & { pickupType: "pickup" | "drop" };
}

const PlanSelection = ({ selectedCarType, onPlanSelect, selectedPlan }: PlanSelectionProps) => {
  const [selectedPickupType, setSelectedPickupType] = useState<"pickup" | "drop">("pickup");
  const [currentSelectedPlan, setCurrentSelectedPlan] = useState<Plan | undefined>();

  const handlePlanClick = (plan: Plan) => {
    setCurrentSelectedPlan(plan);
  };

  const handleProceed = () => {
    if (currentSelectedPlan) {
      onPlanSelect({ ...currentSelectedPlan, pickupType: selectedPickupType });
    }
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
          {plans.map((plan) => {
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
                    className="w-full"
                  >
                    {isSelected ? "Selected" : "Choose This Plan"}
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
                  onValueChange={(value) => setSelectedPickupType(value as "pickup" | "drop")}
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
export type { Plan };