export const getAuthHeaders = (
  isJsonRequest = false,
): Record<string, string> => {
  const id = "01JJXC80TB5QJW45QSGYX1YJDM";

  if (!id) {
    console.warn("No token available for authorization.");

    return {};
  }

  const headers: Record<string, string> = {
    "User-ID": id,
  };

  if (isJsonRequest) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};
