
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

import { defaults } from 'zrender/lib/core/util';
export function installTimelineAction(registers) {
  registers.registerAction({
    type: 'timelineChange',
    event: 'timelineChanged',
    update: 'prepareAndUpdate'
  }, function (payload, ecModel) {
    var timelineModel = ecModel.getComponent('timeline');

    if (timelineModel && payload.currentIndex != null) {
      timelineModel.setCurrentIndex(payload.currentIndex);

      if (!timelineModel.get('loop', true) && timelineModel.isIndexMax()) {
        timelineModel.setPlayState(false);
      }
    }

    ecModel.resetOption('timeline', {
      replaceMerge: timelineModel.get('replaceMerge', true)
    });
    return defaults({
      currentIndex: timelineModel.option.currentIndex
    }, payload);
  });
  registers.registerAction({
    type: 'timelinePlayChange',
    event: 'timelinePlayChanged',
    update: 'update'
  }, function (payload, ecModel) {
    var timelineModel = ecModel.getComponent('timeline');

    if (timelineModel && payload.playState != null) {
      timelineModel.setPlayState(payload.playState);
    }
  });
}