import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsStock from 'highcharts/modules/stock';

HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
HighchartsStock(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  Highcharts: typeof Highcharts = Highcharts;
  generateRealisticCandleData(): number[][] {
    const data: number[][] = [];
    let currentDate = 1619750400000; // Start date
    let prevClose = 125; // Initial closing price

    for (let i = 0; i < 10000; i++) {
      const open = prevClose + (Math.random() - 0.5) * 2; // Small variation from previous close
      const close = open + (Math.random() - 0.5) * 4; // More variation during the day
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;

      data.push([currentDate, open, high, low, close]);
      currentDate += 60000; // Increment date by 1 minute
      prevClose = close; // Set current close as previous close for next iteration
    }

    return data;
  }
  CandleData = this.generateRealisticCandleData();
  last100Candles = this.CandleData.slice(-100);
  minDate = this.last100Candles.reduce((min, current) => {
      const currentDate = current[0]; // Assuming the date is the first element in each candle data array
      return currentDate < min ? currentDate : min;
  }, Infinity);
  maxDate =  this.last100Candles.reduce((max, current) => {
      const currentDate = current[0]; // Assuming the date is the first element in each candle data array
      return currentDate > max ? currentDate : max;
  }, -Infinity);

  chartOptions: Highcharts.Options = {
    xAxis: {
      type: 'datetime',
      min: this.minDate, 
      max: this.maxDate,
    },
    chart: {
     panning:{
      enabled:true,
      type:'x'
     },
     panKey: 'shift',
     zooming:{
      type:'x',
      
     },
  
    },
    title: {
      text: 'AAPL Stock Price'
    },
    series: [
      {
        type: 'candlestick',
        name: 'AAPL',
        data: this.CandleData,
        color: 'green', 
        upColor: 'red', 
      },
      {
        type: 'line',
        name: '',
        data: [
          ...Array.from({ length: 100 }, (_, index) => [
            1619750400000 + index * 60000,
            Math.random() * (130 - 120) + 120
          ]
        )
        ],
        color: 'blue',
      }
    ]
  };
    

};

