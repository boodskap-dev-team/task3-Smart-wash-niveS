
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

import { curry, each, assert, extend, map, keys } from 'zrender/lib/core/util';
import { makeInner } from '../../util/model';
var inner = makeInner();

function linkList(opt) {
  var mainData = opt.mainData;
  var datas = opt.datas;

  if (!datas) {
    datas = {
      main: mainData
    };
    opt.datasAttr = {
      main: 'data'
    };
  }

  opt.datas = opt.mainData = null;
  linkAll(mainData, datas, opt);
  each(datas, function (data) {
    each(mainData.TRANSFERABLE_METHODS, function (methodName) {
      data.wrapMethod(methodName, curry(transferInjection, opt));
    });
  });
  mainData.wrapMethod('cloneShallow', curry(cloneShallowInjection, opt));
  each(mainData.CHANGABLE_METHODS, function (methodName) {
    mainData.wrapMethod(methodName, curry(changeInjection, opt));
  });
  assert(datas[mainData.dataType] === mainData);
}

function transferInjection(opt, res) {
  if (isMainData(this)) {
    var datas = extend({}, inner(this).datas);
    datas[this.dataType] = res;
    linkAll(res, datas, opt);
  } else {
    linkSingle(res, this.dataType, inner(this).mainData, opt);
  }

  return res;
}

function changeInjection(opt, res) {
  opt.struct && opt.struct.update();
  return res;
}

function cloneShallowInjection(opt, res) {
  each(inner(res).datas, function (data, dataType) {
    data !== res && linkSingle(data.cloneShallow(), dataType, res, opt);
  });
  return res;
}

function getLinkedData(dataType) {
  var mainData = inner(this).mainData;
  return dataType == null || mainData == null ? mainData : inner(mainData).datas[dataType];
}

function getLinkedDataAll() {
  var mainData = inner(this).mainData;
  return mainData == null ? [{
    data: mainData
  }] : map(keys(inner(mainData).datas), function (type) {
    return {
      type: type,
      data: inner(mainData).datas[type]
    };
  });
}

function isMainData(data) {
  return inner(data).mainData === data;
}

function linkAll(mainData, datas, opt) {
  inner(mainData).datas = {};
  each(datas, function (data, dataType) {
    linkSingle(data, dataType, mainData, opt);
  });
}

function linkSingle(data, dataType, mainData, opt) {
  inner(mainData).datas[dataType] = data;
  inner(data).mainData = mainData;
  data.dataType = dataType;

  if (opt.struct) {
    data[opt.structAttr] = opt.struct;
    opt.struct[opt.datasAttr[dataType]] = data;
  }

  data.getLinkedData = getLinkedData;
  data.getLinkedDataAll = getLinkedDataAll;
}

export default linkList;