//#region plugin/transport/index.ts
var e = "POST", t = (e) => {
	if (!e.baseURL || !e.url) throw Error("baseURL 或 url 不能为空");
}, n = (e) => `${e.baseURL}${e.url}`, r = (e) => {
	console.log("[vue3-track-plush debug]", JSON.stringify(e.data, null, 2));
}, i = (e, t) => {
	if (typeof navigator > "u" || typeof navigator.sendBeacon != "function") return !1;
	let n = new Blob([JSON.stringify(t)], { type: "application/json;charset=UTF-8" });
	return navigator.sendBeacon(e, n);
}, a = (e, t, n) => {
	if (typeof fetch != "function") {
		o(e, t, n);
		return;
	}
	fetch(e, {
		method: t,
		credentials: "include",
		headers: { "Content-Type": "application/json;charset=UTF-8" },
		body: JSON.stringify(n),
		keepalive: !0
	}).catch(() => {
		o(e, t, n);
	});
}, o = (e, t, n) => {
	let r = new XMLHttpRequest();
	r.timeout = 1e4, r.open(t, e, !0), r.withCredentials = !0, r.setRequestHeader("Content-type", "application/json;charset=UTF-8"), r.send(JSON.stringify(n || {}));
}, s = { send(o) {
	if (t(o), o.debug) {
		r(o);
		return;
	}
	let s = n(o), c = (o.method || e).toUpperCase();
	c === "POST" && i(s, o.data) || a(s, c, o.data);
} }, c = 20, l = 2e3, u = "vue3-track-plush:exposure-queue", d = () => typeof window < "u", f = (e) => {
	if (e.exposureQueueStorage) return e.exposureQueueStorage;
	if (d()) try {
		return window.localStorage;
	} catch {
		return;
	}
}, p = class {
	constructor(e) {
		this.queue = [], this.timer = null, this.attachedLifecycleFlush = !1, this.config = e.config, this.transport = e.transport, this.maxSize = this.resolvePositiveNumber(this.config.exposureQueueMaxSize, c), this.flushInterval = this.resolvePositiveNumber(this.config.exposureQueueFlushInterval, l), this.storageKey = this.config.exposureQueueStorageKey || u, this.storage = f(this.config), this.restoreFromStorage(), this.attachLifecycleFlush();
	}
	push(e) {
		if (this.queue.push(e), this.persist(), this.queue.length >= this.maxSize) {
			this.flush();
			return;
		}
		this.scheduleFlush();
	}
	flush() {
		if (!this.queue.length) return;
		this.clearTimer();
		let e = this.queue.splice(0, this.maxSize);
		this.persist(), this.transport.send({
			baseURL: this.config.baseURL,
			url: this.config.url,
			method: this.config.method,
			debug: this.config.debug,
			data: e
		}), this.queue.length && this.scheduleFlush();
	}
	scheduleFlush() {
		this.timer ||= setTimeout(() => {
			this.flush();
		}, this.flushInterval);
	}
	clearTimer() {
		this.timer &&= (clearTimeout(this.timer), null);
	}
	persist() {
		if (this.storage) {
			if (!this.queue.length) {
				this.storage.removeItem(this.storageKey);
				return;
			}
			this.storage.setItem(this.storageKey, JSON.stringify(this.queue));
		}
	}
	restoreFromStorage() {
		if (!this.storage) return;
		let e = this.storage.getItem(this.storageKey);
		if (e) try {
			let t = JSON.parse(e);
			Array.isArray(t) && this.queue.push(...t), this.persist(), this.scheduleFlush();
		} catch {
			this.storage.removeItem(this.storageKey);
		}
	}
	attachLifecycleFlush() {
		if (!d() || this.attachedLifecycleFlush) return;
		let e = () => {
			this.flush();
		};
		window.addEventListener("pagehide", e), document.addEventListener("visibilitychange", () => {
			document.visibilityState === "hidden" && e();
		}), this.attachedLifecycleFlush = !0;
	}
	resolvePositiveNumber(e, t) {
		return typeof e != "number" || Number.isNaN(e) || e <= 0 ? t : e;
	}
}, m = {
	click: {
		type: "click",
		meta: {
			actionType: "点击事件",
			stringParamKey: "buttonName"
		}
	},
	browse: {
		type: "browse",
		meta: {
			actionType: "浏览事件",
			stringParamKey: "pageName"
		}
	},
	exposure: {
		type: "exposure",
		meta: {
			actionType: "曝光事件",
			stringParamKey: "exposureName"
		}
	}
}, h = (e) => m[e], g = class {
	constructor(e) {
		this.config = e, this.transport = e.transport || s;
	}
	track(e, t = {}) {
		let n = h(e), r = {
			userAgent: this.config.userAgent || navigator.userAgent,
			pageUrl: this.config.pageUrl || window.location.href,
			projectName: this.config.projectName,
			actionType: n.meta.actionType,
			...t
		};
		if (e === "exposure") {
			this.getExposureQueue().push(r);
			return;
		}
		this.transport.send({
			baseURL: this.config.baseURL,
			url: this.config.url,
			method: this.config.method,
			debug: this.config.debug,
			data: r
		});
	}
	getExposureQueue() {
		return this.exposureQueue ||= new p({
			config: this.config,
			transport: this.transport
		}), this.exposureQueue;
	}
}, _ = new Set([
	"baseURL",
	"exposureDuration",
	"exposureOnce",
	"exposureRoot",
	"exposureRootMargin",
	"exposureThreshold",
	"method",
	"transport",
	"type",
	"url"
]), v = (e, t) => typeof t == "string" ? { [h(e).meta.stringParamKey]: t } : t || {}, y = (e, t) => {
	let n = t.binding.value;
	if (n !== void 0) return v(e, n);
	let r = t.vnode.props;
	return v(e, r?.["track-params"] || r?.trackParams);
}, b = (e, t) => {
	let n = v(e, t);
	return Object.entries(n).reduce((e, [t, n]) => (_.has(t) || (e[t] = n), e), {});
}, x = (e, t) => {
	e.track("browse", y("browse", t));
}, S = /* @__PURE__ */ new WeakMap(), C = (e, t) => {
	let n = S.get(e) || [];
	n.push(t), S.set(e, n);
}, w = (e) => {
	let t = S.get(e);
	t && (t.forEach((e) => e()), S.delete(e));
}, T = (e, t) => {
	let n = () => {
		e.track("click", y("click", t));
	};
	t.el.addEventListener("click", n), C(t.el, () => {
		t.el.removeEventListener("click", n);
	});
}, E = .5, D = (e) => {
	if (!(typeof e != "number" || Number.isNaN(e))) return e;
}, O = (e) => Math.min(Math.max(e, 0), 1), k = (e, t) => {
	let n = D(t.exposureThreshold) || D(t.threshold) || e.exposureThreshold || E, r = D(t.exposureDuration) || D(t.duration) || e.exposureDuration || 0;
	return {
		once: typeof t.once == "boolean" ? t.once : e.exposureOnce !== !1,
		threshold: O(n),
		duration: Math.max(r, 0),
		root: t.root || e.exposureRoot || null,
		rootMargin: typeof t.rootMargin == "string" ? t.rootMargin : e.exposureRootMargin || "0px"
	};
}, A = (e) => {
	let { duration: t, exposureDuration: n, exposureRoot: r, exposureRootMargin: i, exposureThreshold: a, once: o, root: s, rootMargin: c, threshold: l, ...u } = e;
	return u;
}, j = (e, t, n) => {
	let r = y("exposure", t), i = k(n, r), a = A(r), o = !1, s = null, c = () => {
		s &&= (clearTimeout(s), null);
	}, l = () => {
		i.once && o || (o = !0, e.track("exposure", a));
	};
	if (!("IntersectionObserver" in window)) {
		l();
		return;
	}
	let u = new IntersectionObserver((e) => {
		e.forEach((e) => {
			if (!e.isIntersecting) {
				c();
				return;
			}
			if (i.duration > 0) {
				c(), s = setTimeout(() => {
					l(), i.once && u.disconnect();
				}, i.duration);
				return;
			}
			l(), i.once && u.disconnect();
		});
	}, {
		root: i.root,
		rootMargin: i.rootMargin,
		threshold: i.threshold
	});
	u.observe(t.el), C(t.el, () => {
		c(), u.disconnect();
	});
}, M = [
	"click",
	"browse",
	"exposure"
], N = (e) => e ? e.split("|").map((e) => e.trim()).filter((e) => M.includes(e)) : [], P = (e) => {
	let t = new g(e);
	return {
		mounted(n, r, i) {
			let a = {
				el: n,
				binding: r,
				vnode: i
			};
			N(r.arg).forEach((n) => {
				n === "click" && T(t, a), n === "browse" && x(t, a), n === "exposure" && j(t, a, e);
			});
		},
		unmounted(e) {
			w(e);
		}
	};
}, F = (e, t) => {
	e.directive("track", P(t));
}, I = (e) => {
	new g(e).track("click", b("click", e));
}, L = (e) => {
	new g(e).track("browse", b("browse", e));
}, R = (e) => {
	new g(e).track("exposure", b("exposure", e));
}, z = { install: F };
//#endregion
export { L as browseEvent, I as clickEvent, z as default, R as exposureEvent, F as vue3TrackPlush };
