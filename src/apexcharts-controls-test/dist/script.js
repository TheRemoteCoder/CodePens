const el = document.querySelector("#chart");
const options = {
  chart: {
    height: 350,
    type: 'radialBar' },

  fill: {
    opacity: 1,
    type: 'solid' },

  colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
  series: [42, 12, 43, 53, 44],
  labels: ['Progress'],
  selection: {
    enabled: true,
    fill: {
      color: '#eee',
      opacity: 0.1 },

    stroke: {
      width: 1,
      dashArray: 3,
      color: '#eee',
      opacity: 0.4 } } };




const chart = new ApexCharts(el, options);

chart.render();
chart.toggleDataPointSelection(0);