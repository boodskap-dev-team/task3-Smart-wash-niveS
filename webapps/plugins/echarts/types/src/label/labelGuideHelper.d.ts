import { Point, Polyline } from '../util/graphic';
import Element from 'zrender/lib/Element';
import { LabelLineOption, DisplayState, StatesOptionMixin } from '../util/types';
import Model from '../model/Model';
import * as vector from 'zrender/lib/core/vector';
export declare function updateLabelLinePoints(target: Element, labelLineModel: Model<LabelLineOption>): void;
export declare function limitTurnAngle(linePoints: number[][], minTurnAngle: number): void;
export declare function limitSurfaceAngle(linePoints: vector.VectorArray[], surfaceNormal: Point, maxSurfaceAngle: number): void;
declare type LabelLineModel = Model<LabelLineOption>;
export declare function setLabelLineStyle(targetEl: Element, statesModels: Record<DisplayState, LabelLineModel>, defaultStyle?: Polyline['style']): void;
export declare function getLabelLineStatesModels<LabelName extends string = 'labelLine'>(itemModel: Model<StatesOptionMixin<any> & Partial<Record<LabelName, any>>>, labelLineName?: LabelName): Record<DisplayState, LabelLineModel>;
export {};
