import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Car, Calendar, Gift, Tag, CreditCard, Check } from "lucide-react";

const PurchaseSummary = ({ selectedCarType, selectedPlan, onPayment }) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Available coupons
  const availableCoupons = [
    { code: "FIRST20", discount: 20, description: "20% off for first-time users" },
    { code: "STEAM15", discount: 15, description: "15% off on steam wash plans" },
    { code: "ECO10", discount: 10, description: "10% off for eco-friendly plans" }
  ];

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      setAppliedCoupon(coupon.code);
      setDiscount(coupon.discount);
    } else {
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode("");
  };

  const discountAmount = (selectedPlan.price * discount) / 100;
  const finalAmount = selectedPlan.price - discountAmount;

  const handlePayment = () => {
    const summary = {
      carType: selectedCarType,
      plan: selectedPlan,
      couponCode: appliedCoupon || undefined,
      discount,
      finalAmount
    };
    onPayment(summary);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Purchase Summary
          </h2>
          <p className="text-lg text-muted-foreground">
            Review your selection and complete your booking
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card className="p-6 h-fit">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Car className="h-5 w-5 mr-2 text-primary" />
              Order Details
            </h3>

            <div className="space-y-4">
              {/* Car Type */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Car Type</p>
                  <p className="text-sm text-muted-foreground">{selectedCarType.description}</p>
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                  {selectedCarType.name}
                </Badge>
              </div>

              {/* Plan */}
              <div className="p-4 bg-gradient-card rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{selectedPlan.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">₹{selectedPlan.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Valid for {selectedPlan.validity}</span>
                  </div>
                  {selectedPlan.bonusCredits > 0 && (
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 mr-2 text-secondary" />
                      <span>{selectedPlan.bonusCredits} Bonus Credit</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coupon Code */}
              <div>
                <Label htmlFor="coupon" className="text-sm font-medium text-foreground mb-2 block">
                  Coupon Code (Optional)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <Button variant="outline" onClick={removeCoupon}>
                      Remove
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={applyCoupon}>
                      Apply
                    </Button>
                  )}
                </div>
                
                {appliedCoupon && (
                  <div className="mt-2 p-2 bg-secondary/10 rounded-lg flex items-center">
                    <Check className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-sm text-secondary font-medium">
                      Coupon {appliedCoupon} applied! {discount}% discount
                    </span>
                  </div>
                )}

                {/* Available Coupons */}
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Available offers:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableCoupons.map((coupon) => (
                      <Button
                        key={coupon.code}
                        variant="ghost"
                        size="sm"
                        className="h-auto p-2 text-xs"
                        onClick={() => {
                          setCouponCode(coupon.code);
                          if (!appliedCoupon) {
                            setAppliedCoupon(coupon.code);
                            setDiscount(coupon.discount);
                          }
                        }}
                        disabled={!!appliedCoupon}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {coupon.code}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Summary */}
          <Card className="p-6 h-fit sticky top-6">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-primary" />
              Payment Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-foreground">Plan Amount</span>
                <span className="font-medium">₹{selectedPlan.price.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-secondary">
                  <span>Discount ({discount}%)</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total Amount</span>
                <span className="text-primary">₹{finalAmount.toLocaleString()}</span>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handlePayment}
                >
                  Proceed to Payment
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Secure payment powered by Razorpay/UPI
                </p>
              </div>

              {/* Summary Details */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-3">What you get:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {selectedPlan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-3 w-3 mr-2 text-secondary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {selectedPlan.features.length > 4 && (
                    <li className="text-xs text-muted-foreground italic">
                      +{selectedPlan.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PurchaseSummary;