export const getStatusClass = (status: string) => {
    switch (status) {
        case "Pending": return "bg-purple-200 text-purple-700";
        case "Responded": return "bg-yellow-200 text-yellow-700";
        case "Contacted": return "bg-green-200 text-gray-700";
        case "Converted": return "bg-blue-200 text-blue-700";
        default: return "bg-gray-200 text-gray-700";
    }
};