"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";

interface ProfileContextValue {
  token: string | null;
  setToken: (token: string | null) => void;
  firmdata: any[];
}

// Create ProfileContext
const ProfileContext = createContext<ProfileContextValue | null>(null);

// Custom hook to use the ProfileContext
export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};

// Helper function to check token expiry based on 'expires_in'
const isTokenExpired = (
  token: string | null,
  tokenTimestamp: number | null
) => {
  if (!token || !tokenTimestamp) return true;

  const currentTime = Date.now();
  return currentTime > tokenTimestamp;
};

// ProfileProvider component
export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [firmdata, setFirmdata] = useState<any[]>([]);

  // Function to get firm data
  const getFirmdata = async () => {
    try {
      const response = await axios.get("/api/profileapi");
      setFirmdata(response?.data?.value);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  };

  // Load token from cookies on initial load
  useEffect(() => {
    const savedToken = Cookie.get("authToken");
    const savedTimestamp = Number(Cookie.get("authTokenTimestamp"));
    if (savedToken && !isTokenExpired(savedToken, savedTimestamp)) {
      setTokenState(savedToken);
    } else {
      fetchNewToken();
    }
  }, []);

  // Fetch a new token from the API if expired or not available
  const fetchNewToken = async () => {
    try {
      const response = await axios.post("/api/profileapi");
      const data = response.data;
      if (data && data.access_token) {
        console.log("Token fetched successfully", data.access_token);
        const tokenExpiryTimestamp = Date.now() + data.expires_in * 1000; // Calculate the expiry time based on `expires_in`
        setTokenAndSave(data.access_token, tokenExpiryTimestamp);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching token:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error fetching token:", error);
      }
    }
  };

  // Set token and expiration timestamp, save to cookies
  const setTokenAndSave = (
    newToken: string | null,
    expiryTimestamp: number
  ) => {
    if (newToken) {
      // Set the cookie expiration based on the `expires_in` value (not a fixed 7 days)
      Cookie.set("authToken", newToken, {
        expires: expiryTimestamp / (1000 * 60 * 60 * 24),
      }); // Convert ms to days
      Cookie.set("authTokenTimestamp", expiryTimestamp.toString(), {
        expires: expiryTimestamp / (1000 * 60 * 60 * 24),
      });
    } else {
      Cookie.remove("authToken");
      Cookie.remove("authTokenTimestamp");
    }
    setTokenState(newToken); // Only pass the token to the setter
  };

  // Custom setToken function to match the expected signature
  const setToken = (token: string | null) => {
    setTokenState(token);
  };

  // Fetch firm data after token is available and valid
  useEffect(() => {
    if (
      token &&
      !isTokenExpired(token, Number(Cookie.get("authTokenTimestamp")))
    ) {
      getFirmdata();
    }
  }, [token]); // Only trigger when token changes

  return (
    <ProfileContext.Provider value={{ token, setToken, firmdata }}>
      {children}
    </ProfileContext.Provider>
  );
};
