!(function(e) {
  var t,
    n,
    o,
    a,
    i,
    l,
    c,
    d =
      '<svg><symbol id="icon-zengjia" viewBox="0 0 1024 1024"><path d="M512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667-191.029333 426.666667-426.666667 426.666667z m0-64c200.298667 0 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667z m32-394.666667h128a32 32 0 0 1 0 64H544v128a32 32 0 0 1-64 0V544H352a32 32 0 0 1 0-64h128V352a32 32 0 0 1 64 0v128z"  ></path></symbol><symbol id="icon-chuangzuo" viewBox="0 0 1024 1024"><path d="M896 864a32 32 0 0 1 0 64H128a32 32 0 0 1 0-64z m-60.16-733.621333l15.093333 15.093333c45.866667 45.834667 45.866667 120.16 0 166.005333L418.794667 743.338667a160.192 160.192 0 0 1-78.122667 42.986666l-152.245333 34.197334c-23.84 5.365333-44.661333-16.853333-37.749334-40.288l43.338667-146.88a160.042667 160.042667 0 0 1 40.373333-67.925334l435.328-435.050666c45.866667-45.834667 120.245333-45.834667 166.112 0zM636.32 254.304L279.68 610.709333a96.021333 96.021333 0 0 0-24.213333 40.746667l-27.946667 94.656 99.093333-22.261333a96.117333 96.117333 0 0 0 46.869334-25.781334L726.933333 344.842667l-90.602666-90.538667z m78.698667-78.656l-33.397334 33.386667 90.602667 90.538666 33.386667-33.376a53.333333 53.333333 0 0 0 0-75.456l-15.093334-15.093333a53.408 53.408 0 0 0-75.498666 0z"  ></path></symbol><symbol id="icon-shanchu" viewBox="0 0 1024 1024"><path d="M202.666667 256h-42.666667a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64H266.666667v565.333333a53.333333 53.333333 0 0 0 53.333333 53.333334h384a53.333333 53.333333 0 0 0 53.333333-53.333334V352a32 32 0 0 1 64 0v469.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H320c-64.8 0-117.333333-52.533333-117.333333-117.333334V256z m224-106.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z m-32 288a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z m170.666666 0a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z"  ></path></symbol><symbol id="icon-icon-edit" viewBox="0 0 1024 1024"><path d="M128 896h768v-64H128zM256 704v-146.752l224-224L626.752 480l-224 224H256zM608 205.248L754.752 352 672 434.752 525.248 288 608 205.248z m214.624 169.408l0.032-0.032a32 32 0 0 0 0-45.248l-0.032-0.032-191.968-191.968-0.032-0.032a32 32 0 0 0-45.248 0l-0.032 0.032L192 530.752V768h237.248l393.376-393.344z" fill="#181818" ></path></symbol><symbol id="icon-icon-del" viewBox="0 0 1024 1024"><path d="M512 896C299.936 896 128 724.064 128 512S299.936 128 512 128s384 171.936 384 384-171.936 384-384 384m0-832C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64" fill="#181818" ></path><path d="M665.376 313.376L512 466.752l-153.376-153.376-45.248 45.248L466.752 512l-153.376 153.376 45.248 45.248L512 557.248l153.376 153.376 45.248-45.248L557.248 512l153.376-153.376z" fill="#181818" ></path></symbol></svg>',
    s = (t = document.getElementsByTagName("script"))[
      t.length - 1
    ].getAttribute("data-injectcss");
  if (s && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  function m() {
    l || ((l = !0), a());
  }
  (n = function() {
    var e,
      t,
      n,
      o,
      a,
      i = document.createElement("div");
    (i.innerHTML = d),
      (d = null),
      (e = i.getElementsByTagName("svg")[0]) &&
        (e.setAttribute("aria-hidden", "true"),
        (e.style.position = "absolute"),
        (e.style.width = 0),
        (e.style.height = 0),
        (e.style.overflow = "hidden"),
        (t = e),
        (n = document.body).firstChild
          ? ((o = t), (a = n.firstChild).parentNode.insertBefore(o, a))
          : n.appendChild(t));
  }),
    document.addEventListener
      ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
        ? setTimeout(n, 0)
        : ((o = function() {
            document.removeEventListener("DOMContentLoaded", o, !1), n();
          }),
          document.addEventListener("DOMContentLoaded", o, !1))
      : document.attachEvent &&
        ((a = n),
        (i = e.document),
        (l = !1),
        (c = function() {
          try {
            i.documentElement.doScroll("left");
          } catch (e) {
            return void setTimeout(c, 50);
          }
          m();
        })(),
        (i.onreadystatechange = function() {
          "complete" == i.readyState && ((i.onreadystatechange = null), m());
        }));
})(window);
