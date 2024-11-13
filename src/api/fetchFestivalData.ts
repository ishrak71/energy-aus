import axios from "axios";
import { MusicFestival } from "../types";

const fetchFestivalData = async (): Promise<MusicFestival[]> => {
  const url = "/codingtest/api/v1/festivals";
  try {
    const response = await axios.get<MusicFestival[]>(url);

    // Transform data to ensure it fits the expected structure
    return response.data.map((festival) => ({
      name: festival.name ?? "Played in no festivals",
      bands: festival.bands.map((band) => ({
        name: band.name,
        recordLabel: band.recordLabel ?? "Unknown Record Label",
      })),
    }));
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default fetchFestivalData;
