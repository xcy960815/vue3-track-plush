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
		s(e, t, n);
		return;
	}
	fetch(e, {
		method: t,
		credentials: "include",
		headers: { "Content-Type": "application/json;charset=UTF-8" },
		body: JSON.stringify(n),
		keepalive: !0
	}).catch(() => {
		s(e, t, n);
	});
}, o = (e, t) => {
	let n = Array.isArray(t) ? { list: t } : t, r = new URLSearchParams();
	Object.entries(n).forEach(([e, t]) => {
		t != null && r.append(e, typeof t == "string" ? t : JSON.stringify(t));
	});
	let i = r.toString();
	return i ? `${e}${e.includes("?") ? "&" : "?"}${i}` : e;
}, s = (e, t, n, r, i = r?.retry || 0) => {
	let a = new XMLHttpRequest();
	a.timeout = r?.timeout || 1e4, a.open(t, t === "GET" ? o(e, n) : e, !0), a.withCredentials = r?.withCredentials ?? !0, a.setRequestHeader("Content-type", "application/json;charset=UTF-8"), Object.entries(r?.headers || {}).forEach(([e, t]) => {
		try {
			a.setRequestHeader(e, t);
		} catch {}
	});
	let c = () => {
		i <= 0 || window.setTimeout(() => {
			s(e, t, n, r, i - 1);
		}, r?.retryDelay || 300);
	};
	a.onerror = c, a.ontimeout = c, a.onreadystatechange = () => {
		a.readyState === 4 && (a.status >= 200 && a.status < 300 || c());
	}, a.send(t === "GET" ? null : JSON.stringify(n || {}));
}, c = { send(o) {
	if (t(o), o.debug) {
		r(o);
		return;
	}
	let c = n(o), l = (o.method || e).toUpperCase();
	if (!(l === "POST" && i(c, o.data))) {
		if (l === "POST" && !o.headers && o.withCredentials === void 0 && o.timeout === void 0 && o.retry === void 0 && o.retryDelay === void 0) {
			a(c, l, o.data);
			return;
		}
		s(c, l, o.data, o);
	}
} }, l = {
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
}, u = (e) => l[e], d = .5, f = 0, p = !0, m = null, h = "0px", g = 20, _ = 2e3, v = "vue3-track-plush:exposure-queue", y = new Set([
	"baseURL",
	"debug",
	"exposure",
	"exposureDuration",
	"exposureOnce",
	"exposureQueueFlushInterval",
	"exposureQueueMaxSize",
	"exposureQueueStorage",
	"exposureQueueStorageKey",
	"exposureRoot",
	"exposureRootMargin",
	"exposureThreshold",
	"headers",
	"method",
	"queue",
	"retry",
	"retryDelay",
	"timeout",
	"transport",
	"type",
	"url",
	"withCredentials"
]), b = (e) => {
	if (!(typeof e != "number" || Number.isNaN(e))) return e;
}, x = (e) => {
	let t = b(e);
	if (!(t === void 0 || t <= 0)) return t;
}, S = (e, t) => typeof t == "string" ? { [u(e).meta.stringParamKey]: t } : t || {}, C = (e, t) => {
	let n = t.binding.value;
	if (n !== void 0) return S(e, n);
	let r = t.vnode.props;
	return S(e, r?.["track-params"] || r?.trackParams);
}, w = (e, t) => {
	let n = S(e, t);
	return Object.entries(n).reduce((e, [t, n]) => (y.has(t) || (e[t] = n), e), {});
}, T = (e) => ({
	...e,
	exposureThreshold: b(e.exposureThreshold) ?? b(e.exposure?.threshold) ?? d,
	exposureDuration: b(e.exposureDuration) ?? b(e.exposure?.duration) ?? f,
	exposureOnce: e.exposureOnce ?? e.exposure?.once ?? p,
	exposureRoot: e.exposureRoot ?? e.exposure?.root ?? m,
	exposureRootMargin: e.exposureRootMargin ?? e.exposure?.rootMargin ?? h,
	exposureQueueMaxSize: x(e.exposureQueueMaxSize) ?? x(e.queue?.maxBatchSize) ?? g,
	exposureQueueFlushInterval: x(e.exposureQueueFlushInterval) ?? x(e.queue?.flushInterval) ?? _,
	exposureQueueStorageKey: e.exposureQueueStorageKey ?? e.queue?.storageKey ?? v,
	debug: e.debug ?? !1
}), E = () => typeof window < "u", D = (e) => {
	if (e.exposureQueueStorage) return e.exposureQueueStorage;
	if (E()) try {
		return window.localStorage;
	} catch {
		return;
	}
}, O = class {
	constructor(e) {
		this.queue = [], this.timer = null, this.attachedLifecycleFlush = !1, this.config = e.config, this.transport = e.transport, this.maxSize = this.config.exposureQueueMaxSize, this.flushInterval = this.config.exposureQueueFlushInterval, this.storageKey = this.config.exposureQueueStorageKey, this.storage = D(this.config), this.restoreFromStorage(), this.attachLifecycleFlush();
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
			timeout: this.config.timeout,
			withCredentials: this.config.withCredentials,
			headers: this.config.headers,
			retry: this.config.retry,
			retryDelay: this.config.retryDelay,
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
		if (!E() || this.attachedLifecycleFlush) return;
		let e = () => {
			this.flush();
		};
		window.addEventListener("pagehide", e), document.addEventListener("visibilitychange", () => {
			document.visibilityState === "hidden" && e();
		}), this.attachedLifecycleFlush = !0;
	}
}, k = class {
	constructor(e) {
		this.config = T(e), this.transport = this.config.transport || c;
	}
	track(e, t = {}) {
		let n = u(e), r = {
			userAgent: this.config.userAgent || navigator.userAgent,
			pageUrl: this.config.pageUrl || window.location.href,
			projectName: this.config.projectName,
			actionType: n.meta.actionType,
			timestamp: Date.now(),
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
			timeout: this.config.timeout,
			withCredentials: this.config.withCredentials,
			headers: this.config.headers,
			retry: this.config.retry,
			retryDelay: this.config.retryDelay,
			data: r
		});
	}
	getExposureQueue() {
		return this.exposureQueue ||= new O({
			config: this.config,
			transport: this.transport
		}), this.exposureQueue;
	}
}, A = (e, t) => {
	e.track("browse", C("browse", t));
}, j = /* @__PURE__ */ new WeakMap(), M = (e, t) => {
	let n = j.get(e) || [];
	n.push(t), j.set(e, n);
}, N = (e) => {
	let t = j.get(e);
	t && (t.forEach((e) => e()), j.delete(e));
}, P = (e, t) => {
	let n = () => {
		e.track("click", C("click", t));
	};
	t.el.addEventListener("click", n), M(t.el, () => {
		t.el.removeEventListener("click", n);
	});
}, F = (e) => {
	if (!(typeof e != "number" || Number.isNaN(e))) return e;
}, I = (e) => Math.min(Math.max(e, 0), 1), L = (e, t) => {
	let n = F(t.exposureThreshold) ?? F(t.threshold) ?? e.exposureThreshold, r = F(t.exposureDuration) ?? F(t.duration) ?? e.exposureDuration;
	return {
		once: typeof t.once == "boolean" ? t.once : typeof t.exposureOnce == "boolean" ? t.exposureOnce : e.exposureOnce,
		threshold: I(n),
		duration: Math.max(r, 0),
		root: t.root ?? t.exposureRoot ?? e.exposureRoot,
		rootMargin: typeof t.rootMargin == "string" ? t.rootMargin : typeof t.exposureRootMargin == "string" ? t.exposureRootMargin : e.exposureRootMargin
	};
}, R = (e) => {
	let { duration: t, exposureDuration: n, exposureRoot: r, exposureRootMargin: i, exposureThreshold: a, once: o, root: s, rootMargin: c, threshold: l, ...u } = e;
	return u;
}, z = (e, t, n) => {
	let r = C("exposure", t), i = L(n, r), a = R(r), o = !1, s = null, c = () => {
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
	u.observe(t.el), M(t.el, () => {
		c(), u.disconnect();
	});
}, B = [
	"click",
	"browse",
	"exposure"
], V = (e) => e ? e.split("|").map((e) => e.trim()).filter((e) => B.includes(e)) : [], H = (e) => {
	try {
		return JSON.stringify(e);
	} catch {
		return "";
	}
}, U = (e) => {
	let t = T(e), n = new k(e);
	return {
		mounted(e, r, i) {
			let a = {
				el: e,
				binding: r,
				vnode: i
			};
			V(r.arg).forEach((e) => {
				e === "click" && P(n, a), e === "browse" && A(n, a), e === "exposure" && z(n, a, t);
			});
		},
		updated(e, r, i) {
			let a = V(r.arg);
			if (!a.length || H(r.value) === H(r.oldValue)) return;
			let o = {
				el: e,
				binding: r,
				vnode: i
			};
			a.includes("browse") && n.track("browse", C("browse", o)), (a.includes("click") || a.includes("exposure")) && (N(e), a.includes("click") && P(n, o), a.includes("exposure") && z(n, o, t));
		},
		unmounted(e) {
			N(e);
		}
	};
}, W = (e, t) => {
	e.directive("track", U(t));
}, G = (e) => {
	new k(e).track("click", w("click", e));
}, K = (e) => {
	new k(e).track("browse", w("browse", e));
}, q = (e) => {
	new k(e).track("exposure", w("exposure", e));
}, J = { install: W };
//#endregion
export { K as browseEvent, G as clickEvent, J as default, q as exposureEvent, W as vue3TrackPlush };
