"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);

      try {
        const response = await axios.get("/api/auth/admin");
        console.log(response);
        setData(response.data); // assuming your API returns some data to display
        setError("");
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
        setError(
          "Failed to fetch admin data. Please make sure you are logged in as an admin."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Display your admin-specific data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AdminDashboard;
