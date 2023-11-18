import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'a44fee73f9msh97cb7ac368e28d4p1b42bdjsn40003e8b98c9',
};
//a44fee73f9msh97cb7ac368e28d4p1b42bdjsn40003e8b98c9'
const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url) => ({url, headers: cryptoApiHeaders});


export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        }),
        getCryptoDetails : builder.query({
            query : (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory : builder.query({
            query : ({coinId, timeperiod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        }),
        getExchanges : builder.query({
            query : () => createRequest(`/exchanges`)
        }),
    })
 });


 export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } = cryptoApi;














// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     // params: {
//     //   referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     //   timePeriod: '24h',
//     //   'tiers[0]': '1',
//     //   orderBy: 'marketCap',
//     //   orderDirection: 'desc',
//     //   limit: '50',
//     //   offset: '0'
//     // },
//     headers: {
//       'X-RapidAPI-Key': 'a44fee73f9msh97cb7ac368e28d4p1b42bdjsn40003e8b98c9',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };
  

