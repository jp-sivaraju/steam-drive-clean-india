import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Car, Droplets, Home, User } from "lucide-react";

const Navbar = ({ currentStep = "home", onNavigateHome, showBackToHome = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleBackToHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    setIsOpen(false);
  };

  const scrollToSection = (href) => {
    if (currentStep !== "home" && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleBackToHome}>
            <div className="relative">
              <Car className="h-8 w-8 text-primary" />
              <Droplets className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Steam & Drive</h1>
              <p className="text-xs text-muted-foreground">Car Wash</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {showBackToHome && (
              <Button 
                variant="ghost" 
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-foreground hover:text-primary"
              >
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            )}
            {currentStep === "home" && navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Link to="/consumer-login">
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              {showBackToHome && (
                <Button 
                  variant="ghost" 
                  onClick={handleBackToHome}
                  className="w-full justify-start flex items-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </Button>
              )}
              {currentStep === "home" && navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 py-2">
                <Link to="/consumer-login" className="block">
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;