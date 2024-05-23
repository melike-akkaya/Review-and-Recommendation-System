import React from "react";

const restCountriesAPI = "https://restcountries.com/v3.1/all";

export const fetchCountries = async (setCountries) => {
  try {
    const response = await fetch(restCountriesAPI);
    if (response.ok) {
      const data = await response.json();
      const countryList = data.map((country) => ({
        value: country.name.common.toLowerCase(),
        label: country.name.common,
      }));
      const sortedCountries = countryList.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setCountries(sortedCountries);
    } else {
      console.error("Failed to fetch countries");
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const fileToBlob = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type: file.type });
      resolve(blob);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const useLocalStorageUser = () => {
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  React.useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return user;
};

export const roles = [
  "USER",
  "COMMUNITY_MODERATOR",
  "ADMIN",
  "INFLUENCER",
];
