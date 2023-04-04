export const useConvertPriceEstate = (priceEstate: string) => {
    const price = Number(priceEstate);
    return Math.abs(price) >= 1.0e9
        ? (Math.abs(price) / 1.0e9).toFixed(2) + " Tỷ"
        : Math.abs(price) >= 1.0e6
        ? (Math.abs(price) / 1.0e6).toFixed(2) + " Triệu"
        : Math.abs(price) >= 1.0e3
        ? (Math.abs(price) / 1.0e3).toFixed(2) + " Nghìn"
        : Math.abs(price);
};
