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
} }, s = {
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
}, c = (e) => s[e], l = class {
	constructor(e) {
		this.config = e, this.transport = e.transport || o;
	}
	track(e, t = {}) {
		let n = c(e), r = {
			userAgent: this.config.userAgent || navigator.userAgent,
			pageUrl: this.config.pageUrl || window.location.href,
			projectName: this.config.projectName,
			actionType: n.meta.actionType,
			...t
		};
		this.transport.send({
			baseURL: this.config.baseURL,
			url: this.config.url,
			method: this.config.method,
			data: r
		});
	}
}, u = new Set([
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
]), d = (e, t) => typeof t == "string" ? { [c(e).meta.stringParamKey]: t } : t || {}, f = (e, t) => {
	let n = t.binding.value;
	if (n !== void 0) return d(e, n);
	let r = t.vnode.props;
	return d(e, r?.["track-params"] || r?.trackParams);
}, p = (e, t) => {
	let n = d(e, t);
	return Object.entries(n).reduce((e, [t, n]) => (u.has(t) || (e[t] = n), e), {});
}, m = (e, t) => {
	e.track("browse", f("browse", t));
}, h = /* @__PURE__ */ new WeakMap(), g = (e, t) => {
	let n = h.get(e) || [];
	n.push(t), h.set(e, n);
}, _ = (e) => {
	let t = h.get(e);
	t && (t.forEach((e) => e()), h.delete(e));
}, v = (e, t) => {
	let n = () => {
		e.track("click", f("click", t));
	};
	t.el.addEventListener("click", n), g(t.el, () => {
		t.el.removeEventListener("click", n);
	});
}, y = .5, b = (e) => {
	if (!(typeof e != "number" || Number.isNaN(e))) return e;
}, x = (e) => Math.min(Math.max(e, 0), 1), S = (e, t) => {
	let n = b(t.exposureThreshold) || b(t.threshold) || e.exposureThreshold || y, r = b(t.exposureDuration) || b(t.duration) || e.exposureDuration || 0;
	return {
		once: typeof t.once == "boolean" ? t.once : e.exposureOnce !== !1,
		threshold: x(n),
		duration: Math.max(r, 0),
		root: t.root || e.exposureRoot || null,
		rootMargin: typeof t.rootMargin == "string" ? t.rootMargin : e.exposureRootMargin || "0px"
	};
}, C = (e) => {
	let { duration: t, exposureDuration: n, exposureRoot: r, exposureRootMargin: i, exposureThreshold: a, once: o, root: s, rootMargin: c, threshold: l, ...u } = e;
	return u;
}, w = (e, t, n) => {
	let r = f("exposure", t), i = S(n, r), a = C(r), o = !1, s = null, c = () => {
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
	u.observe(t.el), g(t.el, () => {
		c(), u.disconnect();
	});
}, T = [
	"click",
	"browse",
	"exposure"
], E = (e) => e ? e.split("|").map((e) => e.trim()).filter((e) => T.includes(e)) : [], D = (e) => {
	let t = new l(e);
	return {
		mounted(n, r, i) {
			let a = {
				el: n,
				binding: r,
				vnode: i
			};
			E(r.arg).forEach((n) => {
				n === "click" && v(t, a), n === "browse" && m(t, a), n === "exposure" && w(t, a, e);
			});
		},
		unmounted(e) {
			_(e);
		}
	};
}, O = (e, t) => {
	e.directive("track", D(t));
}, k = (e) => {
	new l(e).track("click", p("click", e));
}, A = (e) => {
	new l(e).track("browse", p("browse", e));
}, j = (e) => {
	new l(e).track("exposure", p("exposure", e));
}, M = { install: O };
//#endregion
export { A as browseEvent, k as clickEvent, M as default, j as exposureEvent, O as vue3TrackPlush };
