import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Users, Leaf, Zap, Shield, Clock } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Advanced Technology",
      description: "Our steam cleaning technology delivers a deep, effective clean using minimal water and zero harsh chemicals.",
      highlight: "90% Less Water Used"
    },
    {
      icon: Users,
      title: "Professional Care",
      description: "From exterior detailing to interior cleaning, our team treats every vehicle with meticulous attention.",
      highlight: "Expert Team"
    },
    {
      icon: Leaf,
      title: "Eco-Conscious",
      description: "We're committed to sustainable practices, using non-toxic methods and conserving water with every service.",
      highlight: "100% Eco-Friendly"
    },
    {
      icon: Droplets,
      title: "Green Future",
      description: "Our steam technology significantly reduces water consumption compared to traditional car washes, helping preserve our precious water resources.",
      highlight: "Water Conservation"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary text-secondary-foreground">
            About Steam & Drive
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Premium, Eco-Friendly Car Washing Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            That protects both your vehicle and the environment with cutting-edge steam technology and professional care.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:scale-105 transition-transform duration-300 bg-gradient-card border-border/50 hover:shadow-elegant"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <Badge variant="outline" className="text-primary border-primary/50">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Story & Mission
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Steam and Drive Car Wash, we believe in delivering more than just a clean car. Founded with a passion for innovation and sustainability, we specialize in advanced steam cleaning technology that uses minimal water while providing a deep, thorough clean for every inch of your vehicle.
              </p>
              <p>
                Our professional team ensures that every detail is attended to using non-toxic, high-efficiency methods. Steam and Drive provides convenient, high-quality service tailored to your needs.
              </p>
              <p>
                We're proud to serve a growing community of customers who value efficiency, cleanliness, and eco-responsibility. Experience the smarter way to shine.
              </p>
            </div>
          </div>

          <Card className="p-8 bg-gradient-hero text-primary-foreground">
            <h4 className="text-xl font-semibold mb-6">Why Choose Steam & Drive?</h4>
            <div className="space-y-4">
              {[
                { icon: Shield, text: "100% Safe & Non-toxic cleaning" },
                { icon: Clock, text: "Quick 30-minute service" },
                { icon: Droplets, text: "90% water conservation" },
                { icon: Leaf, text: "Eco-friendly processes" },
                { icon: Users, text: "Professional expert team" },
                { icon: Zap, text: "Advanced steam technology" }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;