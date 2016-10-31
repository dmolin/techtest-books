import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);
global.$ = $
global.expect = expect
global.sinon = sinon

chaiJquery(chai, chai.util, $);

chai.use(sinonChai)

function renderComponent(ComponentClass, props) {
  return TestUtils.renderIntoDocument(<ComponentClass {...props} />)
}

function getEl(componentInstance) {
  return $(ReactDOM.findDOMNode(componentInstance))
}

function findByType(...args) {
  return TestUtils.findRenderedComponentWithType(...args)
}

function isObject(o) {
  return typeof o === 'object' && o !== null
}

$.fn.simulate = function(eventName, valueOrConfig) {
  const isValue = !isObject(valueOrConfig)

  if (isValue) {
    this.val(valueOrConfig);
  }
  TestUtils.Simulate[eventName](this[0], isValue ? undefined : valueOrConfig);
};

export {renderComponent, getEl, findByType};
