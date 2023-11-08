export const requestOptions = (method: string, payload?: string | Object) => {
  const jwt = localStorage.getItem("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };
  if (method === "GET" || method === "DELETE") {
    return {
      method: method,
      headers: headers,
    };
  } else if (method === "POST" || method === "PUT") {
    return {
      method: method,
      headers: headers,
      body: JSON.stringify(payload),
    };
  } else {
    return {
      Error: "Invalid requestOptions() call",
    };
  }
};
