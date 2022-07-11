
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
    this.trackPlushConfig = trackPlushConfig || {};
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
      var trackParams = entry.el.attributes['track-params'];
      var buttonName_1 = trackParams ? trackParams.value : null;
      entry.el.addEventListener('click', function () {
        _this.handleSendTrack({
          buttonName: buttonName_1,
          userAgent: _this.trackPlushConfig.userAgent || navigator.userAgent,
          pageUrl: _this.trackPlushConfig.pageUrl || window.location.href,
          projectName: _this.trackPlushConfig.projectName,
          actionType: '点击事件'
        });
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
    this.trackPlushConfig = trackPlushConfig || {};
  }

  Browse.prototype.handleBrowseEvent = function (entry) {
    if (entry.type === 'customize') {
      this.handleSendTrack({
        pageName: entry.pageName,
        userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
        pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
        projectName: this.trackPlushConfig.projectName,
        actionType: '浏览事件'
      });
    } else {
      var trackParams = entry.el.attributes['track-params'];
      var pageName = trackParams ? trackParams.value : null;
      this.handleSendTrack({
        pageName: pageName,
        userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
        pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
        projectName: this.trackPlushConfig.projectName,
        actionType: '浏览事件'
      });
    }
  };

  Browse.prototype.handleSendTrack = function (data) {
    createRequest({
      baseURL: this.trackPlushConfig.baseURL,
      url: this.trackPlushConfig.url,
      method: this.trackPlushConfig.method || 'POST',
      data: data
    });
  };

  return Browse;
}();

var install = function (app, trackPlushConfig) {
  app.directive('track', {
    mounted: function (el, binding) {
      var arg = binding.arg;
      arg.split('|').forEach(function (item) {
        if (item === 'click') {
          new Click(trackPlushConfig).handleClickEvent({
            el: el,
            type: 'instruction'
          });
        } else if (item === 'browse') {
          new Browse(trackPlushConfig).handleBrowseEvent({
            type: 'instruction',
            el: el
          });
        }
      });
    }
  });
};

var clickEvent = function (trackPlushConfig) {
  new Click(trackPlushConfig).handleClickEvent({
    buttonName: trackPlushConfig.buttonName,
    type: 'customize'
  });
};
var browseEvent = function (trackPlushConfig) {
  new Browse(trackPlushConfig).handleBrowseEvent({
    pageName: trackPlushConfig.pageName,
    type: 'customize'
  });
};
var index = {
  install: install
};

export { browseEvent, clickEvent, index as default };
