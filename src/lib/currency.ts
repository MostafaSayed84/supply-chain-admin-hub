export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatCurrencyCompact = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M ر.س`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K ر.س`;
  }
  return formatCurrency(amount);
};