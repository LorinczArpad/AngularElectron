// src/app/chart/chart.component.ts
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { createChart, IChartApi, ISeriesApi, LineData, CandlestickData, ColorType } from 'lightweight-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart!: IChartApi;
  private candlestickSeries!: ISeriesApi<'Candlestick'>;
  private lineSeries!: ISeriesApi<'Line'>;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: 400,
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#1E1E1E', // Dark background color
        },
        textColor: '#D3D3D3',       // Light text color for contrast
      },
      grid: {
        vertLines: {
          color: '#2B2B2B',
        },
        horzLines: {
          color: '#2B2B2B',
        },
      },
      crosshair: {
        mode: 1, // Optional: improve visibility of crosshair
      },
    });

    this.candlestickSeries = this.chart.addCandlestickSeries();
    this.candlestickSeries.setData([
      { time: '2022-01-01', open: 100, high: 110, low: 90, close: 105 },
      { time: '2022-01-02', open: 105, high: 115, low: 95, close: 100 },
      { time: '2022-01-03', open: 100, high: 120, low: 90, close: 110 },
      { time: '2022-01-04', open: 110, high: 130, low: 100, close: 120 },
      { time: '2022-01-05', open: 120, high: 140, low: 110, close: 130 },
    ]);

    this.lineSeries = this.chart.addLineSeries({
      color: 'blue',
      lineWidth: 2,
    });

    this.lineSeries.setData([
      { time: '2022-01-01', value: 102 },
      { time: '2022-01-02', value: 104 },
      { time: '2022-01-03', value: 106 },
      { time: '2022-01-04', value: 108 },
      { time: '2022-01-05', value: 110 },
    ]);

    // Resize chart when window is resized
    window.addEventListener('resize', () => {
      this.chart.resize(this.chartContainer.nativeElement.clientWidth, 400);
    });
  }
}