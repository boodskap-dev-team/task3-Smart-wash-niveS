import { PathStyleProps } from 'zrender/lib/graphic/Path';
import Model from '../model/Model';
import DataDiffer from './DataDiffer';
import { DataProvider } from './helper/dataProvider';
import DataDimensionInfo from './DataDimensionInfo';
import { ArrayLike, Dictionary, FunctionPropertyNames } from 'zrender/lib/core/types';
import Element from 'zrender/lib/Element';
import { DimensionIndex, DimensionName, DimensionLoose, OptionDataItem, ParsedValue, ParsedValueNumeric, OrdinalNumber, DimensionUserOuput, SeriesDataType, OptionSourceData, DecalObject } from '../util/types';
import type Graph from './Graph';
import type Tree from './Tree';
import type { VisualMeta } from '../component/visualMap/VisualMapModel';
import { Source } from './Source';
declare const dataCtors: {
    float: ArrayConstructor | Float64ArrayConstructor;
    int: ArrayConstructor | Int32ArrayConstructor;
    ordinal: ArrayConstructor;
    number: ArrayConstructor;
    time: ArrayConstructor;
};
export declare type ListDimensionType = keyof typeof dataCtors;
declare type DimValueGetter = (this: List, dataItem: any, dimName: DimensionName, dataIndex: number, dimIndex: DimensionIndex) => ParsedValue;
declare type ItrParamDims = DimensionLoose | Array<DimensionLoose>;
declare type CtxOrList<Ctx> = unknown extends Ctx ? List : Ctx;
declare type EachCb0<Ctx> = (this: CtxOrList<Ctx>, idx: number) => void;
declare type EachCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => void;
declare type EachCb2<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, y: ParsedValue, idx: number) => void;
declare type EachCb<Ctx> = (this: CtxOrList<Ctx>, ...args: any) => void;
declare type FilterCb0<Ctx> = (this: CtxOrList<Ctx>, idx: number) => boolean;
declare type FilterCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => boolean;
declare type FilterCb2<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, y: ParsedValue, idx: number) => boolean;
declare type FilterCb<Ctx> = (this: CtxOrList<Ctx>, ...args: any) => boolean;
declare type MapArrayCb0<Ctx> = (this: CtxOrList<Ctx>, idx: number) => any;
declare type MapArrayCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => any;
declare type MapArrayCb2<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, y: ParsedValue, idx: number) => any;
declare type MapArrayCb<Ctx> = (this: CtxOrList<Ctx>, ...args: any) => any;
declare type MapCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => ParsedValue | ParsedValue[];
declare type MapCb2<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, y: ParsedValue, idx: number) => ParsedValue | ParsedValue[];
export interface DefaultDataVisual {
    style: PathStyleProps;
    drawType: 'fill' | 'stroke';
    symbol?: string;
    symbolSize?: number | number[];
    symbolRotate?: number;
    symbolKeepAspect?: boolean;
    liftZ?: number;
    legendSymbol?: string;
    visualMeta?: VisualMeta[];
    colorFromPalette?: boolean;
    decal?: DecalObject;
}
export interface DataCalculationInfo<SERIES_MODEL> {
    stackedDimension: string;
    stackedByDimension: string;
    isStackedByIndex: boolean;
    stackedOverDimension: string;
    stackResultDimension: string;
    stackedOnSeries?: SERIES_MODEL;
}
declare class List<HostModel extends Model = Model, Visual extends DefaultDataVisual = DefaultDataVisual> {
    readonly type = "list";
    readonly dimensions: string[];
    private _dimensionInfos;
    readonly hostModel: HostModel;
    dataType: SeriesDataType;
    graph?: Graph;
    tree?: Tree;
    private _indices;
    private _count;
    private _rawCount;
    private _storage;
    private _storageArr;
    private _nameList;
    private _idList;
    private _visual;
    private _layout;
    private _itemVisuals;
    private _itemLayouts;
    private _graphicEls;
    private _rawData;
    private _rawExtent;
    private _extent;
    private _approximateExtent;
    private _dimensionsSummary;
    private _invertedIndicesMap;
    private _calculationInfo;
    readonly userOutput: DimensionUserOuput;
    hasItemOption: boolean;
    defaultDimValueGetter: DimValueGetter;
    private _dimValueGetter;
    private _dimValueGetterArrayRows;
    private _nameRepeatCount;
    private _nameDimIdx;
    private _nameOrdinalMeta;
    private _idDimIdx;
    private _idOrdinalMeta;
    private _dontMakeIdFromName;
    private __wrappedMethods;
    TRANSFERABLE_METHODS: readonly ["cloneShallow", "downSample", "lttbDownSample", "map"];
    CHANGABLE_METHODS: readonly ["filterSelf", "selectRange"];
    DOWNSAMPLE_METHODS: readonly ["downSample", "lttbDownSample"];
    constructor(dimensions: Array<string | object | DataDimensionInfo>, hostModel: HostModel);
    getDimension(dim: DimensionLoose): DimensionName;
    getDimensionInfo(dim: DimensionLoose): DataDimensionInfo;
    getDimensionsOnCoord(): DimensionName[];
    mapDimension(coordDim: DimensionName): DimensionName;
    mapDimension(coordDim: DimensionName, idx: number): DimensionName;
    mapDimensionsAll(coordDim: DimensionName): DimensionName[];
    initData(data: Source | OptionSourceData | DataProvider, nameList?: string[], dimValueGetter?: DimValueGetter): void;
    getProvider(): DataProvider;
    appendData(data: ArrayLike<any>): void;
    appendValues(values: any[][], names?: string[]): void;
    private _initDataFromProvider;
    count(): number;
    getIndices(): ArrayLike<number>;
    getByDimIdx(dimIdx: number, idx: number): ParsedValue;
    get(dim: DimensionName, idx: number): ParsedValue;
    getByRawIndex(dim: DimensionName, rawIdx: number): ParsedValue;
    getValues(idx: number): ParsedValue[];
    getValues(dimensions: readonly DimensionName[], idx: number): ParsedValue[];
    hasValue(idx: number): boolean;
    getDataExtent(dim: DimensionLoose): [number, number];
    getApproximateExtent(dim: DimensionLoose): [number, number];
    setApproximateExtent(extent: [number, number], dim: DimensionLoose): void;
    getCalculationInfo<CALC_INFO_KEY extends keyof DataCalculationInfo<HostModel>>(key: CALC_INFO_KEY): DataCalculationInfo<HostModel>[CALC_INFO_KEY];
    setCalculationInfo(key: DataCalculationInfo<HostModel>): void;
    setCalculationInfo<CALC_INFO_KEY extends keyof DataCalculationInfo<HostModel>>(key: CALC_INFO_KEY, value: DataCalculationInfo<HostModel>[CALC_INFO_KEY]): void;
    getSum(dim: DimensionName): number;
    getMedian(dim: DimensionLoose): number;
    rawIndexOf(dim: DimensionName, value: OrdinalNumber): number;
    indexOfName(name: string): number;
    indexOfRawIndex(rawIndex: number): number;
    indicesOfNearest(dim: DimensionName, value: number, maxDistance?: number): number[];
    getRawIndex: (idx: number) => number;
    getRawDataItem(idx: number): OptionDataItem;
    getName(idx: number): string;
    getId(idx: number): string;
    each<Ctx>(cb: EachCb0<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    each<Ctx>(dims: DimensionLoose, cb: EachCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    each<Ctx>(dims: [DimensionLoose], cb: EachCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    each<Ctx>(dims: [DimensionLoose, DimensionLoose], cb: EachCb2<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    each<Ctx>(dims: ItrParamDims, cb: EachCb<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    filterSelf<Ctx>(cb: FilterCb0<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    filterSelf<Ctx>(dims: DimensionLoose, cb: FilterCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    filterSelf<Ctx>(dims: [DimensionLoose], cb: FilterCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    filterSelf<Ctx>(dims: [DimensionLoose, DimensionLoose], cb: FilterCb2<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    filterSelf<Ctx>(dims: ItrParamDims, cb: FilterCb<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    selectRange(range: {
        [dimName: string]: [number, number];
    }): List;
    mapArray<Ctx, Cb extends MapArrayCb0<Ctx>>(cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    mapArray<Ctx, Cb extends MapArrayCb1<Ctx>>(dims: DimensionLoose, cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    mapArray<Ctx, Cb extends MapArrayCb1<Ctx>>(dims: [DimensionLoose], cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    mapArray<Ctx, Cb extends MapArrayCb2<Ctx>>(dims: [DimensionLoose, DimensionLoose], cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    mapArray<Ctx, Cb extends MapArrayCb<Ctx>>(dims: ItrParamDims, cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    map<Ctx>(dims: DimensionLoose, cb: MapCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): List<HostModel>;
    map<Ctx>(dims: [DimensionLoose], cb: MapCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): List<HostModel>;
    map<Ctx>(dims: [DimensionLoose, DimensionLoose], cb: MapCb2<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): List<HostModel>;
    downSample(dimension: DimensionName, rate: number, sampleValue: (frameValues: ArrayLike<ParsedValue>) => ParsedValueNumeric, sampleIndex: (frameValues: ArrayLike<ParsedValue>, value: ParsedValueNumeric) => number): List<HostModel>;
    lttbDownSample(valueDimension: DimensionName, rate: number): List<Model<any>, DefaultDataVisual>;
    getItemModel<ItemOpts extends unknown = unknown>(idx: number): Model<ItemOpts>;
    diff(otherList: List): DataDiffer;
    getVisual<K extends keyof Visual>(key: K): Visual[K];
    setVisual<K extends keyof Visual>(key: K, val: Visual[K]): void;
    setVisual(kvObj: Partial<Visual>): void;
    getItemVisual<K extends keyof Visual>(idx: number, key: K): Visual[K];
    hasItemVisual(): boolean;
    ensureUniqueItemVisual<K extends keyof Visual>(idx: number, key: K): Visual[K];
    setItemVisual<K extends keyof Visual>(idx: number, key: K, value: Visual[K]): void;
    setItemVisual(idx: number, kvObject: Partial<Visual>): void;
    clearAllVisual(): void;
    setLayout(key: string, val: any): void;
    setLayout(kvObj: Dictionary<any>): void;
    getLayout(key: string): any;
    getItemLayout(idx: number): any;
    setItemLayout<M = false>(idx: number, layout: (M extends true ? Dictionary<any> : any), merge?: M): void;
    clearItemLayouts(): void;
    setItemGraphicEl(idx: number, el: Element): void;
    getItemGraphicEl(idx: number): Element;
    eachItemGraphicEl<Ctx = unknown>(cb: (this: Ctx, el: Element, idx: number) => void, context?: Ctx): void;
    cloneShallow(list?: List<HostModel>): List<HostModel>;
    wrapMethod(methodName: FunctionPropertyNames<List>, injectFunction: (...args: any) => any): void;
    private static internalField;
}
interface List {
    getLinkedData(dataType?: SeriesDataType): List;
    getLinkedDataAll(): {
        data: List;
        type?: SeriesDataType;
    }[];
}
export default List;
