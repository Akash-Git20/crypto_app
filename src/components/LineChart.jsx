import React from 'react';
import { Line } from 'react-chartjs-2';
import { Row, Col, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

const {Title : title} = Typography;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export default function LineChart({coinHistory, currentPrice, coinName}) {
  const coinPrice = [] ;
  const  coinTimeStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp).toJSON());
  }
  console.log("hello");
  console.log(coinPrice); 
  const data = {
    labels : coinTimeStamp,
    datasets : [{
        label : 'Price in United States Dollar(USD)',
        data : coinPrice,
        fill:false,
        backgroundColor: '#0071bd',
        borderColor : '#0071bd',
    }]
  };
 

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Chart.js Line Chart"
      }
    }
  };
  

  return (
    <>
        <Row className='chart-header'>
            <title  level={3} className='chart-title'> { coinName } Price Chart</title> 
            <Col className='price-container'>
                <title level={5} className='price-change'> { coinHistory?.data?.change} %</title>
                <title level={5} className='current-price'> Current {coinName} Price: $ {currentPrice}</title>
            </Col>
        </Row>
        <Line data={data} options={options}/>       
        
    </>
  )
}
