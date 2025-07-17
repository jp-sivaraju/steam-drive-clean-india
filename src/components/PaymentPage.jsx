import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Smartphone, Building, ArrowLeft, Shield, Clock } from "lucide-react";

const PaymentPage = ({ orderSummary, onBack, onPaymentComplete }) => {
  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay accepted",
      popular: true
    },
    {
      id: "upi",
      name: "UPI Payment",
      icon: Smartphone,
      description: "PhonePe, GPay, Paytm, BHIM UPI",
      popular: true
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks supported"
    }
  ];

  const handlePayment = (method) => {
    // Simulate payment process
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Summary
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Complete Your Payment
          </h1>
          <p className="text-muted-foreground">
            Secure payment for your car wash service
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Choose Payment Method
              </h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <Card
                      key={method.id}
                      className="p-4 cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:shadow-primary"
                      onClick={() => handlePayment(method.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-primary-foreground" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground">{method.name}</h3>
                            {method.popular && (
                              <Badge className="bg-secondary text-secondary-foreground">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Security Info */}
            <Card className="p-6 bg-gradient-card border-green-200">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-secondary mr-2" />
                <h3 className="font-semibold text-foreground">Secure Payment</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 256-bit SSL encryption</p>
                <p>• PCI DSS compliant</p>
                <p>• Your card details are never stored</p>
                <p>• Instant payment confirmation</p>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Car & Plan Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Car Type</p>
                    <p className="text-sm text-muted-foreground">{orderSummary.carType.description}</p>
                  </div>
                  <Badge variant="outline">{orderSummary.carType.name}</Badge>
                </div>

                <div className="p-3 bg-gradient-card rounded-lg border">
                  <p className="font-semibold text-foreground mb-1">{orderSummary.plan.name}</p>
                  <p className="text-sm text-muted-foreground mb-3">{orderSummary.plan.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>Valid for {orderSummary.plan.validity}</span>
                    </div>
                    {orderSummary.plan.bonusCredits > 0 && (
                      <div className="flex items-center">
                        <Check className="h-3 w-3 mr-1 text-secondary" />
                        <span>{orderSummary.plan.bonusCredits} Bonus Credit</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3 my-6">
                <div className="flex justify-between">
                  <span className="text-foreground">Plan Amount</span>
                  <span>₹{orderSummary.plan.price.toLocaleString()}</span>
                </div>

                {orderSummary.discount > 0 && (
                  <>
                    <div className="flex justify-between text-secondary">
                      <span>Discount ({orderSummary.discount}%)</span>
                      <span>-₹{((orderSummary.plan.price * orderSummary.discount) / 100).toLocaleString()}</span>
                    </div>
                    {orderSummary.couponCode && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Coupon Code</span>
                        <span className="font-mono">{orderSummary.couponCode}</span>
                      </div>
                    )}
                  </>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total Amount</span>
                  <span className="text-primary">₹{orderSummary.finalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* What You Get */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-3">What you get:</h4>
                <ul className="space-y-2 text-sm">
                  {orderSummary.plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <Check className="h-3 w-3 mr-2 text-secondary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground mb-4">
                  By proceeding, you agree to our Terms & Conditions
                </p>
                <Button variant="hero" size="lg" className="w-full">
                  Pay ₹{orderSummary.finalAmount.toLocaleString()}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;