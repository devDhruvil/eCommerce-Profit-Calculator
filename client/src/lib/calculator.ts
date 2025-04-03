interface ProfitBreakdown {
  totalCosts: number;
  profitPerProduct: number;
  profitMargin: number;
  breakEvenUnits: number;
  suggestedPricing: {
    profit20: number;
    profit30: number;
    profit50: number;
  };
}

export function calculateProfit(
  costs: {
    productCost: number;
    shippingCost: number;
    packagingCost: number;
    marketingCost: number;
    platformFees: number;
    additionalCosts: number;
  },
  sellingPrice: number,
  taxSettings?: {
    gstRate: number;
    paymentGatewayRate: number;
  }
): ProfitBreakdown {
  // Calculate total base costs
  const totalBaseCosts = 
    costs.productCost +
    costs.shippingCost +
    costs.packagingCost +
    costs.marketingCost +
    costs.platformFees +
    costs.additionalCosts;

  // Add tax calculations if enabled
  let totalCosts = totalBaseCosts;
  if (taxSettings) {
    const gstAmount = sellingPrice * (taxSettings.gstRate / 100);
    const paymentFees = sellingPrice * (taxSettings.paymentGatewayRate / 100);
    totalCosts += gstAmount + paymentFees;
  }

  // Calculate profit metrics
  const profitPerProduct = sellingPrice - totalCosts;
  const profitMargin = (profitPerProduct / sellingPrice) * 100;

  // Calculate break-even units
  const breakEvenUnits = Math.ceil(totalCosts / (sellingPrice - totalBaseCosts));

  // Calculate suggested pricing for different profit margins
  const getSuggestedPrice = (targetMargin: number) => {
    return totalBaseCosts / (1 - targetMargin / 100);
  };

  return {
    totalCosts,
    profitPerProduct,
    profitMargin,
    breakEvenUnits,
    suggestedPricing: {
      profit20: getSuggestedPrice(20),
      profit30: getSuggestedPrice(30),
      profit50: getSuggestedPrice(50),
    },
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
