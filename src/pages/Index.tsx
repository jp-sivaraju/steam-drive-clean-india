import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CarTypeSelection from "@/components/CarTypeSelection";
import PlanSelection from "@/components/PlanSelection";
import PurchaseSummary from "@/components/PurchaseSummary";
import PaymentPage from "@/components/PaymentPage";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import type { CarType } from "@/components/CarTypeSelection";
import type { Plan } from "@/components/PlanSelection";
import type { OrderSummary } from "@/components/PurchaseSummary";

type AppStep = "home" | "car-selection" | "plan-selection" | "summary" | "payment" | "success";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("home");
  const [selectedCarType, setSelectedCarType] = useState<CarType | undefined>();
  const [selectedPlan, setSelectedPlan] = useState<Plan | undefined>();
  const [orderSummary, setOrderSummary] = useState<OrderSummary | undefined>();

  const handleCarTypeSelect = (carType: CarType) => {
    setSelectedCarType(carType);
    setCurrentStep("plan-selection");
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentStep("summary");
  };

  const handlePayment = (summary: OrderSummary) => {
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

  if (currentStep === "payment" && orderSummary) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
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
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-12">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Payment Successful!
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Thank you for choosing Steam & Drive Car Wash. Your booking has been confirmed!
              </p>
              <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                <p><strong>Order ID:</strong> SD-{Date.now().toString().slice(-6)}</p>
                <p><strong>Car Type:</strong> {orderSummary?.carType.name}</p>
                <p><strong>Plan:</strong> {orderSummary?.plan.name}</p>
                <p><strong>Amount Paid:</strong> ₹{orderSummary?.finalAmount.toLocaleString()}</p>
              </div>
              <button
                onClick={resetToHome}
                className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Book Another Service
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {currentStep === "home" && (
        <>
          <HeroSection />
          <CarTypeSelection
            onCarTypeSelect={handleCarTypeSelect}
            selectedCarType={selectedCarType}
          />
          <AboutSection />
          <ContactSection />
        </>
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
