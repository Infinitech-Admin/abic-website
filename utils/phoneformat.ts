export const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
};