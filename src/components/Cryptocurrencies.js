import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Statistic, Typography } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
const {Title} = Typography;
const {Search} = Input;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const {data : cryptosList, isFetching} = useGetCryptosQuery();  
  const [cryptos, setCryptos] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');
  // console.log(cryptos);
  const onSearch = (value) => setSearchTerm(value.toLowerCase());

  useEffect(() => {
      setCryptos(cryptosList?.data?.coins);
      const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
      setCryptos(filteredData);
  }, [cryptosList, searchTerm]);


  if(isFetching)  return <Loader />
  return (
    <>  
      {!(simplified) &&
        (<div className="search-crypto">
          <Search
            placeholder="Search Cryptocurrency"
            enterButton
            allowClear
            size = "large"
            onSearch={onSearch}
          />
        </div>)
      }
      <Row gutter={[10, 20]} className='crypto-card-container'>  
          {cryptos?.slice(0, count).map((currency) => (
            <Col xs = {24} sm ={12} lg = {6} className='crypto-card' key = {currency.uuid}>
                <Link key = {currency.uuid} to={`/crypto/${currency.uuid}`}>
                    <Card
                      title={`${currency.rank}. ${currency.name}`}
                      extra = {<img className='crypto-image' src = {currency.iconUrl}/>}
                      hoverable
                    >
                      <Col span={24}> <Statistic title = "Price" value={millify(currency.price)}/></Col>
                      {/* <p>Market Cap : </p> */}
                      <Col span = {24}> <Statistic title = "Market Cap" value={millify(currency.marketCap)}/></Col>
                      {/* <p>Daily Change : {millify(currency.change)}%</p> */}
                    </Card>
                </Link>
            </Col >
          ))}
      </Row> 
    </>
  )
};

export default Cryptocurrencies;
