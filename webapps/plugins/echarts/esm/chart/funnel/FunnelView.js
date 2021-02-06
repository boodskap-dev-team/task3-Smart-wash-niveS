
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/



/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

import { __extends } from "tslib";
import * as graphic from '../../util/graphic';
import { setStatesStylesFromModel, enableHoverEmphasis } from '../../util/states';
import ChartView from '../../view/Chart';
import { setLabelLineStyle, getLabelLineStatesModels } from '../../label/labelGuideHelper';
import { setLabelStyle, getLabelStatesModels } from '../../label/labelStyle';
var opacityAccessPath = ['itemStyle', 'opacity'];

var FunnelPiece = function (_super) {
  __extends(FunnelPiece, _super);

  function FunnelPiece(data, idx) {
    var _this = _super.call(this) || this;

    var polygon = _this;
    var labelLine = new graphic.Polyline();
    var text = new graphic.Text();
    polygon.setTextContent(text);

    _this.setTextGuideLine(labelLine);

    _this.updateData(data, idx, true);

    return _this;
  }

  FunnelPiece.prototype.updateData = function (data, idx, firstCreate) {
    var polygon = this;
    var seriesModel = data.hostModel;
    var itemModel = data.getItemModel(idx);
    var layout = data.getItemLayout(idx);
    var emphasisModel = itemModel.getModel('emphasis');
    var opacity = itemModel.get(opacityAccessPath);
    opacity = opacity == null ? 1 : opacity;
    polygon.useStyle(data.getItemVisual(idx, 'style'));
    polygon.style.lineJoin = 'round';

    if (firstCreate) {
      polygon.setShape({
        points: layout.points
      });
      polygon.style.opacity = 0;
      graphic.initProps(polygon, {
        style: {
          opacity: opacity
        }
      }, seriesModel, idx);
    } else {
      graphic.updateProps(polygon, {
        style: {
          opacity: opacity
        },
        shape: {
          points: layout.points
        }
      }, seriesModel, idx);
    }

    setStatesStylesFromModel(polygon, itemModel);

    this._updateLabel(data, idx);

    enableHoverEmphasis(this, emphasisModel.get('focus'), emphasisModel.get('blurScope'));
  };

  FunnelPiece.prototype._updateLabel = function (data, idx) {
    var polygon = this;
    var labelLine = this.getTextGuideLine();
    var labelText = polygon.getTextContent();
    var seriesModel = data.hostModel;
    var itemModel = data.getItemModel(idx);
    var layout = data.getItemLayout(idx);
    var labelLayout = layout.label;
    var style = data.getItemVisual(idx, 'style');
    var visualColor = style.fill;
    setLabelStyle(labelText, getLabelStatesModels(itemModel), {
      labelFetcher: data.hostModel,
      labelDataIndex: idx,
      defaultOpacity: style.opacity,
      defaultText: data.getName(idx)
    }, {
      normal: {
        align: labelLayout.textAlign,
        verticalAlign: labelLayout.verticalAlign
      }
    });
    polygon.setTextConfig({
      local: true,
      inside: !!labelLayout.inside,
      insideStroke: visualColor,
      outsideFill: visualColor
    });
    var linePoints = labelLayout.linePoints;
    labelLine.setShape({
      points: linePoints
    });
    polygon.textGuideLineConfig = {
      anchor: linePoints ? new graphic.Point(linePoints[0][0], linePoints[0][1]) : null
    };
    graphic.updateProps(labelText, {
      style: {
        x: labelLayout.x,
        y: labelLayout.y
      }
    }, seriesModel, idx);
    labelText.attr({
      rotation: labelLayout.rotation,
      originX: labelLayout.x,
      originY: labelLayout.y,
      z2: 10
    });
    setLabelLineStyle(polygon, getLabelLineStatesModels(itemModel), {
      stroke: visualColor
    });
  };

  return FunnelPiece;
}(graphic.Polygon);

var FunnelView = function (_super) {
  __extends(FunnelView, _super);

  function FunnelView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = FunnelView.type;
    _this.ignoreLabelLineUpdate = true;
    return _this;
  }

  FunnelView.prototype.render = function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    data.diff(oldData).add(function (idx) {
      var funnelPiece = new FunnelPiece(data, idx);
      data.setItemGraphicEl(idx, funnelPiece);
      group.add(funnelPiece);
    }).update(function (newIdx, oldIdx) {
      var piece = oldData.getItemGraphicEl(oldIdx);
      piece.updateData(data, newIdx);
      group.add(piece);
      data.setItemGraphicEl(newIdx, piece);
    }).remove(function (idx) {
      var piece = oldData.getItemGraphicEl(idx);
      graphic.removeElementWithFadeOut(piece, seriesModel, idx);
    }).execute();
    this._data = data;
  };

  FunnelView.prototype.remove = function () {
    this.group.removeAll();
    this._data = null;
  };

  FunnelView.prototype.dispose = function () {};

  FunnelView.type = 'funnel';
  return FunnelView;
}(ChartView);

ChartView.registerClass(FunnelView);
export default FunnelView;