require('../style/style.scss');


import * as $ from 'jquery'
import { Tooltip, Toast, Popover } from 'bootstrap';
import { Chart } from './chart';
import { ToastManager } from './toast';
declare let window:any;

window.jQuery = $;
window.$ = $;

class App {

    private _toastManager = new ToastManager();

    private _updateInterval: any;

    private _cpuChart: any;
    private _gpuChart: any;
    private _ramChart: any;

    constructor() {
        this.init();
    }

    init() {
        this._startUpdateInterval();
        this._setupCharts();
    }

    onSettingsChange() {
        this._toastManager.show({
            text: 'asdfsdf',
            type: 'success'
        })
    }

    async save(event: InputEvent) {
        event.preventDefault();

        const settings = {

        };

        try {
            const result = await $.post('/settings', {});
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }

    _setupCharts() {
       this._cpuChart = new Chart({
            el: document.getElementById('chart1'), 
            title: 'CPU',
            yTitle: '% of total',
            xTitle: 'Amount'
        });
        this._cpuChart.render();

        this._gpuChart = new Chart({
            el: document.getElementById('chart2'), 
            title: 'GPU',
            yTitle: '% of total',
            xTitle: 'Amount'
        });
        this._gpuChart.render();

        this._ramChart = new Chart({
            el: document.getElementById('chart3'), 
            title: 'RAM',
            yTitle: '% of total',
            xTitle: 'Amount'
        });

        this._ramChart.render();
    }

    _startUpdateInterval() {
        this._updateInterval = setInterval(() => this._updateStatus(), 2000);
    }

    async _updateStatus() {
        const status = await $.get('/status')

        const x = (new Date()).getTime();

        // RAM
        this._ramChart.chart.series[0].addPoint([x, status.system.ram.usedMemPercentage]);

        // CPU
        this._cpuChart.chart.series[0].addPoint([x, status.system.cpuLoad]);

        console.log(status.system);
    }
}

window.app = new App();