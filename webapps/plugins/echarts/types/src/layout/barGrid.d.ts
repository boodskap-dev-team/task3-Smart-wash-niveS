import BarSeriesModel from '../chart/bar/BarSeries';
import Axis2D from '../coord/cartesian/Axis2D';
import GlobalModel from '../model/Global';
import { StageHandler, Dictionary } from '../util/types';
declare type BarWidthAndOffset = Dictionary<Dictionary<{
    bandWidth: number;
    offset: number;
    offsetCenter: number;
    width: number;
}>>;
export interface BarGridLayoutOptionForCustomSeries {
    count: number;
    barWidth?: number;
    barMaxWidth?: number;
    barMinWidth?: number;
    barGap?: number;
    barCategoryGap?: number;
}
interface LayoutOption extends BarGridLayoutOptionForCustomSeries {
    axis: Axis2D;
}
export declare type BarGridLayoutResult = BarWidthAndOffset[string][string][];
export declare function getLayoutOnAxis(opt: LayoutOption): BarGridLayoutResult;
export declare function prepareLayoutBarSeries(seriesType: string, ecModel: GlobalModel): BarSeriesModel[];
export declare function makeColumnLayout(barSeries: BarSeriesModel[]): Dictionary<Dictionary<{
    bandWidth: number;
    offset: number;
    offsetCenter: number;
    width: number;
}>>;
declare function retrieveColumnLayout(barWidthAndOffset: BarWidthAndOffset, axis: Axis2D): typeof barWidthAndOffset[string];
declare function retrieveColumnLayout(barWidthAndOffset: BarWidthAndOffset, axis: Axis2D, seriesModel: BarSeriesModel): typeof barWidthAndOffset[string][string];
export { retrieveColumnLayout };
export declare function layout(seriesType: string, ecModel: GlobalModel): void;
export declare const largeLayout: StageHandler;
