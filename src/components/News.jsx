import React, {useState }from 'react'
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';


const { Title, Text } = Typography;
const {Option} = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
export default function News({simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const {data : cryptoNews} = useGetCryptoNewsQuery({newsCategory : newsCategory, count : simplified ? 10 : 100});
  const {data} = useGetCryptosQuery();
  if(!cryptoNews?.value) return <Loader/>

  return (
    <>
      {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder="Select a Crypto"
              optionFilterProp='child'
              onChange={(value) => {
                setNewsCategory(value);
              }}
              filterOption={(input, option) => option.child.toLowerCase().indexOf(input.toLowerCase())}
            >
              <Option value="cryptocurrency"> Cryptocurrency </Option>
              {data ?. data ?. coins.map((coin) => <Option value={coin.name}> {coin.name} </Option>)}
            </Select>
          </Col>
      )}
      <Row gutter={[15, 15]}>
          {cryptoNews.value.map((news, ind) => (
              <Col xs={24} sm={12} lg={8} key={ind}>
                <Card hoverable className='news-card'>
                    <a href={news.url} target='_blank' rel="noreferrer">
                        <div className="news-image-container">
                          <Title className='news-title' level={4}> {news.name} </Title>
                          <img style={{maxWidth:'200px', maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="News" />
                        </div>
                        <p>
                          {news.description > 100 ? `${news.description.substring(0, 100)}...`:
                          news.description}
                        </p>
                        <div className="provider-container">
                          <div>
                            <Avatar src = {news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=''/>
                            <Text className='provider-name'> {news.provider[0]?.name}</Text>
                          </div>
                            <Text> {moment(news.datePublished).startOf('ss').fromNow()}</Text>
                        </div>
                    </a>
                </Card>
              </Col>
          ))}
      </Row>
    </>
  )
}
