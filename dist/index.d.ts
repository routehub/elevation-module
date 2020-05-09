declare class Option {
    color: string;
    padding: number;
}
export declare class ElevationGraph {
    private option;
    private distData;
    private contents;
    private svg;
    private tooltip;
    private padding;
    private lineColor;
    constructor(routeData: any, option: Option);
    private initialize;
    update(routeData: any): void;
    private draw;
    private routeToDistance;
}
export {};
