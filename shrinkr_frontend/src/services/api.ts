import { config } from "../config/env.config";

//API service for interacting with the backend

/**
 * Shortens a URL using the backend API
 * @param longUrl The original URL to shorten
 * @param customCode Optional custom short code
 * @returns The short code for the shortened URL
 */
export const shortenUrl = async (
  longUrl: string,
  customCode?: string
): Promise<string> => {
  try {
    const response = await fetch(`${config.apiUrl}/api/v1/url/create-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        longUrl,
        shortCode: customCode || undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data.shortCode || customCode || undefined;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Gets analytics for a shortened URL (if supported by backend)
 * @param shortCode The short code to get analytics for
 * @returns Analytics data
 */
export const getUrlAnalytics = async (shortCode: string) => {
  try {
    const response = await fetch(
      `${config.apiUrl}/api/v1/url/analytics/${shortCode}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Resolves a short URL to its original URL
 * @param shortCode The short code to resolve
 * @returns The original long URL
 */
export const resolveUrl = async (shortCode: string): Promise<string> => {
  try {
    // Ensure shortCode is properly formatted
    const sanitizedShortCode = shortCode.trim();
    const response = await fetch(
      `${config.apiUrl}/api/v1/url/${sanitizedShortCode}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    let longUrl = data.longUrl;
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      longUrl = "https://" + longUrl;
    }
    return longUrl;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
