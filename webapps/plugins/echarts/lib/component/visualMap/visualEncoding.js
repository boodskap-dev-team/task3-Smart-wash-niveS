
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

import * as zrUtil from 'zrender/lib/core/util';
import * as visualSolution from '../../visual/visualSolution';
import VisualMapping from '../../visual/VisualMapping';
import { getVisualFromData } from '../../visual/helper';
export var visualMapEncodingHandlers = [{
  createOnAllSeries: true,
  reset: function (seriesModel, ecModel) {
    var resetDefines = [];
    ecModel.eachComponent('visualMap', function (visualMapModel) {
      var pipelineContext = seriesModel.pipelineContext;

      if (!visualMapModel.isTargetSeries(seriesModel) || pipelineContext && pipelineContext.large) {
        return;
      }

      resetDefines.push(visualSolution.incrementalApplyVisual(visualMapModel.stateList, visualMapModel.targetVisuals, zrUtil.bind(visualMapModel.getValueState, visualMapModel), visualMapModel.getDataDimension(seriesModel.getData())));
    });
    return resetDefines;
  }
}, {
  createOnAllSeries: true,
  reset: function (seriesModel, ecModel) {
    var data = seriesModel.getData();
    var visualMetaList = [];
    ecModel.eachComponent('visualMap', function (visualMapModel) {
      if (visualMapModel.isTargetSeries(seriesModel)) {
        var visualMeta = visualMapModel.getVisualMeta(zrUtil.bind(getColorVisual, null, seriesModel, visualMapModel)) || {
          stops: [],
          outerColors: []
        };
        var concreteDim = visualMapModel.getDataDimension(data);
        var dimInfo = data.getDimensionInfo(concreteDim);

        if (dimInfo != null) {
          visualMeta.dimension = dimInfo.index;
          visualMetaList.push(visualMeta);
        }
      }
    });
    seriesModel.getData().setVisual('visualMeta', visualMetaList);
  }
}];

function getColorVisual(seriesModel, visualMapModel, value, valueState) {
  var mappings = visualMapModel.targetVisuals[valueState];
  var visualTypes = VisualMapping.prepareVisualTypes(mappings);
  var resultVisual = {
    color: getVisualFromData(seriesModel.getData(), 'color')
  };

  for (var i = 0, len = visualTypes.length; i < len; i++) {
    var type = visualTypes[i];
    var mapping = mappings[type === 'opacity' ? '__alphaForOpacity' : type];
    mapping && mapping.applyVisual(value, getVisual, setVisual);
  }

  return resultVisual.color;

  function getVisual(key) {
    return resultVisual[key];
  }

  function setVisual(key, value) {
    resultVisual[key] = value;
  }
}