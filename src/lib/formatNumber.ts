export const formatNumber = (value: number) => {
    const formatedNumber = Math.round((value + Number.EPSILON) * 100) / 100;
    return formatedNumber;
};
