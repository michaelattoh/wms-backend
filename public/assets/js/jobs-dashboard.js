"use strict"
// Candidates Performance
var options1 = {
  series: [{
    name: 'Weekly',
    data: [31, 11, 22, 37, 13, 22, 37, 21, 44, 22, 34, 25],
    type: "column",
  }, {
    name: 'Monthly',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 23],
    type: "area",
  }, {
    name: 'Daily',
    data: [30, 8, 20, 36, 15, 22, 37, 19, 44, 24, 32, 23],
    type: "line",
  },],
  chart: {
    height: 300,
    type: "line",
    toolbar: {
      show: false,
    },
    stacked: true,
    fontFamily: 'Nunito, sans-serif',
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [2, 1, 2],
    curve: "smooth",
  },
  grid: {
    borderColor: '#f1f1f1',
    strokeDashArray: 3
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: {
      show: false,
      color: 'rgba(119, 119, 142, 0.05)',
    },
    axisTicks: {
      show: false,
      color: 'rgba(119, 119, 142, 0.05)',
    },
    labels: {
      style: {
        colors: "#8c9097",
        fontSize: '11px',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-label',
      },
    }
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
    fontSize: "11px",
    fontFamily: "Helvetica, Arial",
    fontWeight: 600,
    labels: {
      colors: '#74767c',
    },
    markers: {
      width: 7,
      height: 7,
      strokeWidth: 0,
      strokeColor: "#fff",
      fillColors: undefined,
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  colors: ["var(--primary-color)", "var(--primary005)", "rgb(244, 110, 244)"],
  plotOptions: {
    bar: {
      columnWidth: "15%",
      borderRadius: 4,
    }
  },
  fill: {
    opacity: [1, 0.05, 1],
    gradient: {
      inverseColors: false,
      shade: "light",
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100],
    },
  },
};
var chart1 = new ApexCharts(document.querySelector("#candidatePerformance"), options1);
chart1.render();
// Candidates Performance

/* Job Statistics */
var options = {
  chart: {
    height: 260,
    type: "radialBar"
  },
  series: [75, 67],
  colors: ["var(--primary-color)", "rgb(244, 110, 244)"],
  plotOptions: {
      radialBar: {
          hollow: {
              margin: 0,
              size: "65%",
              background: "#fff",
          },
          dataLabels: {
              name: {
                  offsetY: -10,
                  color: "#4b9bfa",
                  fontSize: "16px",
                  show: false,
              },
              value: {
                  offsetY: 10,
                  color: "#4b9bfa",
                  fontSize: "22px",
                  show: true,
              },
              total: {
                  show: true,
                  label: 'Total',
              }
          },
      },
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    fontWeight: 600,
    fontSize: '11px',
    labels: {
      colors: '#74767c',
    },
    markers: {
      width: 7,
      height: 7,
      strokeWidth: 0,
      radius: 12,
      offsetX: 0,
      offsetY: 0
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Job View", "Job Applied"],
};
var chart = new ApexCharts(document.querySelector("#quickData"), options);
chart.render();
/* Job Statistics */


