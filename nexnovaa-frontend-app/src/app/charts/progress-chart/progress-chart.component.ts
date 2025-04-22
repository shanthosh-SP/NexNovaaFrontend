import { Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as echarts from "echarts";

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [],
  templateUrl: './progress-chart.component.html',
  styleUrl: './progress-chart.component.scss'
})
export class ProgressChartComponent implements OnChanges {
  @Input() chartData: any;
  public elementId = input('');

  ngOnChanges(changes: SimpleChanges): void {
    try {
      this.loadChart();
    } catch (e) {
      console.warn(e);
    }
  }

  loadChart() {
    debugger
    setTimeout(() => {
      const myChart = echarts.init(document.getElementById(this.elementId()));
      const option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            max: 200,
            type: 'gauge',
            radius: '80%',
            progress: {
              show: true,
              roundCap: true, // Rounded ends of progress bar
              width: 15,
              itemStyle: {
                color: '#124559'
              }
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 15,

              }
            },
            title: {
              show: true,
              offsetCenter: [0, '-20%'], // Move SCORE label higher
              fontSize: 16,
              color: '#615E83',
              fontWeight: 'bold'
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}',
              fontSize: 24,
              colo: '#1E1B39',
              offsetCenter: [0, '10%'] // Value just below the title
            },
            data: [
              {
                value: 150,
                name: 'Total Completed'
              }
            ]
          }
        ]
      };
      console.log('chart loaded');
      myChart.setOption(option);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
    }, 300);
  }
}
