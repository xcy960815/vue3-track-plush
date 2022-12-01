
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue3TrackPlush = {}));
})(this, (function (exports) { 'use strict';

    var createRequest = function (requestConfig) {
      var url = "".concat(requestConfig.baseURL ? requestConfig.baseURL : "").concat(requestConfig.url ? requestConfig.url : "");
      var blob = new Blob([JSON.stringify(requestConfig.data || {})], {
        type: "application/json"
      });
      navigator.sendBeacon(url, blob);
    };

    var Click = function () {
      function Click(trackConfig) {
        var _this = this;

        this.handleClickEvent = function () {
          _this.handleSendTrack(typeof _this.trackParams == "object" ? _this.trackParams : {
            buttonName: _this.trackParams
          });
        };

        this.trackConfig = trackConfig;
      }

      Click.getInstance = function (trackConfig) {
        if (!this.instance) {
          this.instance = new Click(trackConfig);
        }

        return this.instance;
      };

      Click.prototype.handleAddClickEvent = function (params) {
        var el = params.el,
            trackParams = params.trackParams;
        this.trackParams = trackParams;
        el.addEventListener('click', this.handleClickEvent);
      };

      Click.prototype.handleRemoveClickEvent = function (el) {
        el.removeEventListener('click', this.handleClickEvent);
      };

      Click.prototype.handleSendTrack = function (trackParams) {
        var requestParams = Object.assign({
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
          projectName: this.trackConfig.projectName,
          actionType: '点击事件'
        }, trackParams);
        createRequest({
          baseURL: this.trackConfig.baseURL,
          url: this.trackConfig.url,
          data: requestParams
        });
      };

      return Click;
    }();

    var Browse = function () {
      function Browse(trackConfig) {
        this.trackConfig = trackConfig;
      }

      Browse.getInstance = function (trackConfig) {
        if (!this.instance) {
          this.instance = new Browse(trackConfig);
        }

        return this.instance;
      };

      Browse.prototype.handleBrowseEvent = function (trackParams) {
        this.handleSendTrack(typeof trackParams === 'object' ? trackParams : {
          pageName: trackParams
        });
      };

      Browse.prototype.handleSendTrack = function (trackParams) {
        var requestParams = Object.assign({
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
          projectName: this.trackConfig.projectName,
          actionType: '浏览事件'
        }, trackParams);
        createRequest({
          baseURL: this.trackConfig.baseURL,
          url: this.trackConfig.url,
          data: requestParams
        });
      };

      return Browse;
    }();

    var clickEvent = function (trackConfig) {
      var clickInstance = new Click(trackConfig);
      var trackParams = {};
      Object.keys(trackConfig).forEach(function (key) {
        if (!['baseURL', 'url', 'projectName'].includes(key)) {
          var value = trackConfig[key];
          trackParams[key] = value;
        }
      });
      clickInstance.handleSendTrack(trackParams);
    };
    var browseEvent = function (trackConfig) {
      var browserInstance = new Browse(trackConfig);
      var trackParams = {};
      Object.keys(trackConfig).forEach(function (key) {
        if (!['baseURL', 'url', 'projectName'].includes(key)) {
          var value = trackConfig[key];
          trackParams[key] = value;
        }
      });
      browserInstance.handleSendTrack(trackParams);
    };

    var Vue3TrackPlush = function () {
      function Vue3TrackPlush() {}

      Vue3TrackPlush.install = function (app, trackConfig) {
        Vue3TrackPlush.prototype.clickInstance = Click.getInstance(trackConfig);
        Vue3TrackPlush.prototype.browserInstance = Browse.getInstance(trackConfig);
        app.directive('track', {
          mounted: function (el, binding) {
            var trackType = binding.arg,
                trackParams = binding.value;

            switch (trackType) {
              case 'click':
                Vue3TrackPlush.prototype.clickInstance.handleAddClickEvent({
                  el: el,
                  trackParams: trackParams
                });
                break;

              case 'browse':
                Vue3TrackPlush.prototype.browserInstance.handleBrowseEvent(trackParams);
                break;
            }
          },
          updated: function (el, binding) {
            var trackType = binding.arg,
                value = binding.value,
                oldValue = binding.oldValue;

            if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
              switch (trackType) {
                case 'click':
                  Vue3TrackPlush.prototype.clickInstance.handleRemoveClickEvent(el);
                  Vue3TrackPlush.prototype.clickInstance.handleAddClickEvent({
                    el: el,
                    trackParams: value
                  });
                  break;

                case 'browse':
                  Vue3TrackPlush.prototype.browserInstance.handleBrowseEvent(value);
                  break;
              }
            }
          },
          unmounted: function (el, binding) {
            var trackType = binding.arg;

            switch (trackType) {
              case 'click':
                Vue3TrackPlush.prototype.clickInstance.handleRemoveClickEvent(el);
                break;
            }
          }
        });
      };

      return Vue3TrackPlush;
    }();

    exports.browseEvent = browseEvent;
    exports.clickEvent = clickEvent;
    exports["default"] = Vue3TrackPlush;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
