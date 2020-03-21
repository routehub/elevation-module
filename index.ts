import Chart from 'chart.js'
import turfLength from '@turf/length'
import { turfAlong } from 'turf-along'

/**
 * create Elevation Graph Object. using Chart.js
 * @param element target Dom element.
 * @param cooard [[lat, lng, altitude] , [lat, lng, alt]....
 * @param option [options={}] Optional parameters
 */
function chartjs_util_elevation(element, cooard, option) {
    // set option 
    const sampling = option.sampling || 0.1 // part of pos(@0.1km)
    const backgroundColor = option.backgroundColor || "rgb(255,51,242,0.7)";

    // normalize data
    const total_distance = turfLength(cooard)
    let normalizedCooard = [] // distance normalize cooards
    let labels
    for (let now = 0; now < total_distance; now += sampling) {
        const label = (labels.length == 0 || labels.length % 5 === 0) ? Math.round(now * 1000) : null
        labels.push = label
        normalizedCooard.push(turfAlong(cooard, now))
    }
    const normalizedLevel = normalizedCooard.map((p) => { return p.geometry.coordinates[2]; })


    // create graph
    return new Chart(element, {
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
    })
}

export default chartjs_util_elevation
