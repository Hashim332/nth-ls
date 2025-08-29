import axios from "axios";

export async function getUrl(url: string) {
  return axios.post(`${import.meta.env.VITE_API_URL}/shorten`, { url });
}
