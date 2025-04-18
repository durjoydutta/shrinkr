import { useEffect, useState } from "react";
import { resolveUrl } from "../services/api";
import { showToast } from "./Toast";

interface RedirectProps {
  shortCode: string;
}

const Redirect = ({ shortCode }: RedirectProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      try {
        const longUrl = await resolveUrl(shortCode);
        
        // Use window.location.replace for proper redirection
        window.location.replace(longUrl);
      } catch (error) {
        console.error("Redirect error:", error);
        showToast("Invalid or expired URL", "error");
        // Redirect to home page after error
        window.location.replace("/");
      } finally {
        setIsLoading(false);
      }
    };

    redirect();
  }, [shortCode]);

  return (
    <div className="app-container">
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        {isLoading ? (
          <p>Redirecting...</p>
        ) : (
          <p>If you are not redirected automatically, please wait a moment...</p>
        )}
      </div>
    </div>
  );
};

export default Redirect;