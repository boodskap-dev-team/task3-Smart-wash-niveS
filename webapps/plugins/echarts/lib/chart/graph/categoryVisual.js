
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

import { extend } from 'zrender/lib/core/util';
export default function categoryVisual(ecModel) {
  var paletteScope = {};
  ecModel.eachSeriesByType('graph', function (seriesModel) {
    var categoriesData = seriesModel.getCategoriesData();
    var data = seriesModel.getData();
    var categoryNameIdxMap = {};
    categoriesData.each(function (idx) {
      var name = categoriesData.getName(idx);
      categoryNameIdxMap['ec-' + name] = idx;
      var itemModel = categoriesData.getItemModel(idx);
      var style = itemModel.getModel('itemStyle').getItemStyle();

      if (!style.fill) {
        style.fill = seriesModel.getColorFromPalette(name, paletteScope);
      }

      categoriesData.setItemVisual(idx, 'style', style);
      var symbolVisualList = ['symbol', 'symbolSize', 'symbolKeepAspect'];

      for (var i = 0; i < symbolVisualList.length; i++) {
        var symbolVisual = itemModel.getShallow(symbolVisualList[i], true);

        if (symbolVisual != null) {
          categoriesData.setItemVisual(idx, symbolVisualList[i], symbolVisual);
        }
      }
    });

    if (categoriesData.count()) {
      data.each(function (idx) {
        var model = data.getItemModel(idx);
        var categoryIdx = model.getShallow('category');

        if (categoryIdx != null) {
          if (typeof categoryIdx === 'string') {
            categoryIdx = categoryNameIdxMap['ec-' + categoryIdx];
          }

          var categoryStyle = categoriesData.getItemVisual(categoryIdx, 'style');
          var style = data.ensureUniqueItemVisual(idx, 'style');
          extend(style, categoryStyle);
          var visualList = ['symbol', 'symbolSize', 'symbolKeepAspect'];

          for (var i = 0; i < visualList.length; i++) {
            data.setItemVisual(idx, visualList[i], categoriesData.getItemVisual(categoryIdx, visualList[i]));
          }
        }
      });
    }
  });
}