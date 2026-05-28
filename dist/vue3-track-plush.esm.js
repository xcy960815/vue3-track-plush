//#region plugin/fetch.ts
var e = "POST", t = (t) => {
	if (!t.baseURL || !t.url) throw Error("baseURL 或 url 不能为空");
	let n = new XMLHttpRequest(), r = `${t.baseURL}${t.url}`, i = (t.method || e).toUpperCase();
	n.timeout = 1e4, n.open(i, r, !0), n.withCredentials = !0, n.setRequestHeader("Content-type", "application/json;charset=UTF-8"), n.send(JSON.stringify(t.data || {}));
}, n = (e) => {
	if (e.binding?.value !== void 0) return e.binding.value;
	let t = e.vnode?.props;
	return t?.["track-params"] || t?.trackParams;
}, r = (e) => {
	let { baseURL: t, method: n, type: r, url: i, ...a } = e;
	return a;
}, i = class {
	constructor(e) {
		this.trackPlushConfig = e;
	}
	handleBrowseEvent(e) {
		if (e.type === "customize") {
			this.sendBrowseTrack(r(e));
			return;
		}
		this.sendBrowseTrack(this.resolveDirectiveParams(e));
	}
	resolveDirectiveParams(e) {
		let t = n(e);
		return typeof t == "string" ? { pageName: t } : t || {};
	}
	sendBrowseTrack(e) {
		this.handleSendTrack({
			userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
			pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
			projectName: this.trackPlushConfig.projectName,
			actionType: "浏览事件",
			...e
		});
	}
	handleSendTrack(e) {
		t({
			baseURL: this.trackPlushConfig.baseURL,
			url: this.trackPlushConfig.url,
			method: this.trackPlushConfig.method,
			data: e
		});
	}
}, a = class {
	constructor(e) {
		this.trackPlushConfig = e;
	}
	handleClickEvent(e) {
		if (e.type === "customize") {
			this.sendClickTrack(r(e));
			return;
		}
		e.el?.addEventListener("click", () => {
			this.sendClickTrack(this.resolveDirectiveParams(e));
		});
	}
	resolveDirectiveParams(e) {
		let t = n(e);
		return typeof t == "string" ? { buttonName: t } : t || {};
	}
	sendClickTrack(e) {
		this.handleSendTrack({
			userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
			pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
			projectName: this.trackPlushConfig.projectName,
			actionType: "点击事件",
			...e
		});
	}
	handleSendTrack(e) {
		t({
			baseURL: this.trackPlushConfig.baseURL,
			url: this.trackPlushConfig.url,
			method: this.trackPlushConfig.method,
			data: e
		});
	}
}, o = .5, s = class {
	constructor(e) {
		this.trackPlushConfig = e;
	}
	handleExposureEvent(e) {
		if (e.type === "customize") {
			this.sendExposureTrack(r(e));
			return;
		}
		if (!e.el) return;
		if (!("IntersectionObserver" in window)) {
			this.sendExposureTrack(this.resolveDirectiveParams(e));
			return;
		}
		let t = new IntersectionObserver((n) => {
			n.forEach((n) => {
				n.isIntersecting && (this.sendExposureTrack(this.resolveDirectiveParams(e)), t.unobserve(n.target), t.disconnect());
			});
		}, { threshold: this.resolveThreshold() });
		t.observe(e.el);
	}
	resolveDirectiveParams(e) {
		let t = n(e);
		return typeof t == "string" ? { exposureName: t } : t || {};
	}
	resolveThreshold() {
		let e = this.trackPlushConfig.exposureThreshold;
		return typeof e != "number" || Number.isNaN(e) ? o : Math.min(Math.max(e, 0), 1);
	}
	sendExposureTrack(e) {
		this.handleSendTrack({
			userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
			pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
			projectName: this.trackPlushConfig.projectName,
			actionType: "曝光事件",
			...e
		});
	}
	handleSendTrack(e) {
		t({
			baseURL: this.trackPlushConfig.baseURL,
			url: this.trackPlushConfig.url,
			method: this.trackPlushConfig.method,
			data: e
		});
	}
}, c = "click", l = "browse", u = "exposure", d = (e) => e ? e.split("|").map((e) => e.trim()).filter(Boolean) : [], f = (e, t) => {
	e.directive("track", { mounted(e, n, r) {
		d(n.arg).forEach((o) => {
			o === c && new a(t).handleClickEvent({
				el: e,
				binding: n,
				vnode: r,
				type: "instruction"
			}), o === l && new i(t).handleBrowseEvent({
				binding: n,
				vnode: r,
				type: "instruction"
			}), o === u && new s(t).handleExposureEvent({
				el: e,
				binding: n,
				vnode: r,
				type: "instruction"
			});
		});
	} });
}, p = (e) => {
	new a(e).handleClickEvent({
		...e,
		type: "customize"
	});
}, m = (e) => {
	new i(e).handleBrowseEvent({
		...e,
		type: "customize"
	});
}, h = (e) => {
	new s(e).handleExposureEvent({
		...e,
		type: "customize"
	});
}, g = { install: f };
//#endregion
export { m as browseEvent, p as clickEvent, g as default, h as exposureEvent, f as vue3TrackPlush };
