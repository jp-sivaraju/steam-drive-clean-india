import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Contact Steam & Drive
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or ready to book? We're here to help you get the best car wash experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                Reach out to us for bookings, questions, or just to learn more about our eco-friendly car wash services.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Visit Us",
                  details: ["123 Clean Street", "Car Wash District", "Mumbai, MH 400001"]
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  details: ["+91 98765 43210", "+91 87654 32109", "Mon-Sun: 8AM-8PM"]
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  details: ["info@steamdrive.com", "support@steamdrive.com", "Response within 2 hours"]
                },
                {
                  icon: Clock,
                  title: "Operating Hours",
                  details: ["Monday - Sunday", "8:00 AM - 8:00 PM", "Holidays: 10AM-6PM"]
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-secondary-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                        <div className="space-y-1">
                          {item.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <Input placeholder="Your first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <Input placeholder="Your last name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <Input type="tel" placeholder="+91 98765 43210" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Car Type</label>
                <Input placeholder="e.g., Sedan, SUV, Hatchback" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea 
                  placeholder="Tell us about your car wash needs, preferred timing, or any questions you have..."
                  className="min-h-[120px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-secondary hover:scale-105 transition-transform"
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;