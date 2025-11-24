import axios from 'axios';

const rawg = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAWG_BASE_URL,
  timeout: 10_000, // 10 seconds
  params: {
    key: process.env.RAWG_API_KEY,
  },
});

export default rawg;