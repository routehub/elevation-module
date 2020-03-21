# chartjs-util-elevation

[![npm version](https://badge.fury.io/js/chartjs-util-elevation.svg)](https://badge.fury.io/js/chartjs-util-elevation)


Map and Elevation Graph Library. using Chart.js and turf.js.


## usage

### shell
```sh
$ npm install chartjs-util-elevation
```

### template
```html
<canvas id="elevation" style="width: 100%; height: 200px;"></canvas>
```

### tsfile
```typescript
import chartjs_utils_elevation from 'chartjs-util-elevation'


// lon,lat,alt
const dom = document.querySelector("#elevation")
const cooard = = [[135.19513,34.69895,23.1],[135.19558,34.69914,22.8],[135.19618,34.69939,23.4]...]

const chart = chartjs_utils_elevation(dom, cooard, {})

```



