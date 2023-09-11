import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting'


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  Highcharts = Highcharts;
  chartOptions = {}

  constructor(){
    this.chartOptions={
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Project Completion Report, 2023',
          align: 'left'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
      credits:{
        enabled : false
      },
      series: [{
          name: 'Projects',
          colorByPoint: true,
          data: [{
              name: 'Chrome',
              y: 70,
              sliced: true,
              selected: true
          }, {
              name: 'Edge',
              y: 10
          },  {
              name: 'Firefox',
              y: 5
          }, {
              name: 'Safari',
              y: 5
          }, {
              name: 'Internet Explorer',
              y: 3
          }, {
              name: 'Other',
              y: 7
          }]
      }]
    }
    HC_exporting(Highcharts) 
  }
}


