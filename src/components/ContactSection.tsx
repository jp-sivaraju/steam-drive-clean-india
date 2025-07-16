
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      detail: "+91 8499078968",
      description: "Call us for immediate assistance",
      action: "tel:+918499078968"
    },
    {
      icon: Mail,
      title: "Email",
      detail: "support@steamanddrive.com",
      description: "Get support via email",
      action: "mailto:support@steamanddrive.com"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "Hyderabad, Telangana, India",
      description: "We serve across Hyderabad",
      action: "#"
    }
  ];

  const workingHours = [
    { days: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
    { days: "Saturday - Sunday", hours: "8:00 AM - 9:00 PM" }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or ready to book your next steam wash? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Steam and Drive Car Wash
              </h3>
              <p className="text-muted-foreground mb-8">
                Premium car wash services in Hyderabad with eco-friendly steam technology.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="p-4 hover:scale-105 transition-transform duration-300 bg-gradient-card border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{info.title}</h4>
                        <p className="text-primary font-semibold">{info.detail}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                      {info.action !== "#" && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={info.action}>Contact</a>
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Working Hours */}
            <Card className="p-6 bg-gradient-secondary text-secondary-foreground">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 mr-2" />
                <h4 className="text-lg font-semibold">Working Hours</h4>
              </div>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{schedule.days}</span>
                    <span>{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Service Areas */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Service Areas in Hyderabad</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                {[
                  "Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitech City",
                  "Kondapur", "Madhapur", "Kukatpally", "Miyapur",
                  "Secunderabad", "Begumpet", "Ameerpet", "Dilsukhnagar"
                ].map((area, index) => (
                  <div key={index} className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-primary" />
                    {area}
                  </div>
                ))}
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="p-6 border-l-4 border-l-secondary">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Emergency Service
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Need urgent car cleaning? We offer same-day service for emergency bookings.
              </p>
              <Button variant="secondary" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency Line
              </Button>
            </Card>

            <Card className="p-6 bg-gradient-hero text-primary-foreground text-center">
              <h3 className="text-xl font-semibold mb-4">Chat with Support</h3>
              <p className="mb-6 text-primary-foreground/80">
                Have questions about our services? Our support team is here to help.
              </p>
              <Button variant="outline" size="lg" className="w-full bg-white/10 text-primary-foreground border-white/30 hover:bg-white/20">
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Chat
              </Button>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-6 bg-gradient-card border-primary/20">
            <p className="text-foreground mb-4">
              <strong>Special Offer:</strong> First-time customers get 20% off with code <span className="text-primary font-mono">FIRST20</span>
            </p>
            <Button variant="hero">
              Claim Your Discount
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
