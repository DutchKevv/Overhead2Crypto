require('../style/style.scss');


import * as $ from 'jquery'
import { Tooltip, Toast, Popover } from 'bootstrap';
import { Chart } from './chart';
import { ToastManager } from './toast';

declare let window: any;

window.jQuery = $;
window.$ = $;

class App {

    private _toastManager = new ToastManager();

    private _updateInterval: any;

    private _activityChart: any;
    private _poolChart: any;
    private _coinChart: any;
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

    onSettingsChange(form: HTMLFormElement, event: any) {
        this._toastManager.show({
            text: 'asdfsdf',
            type: 'success'
        });

        console.log(event)
        window.$(event.target).parents('.card-body').find('span').text(`(${event.target.value}%)`)

        $.post('/settings', this._getFormData(window.$(form)))
    }

    _setupCharts() {
        this._activityChart = new Chart({
            el: document.getElementById('activityChart'),
            title: 'Activity',
            yTitle: '% of total',
            xTitle: 'Amount',
            type: 'line'
        });
        this._activityChart.render();

        this._poolChart = new Chart({
            el: document.getElementById('poolChart'),
            title: 'Pools',
            yTitle: '% of total',
            xTitle: 'Amount',
            data: [
                {
                    name: 'stratum',
                    data: [0]
                },
                {
                    name: 'coinhive',
                    data: [0]
                }
            ]
        });
        this._poolChart.render();

        this._coinChart = new Chart({
            el: document.getElementById('coinChart'),
            title: 'Coins',
            yTitle: '% of total',
            xTitle: 'Amount'
        });
        this._coinChart.render();

        this._cpuChart = new Chart({
            el: document.getElementById('CPUChart'),
            title: 'CPU',
            yTitle: '% of total',
            xTitle: 'Amount'
        });
        this._cpuChart.render();

        this._gpuChart = new Chart({
            el: document.getElementById('GPUChart'),
            title: 'GPU',
            yTitle: '% of total',
            xTitle: 'Amount'
        });
        this._gpuChart.render();

        this._ramChart = new Chart({
            el: document.getElementById('RAMChart'),
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

        // ACTIVITY
        this._activityChart.chart.series[0].addPoint([x, status.performance.active ? 100 : 0]);

        // COINS
        this._coinChart.chart.series[0].addPoint([x, status.performance.coins[0].total]);

        console.log(status.system);
    }

    _getFormData($form: JQuery){
        var unindexed_array = $form.serializeArray();
        var indexed_array: any = {};
    
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
    
        return indexed_array;
    }
}

window.app = new App();