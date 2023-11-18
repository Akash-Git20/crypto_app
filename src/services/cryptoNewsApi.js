import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'a44fee73f9msh97cb7ac368e28d4p1b42bdjsn40003e8b98c9',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
};
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
const createRequest = (url) => ({url, headers: cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
 });

 export const { useGetCryptoNewsQuery } = cryptoNewsApi;