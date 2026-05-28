//#region plugin/transport/index.ts
var e = "POST", t = (e) => {
	if (!e.baseURL || !e.url) throw Error("baseURL 或 url 不能为空");
}, n = (e) => `${e.baseURL}${e.url}`, r = (e, t) => {
	if (typeof navigator > "u" || typeof navigator.sendBeacon != "function") return !1;
	let n = new Blob([JSON.stringify(t)], { type: "application/json;charset=UTF-8" });
	return navigator.sendBeacon(e, n);
}, i = (e, t, n) => {
	if (typeof fetch != "function") {
		a(e, t, n);
		return;
	}
	fetch(e, {
		method: t,
		credentials: "include",
		headers: { "Content-Type": "application/json;charset=UTF-8" },
		body: JSON.stringify(n),
		keepalive: !0
	}).catch(() => {
		a(e, t, n);
	});
}, a = (e, t, n) => {
	let r = new XMLHttpRequest();
	r.timeout = 1e4, r.open(t, e, !0), r.withCredentials = !0, r.setRequestHeader("Content-type", "application/json;charset=UTF-8"), r.send(JSON.stringify(n || {}));
}, o = { send(a) {
	t(a);
	let o = n(a), s = (a.method || e).toUpperCase();
	s === "POST" && r(o, a.data) || i(o, s, a.data);
} }, s = 20, c = 2e3, l = "vue3-track-plush:exposure-queue", u = () => typeof window < "u", d = (e) => {
	if (e.exposureQueueStorage) return e.exposureQueueStorage;
	if (u()) try {
		return window.localStorage;
	} catch {
		return;
	}
}, f = class {
	constructor(e) {
		this.queue = [], this.timer = null, this.attachedLifecycleFlush = !1, this.config = e.config, this.transport = e.transport, this.maxSize = this.resolvePositiveNumber(this.config.exposureQueueMaxSize, s), this.flushInterval = this.resolvePositiveNumber(this.config.exposureQueueFlushInterval, c), this.storageKey = this.config.exposureQueueStorageKey || l, this.storage = d(this.config), this.restoreFromStorage(), this.attachLifecycleFlush();
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
		if (!u() || this.attachedLifecycleFlush) return;
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
}, p = {
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
}, m = (e) => p[e], h = class {
	constructor(e) {
		this.config = e, this.transport = e.transport || o;
	}
	track(e, t = {}) {
		let n = m(e), r = {
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
			data: r
		});
	}
	getExposureQueue() {
		return this.exposureQueue ||= new f({
			config: this.config,
			transport: this.transport
		}), this.exposureQueue;
	}
}, g = new Set([
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
]), _ = (e, t) => typeof t == "string" ? { [m(e).meta.stringParamKey]: t } : t || {}, v = (e, t) => {
	let n = t.binding.value;
	if (n !== void 0) return _(e, n);
	let r = t.vnode.props;
	return _(e, r?.["track-params"] || r?.trackParams);
}, y = (e, t) => {
	let n = _(e, t);
	return Object.entries(n).reduce((e, [t, n]) => (g.has(t) || (e[t] = n), e), {});
}, b = (e, t) => {
	e.track("browse", v("browse", t));
}, x = /* @__PURE__ */ new WeakMap(), S = (e, t) => {
	let n = x.get(e) || [];
	n.push(t), x.set(e, n);
}, C = (e) => {
	let t = x.get(e);
	t && (t.forEach((e) => e()), x.delete(e));
}, w = (e, t) => {
	let n = () => {
		e.track("click", v("click", t));
	};
	t.el.addEventListener("click", n), S(t.el, () => {
		t.el.removeEventListener("click", n);
	});
}, T = .5, E = (e) => {
	if (!(typeof e != "number" || Number.isNaN(e))) return e;
}, D = (e) => Math.min(Math.max(e, 0), 1), O = (e, t) => {
	let n = E(t.exposureThreshold) || E(t.threshold) || e.exposureThreshold || T, r = E(t.exposureDuration) || E(t.duration) || e.exposureDuration || 0;
	return {
		once: typeof t.once == "boolean" ? t.once : e.exposureOnce !== !1,
		threshold: D(n),
		duration: Math.max(r, 0),
		root: t.root || e.exposureRoot || null,
		rootMargin: typeof t.rootMargin == "string" ? t.rootMargin : e.exposureRootMargin || "0px"
	};
}, k = (e) => {
	let { duration: t, exposureDuration: n, exposureRoot: r, exposureRootMargin: i, exposureThreshold: a, once: o, root: s, rootMargin: c, threshold: l, ...u } = e;
	return u;
}, A = (e, t, n) => {
	let r = v("exposure", t), i = O(n, r), a = k(r), o = !1, s = null, c = () => {
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
	u.observe(t.el), S(t.el, () => {
		c(), u.disconnect();
	});
}, j = [
	"click",
	"browse",
	"exposure"
], M = (e) => e ? e.split("|").map((e) => e.trim()).filter((e) => j.includes(e)) : [], N = (e) => {
	let t = new h(e);
	return {
		mounted(n, r, i) {
			let a = {
				el: n,
				binding: r,
				vnode: i
			};
			M(r.arg).forEach((n) => {
				n === "click" && w(t, a), n === "browse" && b(t, a), n === "exposure" && A(t, a, e);
			});
		},
		unmounted(e) {
			C(e);
		}
	};
}, P = (e, t) => {
	e.directive("track", N(t));
}, F = (e) => {
	new h(e).track("click", y("click", e));
}, I = (e) => {
	new h(e).track("browse", y("browse", e));
}, L = (e) => {
	new h(e).track("exposure", y("exposure", e));
}, R = { install: P };
//#endregion
export { I as browseEvent, F as clickEvent, R as default, L as exposureEvent, P as vue3TrackPlush };
