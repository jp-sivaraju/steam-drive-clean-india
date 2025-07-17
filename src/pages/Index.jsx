import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CarTypeSelection from "@/components/CarTypeSelection";
import PlanSelection from "@/components/PlanSelection";
import PurchaseSummary from "@/components/PurchaseSummary";
import PaymentPage from "@/components/PaymentPage";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [currentStep, setCurrentStep] = useState("home");
  const [selectedCarType, setSelectedCarType] = useState(undefined);
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [orderSummary, setOrderSummary] = useState(undefined);

  const handleCarTypeSelect = (carType) => {
    setSelectedCarType(carType);
    setCurrentStep("plan-selection");
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCurrentStep("summary");
  };

  const handlePayment = (summary) => {
    setOrderSummary(summary);
    setCurrentStep("payment");
  };

  const handlePaymentComplete = () => {
    setCurrentStep("success");
  };

  const handleBackToSummary = () => {
    setCurrentStep("summary");
  };

  const resetToHome = () => {
    setCurrentStep("home");
    setSelectedCarType(undefined);
    setSelectedPlan(undefined);
    setOrderSummary(undefined);
  };

  const handleGetStarted = () => {
    setCurrentStep("car-selection");
  };

  const handleBackToHome = () => {
    setCurrentStep("home");
    // Reset all selections when going back to home
    setSelectedCarType(undefined);
    setSelectedPlan(undefined);
    setOrderSummary(undefined);
  };

  if (currentStep === "payment" && orderSummary) {
    return (
      <div className="min-h-screen bg-background dark-pattern">
        <Navbar 
          currentStep={currentStep} 
          onNavigateHome={handleBackToHome}
          showBackToHome={true}
        />
        <PaymentPage
          orderSummary={orderSummary}
          onBack={handleBackToSummary}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    );
  }

  if (currentStep === "success") {
    return (
      <div className="min-h-screen bg-background dark-pattern">
        <Navbar 
          currentStep={currentStep} 
          onNavigateHome={resetToHome}
          showBackToHome={true}
        />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-card border border-border rounded-2xl p-12 shadow-elegant">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Payment Successful!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for choosing Steam & Drive Car Wash. Your booking has been confirmed!
              </p>
              <div className="space-y-4 text-left max-w-md mx-auto mb-8 bg-muted/20 p-6 rounded-lg">
                <p className="text-foreground"><strong>Order ID:</strong> SD-{Date.now().toString().slice(-6)}</p>
                <p className="text-foreground"><strong>Car Type:</strong> {orderSummary?.carType.name}</p>
                <p className="text-foreground"><strong>Plan:</strong> {orderSummary?.plan.name}</p>
                <p className="text-foreground"><strong>Amount Paid:</strong> ₹{orderSummary?.finalAmount.toLocaleString()}</p>
              </div>
              <Button
                onClick={resetToHome}
                variant="default"
                className="bg-gradient-primary px-8 py-3 font-semibold hover:scale-105 transition-transform"
              >
                Book Another Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark-pattern">
      <Navbar 
        currentStep={currentStep}
        onNavigateHome={handleBackToHome}
        showBackToHome={currentStep !== "home"}
      />
      
      {currentStep === "home" && (
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          <CarTypeSelection
            onCarTypeSelect={handleCarTypeSelect}
            selectedCarType={selectedCarType}
          />
          <AboutSection />
          <ContactSection />
        </>
      )}

      {currentStep === "car-selection" && (
        <div className="pt-16">
          <CarTypeSelection
            onCarTypeSelect={handleCarTypeSelect}
            selectedCarType={selectedCarType}
          />
        </div>
      )}

      {currentStep === "plan-selection" && selectedCarType && (
        <div className="pt-16">
          <PlanSelection
            selectedCarType={selectedCarType}
            onPlanSelect={handlePlanSelect}
            selectedPlan={selectedPlan}
          />
        </div>
      )}

      {currentStep === "summary" && selectedCarType && selectedPlan && (
        <div className="pt-16">
          <PurchaseSummary
            selectedCarType={selectedCarType}
            selectedPlan={selectedPlan}
            onPayment={handlePayment}
          />
        </div>
      )}
    </div>
  );
};

export default Index;