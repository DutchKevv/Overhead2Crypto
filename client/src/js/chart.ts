import Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps and Highcharts Gantt are similar.
// import Highcharts from 'highcharts/highstock';

declare let window: any;

interface IChartOptions {
    el: any;
    title: string;
    yTitle: string;
    xTitle: string;
    type?: 'bar' | 'column' | 'line';
    data?: any[];
}

export class Chart {

    private _chart: any;
    private _options: IChartOptions = null;


    get chart() {
        return this._chart;
    }

    constructor(options: IChartOptions) {
        this._options = options;
    }

    render() {
        this._render();
    }

    _init() {

    }

    _render() {
        this._chart = Highcharts.chart(this._options.el, {
            chart: {
                type: this._options.type || 'line'
            },
            
            title: {
                text: this._options.title
            },

            yAxis: {
                title: {
                    text: this._options.yTitle
                }
            },


            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%Y-%m-%d}',
                    rotation: 45,
                    align: 'left',
                    formatter: function() {
                        return Highcharts.dateFormat("%H:%M:%S", this.value);
                      }
                },
            },

            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    step: 'left', // or 'center' or 'right'
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: this._options.data || [{}],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        } as any);
    }
}