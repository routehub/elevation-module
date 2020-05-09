"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3_1 = __importDefault(require("d3"));
var helpers_1 = require("@turf/helpers");
var distance_1 = require("@turf/distance");
var Distance = /** @class */ (function () {
    function Distance(distance, elevation) {
        this.distance = distance;
        this.elevation = elevation;
    }
    return Distance;
}());
var Option = /** @class */ (function () {
    function Option() {
        this.color = "red";
        this.padding = 30;
    }
    return Option;
}());
var ElevationGraph = /** @class */ (function () {
    function ElevationGraph(routeData, option) {
        this.lineColor = d3_1.default.rgb("#85a7cc");
        this.option = option;
        this.initialize();
        this.update(routeData);
    }
    ElevationGraph.prototype.initialize = function () {
        this.contents = d3_1.default.select('#chart');
        this.svg = this.contents.append("svg");
        this.tooltip = d3_1.default.select("#chart").append("div").attr("class", "chart--tooltip");
    };
    ElevationGraph.prototype.update = function (routeData) {
        this.distData = this.routeToDistance(routeData);
        this.draw();
    };
    ElevationGraph.prototype.draw = function () {
        var self = this;
        var x, y, xScale, yScale, width, height, line, path, area, lineArea, focus, focusLine, focusPoint, overlay, brush, brushX;
        var lineChart = {
            initialize: function () {
                // レンダリング
                this.rendar();
                // アップデート
                this.update();
                // リサイズ時の処理
                this.resize();
                // データ変更の処理
                //this.dataChange();
                // tooltipを設定
                this.setTooltip();
                // マウスイベントをバインド
                this.mouseEvent();
            },
            rendar: function () {
                // エリアを追加
                lineArea = this.svg.append("path");
                // svg要素にg要素を追加しクラスを付与しxに代入
                x = this.svg.append("g")
                    .attr("class", "axis axis-x");
                // svg要素にg要素を追加しクラスを付与しyに代入
                y = this.svg.append("g")
                    .attr("class", "axis axis-y");
                // フォーカス要素のグループを追加
                focus = this.svg.append("g")
                    .attr("class", "focus")
                    .style("visibility", "hidden");
                // フォーカス時のY軸を追加
                focusLine = focus.append("line");
                // フォーカス時のポイントを追加
                focusPoint = focus.append("circle")
                    .attr("r", 4)
                    .attr("fill", "#fff")
                    .attr("stroke", self.option.color)
                    .attr("stroke-width", 2);
                // オーバーレイ要素を追加
                overlay = this.svg.append("rect");
                brush = this.svg.append("g");
                // パス要素を追加
                path = this.svg.append("path");
            },
            update: function () {
                // グラフの幅
                width = this.contents.node().clientWidth - self.option.padding;
                // グラフの高さ
                height = this.contents.node().clientHeight - self.option.padding;
                // X軸Y軸を追加
                this.addScales();
                // ラインを追加
                this.addLine();
                // エリアを追加
                this.addArea();
            },
            resize: function () {
                var self = this;
                window.addEventListener("resize", function () {
                    // アップデート
                    self.update();
                });
            },
            getLine: function () {
                return d3_1.default.line()
                    // lineのX軸をセット
                    .x(function (d) { return xScale(d.distance); })
                    // lineのY軸をセット
                    .y(function (d) { return yScale(d.elevaton); })
                    // カーブを設定
                    .curve(d3_1.default.curveCatmullRom.alpha(0.4));
            },
            getArea: function () {
                return d3_1.default.area()
                    .x(function (d) { return xScale(d.distance); })
                    .y1(yScale(0))
                    .y0(yScale(0))
                    // カーブを設定
                    .curve(d3_1.default.curveCatmullRom.alpha(0.4));
            },
            addScales: function () {
                // x軸の目盛りの量
                var xTicks = (window.innerWidth < 768) ? 6 : 12;
                // X軸を時間のスケールに設定する
                xScale = d3_1.default.scaleLinear()
                    // 最小値と最大値を指定しX軸の領域を設定する
                    .domain([
                        // 0を最小値として設定
                        0,
                        // データ内の日付の最大値を取得
                        d3_1.default.max(self.distData, function (d) { return d.distance; })
                    ])
                    // SVG内でのX軸の位置の開始位置と終了位置を指定しX軸の幅を設定する
                    .range([self.option.padding, width]);
                // Y軸を値のスケールに設定する
                yScale = d3_1.default.scaleLinear()
                    // 最小値と最大値を指定しX軸の領域を設定する
                    .domain([
                        // 0を最小値として設定
                        0,
                        // データ内のvalueの最大値を取得
                        d3_1.default.max(self.distData, function (d) { return d.elevation; })
                    ])
                    // SVG内でのY軸の位置の開始位置と終了位置を指定しY軸の幅を設定する
                    .range([height, self.option.padding]);
                // scaleをセットしてX軸を作成
                var axisx = d3_1.default.axisBottom(xScale)
                    // グラフの目盛りの数を設定
                    .ticks(xTicks)
                    // 目盛りの表示フォーマットを設定
                    .tickFormat(function (d) {
                        return d === 0 ? '' : d + 'km';
                    });
                // scaleをセットしてY軸を作成
                var axisy = d3_1.default.axisLeft(yScale)
                    .tickSizeInner(-width)
                    .tickFormat(function (d) {
                        return d === 0 ? d : d + 'm';
                    });
                // X軸の位置を指定し軸をセット
                x.attr("transform", "translate(" + 0 + "," + (height) + ")")
                    .call(axisx);
                // Y軸の位置を指定し軸をセット
                y.attr("transform", "translate(" + self.option.padding + "," + 0 + ")")
                    .call(axisy);
            },
            addLine: function () {
                //lineを生成
                line = this.getLine();
                path
                    // dataをセット
                    .datum(self.distData)
                    // strokeカラーを設定
                    .attr("stroke", self.option.color)
                    .attr("fill", "none")
                    // strokeカラーを設定
                    .attr("stroke-width", 2)
                    // d属性を設定
                    .attr("d", line);
            },
            addArea: function () {
                area = this.getArea();
                lineArea
                    .datum(self.distData)
                    .attr("d", area);
                //                .style("fill", color)
            },
            setTooltip: function () {
                // オーバーレイ要素を設定
                overlay
                    .style("fill", "none")
                    .style("pointer-events", "all")
                    .attr("class", "overlay")
                    .attr("width", width)
                    .attr("height", height);
                // フォーカスした際のY軸を設定
                focusLine
                    .style("stroke", "#ccc")
                    .style("stroke-width", "1px")
                    .style("stroke-dasharray", "2")
                    .attr("class", "x-hover-line hover-line")
                    .attr("y1", self.option.padding)
                    .attr("y2", height);
                // 選択範囲領域
                brush
                    .attr("class", "brush")
                    .attr("y1", self.option.padding)
                    .attr("y2", height);
                brushX = d3_1.default.brushX().extent([[self.option.padding, 0], [width, height]]);
            },
            mouseEvent: function () {
                brush.call(brushX);
                // overlayイベントだがbrushがイベントを食べるのでこちらで発火
                brush.on("mousemove", this.handleMouseMove)
                    .on("mouseout", this.handleMouseOut);
            },
            handleMouseMove: function () {
                var bisectDate = d3_1.default.bisector(function (d) { return d.dist; }).left;
                var x0 = xScale.invert(d3_1.default.mouse(this)[0]), i = bisectDate(self.distData, x0, 1), d0 = self.distData[i - 1], d1 = self.distData[i], d = x0 - d0.distance > d1.distance - x0 ? d1 : d0;
                var tooltipY = (d3_1.default.event.pageY - 40);
                var tooltipX = (d3_1.default.event.pageX + 20);
                if ((window.innerWidth - 160) < tooltipX) {
                    tooltipX = (d3_1.default.event.pageX - 200);
                }
                self.tooltip
                    .html("")
                    .style("visibility", "visible")
                    .style("top", tooltipY + "px")
                    .style("left", tooltipX + "px");
                self.tooltip
                    .append("div")
                    .attr("class", "tooltip--time")
                    .html(d3_1.default.format(".2f")(d.distance) + 'km<br>' + d.elevation + '<small>m</small>');
                focus
                    .style("visibility", "visible")
                    .attr("transform", "translate(" + xScale(d.distance) + "," + 0 + ")");
                focusPoint.attr("transform", "translate(" + 0 + "," + yScale(d.elevation) + ")");
            },
            handleMouseOut: function (d, i) {
                self.tooltip.style("visibility", "hidden");
                focus.style("visibility", "hidden");
            },
        };
        lineChart.initialize();
    };
    ElevationGraph.prototype.routeToDistance = function (route) {
        var dist = [];
        var odo = 0;
        for (var i = 0, len = route.length; i < len; i++) {
            if (i === 0) {
                dist.push(new Distance(0, route[i][2]));
                continue;
            }
            var from = helpers_1.point(route[i - 1]);
            var to = helpers_1.point(route[i]);
            odo += distance_1.distance(from, to);
            dist.push(new Distance(odo, route[i][2]));
        }
        return dist;
    };
    return ElevationGraph;
}());
exports.ElevationGraph = ElevationGraph;
