import React, { useEffect, useState, useCallback } from "react";
import Header from "../src/components/Header";
import fetchFestivalData from "./api/fetchFestivalData";
import MusicFestivals from "./components/MusicFestivals";
import { MusicFestival } from "./types";
import "primeicons/primeicons.css";

const App: React.FC = () => {
  // State to hold the fetched data
  const [festivalData, setFestivalData] = useState<MusicFestival[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data function
  const loadFestivalData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFestivalData();
      setFestivalData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFestivalData();
  }, [loadFestivalData]);

  // UI Rendering logic
  if (loading)
    return (
      <p>
        Loading...{" "}
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header title="Welcome to the Music Festival App" />
      <MusicFestivals festivals={festivalData} />
    </div>
  );
};

export default App;
