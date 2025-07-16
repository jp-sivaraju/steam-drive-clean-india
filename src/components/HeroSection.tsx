import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Droplets, Clock, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-hero text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwSDQwVjQwSDIwVjIwWiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+Cjwvc3ZnPgo=')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Eco-Friendly Steam Technology
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Premium Car Wash
              <br />
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
              Experience the finest steam cleaning technology that delivers exceptional results while being gentle on your car and the environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Select Your Car Type
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-primary-foreground border-white/30 hover:bg-white/20">
                Learn More
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Droplets, label: "90% Less Water", value: "Used" },
                { icon: Clock, label: "30 Min", value: "Service" },
                { icon: Shield, label: "100%", value: "Safe" },
                { icon: Sparkles, label: "Eco", value: "Friendly" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-secondary" />
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <Droplets className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Steam Technology</h3>
              <p className="text-muted-foreground text-sm">
                Advanced steam cleaning that uses 90% less water while delivering superior results.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <Shield className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Eco-Friendly</h3>
              <p className="text-muted-foreground text-sm">
                Zero harsh chemicals, biodegradable products, and sustainable practices.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <Clock className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Quick Service</h3>
              <p className="text-muted-foreground text-sm">
                Professional cleaning completed in just 30 minutes with appointment booking.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Premium Care</h3>
              <p className="text-muted-foreground text-sm">
                Meticulous attention to detail from exterior washing to interior cleaning.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;