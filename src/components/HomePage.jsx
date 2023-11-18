import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Row,Col, Statistic, Typography} from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const { Title } = Typography;
const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;
  if(isFetching)  return <p>Loading...</p>
  return (
    <>
    <Title level={2} className='heading'> Global Crypto Stats </Title>
    <Row> 
      <Col span = {12}> <Statistic title = "Total Cryptocurrencies" value={globalStats.total}/></Col>
      <Col span = {12}> <Statistic title = "Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
      <Col span = {12}> <Statistic title = "Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
      <Col span = {12}> <Statistic title = "Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
      <Col span = {12}> <Statistic title = "Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
    </Row>

    <div className="home-heading-container">  
      <Title level={3} className='home-title'> The top 10 best performing cryptocurrencies </Title>
      <Title level={4} className='show-more'> <Link to = "/cryptocurrencies"> Show More </Link> </Title> 
    </div>

    <Cryptocurrencies simplified = {true}/>
    <div className="home-heading-container">
      <Title level={3} className='home-title'> Latest News </Title> 
      <Title level={4} className='show-more'> <Link to = "/news"> Show More </Link> </Title> 
    </div>
    <News simplified = {true}/>
    </>
  )
};
export default Homepage;