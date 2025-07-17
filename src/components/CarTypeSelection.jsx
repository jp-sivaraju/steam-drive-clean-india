import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bike, Car, Truck, Shield, Crown } from "lucide-react";

const carTypes = [
  {
    id: "bike",
    name: "BIKE",
    description: "Two Wheeler",
    examples: ["Motorcycles", "Scooters", "E-bikes"],
    icon: Bike,
    price: "From ₹200",
  },
  {
    id: "hatchback",
    name: "HATCHBACK",
    description: "Compact Cars",
    examples: ["Swift", "i10", "Punch", "Alto"],
    icon: Car,
    price: "From ₹500",
    popular: true,
  },
  {
    id: "sedan",
    name: "SEDAN",
    description: "Mid-size Cars",
    examples: ["City", "Verna", "Virtus", "Dzire"],
    icon: Car,
    price: "From ₹600",
    popular: true,
  },
  {
    id: "suv",
    name: "SUV",
    description: "Sport Utility Vehicle",
    examples: ["Nexon", "Brezza", "Venue", "Sonet"],
    icon: Truck,
    price: "From ₹700",
  },
  {
    id: "xuv",
    name: "XUV",
    description: "Large SUVs",
    examples: ["Innova", "Safari", "XUV700", "Scorpio"],
    icon: Truck,
    price: "From ₹800",
  },
  {
    id: "premium",
    name: "PREMIUM",
    description: "Luxury Vehicles",
    examples: ["Fortuner", "Benz", "BMW", "Audi"],
    icon: Crown,
    price: "From ₹1200",
  },
];

const CarTypeSelection = ({ onCarTypeSelect, selectedCarType }) => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Select Your Car Type
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your vehicle type to see our specialized cleaning packages designed for your car.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carTypes.map((carType) => {
            const IconComponent = carType.icon;
            const isSelected = selectedCarType?.id === carType.id;
            
            return (
              <Card
                key={carType.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-primary/20"
                    : "border-border hover:border-primary/50 bg-card"
                } ${carType.popular ? "ring-2 ring-primary/30" : ""}`}
                onClick={() => onCarTypeSelect(carType)}
              >
                <div className="p-6 text-center">
                  {carType.popular && (
                    <Badge className="mb-4 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className={`mb-4 ${isSelected ? "text-primary" : "text-primary"}`}>
                    <IconComponent className="h-16 w-16 mx-auto" />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {carType.name}
                  </h3>
                  
                  <p className={`text-sm mb-3 ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                    {carType.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className={`text-xs mb-2 ${isSelected ? "text-muted-foreground" : "text-muted-foreground"}`}>
                      Examples:
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {carType.examples.slice(0, 4).map((example, index) => (
                        <Badge
                          key={index}
                          variant={isSelected ? "default" : "outline"}
                          className="text-xs"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`text-lg font-semibold mb-4 ${isSelected ? "text-primary" : "text-primary"}`}>
                    {carType.price}
                  </div>
                  
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className="w-full"
                    size="sm"
                  >
                    {isSelected ? "Selected" : "Select This Type"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {selectedCarType && (
          <div className="mt-12 text-center">
            <Card className="inline-block p-6 bg-card border-primary/20">
              <p className="text-lg font-medium text-foreground mb-2">
                Great choice! You selected: <span className="text-primary font-bold">{selectedCarType.name}</span>
              </p>
              <p className="text-muted-foreground">
                Now let's choose the perfect cleaning plan for your {selectedCarType.description.toLowerCase()}.
              </p>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarTypeSelection;