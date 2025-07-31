(() => {
  (() => {
    var D = {
        2087: (o, i, n) => {
          "use strict";
          n.r(i), n.d(i, { getCookie: () => c, setCookie: () => t });
          function c(a, d) {
            let s = d + "=",
              h = decodeURIComponent(a).split(";");
            for (let p = 0; p < h.length; p++) {
              let r = h[p].trim();
              if (r.indexOf(s) == 0) return r.substring(s.length, r.length);
            }
            return null;
          }
          function t(a, d, s) {
            s = s || {};
            let f = s.domain,
              h = s.expiresIn || 31 * 1e3 * 3600 * 24,
              p = s.path || "/";
            const r = new Date();
            r.setTime(r.getTime() + h);
            let l = "; expires=" + r.toUTCString(),
              S = f != null ? "; domain=" + f : "",
              w = p != null ? "; path=" + p : "";
            document.cookie = a + "=" + d + l + w + S;
          }
        },
        5187: (o) => {
          function i() {
            return (
              new URLSearchParams(window.location.search).get("profiling") ===
              "1"
            );
          }
          (o.exports.start = function (n) {
            i() && performance.mark(`${n}-start`);
          }),
            (o.exports.end = function (n) {
              if (i())
                try {
                  performance.mark(`${n}-end`);
                  const c = performance.measure(n, `${n}-start`, `${n}-end`);
                  console.log(`Profiling result (${n}):`, c);
                } catch (c) {
                  console.log("Error profiling", c);
                }
            });
        },
        2914: (o, i, n) => {
          "use strict";
          n.r(i),
            n.d(i, {
              getAPIServerEndpoint: () => t,
              getServerEndpoint: () => c,
            });
          function c(a) {
            let d = new URL(a),
              s = `${d.protocol}//${d.host}`;
            return (
              s.match("snapppt") && (s = s.replace("snapppt", "app.addsauce")),
              s
            );
          }
          function t(a) {
            return c(a).replace("app.", "client.");
          }
        },
        1581: (o, i, n) => {
          const c = n(2087),
            t = "snpt-tracking-v2-session",
            a = {};
          function d() {
            return window.location.search.includes("tracking=true")
              ? !1
              : window.location.hostname === "app.addsauce.com" ||
                  window.location.hostname === "app.addsauce.test";
          }
          function s() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (p) {
                var r = (Math.random() * 16) | 0,
                  l = p === "x" ? r : (r & 3) | 8;
                return l.toString(16);
              }
            );
          }
          function f() {
            return typeof crypto.randomUUID == "function"
              ? crypto.randomUUID()
              : s();
          }
          class h {
            static getCurrentSessionID() {
              return c.getCookie(document.cookie, t);
            }
            constructor(r) {
              this.apiEndpoint = r;
            }
            async getOrCreateCurrentSessionID() {
              if (d()) return null;
              let r = c.getCookie(document.cookie, t);
              (r == null || r === "") && (r = f());
              let l = await this.rootDomain();
              return (
                l != null && (l = "." + l), c.setCookie(t, r, { domain: l }), r
              );
            }
            async rootDomain(r) {
              if ((r == null && (r = window.location.hostname), r === ""))
                return null;
              if (a[r]) return a[r];
              try {
                let g = localStorage.getItem(`root_domain[${r}]`);
                if (g) return g;
              } catch (g) {
                console.log("Unable to get cached root domain", g);
              }
              let l = new AbortController(),
                S = 5 * 1e3,
                w = setTimeout(() => l.abort(), S);
              try {
                let g = `${
                    this.apiEndpoint
                  }/root_domain?hostname=${encodeURIComponent(r)}`,
                  C = await fetch(g, { signal: l.signal });
                clearTimeout(w);
                let x = (await C.json()).root_domain;
                if (x != null) {
                  a[r] = x;
                  try {
                    localStorage.setItem(`root_domain[${r}]`, x);
                  } catch (y) {
                    console.log("Unable to set cached root domain", y);
                  }
                }
                return x;
              } catch (g) {
                return (
                  clearTimeout(w),
                  console.error("Error getting root domain", g),
                  r
                );
              }
            }
          }
          o.exports = h;
        },
      },
      T = {};
    function m(o) {
      var i = T[o];
      if (i !== void 0) return i.exports;
      var n = (T[o] = { exports: {} });
      return D[o](n, n.exports, m), n.exports;
    }
    (m.d = (o, i) => {
      for (var n in i)
        m.o(i, n) &&
          !m.o(o, n) &&
          Object.defineProperty(o, n, { enumerable: !0, get: i[n] });
    }),
      (m.o = (o, i) => Object.prototype.hasOwnProperty.call(o, i)),
      (m.r = (o) => {
        typeof Symbol != "undefined" &&
          Symbol.toStringTag &&
          Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(o, "__esModule", { value: !0 });
      });
    var L = {};
    (function () {
      const o = m(1581),
        i = m(2914),
        n = m(5187),
        c = {
          matchers: {
            sauceTv: /widgets\/tv\/(.*)/,
            highlightReels: /widgets\/highlight_reels\/(.*)/,
            productPageHighlightReels:
              /widgets\/product_page_highlight_reels\/(.*)\/index.js/,
          },
          cdn: { root: "https://cdn.addsauce.com/", widgetLoadSegment: "load" },
          observer: { rootMargin: "1000px", threshold: 0 },
          loadingIndicatorCSS: `
      .snptwdgt_init_prldr:not(.snptwdgt_init) {
        width: 100%;
        height: 100px;
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="0" fill="none" stroke="%23CCC" stroke-width=".5"><animate attributeName="r" calcMode="spline" dur="2" keySplines="0 .2 .5 1" keyTimes="0;1" repeatCount="indefinite" values="1;80"/><animate attributeName="stroke-width" calcMode="spline" dur="2" keySplines="0 .2 .5 1" keyTimes="0;1" repeatCount="indefinite" values="0;25"/><animate attributeName="stroke-opacity" calcMode="spline" dur="2" keySplines="0 .2 .5 1" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></circle></svg>');
        background-size: 50px;
        background-position: center;
        background-repeat: no-repeat;
        display: inline-block;
      }
    `,
        },
        t = {
          head: document.head,
          currentScript: window.CURRENT_SNPT_SCRIPT || document.currentScript,
          isDebugMode: window.location.search.includes("debug=1"),
          isXpMode: window.location.search.includes("xp=1"),
          isIE:
            navigator.userAgent.includes("MSIE") ||
            navigator.userAgent.includes("Trident"),
        };
      let a = "",
        d = document.createElement("a"),
        s = null;
      const f = () => {
          w(c.cdn.root);
          let e = new URLSearchParams(window.location.search).get(
            "__addsauce_items_api_endpoint"
          );
          e &&
            e.length > 0 &&
            (e.startsWith("https://") || (e = `https://${e}`), w(e)),
            g(),
            C(),
            new o(i.getAPIServerEndpoint(a)).getOrCreateCurrentSessionID(),
            (s = x()),
            M();
        },
        h = () => t.currentScript.src.match(c.matchers.sauceTv),
        p = () =>
          h() &&
          t.currentScript.parentElement.getAttribute(
            "data-sauce-tv-embedded"
          ) !== "1",
        r = () => t.currentScript.src.match(c.matchers.highlightReels),
        l = () =>
          t.currentScript.src.match(c.matchers.productPageHighlightReels),
        S = () => p() || r() || l(),
        w = (e) => {
          if (
            [...document.querySelectorAll('[rel="preconnect"]')].some(
              (_) => _.href === e
            )
          )
            return;
          const u = document.createElement("link");
          (u.rel = "preconnect"), (u.href = e), t.head.appendChild(u);
        },
        g = () => {
          if (document.getElementById("snptwdgt_init_prldr_indctor_css") || S())
            return;
          const e = document.createElement("style");
          (e.id = "snptwdgt_init_prldr_indctor_css"),
            e.appendChild(document.createTextNode(c.loadingIndicatorCSS)),
            t.head.appendChild(e);
        },
        C = () => {
          !t.currentScript &&
            t.isIE &&
            (t.currentScript = Array.from(
              document.getElementsByTagName("script")
            ).find((e) => e.className.includes("snapppt-widget"))),
            (t.currentScript = t.currentScript || window.CURRENT_SNPT_SCRIPT),
            (t.currentScript.loadNow = E()),
            (a = t.currentScript.src || window.CURRENT_SNTP_EMBED),
            t.isDebugMode &&
              (console.log(`Sauce current script: ${a}`),
              console.log(`Load now: ${t.currentScript.loadNow}`)),
            (d.href = a);
        },
        E = () =>
          t.currentScript.dataset.loadr === "instant" || S()
            ? !0
            : !!t.currentScript.src.match("campaign-signup"),
        x = () => {
          if ((window.SNPT || (window.SNPT = {}), !window.SNPT.widgetManager)) {
            const e = { widgets: [], loaderRequested: !1, loaderInit: null };
            window.SNPT.widgetManager = {
              widgetReady(u) {
                typeof e.loaderInit == "function"
                  ? e.loaderInit(u)
                  : (e.widgets.unshift(u), this.requestLoader());
              },
              requestLoader() {
                e.loaderRequested || ((e.loaderRequested = !0), y());
              },
              loaderReady(u) {
                for (e.loaderInit = u; e.widgets.length; )
                  e.loaderInit(e.widgets.pop());
              },
            };
          }
          return window.SNPT.widgetManager;
        },
        y = () => {
          const e = a.lastIndexOf("/"),
            u = d.host.match(/\.(test|ci)/),
            _ = u
              ? `${a.substring(0, e + 1)}${
                  c.cdn.widgetLoadSegment
                }${a.substring(e)}`
              : "https://cdn.addsauce.com/e/snap-widget-b2fda2f3d512280f22d0.js",
            $ = u
              ? `${d.protocol}//${d.host}/widgets/widget_loader/snap-vendor-bundle.js`
              : "https://cdn.addsauce.com/e/snap-widget-vendor-950c50fe4d837e8da88d.js",
            R = (v, N = "") => {
              n.start("snap-widget-script-load");
              const b = document.createElement("script");
              return (
                (b.src = v),
                (b.async = !0),
                b.setAttribute("importance", "high"),
                N && (b.className = N),
                b
              );
            },
            k = R(_, "snapppt-widget"),
            O = R($);
          t.currentScript.dataset
            ? Object.assign(k.dataset, t.currentScript.dataset)
            : Array.from(t.currentScript.attributes)
                .filter((v) => v.name.startsWith("data-"))
                .forEach((v) => k.setAttribute(v.name, v.value)),
            (t.currentScript.className = "snptwdgt_init_prldr");
          const P = document.createDocumentFragment();
          P.append(k, O), t.currentScript.after(P);
        },
        M = () => {
          if (
            location.href.includes("lemieux") ||
            t.currentScript.loadNow ||
            t.currentScript.src.match("campaign-signup") ||
            !("IntersectionObserver" in window)
          )
            return I();
          const e = new IntersectionObserver((u) => {
            const _ = u[0];
            _.isIntersecting && (e.disconnect(), _.target.remove(), I());
          }, c.observer);
          e.observe(U());
        },
        I = () => s.widgetReady(t.currentScript),
        U = () => {
          const e = document.createElement("div");
          return (e.innerHTML = "&nbsp;"), t.currentScript.after(e), e;
        };
      f(), n.end("preloader");
    })();
  })();
})();
