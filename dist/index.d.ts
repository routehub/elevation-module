declare class Option {
    selector: string;
    color: string;
    pinColor: string;
    padding: number;
    onHover: any;
    onSelectStart: any;
    onSelectMove: any;
    onSelectEnd: any;
}
export declare class ElevationGraph {
    private option;
    private distData;
    private contents;
    private svg;
    private tooltip;
    constructor(routeData: any, option: Option);
    private initialize;
    update(routeData: any): void;
    private draw;
    private routeToDistance;
}
export {};
