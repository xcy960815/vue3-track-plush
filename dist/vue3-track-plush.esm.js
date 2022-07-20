
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var createRequest = function (requestConfig) {
  var xhr = new XMLHttpRequest();
  xhr.timeout = 10000;
  if (!requestConfig.baseURL || !requestConfig.url) throw new Error("baseUrl属性或者url不能为空!");
  var url = "".concat(requestConfig.baseURL ? requestConfig.baseURL : "").concat(requestConfig.url ? requestConfig.url : "");
  var method = requestConfig.method.toUpperCase() || 'POST';
  xhr.open(method, url, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(requestConfig.data || {}));
};

var Click = function () {
  function Click(trackPlushConfig) {
    this.trackPlushConfig = trackPlushConfig;
  }

  Click.prototype.handleClickEvent = function (entry) {
    var _this = this;

    if (entry.type === 'customize') {
      this.handleSendTrack({
        buttonName: entry.buttonName,
        userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
        pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
        projectName: this.trackPlushConfig.projectName,
        actionType: '点击事件'
      });
    } else {
      entry.el.addEventListener('click', function () {
        var trackParams = entry.VNode.props['track-params'];

        if (typeof trackParams == "string") {
          _this.handleSendTrack({
            buttonName: trackParams,
            userAgent: _this.trackPlushConfig.userAgent || navigator.userAgent,
            pageUrl: _this.trackPlushConfig.pageUrl || window.location.href,
            projectName: _this.trackPlushConfig.projectName,
            actionType: '点击事件'
          });
        } else {
          _this.handleSendTrack(__assign({
            userAgent: _this.trackPlushConfig.userAgent || navigator.userAgent,
            pageUrl: _this.trackPlushConfig.pageUrl || window.location.href,
            projectName: _this.trackPlushConfig.projectName,
            actionType: '点击事件'
          }, trackParams));
        }
      });
    }
  };

  Click.prototype.handleSendTrack = function (trackParams) {
    createRequest({
      baseURL: this.trackPlushConfig.baseURL,
      url: this.trackPlushConfig.url,
      method: this.trackPlushConfig.method || 'POST',
      data: trackParams
    });
  };

  return Click;
}();

var Browse = function () {
  function Browse(trackPlushConfig) {
    this.trackPlushConfig = trackPlushConfig;
  }

  Browse.prototype.handleBrowseEvent = function (entry) {
    if (entry.type === 'customize') {
      var currentEntry = JSON.parse(JSON.stringify(entry));
      delete currentEntry.type;
      this.handleSendTrack(__assign({
        userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
        pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
        projectName: this.trackPlushConfig.projectName,
        actionType: '浏览事件'
      }, currentEntry));
    } else {
      var trackParams = entry.VNode.props['track-params'];

      if (typeof trackParams == "string") {
        this.handleSendTrack({
          pageName: trackParams,
          userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
          pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
          projectName: this.trackPlushConfig.projectName,
          actionType: '浏览事件'
        });
      } else {
        this.handleSendTrack(__assign({
          userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
          pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
          projectName: this.trackPlushConfig.projectName,
          actionType: '浏览事件'
        }, trackParams));
      }
    }
  };

  Browse.prototype.handleSendTrack = function (trackParams) {
    createRequest({
      baseURL: this.trackPlushConfig.baseURL,
      url: this.trackPlushConfig.url,
      method: this.trackPlushConfig.method || 'POST',
      data: trackParams
    });
  };

  return Browse;
}();

var ignoreField = ["baseURL", "url"];

var install = function (app, trackPlushConfig) {
  app.directive('track', {
    mounted: function (el, binding, VNode) {
      var arg = binding.arg;
      arg.split('|').forEach(function (item) {
        if (item === 'click') {
          new Click(trackPlushConfig).handleClickEvent({
            el: el,
            VNode: VNode,
            type: 'instruction'
          });
        } else if (item === 'browse') {
          new Browse(trackPlushConfig).handleBrowseEvent({
            type: 'instruction',
            VNode: VNode
          });
        }
      });
    }
  });
};

var clickEvent = function (trackPlushConfig) {
  var clickEventParams = {};
  Object.keys(trackPlushConfig).forEach(function (key) {
    if (!ignoreField.includes(key)) clickEventParams[key] = trackPlushConfig[key];
  });
  new Click(trackPlushConfig).handleClickEvent(__assign(__assign({}, clickEventParams), {
    type: 'customize'
  }));
};
var browseEvent = function (trackPlushConfig) {
  var browseEventParams = {};
  Object.keys(trackPlushConfig).forEach(function (key) {
    if (!ignoreField.includes(key)) browseEventParams[key] = trackPlushConfig[key];
  });
  new Browse(trackPlushConfig).handleBrowseEvent(__assign(__assign({}, browseEventParams), {
    type: 'customize'
  }));
};
var index = {
  install: install
};

export { browseEvent, clickEvent, index as default };
