import { ChartConfiguration } from 'chart.js';

export const chartDoughnutDefault: ChartConfiguration = {
  type: 'doughnut',
  data: {
    datasets: [
      {
        label: 'Ilość wizyt'
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: ''
    }
  }
};
