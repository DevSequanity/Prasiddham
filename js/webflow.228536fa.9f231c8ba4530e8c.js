(() => {
  var e = {
      345: function (e, t, i) {
        "use strict";
        var a = i(949),
          r = i(134);
        let n = {
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            SPACE: 32,
            ENTER: 13,
            HOME: 36,
            END: 35,
          },
          s =
            'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
        a.define(
          "slider",
          (e.exports = function (e, t) {
            var i,
              o,
              d,
              l = {},
              f = e.tram,
              u = e(document),
              c = a.env(),
              h = ".w-slider",
              v = "w-slider-force-show",
              p = r.triggers,
              m = !1;
            function g() {
              (i = u.find(h)).length &&
                (i.each(w), d || (x(), a.resize.on(b), a.redraw.on(l.redraw)));
            }
            function x() {
              a.resize.off(b), a.redraw.off(l.redraw);
            }
            function b() {
              i.filter(":visible").each(D);
            }
            function w(t, i) {
              var a = e(i),
                r = e.data(i, h);
              r ||
                (r = e.data(i, h, {
                  index: 0,
                  depth: 1,
                  hasFocus: { keyboard: !1, mouse: !1 },
                  el: a,
                  config: {},
                })),
                (r.mask = a.children(".w-slider-mask")),
                (r.left = a.children(".w-slider-arrow-left")),
                (r.right = a.children(".w-slider-arrow-right")),
                (r.nav = a.children(".w-slider-nav")),
                (r.slides = r.mask.children(".w-slide")),
                r.slides.each(p.reset),
                m && (r.maskWidth = 0),
                void 0 === a.attr("role") && a.attr("role", "region"),
                void 0 === a.attr("aria-label") &&
                  a.attr("aria-label", "carousel");
              var n = r.mask.attr("id");
              if (
                (n || ((n = "w-slider-mask-" + t), r.mask.attr("id", n)),
                o ||
                  r.ariaLiveLabel ||
                  (r.ariaLiveLabel = e(
                    '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />'
                  ).appendTo(r.mask)),
                r.left.attr("role", "button"),
                r.left.attr("tabindex", "0"),
                r.left.attr("aria-controls", n),
                void 0 === r.left.attr("aria-label") &&
                  r.left.attr("aria-label", "previous slide"),
                r.right.attr("role", "button"),
                r.right.attr("tabindex", "0"),
                r.right.attr("aria-controls", n),
                void 0 === r.right.attr("aria-label") &&
                  r.right.attr("aria-label", "next slide"),
                !f.support.transform)
              ) {
                r.left.hide(), r.right.hide(), r.nav.hide(), (d = !0);
                return;
              }
              r.el.off(h),
                r.left.off(h),
                r.right.off(h),
                r.nav.off(h),
                y(r),
                o
                  ? (r.el.on("setting" + h, E(r)), C(r), (r.hasTimer = !1))
                  : (r.el.on("swipe" + h, E(r)),
                    r.left.on("click" + h, T(r)),
                    r.right.on("click" + h, W(r)),
                    r.left.on("keydown" + h, R(r, T)),
                    r.right.on("keydown" + h, R(r, W)),
                    r.nav.on("keydown" + h, "> div", E(r)),
                    r.config.autoplay &&
                      !r.hasTimer &&
                      ((r.hasTimer = !0), (r.timerCount = 1), A(r)),
                    r.el.on("mouseenter" + h, O(r, !0, "mouse")),
                    r.el.on("focusin" + h, O(r, !0, "keyboard")),
                    r.el.on("mouseleave" + h, O(r, !1, "mouse")),
                    r.el.on("focusout" + h, O(r, !1, "keyboard"))),
                r.nav.on("click" + h, "> div", E(r)),
                c ||
                  r.mask
                    .contents()
                    .filter(function () {
                      return 3 === this.nodeType;
                    })
                    .remove();
              var s = a.filter(":hidden");
              s.addClass(v);
              var l = a.parents(":hidden");
              l.addClass(v), m || D(t, i), s.removeClass(v), l.removeClass(v);
            }
            function y(e) {
              var t = {};
              (t.crossOver = 0),
                (t.animation = e.el.attr("data-animation") || "slide"),
                "outin" === t.animation &&
                  ((t.animation = "cross"), (t.crossOver = 0.5)),
                (t.easing = e.el.attr("data-easing") || "ease");
              var i = e.el.attr("data-duration");
              if (
                ((t.duration = null != i ? parseInt(i, 10) : 500),
                k(e.el.attr("data-infinite")) && (t.infinite = !0),
                k(e.el.attr("data-disable-swipe")) && (t.disableSwipe = !0),
                k(e.el.attr("data-hide-arrows"))
                  ? (t.hideArrows = !0)
                  : e.config.hideArrows && (e.left.show(), e.right.show()),
                k(e.el.attr("data-autoplay")))
              ) {
                (t.autoplay = !0),
                  (t.delay = parseInt(e.el.attr("data-delay"), 10) || 2e3),
                  (t.timerMax = parseInt(e.el.attr("data-autoplay-limit"), 10));
                var a = "mousedown" + h + " touchstart" + h;
                o ||
                  e.el.off(a).one(a, function () {
                    C(e);
                  });
              }
              var r = e.right.width();
              (t.edge = r ? r + 40 : 100), (e.config = t);
            }
            function k(e) {
              return "1" === e || "true" === e;
            }
            function O(t, i, a) {
              return function (r) {
                if (i) t.hasFocus[a] = i;
                else if (
                  e.contains(t.el.get(0), r.relatedTarget) ||
                  ((t.hasFocus[a] = i),
                  (t.hasFocus.mouse && "keyboard" === a) ||
                    (t.hasFocus.keyboard && "mouse" === a))
                )
                  return;
                i
                  ? (t.ariaLiveLabel.attr("aria-live", "polite"),
                    t.hasTimer && C(t))
                  : (t.ariaLiveLabel.attr("aria-live", "off"),
                    t.hasTimer && A(t));
              };
            }
            function R(e, t) {
              return function (i) {
                switch (i.keyCode) {
                  case n.SPACE:
                  case n.ENTER:
                    return t(e)(), i.preventDefault(), i.stopPropagation();
                }
              };
            }
            function T(e) {
              return function () {
                L(e, { index: e.index - 1, vector: -1 });
              };
            }
            function W(e) {
              return function () {
                L(e, { index: e.index + 1, vector: 1 });
              };
            }
            function A(e) {
              C(e);
              var t = e.config,
                i = t.timerMax;
              (i && e.timerCount++ > i) ||
                (e.timerId = window.setTimeout(function () {
                  null == e.timerId || o || (W(e)(), A(e));
                }, t.delay));
            }
            function C(e) {
              window.clearTimeout(e.timerId), (e.timerId = null);
            }
            function E(i) {
              return function (r, s) {
                s = s || {};
                var d,
                  l,
                  f = i.config;
                if (o && "setting" === r.type) {
                  if ("prev" === s.select) return T(i)();
                  if ("next" === s.select) return W(i)();
                  if ((y(i), M(i), null == s.select)) return;
                  return (
                    (d = s.select),
                    (l = null),
                    d === i.slides.length && (g(), M(i)),
                    t.each(i.anchors, function (t, i) {
                      e(t.els).each(function (t, a) {
                        e(a).index() === d && (l = i);
                      });
                    }),
                    void (null != l && L(i, { index: l, immediate: !0 }))
                  );
                }
                if ("swipe" === r.type)
                  return f.disableSwipe || a.env("editor")
                    ? void 0
                    : "left" === s.direction
                    ? W(i)()
                    : "right" === s.direction
                    ? T(i)()
                    : void 0;
                if (i.nav.has(r.target).length) {
                  var u = e(r.target).index();
                  if (
                    ("click" === r.type && L(i, { index: u }),
                    "keydown" === r.type)
                  )
                    switch (r.keyCode) {
                      case n.ENTER:
                      case n.SPACE:
                        L(i, { index: u }), r.preventDefault();
                        break;
                      case n.ARROW_LEFT:
                      case n.ARROW_UP:
                        I(i.nav, Math.max(u - 1, 0)), r.preventDefault();
                        break;
                      case n.ARROW_RIGHT:
                      case n.ARROW_DOWN:
                        I(i.nav, Math.min(u + 1, i.pages)), r.preventDefault();
                        break;
                      case n.HOME:
                        I(i.nav, 0), r.preventDefault();
                        break;
                      case n.END:
                        I(i.nav, i.pages), r.preventDefault();
                        break;
                      default:
                        return;
                    }
                }
              };
            }
            function I(e, t) {
              var i = e.children().eq(t).focus();
              e.children().not(i);
            }
            function L(t, i) {
              i = i || {};
              var a = t.config,
                r = t.anchors;
              t.previous = t.index;
              var n = i.index,
                d = {};
              n < 0
                ? ((n = r.length - 1),
                  a.infinite &&
                    ((d.x = -t.endX), (d.from = 0), (d.to = r[0].width)))
                : n >= r.length &&
                  ((n = 0),
                  a.infinite &&
                    ((d.x = r[r.length - 1].width),
                    (d.from = -r[r.length - 1].x),
                    (d.to = d.from - d.x))),
                (t.index = n);
              var l = t.nav
                .children()
                .eq(n)
                .addClass("w-active")
                .attr("aria-pressed", "true")
                .attr("tabindex", "0");
              t.nav
                .children()
                .not(l)
                .removeClass("w-active")
                .attr("aria-pressed", "false")
                .attr("tabindex", "-1"),
                a.hideArrows &&
                  (t.index === r.length - 1 ? t.right.hide() : t.right.show(),
                  0 === t.index ? t.left.hide() : t.left.show());
              var u = t.offsetX || 0,
                c = (t.offsetX = -r[t.index].x),
                h = { x: c, opacity: 1, visibility: "" },
                v = e(r[t.index].els),
                g = e(r[t.previous] && r[t.previous].els),
                x = t.slides.not(v),
                b = a.animation,
                w = a.easing,
                y = Math.round(a.duration),
                k = i.vector || (t.index > t.previous ? 1 : -1),
                O = "opacity " + y + "ms " + w,
                R = "transform " + y + "ms " + w;
              if (
                (v.find(s).removeAttr("tabindex"),
                v.removeAttr("aria-hidden"),
                v.find("*").removeAttr("aria-hidden"),
                x.find(s).attr("tabindex", "-1"),
                x.attr("aria-hidden", "true"),
                x.find("*").attr("aria-hidden", "true"),
                o || (v.each(p.intro), x.each(p.outro)),
                i.immediate && !m)
              ) {
                f(v).set(h), A();
                return;
              }
              if (t.index !== t.previous) {
                if (
                  (o || t.ariaLiveLabel.text(`Slide ${n + 1} of ${r.length}.`),
                  "cross" === b)
                ) {
                  var T = Math.round(y - y * a.crossOver),
                    W = Math.round(y - T);
                  (O = "opacity " + T + "ms " + w),
                    f(g).set({ visibility: "" }).add(O).start({ opacity: 0 }),
                    f(v)
                      .set({
                        visibility: "",
                        x: c,
                        opacity: 0,
                        zIndex: t.depth++,
                      })
                      .add(O)
                      .wait(W)
                      .then({ opacity: 1 })
                      .then(A);
                  return;
                }
                if ("fade" === b) {
                  f(g).set({ visibility: "" }).stop(),
                    f(v)
                      .set({
                        visibility: "",
                        x: c,
                        opacity: 0,
                        zIndex: t.depth++,
                      })
                      .add(O)
                      .start({ opacity: 1 })
                      .then(A);
                  return;
                }
                if ("over" === b) {
                  (h = { x: t.endX }),
                    f(g).set({ visibility: "" }).stop(),
                    f(v)
                      .set({
                        visibility: "",
                        zIndex: t.depth++,
                        x: c + r[t.index].width * k,
                      })
                      .add(R)
                      .start({ x: c })
                      .then(A);
                  return;
                }
                a.infinite && d.x
                  ? (f(t.slides.not(g))
                      .set({ visibility: "", x: d.x })
                      .add(R)
                      .start({ x: c }),
                    f(g)
                      .set({ visibility: "", x: d.from })
                      .add(R)
                      .start({ x: d.to }),
                    (t.shifted = g))
                  : (a.infinite &&
                      t.shifted &&
                      (f(t.shifted).set({ visibility: "", x: u }),
                      (t.shifted = null)),
                    f(t.slides).set({ visibility: "" }).add(R).start({ x: c }));
              }
              function A() {
                (v = e(r[t.index].els)),
                  (x = t.slides.not(v)),
                  "slide" !== b && (h.visibility = "hidden"),
                  f(x).set(h);
              }
            }
            function D(t, i) {
              var a,
                r,
                n,
                s,
                d = e.data(i, h);
              if (d) {
                if (
                  ((r = (a = d).mask.width()),
                  a.maskWidth !== r && ((a.maskWidth = r), 1))
                )
                  return M(d);
                o &&
                  ((s = 0),
                  (n = d).slides.each(function (t, i) {
                    s += e(i).outerWidth(!0);
                  }),
                  n.slidesWidth !== s && ((n.slidesWidth = s), 1)) &&
                  M(d);
              }
            }
            function M(t) {
              var i = 1,
                a = 0,
                r = 0,
                n = 0,
                s = t.maskWidth,
                d = s - t.config.edge;
              d < 0 && (d = 0),
                (t.anchors = [{ els: [], x: 0, width: 0 }]),
                t.slides.each(function (o, l) {
                  r - a > d &&
                    (i++,
                    (a += s),
                    (t.anchors[i - 1] = { els: [], x: r, width: 0 })),
                    (n = e(l).outerWidth(!0)),
                    (r += n),
                    (t.anchors[i - 1].width += n),
                    t.anchors[i - 1].els.push(l);
                  var f = o + 1 + " of " + t.slides.length;
                  e(l).attr("aria-label", f), e(l).attr("role", "group");
                }),
                (t.endX = r),
                o && (t.pages = null),
                t.nav.length &&
                  t.pages !== i &&
                  ((t.pages = i),
                  (function (t) {
                    var i,
                      a = [],
                      r = t.el.attr("data-nav-spacing");
                    r && (r = parseFloat(r) + "px");
                    for (var n = 0, s = t.pages; n < s; n++)
                      (i = e('<div class="w-slider-dot" data-wf-ignore />'))
                        .attr(
                          "aria-label",
                          "Show slide " + (n + 1) + " of " + s
                        )
                        .attr("aria-pressed", "false")
                        .attr("role", "button")
                        .attr("tabindex", "-1"),
                        t.nav.hasClass("w-num") && i.text(n + 1),
                        null != r &&
                          i.css({ "margin-left": r, "margin-right": r }),
                        a.push(i);
                    t.nav.empty().append(a);
                  })(t));
              var l = t.index;
              l >= i && (l = i - 1), L(t, { immediate: !0, index: l });
            }
            return (
              (l.ready = function () {
                (o = a.env("design")), g();
              }),
              (l.design = function () {
                (o = !0), setTimeout(g, 1e3);
              }),
              (l.preview = function () {
                (o = !1), g();
              }),
              (l.redraw = function () {
                (m = !0), g(), (m = !1);
              }),
              (l.destroy = x),
              l
            );
          })
        );
      },
      237: function (e, t, i) {
        i(461),
          i(624),
          i(286),
          i(334),
          i(338),
          i(695),
          i(322),
          i(655),
          i(858),
          i(527),
          i(345);
      },
    },
    t = {};
  function i(a) {
    var r = t[a];
    if (void 0 !== r) return r.exports;
    var n = (t[a] = { exports: {} });
    return e[a](n, n.exports, i), n.exports;
  }
  (i.m = e),
    (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = [];
      i.O = (t, a, r, n) => {
        if (a) {
          n = n || 0;
          for (var s = e.length; s > 0 && e[s - 1][2] > n; s--) e[s] = e[s - 1];
          e[s] = [a, r, n];
          return;
        }
        for (var o = 1 / 0, s = 0; s < e.length; s++) {
          for (var [a, r, n] = e[s], d = !0, l = 0; l < a.length; l++)
            (!1 & n || o >= n) && Object.keys(i.O).every((e) => i.O[e](a[l]))
              ? a.splice(l--, 1)
              : ((d = !1), n < o && (o = n));
          if (d) {
            e.splice(s--, 1);
            var f = r();
            void 0 !== f && (t = f);
          }
        }
        return t;
      };
    })(),
    (i.rv = () => "1.3.9"),
    (() => {
      var e = { 212: 0 };
      i.O.j = (t) => 0 === e[t];
      var t = (t, a) => {
          var r,
            n,
            [s, o, d] = a,
            l = 0;
          if (s.some((t) => 0 !== e[t])) {
            for (r in o) i.o(o, r) && (i.m[r] = o[r]);
            if (d) var f = d(i);
          }
          for (t && t(a); l < s.length; l++)
            (n = s[l]), i.o(e, n) && e[n] && e[n][0](), (e[n] = 0);
          return i.O(f);
        },
        a = (self.webpackChunk = self.webpackChunk || []);
      a.forEach(t.bind(null, 0)), (a.push = t.bind(null, a.push.bind(a)));
    })(),
    (i.ruid = "bundler=rspack@1.3.9");
  var a = i.O(void 0, ["699"], function () {
    return i(237);
  });
  a = i.O(a);
})();
