// nofoc.us — lightweight cookie-consent banner with Google Consent Mode v2.
// GA stays "denied" until the visitor accepts. No third-party CMP.
(function () {
  var KEY = "nofocus-consent";
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}

  // Already decided → don't show the banner again.
  if (stored === "granted" || stored === "denied") return;

  function decide(granted) {
    try { localStorage.setItem(KEY, granted ? "granted" : "denied"); } catch (e) {}
    if (granted && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    var box = document.getElementById("nf-consent");
    if (box) {
      box.style.opacity = "0";
      box.style.transform = "translate(-50%, 12px)";
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 320);
    }
  }

  var css = document.createElement("style");
  css.textContent =
    "#nf-consent{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:9999;" +
    "width:min(460px,calc(100% - 32px));background:#17170f;color:#ece8df;" +
    "border:1px solid rgba(236,232,223,0.12);border-radius:18px;padding:18px 20px 16px;" +
    "box-shadow:0 30px 70px -25px rgba(0,0,0,0.6);" +
    "font-family:-apple-system,'SF Pro Text','Segoe UI',Roboto,Helvetica,Arial,sans-serif;" +
    "opacity:0;transition:opacity .35s ease,transform .35s ease;}" +
    "#nf-consent p{font-size:.9rem;line-height:1.5;color:rgba(236,232,223,0.72);margin:0 0 14px;}" +
    "#nf-consent a{color:#ece8df;text-underline-offset:2px;}" +
    "#nf-consent .nf-row{display:flex;gap:10px;align-items:center;}" +
    "#nf-consent button{font-family:inherit;cursor:pointer;border:none;border-radius:999px;" +
    "font-size:.88rem;font-weight:500;padding:.6rem 1.4rem;transition:transform .15s ease,opacity .2s ease;}" +
    "#nf-consent button:hover{transform:translateY(-1px);}" +
    "#nf-accept{background:#ece8df;color:#141410;}" +
    "#nf-decline{background:rgba(236,232,223,0.1);color:#ece8df;}";
  document.head.appendChild(css);

  var box = document.createElement("div");
  box.id = "nf-consent";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Cookie consent");
  box.innerHTML =
    "<p>An honest one: may we use Google Analytics cookies to see how this page is " +
    "used? The nofocus extension itself never tracks you. " +
    '<a href="/privacy.html">More</a></p>' +
    '<div class="nf-row">' +
    '<button id="nf-accept" type="button">Accept</button>' +
    '<button id="nf-decline" type="button">Decline</button>' +
    "</div>";
  document.body.appendChild(box);

  // fade in
  requestAnimationFrame(function () {
    box.style.opacity = "1";
    box.style.transform = "translateX(-50%)";
  });

  document.getElementById("nf-accept").addEventListener("click", function () { decide(true); });
  document.getElementById("nf-decline").addEventListener("click", function () { decide(false); });
})();
