// Aplica el tema antes de pintar para evitar un destello claro/oscuro.
// Va en un archivo aparte (y no dentro de index.html) para que la política de
// seguridad (CSP) pueda prohibir todo script en línea: así, aunque un texto
// malicioso llegara a colarse en la página, no podría ejecutarse.
(function () {
  try {
    var s = JSON.parse(localStorage.getItem('godpole.v1') || '{}');
    var t = (s.settings && s.settings.theme) || 'auto';
    if (t !== 'light' && t !== 'dark') t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
