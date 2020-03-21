"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chart_js_1 = __importDefault(require("chart.js"));
var length_1 = __importDefault(require("@turf/length"));
var helpers_1 = __importDefault(require("@turf/helpers"));
var turf_along_1 = require("turf-along");
/**
 * create Elevation Graph Object. using Chart.js
 * @param element target Dom element.
 * @param cooard [[lat, lng, altitude] , [lat, lng, alt]....
 * @param option [options={}] Optional parameters
 */
function chartjs_util_elevation(element, cooard, option) {
    var line = helpers_1.default.lineString(cooard);
    // set option 
    var sampling = option.sampling || 0.1; // part of pos(@0.1km)
    var backgroundColor = option.backgroundColor || "rgb(255,51,242,0.7)";
    // normalize data
    var total_distance = length_1.default(line);
    var normalizedCooard = []; // distance normalize cooards
    var labels;
    for (var now = 0; now < total_distance; now += sampling) {
        var label = (labels.length == 0 || labels.length % 5 === 0) ? Math.round(now * 1000) : null;
        labels.push = label;
        normalizedCooard.push(turf_along_1.turfAlong(line, now));
    }
    var normalizedLevel = normalizedCooard.map(function (p) { return p.geometry.coordinates[2]; });
    // create graph
    return new chart_js_1.default(element, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                    data: normalizedLevel,
                    backgroundColor: backgroundColor,
                    pointRadius: 0,
                }]
        },
        options: {
            title: {
                display: false,
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                        display: true,
                        stacked: false,
                        gridLines: {
                            display: false
                        }
                    }],
                yAxes: [{
                        gridLines: {
                            drawBorder: false
                        }
                    }]
            }
        }
    });
}
exports.default = chartjs_util_elevation;
