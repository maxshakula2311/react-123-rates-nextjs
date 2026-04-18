import axios from 'axios';

interface GetUserInfoParams {
  latitude: number;
  longitude: number;
}

type OpencageCurrency = {
  iso_code: string;
  name: string;
  symbol: string;
};
type OpencageResult = {
  annotations: {currency: OpencageCurrency}
};
type OpencageResponse = {
  results: OpencageResult[];
};

export const getUserInfo = async ({ latitude, longitude }: GetUserInfoParams): Promise<OpencageResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<OpencageResponse>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
