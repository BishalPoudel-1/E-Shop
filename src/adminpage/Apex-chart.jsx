import React from 'react';
import ReactApexChart from 'react-apexcharts'; 

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          background: 'transparent', 
          toolbar: {
            show: false 
          }
        },
        colors: [this.props.color || '#FF5733'], 
        dataLabels: {
          enabled: false 
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: '', 
          align: 'left',
          style: {
            fontSize: '0px' 
          }
        },
        grid: {
          show: false, 
          borderColor: 'transparent' 
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          labels: {
            show: false 
          },
          title: {
            text: '', 
            style: {
              fontSize: '0px' 
            }
          },
          axisBorder: {
            show: false 
          },
          axisTicks: {
            show: false 
          }
        },
        yaxis: {
          labels: {
            show: false 
          },
          title: {
            text: '', 
            style: {
              fontSize: '0px' 
            }
          },
          axisBorder: {
            show: false 
          },
          axisTicks: {
            show: false 
          }
        },
        legend: {
          show: false 
        },
        tooltip: {
          enabled: false 
        }
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.setState(prevState => ({
        options: {
          ...prevState.options,
          colors: [this.props.color] 
        }
      }));
    }
  }

  render() {
    return (
      <div>
        <div id="chart" style={{ background: 'transparent' }}> 
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={150} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
