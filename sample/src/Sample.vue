<template>
  <div id="chart"></div>
</template>
<script>
// @ is an alias to /src
import { ElevationGraph } from "../../index";

export default {
  mounted() {
    const route = [
      [138.85400805555557, 35.80678388888889, 913.5],
      [138.85428611111112, 35.80724305555555, 912.8],
      [138.8543738888889, 35.80744305555555, 705.5],
      [138.8544238888889, 35.80759305555556, 905.5],
      [138.8544361111111, 35.807743055555555, 907.5]
    ];
    const option = {
      selector: "#chart",
      color: "red",
      pinColor: "blue",
      padding: 50,
      onHover: (d, i) => {
        console.log(d, i);
      },
      onSelectStart: e => {
        console.log("start");
      },
      onSelectMove: e => {
        console.log("move");
      },
      onSelectEnd: e => {
        console.log("end");
      }
    };
    const graph = new ElevationGraph(route, option);
  }
};
</script>
<style>
#chart {
  max-width: 100%;
  position: relative;
  margin: 0 auto;
  padding-top: 40%;
  max-height: 300px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-kerning: normal;
  font-kerning: normal;
  font-family: "Helvetica Neue", "Roboto", "ヒラギノ角ゴ ProN",
    "Hiragino Kaku Gothic ProN", "游ゴシック体", "Yu Gothic", YuGothic, Verdana,
    Meiryo, sans-serif !important;
}

#chart svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.axis .domain {
  stroke: #ccc;
  position: relative;
}

.axis .tick line {
  stroke: #ccc;
}

.axis .tick text {
  fill: #223f4b;
  font-family: "Helvetica Neue", "Roboto", "ヒラギノ角ゴ ProN",
    "Hiragino Kaku Gothic ProN", "游ゴシック体", "Yu Gothic", YuGothic, Verdana,
    Meiryo, sans-serif !important;
  font-size: 0.7rem;
}

.chart--tooltip {
  position: absolute;
  width: auto;
  height: auto;
  padding: 10px 15px;
  border-radius: 4px;
  /* color: #fff; */
  background: rgba(255, 255, 255, 0.95);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  visibility: hidden;
  font-size: 12px;
  font-weight: bold;
  max-width: 160px;
}

.brush .selection {
  fill: green;
}
</style>
