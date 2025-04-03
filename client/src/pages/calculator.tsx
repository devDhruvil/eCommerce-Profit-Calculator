import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculationSchema, type Calculation } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { calculateProfit, formatCurrency } from "@/lib/calculator";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";

export default function Calculator() {
  const [includeTaxes, setIncludeTaxes] = useState(false);
  const { theme, setTheme } = useTheme();

  const form = useForm<Calculation>({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      productQuantity: 1,
      costs: {
        productCost: 0,
        shippingCost: 0,
        packagingCost: 0,
        marketingCost: 0,
        platformFees: 0,
        additionalCosts: 0,
      },
      pricing: {
        sellingPrice: 0,
      },
      includeTaxes: false,
      taxAndFees: {
        gstRate: 18,
        paymentGatewayRate: 2,
      },
    },
  });

  const { watch } = form;
  const formValues = watch();

  const results = calculateProfit(
    formValues.costs,
    formValues.pricing.sellingPrice,
    includeTaxes ? formValues.taxAndFees : undefined
  );

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            eCommerce Profit Calculator
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <Form {...form}>
          <form className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="productQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Quantity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            min="1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pricing.sellingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selling Price (₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.keys(form.getValues().costs).map((costKey) => (
                    <FormField
                      key={costKey}
                      control={form.control}
                      name={`costs.${costKey}` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {costKey
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profit Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Total Costs</Label>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(results.totalCosts)}
                      </p>
                    </div>
                    <div>
                      <Label>Profit Per Product</Label>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(results.profitPerProduct)}
                      </p>
                    </div>
                    <div>
                      <Label>Profit Margin</Label>
                      <p className="text-2xl font-bold text-primary">
                        {results.profitMargin.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <Label>Break-even Units</Label>
                      <p className="text-2xl font-bold text-primary">
                        {results.breakEvenUnits}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Suggested Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>20% Margin</Label>
                      <p className="text-xl font-semibold">
                        {formatCurrency(results.suggestedPricing.profit20)}
                      </p>
                    </div>
                    <div>
                      <Label>30% Margin</Label>
                      <p className="text-xl font-semibold">
                        {formatCurrency(results.suggestedPricing.profit30)}
                      </p>
                    </div>
                    <div>
                      <Label>50% Margin</Label>
                      <p className="text-xl font-semibold">
                        {formatCurrency(results.suggestedPricing.profit50)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax & Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={includeTaxes}
                      onCheckedChange={setIncludeTaxes}
                    />
                    <Label>Include Tax & Fees</Label>
                  </div>

                  {includeTaxes && (
                    <div className="space-y-4 mt-4">
                      <FormField
                        control={form.control}
                        name="taxAndFees.gstRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GST Rate (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="taxAndFees.paymentGatewayRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Gateway Fee (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}