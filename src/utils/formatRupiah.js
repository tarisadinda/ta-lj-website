export const formatRupiah = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // Set the minimum fraction digits for cents
    });
  
    return formatter.format(amount);
  };