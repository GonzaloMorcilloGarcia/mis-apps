// ARCHIVO GENERADO por tools/build.py a partir de js/*.js — no lo edites a mano.
(function () {
'use strict';
const __m = {};
// ---- dates.js ----
__m['dates.js'] = (function () {
// Utilidades de fechas. Todas las fechas se manejan como claves locales 'YYYY-MM-DD'.

const pad = (n) => String(n).padStart(2, '0');

function toKey(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function fromKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0); // mediodía: evita problemas con cambios de hora
}

function todayKey() {
  return toKey(new Date());
}

function addDays(key, n) {
  const d = fromKey(key);
  d.setDate(d.getDate() + n);
  return toKey(d);
}

function addMonths(key, n) {
  const d = fromKey(key);
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  return toKey(d);
}

function diffDays(a, b) {
  // días de a hasta b (b - a)
  return Math.round((fromKey(b) - fromKey(a)) / 86400000);
}

/** 0 = domingo ... 6 = sábado */
function weekday(key) {
  return fromKey(key).getDay();
}

/** Lunes de la semana de la fecha dada */
function startOfWeek(key) {
  const wd = weekday(key);
  const offset = wd === 0 ? -6 : 1 - wd;
  return addDays(key, offset);
}

function startOfMonth(key) {
  return key.slice(0, 8) + '01';
}

function endOfMonth(key) {
  const d = fromKey(startOfMonth(key));
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return toKey(d);
}

function startOfYear(key) {
  return key.slice(0, 4) + '-01-01';
}

function endOfYear(key) {
  return key.slice(0, 4) + '-12-31';
}

function minKey(a, b) {
  return a < b ? a : b;
}

function maxKey(a, b) {
  return a > b ? a : b;
}

function* eachDay(from, to) {
  let k = from;
  while (k <= to) {
    yield k;
    k = addDays(k, 1);
  }
}

// Orden de la semana española: L M X J V S D
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];
const WEEKDAY_SHORT = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
const WEEKDAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
const MONTH_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function formatLong(key) {
  const d = fromKey(key);
  return `${WEEKDAY_NAMES[d.getDay()]}, ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]}`;
}

function formatShort(key) {
  const d = fromKey(key);
  return `${d.getDate()} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

function formatMonthYear(key) {
  const d = fromKey(key);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Número de día absoluto (para elegir la frase del día de forma estable) */
function dayNumber(key) {
  const [y, m, d] = key.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

return { toKey, fromKey, todayKey, addDays, addMonths, diffDays, weekday, startOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, minKey, maxKey, eachDay, WEEK_ORDER, WEEKDAY_SHORT, WEEKDAY_NAMES, MONTH_NAMES, MONTH_SHORT, formatLong, formatShort, formatMonthYear, capitalize, dayNumber };
})();
// ---- quotes.js ----
__m['quotes.js'] = (function () {
// Frases del día por defecto. Se elige una distinta cada día siguiendo un orden barajado fijo,
// de modo que no se repite ninguna hasta haber pasado por todas.
// Desde la app (Ajustes → Frases) puedes ver, editar, añadir y borrar frases.

const { dayNumber } = __m['dates.js'];

const QUOTES = [
  // --- Sagrada Escritura ---
  { t: 'Todo lo puedo en Aquel que me fortalece.', a: 'Filipenses 4,13' },
  { t: 'Sé fuerte y valiente. No temas ni te acobardes, porque el Señor tu Dios estará contigo dondequiera que vayas.', a: 'Josué 1,9' },
  { t: 'Encomienda al Señor tus obras, y tus proyectos se cumplirán.', a: 'Proverbios 16,3' },
  { t: 'Venid a mí todos los que estáis cansados y agobiados, y yo os aliviaré.', a: 'Mateo 11,28' },
  { t: 'Los que esperan en el Señor renuevan sus fuerzas; suben con alas como de águila, corren y no se cansan.', a: 'Isaías 40,31' },
  { t: 'Yo conozco los planes que tengo para vosotros: planes de bienestar y no de desgracia, para daros un futuro y una esperanza.', a: 'Jeremías 29,11' },
  { t: 'No te dejes vencer por el mal; antes bien, vence el mal con el bien.', a: 'Romanos 12,21' },
  { t: 'Buscad primero el Reino de Dios y su justicia, y todo lo demás se os dará por añadidura.', a: 'Mateo 6,33' },
  { t: 'El Señor es mi pastor, nada me falta.', a: 'Salmo 23,1' },
  { t: 'Estad siempre alegres. Orad sin cesar. Dad gracias en toda ocasión.', a: '1 Tesalonicenses 5,16-18' },
  { t: 'No os inquietéis por nada; presentad a Dios vuestras peticiones con oración y acción de gracias.', a: 'Filipenses 4,6' },
  { t: 'Todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.', a: 'Colosenses 3,23' },
  { t: 'No nos cansemos de hacer el bien, porque a su tiempo cosecharemos si no desfallecemos.', a: 'Gálatas 6,9' },
  { t: 'Este es el día que hizo el Señor: alegrémonos y gocémonos en él.', a: 'Salmo 118,24' },
  { t: 'Pedid y se os dará; buscad y hallaréis; llamad y se os abrirá.', a: 'Mateo 7,7' },
  { t: 'Te basta mi gracia, porque mi fuerza se realiza en la debilidad.', a: '2 Corintios 12,9' },
  { t: 'El que es fiel en lo poco, también es fiel en lo mucho.', a: 'Lucas 16,10' },
  { t: 'Lámpara es tu palabra para mis pasos, luz en mi sendero.', a: 'Salmo 119,105' },
  { t: 'Dios no nos ha dado un espíritu de cobardía, sino de fortaleza, de amor y de templanza.', a: '2 Timoteo 1,7' },
  { t: 'Olvidando lo que queda atrás, me lanzo hacia lo que está delante, corriendo hacia la meta.', a: 'Filipenses 3,13-14' },
  { t: 'Confía en el Señor de todo corazón y no te apoyes en tu propia prudencia.', a: 'Proverbios 3,5' },
  { t: 'El amor es paciente, es servicial; el amor no tiene envidia, no presume, no se engríe.', a: '1 Corintios 13,4' },
  { t: 'Vosotros sois la luz del mundo.', a: 'Mateo 5,14' },
  { t: 'Estad tranquilos y sabed que yo soy Dios.', a: 'Salmo 46,11' },
  { t: 'Sabemos que en todas las cosas interviene Dios para bien de los que le aman.', a: 'Romanos 8,28' },
  { t: 'Os doy la paz, mi paz os doy. Que no se turbe vuestro corazón ni se acobarde.', a: 'Juan 14,27' },
  { t: 'Crea en mí, oh Dios, un corazón puro; renueva dentro de mí un espíritu firme.', a: 'Salmo 51,12' },
  { t: 'El que pone la mano en el arado y mira hacia atrás no es apto para el Reino de Dios.', a: 'Lucas 9,62' },
  { t: '¿Acaso no sabéis que en el estadio todos corren, pero uno solo recibe el premio? Corred de manera que lo obtengáis.', a: '1 Corintios 9,24' },
  { t: 'Por la mañana hazme escuchar tu gracia, porque en ti confío.', a: 'Salmo 143,8' },
  { t: 'Sed fuertes y valientes; no temáis, porque el Señor camina a vuestro lado.', a: 'Deuteronomio 31,6' },
  { t: 'Yo estoy con vosotros todos los días, hasta el fin del mundo.', a: 'Mateo 28,20' },
  { t: 'Nada es imposible para Dios.', a: 'Lucas 1,37' },
  { t: 'Gustad y ved qué bueno es el Señor.', a: 'Salmo 34,9' },
  { t: 'El corazón alegre es la mejor medicina.', a: 'Proverbios 17,22' },
  { t: 'Echad sobre Él toda vuestra preocupación, porque Él cuida de vosotros.', a: '1 Pedro 5,7' },
  { t: 'Amarás al Señor tu Dios con todo tu corazón, y a tu prójimo como a ti mismo.', a: 'Lucas 10,27' },
  { t: 'Si Dios está con nosotros, ¿quién contra nosotros?', a: 'Romanos 8,31' },
  { t: 'Todo tiene su momento, y cada cosa su tiempo bajo el sol.', a: 'Eclesiastés 3,1' },
  { t: 'He combatido el buen combate, he terminado la carrera, he guardado la fe.', a: '2 Timoteo 4,7' },
  { t: 'Alzo mis ojos a los montes: ¿de dónde me vendrá el auxilio? Mi auxilio viene del Señor.', a: 'Salmo 121,1-2' },
  { t: 'Bienaventurados los limpios de corazón, porque ellos verán a Dios.', a: 'Mateo 5,8' },
  { t: 'El fruto del Espíritu es amor, alegría, paz, paciencia, bondad, fidelidad, mansedumbre y dominio propio.', a: 'Gálatas 5,22-23' },
  { t: 'No temas, porque yo estoy contigo; no te angusties, porque yo soy tu Dios.', a: 'Isaías 41,10' },
  { t: 'Enséñanos a contar nuestros días, para que adquiramos un corazón sabio.', a: 'Salmo 90,12' },
  { t: 'Donde está tu tesoro, allí estará también tu corazón.', a: 'Mateo 6,21' },
  { t: 'Renovaos en la mente y en el espíritu.', a: 'Efesios 4,23' },
  { t: 'Las misericordias del Señor se renuevan cada mañana; grande es su fidelidad.', a: 'Lamentaciones 3,22-23' },
  { t: 'Velad y orad, para no caer en tentación.', a: 'Mateo 26,41' },
  { t: 'El que siembra con lágrimas, cosecha entre cantares.', a: 'Salmo 126,5' },
  { t: 'Sed hacedores de la Palabra, y no solamente oidores.', a: 'Santiago 1,22' },
  { t: 'Yo soy el camino, la verdad y la vida.', a: 'Juan 14,6' },
  { t: 'La paz de Dios, que supera todo entendimiento, guardará vuestros corazones.', a: 'Filipenses 4,7' },
  { t: 'Más vale el fin de una cosa que su comienzo; más vale la paciencia que la soberbia.', a: 'Eclesiastés 7,8' },
  { t: 'Hijo, entrégame tu corazón.', a: 'Proverbios 23,26' },
  { t: 'Mirad los lirios del campo: no trabajan ni hilan, y ni Salomón en todo su esplendor se vistió como uno de ellos.', a: 'Mateo 6,28-29' },
  { t: 'Bendice, alma mía, al Señor, y no olvides ninguno de sus beneficios.', a: 'Salmo 103,2' },
  { t: 'Cada uno dé según lo que ha decidido en su corazón, porque Dios ama al que da con alegría.', a: '2 Corintios 9,7' },
  { t: 'Levántate y resplandece, porque ha llegado tu luz.', a: 'Isaías 60,1' },

  // --- Santos y autores cristianos ---
  { t: 'Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti.', a: 'San Agustín' },
  { t: 'Nada te turbe, nada te espante; todo se pasa, Dios no se muda. Quien a Dios tiene nada le falta: solo Dios basta.', a: 'Santa Teresa de Jesús' },
  { t: 'Comienza haciendo lo necesario, luego lo posible, y de pronto estarás haciendo lo imposible.', a: 'Atribuida a San Francisco de Asís' },
  { t: 'Si sois lo que debéis ser, prenderéis fuego al mundo entero.', a: 'Santa Catalina de Siena' },
  { t: 'Reza como si todo dependiera de Dios y trabaja como si todo dependiera de ti.', a: 'Atribuida a San Ignacio de Loyola' },
  { t: 'No tengáis miedo. ¡Abrid de par en par las puertas a Cristo!', a: 'San Juan Pablo II' },
  { t: 'Al atardecer de la vida, te examinarán en el amor.', a: 'San Juan de la Cruz' },
  { t: 'No todos podemos hacer grandes cosas, pero sí cosas pequeñas con gran amor.', a: 'Santa Teresa de Calcuta' },
  { t: 'Reza, espera y no te preocupes.', a: 'San Pío de Pietrelcina' },
  { t: 'Haced todo por amor, nada por la fuerza.', a: 'San Francisco de Sales' },
  { t: 'Ten paciencia con todas las cosas, pero sobre todo contigo mismo.', a: 'San Francisco de Sales' },
  { t: 'Nosotros hacemos consistir la santidad en estar siempre alegres.', a: 'Santo Domingo Savio' },
  { t: 'Lo que hagas, hazlo bien; lo que empieces, termínalo.', a: 'Inspirado en San Josemaría Escrivá' },
  { t: 'Santificar el trabajo, santificarse en el trabajo y santificar a los demás con el trabajo.', a: 'San Josemaría Escrivá' },
  { t: 'Vale más un acto de amor hecho en lo escondido que mil obras hechas por vanidad.', a: 'Inspirado en Santa Teresa de Lisieux' },
  { t: 'Mi vocación es el amor.', a: 'Santa Teresa de Lisieux' },
  { t: 'La oración es para mí un impulso del corazón, una simple mirada lanzada hacia el cielo.', a: 'Santa Teresa de Lisieux' },
  { t: 'Donde no hay amor, pon amor y sacarás amor.', a: 'San Juan de la Cruz' },
  { t: 'Señor, hazme un instrumento de tu paz.', a: 'Oración atribuida a San Francisco de Asís' },
  { t: 'La medida del amor es amar sin medida.', a: 'San Agustín' },
  { t: 'Ama y haz lo que quieras.', a: 'San Agustín' },
  { t: 'Tarde te amé, hermosura tan antigua y tan nueva, tarde te amé.', a: 'San Agustín' },
  { t: 'La gloria de Dios es que el hombre viva.', a: 'San Ireneo de Lyon' },
  { t: 'En todo amar y servir.', a: 'San Ignacio de Loyola' },
  { t: 'Todo para mayor gloria de Dios.', a: 'Lema de San Ignacio de Loyola' },
  { t: 'Sed santos, pero no os olvidéis de ser alegres.', a: 'Inspirado en San Felipe Neri' },
  { t: 'Un santo triste es un triste santo.', a: 'San Francisco de Sales' },
  { t: 'La alegría es la red de amor con la que se pueden capturar las almas.', a: 'Santa Teresa de Calcuta' },
  { t: 'Ayer se fue. Mañana no ha llegado. Solo tenemos hoy. Comencemos.', a: 'Santa Teresa de Calcuta' },
  { t: 'Hay que dejar el «yo» y buscar a Dios en cada momento presente.', a: 'Inspirado en Jean-Pierre de Caussade' },
  { t: 'Cristo no tiene ahora en la tierra más cuerpo que el tuyo, más manos que las tuyas, más pies que los tuyos.', a: 'Atribuida a Santa Teresa de Jesús' },
  { t: 'Entre los pucheros anda el Señor.', a: 'Santa Teresa de Jesús' },
  { t: 'La humildad es andar en verdad.', a: 'Santa Teresa de Jesús' },
  { t: 'Solo el amor da valor a las cosas.', a: 'Santa Teresa de Jesús' },
  { t: 'Quien no vive para servir, no sirve para vivir.', a: 'Atribuida a la Madre Teresa de Calcuta' },
  { t: 'Dios no nos pide que tengamos éxito, sino que seamos fieles.', a: 'Santa Teresa de Calcuta' },
  { t: 'El mundo os ofrece comodidad, pero vosotros no habéis sido creados para la comodidad, sino para la grandeza.', a: 'Benedicto XVI' },
  { t: 'Quien cree nunca está solo.', a: 'Benedicto XVI' },
  { t: '¡No os dejéis robar la esperanza!', a: 'Papa Francisco' },
  { t: 'Dios nunca se cansa de perdonar; somos nosotros quienes nos cansamos de pedir perdón.', a: 'Papa Francisco' },
  { t: 'La santidad no es un lujo de pocos, sino un sencillo deber para cada uno.', a: 'Inspirado en Santa Teresa de Calcuta' },
  { t: 'Vivir sin la fe, sin un patrimonio que defender, sin luchar por la verdad, no es vivir, sino ir tirando.', a: 'Beato Pier Giorgio Frassati' },
  { t: '¡Hacia lo alto!', a: 'Beato Pier Giorgio Frassati' },
  { t: 'La Eucaristía es mi autopista hacia el cielo.', a: 'San Carlo Acutis' },
  { t: 'Todos nacen originales, pero muchos mueren como fotocopias.', a: 'San Carlo Acutis' },
  { t: 'Estar siempre unido a Jesús: ese es mi programa de vida.', a: 'San Carlo Acutis' },
  { t: 'Haz lo que debes y está en lo que haces.', a: 'Proverbio cristiano (Age quod agis)' },
  { t: 'Ora et labora: reza y trabaja.', a: 'Regla de San Benito' },
  { t: 'Escucha, hijo, los preceptos del maestro e inclina el oído de tu corazón.', a: 'Regla de San Benito' },
  { t: 'Que la paz de Dios reine en tu corazón y te dé fuerza para el camino de hoy.', a: 'Bendición tradicional' },
  { t: 'El que tiene fe nunca está solo, ni en la tormenta.', a: 'Inspirado en Mateo 8,26' },
  { t: 'No hay santo sin pasado ni pecador sin futuro.', a: 'Atribuida a San Agustín' },
  { t: 'Contempla la cruz y verás cuánto vales.', a: 'Tradición cristiana' },
  { t: 'La fe es dar el primer paso aunque no veas toda la escalera.', a: 'Martin Luther King Jr.' },
  { t: 'Para el que ama, ningún camino es largo.', a: 'Inspirado en San Agustín' },
  { t: 'Dios no elige a los capacitados; capacita a los que elige.', a: 'Tradición cristiana' },
  { t: 'Un pequeño acto de fidelidad hoy vale más que un gran propósito para mañana.', a: 'Tradición espiritual' },

  // --- Motivación y sabiduría general ---
  { t: 'Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito.', a: 'Will Durant, sobre Aristóteles' },
  { t: 'El secreto para salir adelante es comenzar.', a: 'Atribuida a Mark Twain' },
  { t: 'No cuentes los días; haz que los días cuenten.', a: 'Muhammad Ali' },
  { t: 'Caer está permitido. ¡Levantarse es obligatorio!', a: 'Proverbio ruso' },
  { t: 'Un viaje de mil millas comienza con un solo paso.', a: 'Lao Tse' },
  { t: 'La disciplina es el puente entre las metas y los logros.', a: 'Jim Rohn' },
  { t: 'No es que tengamos poco tiempo, sino que perdemos mucho.', a: 'Séneca' },
  { t: 'La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.', a: 'Atribuida a Séneca' },
  { t: 'Mientras se espera vivir, la vida pasa.', a: 'Séneca' },
  { t: 'No es porque las cosas sean difíciles que no nos atrevemos; es porque no nos atrevemos que son difíciles.', a: 'Séneca' },
  { t: 'Tienes poder sobre tu mente, no sobre los acontecimientos. Date cuenta de esto y encontrarás la fuerza.', a: 'Marco Aurelio' },
  { t: 'La felicidad de tu vida depende de la calidad de tus pensamientos.', a: 'Marco Aurelio' },
  { t: 'Lo que hacemos en la vida resuena en la eternidad.', a: 'Inspirado en Marco Aurelio' },
  { t: 'Primero di lo que quieres ser; después haz lo que tienes que hacer.', a: 'Epicteto' },
  { t: 'No es lo que te ocurre, sino cómo reaccionas a ello lo que importa.', a: 'Epicteto' },
  { t: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.', a: 'Robert Collier' },
  { t: 'Lo que no se mide no se puede mejorar.', a: 'Principio de gestión' },
  { t: 'La motivación te pone en marcha; el hábito te mantiene en camino.', a: 'Jim Ryun' },
  { t: 'Hazlo, y si te da miedo, hazlo con miedo.', a: 'Proverbio popular' },
  { t: 'No esperes. Nunca será el momento perfecto.', a: 'Napoleon Hill' },
  { t: 'Gota a gota se llena el vaso.', a: 'Refrán' },
  { t: 'Poco a poco se va lejos.', a: 'Refrán' },
  { t: 'No dejes para mañana lo que puedas hacer hoy.', a: 'Refrán' },
  { t: 'A quien madruga, Dios le ayuda.', a: 'Refrán' },
  { t: 'Querer es poder.', a: 'Refrán' },
  { t: 'Más vale paso que dure que trote que canse.', a: 'Refrán' },
  { t: 'El que la sigue, la consigue.', a: 'Refrán' },
  { t: 'A Dios rogando y con el mazo dando.', a: 'Refrán' },
  { t: 'Caminante, no hay camino, se hace camino al andar.', a: 'Antonio Machado' },
  { t: 'Si quieres ir rápido, ve solo; si quieres llegar lejos, ve acompañado.', a: 'Proverbio africano' },
  { t: 'El mejor momento para plantar un árbol fue hace veinte años. El segundo mejor momento es ahora.', a: 'Proverbio chino' },
  { t: 'Nunca es demasiado tarde para ser quien podrías haber sido.', a: 'Atribuida a George Eliot' },
  { t: 'Cree que puedes y ya habrás recorrido la mitad del camino.', a: 'Theodore Roosevelt' },
  { t: 'Haz lo que puedas, con lo que tengas, donde estés.', a: 'Theodore Roosevelt' },
  { t: 'Parece imposible hasta que se hace.', a: 'Nelson Mandela' },
  { t: 'No he fracasado. He encontrado diez mil maneras que no funcionan.', a: 'Atribuida a Thomas Edison' },
  { t: 'La vida es como montar en bicicleta: para mantener el equilibrio hay que seguir moviéndose.', a: 'Albert Einstein' },
  { t: 'El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el valor para continuar.', a: 'Atribuida a Winston Churchill' },
  { t: 'Si estás atravesando un infierno, sigue adelante.', a: 'Atribuida a Winston Churchill' },
  { t: 'Nuestra mayor gloria no está en no caer nunca, sino en levantarnos cada vez que caemos.', a: 'Oliver Goldsmith' },
  { t: 'No juzgues cada día por la cosecha que recoges, sino por las semillas que plantas.', a: 'Robert Louis Stevenson' },
  { t: 'Quien tiene un porqué para vivir puede soportar casi cualquier cómo.', a: 'Friedrich Nietzsche, citado por Viktor Frankl' },
  { t: 'Al hombre se le puede arrebatar todo salvo una cosa: la libertad de elegir su actitud.', a: 'Viktor Frankl' },
  { t: 'La gratitud convierte lo que tenemos en suficiente.', a: 'Proverbio' },
  { t: 'La constancia vence lo que la dicha no alcanza.', a: 'Refrán' },
  { t: 'El que no vive como piensa, acaba pensando como vive.', a: 'Atribuida a Fulton J. Sheen' },
  { t: 'Los grandes logros nacen de pequeñas decisiones tomadas cada día.', a: 'Anónimo' },
  { t: 'Tu yo de mañana te agradecerá lo que hagas hoy.', a: 'Anónimo' },
  { t: 'No te compares con nadie; compárate con quien eras ayer.', a: 'Anónimo' },
  { t: 'La disciplina es elegir entre lo que quieres ahora y lo que más quieres.', a: 'Atribuida a Abraham Lincoln' },
  { t: 'Hecho es mejor que perfecto.', a: 'Anónimo' },
  { t: 'Pequeños pasos cada día; grandes resultados con el tiempo.', a: 'Anónimo' },
  { t: 'La paz comienza con una sonrisa.', a: 'Santa Teresa de Calcuta' },
  { t: 'Sé la persona que necesitabas cuando eras más joven.', a: 'Anónimo' },
  { t: 'Ganar la batalla de la cama es la primera victoria del día.', a: 'Inspirado en San Josemaría Escrivá' },
  { t: 'Si quieres cambiar el mundo, empieza por hacer tu cama.', a: 'William H. McRaven' },
  { t: 'Si no puedes volar, corre; si no puedes correr, camina; si no puedes caminar, gatea. Pero sigue adelante.', a: 'Martin Luther King Jr.' },
  { t: 'La oscuridad no puede expulsar a la oscuridad; solo la luz puede hacerlo.', a: 'Martin Luther King Jr.' },
  { t: 'Sueña en grande, empieza en pequeño, actúa ya.', a: 'Anónimo' },
  { t: 'Que tu fe sea más grande que tus miedos.', a: 'Anónimo' },
  { t: 'El descanso también es parte del camino.', a: 'Anónimo' },
  { t: 'Hoy es una nueva oportunidad para hacerlo mejor que ayer.', a: 'Anónimo' },
  { t: 'Un día a la vez. Una victoria a la vez.', a: 'Anónimo' },
  { t: 'Agradece, ofrece y empieza.', a: 'Anónimo' },
  { t: 'La perseverancia no es una carrera larga; son muchas carreras cortas, una tras otra.', a: 'Walter Elliot' },
  { t: 'La felicidad no es algo hecho. Proviene de tus propias acciones.', a: 'Dalái Lama' },
  { t: 'El hombre que mueve montañas comienza cargando pequeñas piedras.', a: 'Proverbio chino' },
  { t: 'Siembra un acto y cosecharás un hábito; siembra un hábito y cosecharás un carácter.', a: 'Proverbio' },
  { t: 'El valor no es la ausencia de miedo, sino el triunfo sobre él.', a: 'Nelson Mandela' },
  { t: 'Lo que siembras en silencio florece a su tiempo.', a: 'Anónimo' },
  { t: 'Cuida tus pensamientos, porque se convertirán en tus palabras; cuida tus palabras, porque se convertirán en tus actos.', a: 'Proverbio' },
  { t: 'No busques ser perfecto; busca ser fiel.', a: 'Anónimo' },
  { t: 'Cada mañana nacemos de nuevo. Lo que hacemos hoy es lo que más importa.', a: 'Atribuida a Buda' },
  { t: 'La oración no cambia a Dios, pero cambia al que ora.', a: 'Søren Kierkegaard' },
  { t: 'Lo esencial es invisible a los ojos.', a: 'Antoine de Saint-Exupéry' },
  { t: 'Un objetivo sin un plan es solo un deseo.', a: 'Atribuida a Antoine de Saint-Exupéry' },
  { t: 'La paciencia es amarga, pero su fruto es dulce.', a: 'Atribuida a Jean-Jacques Rousseau' },
  { t: 'Quien domina a los demás es fuerte; quien se domina a sí mismo es poderoso.', a: 'Lao Tse' },
  { t: 'Saber no es suficiente; debemos aplicar. Querer no es suficiente; debemos hacer.', a: 'Johann Wolfgang von Goethe' },
  { t: 'Todo parece imposible hasta que alguien lo hace.', a: 'Anónimo' },
  { t: 'Empieza donde estás. Usa lo que tienes. Haz lo que puedas.', a: 'Arthur Ashe' },
  { t: 'No se trata de tener tiempo, se trata de hacer tiempo.', a: 'Anónimo' },
  { t: 'La mejor forma de predecir el futuro es crearlo.', a: 'Atribuida a Peter Drucker' },
  { t: 'Agradece la noche que te enseñó a ver las estrellas.', a: 'Anónimo' },
];

// Permutación determinista (barajado con semilla fija) para alternar tipos de frase.
function seededShuffle(n, seed = 20261124) {
  const idx = Array.from({ length: n }, (_, i) => i);
  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

const orders = new Map();

/** Frase del día a partir de la lista actual (la del usuario). */
function quoteFor(key, list = QUOTES) {
  if (!list || !list.length) return { t: 'Añade tus frases favoritas en Ajustes → Frases.', a: 'GodPole' };
  let order = orders.get(list.length);
  if (!order) { order = seededShuffle(list.length); orders.set(list.length, order); }
  const n = dayNumber(key);
  return list[order[((n % order.length) + order.length) % order.length]];
}

return { QUOTES, quoteFor };
})();
// ---- store.js ----
__m['store.js'] = (function () {
// Estado de la app, persistido en localStorage.
//
// Modelo:
//   goals: [{ id, title, emoji, schedule, createdAt, archivedAt, order, priority, facetId, target, unit }]
//     schedule = { type: 'daily' } | { type: 'weekdays', days: [0..6] } | { type: 'date', date: 'YYYY-MM-DD' }
//              | { type: 'flex', every: 'week' | 'month' | null, times: N }
//       'flex' = objetivo flexible: no toca ningún día concreto, se marca el día que se hace y sus puntos
//       suman como extra a ese día (nunca penaliza un día). Con every='week'/'month' tiene una meta de
//       N veces por semana/mes, que se mide por semanas/meses cumplidos. Con every=null es libre (sin meta).
//     priority = 'low' | 'medium' | 'high' | 'max'  (puntos 1 · 2 · 3 · 5)
//     target/unit: si hay target, es un objetivo con cantidad (p. ej. 20 páginas)
//   facets: [{ id, name, emoji, color, order }]   (carpetas: Fe, Ejercicio, Finanzas…)
//   logs: { 'YYYY-MM-DD': { done: { goalId: true | cantidad }, mood: 1..5|null, note: '', gospelRead: bool, planned?: [ids] } }
//
// Los días pasados se "congelan" (planned) para que editar un objetivo no cambie el historial.

const { todayKey, addDays, weekday } = __m['dates.js'];
const { QUOTES } = __m['quotes.js'];

const STORAGE_KEY = 'godpole.v1';
const listeners = new Set();

function defaultState() {
  return {
    version: 1,
    startDate: todayKey(),
    frozenThrough: null,
    settings: { name: '', threshold: 0.8, gospelSource: 'rezandovoy', connectorUrl: '', theme: 'auto' },
    goals: [],
    facets: [],
    logs: {},
    quotes: null, // se rellena con las frases por defecto la primera vez
  };
}

// ---------- Prioridades y progreso ----------

/** Punto extra por leer el Evangelio del día: no pertenece a ninguna faceta ni penaliza si no se lee. */
const GOSPEL_BONUS = 1;

const PRIORITIES = [
  { id: 'low', label: 'Baja', points: 1 },
  { id: 'medium', label: 'Media', points: 2 },
  { id: 'high', label: 'Alta', points: 3 },
  { id: 'max', label: 'Muy alta', points: 5 },
];

function goalPoints(goal) {
  return (PRIORITIES.find((p) => p.id === goal?.priority) || PRIORITIES[1]).points;
}

function priorityLabel(goal) {
  return (PRIORITIES.find((p) => p.id === goal?.priority) || PRIORITIES[1]).label;
}

function isQuantity(goal) {
  return !!(goal && goal.target > 0);
}

/** Fracción cumplida (0..1) de un objetivo a partir de lo guardado en el día. */
function goalProgress(goal, value) {
  if (value === true) return 1;
  if (typeof value === 'number' && isQuantity(goal)) return Math.max(0, Math.min(1, value / goal.target));
  return 0;
}

const FACET_COLORS = ['#5b5bd6', '#d6a23c', '#1f9d63', '#e5484d', '#0ea5e9', '#d946ef', '#f97316', '#64748b'];

function defaultQuotes() {
  return QUOTES.map((q, i) => ({ id: 'd' + i, t: q.t, a: q.a, mine: false }));
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return migrate(parsed);
  } catch (e) {
    console.error('No se pudo leer el estado', e);
    // Antes de empezar de cero, se guarda una copia del contenido dañado para no perderlo
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) localStorage.setItem(`godpole.corrupt.${Date.now()}`, raw);
    } catch {}
    return defaultState();
  }
}

// ---------- Saneado de datos ----------
// Todo lo que se carga (del almacenamiento o de un archivo importado) pasa por aquí.
// Por qué: los textos se pintan en la página como HTML. Si un archivo manipulado trajera
// identificadores, colores o emojis con comillas o etiquetas, podría inyectar código.
// Con datos válidos estas funciones no cambian nada (son idempotentes), así que no se pierde información.

const SAFE_ID = /^[A-Za-z0-9_-]{1,64}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;
// Caracteres de control (salvo salto de línea y tabulador), que no deben estar en un texto normal
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function cleanId(v) {
  const s = String(v ?? '');
  if (SAFE_ID.test(s)) return s;
  // Sustitución determinista: el mismo id roto da siempre el mismo id limpio, así se conservan las referencias
  const fixed = s.replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 64);
  return fixed || null;
}
function cleanText(v, max) {
  return typeof v === 'string' ? v.replace(CONTROL, '').slice(0, max) : '';
}
function cleanEmoji(v, fallback) {
  const s = typeof v === 'string' ? v.replace(CONTROL, '').replace(/[<>&"'`]/g, '').slice(0, 16) : '';
  return s || fallback;
}
function cleanDate(v) {
  return typeof v === 'string' && DATE_RE.test(v) ? v : null;
}
function cleanNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function cleanSchedule(s) {
  if (s && s.type === 'weekdays') {
    const days = (Array.isArray(s.days) ? s.days : []).map(Number).filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);
    return { type: 'weekdays', days: [...new Set(days)] };
  }
  if (s && s.type === 'date' && cleanDate(s.date)) return { type: 'date', date: s.date };
  if (s && s.type === 'flex') {
    const every = s.every === 'week' || s.every === 'month' ? s.every : null;
    const max = every === 'week' ? 7 : 31;
    const times = Math.round(Number(s.times));
    return { type: 'flex', every, times: every ? Math.min(max, Math.max(1, Number.isFinite(times) ? times : 1)) : null };
  }
  return { type: 'daily' };
}

function cleanGoal(g, i) {
  const id = cleanId(g.id);
  if (!id) return null;
  const target = cleanNum(g.target);
  return {
    ...g,
    id,
    title: cleanText(g.title, 200) || 'Objetivo',
    emoji: cleanEmoji(g.emoji, '⭐'),
    schedule: cleanSchedule(g.schedule),
    createdAt: cleanDate(g.createdAt),
    archivedAt: cleanDate(g.archivedAt),
    order: cleanNum(g.order) ?? i,
    priority: PRIORITIES.some((p) => p.id === g.priority) ? g.priority : 'medium',
    facetId: g.facetId == null ? null : cleanId(g.facetId),
    target: target > 0 ? target : null,
    unit: target > 0 ? cleanText(g.unit, 30) : '',
  };
}

function cleanFacet(f, i) {
  const id = cleanId(f.id);
  if (!id) return null;
  return {
    id,
    name: cleanText(f.name, 60) || 'Faceta',
    emoji: cleanEmoji(f.emoji, '📁'),
    color: typeof f.color === 'string' && HEX_COLOR.test(f.color) ? f.color : FACET_COLORS[i % FACET_COLORS.length],
    order: cleanNum(f.order) ?? i,
  };
}

function cleanLog(l) {
  const done = {};
  if (l.done && typeof l.done === 'object') {
    for (const [k, v] of Object.entries(l.done)) {
      const id = cleanId(k);
      if (!id) continue;
      if (v === true) done[id] = true;
      else if (typeof v === 'number' && Number.isFinite(v) && v > 0) done[id] = v;
    }
  }
  const mood = Number(l.mood);
  const out = {
    done,
    mood: Number.isInteger(mood) && mood >= 1 && mood <= 5 ? mood : null,
    note: cleanText(l.note, 100000),
    gospelRead: l.gospelRead === true,
  };
  if (Array.isArray(l.planned)) out.planned = l.planned.map(cleanId).filter(Boolean);
  return out;
}

function cleanSettings(s, base) {
  const out = { ...base, ...(s && typeof s === 'object' ? s : {}) };
  out.name = cleanText(out.name, 60);
  const th = Number(out.threshold);
  out.threshold = th > 0 && th <= 1 ? th : base.threshold;
  if (!['rezandovoy', 'evangeliodeldia'].includes(out.gospelSource)) out.gospelSource = base.gospelSource;
  out.connectorUrl = typeof out.connectorUrl === 'string' && /^https:\/\/[^\s"'<>]+$/.test(out.connectorUrl.trim()) ? out.connectorUrl.trim() : '';
  if (!['auto', 'light', 'dark'].includes(out.theme)) out.theme = 'auto';
  out.lastExportAt = cleanNum(out.lastExportAt);
  return out;
}

function migrate(s) {
  const base = defaultState();
  if (!s || typeof s !== 'object' || Array.isArray(s)) return base;
  const logs = {};
  if (s.logs && typeof s.logs === 'object' && !Array.isArray(s.logs)) {
    for (const [k, l] of Object.entries(s.logs)) if (DATE_RE.test(k) && l && typeof l === 'object') logs[k] = cleanLog(l);
  }
  return {
    ...base,
    ...s,
    startDate: cleanDate(s.startDate) || base.startDate,
    frozenThrough: cleanDate(s.frozenThrough),
    settings: cleanSettings(s.settings, base.settings),
    goals: (Array.isArray(s.goals) ? s.goals : []).filter((g) => g && typeof g === 'object').map(cleanGoal).filter(Boolean),
    facets: (Array.isArray(s.facets) ? s.facets : []).filter((f) => f && typeof f === 'object').map(cleanFacet).filter(Boolean),
    logs,
    quotes: Array.isArray(s.quotes)
      ? s.quotes.filter((q) => q && typeof q === 'object' && cleanId(q.id) && typeof q.t === 'string')
        .map((q) => ({ id: cleanId(q.id), t: cleanText(q.t, 1000), a: cleanText(q.a, 200), mine: q.mine === true }))
      : defaultQuotes(),
  };
}

// Se carga después de definir las funciones de saneado (las constantes de arriba deben existir ya).
let state = load();
if (!Array.isArray(state.quotes)) state.quotes = defaultQuotes();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Almacenamiento lleno o no disponible: se avisa en pantalla (main.js) en vez de fallar en silencio
    console.error('No se pudo guardar', e);
    window.dispatchEvent(new CustomEvent('godpole:save-error'));
  }
  listeners.forEach((fn) => fn(state));
}

function getState() {
  return state;
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function uid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
}

// ---------- Programación de objetivos ----------

function isFlex(goal) {
  return !!(goal && goal.schedule && goal.schedule.type === 'flex');
}

/** Objetivos flexibles disponibles para marcar un día (creados antes y no archivados entonces). */
function flexGoals(key) {
  return state.goals
    .filter((g) => isFlex(g) && (!g.createdAt || key >= g.createdAt) && (!g.archivedAt || key < g.archivedAt))
    .sort((a, b) => a.order - b.order);
}

function isScheduled(goal, key) {
  if (isFlex(goal)) return false; // los flexibles nunca son obligatorios un día concreto
  if (goal.createdAt && key < goal.createdAt && goal.schedule.type !== 'date') return false;
  if (goal.archivedAt && key >= goal.archivedAt) return false;
  const s = goal.schedule || { type: 'daily' };
  if (s.type === 'daily') return true;
  if (s.type === 'weekdays') return (s.days || []).includes(weekday(key));
  if (s.type === 'date') return s.date === key;
  return false;
}

function computePlannedIds(key) {
  return state.goals
    .filter((g) => isScheduled(g, key))
    .sort((a, b) => a.order - b.order)
    .map((g) => g.id);
}

/** Objetivos previstos para un día (respetando el historial congelado). */
function plannedGoals(key) {
  const log = state.logs[key];
  const ids = log && Array.isArray(log.planned) ? log.planned : computePlannedIds(key);
  const byId = new Map(state.goals.map((g) => [g.id, g]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

function plannedIds(key) {
  return plannedGoals(key).map((g) => g.id);
}

/** Congela los días pasados que aún no lo estén. Se llama al abrir la app y al cambiar de día. */
function freezePastDays() {
  const today = todayKey();
  const yesterday = addDays(today, -1);
  let k = state.frozenThrough ? addDays(state.frozenThrough, 1) : state.startDate;
  if (k > yesterday) return;
  let changed = false;
  // límite de seguridad por si la app lleva mucho tiempo sin abrirse
  let guard = 0;
  while (k <= yesterday && guard < 4000) {
    const log = state.logs[k] || (state.logs[k] = emptyLog());
    if (!Array.isArray(log.planned)) {
      log.planned = computePlannedIds(k);
      changed = true;
    }
    k = addDays(k, 1);
    guard++;
  }
  state.frozenThrough = yesterday;
  // limpiar logs vacíos para no inflar el almacenamiento
  for (const [key, log] of Object.entries(state.logs)) {
    if (key <= yesterday && isEmptyLog(log) && log.planned && log.planned.length === 0) delete state.logs[key];
  }
  if (changed) console.debug('Días congelados hasta', yesterday);
  persist();
}

function emptyLog() {
  return { done: {}, mood: null, note: '', gospelRead: false };
}

function isEmptyLog(log) {
  return (
    Object.keys(log.done || {}).length === 0 && !log.mood && !log.note && !log.gospelRead
  );
}

function ensureLog(key) {
  if (!state.logs[key]) state.logs[key] = emptyLog();
  return state.logs[key];
}

function getLog(key) {
  return state.logs[key] || emptyLog();
}

// ---------- Acciones ----------

function toggleGoal(key, goalId) {
  const log = ensureLog(key);
  if (log.done[goalId]) delete log.done[goalId];
  else log.done[goalId] = true;
  persist();
  return !!log.done[goalId];
}

/** Guarda la cantidad hecha de un objetivo con cantidad (0 = sin hacer). */
function setGoalAmount(key, goalId, amount) {
  const log = ensureLog(key);
  const v = Math.max(0, Number(amount) || 0);
  if (v === 0) delete log.done[goalId];
  else log.done[goalId] = v;
  persist();
}

function setMood(key, mood) {
  const log = ensureLog(key);
  log.mood = log.mood === mood ? null : mood;
  persist();
}

function setNote(key, note) {
  const log = ensureLog(key);
  log.note = note;
  persist();
}

function toggleGospelRead(key) {
  const log = ensureLog(key);
  log.gospelRead = !log.gospelRead;
  persist();
  return log.gospelRead;
}

function addGoal({ title, emoji, schedule, priority = 'medium', facetId = null, target = null, unit = '' }) {
  const today = todayKey();
  const maxOrder = state.goals.reduce((m, g) => Math.max(m, g.order || 0), 0);
  const goal = {
    id: uid(),
    title: title.trim(),
    emoji: emoji || '⭐',
    schedule,
    createdAt: today,
    archivedAt: null,
    order: maxOrder + 1,
    priority,
    facetId,
    target: target > 0 ? target : null,
    unit: target > 0 ? (unit || '').trim() : '',
  };
  state.goals.push(goal);
  persist();
  return goal;
}

function updateGoal(id, patch) {
  const g = state.goals.find((x) => x.id === id);
  if (!g) return;
  Object.assign(g, patch);
  persist();
}

function archiveGoal(id) {
  updateGoal(id, { archivedAt: todayKey() });
}

function restoreGoal(id) {
  updateGoal(id, { archivedAt: null });
}

/** Elimina el objetivo y todo su historial. */
function deleteGoal(id) {
  state.goals = state.goals.filter((g) => g.id !== id);
  for (const log of Object.values(state.logs)) {
    if (log.done) delete log.done[id];
    if (Array.isArray(log.planned)) log.planned = log.planned.filter((x) => x !== id);
  }
  persist();
}

function moveGoal(id, dir) {
  const active = state.goals.filter((g) => !g.archivedAt).sort((a, b) => a.order - b.order);
  const i = active.findIndex((g) => g.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= active.length) return;
  const a = active[i];
  const b = active[j];
  [a.order, b.order] = [b.order, a.order];
  persist();
}

function updateSettings(patch) {
  state.settings = { ...state.settings, ...patch };
  persist();
}

// ---------- Facetas ----------

function addFacet({ name, emoji, color }) {
  const maxOrder = state.facets.reduce((m, f) => Math.max(m, f.order || 0), 0);
  const f = { id: uid(), name: name.trim(), emoji: emoji || '📁', color: color || FACET_COLORS[state.facets.length % FACET_COLORS.length], order: maxOrder + 1 };
  state.facets.push(f);
  persist();
  return f;
}

function updateFacet(id, patch) {
  const f = state.facets.find((x) => x.id === id);
  if (!f) return;
  Object.assign(f, patch);
  persist();
}

/** Borra la faceta; sus objetivos quedan "sin faceta" (no se pierde nada). */
function deleteFacet(id) {
  state.facets = state.facets.filter((f) => f.id !== id);
  for (const g of state.goals) if (g.facetId === id) g.facetId = null;
  persist();
}

function getFacet(id) {
  return state.facets.find((f) => f.id === id) || null;
}

// ---------- Frases ----------

function addQuote({ t, a }) {
  const q = { id: uid(), t: t.trim(), a: (a || '').trim(), mine: true };
  state.quotes.unshift(q);
  persist();
  return q;
}

function updateQuote(id, patch) {
  const q = state.quotes.find((x) => x.id === id);
  if (!q) return;
  Object.assign(q, { t: patch.t.trim(), a: (patch.a || '').trim() });
  persist();
}

function deleteQuote(id) {
  state.quotes = state.quotes.filter((q) => q.id !== id);
  persist();
}

/** Restaura las frases originales que falten, sin tocar las tuyas. */
function restoreDefaultQuotes() {
  const have = new Set(state.quotes.map((q) => q.id));
  for (const q of defaultQuotes()) if (!have.has(q.id)) state.quotes.push(q);
  persist();
}

// ---------- Copias de seguridad ----------

function exportData() {
  return JSON.stringify({ app: 'GodPole', exportedAt: new Date().toISOString(), ...state }, null, 2);
}

/** Límite de tamaño del archivo a importar (evita bloquear el móvil con un archivo enorme). */
const MAX_IMPORT_BYTES = 25 * 1024 * 1024;

/** Lee el texto de un archivo de copia. Devuelve el objeto (cifrado o no) sin aplicarlo todavía. */
function parseBackupText(text) {
  if (typeof text !== 'string' || text.length > MAX_IMPORT_BYTES) throw new Error('El archivo es demasiado grande para ser una copia de GodPole.');
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('El archivo no es una copia válida (no es JSON).');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('El archivo no parece una copia de seguridad de GodPole.');
  if ((parsed.app && parsed.app !== 'GodPole') || (parsed._app && parsed._app !== 'GodPole')) {
    throw new Error(`Este archivo es una copia de otra app (${parsed.app || parsed._app}), no de GodPole.`);
  }
  return parsed;
}

function checkPlain(parsed) {
  if (!parsed || !Array.isArray(parsed.goals) || !parsed.logs || typeof parsed.logs !== 'object') {
    throw new Error('El archivo no parece una copia de seguridad válida de GodPole.');
  }
}

/** Resumen para pedir confirmación antes de sustituir los datos. */
function summarizeBackup(parsed) {
  checkPlain(parsed);
  const logs = Object.values(parsed.logs || {});
  return {
    goals: parsed.goals.length,
    days: logs.length,
    notes: logs.filter((l) => l && typeof l.note === 'string' && l.note.trim()).length,
    exportedAt: parsed.exportedAt || null,
  };
}

function importData(jsonOrObject) {
  const parsed = typeof jsonOrObject === 'string' ? parseBackupText(jsonOrObject) : jsonOrObject;
  checkPlain(parsed);
  const { app, exportedAt, ...rest } = parsed;
  state = migrate(rest);
  persist();
}

/** Anota la fecha de la última copia (para recordarte hacer otra si pasa mucho tiempo). */
function markExported() {
  state.settings.lastExportAt = Date.now();
  persist();
}

function resetAll() {
  state = migrate(defaultState());
  persist();
}

return { GOSPEL_BONUS, PRIORITIES, goalPoints, priorityLabel, isQuantity, goalProgress, FACET_COLORS, getState, subscribe, uid, isFlex, flexGoals, isScheduled, plannedGoals, plannedIds, freezePastDays, getLog, toggleGoal, setGoalAmount, setMood, setNote, toggleGospelRead, addGoal, updateGoal, archiveGoal, restoreGoal, deleteGoal, moveGoal, updateSettings, addFacet, updateFacet, deleteFacet, getFacet, addQuote, updateQuote, deleteQuote, restoreDefaultQuotes, exportData, MAX_IMPORT_BYTES, parseBackupText, summarizeBackup, importData, markExported, resetAll };
})();
// ---- gospel.js ----
__m['gospel.js'] = (function () {
// Evangelio del día.
//  - RezandoVoy (preferido): a través del conector del usuario (connector/rezandovoy-worker.js).
//  - evangeliodeldia.org: respaldo automático (su feed público permite lectura directa).
// Todo se guarda en caché local para leerlo sin conexión.

const { addDays, todayKey } = __m['dates.js'];
const { getState } = __m['store.js'];

const EVANGELIZO = 'https://feed.evangelizo.org/v2/reader.php';
// Conector propio de RezandoVoy (Cloudflare Worker). Se usa si no has puesto otro en Ajustes.
const DEFAULT_CONNECTOR = 'https://godpole-rezandovoy.noisy-fire-165e.workers.dev';

function connectorUrl() {
  return (getState().settings.connectorUrl || '').trim() || DEFAULT_CONNECTOR;
}
const CACHE_PREFIX = 'godpole.gospel2.';
const KEEP_DAYS = 10;

const SOURCES = {
  rezandovoy: { name: 'RezandoVoy', site: 'https://rezandovoy.org' },
  evangeliodeldia: { name: 'evangeliodeldia.org', site: 'https://evangeliodeldia.org/SP/gospel' },
};

// ---------- RezandoVoy (vía conector) ----------

async function fetchRezandoVoy(key, connectorUrl) {
  const base = connectorUrl.replace(/\/+$/, '');
  const res = await fetch(`${base}/?date=${key}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Conector: HTTP ${res.status}`);
  const d = await res.json();
  if (!d || !d.text) throw new Error('Conector: respuesta sin texto');
  return {
    date: key,
    source: 'rezandovoy',
    title: d.title || '',
    liturgicDay: d.liturgicDay || '',
    reference: d.reference || '',
    text: d.text,
    url: d.url || SOURCES.rezandovoy.site,
    comment: null,
    saints: [],
  };
}

async function testConnector(connectorUrl) {
  return fetchRezandoVoy(todayKey(), connectorUrl);
}

// ---------- evangeliodeldia.org ----------

async function fetchPart(key, params) {
  const url = `${EVANGELIZO}?date=${key.replaceAll('-', '')}&lang=SP&${params}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function htmlToText(html) {
  const withBreaks = html.replace(/<br\s*\/?>/gi, '\n');
  const doc = new DOMParser().parseFromString(withBreaks, 'text/html');
  return (doc.body.textContent || '')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function saintsFromHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return [...doc.querySelectorAll('a')].map((a) => a.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

async function fetchEvangelizo(key) {
  const [liturgic, reference, body, commentTitle, commentAuthor, comment, saints] = await Promise.all([
    fetchPart(key, 'type=liturgic_t'),
    fetchPart(key, 'type=reading_lt&content=GSP'),
    fetchPart(key, 'type=reading&content=GSP'),
    fetchPart(key, 'type=comment_t').catch(() => ''),
    fetchPart(key, 'type=comment_a').catch(() => ''),
    fetchPart(key, 'type=comment').catch(() => ''),
    fetchPart(key, 'type=saint').catch(() => ''),
  ]);
  const lines = htmlToText(body).split('\n')
    .filter((l) => !/^Extra[ií]do de la Biblia/i.test(l) && !/^Para recibir cada ma[ñn]ana/i.test(l));
  const text = lines.join('\n').trim();
  if (!text) throw new Error('Respuesta vacía');
  return {
    date: key,
    source: 'evangeliodeldia',
    title: '',
    liturgicDay: htmlToText(liturgic),
    reference: htmlToText(reference).replace(/\.$/, '').replace(/^Evangelio según\s+/i, ''),
    text,
    url: SOURCES.evangeliodeldia.site,
    comment: comment
      ? { title: htmlToText(commentTitle), author: htmlToText(commentAuthor), text: htmlToText(comment) }
      : null,
    saints: saints ? saintsFromHtml(saints).slice(0, 4) : [],
  };
}

// ---------- Caché ----------

function preferred() {
  const s = getState().settings;
  return s.gospelSource === 'rezandovoy' && connectorUrl() ? 'rezandovoy' : 'evangeliodeldia';
}

function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const g = JSON.parse(raw);
    // si ahora prefieres RezandoVoy y lo guardado es el respaldo, se intenta de nuevo (una vez cada 6 h)
    if (preferred() === 'rezandovoy' && g.source !== 'rezandovoy' && Date.now() - (g.fetchedAt || 0) > 6 * 3600e3) return null;
    if (preferred() === 'evangeliodeldia' && g.source !== 'evangeliodeldia') return null;
    return g;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ ...data, fetchedAt: Date.now() }));
    const limit = addDays(todayKey(), -KEEP_DAYS);
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('godpole.gospel.') || (k.startsWith(CACHE_PREFIX) && k.slice(CACHE_PREFIX.length) < limit))) {
        localStorage.removeItem(k);
      }
    }
  } catch (e) {
    console.warn('No se pudo guardar el evangelio en caché', e);
  }
}

function clearGospelCache() {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (k && k.startsWith(CACHE_PREFIX)) localStorage.removeItem(k);
  }
}

async function download(key) {
  if (preferred() === 'rezandovoy') {
    try {
      return await fetchRezandoVoy(key, connectorUrl());
    } catch (e) {
      console.warn('RezandoVoy no disponible, se usa evangeliodeldia.org', e);
    }
  }
  return fetchEvangelizo(key);
}

const inflight = new Map();

async function getGospel(key) {
  const cached = readCache(key);
  if (cached) return cached;
  if (inflight.has(key)) return inflight.get(key);
  const p = download(key)
    .then((data) => { writeCache(key, data); return data; })
    .finally(() => inflight.delete(key));
  inflight.set(key, p);
  return p;
}

function getCachedGospel(key) {
  return readCache(key);
}

// Descarga por adelantado la próxima semana: así el Evangelio está disponible aunque pases
// varios días sin conexión (se guarda en el propio móvil).
function prefetchUpcoming(days = 7) {
  const today = todayKey();
  for (let i = 1; i <= days; i++) {
    const k = addDays(today, i);
    if (!readCache(k)) getGospel(k).catch(() => {});
  }
}

return { DEFAULT_CONNECTOR, SOURCES, testConnector, clearGospelCache, getGospel, getCachedGospel, prefetchUpcoming };
})();
// ---- ui.js ----
__m['ui.js'] = (function () {
// Utilidades de interfaz: escape de HTML, iconos, hojas inferiores, avisos y confeti.

// ---------- Tema (automático / claro / oscuro) ----------

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
let currentTheme = 'auto';

function applyTheme(theme = currentTheme) {
  currentTheme = theme || 'auto';
  const dark = currentTheme === 'dark' || (currentTheme === 'auto' && darkQuery.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', dark ? '#0b0b14' : '#f4f3f9'));
}
darkQuery.addEventListener('change', () => applyTheme());

function esc(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const svg = (body, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

const icons = {
  book: svg('<path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6.5A2.5 2.5 0 0 0 4 21.5v-2z"/><path d="M6.5 19H19v3H6.5A2.5 2.5 0 0 1 4 19.5"/><path d="M11.5 7v6M9 9.2h5"/>'),
  check: svg('<path d="M20 6 9 17l-5-5"/>', 'stroke-width="3"'),
  chevronLeft: svg('<path d="m15 18-6-6 6-6"/>', 'stroke-width="2.5"'),
  chevronRight: svg('<path d="m9 18 6-6-6-6"/>', 'stroke-width="2.5"'),
  chevronDown: svg('<path d="m6 9 6 6 6-6"/>', 'stroke-width="2.5"'),
  chevronUp: svg('<path d="m18 15-6-6-6 6"/>', 'stroke-width="2.5"'),
  x: svg('<path d="M18 6 6 18M6 6l12 12"/>', 'stroke-width="2.5"'),
  plus: svg('<path d="M12 5v14M5 12h14"/>', 'stroke-width="2.5"'),
  list: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2"/>'),
  settings: svg('<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>'),
  share: svg('<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4M12 2v13"/>'),
  archive: svg('<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>'),
  trash: svg('<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
  restore: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
  download: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'),
  upload: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'),
  external: svg('<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
  stats: svg('<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/>'),
  headphones: svg('<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>'),
  edit: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
  quote: svg('<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h3c0 3.5-1.5 5-4 5"/><path d="M14 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h3c0 3.5-1.5 5-4 5"/>', 'stroke-width="1.8"'),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
  home: svg('<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>'),
  target: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>'),
  chart: svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  folder: svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
  sparkles: svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 3v4M17 5h4M5 17v4M3 19h4"/>'),
  pen: svg('<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>', 'stroke-width="1.8"'),
  flame: svg('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'),
};

const MOODS = [
  { v: 1, emoji: '😞', label: 'Muy mal', color: 'var(--mood-1)' },
  { v: 2, emoji: '🙁', label: 'Mal', color: 'var(--mood-2)' },
  { v: 3, emoji: '😐', label: 'Normal', color: 'var(--mood-3)' },
  { v: 4, emoji: '🙂', label: 'Bien', color: 'var(--mood-4)' },
  { v: 5, emoji: '😄', label: 'Genial', color: 'var(--mood-5)' },
];

function moodFor(v) {
  if (!v) return null;
  return MOODS[Math.min(4, Math.max(0, Math.round(v) - 1))];
}

/** Puntos con coma decimal y sin decimales innecesarios: 12 · 12,5 */
function fmtPts(n) {
  const r = Math.round((n || 0) * 10) / 10;
  return String(r).replace('.', ',');
}

function pct(r) {
  return r == null ? '—' : `${Math.round(r * 100)}%`;
}

function heatClass(ratio) {
  if (ratio == null) return '';
  if (ratio <= 0) return 'h0';
  if (ratio < 0.34) return 'h1';
  if (ratio < 0.67) return 'h2';
  if (ratio < 1) return 'h3';
  return 'h4';
}

function ringSvg(size, stroke, ratio, color = 'var(--accent)', track = 'var(--surface-2)') {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(1, ratio || 0)));
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="${stroke}"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
      stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" style="transition: stroke-dashoffset .5s ease"/>
  </svg>`;
}

// ---------- Hojas inferiores ----------

const stack = [];

/**
 * Abre una hoja inferior. `render(body, api)` dibuja su contenido.
 * Devuelve { close, rerender, el }.
 */
function openSheet({ title, render, full = false, onClose }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'sheet-backdrop';
  const sheet = document.createElement('section');
  sheet.className = 'sheet' + (full ? ' full' : '');
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.innerHTML = `
    <div class="sheet-grip"></div>
    <div class="sheet-head">
      <h2>${esc(title)}</h2>
      <button class="icon-btn" data-close aria-label="Cerrar">${icons.x}</button>
    </div>
    <div class="sheet-body"></div>`;
  document.body.append(backdrop, sheet);
  document.body.classList.add('sheet-open');
  const body = sheet.querySelector('.sheet-body');

  let closed = false;
  const api = {
    el: sheet,
    body,
    setTitle(t) { sheet.querySelector('.sheet-head h2').textContent = t; },
    rerender() {
      const y = body.scrollTop;
      render(body, api);
      body.scrollTop = y;
    },
    close() {
      if (closed) return;
      closed = true;
      sheet.classList.remove('show');
      backdrop.classList.remove('show');
      const i = stack.indexOf(api);
      if (i >= 0) stack.splice(i, 1);
      if (!stack.length) document.body.classList.remove('sheet-open');
      setTimeout(() => { sheet.remove(); backdrop.remove(); }, 350);
      onClose && onClose();
    },
  };
  stack.push(api);

  backdrop.addEventListener('click', api.close);
  sheet.querySelector('[data-close]').addEventListener('click', api.close);
  enableSwipeToClose(sheet, body, api.close);

  render(body, api);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { sheet.classList.add('show'); backdrop.classList.add('show'); });
  });
  return api;
}

function closeAllSheets() {
  [...stack].forEach((s) => s.close());
}

function enableSwipeToClose(sheet, body, close) {
  let startY = 0;
  let dy = 0;
  let dragging = false;
  const onStart = (e) => {
    const fromHandle = e.target.closest('.sheet-grip, .sheet-head');
    if (!fromHandle && body.scrollTop > 0) return;
    if (e.target.closest('input, textarea, select, .bars-scroll')) return;
    startY = e.touches[0].clientY;
    dy = 0;
    dragging = true;
    sheet.style.transition = 'none';
  };
  const onMove = (e) => {
    if (!dragging) return;
    dy = e.touches[0].clientY - startY;
    if (dy < 0) { dy = 0; }
    if (dy > 0 && body.scrollTop <= 0) {
      sheet.style.transform = `translateY(${dy}px)`;
      if (e.cancelable) e.preventDefault();
    }
  };
  const onEnd = () => {
    if (!dragging) return;
    dragging = false;
    sheet.style.transition = '';
    sheet.style.transform = '';
    if (dy > 110) close();
  };
  sheet.addEventListener('touchstart', onStart, { passive: true });
  sheet.addEventListener('touchmove', onMove, { passive: false });
  sheet.addEventListener('touchend', onEnd);
  sheet.addEventListener('touchcancel', onEnd);
}

// ---------- Aviso ----------

let toastTimer;
function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.append(el);
  }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
}

// ---------- Confeti ----------

function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti';
  document.body.append(canvas);
  const dpr = window.devicePixelRatio || 1;
  const W = innerWidth, H = innerHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const colors = ['#5b5bd6', '#8a6cf0', '#f2c46a', '#1f9d63', '#ff7a90', '#5ec8f2'];
  const parts = Array.from({ length: 140 }, () => ({
    x: W / 2 + (Math.random() - 0.5) * 80,
    y: H * 0.35,
    vx: (Math.random() - 0.5) * 13,
    vy: -Math.random() * 13 - 4,
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 8,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.35,
    c: colors[(Math.random() * colors.length) | 0],
  }));
  const t0 = performance.now();
  const frame = (t) => {
    const el = t - t0;
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.vy += 0.32; p.vx *= 0.99;
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(0, 1 - el / 2600);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2)));
      ctx.restore();
    }
    if (el < 2600) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}

function confirmDialog(message) {
  // confirm() nativo: en iOS se muestra como alerta del sistema, coherente con la plataforma
  return window.confirm(message);
}

return { applyTheme, esc, icons, MOODS, moodFor, fmtPts, pct, heatClass, ringSvg, openSheet, closeAllSheets, toast, confetti, confirmDialog };
})();
// ---- stats.js ----
__m['stats.js'] = (function () {
// Cálculo de estadísticas: cumplimiento, rachas, ánimo y series para gráficos.

const { getState, plannedIds, plannedGoals, getLog, goalPoints, goalProgress, GOSPEL_BONUS, isFlex } = __m['store.js'];
const { todayKey, addDays, eachDay, minKey, maxKey, startOfMonth, endOfMonth, startOfYear, endOfYear, addMonths, fromKey, startOfWeek, } = __m['dates.js'];

/**
 * Estadísticas de un día. Ponderadas por prioridad: ratio = puntos conseguidos / puntos previstos.
 * scope (opcional): { facetId } para limitarlo a una faceta ('__none' = sin faceta).
 *   planned / done   -> nº de objetivos previstos / completados del todo
 *   pts / ptsDone    -> puntos previstos / conseguidos (los de cantidad suman la parte hecha)
 *   bonus            -> punto extra por leer el Evangelio (solo sin filtro de faceta). Suma a ptsDone
 *                       pero no a pts: nunca penaliza y puede compensar algún fallo (el % se limita a 100).
 */
function dayStats(key, scope = null) {
  let goals = plannedGoals(key);
  if (scope && scope.facetId) {
    goals = goals.filter((g) => (scope.facetId === '__none' ? !g.facetId : g.facetId === scope.facetId));
  }
  const log = getLog(key);
  let done = 0, pts = 0, ptsDone = 0;
  for (const g of goals) {
    const f = goalProgress(g, (log.done || {})[g.id]);
    const w = goalPoints(g);
    pts += w;
    ptsDone += w * f;
    if (f >= 1) done++;
  }
  // Objetivos flexibles hechos ese día: sus puntos suman como extra (no entran en los previstos,
  // así que no hacerlos nunca penaliza el día). Respetan el filtro de faceta.
  const plannedSet = new Set(goals.map((g) => g.id));
  let flexPts = 0, flexDone = 0;
  for (const g of getState().goals) {
    if (!isFlex(g) || plannedSet.has(g.id)) continue;
    const v = (log.done || {})[g.id];
    if (!v) continue;
    if (scope && scope.facetId && (scope.facetId === '__none' ? g.facetId : g.facetId !== scope.facetId)) continue;
    const f = goalProgress(g, v);
    flexPts += goalPoints(g) * f;
    if (f >= 1) flexDone++;
  }
  const gospel = !scope && log.gospelRead ? GOSPEL_BONUS : 0;
  const bonus = gospel + flexPts;
  ptsDone += bonus;
  return {
    key,
    planned: goals.length,
    done,
    pts,
    ptsDone,
    bonus,
    flexPts,
    flexDone,
    ratio: pts ? Math.min(1, ptsDone / pts) : null,
    mood: log.mood || null,
    gospelRead: !!log.gospelRead,
  };
}

function isAchieved(ds, threshold = getState().settings.threshold) {
  return ds.pts > 0 && ds.ratio >= threshold - 1e-9;
}

/** Estadísticas agregadas en un rango (recortado a [inicio, hoy]). */
function rangeStats(from, to, scope = null) {
  const s = getState();
  const today = todayKey();
  const start = maxKey(from, s.startDate);
  const end = minKey(to, today);
  const out = {
    from: start, to: end, days: 0, trackedDays: 0, planned: 0, done: 0, pts: 0, ptsDone: 0, bonus: 0,
    perfectDays: 0, achievedDays: 0, moodSum: 0, moodCount: 0,
    moodDist: [0, 0, 0, 0, 0], gospelDays: 0, rate: null, moodAvg: null,
    // relación ánimo / cumplimiento
    moodOnGood: { sum: 0, n: 0 }, moodOnBad: { sum: 0, n: 0 },
  };
  if (start > end) return out;
  for (const k of eachDay(start, end)) {
    const ds = dayStats(k, scope);
    out.days++;
    // Hoy solo cuenta si ya se ha hecho algo (para no penalizar un día en curso)
    const countToday = k !== today || ds.ptsDone > 0;
    if (ds.planned > 0 && countToday) {
      out.trackedDays++;
      out.planned += ds.planned;
      out.done += ds.done;
      out.pts += ds.pts;
      out.ptsDone += ds.ptsDone;
      out.bonus += ds.bonus;
      if (ds.done === ds.planned) out.perfectDays++;
      if (isAchieved(ds)) out.achievedDays++;
    } else if (ds.bonus) {
      // día sin objetivos pero con el Evangelio leído: el punto extra cuenta igual
      out.ptsDone += ds.bonus;
      out.bonus += ds.bonus;
    }
    if (ds.mood) {
      out.moodSum += ds.mood;
      out.moodCount++;
      out.moodDist[ds.mood - 1]++;
      if (ds.planned > 0) {
        const bucket = isAchieved(ds) ? out.moodOnGood : out.moodOnBad;
        bucket.sum += ds.mood;
        bucket.n++;
      }
    }
    if (ds.gospelRead) out.gospelDays++;
  }
  out.rate = out.pts ? Math.min(1, out.ptsDone / out.pts) : null;
  out.moodAvg = out.moodCount ? out.moodSum / out.moodCount : null;
  return out;
}

/** Racha actual de días "cumplidos" (según el umbral). Hoy cuenta si ya está cumplido. */
function currentStreak() {
  const s = getState();
  const today = todayKey();
  let k = today;
  const t = dayStats(today);
  if (!isAchieved(t)) k = addDays(today, -1);
  let streak = 0;
  let guard = 0;
  while (k >= s.startDate && guard < 5000) {
    const ds = dayStats(k);
    if (ds.planned === 0) { k = addDays(k, -1); guard++; continue; } // días sin objetivos no rompen la racha
    if (!isAchieved(ds)) break;
    streak++;
    k = addDays(k, -1);
    guard++;
  }
  return streak;
}

function bestStreak() {
  const s = getState();
  const today = todayKey();
  let best = 0;
  let run = 0;
  for (const k of eachDay(s.startDate, today)) {
    const ds = dayStats(k);
    if (ds.planned === 0) continue;
    if (isAchieved(ds)) { run++; best = Math.max(best, run); }
    else if (k !== today) run = 0;
  }
  return best;
}

/** Rango según el periodo seleccionado y la fecha de referencia. */
function periodRange(period, ref = todayKey()) {
  const s = getState();
  if (period === 'month') return { from: startOfMonth(ref), to: endOfMonth(ref) };
  if (period === 'year') return { from: startOfYear(ref), to: endOfYear(ref) };
  return { from: s.startDate, to: todayKey() };
}

/** En "Total", a partir de año y medio de uso los gráficos se agrupan por años en vez de por meses. */
function totalByYear() {
  const s = getState();
  return (fromKey(todayKey()) - fromKey(s.startDate)) / 86400000 >= 548;
}

/** Serie de barras para el gráfico del periodo. */
function periodSeries(period, ref = todayKey()) {
  const today = todayKey();
  const s = getState();
  if (period === 'month') {
    const from = startOfMonth(ref);
    const to = endOfMonth(ref);
    const out = [];
    for (const k of eachDay(from, to)) {
      const ds = dayStats(k);
      const valid = k >= s.startDate && k <= today && ds.planned > 0;
      out.push({ key: k, label: String(fromKey(k).getDate()), value: valid ? ds.ratio : null, mood: ds.mood, future: k > today });
    }
    return out;
  }
  // total con más de año y medio de uso: por años
  if (period === 'total' && totalByYear()) {
    const out = [];
    for (let y = Number(s.startDate.slice(0, 4)); y <= Number(today.slice(0, 4)); y++) {
      const r = rangeStats(`${y}-01-01`, `${y}-12-31`);
      out.push({ key: `${y}-01-01`, label: String(y), title: String(y), value: r.rate, mood: r.moodAvg, future: false, year: true });
    }
    return out;
  }
  // año o total: por meses
  let from, to;
  if (period === 'year') { from = startOfYear(ref); to = endOfYear(ref); }
  else { from = startOfMonth(s.startDate); to = startOfMonth(today); }
  const out = [];
  let m = startOfMonth(from);
  let guard = 0;
  while (m <= to && guard < 600) {
    const r = rangeStats(m, endOfMonth(m));
    const d = fromKey(m);
    out.push({
      key: m,
      label: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][d.getMonth()],
      value: r.rate,
      mood: r.moodAvg,
      future: m > today,
    });
    m = addMonths(m, 1);
    guard++;
  }
  return out;
}

/** Cumplimiento por objetivo en un rango. */
function goalStats(from, to) {
  const s = getState();
  const today = todayKey();
  const start = maxKey(from, s.startDate);
  const end = minKey(to, today);
  const map = new Map();
  if (start > end) return [];
  for (const k of eachDay(start, end)) {
    const ids = plannedIds(k);
    const log = getLog(k);
    for (const id of ids) {
      const done = !!(log.done && log.done[id]);
      if (k === today && !done) continue; // el día en curso no penaliza
      const e = map.get(id) || { planned: 0, done: 0 };
      e.planned++;
      if (done) e.done++;
      map.set(id, e);
    }
  }
  const byId = new Map(s.goals.map((g) => [g.id, g]));
  return [...map.entries()]
    .map(([id, e]) => ({ goal: byId.get(id), ...e, rate: e.planned ? e.done / e.planned : 0 }))
    .filter((x) => x.goal)
    .sort((a, b) => b.rate - a.rate || b.done - a.done);
}

// ---------- Por objetivo ----------

/** Estado de un objetivo en un día: 'done' | 'partial' | 'missed' | 'pending' | 'off' | 'future' */
function goalDayStatus(goalId, key) {
  const today = todayKey();
  if (key < getState().startDate) return 'off';
  const goal = getState().goals.find((g) => g.id === goalId);
  if (!plannedIds(key).includes(goalId)) {
    // Flexible: solo se distingue si se hizo ese día; si no, "no tocaba" (nunca "no cumplido")
    if (!isFlex(goal) || key > today) return 'off';
    const f = goalProgress(goal, (getLog(key).done || {})[goalId]);
    return f >= 1 ? 'done' : f > 0 ? 'partial' : 'off';
  }
  const f = goalProgress(goal, (getLog(key).done || {})[goalId]);
  if (f >= 1) return 'done';
  if (key > today) return 'future';
  if (f > 0) return 'partial';
  if (key === today) return 'pending';
  return 'missed';
}

/** done = días completados del todo; rate = media de lo cumplido (cuenta las cantidades parciales). */
function goalRangeStats(goalId, from, to) {
  const today = todayKey();
  const start = maxKey(from, getState().startDate);
  const end = minKey(to, today);
  const goal = getState().goals.find((g) => g.id === goalId);
  if (isFlex(goal)) return flexRangeStats(goal, from, to);
  let planned = 0, done = 0, frac = 0;
  if (start <= end) {
    for (const k of eachDay(start, end)) {
      const st = goalDayStatus(goalId, k);
      if (st === 'off' || st === 'future' || st === 'pending') continue;
      planned++;
      const f = goalProgress(goal, (getLog(k).done || {})[goalId]);
      frac += f;
      if (f >= 1) done++;
    }
  }
  return { planned, done, frac, rate: planned ? frac / planned : null };
}

/** Cumplimiento (ponderado) de cada faceta en un rango, para la "rueda de tu vida". */
function facetStats(from, to) {
  const s = getState();
  const out = s.facets.slice().sort((a, b) => a.order - b.order)
    .map((f) => ({ facet: f, ...rangeStats(from, to, { facetId: f.id }) }));
  if (s.goals.some((g) => !g.facetId)) {
    const r = rangeStats(from, to, { facetId: '__none' });
    if (r.pts) out.push({ facet: { id: '__none', name: 'Sin faceta', emoji: '📌', color: '#94a3b8' }, ...r });
  }
  return out;
}

function goalStreak(goalId) {
  const s = getState();
  const goal = s.goals.find((g) => g.id === goalId);
  if (isFlex(goal)) return flexStreaks(goal).current;
  let k = todayKey();
  if (goalDayStatus(goalId, k) !== 'done') k = addDays(k, -1);
  let n = 0, guard = 0;
  while (k >= s.startDate && guard++ < 5000) {
    const st = goalDayStatus(goalId, k);
    if (st === 'done') n++;
    else if (st !== 'off' && st !== 'pending') break;
    k = addDays(k, -1);
  }
  return n;
}

function goalBestStreak(goalId) {
  const s = getState();
  const goal = s.goals.find((g) => g.id === goalId);
  if (isFlex(goal)) return flexStreaks(goal).best;
  let best = 0, run = 0;
  for (const k of eachDay(s.startDate, todayKey())) {
    const st = goalDayStatus(goalId, k);
    if (st === 'done') { run++; best = Math.max(best, run); }
    else if (st === 'missed' || st === 'partial') run = 0;
  }
  return best;
}

/** Serie de ánimo: diaria en el mes, media mensual en año/total. */
function moodSeries(period, ref = todayKey()) {
  if (period === 'month') {
    return [...eachDay(startOfMonth(ref), endOfMonth(ref))].map((k) => ({
      key: k, label: String(fromKey(k).getDate()), value: getLog(k).mood || null,
    }));
  }
  return periodSeries(period, ref).map((p) => ({ key: p.key, label: p.label, value: p.mood }));
}

// ---------- Objetivos flexibles (semanales, mensuales y libres) ----------

/** Semana (lunes-domingo) o mes que contiene la fecha. */
function flexPeriod(goal, key) {
  if (goal.schedule.every === 'week') {
    const from = startOfWeek(key);
    return { from, to: addDays(from, 6) };
  }
  return { from: startOfMonth(key), to: endOfMonth(key) };
}

/** Veces hechas en un rango (los de cantidad suman la parte hecha: dos mitades = 1 vez). */
function flexCount(goal, from, to) {
  const start = maxKey(from, getState().startDate);
  const end = minKey(to, todayKey());
  let n = 0;
  if (start > end) return 0;
  for (const k of eachDay(start, end)) {
    const v = (getLog(k).done || {})[goal.id];
    if (v) n += goalProgress(goal, v);
  }
  return n;
}

/** Progreso en la semana/mes actual: { count, times, every } (para "2/3 esta semana"). */
function flexNow(goal, key = todayKey()) {
  const { every, times } = goal.schedule;
  if (!every) {
    const m = { from: startOfMonth(key), to: endOfMonth(key) };
    return { count: flexCount(goal, m.from, m.to), times: null, every: null };
  }
  const p = flexPeriod(goal, key);
  return { count: flexCount(goal, p.from, p.to), times, every };
}

/** Semanas/meses que "cuentan" para un rango: los que terminan dentro de él (y el actual solo si ya está cumplido). */
function flexPeriodsIn(goal, from, to) {
  const s = getState();
  const today = todayKey();
  const begin = maxKey(maxKey(from, s.startDate), goal.createdAt || s.startDate);
  const out = [];
  if (begin > minKey(to, today)) return out;
  let p = flexPeriod(goal, begin);
  let guard = 0;
  while (p.from <= minKey(to, today) && guard++ < 2000) {
    if (goal.archivedAt && p.from >= goal.archivedAt) break;
    const ends = p.to;
    // Cada periodo cuenta en el rango donde termina; el periodo en curso, en el rango que contiene hoy
    const isCurrent = p.from <= today && today <= p.to;
    if (ends >= from && (ends <= to || (isCurrent && today >= from && today <= to))) {
      const count = flexCount(goal, p.from, p.to);
      const met = count >= goal.schedule.times - 1e-9;
      const finished = ends < today;
      // La primera semana/mes, si el objetivo se creó a mitad, solo cuenta si se llegó a cumplir
      const partialStart = p.from < maxKey(s.startDate, goal.createdAt || s.startDate);
      if ((finished || met) && (!partialStart || met)) out.push({ ...p, count, met });
    }
    p = flexPeriod(goal, addDays(p.to, 1));
  }
  return out;
}

/**
 * Estadísticas de un objetivo flexible en un rango, con los mismos campos que goalRangeStats.
 *  - Semanal/mensual: rate = semanas (o meses) cumplidos / semanas (o meses) que cuentan;
 *    planned = veces previstas en esos periodos; done = veces hechas (sin pasar de la meta de cada periodo).
 *  - Libre: no hay meta (rate = null); count = veces hechas.
 * Siempre: count (veces) y pts (puntos sumados como extra).
 */
function flexRangeStats(goal, from, to) {
  const count = flexCount(goal, from, to);
  const pts = count * goalPoints(goal);
  const base = { flex: true, every: goal.schedule.every, count, pts };
  if (!goal.schedule.every) return { ...base, planned: 0, done: count, frac: count, rate: null, periods: 0, periodsMet: 0 };
  const periods = flexPeriodsIn(goal, from, to);
  const times = goal.schedule.times;
  const met = periods.filter((p) => p.met).length;
  const done = periods.reduce((a, p) => a + Math.min(times, p.count), 0);
  return {
    ...base,
    planned: periods.length * times,
    done,
    frac: done,
    rate: periods.length ? met / periods.length : null,
    periods: periods.length,
    periodsMet: met,
  };
}

/** Racha de semanas/meses seguidos cumplidos (la actual cuenta si ya está cumplida). Los libres no tienen racha. */
function flexStreaks(goal) {
  if (!goal.schedule.every) return { current: 0, best: 0 };
  const periods = flexPeriodsIn(goal, getState().startDate, todayKey());
  let best = 0, run = 0;
  for (const p of periods) { run = p.met ? run + 1 : 0; best = Math.max(best, run); }
  let current = 0;
  for (let i = periods.length - 1; i >= 0 && periods[i].met; i--) current++;
  return { current, best };
}

return { dayStats, isAchieved, rangeStats, currentStreak, bestStreak, periodRange, totalByYear, periodSeries, goalStats, goalDayStatus, goalRangeStats, facetStats, goalStreak, goalBestStreak, moodSeries, flexPeriod, flexCount, flexNow, flexRangeStats };
})();
// ---- crypto.js ----
__m['crypto.js'] = (function () {
// Cifrado de copias de seguridad con contraseña (frase de paso).
//
// Por qué: la copia se guarda en iCloud Drive / Archivos, fuera de la app. Si está cifrada,
// quien acceda a ese archivo (otra persona, una cuenta comprometida…) no puede leer tu diario.
//
// Cómo: WebCrypto del propio navegador, sin librerías externas.
//   - Clave: PBKDF2-SHA256 con 600 000 iteraciones y sal aleatoria de 16 bytes
//     (hace muy lento probar contraseñas a ciegas).
//   - Cifrado: AES-256-GCM con IV aleatorio de 12 bytes. GCM detecta cualquier
//     modificación del archivo: si alguien lo altera, no se puede abrir.
// Es el mismo esquema que usa Roney, así que las tres apps se comportan igual.
// Sin la contraseña NO hay forma de recuperar la copia.

const ENC_FORMAT = 'godpole-encrypted-v1';
const ITERATIONS = 600000;
const MIN_PASSPHRASE = 8;

const te = new TextEncoder();
const td = new TextDecoder();

function cryptoAvailable() {
  // WebCrypto solo existe en contextos seguros (https o localhost), no al abrir el archivo con doble clic.
  return !!(globalThis.crypto && crypto.subtle && globalThis.isSecureContext !== false);
}

function b64(bytes) {
  let s = '';
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i += 0x8000) s += String.fromCharCode.apply(null, arr.subarray(i, i + 0x8000));
  return btoa(s);
}

function unb64(str) {
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(passphrase, salt, iterations) {
  const base = await crypto.subtle.importKey('raw', te.encode(passphrase.normalize('NFC')), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

function passphraseProblem(p) {
  if (!p || p.length < MIN_PASSPHRASE) return `La contraseña debe tener al menos ${MIN_PASSPHRASE} caracteres.`;
  return null;
}

/** Devuelve el texto JSON del archivo cifrado. */
async function encryptText(plainText, passphrase, app) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt, ITERATIONS);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, te.encode(plainText));
  return JSON.stringify({
    _app: app,
    _format: ENC_FORMAT,
    _exportedAt: new Date().toISOString(),
    v: 1,
    kdf: 'PBKDF2-SHA256',
    iter: ITERATIONS,
    salt: b64(salt),
    iv: b64(iv),
    ct: b64(ct),
  });
}

function isEncrypted(obj) {
  return !!(obj && obj._format === ENC_FORMAT);
}

/** Descifra el sobre; lanza un error comprensible si la contraseña no es la correcta. */
async function decryptEnvelope(env, passphrase) {
  if (!isEncrypted(env) || env.kdf !== 'PBKDF2-SHA256' || typeof env.salt !== 'string' || typeof env.iv !== 'string' || typeof env.ct !== 'string') {
    throw new Error('El archivo cifrado está incompleto o dañado.');
  }
  const iter = Number(env.iter);
  // Límites razonables: evita archivos manipulados que bloqueen el móvil con millones de iteraciones
  if (!Number.isInteger(iter) || iter < 100000 || iter > 5000000) throw new Error('El archivo cifrado tiene parámetros no válidos.');
  const key = await deriveKey(passphrase, unb64(env.salt), iter);
  try {
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(env.iv) }, key, unb64(env.ct));
    return td.decode(pt);
  } catch {
    throw new Error('Contraseña incorrecta o archivo modificado.');
  }
}

return { ENC_FORMAT, MIN_PASSPHRASE, cryptoAvailable, passphraseProblem, encryptText, isEncrypted, decryptEnvelope };
})();
// ---- charts.js ----
__m['charts.js'] = (function () {
// Gráficos SVG (sin librerías). Todos usan variables CSS para adaptarse a modo claro/oscuro.

const { esc, MOODS } = __m['ui.js'];

const W = 340;

function labelEvery(n) {
  if (n <= 12) return 1;
  return 5;
}

function showLabel(i, n, every) {
  if (every === 1) return true;
  const day = i + 1;
  return day === 1 || day % every === 0;
}

/**
 * Diagrama de barras de cumplimiento.
 * items: [{ label, value: 0..1 | null, today?: bool, future?: bool }]
 */
function barChart(items, { threshold = 0.8, height = 180, points = false } = {}) {
  // points: los valores son puntos; se escalan respecto al máximo y no hay umbral
  const maxPts = points ? Math.max(1, ...items.map((it) => it.value || 0)) : 1;
  if (points) items = items.map((it) => ({ ...it, pts: it.value, value: it.value == null ? null : it.value / maxPts }));
  const n = items.length || 1;
  const left = 30, right = 4, top = 14, bottom = 26;
  const pw = W - left - right;
  const ph = height - top - bottom;
  const slot = pw / n;
  const bw = Math.max(2, Math.min(n <= 3 ? 44 : 28, slot * (n > 12 ? 0.62 : 0.56)));
  const every = labelEvery(n);
  const y = (v) => top + ph * (1 - v);

  let g = '';
  // rejilla
  for (const v of [0, 0.5, 1]) {
    g += `<line x1="${left}" x2="${W - right}" y1="${y(v)}" y2="${y(v)}" stroke="var(--grid)" stroke-width="1"/>`;
    const lbl = points ? Math.round(v * maxPts) : `${Math.round(v * 100)}${v === 1 ? '%' : ''}`;
    g += `<text x="${left - 6}" y="${y(v) + 3.5}" text-anchor="end" class="ax">${lbl}</text>`;
  }
  // umbral (solo en %)
  if (!points) g += `<line x1="${left}" x2="${W - right}" y1="${y(threshold)}" y2="${y(threshold)}" stroke="var(--gold)" stroke-width="1.2" stroke-dasharray="4 4" opacity=".9"/>`;

  items.forEach((it, i) => {
    const cx = left + slot * i + slot / 2;
    if (it.today) {
      const hw = Math.min(slot, Math.max(bw * 1.9, 12)); // franja de "hoy" del tamaño de la barra, no de todo el hueco
      g += `<rect x="${cx - hw / 2}" y="${top - 6}" width="${hw}" height="${ph + 6}" rx="6" fill="var(--accent-soft)"/>`;
    }
    if (it.value == null) {
      if (!it.future) g += `<rect x="${cx - bw / 2}" y="${y(0) - 2}" width="${bw}" height="2" rx="1" fill="var(--surface-3)"/>`;
    } else {
      const h = Math.max(2, ph * it.value);
      const color = points ? 'var(--accent)' : it.value >= threshold - 1e-9 ? 'var(--success)' : 'var(--accent)';
      const txt = points ? String(Math.round(it.pts * 10) / 10).replace('.', ',') : String(Math.round(it.value * 100));
      g += `<rect x="${cx - bw / 2}" y="${y(0) - h}" width="${bw}" height="${h}" rx="${Math.min(4, bw / 2)}" fill="${color}">
        <title>${esc(it.title || it.label)}: ${txt}${points ? ' pts' : '%'}</title></rect>`;
      if (n <= 12) g += `<text x="${cx}" y="${y(0) - h - 4}" text-anchor="middle" class="val">${txt}</text>`;
    }
    if (showLabel(i, n, every)) {
      g += `<text x="${cx}" y="${height - 8}" text-anchor="middle" class="ax ${it.today ? 'ax-today' : ''}">${esc(it.label)}</text>`;
    }
  });

  return `<svg class="chart" viewBox="0 0 ${W} ${height}" role="img" aria-label="Diagrama de barras de cumplimiento">${g}</svg>`;
}

/**
 * Matriz de objetivos (gráfico de puntos): una fila por objetivo y una columna por día.
 * rows: [{ emoji, title, cells: ['done'|'missed'|'pending'|'off'|'future'|'none'] }]
 * cols: [{ label, today?: bool }]
 */
function dotMatrix(rows, cols) {
  const n = cols.length || 1;
  const left = 30, right = 4, top = 20, rowH = 24;
  const pw = W - left - right;
  const slot = pw / n;
  const r = Math.min(5, slot * 0.38);
  const height = top + rows.length * rowH + 4;
  const every = labelEvery(n);

  let g = '';
  cols.forEach((c, i) => {
    const cx = left + slot * i + slot / 2;
    if (c.today) g += `<rect x="${left + slot * i}" y="2" width="${slot}" height="${height - 4}" rx="4" fill="var(--accent-soft)"/>`;
    if (showLabel(i, n, every)) g += `<text x="${cx}" y="12" text-anchor="middle" class="ax ${c.today ? 'ax-today' : ''}">${esc(c.label)}</text>`;
  });
  rows.forEach((row, ri) => {
    const cy = top + ri * rowH + rowH / 2;
    if (ri > 0) g += `<line x1="${left}" x2="${W - right}" y1="${top + ri * rowH}" y2="${top + ri * rowH}" stroke="var(--grid)" stroke-width="1"/>`;
    g += `<text x="2" y="${cy + 5}" class="emo"><title>${esc(row.title)}</title>${esc(row.emoji)}</text>`;
    row.cells.forEach((st, i) => {
      const cx = left + slot * i + slot / 2;
      const tip = `<title>${esc(row.title)} · ${esc(cols[i].title || cols[i].label)}: ${STATUS_TEXT[st] || ''}</title>`;
      if (st === 'done') g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--success)">${tip}</circle>`;
      else if (st === 'missed') g += `<circle cx="${cx}" cy="${cy}" r="${r - 0.7}" fill="var(--miss-soft)" stroke="var(--miss)" stroke-width="1.4">${tip}</circle>`;
      else if (st === 'pending') g += `<circle cx="${cx}" cy="${cy}" r="${r - 0.7}" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="2 1.6">${tip}</circle>`;
      else if (st === 'future') g += `<circle cx="${cx}" cy="${cy}" r="${r - 1}" fill="none" stroke="var(--surface-3)" stroke-width="1.2"/>`;
      else if (st === 'off') g += `<circle cx="${cx}" cy="${cy}" r="1.3" fill="var(--surface-3)"/>`;
    });
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${height}" role="img" aria-label="Matriz de cumplimiento por objetivo">${g}</svg>`;
}

const STATUS_TEXT = { done: 'cumplido', missed: 'no cumplido', pending: 'pendiente', off: 'no tocaba', future: 'próximamente' };

/**
 * Matriz por meses (año/total): cada celda muestra el % de cumplimiento del objetivo ese mes.
 * rows: [{ emoji, title, values: [0..1|null] }], cols: [{ label }]
 */
function heatMatrix(rows, cols) {
  const n = cols.length || 1;
  const left = 30, right = 4, top = 20, rowH = 26;
  const pw = W - left - right;
  const slot = pw / n;
  const height = top + rows.length * rowH + 4;
  let g = '';
  cols.forEach((c, i) => {
    g += `<text x="${left + slot * i + slot / 2}" y="12" text-anchor="middle" class="ax">${esc(c.label)}</text>`;
  });
  rows.forEach((row, ri) => {
    const y0 = top + ri * rowH;
    g += `<text x="2" y="${y0 + rowH / 2 + 5}" class="emo"><title>${esc(row.title)}</title>${esc(row.emoji)}</text>`;
    row.values.forEach((v, i) => {
      const x = left + slot * i + 1.5;
      const w = slot - 3;
      if (v == null) {
        g += `<rect x="${x}" y="${y0 + 3}" width="${w}" height="${rowH - 6}" rx="5" fill="var(--surface-2)"/>`;
      } else {
        const op = 0.18 + v * 0.82;
        g += `<rect x="${x}" y="${y0 + 3}" width="${w}" height="${rowH - 6}" rx="5" fill="var(--accent)" opacity="${op.toFixed(2)}"><title>${esc(row.title)} · ${esc(cols[i].label)}: ${Math.round(v * 100)}%</title></rect>`;
        if (w >= 20) g += `<text x="${x + w / 2}" y="${y0 + rowH / 2 + 3.5}" text-anchor="middle" class="cell ${v > 0.55 ? 'on' : ''}">${Math.round(v * 100)}</text>`;
      }
    });
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${height}" role="img" aria-label="Cumplimiento mensual por objetivo">${g}</svg>`;
}

/**
 * Evolución del ánimo (1-5). points: [{ label, value: 1..5 | null, today?: bool }]
 */
function moodChart(points, { height = 170 } = {}) {
  const n = points.length || 1;
  const left = 30, right = 8, top = 12, bottom = 26;
  const pw = W - left - right;
  const ph = height - top - bottom;
  const slot = pw / n;
  const every = labelEvery(n);
  const y = (v) => top + ph * (1 - (v - 1) / 4);
  let g = '';
  for (const m of MOODS) {
    g += `<line x1="${left}" x2="${W - right}" y1="${y(m.v)}" y2="${y(m.v)}" stroke="var(--grid)" stroke-width="1"/>`;
    g += `<text x="2" y="${y(m.v) + 5}" class="emo-sm">${m.emoji}</text>`;
  }
  const pts = points
    .map((p, i) => (p.value == null ? null : { x: left + slot * i + slot / 2, y: y(p.value), v: p.value, p }))
    .filter(Boolean);
  if (pts.length > 1) {
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const area = `${d} L${pts[pts.length - 1].x.toFixed(1)},${y(1)} L${pts[0].x.toFixed(1)},${y(1)} Z`;
    g += `<path d="${area}" fill="url(#moodGrad)" opacity=".5"/>`;
    g += `<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  for (const p of pts) {
    const m = MOODS[Math.min(4, Math.max(0, Math.round(p.v) - 1))];
    g += `<circle cx="${p.x}" cy="${p.y}" r="${n > 12 ? 3.4 : 4.5}" fill="${m.color}" stroke="var(--surface)" stroke-width="1.5"><title>${esc(p.p.label)}: ${p.v.toFixed(1)}</title></circle>`;
  }
  points.forEach((p, i) => {
    if (showLabel(i, n, every)) {
      g += `<text x="${left + slot * i + slot / 2}" y="${height - 8}" text-anchor="middle" class="ax ${p.today ? 'ax-today' : ''}">${esc(p.label)}</text>`;
    }
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${height}" role="img" aria-label="Evolución del estado de ánimo">
    <defs><linearGradient id="moodGrad" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="var(--accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/>
    </linearGradient></defs>${g}</svg>`;
}

// ---------------------------------------------------------------------------
// Gráfico de línea estilo "bolsa": curva suave, área degradada, línea de lo previsto
// y cursor interactivo (arrastra el dedo por el gráfico para ver cada valor).
// ---------------------------------------------------------------------------

/** Curva monótona (Fritsch–Carlson): suave pero sin "pasarse" de los valores reales. */
function monotonePath(pts) {
  const n = pts.length;
  if (n === 0) return '';
  if (n === 1) return `M${pts[0].x},${pts[0].y}`;
  const dx = [], dy = [], m = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1].x - pts[i].x);
    dy.push(pts[i + 1].y - pts[i].y);
    m.push(dy[i] / dx[i]);
  }
  const t = [m[0]];
  for (let i = 1; i < n - 1; i++) t.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2);
  t.push(m[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
    const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b;
    if (s > 9) { const k = 3 / Math.sqrt(s); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i]; }
  }
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += ` C${(pts[i].x + h).toFixed(1)},${(pts[i].y + t[i] * h).toFixed(1)} ${(pts[i + 1].x - h).toFixed(1)},${(pts[i + 1].y - t[i + 1] * h).toFixed(1)} ${pts[i + 1].x.toFixed(1)},${pts[i + 1].y.toFixed(1)}`;
  }
  return d;
}

function niceMax(v) {
  if (v <= 4) return Math.max(1, Math.ceil(v));
  const steps = [5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300, 400, 500, 600, 800, 1000];
  return steps.find((s) => s >= v) || Math.ceil(v / 100) * 100;
}

let lcId = 0;

/**
 * points: [{ label, title, value: number|null, planned: number|null }]
 * Devuelve HTML con el SVG; llama a bindLineCharts(root) después de insertarlo.
 */
function lineChart(points, {
  height = 200, unit = 'objetivos', color = 'var(--success)', max: fixedMax = null, threshold = null, suffix = '', selected = null,
} = {}) {
  const id = `lc${++lcId}`;
  const n = points.length || 1;
  const left = 28, right = 10, top = 16, bottom = 24;
  const pw = W - left - right;
  const ph = height - top - bottom;
  const max = fixedMax || niceMax(Math.max(1, ...points.map((p) => Math.max(p.value || 0, p.planned || 0))));
  const x = (i) => left + (n === 1 ? pw / 2 : (pw * i) / (n - 1));
  const y = (v) => top + ph * (1 - v / max);
  const every = n <= 12 ? 1 : n <= 31 ? 5 : Math.ceil(n / 8);

  let g = '';
  for (const v of [0, max / 2, max]) {
    g += `<line x1="${left}" x2="${W - right}" y1="${y(v)}" y2="${y(v)}" stroke="var(--grid)" stroke-width="1"/>`;
    g += `<text x="${left - 6}" y="${y(v) + 3.5}" text-anchor="end" class="ax">${Number.isInteger(v) ? v : v.toFixed(1)}${v === max ? suffix : ''}</text>`;
  }
  if (threshold != null) {
    g += `<line x1="${left}" x2="${W - right}" y1="${y(threshold)}" y2="${y(threshold)}" stroke="var(--gold)" stroke-width="1.2" stroke-dasharray="4 4" opacity=".9"/>`;
  }
  points.forEach((p, i) => {
    const show = n <= 12 || i === 0 || (i + 1) % every === 0;
    if (show) g += `<text x="${x(i)}" y="${height - 6}" text-anchor="middle" class="ax">${esc(p.label)}</text>`;
  });

  const real = points.map((p, i) => (p.value == null ? null : { x: x(i), y: y(p.value), i })).filter(Boolean);
  const plan = points.map((p, i) => (p.planned == null ? null : { x: x(i), y: y(p.planned) })).filter(Boolean);
  if (plan.length > 1) {
    g += `<path d="${monotonePath(plan)}" fill="none" stroke="var(--text-3)" stroke-width="1.4" stroke-dasharray="4 4" opacity=".7"/>`;
  }
  if (real.length) {
    const line = monotonePath(real);
    const last = real[real.length - 1];
    g += `<path d="${line} L${last.x.toFixed(1)},${y(0)} L${real[0].x.toFixed(1)},${y(0)} Z" fill="url(#${id}g)"/>`;
    g += `<path d="${line}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;
    g += `<circle cx="${last.x}" cy="${last.y}" r="9" fill="${color}" opacity=".18"/>`;
    g += `<circle cx="${last.x}" cy="${last.y}" r="4.5" fill="${color}" stroke="var(--surface)" stroke-width="2"/>`;
  }
  // cursor (oculto hasta que se toca el gráfico)
  g += `<g class="lc-cursor" style="display:none">
    <line class="lc-vline" y1="${top}" y2="${y(0)}" stroke="var(--text-3)" stroke-width="1" stroke-dasharray="2 3"/>
    <circle class="lc-pdot" r="4" fill="none" stroke="var(--text-3)" stroke-width="1.5"/>
    <circle class="lc-dot" r="5.5" fill="${color}" stroke="var(--surface)" stroke-width="2"/>
  </g>`;

  const data = points.map((p, i) => ({ x: +x(i).toFixed(1), y: p.value == null ? null : +y(p.value).toFixed(1), py: p.planned == null ? null : +y(p.planned).toFixed(1), v: p.value, p: p.planned, t: p.title || p.label }));
  return `<div class="lc" data-unit="${esc(unit)}" data-sel="${selected == null ? '' : selected}" data-points='${esc(JSON.stringify(data))}'>
    <div class="lc-tip" hidden></div>
    <svg class="chart" viewBox="0 0 ${W} ${height}" role="img" aria-label="Evolución de ${esc(unit)}">
      <defs><linearGradient id="${id}g" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".32"/><stop offset="1" stop-color="${color}" stop-opacity="0"/>
      </linearGradient></defs>${g}
    </svg>
  </div>`;
}

/**
 * Activa el cursor táctil de los gráficos de línea dentro de root.
 * onSelect(index) se llama cada vez que cambia el punto seleccionado (para mostrar su detalle).
 * El punto elegido queda marcado; la etiqueta flotante se oculta sola al soltar.
 */
function bindLineCharts(root, onSelect) {
  root.querySelectorAll('.lc').forEach((wrap) => {
    const pts = JSON.parse(wrap.dataset.points);
    const unit = wrap.dataset.unit;
    const svg = wrap.querySelector('svg');
    const cur = svg.querySelector('.lc-cursor');
    const tip = wrap.querySelector('.lc-tip');
    const fmt = (v) => (v == null ? '—' : Number.isInteger(v) ? v : v.toFixed(1).replace('.', ','));
    let last = -1;
    let tipTimer;
    const mark = (i, withTip) => {
      const p = pts[i];
      if (!p) return;
      cur.style.display = '';
      cur.querySelector('.lc-vline').setAttribute('x1', p.x);
      cur.querySelector('.lc-vline').setAttribute('x2', p.x);
      const dot = cur.querySelector('.lc-dot');
      const pdot = cur.querySelector('.lc-pdot');
      dot.style.display = p.y == null ? 'none' : '';
      if (p.y != null) { dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); }
      pdot.style.display = p.py == null ? 'none' : '';
      if (p.py != null) { pdot.setAttribute('cx', p.x); pdot.setAttribute('cy', p.py); }
      if (withTip) {
        const r = svg.getBoundingClientRect();
        tip.hidden = false;
        tip.innerHTML = `<b>${fmt(p.v)}</b> ${esc(unit)}${p.p != null ? ` <span>de ${fmt(p.p)} previstos</span>` : ''}<small>${esc(p.t)}</small>`;
        const px = (p.x / W) * r.width;
        tip.style.left = `${Math.min(Math.max(px, 70), r.width - 70)}px`;
      }
      if (i !== last) { last = i; onSelect && onSelect(i); }
    };
    const at = (clientX) => {
      const r = svg.getBoundingClientRect();
      const vx = ((clientX - r.left) / r.width) * W;
      let best = 0;
      pts.forEach((p, i) => { if (Math.abs(p.x - vx) < Math.abs(pts[best].x - vx)) best = i; });
      return best;
    };
    const hideTip = () => { tip.hidden = true; };
    svg.addEventListener('pointerdown', (e) => { clearTimeout(tipTimer); mark(at(e.clientX), true); });
    svg.addEventListener('pointermove', (e) => {
      // con ratón: solo si se mueve de verdad (al redibujar, el navegador genera movimientos "fantasma")
      const moved = e.pointerType !== 'mouse' || e.movementX || e.movementY;
      if ((e.pointerType === 'mouse' && moved) || e.buttons) { clearTimeout(tipTimer); mark(at(e.clientX), true); }
    });
    svg.addEventListener('pointerleave', () => { tipTimer = setTimeout(hideTip, 300); });
    svg.addEventListener('pointerup', () => { tipTimer = setTimeout(hideTip, 1500); });
    // selección inicial (normalmente el último punto con datos)
    if (wrap.dataset.sel !== '') { last = Number(wrap.dataset.sel); mark(last, false); }
  });
}

/**
 * Radar ("rueda de tu vida"). axes: [{ label, emoji, color, value: 0..1 }] (3 o más).
 */
function radarChart(axes) {
  const n = axes.length;
  const size = 300, cx = W / 2, cy = size / 2 + 4, R = 98;
  const ang = (i) => -Math.PI / 2 + (2 * Math.PI * i) / n;
  const pt = (i, r) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];
  let g = '';
  for (const lv of [0.25, 0.5, 0.75, 1]) {
    const poly = axes.map((_, i) => pt(i, R * lv).map((v) => v.toFixed(1)).join(',')).join(' ');
    g += `<polygon points="${poly}" fill="${lv === 1 ? 'var(--surface-2)' : 'none'}" fill-opacity="${lv === 1 ? 0.5 : 0}" stroke="var(--grid)" stroke-width="1"/>`;
  }
  axes.forEach((_, i) => {
    const [x, y] = pt(i, R);
    g += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--grid)" stroke-width="1"/>`;
  });
  const shape = axes.map((a, i) => pt(i, R * Math.max(0.04, Math.min(1, a.value))).map((v) => v.toFixed(1)).join(',')).join(' ');
  g += `<polygon points="${shape}" fill="var(--accent)" fill-opacity=".22" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/>`;
  axes.forEach((a, i) => {
    const [x, y] = pt(i, R * Math.max(0.04, Math.min(1, a.value)));
    g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${a.color}" stroke="var(--surface)" stroke-width="2"><title>${esc(a.label)}: ${a.text ?? `${Math.round(a.value * 100)}%`}</title></circle>`;
    const [lx, ly] = pt(i, R + 26);
    const anchor = Math.abs(lx - cx) < 8 ? 'middle' : lx > cx ? 'start' : 'end';
    g += `<text x="${lx.toFixed(1)}" y="${(ly - 2).toFixed(1)}" text-anchor="${anchor}" class="rd-lbl">${esc(a.emoji)} ${esc(a.label.length > 12 ? a.label.slice(0, 11) + '…' : a.label)}</text>`;
    g += `<text x="${lx.toFixed(1)}" y="${(ly + 12).toFixed(1)}" text-anchor="${anchor}" class="rd-val" fill="${a.color}">${a.text ?? `${Math.round(a.value * 100)}%`}</text>`;
  });
  return `<svg class="chart radar" viewBox="0 0 ${W} ${size + 8}" role="img" aria-label="Rueda de tu vida: cumplimiento por faceta">${g}</svg>`;
}

function legend(items) {
  return `<div class="chart-legend">${items.map(([cls, label]) => `<span><i class="lg ${cls}"></i>${esc(label)}</span>`).join('')}</div>`;
}

return { barChart, dotMatrix, heatMatrix, moodChart, lineChart, bindLineCharts, radarChart, legend };
})();
// ---- sheets.js ----
__m['sheets.js'] = (function () {
// Hojas (pantallas superpuestas): Evangelio, diario, objetivo, día, ajustes y frases.

const { getState, addGoal, updateGoal, archiveGoal, restoreGoal, deleteGoal, updateSettings, exportData, importData, resetAll, toggleGospelRead, getLog, setNote, setMood, toggleGoal, plannedGoals, addQuote, updateQuote, deleteQuote, restoreDefaultQuotes, PRIORITIES, FACET_COLORS, addFacet, updateFacet, deleteFacet, getFacet, isQuantity, goalProgress, setGoalAmount, priorityLabel, goalPoints, parseBackupText, summarizeBackup, markExported, isFlex, flexGoals, } = __m['store.js'];
const { cryptoAvailable, encryptText, decryptEnvelope, isEncrypted, passphraseProblem } = __m['crypto.js'];
const { todayKey, formatShort, formatLong, formatMonthYear, addMonths, startOfMonth, endOfMonth, eachDay, fromKey, WEEK_ORDER, WEEKDAY_SHORT, WEEKDAY_NAMES, capitalize, startOfYear, endOfYear, MONTH_SHORT, } = __m['dates.js'];
const { getGospel, getCachedGospel, SOURCES, testConnector, clearGospelCache, DEFAULT_CONNECTOR } = __m['gospel.js'];
const { goalDayStatus, goalRangeStats, goalStreak, goalBestStreak, flexNow } = __m['stats.js'];
const { barChart } = __m['charts.js'];
const { esc, icons, openSheet, toast, MOODS, moodFor, pct, confirmDialog, applyTheme, fmtPts } = __m['ui.js'];

// ======================================================================
// Utilidades
// ======================================================================

function times(n, one, many) {
  return n === 1 ? one : `${n} ${many}`;
}

function scheduleLabel(goal) {
  const s = goal.schedule || { type: 'daily' };
  if (s.type === 'flex') {
    if (s.every === 'week') return times(s.times, 'Una vez por semana', 'veces por semana');
    if (s.every === 'month') return times(s.times, 'Una vez al mes', 'veces al mes');
    return 'Libre · cuando quieras';
  }
  if (s.type === 'daily') return 'Todos los días';
  if (s.type === 'date') return `Solo el ${formatShort(s.date)}`;
  const days = WEEK_ORDER.filter((d) => (s.days || []).includes(d));
  if (days.length === 7) return 'Todos los días';
  if (days.length === 5 && !days.includes(0) && !days.includes(6)) return 'De lunes a viernes';
  if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Fines de semana';
  if (days.length === 1) return `Cada ${WEEKDAY_NAMES[days[0]]}`;
  return days.map((d) => capitalize(WEEKDAY_NAMES[d]).slice(0, 3)).join(', ');
}

const fmtN = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ','));

/** Progreso de un flexible en su semana/mes: "2/3 esta semana", "1/2 este mes" o "4 veces este mes". */
function flexProgressLabel(goal, key = todayKey()) {
  const n = flexNow(goal, key);
  if (n.every === 'week') return `${fmtN(n.count)}/${n.times} esta semana`;
  if (n.every === 'month') return `${fmtN(n.count)}/${n.times} este mes`;
  return `${fmtN(n.count)} ${n.count === 1 ? 'vez' : 'veces'} este mes`;
}

/** ¿Ya ha cumplido la meta de su semana/mes? (los libres nunca "se completan") */
function flexMet(goal, key = todayKey()) {
  const n = flexNow(goal, key);
  return !!n.every && n.count >= n.times - 1e-9;
}

/** Texto de cantidad: "12 / 20 páginas". */
function amountLabel(goal, value) {
  const v = typeof value === 'number' ? value : value === true ? goal.target : 0;
  const fmt = (n) => (Number.isInteger(n) ? n : n.toFixed(1).replace('.', ','));
  return `${fmt(v)} / ${fmt(goal.target)}${goal.unit ? ` ${goal.unit}` : ''}`;
}

/** Puntitos de prioridad (●●○○). */
function priorityDots(goal) {
  const i = PRIORITIES.findIndex((p) => p.id === (goal.priority || 'medium'));
  return `<span class="prio p-${goal.priority || 'medium'}" title="Prioridad ${esc(priorityLabel(goal))} · ${goalPoints(goal)} pts">${'<i></i>'.repeat(i + 1)}</span>`;
}

const paragraphs = (t) => (t || '').split('\n').filter((l) => l.trim()).map((p) => `<p>${esc(p)}</p>`).join('');

function moodPicker(current) {
  return `<div class="moods">
    ${MOODS.map((m) => `<button class="mood-btn ${current === m.v ? 'selected' : ''}" style="--mc:${m.color}" data-mood="${m.v}" aria-pressed="${current === m.v}">
      <span class="m-emoji">${m.emoji}</span><span class="m-label">${m.label}</span></button>`).join('')}
  </div>`;
}

// ======================================================================
// Evangelio
// ======================================================================

function openGospelSheet(dateKey, onChange) {
  openSheet({
    title: 'Evangelio',
    full: true,
    render(body, api) {
      const read = getLog(dateKey).gospelRead;
      const draw = (g) => {
        const src = SOURCES[g.source] || SOURCES.evangeliodeldia;
        body.innerHTML = `
          <header class="reading-head">
            <div class="reading-meta">${esc(capitalize(formatLong(dateKey)))}${g.liturgicDay ? ` · ${esc(g.liturgicDay)}` : ''}</div>
            ${g.title ? `<h1 class="reading-title">${esc(g.title)}</h1>` : ''}
            <div class="reading-ref">${icons.book}<span>${esc(g.reference)}</span></div>
          </header>
          <article class="reading">${paragraphs(g.text)}</article>
          <button class="btn ${read ? 'secondary' : 'gold'} block" data-read>
            ${read ? `${icons.check} Leído · +1 punto` : 'Marcar como leído · +1 punto extra'}
          </button>
          ${g.source === 'rezandovoy' ? `
            <div class="list">
              <a class="list-row" href="${esc(g.url)}" target="_blank" rel="noopener">
                <span class="lr-icon gold">${icons.headphones}</span>
                <div class="lr-body"><div class="lr-title">Escuchar la oración completa</div>
                  <div class="lr-sub">Oración guiada con música en RezandoVoy</div></div>
                <span class="chev">${icons.external}</span>
              </a>
            </div>` : ''}
          ${g.comment && g.comment.text ? `
            <section class="card">
              <button class="details-toggle" data-toggle-comment>${icons.chevronDown}<span>Comentario del día</span></button>
              <div class="comment-block" data-comment hidden>
                <h4>${esc(g.comment.title)}</h4>
                <div class="c-author">${esc(g.comment.author)}</div>
                <div class="c-text">${paragraphs(g.comment.text)}</div>
              </div>
            </section>` : ''}
          <div class="reading-source">Texto de <a href="${esc(g.url || src.site)}" target="_blank" rel="noopener">${esc(src.name)}</a>${g.saints?.length ? ` · Santos del día: ${esc(g.saints.join(', '))}` : ''}</div>`;
        body.querySelector('[data-read]').addEventListener('click', () => {
          if (toggleGospelRead(dateKey)) toast('🙏 Evangelio leído · +1 punto');
          onChange && onChange();
          api.rerender();
        });
        const t = body.querySelector('[data-toggle-comment]');
        if (t) t.addEventListener('click', () => {
          const c = body.querySelector('[data-comment]');
          c.hidden = !c.hidden;
          t.innerHTML = `${c.hidden ? icons.chevronDown : icons.chevronUp}<span>Comentario del día</span>`;
        });
      };
      const cached = getCachedGospel(dateKey);
      if (cached) return draw(cached);
      body.innerHTML = `<div>
        <div class="skeleton" style="height:14px;width:55%"></div>
        <div class="skeleton" style="height:28px;width:85%;margin-top:12px"></div>
        ${Array.from({ length: 8 }, () => '<div class="skeleton" style="height:16px;margin-top:14px"></div>').join('')}
      </div>`;
      getGospel(dateKey).then(draw).catch(() => {
        body.innerHTML = `<div class="empty">
          <div class="e-icon">📖</div>
          <h3>No se pudo cargar el Evangelio</h3>
          <p>Comprueba tu conexión. Cuando se carga, queda guardado para leerlo sin conexión.</p>
          <a class="btn secondary" href="${SOURCES.rezandovoy.site}" target="_blank" rel="noopener">${icons.external} Abrir RezandoVoy</a>
        </div>`;
      });
    },
  });
}

// ======================================================================
// Diario (escritura libre)
// ======================================================================

function openJournal(dateKey, onChange) {
  let timer;
  let ta;
  const save = () => { clearTimeout(timer); if (ta) { setNote(dateKey, ta.value); onChange && onChange(); } };
  openSheet({
    title: 'Diario',
    full: true,
    onClose: save,
    render(body) {
      const log = getLog(dateKey);
      const m = moodFor(log.mood);
      body.classList.add('journal-body');
      body.innerHTML = `
        <div class="journal-date">${esc(capitalize(formatLong(dateKey)))}${m ? ` · ${m.emoji} ${m.label}` : ''}</div>
        <textarea class="journal" data-journal placeholder="Escribe libremente…">${esc(log.note || '')}</textarea>
        <div class="journal-foot"><span data-count></span><span data-saved></span></div>`;
      ta = body.querySelector('[data-journal]');
      const count = body.querySelector('[data-count]');
      const saved = body.querySelector('[data-saved]');
      const upd = () => {
        const words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
        count.textContent = `${words} ${words === 1 ? 'palabra' : 'palabras'}`;
      };
      upd();
      ta.addEventListener('input', () => {
        upd();
        saved.textContent = '';
        clearTimeout(timer);
        timer = setTimeout(() => { setNote(dateKey, ta.value); saved.textContent = 'Guardado ✓'; }, 600);
      });
      if (!log.note) setTimeout(() => ta.focus({ preventScroll: true }), 400);
    },
  });
}

// ======================================================================
// Detalle de un día (desde el calendario de Progreso)
// ======================================================================

function openDaySheet(dateKey, onChange) {
  openSheet({
    title: capitalize(formatLong(dateKey)),
    full: true,
    render(body, api) {
      const log = getLog(dateKey);
      const goals = plannedGoals(dateKey);
      const today = todayKey();
      const future = dateKey > today;
      const past = dateKey < today;
      const done = goals.filter((g) => log.done[g.id]).length;
      // Flexibles: los disponibles ese día y los que se hicieron (aunque luego se archivaran)
      const flex = getState().goals.filter((g) => isFlex(g) && !goals.includes(g)
        && (flexGoals(dateKey).includes(g) || log.done[g.id]));
      body.innerHTML = `
        ${future ? '' : `<section class="block">
          <h3 class="block-title">Estado de ánimo</h3>
          ${moodPicker(log.mood)}
        </section>`}
        <section class="block">
          <div class="block-head"><h3 class="block-title">Objetivos</h3>${goals.length ? `<span class="meta">${done}/${goals.length}</span>` : ''}</div>
          ${goals.length ? `<div class="card list-card">${goals.map((g) => {
            const f = goalProgress(g, log.done[g.id]);
            const d = f >= 1;
            return `<button class="goal ${d ? 'done' : ''} ${!d && past && f === 0 ? 'is-missed' : ''} ${f > 0 && f < 1 ? 'is-partial' : ''}" data-goal="${g.id}" ${future ? 'disabled' : ''}>
              <span class="g-emoji">${esc(g.emoji)}</span>
              <span class="g-body"><div class="g-title">${esc(g.title)}</div>
                ${isQuantity(g) ? `<div class="g-sub">${esc(amountLabel(g, log.done[g.id]))}</div>` : ''}</span>
              <span class="check" style="--f:${f}">${d ? icons.check : f > 0 ? `${Math.round(f * 100)}` : past ? icons.x : ''}</span>
            </button>`;
          }).join('')}</div>` : '<p class="muted">No había objetivos programados.</p>'}
        </section>
        ${flex.length && !future ? `<section class="block">
          <div class="block-head"><h3 class="block-title">Flexibles</h3><span class="meta">Suman puntos extra</span></div>
          <div class="card list-card">${flex.map((g) => {
            const f = goalProgress(g, log.done[g.id]);
            const d = f >= 1;
            return `<button class="goal ${d ? 'done' : ''} ${f > 0 && f < 1 ? 'is-partial' : ''}" data-goal="${g.id}">
              <span class="g-emoji">${esc(g.emoji)}</span>
              <span class="g-body"><div class="g-title">${esc(g.title)}</div>
                <div class="g-sub">${esc(scheduleLabel(g))}${d ? ` · +${fmtN(goalPoints(g) * f)} pts` : ''}</div></span>
              <span class="check" style="--f:${f}">${d ? icons.check : f > 0 ? `${Math.round(f * 100)}` : ''}</span>
            </button>`;
          }).join('')}</div>
        </section>` : ''}
        ${future ? '' : `<section class="block">
          <div class="block-head"><h3 class="block-title">Diario</h3>
            <button class="link-btn" data-journal>${log.note ? 'Editar' : 'Escribir'}</button></div>
          ${log.note ? `<div class="card journal-read">${paragraphs(log.note)}</div>` : '<p class="muted">No escribiste nada este día.</p>'}
        </section>
        <section class="block">
          <div class="list">
            <button class="list-row" data-gospel>
              <span class="lr-icon gold">${icons.book}</span>
              <div class="lr-body"><div class="lr-title">Evangelio del día</div>
                <div class="lr-sub">${log.gospelRead ? 'Leído ✓' : 'Sin marcar como leído'}</div></div>
              <span class="chev">${icons.chevronRight}</span>
            </button>
          </div>
        </section>`}`;
      const refresh = () => { onChange && onChange(); api.rerender(); };
      body.querySelectorAll('[data-mood]').forEach((b) => b.addEventListener('click', () => { setMood(dateKey, Number(b.dataset.mood)); refresh(); }));
      body.querySelectorAll('[data-goal]').forEach((b) => b.addEventListener('click', () => {
        const g = getState().goals.find((x) => x.id === b.dataset.goal);
        if (isQuantity(g)) openAmountSheet(dateKey, g, refresh);
        else { toggleGoal(dateKey, b.dataset.goal); refresh(); }
      }));
      body.querySelector('[data-journal]')?.addEventListener('click', () => openJournal(dateKey, refresh));
      body.querySelector('[data-gospel]')?.addEventListener('click', () => openGospelSheet(dateKey, refresh));
    },
  });
}

// ======================================================================
// Detalle de un objetivo
// ======================================================================

function openGoalDetail(goalId, onChange) {
  let ref = todayKey();
  openSheet({
    title: 'Objetivo',
    full: true,
    render(body, api) {
      const s = getState();
      const goal = s.goals.find((g) => g.id === goalId);
      if (!goal) { api.close(); return; }
      const today = todayKey();
      const month = goalRangeStats(goalId, startOfMonth(ref), endOfMonth(ref));
      const year = goalRangeStats(goalId, startOfYear(ref), endOfYear(ref));
      const all = goalRangeStats(goalId, s.startDate, today);
      const streak = goalStreak(goalId);
      const best = goalBestStreak(goalId);

      const first = startOfMonth(ref);
      const lead = (fromKey(first).getDay() + 6) % 7;
      let cells = '<div class="gc-day out"></div>'.repeat(lead);
      for (const k of eachDay(first, endOfMonth(ref))) {
        const st = goalDayStatus(goalId, k);
        cells += `<div class="gc-day st-${st} ${k === today ? 'today' : ''}">${fromKey(k).getDate()}</div>`;
      }
      const yr = ref.slice(0, 4);
      const flex = isFlex(goal);
      const every = flex ? goal.schedule.every : null;
      const unitP = every === 'week' ? ['semana', 'semanas'] : ['mes', 'meses'];
      const veces = (n) => `${fmtN(n)} ${n === 1 ? 'vez' : 'veces'}`;
      const now = flex ? flexNow(goal, today) : null;
      const stats = !flex ? `
          <div class="stat"><div class="s-val">${fmtPts(month.frac * goalPoints(goal))}<small> pts</small></div><div class="s-lbl">Este mes</div><div class="s-sub">${month.done} de ${month.planned} días</div></div>
          <div class="stat"><div class="s-val">${fmtPts(year.frac * goalPoints(goal))}<small> pts</small></div><div class="s-lbl">Este año</div><div class="s-sub">${year.done} de ${year.planned} días</div></div>
          <div class="stat"><div class="s-val">🔥 ${streak}</div><div class="s-lbl">Racha actual</div><div class="s-sub">Mejor: ${best} ${best === 1 ? 'día' : 'días'}</div></div>
          <div class="stat"><div class="s-val">${all.done}</div><div class="s-lbl">Veces cumplido</div><div class="s-sub">${fmtPts(all.frac * goalPoints(goal))} pts desde el inicio</div></div>`
        : every ? `
          <div class="stat"><div class="s-val">${fmtN(now.count)}/${now.times}</div><div class="s-lbl">${every === 'week' ? 'Esta semana' : 'Este mes'}</div><div class="s-sub">${now.count >= now.times ? '¡Meta cumplida!' : `Faltan ${fmtN(now.times - now.count)}`}</div></div>
          <div class="stat"><div class="s-val">+${fmtN(year.pts)}<small> pts</small></div><div class="s-lbl">Este año</div><div class="s-sub">${year.periodsMet} de ${year.periods} ${unitP[1]} con la meta</div></div>
          <div class="stat"><div class="s-val">🔥 ${streak}</div><div class="s-lbl">Racha actual</div><div class="s-sub">Mejor: ${best} ${best === 1 ? unitP[0] : unitP[1]}</div></div>
          <div class="stat"><div class="s-val">${fmtN(all.count)}</div><div class="s-lbl">Veces hecho</div><div class="s-sub">+${fmtN(all.pts)} pts en total</div></div>`
        : `
          <div class="stat"><div class="s-val">${fmtN(month.count)}</div><div class="s-lbl">Este mes</div><div class="s-sub">${veces(month.count)} · +${fmtN(month.pts)} pts</div></div>
          <div class="stat"><div class="s-val">${fmtN(year.count)}</div><div class="s-lbl">Este año</div><div class="s-sub">+${fmtN(year.pts)} pts</div></div>
          <div class="stat"><div class="s-val">${fmtN(all.count)}</div><div class="s-lbl">En total</div><div class="s-sub">${veces(all.count)}</div></div>
          <div class="stat"><div class="s-val">+${fmtN(all.pts)}</div><div class="s-lbl">Puntos extra</div><div class="s-sub">Desde el inicio</div></div>`;
      const bars = MONTH_SHORT.map((mm, i) => {
        const m0 = `${yr}-${String(i + 1).padStart(2, '0')}-01`;
        const r = goalRangeStats(goalId, m0, endOfMonth(m0));
        const pts = r.flex ? r.pts : r.frac * goalPoints(goal);
        return { label: mm.charAt(0).toUpperCase(), title: mm, value: m0 > today || (!r.planned && !pts) ? null : pts, today: m0 === startOfMonth(today), future: m0 > today };
      });

      body.innerHTML = `
        <header class="goal-hero">
          <span class="gh-emoji">${esc(goal.emoji)}</span>
          <div class="gh-body">
            <h1>${esc(goal.title)}</h1>
            <div class="muted">${esc(scheduleLabel(goal))}${goal.archivedAt ? ' · Archivado' : ''}</div>
            <div class="gh-tags">
              ${getFacet(goal.facetId) ? `<span class="ftag" style="--fc:${getFacet(goal.facetId).color}">${esc(getFacet(goal.facetId).emoji)} ${esc(getFacet(goal.facetId).name)}</span>` : ''}
              <span class="ftag plain">${priorityDots(goal)} ${esc(priorityLabel(goal))} · ${goalPoints(goal)} pts</span>
              ${isQuantity(goal) ? `<span class="ftag plain">🎚️ ${esc(String(goal.target))} ${esc(goal.unit || '')}</span>` : ''}
            </div>
          </div>
          <button class="btn secondary small" data-edit>${icons.edit}<span>Editar</span></button>
        </header>

        <div class="stat-grid">${stats}
        </div>

        <section class="card">
          <div class="card-head">
            <button class="icon-btn sm" data-nav="-1" ${startOfMonth(ref) <= startOfMonth(s.startDate) ? 'disabled' : ''} aria-label="Mes anterior">${icons.chevronLeft}</button>
            <h3>${esc(capitalize(formatMonthYear(ref)))}</h3>
            <button class="icon-btn sm" data-nav="1" ${startOfMonth(ref) >= startOfMonth(today) ? 'disabled' : ''} aria-label="Mes siguiente">${icons.chevronRight}</button>
          </div>
          <div class="gcal">
            ${WEEK_ORDER.map((d) => `<div class="gc-head">${WEEKDAY_SHORT[d]}</div>`).join('')}
            ${cells}
          </div>
          <div class="chart-legend">
            ${flex
              ? `<span><i class="lg done"></i>Hecho</span>${isQuantity(goal) ? '<span><i class="lg partial"></i>A medias</span>' : ''}<span><i class="lg off"></i>Sin hacer (no penaliza)</span>`
              : `<span><i class="lg done"></i>Cumplido</span>${isQuantity(goal) ? '<span><i class="lg partial"></i>A medias</span>' : ''}<span><i class="lg missed"></i>No cumplido</span><span><i class="lg off"></i>No tocaba</span>`}
          </div>
        </section>

        <section class="card">
          <div class="card-head left"><h3>Año ${yr}</h3><span class="muted">Puntos por mes</span></div>
          ${barChart(bars, { points: true, height: 170 })}
        </section>`;

      body.querySelector('[data-edit]').addEventListener('click', () => openGoalEditor(goal, () => { onChange && onChange(); api.rerender(); }));
      body.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => {
        ref = addMonths(ref, Number(b.dataset.nav));
        api.rerender();
      }));
    },
  });
}

// ======================================================================
// Editor de objetivos
// ======================================================================

const EMOJIS = ['🙏', '📖', '✝️', '⛪', '🏃', '💪', '🧘', '🚶', '💧', '🥗', '🍎', '😴', '📚', '✍️', '🎯', '💼',
  '💻', '🧠', '🎸', '🎨', '🧹', '💰', '📵', '🌅', '❤️', '👨‍👩‍👧', '📞', '🤝', '🌱', '🚭', '🛏️', '⭐'];

function openGoalEditor(goal, onDone) {
  const editing = !!goal;
  const draft = {
    title: goal?.title || '',
    emoji: goal?.emoji || '🎯',
    type: goal?.schedule?.type || 'daily',
    days: goal?.schedule?.type === 'weekdays' ? [...goal.schedule.days] : [],
    date: goal?.schedule?.type === 'date' ? goal.schedule.date : todayKey(),
    flexEvery: goal?.schedule?.type === 'flex' ? (goal.schedule.every || 'free') : 'week',
    flexTimes: goal?.schedule?.type === 'flex' && goal.schedule.times ? goal.schedule.times : 1,
    priority: goal?.priority || 'medium',
    facetId: goal?.facetId || null,
    qty: isQuantity(goal),
    target: goal?.target || '',
    unit: goal?.unit || '',
  };
  const types = [['daily', 'Diario'], ['weekdays', 'Días'], ['flex', 'Flexible'], ['date', 'Una fecha']];
  const flexKinds = [['week', 'Por semana'], ['month', 'Por mes'], ['free', 'Libre']];

  const sheet = openSheet({
    title: editing ? 'Editar objetivo' : 'Nuevo objetivo',
    full: true,
    render(body, api) {
      const ti = types.findIndex(([t]) => t === draft.type);
      body.innerHTML = `
        <div class="field">
          <label for="g-title">Objetivo</label>
          <input id="g-title" class="input" maxlength="60" placeholder="Ej.: Rezar el rosario, leer 20 páginas…" value="${esc(draft.title)}" autocomplete="off" />
        </div>
        <div class="field">
          <span class="f-label">Icono</span>
          <div class="emoji-grid">
            ${EMOJIS.map((e) => `<button class="emoji-opt ${e === draft.emoji ? 'selected' : ''}" data-emoji="${e}">${e}</button>`).join('')}
          </div>
          <input class="input" data-custom-emoji maxlength="4" placeholder="…o escribe otro emoji" value="${EMOJIS.includes(draft.emoji) ? '' : esc(draft.emoji)}" />
        </div>
        <div class="field">
          <span class="f-label">Frecuencia</span>
          <div class="seg big four">
            <div class="seg-thumb" style="transform: translateX(${ti * 100}%)"></div>
            ${types.map(([t, l]) => `<button class="${t === draft.type ? 'active' : ''}" data-type="${t}">${l}</button>`).join('')}
          </div>
          ${draft.type === 'daily' ? '<div class="hint">Aparecerá todos los días.</div>' : ''}
          ${draft.type === 'weekdays' ? `
            <div class="chips">
              ${WEEK_ORDER.map((d) => `<button class="chip ${draft.days.includes(d) ? 'on' : ''}" data-wd="${d}" aria-pressed="${draft.days.includes(d)}">${WEEKDAY_SHORT[d]}</button>`).join('')}
            </div>
            <div class="hint">${draft.days.length ? esc(scheduleLabel({ schedule: { type: 'weekdays', days: draft.days } })) : 'Elige uno o varios días de la semana.'}</div>` : ''}
          ${draft.type === 'flex' ? `
            <div class="seg">
              <div class="seg-thumb" style="transform: translateX(${flexKinds.findIndex(([k]) => k === draft.flexEvery) * 100}%)"></div>
              ${flexKinds.map(([k, l]) => `<button class="${k === draft.flexEvery ? 'active' : ''}" data-flex-every="${k}">${l}</button>`).join('')}
            </div>
            ${draft.flexEvery !== 'free' ? `
            <div class="stepper">
              <button class="icon-btn sm" data-flex-times="-1" aria-label="Menos veces" ${draft.flexTimes <= 1 ? 'disabled' : ''}>−</button>
              <span><b>${draft.flexTimes}</b> ${draft.flexTimes === 1 ? 'vez' : 'veces'} ${draft.flexEvery === 'week' ? 'por semana' : 'al mes'}</span>
              <button class="icon-btn sm" data-flex-times="1" aria-label="Más veces" ${draft.flexTimes >= (draft.flexEvery === 'week' ? 7 : 31) ? 'disabled' : ''}>+</button>
            </div>
            <div class="hint">Lo marcas el día que lo hagas, sin día fijo. Esos días suma sus puntos como extra, y en Progreso verás cuántas ${draft.flexEvery === 'week' ? 'semanas' : 'veces al mes'} cumples la meta. No hacerlo un día concreto nunca baja tu puntuación.</div>`
            : '<div class="hint">Sin meta ni día fijo: cada vez que lo hagas (p. ej. terminar un libro) suma sus puntos como extra a ese día y aparece en tus estadísticas. No hacerlo nunca penaliza.</div>'}` : ''}
          ${draft.type === 'date' ? `
            <input type="date" class="input" data-date value="${draft.date}" min="${todayKey()}" />
            <div class="hint">Un objetivo puntual solo para ese día.</div>` : ''}
        </div>
        <div class="field">
          <span class="f-label">Faceta</span>
          <div class="facet-pick">
            <button class="fchip ${!draft.facetId ? 'on' : ''}" data-facet="">Sin faceta</button>
            ${getState().facets.slice().sort((a, b) => a.order - b.order).map((f) => `<button class="fchip ${draft.facetId === f.id ? 'on' : ''}" data-facet="${f.id}" style="--fc:${f.color}"><span>${esc(f.emoji)}</span>${esc(f.name)}</button>`).join('')}
            <button class="fchip add" data-new-facet>${icons.plus} Nueva</button>
          </div>
          <div class="hint">Agrupa objetivos parecidos (Fe, Ejercicio, Finanzas…) para verlos juntos en Progreso.</div>
        </div>
        <div class="field">
          <span class="f-label">Prioridad</span>
          <div class="seg four">
            <div class="seg-thumb" style="transform: translateX(${PRIORITIES.findIndex((x) => x.id === draft.priority) * 100}%)"></div>
            ${PRIORITIES.map((x) => `<button class="${x.id === draft.priority ? 'active' : ''}" data-prio="${x.id}">${x.label}</button>`).join('')}
          </div>
          <div class="hint">Vale <b>${(PRIORITIES.find((x) => x.id === draft.priority) || PRIORITIES[1]).points} ${(PRIORITIES.find((x) => x.id === draft.priority) || PRIORITIES[1]).points === 1 ? 'punto' : 'puntos'}</b>. Los objetivos importantes pesan más en tu progreso.</div>
        </div>
        <div class="field">
          <span class="f-label">Cómo se cumple</span>
          <div class="seg two">
            <div class="seg-thumb" style="transform: translateX(${draft.qty ? 100 : 0}%)"></div>
            <button class="${!draft.qty ? 'active' : ''}" data-qty="0">Hecho / no hecho</button>
            <button class="${draft.qty ? 'active' : ''}" data-qty="1">Con cantidad</button>
          </div>
          ${draft.qty ? `
            <div class="row-inline qty-row">
              <input class="input" data-target type="number" inputmode="decimal" min="0" step="any" placeholder="20" value="${esc(String(draft.target))}" />
              <input class="input" data-unit maxlength="16" placeholder="páginas, minutos, vasos…" value="${esc(draft.unit)}" />
            </div>
            <div class="hint">Si haces una parte (p. ej. 10 de 20), cuenta la mitad de sus puntos.</div>` : ''}
        </div>
        <div class="row-actions">
          <button class="btn block" data-save>${editing ? 'Guardar cambios' : 'Crear objetivo'}</button>
          ${editing ? `
            ${goal.archivedAt
              ? `<button class="btn secondary block" data-restore>${icons.restore} Reactivar objetivo</button>`
              : `<button class="btn secondary block" data-archive>${icons.archive} Archivar (conserva el historial)</button>`}
            <button class="btn danger block" data-delete>${icons.trash} Eliminar definitivamente</button>` : ''}
        </div>
        ${editing ? '<div class="hint">Los días en que toca el objetivo cambian desde hoy. La prioridad y la faceta se aplican también a tu historial.</div>' : ''}`;

      const titleInput = body.querySelector('#g-title');
      const saveBtn = body.querySelector('[data-save]');
      const validate = () => {
        let ok = draft.title.trim().length > 0;
        if (draft.type === 'weekdays' && !draft.days.length) ok = false;
        if (draft.type === 'date' && !draft.date) ok = false;
        if (draft.qty && !(Number(draft.target) > 0)) ok = false;
        saveBtn.disabled = !ok;
      };
      titleInput.addEventListener('input', () => { draft.title = titleInput.value; validate(); });
      body.querySelectorAll('[data-emoji]').forEach((b) => b.addEventListener('click', () => {
        draft.emoji = b.dataset.emoji;
        body.querySelectorAll('[data-emoji]').forEach((x) => x.classList.toggle('selected', x === b));
        body.querySelector('[data-custom-emoji]').value = '';
      }));
      body.querySelector('[data-custom-emoji]').addEventListener('input', (e) => {
        const v = e.target.value.trim();
        if (v) { draft.emoji = v; body.querySelectorAll('[data-emoji]').forEach((x) => x.classList.remove('selected')); }
      });
      body.querySelectorAll('[data-type]').forEach((b) => b.addEventListener('click', () => { draft.type = b.dataset.type; api.rerender(); }));
      body.querySelectorAll('[data-flex-every]').forEach((b) => b.addEventListener('click', () => {
        draft.flexEvery = b.dataset.flexEvery;
        if (draft.flexEvery === 'week') draft.flexTimes = Math.min(draft.flexTimes, 7);
        api.rerender();
      }));
      body.querySelectorAll('[data-flex-times]').forEach((b) => b.addEventListener('click', () => {
        const max = draft.flexEvery === 'week' ? 7 : 31;
        draft.flexTimes = Math.min(max, Math.max(1, draft.flexTimes + Number(b.dataset.flexTimes)));
        api.rerender();
      }));
      body.querySelectorAll('[data-wd]').forEach((b) => b.addEventListener('click', () => {
        const d = Number(b.dataset.wd);
        draft.days = draft.days.includes(d) ? draft.days.filter((x) => x !== d) : [...draft.days, d];
        api.rerender();
      }));
      body.querySelector('[data-date]')?.addEventListener('change', (e) => { draft.date = e.target.value; validate(); });
      body.querySelectorAll('[data-facet]').forEach((b) => b.addEventListener('click', () => { draft.facetId = b.dataset.facet || null; api.rerender(); }));
      body.querySelector('[data-new-facet]').addEventListener('click', () => openFacetEditor(null, (f) => { if (f) draft.facetId = f.id; api.rerender(); }));
      body.querySelectorAll('[data-prio]').forEach((b) => b.addEventListener('click', () => { draft.priority = b.dataset.prio; api.rerender(); }));
      body.querySelectorAll('[data-qty]').forEach((b) => b.addEventListener('click', () => { draft.qty = b.dataset.qty === '1'; api.rerender(); }));
      body.querySelector('[data-target]')?.addEventListener('input', (e) => { draft.target = e.target.value; validate(); });
      body.querySelector('[data-unit]')?.addEventListener('input', (e) => { draft.unit = e.target.value; });
      validate();

      const finish = (msg) => { toast(msg); sheet.close(); onDone && onDone(); };
      saveBtn.addEventListener('click', () => {
        const schedule = draft.type === 'daily' ? { type: 'daily' }
          : draft.type === 'weekdays' ? { type: 'weekdays', days: [...draft.days].sort() }
          : draft.type === 'flex' ? { type: 'flex', every: draft.flexEvery === 'free' ? null : draft.flexEvery, times: draft.flexEvery === 'free' ? null : draft.flexTimes }
          : { type: 'date', date: draft.date };
        const extra = {
          priority: draft.priority,
          facetId: draft.facetId,
          target: draft.qty ? Number(draft.target) : null,
          unit: draft.qty ? draft.unit.trim() : '',
        };
        if (editing) { updateGoal(goal.id, { title: draft.title.trim(), emoji: draft.emoji, schedule, ...extra }); finish('Cambios guardados'); }
        else { addGoal({ title: draft.title, emoji: draft.emoji, schedule, ...extra }); finish('🎯 Objetivo creado'); }
      });
      body.querySelector('[data-archive]')?.addEventListener('click', () => { archiveGoal(goal.id); finish('Objetivo archivado'); });
      body.querySelector('[data-restore]')?.addEventListener('click', () => { restoreGoal(goal.id); finish('Objetivo reactivado'); });
      body.querySelector('[data-delete]')?.addEventListener('click', () => {
        if (confirmDialog('¿Eliminar este objetivo y todo su historial? No se puede deshacer.')) { deleteGoal(goal.id); finish('Objetivo eliminado'); }
      });
      if (!editing && !draft.title) setTimeout(() => titleInput.focus({ preventScroll: true }), 380);
    },
  });
}

// ======================================================================
// Ajustes
// ======================================================================

function openSettingsSheet(onChange) {
  openSheet({
    title: 'Ajustes',
    full: true,
    render(body, api) {
      const s = getState();
      const st = s.settings;
      const mine = s.quotes.filter((q) => q.mine).length;
      body.innerHTML = `
        <section class="block">
          <h3 class="block-title">Perfil</h3>
          <div class="list">
            <div class="setting-row">
              <div class="s-title">Nombre</div>
              <input class="inline-input" data-name maxlength="30" placeholder="Tu nombre" value="${esc(st.name)}" />
            </div>
            <div class="setting-row">
              <div><div class="s-title">Día cumplido</div><div class="s-sub">Mínimo para sumar a la racha</div></div>
              <select data-threshold>
                ${[0.5, 0.7, 0.8, 1].map((v) => `<option value="${v}" ${v === st.threshold ? 'selected' : ''}>${v * 100}%</option>`).join('')}
              </select>
            </div>
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">Apariencia</h3>
          <div class="list">
            <div class="setting-row col">
              <div><div class="s-title">Tema</div>
                <div class="s-sub">«Automático» sigue el modo claro u oscuro de tu iPhone u ordenador.</div></div>
              <div class="seg theme-seg">
                <div class="seg-thumb" style="transform: translateX(${['auto', 'light', 'dark'].indexOf(st.theme || 'auto') * 100}%)"></div>
                <button class="${(st.theme || 'auto') === 'auto' ? 'active' : ''}" data-theme-opt="auto">Automático</button>
                <button class="${st.theme === 'light' ? 'active' : ''}" data-theme-opt="light">Claro</button>
                <button class="${st.theme === 'dark' ? 'active' : ''}" data-theme-opt="dark">Oscuro</button>
              </div>
            </div>
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">Frases del día</h3>
          <div class="list">
            <button class="list-row" data-quotes>
              <span class="lr-icon">${icons.quote}</span>
              <div class="lr-body"><div class="lr-title">Mis frases</div>
                <div class="lr-sub">${s.quotes.length} frases · ${mine} añadidas por ti</div></div>
              <span class="chev">${icons.chevronRight}</span>
            </button>
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">Evangelio</h3>
          <div class="list">
            <div class="setting-row">
              <div class="s-title">Fuente</div>
              <select data-source>
                <option value="rezandovoy" ${st.gospelSource === 'rezandovoy' ? 'selected' : ''}>RezandoVoy</option>
                <option value="evangeliodeldia" ${st.gospelSource === 'evangeliodeldia' ? 'selected' : ''}>evangeliodeldia.org</option>
              </select>
            </div>
            ${st.gospelSource === 'rezandovoy' ? `
            <div class="setting-row col">
              <div><div class="s-title">URL del conector</div>
                <div class="s-sub">Ya viene configurado con tu conector. Déjalo vacío para usar el de por defecto. Si falla, se usa evangeliodeldia.org.</div></div>
              <div class="row-inline">
                <input class="input" data-connector placeholder="${esc(DEFAULT_CONNECTOR)}" value="${esc(st.connectorUrl)}" inputmode="url" autocapitalize="off" autocorrect="off" spellcheck="false" />
                <button class="btn secondary small" data-test>Probar</button>
              </div>
              <div class="s-sub" data-test-result></div>
            </div>` : ''}
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">Copia de seguridad y cambio de móvil</h3>
          <div class="list">
            <button class="list-row" data-export="enc" ${cryptoAvailable() ? '' : 'disabled'}>
              <span class="lr-icon">${icons.download}</span>
              <div class="lr-body"><div class="lr-title">Exportar copia cifrada</div><div class="lr-sub">${cryptoAvailable() ? 'Recomendado. Protegida con contraseña; guárdala en Archivos o iCloud' : 'Solo disponible con la app instalada (https)'}</div></div>
            </button>
            <button class="list-row" data-export="plain">
              <span class="lr-icon">${icons.download}</span>
              <div class="lr-body"><div class="lr-title">Exportar sin cifrar</div><div class="lr-sub">Cualquiera que tenga el archivo podrá leer tu diario</div></div>
            </button>
            <label class="list-row">
              <span class="lr-icon">${icons.upload}</span>
              <div class="lr-body"><div class="lr-title">Importar copia</div><div class="lr-sub">Restaura una copia (cifrada o no) en este móvil</div></div>
              <input type="file" accept="application/json,.json" data-import class="visually-hidden" />
            </label>
          </div>
          <p class="hint">${backupHint(st.lastExportAt)}</p>
          <p class="hint">Para cambiar de móvil: exporta aquí, instala GodPole en el móvil nuevo y usa «Importar copia».</p>
        </section>

        <button class="btn danger block" data-reset>${icons.trash} Borrar todos los datos</button>
        <div class="footer-note">GodPole · v2.3</div>`;

      body.querySelector('[data-name]').addEventListener('change', (e) => { updateSettings({ name: e.target.value.trim() }); onChange && onChange(); });
      body.querySelector('[data-threshold]').addEventListener('change', (e) => { updateSettings({ threshold: Number(e.target.value) }); onChange && onChange(); });
      body.querySelector('[data-quotes]').addEventListener('click', () => openQuotesSheet(() => { onChange && onChange(); api.rerender(); }));
      body.querySelectorAll('[data-theme-opt]').forEach((b) => b.addEventListener('click', () => {
        updateSettings({ theme: b.dataset.themeOpt });
        applyTheme(b.dataset.themeOpt);
        onChange && onChange();
        api.rerender();
      }));
      body.querySelector('[data-source]').addEventListener('change', (e) => {
        updateSettings({ gospelSource: e.target.value });
        clearGospelCache();
        onChange && onChange();
        api.rerender();
      });
      const conn = body.querySelector('[data-connector]');
      if (conn) {
        conn.addEventListener('change', () => {
          updateSettings({ connectorUrl: conn.value.trim() });
          clearGospelCache();
          onChange && onChange();
        });
        body.querySelector('[data-test]').addEventListener('click', async () => {
          const out = body.querySelector('[data-test-result]');
          const url = conn.value.trim() || DEFAULT_CONNECTOR;
          if (!/^https:\/\//.test(url)) { out.textContent = 'Introduce una URL que empiece por https://'; return; }
          updateSettings({ connectorUrl: url });
          out.textContent = 'Probando…';
          try {
            const g = await testConnector(url);
            out.innerHTML = `<span style="color:var(--success)">✓ Funciona: ${esc(g.reference)}${g.title ? ` · «${esc(g.title)}»` : ''}</span>`;
            clearGospelCache();
            onChange && onChange();
          } catch (e) {
            out.innerHTML = `<span style="color:var(--danger)">No responde (${esc(e.message)}). Revisa la URL.</span>`;
          }
        });
      }
      body.querySelectorAll('[data-export]').forEach((b) => b.addEventListener('click', async () => {
        const done = await exportBackup(b.dataset.export === 'enc');
        if (done) api.rerender();
      }));
      body.querySelector('[data-import]').addEventListener('change', async (e) => {
        const input = e.target;
        const file = input.files[0];
        input.value = ''; // permite volver a elegir el mismo archivo si algo falla
        if (!file) return;
        try {
          if (await importBackupFile(file)) {
            onChange && onChange();
            api.rerender();
          }
        } catch (err) {
          toast(err.message || 'No se pudo importar el archivo.');
        }
      });
      body.querySelector('[data-reset]').addEventListener('click', () => {
        if (confirmDialog('¿Borrar todos tus objetivos, registros, diario y frases? No se puede deshacer.')) {
          resetAll();
          toast('Datos borrados');
          onChange && onChange();
          api.close();
        }
      });
    },
  });
}

function backupHint(last) {
  if (!last) return 'Tus datos se guardan solo en este iPhone y todavía no has hecho ninguna copia.';
  const days = Math.floor((Date.now() - last) / 86400000);
  const when = days <= 0 ? 'hoy' : days === 1 ? 'ayer' : `hace ${days} días`;
  return `Última copia: ${when}. Tus datos se guardan solo en este iPhone.`;
}

/**
 * Pide una contraseña en una hoja propia (prompt() no es fiable en la app instalada en iOS).
 * Con `confirm`, la pide dos veces (al crear la copia). Devuelve la contraseña o null si se cancela.
 */
function askPassphrase({ title, message, confirm = false }) {
  return new Promise((resolve) => {
    let result = null;
    openSheet({
      title,
      onClose: () => resolve(result),
      render(body, api) {
        body.innerHTML = `
          <p class="hint">${esc(message)}</p>
          <div class="field">
            <label for="pp-1">Contraseña</label>
            <input id="pp-1" class="input" type="password" autocomplete="${confirm ? 'new-password' : 'current-password'}" autocapitalize="off" autocorrect="off" spellcheck="false" />
          </div>
          ${confirm ? `<div class="field">
            <label for="pp-2">Repite la contraseña</label>
            <input id="pp-2" class="input" type="password" autocomplete="new-password" autocapitalize="off" autocorrect="off" spellcheck="false" />
          </div>` : ''}
          <div class="hint pp-error" data-pp-error></div>
          <button class="btn block" data-pp-ok>${confirm ? 'Cifrar y exportar' : 'Abrir copia'}</button>`;
        const p1 = body.querySelector('#pp-1');
        const p2 = body.querySelector('#pp-2');
        const err = body.querySelector('[data-pp-error]');
        const submit = () => {
          const v = p1.value;
          const problem = confirm ? passphraseProblem(v) : (v ? null : 'Escribe la contraseña.');
          if (problem) { err.textContent = problem; return; }
          if (confirm && v !== p2.value) { err.textContent = 'Las dos contraseñas no coinciden.'; return; }
          result = v;
          api.close();
        };
        body.querySelector('[data-pp-ok]').addEventListener('click', submit);
        body.querySelectorAll('input').forEach((i) => i.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); }));
        setTimeout(() => p1.focus(), 350);
      },
    });
  });
}

/** Exporta la copia (cifrada o no). Devuelve true si se ha entregado el archivo. */
async function exportBackup(encrypted) {
  let content = exportData();
  let name = `godpole-copia-${todayKey()}.json`;
  if (encrypted) {
    if (!cryptoAvailable()) { toast('El cifrado necesita la app instalada (https).'); return false; }
    const pass = await askPassphrase({
      title: 'Copia cifrada',
      message: 'Elige una contraseña para proteger la copia (mínimo 8 caracteres). La necesitarás para importarla en otro móvil. Si la olvidas, no hay forma de recuperar la copia.',
      confirm: true,
    });
    if (!pass) return false;
    toast('Cifrando…');
    content = await encryptText(content, pass, 'GodPole');
    name = `godpole-copia-${todayKey()}-cifrada.json`;
  } else if (!confirmDialog('La copia sin cifrar se puede leer con cualquier editor de texto (incluido tu diario). ¿Exportar igualmente?')) {
    return false;
  }
  const delivered = await deliverFile(name, content);
  if (delivered) {
    markExported();
    toast(encrypted ? 'Copia cifrada lista' : 'Copia exportada');
  }
  return delivered;
}

/** Entrega el archivo: hoja de compartir de iOS («Guardar en Archivos», AirDrop…) o descarga normal. */
async function deliverFile(name, content) {
  const file = new File([content], name, { type: 'application/json' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Copia de GodPole' });
      return true;
    }
  } catch (e) {
    if (e.name === 'AbortError') return false; // cerraste la hoja de compartir
  }
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return true;
}

/** Importa un archivo de copia (pide la contraseña si está cifrado). Devuelve true si se ha restaurado. */
async function importBackupFile(file) {
  let parsed = parseBackupText(await file.text());
  if (isEncrypted(parsed)) {
    if (!cryptoAvailable()) throw new Error('Para abrir una copia cifrada, abre GodPole instalada (https).');
    const pass = await askPassphrase({ title: 'Copia cifrada', message: 'Esta copia está protegida. Escribe la contraseña con la que la creaste.' });
    if (!pass) return false;
    toast('Descifrando…');
    parsed = parseBackupText(await decryptEnvelope(parsed, pass));
  }
  const sum = summarizeBackup(parsed);
  const date = typeof sum.exportedAt === 'string' && /^\d{4}-\d{2}-\d{2}/.test(sum.exportedAt) ? sum.exportedAt.slice(0, 10) : null;
  const when = date ? ` del ${formatShort(date)}` : '';
  const msg = `La copia${when} tiene ${sum.goals} objetivos, ${sum.days} días registrados y ${sum.notes} entradas de diario.\n\nSustituirá TODOS los datos actuales de este móvil. ¿Continuar?`;
  if (!confirmDialog(msg)) return false;
  importData(parsed);
  toast('Datos restaurados');
  return true;
}

// ======================================================================
// Frases
// ======================================================================

function openQuotesSheet(onChange) {
  let filter = 'all';
  let query = '';
  openSheet({
    title: 'Frases del día',
    full: true,
    render(body, api) {
      const s = getState();
      const norm = (x) => x.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      const q = norm(query);
      const list = s.quotes.filter((x) => (filter === 'mine' ? x.mine : true) && (!q || norm(x.t + ' ' + x.a).includes(q)));
      const fi = filter === 'all' ? 0 : 1;
      body.innerHTML = `
        <button class="btn block" data-add>${icons.plus} Añadir frase</button>
        <div class="search">${icons.search}<input class="search-input" data-search placeholder="Buscar frase o autor" value="${esc(query)}" /></div>
        <div class="seg two">
          <div class="seg-thumb" style="transform: translateX(${fi * 100}%)"></div>
          <button class="${filter === 'all' ? 'active' : ''}" data-filter="all">Todas (${s.quotes.length})</button>
          <button class="${filter === 'mine' ? 'active' : ''}" data-filter="mine">Mías (${s.quotes.filter((x) => x.mine).length})</button>
        </div>
        ${list.length ? `<div class="list">${list.map((x) => `
          <button class="list-row quote-row" data-edit="${x.id}">
            <div class="lr-body">
              <div class="qr-text">${esc(x.t)}</div>
              <div class="lr-sub">${x.a ? esc(x.a) : 'Sin autor'}${x.mine ? ' · <span class="tag">Mía</span>' : ''}</div>
            </div>
            <span class="chev">${icons.chevronRight}</span>
          </button>`).join('')}</div>`
          : `<div class="empty"><div class="e-icon">💬</div><h3>${filter === 'mine' && !q ? 'Aún no has añadido frases' : 'Sin resultados'}</h3>
              <p>${filter === 'mine' && !q ? 'Guarda aquí las frases que escuches y te ayuden. Aparecerán como frase del día.' : 'Prueba con otra búsqueda.'}</p></div>`}
        <button class="btn secondary block" data-restore>${icons.restore} Recuperar frases originales borradas</button>`;

      const refresh = () => { onChange && onChange(); api.rerender(); };
      body.querySelector('[data-add]').addEventListener('click', () => openQuoteEditor(null, refresh));
      body.querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', () => openQuoteEditor(s.quotes.find((x) => x.id === b.dataset.edit), refresh)));
      body.querySelectorAll('[data-filter]').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.filter; api.rerender(); }));
      const search = body.querySelector('[data-search]');
      let t;
      search.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          query = search.value;
          api.rerender();
          const again = body.querySelector('[data-search]');
          again.focus();
          again.setSelectionRange(again.value.length, again.value.length);
        }, 250);
      });
      body.querySelector('[data-restore]').addEventListener('click', () => {
        const before = getState().quotes.length;
        restoreDefaultQuotes();
        const n = getState().quotes.length - before;
        toast(n ? `${n} frases recuperadas` : 'No faltaba ninguna');
        refresh();
      });
    },
  });
}

function openQuoteEditor(quote, onDone) {
  const editing = !!quote;
  const sheet = openSheet({
    title: editing ? 'Editar frase' : 'Nueva frase',
    full: true,
    render(body) {
      body.innerHTML = `
        <div class="field">
          <label for="q-text">Frase</label>
          <textarea id="q-text" class="input textarea" rows="5" maxlength="400" placeholder="Escribe la frase que te ha llegado…">${esc(quote?.t || '')}</textarea>
        </div>
        <div class="field">
          <label for="q-author">Autor o fuente</label>
          <input id="q-author" class="input" maxlength="80" placeholder="Ej.: San Agustín, mi abuela, homilía del domingo…" value="${esc(quote?.a || '')}" />
        </div>
        <div class="row-actions">
          <button class="btn block" data-save>${editing ? 'Guardar cambios' : 'Añadir frase'}</button>
          ${editing ? `<button class="btn danger block" data-delete>${icons.trash} Eliminar frase</button>` : ''}
        </div>`;
      const text = body.querySelector('#q-text');
      const author = body.querySelector('#q-author');
      const save = body.querySelector('[data-save]');
      const validate = () => { save.disabled = !text.value.trim(); };
      text.addEventListener('input', validate);
      validate();
      save.addEventListener('click', () => {
        if (editing) { updateQuote(quote.id, { t: text.value, a: author.value }); toast('Frase guardada'); }
        else { addQuote({ t: text.value, a: author.value }); toast('💬 Frase añadida'); }
        sheet.close();
        onDone && onDone();
      });
      body.querySelector('[data-delete]')?.addEventListener('click', () => {
        if (confirmDialog('¿Eliminar esta frase?')) { deleteQuote(quote.id); toast('Frase eliminada'); sheet.close(); onDone && onDone(); }
      });
      if (!editing) setTimeout(() => text.focus({ preventScroll: true }), 380);
    },
  });
}


// ======================================================================
// Cantidad hecha (objetivos con cantidad)
// ======================================================================

function openAmountSheet(dateKey, goal, onDone) {
  const cur = getLog(dateKey).done[goal.id];
  let value = typeof cur === 'number' ? cur : cur === true ? goal.target : 0;
  const step = goal.target >= 50 ? 5 : 1;
  const sheet = openSheet({
    title: `${goal.emoji} ${goal.title}`,
    render(body, api) {
      const f = Math.max(0, Math.min(1, value / goal.target));
      body.innerHTML = `
        <div class="amount">
          <div class="am-ring">
            <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--surface-2)" stroke-width="10"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="${f >= 1 ? 'var(--success)' : 'var(--accent)'}" stroke-width="10" stroke-linecap="round"
                stroke-dasharray="${2 * Math.PI * 52}" stroke-dashoffset="${2 * Math.PI * 52 * (1 - f)}" transform="rotate(-90 60 60)"/></svg>
            <div class="am-val"><b>${Math.round(f * 100)}%</b><span>${esc(amountLabel(goal, value))}</span></div>
          </div>
          <div class="am-controls">
            <button class="icon-btn" data-step="-1" aria-label="Menos">−</button>
            <input class="input am-input" data-amount type="number" inputmode="decimal" min="0" step="any" value="${value}" />
            <button class="icon-btn" data-step="1" aria-label="Más">+</button>
          </div>
          <div class="am-quick">
            <button class="fchip" data-set="${goal.target / 2}">La mitad</button>
            <button class="fchip" data-set="${goal.target}">Completo</button>
            <button class="fchip" data-set="0">Nada</button>
          </div>
          <button class="btn block" data-save>Guardar</button>
        </div>`;
      const input = body.querySelector('[data-amount]');
      const redraw = () => api.rerender();
      input.addEventListener('change', () => { value = Math.max(0, Number(input.value) || 0); redraw(); });
      body.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
        value = Math.max(0, (Number(input.value) || 0) + step * Number(b.dataset.step));
        redraw();
      }));
      body.querySelectorAll('[data-set]').forEach((b) => b.addEventListener('click', () => { value = Number(b.dataset.set); redraw(); }));
      body.querySelector('[data-save]').addEventListener('click', () => {
        value = Math.max(0, Number(input.value) || 0);
        setGoalAmount(dateKey, goal.id, value);
        sheet.close();
        if (value >= goal.target) toast(`${goal.emoji} ¡Objetivo completado!`);
        onDone && onDone(value >= goal.target);
      });
    },
  });
}

// ======================================================================
// Facetas
// ======================================================================

const FACET_EMOJIS = ['✝️', '🙏', '💪', '🏃', '💰', '📚', '🧠', '❤️', '👨‍👩‍👧', '💼', '🎨', '🌱', '🥗', '😴', '🤝', '📁'];

function openFacetsSheet(onChange) {
  openSheet({
    title: 'Facetas',
    full: true,
    render(body, api) {
      const s = getState();
      const facets = s.facets.slice().sort((a, b) => a.order - b.order);
      body.innerHTML = `
        <p class="muted">Las facetas agrupan objetivos de un mismo ámbito de tu vida. En Progreso podrás ver cada una por separado y compararlas en la rueda de tu vida.</p>
        <button class="btn block" data-add>${icons.plus} Nueva faceta</button>
        ${facets.length ? `<div class="list">${facets.map((f) => {
          const n = s.goals.filter((g) => g.facetId === f.id && !g.archivedAt).length;
          return `<button class="list-row" data-edit="${f.id}">
            <span class="facet-dot" style="--fc:${f.color}">${esc(f.emoji)}</span>
            <div class="lr-body"><div class="lr-title">${esc(f.name)}</div><div class="lr-sub">${n} ${n === 1 ? 'objetivo' : 'objetivos'}</div></div>
            <span class="chev">${icons.chevronRight}</span>
          </button>`;
        }).join('')}</div>`
        : `<div class="empty small card"><div class="e-icon">📁</div><p>Aún no tienes facetas. Prueba con <b>Fe</b>, <b>Ejercicio</b> o <b>Finanzas</b>.</p></div>`}`;
      const refresh = () => { onChange && onChange(); api.rerender(); };
      body.querySelector('[data-add]').addEventListener('click', () => openFacetEditor(null, refresh));
      body.querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', () => openFacetEditor(getFacet(b.dataset.edit), refresh)));
    },
  });
}

function openFacetEditor(facet, onDone) {
  const editing = !!facet;
  const draft = {
    name: facet?.name || '',
    emoji: facet?.emoji || FACET_EMOJIS[0],
    color: facet?.color || FACET_COLORS[getState().facets.length % FACET_COLORS.length],
    // objetivos que quedarán dentro de esta faceta (se pueden traer de otras o de "sin faceta")
    goals: new Set(facet ? getState().goals.filter((g) => g.facetId === facet.id).map((g) => g.id) : []),
  };
  const sheet = openSheet({
    title: editing ? 'Editar faceta' : 'Nueva faceta',
    full: true,
    render(body, api) {
      body.innerHTML = `
        <div class="facet-preview" style="--fc:${draft.color}"><span>${esc(draft.emoji)}</span>${esc(draft.name || 'Nombre de la faceta')}</div>
        <div class="field">
          <label for="f-name">Nombre</label>
          <input id="f-name" class="input" maxlength="24" placeholder="Fe, Ejercicio, Finanzas…" value="${esc(draft.name)}" />
        </div>
        <div class="field">
          <span class="f-label">Icono</span>
          <div class="emoji-grid">${FACET_EMOJIS.map((e) => `<button class="emoji-opt ${e === draft.emoji ? 'selected' : ''}" data-emoji="${e}">${e}</button>`).join('')}</div>
        </div>
        <div class="field">
          <span class="f-label">Color</span>
          <div class="color-grid">${FACET_COLORS.map((c) => `<button class="color-opt ${c === draft.color ? 'selected' : ''}" data-color="${c}" style="background:${c}" aria-label="Color ${c}"></button>`).join('')}</div>
        </div>
        <div class="field">
          <span class="f-label">Objetivos de esta faceta</span>
          ${(() => {
            const all = getState().goals.slice().sort((a, b) => (!!a.archivedAt - !!b.archivedAt) || a.order - b.order);
            if (!all.length) return '<div class="hint">Aún no tienes objetivos. Cuando los crees, podrás elegir aquí su faceta.</div>';
            return `<div class="list pick-list">${all.map((g) => {
              const on = draft.goals.has(g.id);
              const other = g.facetId && (!facet || g.facetId !== facet.id) ? getFacet(g.facetId) : null;
              return `<button class="list-row pick ${on ? 'on' : ''}" data-pick="${g.id}" aria-pressed="${on}">
                <span class="lr-emoji">${esc(g.emoji)}</span>
                <div class="lr-body"><div class="lr-title">${esc(g.title)}</div>
                  <div class="lr-sub">${on && other ? `Se moverá desde ${esc(other.emoji)} ${esc(other.name)}` : other ? `Ahora en ${esc(other.emoji)} ${esc(other.name)}` : g.facetId && facet && g.facetId === facet.id ? (on ? 'En esta faceta' : 'Saldrá de esta faceta') : on ? 'Se añadirá a esta faceta' : 'Sin faceta'}${g.archivedAt ? ' · archivado' : ''}</div></div>
                <span class="pick-box">${on ? icons.check : ''}</span>
              </button>`;
            }).join('')}</div>
            <div class="hint">Al cambiar un objetivo de faceta conserva todo su historial.</div>`;
          })()}
        </div>
        <div class="row-actions">
          <button class="btn block" data-save>${editing ? 'Guardar cambios' : 'Crear faceta'}</button>
          ${editing ? `<button class="btn danger block" data-delete>${icons.trash} Eliminar faceta</button>
            <div class="hint">Al eliminarla, sus objetivos se quedan "sin faceta"; no se pierde ningún dato.</div>` : ''}
        </div>`;
      const name = body.querySelector('#f-name');
      const save = body.querySelector('[data-save]');
      const validate = () => { save.disabled = !draft.name.trim(); };
      name.addEventListener('input', () => {
        draft.name = name.value;
        body.querySelector('.facet-preview').innerHTML = `<span>${esc(draft.emoji)}</span>${esc(draft.name || 'Nombre de la faceta')}`;
        validate();
      });
      body.querySelectorAll('[data-emoji]').forEach((b) => b.addEventListener('click', () => { draft.emoji = b.dataset.emoji; api.rerender(); }));
      body.querySelectorAll('[data-color]').forEach((b) => b.addEventListener('click', () => { draft.color = b.dataset.color; api.rerender(); }));
      body.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => {
        const id = b.dataset.pick;
        if (draft.goals.has(id)) draft.goals.delete(id); else draft.goals.add(id);
        api.rerender();
      }));
      validate();
      save.addEventListener('click', () => {
        let f;
        if (editing) { updateFacet(facet.id, { name: draft.name.trim(), emoji: draft.emoji, color: draft.color }); f = facet; toast('Faceta guardada'); }
        else { f = addFacet({ name: draft.name, emoji: draft.emoji, color: draft.color }); toast(`${draft.emoji} Faceta creada`); }
        // meter / sacar objetivos (solo cambia su faceta; su historial se mantiene)
        for (const g of getState().goals) {
          if (draft.goals.has(g.id) && g.facetId !== f.id) updateGoal(g.id, { facetId: f.id });
          else if (!draft.goals.has(g.id) && g.facetId === f.id) updateGoal(g.id, { facetId: null });
        }
        sheet.close();
        onDone && onDone(f);
      });
      body.querySelector('[data-delete]')?.addEventListener('click', () => {
        if (confirmDialog(`¿Eliminar la faceta «${facet.name}»? Sus objetivos se quedarán sin faceta.`)) {
          deleteFacet(facet.id);
          toast('Faceta eliminada');
          sheet.close();
          onDone && onDone(null);
        }
      });
      if (!editing && !draft.name) setTimeout(() => name.focus({ preventScroll: true }), 380);
    },
  });
}

return { scheduleLabel, flexProgressLabel, flexMet, amountLabel, priorityDots, moodPicker, openGospelSheet, openJournal, openDaySheet, openGoalDetail, openGoalEditor, openSettingsSheet, openQuotesSheet, openAmountSheet, openFacetsSheet, openFacetEditor };
})();
// ---- views/home.js ----
__m['views/home.js'] = (function () {
// Inicio: Evangelio, frase del día, tu día (objetivos + ánimo) y diario.

const { getState, plannedGoals, getLog, setMood } = __m['store.js'];
const { todayKey, formatLong, capitalize } = __m['dates.js'];
const { getGospel, getCachedGospel, SOURCES } = __m['gospel.js'];
const { quoteFor } = __m['quotes.js'];
const { currentStreak, dayStats } = __m['stats.js'];
const { esc, icons, moodFor, ringSvg, toast } = __m['ui.js'];
const { openGospelSheet, openJournal, openSettingsSheet, openQuotesSheet, openGoalEditor, moodPicker } = __m['sheets.js'];

function greeting(name) {
  const h = new Date().getHours();
  const base = h >= 6 && h < 13 ? 'Buenos días' : h >= 13 && h < 21 ? 'Buenas tardes' : 'Buenas noches';
  return name ? `${base}, ${name}` : base;
}

function gospelCard(g, read) {
  if (!g) {
    return `<button class="gospel-hero" data-gospel>
      <div class="gh-kicker">${icons.book}<span>Evangelio de hoy</span></div>
      <div class="skeleton" style="height:22px;width:80%;margin-top:12px"></div>
      <div class="skeleton" style="height:14px;margin-top:14px"></div>
      <div class="skeleton" style="height:14px;width:90%;margin-top:8px"></div>
    </button>`;
  }
  const src = SOURCES[g.source] || SOURCES.evangeliodeldia;
  const heading = g.title || capitalize(g.liturgicDay || 'Evangelio del día');
  const excerpt = g.text.replace(/\n/g, ' ');
  return `<button class="gospel-hero" data-gospel>
    <div class="gh-kicker">${icons.book}<span>Evangelio de hoy · ${esc(g.reference)}</span></div>
    <h2 class="gh-title">${esc(heading)}</h2>
    ${g.title && g.liturgicDay ? `<div class="gh-litur">${esc(g.liturgicDay)}</div>` : ''}
    <p class="gh-excerpt">${esc(excerpt)}</p>
    <div class="gh-foot">
      <span class="gh-cta">Leer el Evangelio ${icons.chevronRight}</span>
      ${read ? `<span class="badge ok">${icons.check} Leído · +1 pt</span>` : `<span class="badge bonus">+1 punto extra</span>`}
    </div>
  </button>`;
}

function render(root, ctx) {
  const s = getState();
  const today = todayKey();
  const log = getLog(today);
  const g = getCachedGospel(today);
  const q = quoteFor(today, s.quotes);
  const goals = plannedGoals(today);
  const hasGoals = s.goals.some((g) => !g.archivedAt);
  const dsToday = dayStats(today);
  const done = dsToday.done;
  const ratio = dsToday.ratio || 0;
  const streak = currentStreak();
  const hour = new Date().getHours();
  const m = moodFor(log.mood);
  const note = (log.note || '').trim();

  root.innerHTML = `
    <header class="page-head">
      <div>
        <div class="eyebrow">${esc(capitalize(formatLong(today)))}</div>
        <h1 class="page-title">${esc(greeting(s.settings.name))}</h1>
      </div>
      <button class="icon-btn" data-settings aria-label="Ajustes">${icons.settings}</button>
    </header>

    <section class="section">
      ${gospelCard(g, log.gospelRead)}
    </section>

    <section class="section">
      <div class="quote-card">
        <div class="qc-head"><span>Frase del día</span>
          <button class="qc-share" data-share aria-label="Compartir frase">${icons.share}</button></div>
        <p class="qc-text">${esc(q.t)}</p>
        <div class="qc-foot">
          <div class="qc-author">${esc(q.a || '')}</div>
          <button class="qc-manage" data-quotes>${icons.quote}<span>Mis frases</span></button>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Tu día</h2>
      <div class="card day-card">
        <button class="day-goals" data-go-goals>
          <div class="ring sm">${ringSvg(52, 6, ratio, ratio >= 1 ? 'var(--success)' : 'var(--accent)')}
            <div class="ring-val">${goals.length ? `${done}/${goals.length}` : hasGoals ? '—' : icons.plus}</div></div>
          <div class="dg-body">
            <div class="dg-title">${!hasGoals ? 'Crea tu primer objetivo' : goals.length ? (done === goals.length ? '¡Objetivos de hoy cumplidos!' : `${goals.length - done} ${goals.length - done === 1 ? 'objetivo pendiente' : 'objetivos pendientes'}`) : 'Hoy no tienes objetivos fijos'}</div>
            <div class="dg-sub">${!hasGoals ? 'Diarios, ciertos días o flexibles' : streak ? `🔥 ${streak} ${streak === 1 ? 'día' : 'días'} de racha` : 'Empieza hoy tu racha'}${dsToday.flexPts ? ` · +${Math.round(dsToday.flexPts * 10) / 10} pts extra` : ''}</div>
          </div>
          <span class="chev">${icons.chevronRight}</span>
        </button>
        <div class="divider"></div>
        <div class="mood-block ${!log.mood && hour >= 20 ? 'attention' : ''}">
          <div class="mb-head">
            <h3>¿Cómo te sientes hoy?</h3>
            ${m ? `<span class="muted">${m.label}</span>` : `<span class="muted">${hour >= 19 ? 'Antes de dormir' : 'Al final del día'}</span>`}
          </div>
          ${moodPicker(log.mood)}
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Diario</h2>
      <button class="card journal-card ${note ? '' : 'empty-journal'}" data-journal>
        ${note
          ? `<p class="jc-text">${esc(note)}</p><span class="jc-more">${icons.edit} Seguir escribiendo</span>`
          : `<span class="jc-icon">${icons.pen}</span>
             <div><div class="jc-title">¿Qué te ha dejado el día de hoy?</div>
             <div class="muted">Un espacio libre para ti y para tu yo del futuro.</div></div>`}
      </button>
    </section>
  `;

  root.onclick = async (e) => {
    const t = e.target.closest('button');
    if (!t) return;
    if (t.dataset.mood) {
      setMood(today, Number(t.dataset.mood));
      const nm = moodFor(getLog(today).mood);
      if (nm) toast(`${nm.emoji} Ánimo guardado`);
      return render(root, ctx);
    }
    if ('gospel' in t.dataset) return openGospelSheet(today, () => render(root, ctx));
    if ('journal' in t.dataset) return openJournal(today, () => render(root, ctx));
    if ('settings' in t.dataset) return openSettingsSheet(() => ctx.refresh());
    if ('quotes' in t.dataset) return openQuotesSheet(() => render(root, ctx));
    if ('goGoals' in t.dataset) {
      ctx.go('goals');
      if (!hasGoals) openGoalEditor(null, () => ctx.refresh());
      return;
    }
    if ('share' in t.dataset) {
      const text = `«${q.t}»${q.a ? ` — ${q.a}` : ''}`;
      try {
        if (navigator.share) await navigator.share({ text });
        else { await navigator.clipboard.writeText(text); toast('Frase copiada'); }
      } catch { /* cancelado */ }
    }
  };

  if (!g) {
    getGospel(today)
      .then(() => { if (ctx.tab === 'home') render(root, ctx); })
      .catch(() => {
        const hero = root.querySelector('.gospel-hero');
        if (hero) hero.innerHTML = `<div class="gh-kicker">${icons.book}<span>Evangelio de hoy</span></div>
          <h2 class="gh-title">Sin conexión</h2><p class="gh-excerpt">Toca para volver a intentarlo.</p>`;
      });
  }
}

return { render };
})();
// ---- views/goals.js ----
__m['views/goals.js'] = (function () {
// Objetivos: marcar los del día (agrupados por faceta), lista de objetivos con su evolución
// y acceso al detalle y a la gestión de facetas.

const { getState, plannedGoals, getLog, toggleGoal, goalProgress, isQuantity, isFlex, flexGoals, goalPoints } = __m['store.js'];
const { todayKey, addDays, startOfWeek, formatLong, fromKey, WEEKDAY_SHORT, capitalize, startOfMonth, endOfMonth, } = __m['dates.js'];
const { dayStats, goalDayStatus, goalRangeStats, goalStreak, rangeStats } = __m['stats.js'];
const { esc, icons, ringSvg, toast, confetti, pct, fmtPts } = __m['ui.js'];
const { openGoalEditor, openGoalDetail, scheduleLabel, openAmountSheet, openFacetsSheet, amountLabel, priorityDots, flexProgressLabel, flexMet, } = __m['sheets.js'];

let selected = todayKey();
let weekStart = startOfWeek(selected);
let showArchived = false;

function resetSelection() {
  selected = todayKey();
  weekStart = startOfWeek(selected);
}

function dayTitle(key, today) {
  const diff = Math.round((fromKey(key) - fromKey(today)) / 86400000);
  if (diff === 0) return 'Hoy';
  if (diff === -1) return 'Ayer';
  if (diff === 1) return 'Mañana';
  return capitalize(formatLong(key));
}

function trail(goalId, today) {
  let out = '';
  for (let i = 13; i >= 0; i--) out += `<i class="tr st-${goalDayStatus(goalId, addDays(today, -i))}"></i>`;
  return out;
}

/** Agrupa objetivos por faceta, en el orden de las facetas; "Sin faceta" al final. */
function groupByFacet(goals) {
  const s = getState();
  const groups = s.facets.slice().sort((a, b) => a.order - b.order)
    .map((f) => ({ facet: f, goals: goals.filter((g) => g.facetId === f.id) }))
    .filter((x) => x.goals.length);
  const loose = goals.filter((g) => !g.facetId || !s.facets.some((f) => f.id === g.facetId));
  if (loose.length) groups.push({ facet: null, goals: loose });
  return groups;
}

function facetHeader(facet, extra = '') {
  if (!facet) return `<div class="facet-head"><span class="fh-name">📌 Sin faceta</span>${extra}</div>`;
  return `<div class="facet-head" style="--fc:${facet.color}"><span class="fh-bar"></span><span class="fh-name">${esc(facet.emoji)} ${esc(facet.name)}</span>${extra}</div>`;
}

function render(root, ctx) {
  const s = getState();
  const today = todayKey();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(selected)) resetSelection();
  const log = getLog(selected);
  const planned = plannedGoals(selected);
  const flexible = flexGoals(selected);
  const dsSel = dayStats(selected);
  const future = selected > today;
  const active = s.goals.filter((g) => !g.archivedAt).sort((a, b) => a.order - b.order);
  const archived = s.goals.filter((g) => g.archivedAt);
  const useGroups = s.facets.length > 0;

  const week = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)).map((k) => {
    const ds = dayStats(k);
    const fut = k > today;
    const ratio = fut || (k === today && ds.ptsDone === 0) ? 0 : ds.ratio || 0;
    const cls = ['day-btn', k === today ? 'today' : '', k === selected ? 'selected' : '', fut ? 'future' : ''].join(' ');
    return `<button class="${cls}" data-day="${k}" aria-label="${esc(formatLong(k))}">
      <span class="dname">${WEEKDAY_SHORT[fromKey(k).getDay()]}</span>
      <span class="dring">${ringSvg(34, 3, ratio, ratio >= 1 ? 'var(--success)' : 'var(--accent)', 'var(--surface-3)')}<span class="dnum">${fromKey(k).getDate()}</span></span>
    </button>`;
  }).join('');

  const checkRow = (g) => {
    const f = goalProgress(g, log.done[g.id]);
    const d = f >= 1;
    return `<button class="goal ${d ? 'done' : ''} ${f > 0 && f < 1 ? 'is-partial' : ''}" data-toggle="${g.id}" ${future ? 'disabled' : ''} aria-pressed="${d}">
      <span class="g-emoji">${esc(g.emoji)}</span>
      <span class="g-body"><div class="g-title">${esc(g.title)}</div>
        <div class="g-sub">${priorityDots(g)}${isQuantity(g) ? ` ${esc(amountLabel(g, log.done[g.id]))}` : ''}</div>
        ${isQuantity(g) && f > 0 && f < 1 ? `<div class="g-bar"><i style="width:${f * 100}%"></i></div>` : ''}</span>
      <span class="check" style="--f:${f}">${d ? icons.check : f > 0 ? `<small>${Math.round(f * 100)}</small>` : isQuantity(g) ? icons.plus : icons.check}</span>
    </button>`;
  };

  // Flexibles: se marcan el día que se hacen; muestran cómo van en su semana/mes
  const flexRow = (g) => {
    const f = goalProgress(g, log.done[g.id]);
    const d = f >= 1;
    const met = flexMet(g, selected);
    return `<button class="goal ${d ? 'done' : ''} ${f > 0 && f < 1 ? 'is-partial' : ''}" data-toggle="${g.id}" ${future ? 'disabled' : ''} aria-pressed="${d}">
      <span class="g-emoji">${esc(g.emoji)}</span>
      <span class="g-body"><div class="g-title">${esc(g.title)}</div>
        <div class="g-sub">${priorityDots(g)} <span class="flex-tag ${met ? 'met' : ''}">${met ? '✓ ' : ''}${esc(flexProgressLabel(g, selected))}</span>${d ? ` · +${Math.round(goalPoints(g) * f * 10) / 10} pts` : ''}${isQuantity(g) ? ` ${esc(amountLabel(g, log.done[g.id]))}` : ''}</div></span>
      <span class="check" style="--f:${f}">${d ? icons.check : f > 0 ? `<small>${Math.round(f * 100)}</small>` : isQuantity(g) ? icons.plus : icons.check}</span>
    </button>`;
  };
  const flexCard = flexible.length ? `
    <div class="section-row flex-head"><h2 class="section-title">Cuando quieras</h2><span class="meta">${dsSel.flexPts ? `+${Math.round(dsSel.flexPts * 10) / 10} pts extra` : 'Suman puntos extra'}</span></div>
    <div class="card list-card">${flexible.map(flexRow).join('')}</div>` : '';

  let checklist;
  if (planned.length) {
    const body = useGroups
      ? groupByFacet(planned).map((gr) => facetHeader(gr.facet) + gr.goals.map(checkRow).join('')).join('')
      : planned.map(checkRow).join('');
    checklist = `<div class="card list-card">
        <div class="progress-line"><div style="width:${(dsSel.ratio || 0) * 100}%"></div></div>
        ${body}
      </div>
      ${future ? '<p class="hint center">Podrás marcarlos cuando llegue el día.</p>' : ''}`;
  } else if (active.length) {
    checklist = flexible.length ? '<p class="hint">Hoy no hay objetivos con día fijo.</p>'
      : `<div class="card empty small"><div class="e-icon">🌿</div><p>No hay objetivos programados para este día.</p></div>`;
  } else {
    checklist = `<div class="card empty"><div class="e-icon">🎯</div><h3>Crea tu primer objetivo</h3>
      <p>Define lo que quieres cumplir cada día o ciertos días de la semana.</p>
      <button class="btn" data-new>${icons.plus} Añadir objetivo</button></div>`;
  }

  const goalRow = (g) => {
    const m = goalRangeStats(g.id, startOfMonth(today), endOfMonth(today));
    const streak = goalStreak(g.id);
    // flexibles: en vez del % del mes, cómo van en su semana/mes ("2/3") o cuántas veces este mes (libres)
    const flex = isFlex(g);
    const [big, small] = !flex ? [`${fmtPts(m.frac * goalPoints(g))} pts`, 'este mes']
      : flexProgressLabel(g, today).replace(/^(\S+)\s(.*)$/, '$1|$2').split('|');
    return `<button class="goal-row" data-detail="${g.id}">
      <span class="g-emoji">${esc(g.emoji)}</span>
      <div class="gr-body">
        <div class="gr-top"><span class="gr-title">${esc(g.title)}</span><span class="gr-pct">${esc(big)}</span></div>
        <div class="gr-sub"><span>${priorityDots(g)} ${esc(scheduleLabel(g))}${streak ? ` · 🔥 ${streak}` : ''}</span><span class="gr-month">${esc(small)}</span></div>
        <div class="trail" aria-hidden="true">${trail(g.id, today)}</div>
      </div>
      <span class="chev">${icons.chevronRight}</span>
    </button>`;
  };

  const myGoals = useGroups
    ? groupByFacet(active).map((gr) => {
      const id = gr.facet ? gr.facet.id : '__none';
      const r = rangeStats(startOfMonth(today), endOfMonth(today), { facetId: id });
      return `<div class="card list-card facet-card">${facetHeader(gr.facet, `<span class="fh-pct">${fmtPts(r.ptsDone)} pts</span>`)}${gr.goals.map(goalRow).join('')}</div>`;
    }).join('')
    : `<div class="card list-card">${active.map(goalRow).join('')}</div>`;

  root.innerHTML = `
    <header class="page-head">
      <div>
        <div class="eyebrow">Objetivos</div>
        <h1 class="page-title">${esc(dayTitle(selected, today))}</h1>
      </div>
      <div class="head-actions">
        <button class="icon-btn" data-facets aria-label="Facetas">${icons.folder}</button>
        <button class="icon-btn accent" data-new aria-label="Nuevo objetivo">${icons.plus}</button>
      </div>
    </header>

    <div class="week">
      <button class="week-nav" data-week="-1" aria-label="Semana anterior">${icons.chevronLeft}</button>
      <div class="week-days">${week}</div>
      <button class="week-nav" data-week="1" aria-label="Semana siguiente">${icons.chevronRight}</button>
    </div>

    <section class="section">
      <div class="section-row">
        <h2 class="section-title">${selected === today ? 'Para hoy' : 'Ese día'}</h2>
        ${planned.length ? `<span class="meta">${dsSel.done} de ${planned.length} · ${fmtPts(dsSel.ptsDone)} de ${fmtPts(dsSel.pts)} pts</span>` : ''}
      </div>
      ${checklist}
      ${flexCard}
    </section>

    ${active.length ? `
    <section class="section">
      <div class="section-row"><h2 class="section-title">Mis objetivos</h2><span class="meta">Últimos 14 días</span></div>
      ${myGoals}
      <div class="chart-legend">
        <span><i class="lg done"></i>Cumplido</span><span><i class="lg partial"></i>A medias</span><span><i class="lg missed"></i>No cumplido</span><span><i class="lg off"></i>No tocaba</span>
        <span>${priorityDots({ priority: 'high' })} Prioridad</span>
      </div>
      ${!s.facets.length ? `<button class="tip-card" data-facets>
        <span>📁</span><div><b>Agrupa tus objetivos en facetas</b>Fe, Ejercicio, Finanzas… y compáralas en Progreso.</div>${icons.chevronRight}
      </button>` : ''}
    </section>` : ''}

    ${archived.length ? `
    <section class="section">
      <button class="disclosure" data-archived>${showArchived ? icons.chevronUp : icons.chevronDown}<span>Archivados (${archived.length})</span></button>
      ${showArchived ? `<div class="card list-card">${archived.map(goalRow).join('')}</div>` : ''}
    </section>` : ''}
  `;

  root.onclick = (e) => {
    const t = e.target.closest('button');
    if (!t) return;
    const rerender = () => render(root, ctx);
    if (t.dataset.toggle) {
      const g = s.goals.find((x) => x.id === t.dataset.toggle);
      const before = dayStats(selected);
      const celebrate = () => {
        const after = dayStats(selected);
        if (after.ratio >= 1 && (before.ratio || 0) < 1) {
          confetti();
          toast(selected === today ? '🎉 ¡Todos los objetivos de hoy cumplidos!' : '🎉 ¡Día completado!');
        }
      };
      if (isQuantity(g)) {
        openAmountSheet(selected, g, () => { rerender(); celebrate(); });
        return;
      }
      const nowDone = toggleGoal(selected, g.id);
      rerender();
      if (nowDone) root.querySelector(`[data-toggle="${g.id}"]`)?.classList.add('pop');
      celebrate();
      return;
    }
    if (t.dataset.day) { selected = t.dataset.day; return rerender(); }
    if (t.dataset.week) {
      weekStart = addDays(weekStart, 7 * Number(t.dataset.week));
      const inWeek = today >= weekStart && today <= addDays(weekStart, 6);
      selected = inWeek ? today : weekStart;
      return rerender();
    }
    if ('new' in t.dataset) return openGoalEditor(null, rerender);
    if ('facets' in t.dataset) return openFacetsSheet(rerender);
    if (t.dataset.detail) return openGoalDetail(t.dataset.detail, rerender);
    if ('archived' in t.dataset) { showArchived = !showArchived; return rerender(); }
  };
}

return { resetSelection, render };
})();
// ---- wrapped.js ----
__m['wrapped.js'] = (function () {
// "Tu año con Dios": resumen anual en pantallas tipo historias (toca para avanzar).

const { getState, goalPoints } = __m['store.js'];
const { todayKey, eachDay, minKey, maxKey, endOfMonth, MONTH_NAMES, capitalize } = __m['dates.js'];
const { rangeStats, goalRangeStats, facetStats, dayStats, isAchieved } = __m['stats.js'];
const { quoteFor } = __m['quotes.js'];
const { esc, icons, moodFor, toast } = __m['ui.js'];

const STOP = new Set(('para pero como este esta esto estos estas porque cuando donde desde hasta sobre entre ' +
  'tengo tiene tienen hemos habia había hacer hecho haber todo toda todos todas mucho mucha muchos muchas ' +
  'poco poca algo nada cada otra otro otros otras mismo misma bien solo sólo también tambien ahora luego ' +
  'después despues antes siempre nunca aunque entonces mientras porqué quiero puedo estoy estado estaba ' +
  'sido será sera muy más mas menos ellos ellas nosotros vosotros usted ustedes suyo suya mios mías mias ' +
  'tuyo tuya hoy ayer mañana manana día dias días vez veces había habían que con por los las del una unos unas').split(' '));

function computeYear(year) {
  const s = getState();
  const today = todayKey();
  const from = maxKey(`${year}-01-01`, s.startDate);
  const to = minKey(`${year}-12-31`, today);
  if (from > to) return null;
  const st = rangeStats(from, to);

  // días en los que usaste la app
  let used = 0;
  let words = 0;
  let entries = 0;
  const freq = new Map();
  for (const [k, l] of Object.entries(s.logs)) {
    if (k < from || k > to) continue;
    const active = Object.keys(l.done || {}).length || l.mood || (l.note && l.note.trim()) || l.gospelRead;
    if (active) used++;
    if (l.note && l.note.trim()) {
      entries++;
      const ws = l.note.toLowerCase().normalize('NFC').match(/[a-záéíóúñü]+/g) || [];
      words += ws.length;
      for (const w of ws) if (w.length >= 4 && !STOP.has(w)) freq.set(w, (freq.get(w) || 0) + 1);
    }
  }
  const topWords = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).filter(([, n]) => n >= 2).map(([w]) => w);

  // mejor racha del año
  let best = 0, run = 0;
  for (const k of eachDay(from, to)) {
    const ds = dayStats(k);
    if (!ds.pts) continue;
    if (isAchieved(ds)) { run++; best = Math.max(best, run); } else if (k !== today) run = 0;
  }

  // objetivo estrella (constancia, con un mínimo de días)
  const goals = s.goals.map((g) => ({ g, ...goalRangeStats(g.id, from, to) })).filter((x) => x.planned >= 5 || (x.flex && x.count > 0));
  // la estrella pondera constancia × importancia (prioridad), para que destaquen los objetivos importantes
  goals.forEach((x) => { x.ptsWon = x.flex ? x.pts : x.frac * goalPoints(x.g); });
  // la estrella: el objetivo que más puntos te dio en el año
  const star = goals.sort((a, b) => (b.ptsWon - a.ptsWon) || (b.done - a.done))[0] || null;
  const most = s.goals.map((g) => ({ g, ...goalRangeStats(g.id, from, to) })).sort((a, b) => b.done - a.done)[0] || null;

  // meses
  const months = [];
  for (let m = 0; m < 12; m++) {
    const m0 = `${year}-${String(m + 1).padStart(2, '0')}-01`;
    if (m0 > to || endOfMonth(m0) < from) continue;
    const r = rangeStats(m0, endOfMonth(m0));
    months.push({ m, rate: r.rate, pts: r.ptsDone, mood: r.moodAvg, moodCount: r.moodCount });
  }
  const bestMonth = months.filter((x) => x.pts > 0).sort((a, b) => b.pts - a.pts)[0] || null;
  const happyMonth = months.filter((x) => x.moodCount >= 3).sort((a, b) => b.mood - a.mood)[0] || null;

  const facets = facetStats(from, to).filter((x) => (x.pts > 0 || x.ptsDone > 0) && x.facet.id !== '__none').sort((a, b) => b.ptsDone - a.ptsDone);

  const mine = s.quotes.filter((q) => q.mine);
  const quote = mine.length ? mine[Math.floor(Math.random() * mine.length)] : quoteFor(to, s.quotes);

  return {
    year, from, to, partial: to < `${year}-12-31`, name: s.settings.name, st, used, best,
    star, most, bestMonth, happyMonth, facets, entries, words, topWords, quote,
    days: st.days,
  };
}

function slidesFor(d) {
  const S = [];
  const ptsS = (n) => `${String(Math.round((n || 0) * 10) / 10).replace('.', ',')} pts`;
  S.push({ bg: 'g1', html: `
    <div class="ws-kicker">${d.partial ? 'Hasta hoy' : 'Tu resumen'}</div>
    <h1 class="ws-title">${esc(d.name || 'Tu')}${d.name ? ',' : ''} este es tu <span>${d.year}</span> con Dios</h1>
    <p class="ws-text">Un repaso a lo que has vivido, cumplido y rezado este año.</p>
    <div class="ws-hint">Toca para continuar</div>` });

  if (!d.used && !d.st.pts) {
    S.push({ bg: 'g2', html: `<h2 class="ws-h">Aún no hay datos de ${d.year}</h2><p class="ws-text">Vuelve cuando lleves un tiempo usando GodPole.</p>` });
    return S;
  }

  S.push({ bg: 'g2', html: `
    <div class="ws-kicker">Tu camino</div>
    <div class="ws-big">${d.used}</div>
    <h2 class="ws-h">${d.used === 1 ? 'día caminando' : 'días caminando'} con GodPole</h2>
    <div class="ws-stats">
      <div><b>${d.st.done}</b><span>objetivos cumplidos</span></div>
      <div><b>${Math.round(d.st.ptsDone)}</b><span>puntos conseguidos</span></div>
    </div>` });

  S.push({ bg: 'g3', html: `
    <div class="ws-kicker">Tus puntos</div>
    <div class="ws-big">${ptsS(d.st.ptsDone)}</div>
    <h2 class="ws-h">conseguidos este año${d.st.bonus ? ` (+${ptsS(d.st.bonus)} extra)` : ''}</h2>
    <div class="ws-stats">
      <div><b>${d.st.achievedDays}</b><span>días logrados</span></div>
      <div><b>${d.st.perfectDays}</b><span>días perfectos</span></div>
      <div><b>🔥 ${d.best}</b><span>mejor racha</span></div>
    </div>` });

  if (d.star) {
    S.push({ bg: 'g4', html: `
      <div class="ws-kicker">Tu objetivo estrella</div>
      <div class="ws-emoji">${esc(d.star.g.emoji)}</div>
      <h2 class="ws-h">${esc(d.star.g.title)}</h2>
      <p class="ws-text">Te dio <b>${ptsS(d.star.ptsWon)}</b>${d.star.done ? ` (${d.star.done} ${d.star.done === 1 ? 'vez' : 'veces'})` : ''}.</p>
      ${d.most && d.most.g.id !== d.star.g.id && d.most.done ? `<p class="ws-sub">El que más veces cumpliste: ${esc(d.most.g.emoji)} ${esc(d.most.g.title)} · ${d.most.done} veces</p>` : ''}` });
  }

  if (d.facets.length) {
    const top = d.facets[0];
    const low = d.facets.length > 1 ? d.facets[d.facets.length - 1] : null;
    S.push({ bg: 'g5', html: `
      <div class="ws-kicker">Las facetas de tu vida</div>
      <div class="ws-emoji">${esc(top.facet.emoji)}</div>
      <h2 class="ws-h">${esc(top.facet.name)} fue tu faceta más fuerte</h2>
      <p class="ws-text">${ptsS(top.ptsDone)} conseguidos.</p>
      <div class="ws-bars">${d.facets.map((x) => `<div class="wsb"><span>${esc(x.facet.emoji)} ${esc(x.facet.name)}</span><i><em style="width:${(x.ptsDone / Math.max(1, top.ptsDone)) * 100}%;background:${x.facet.color}"></em></i><b>${ptsS(x.ptsDone)}</b></div>`).join('')}</div>
      ${low && low.facet.id !== top.facet.id ? `<p class="ws-sub">Para el año que viene: cuida un poco más <b>${esc(low.facet.emoji)} ${esc(low.facet.name)}</b>.</p>` : ''}` });
  }

  if (d.bestMonth || d.happyMonth) {
    const hm = d.happyMonth ? moodFor(d.happyMonth.mood) : null;
    S.push({ bg: 'g6', html: `
      <div class="ws-kicker">Tus mejores meses</div>
      ${d.bestMonth ? `<h2 class="ws-h">${capitalize(MONTH_NAMES[d.bestMonth.m])}</h2><p class="ws-text">fue tu mes con más puntos: <b>${ptsS(d.bestMonth.pts)}</b>.</p>` : ''}
      ${d.happyMonth ? `<div class="ws-emoji">${hm.emoji}</div><p class="ws-text">${d.bestMonth && d.bestMonth.m === d.happyMonth.m ? 'Y también' : 'Tu mes más feliz fue'} <b>${MONTH_NAMES[d.happyMonth.m]}</b>${d.bestMonth && d.bestMonth.m === d.happyMonth.m ? ' tu mes más feliz' : ''}, con un ánimo medio de <b>${d.happyMonth.mood.toFixed(1).replace('.', ',')}</b>.</p>` : ''}
      ${d.st.moodAvg ? `<p class="ws-sub">Ánimo medio del año: ${moodFor(d.st.moodAvg).emoji} ${d.st.moodAvg.toFixed(1).replace('.', ',')}</p>` : ''}` });
  }

  S.push({ bg: 'g7', html: `
    <div class="ws-kicker">La Palabra</div>
    <div class="ws-emoji">📖</div>
    <div class="ws-big">${d.st.gospelDays}</div>
    <h2 class="ws-h">${d.st.gospelDays === 1 ? 'día leíste' : 'días leíste'} el Evangelio</h2>
    <p class="ws-text">${d.days ? `El ${Math.round((d.st.gospelDays / d.days) * 100)}% de los días.` : ''} «Lámpara es tu palabra para mis pasos».</p>` });

  if (d.entries) {
    S.push({ bg: 'g8', html: `
      <div class="ws-kicker">Tu diario</div>
      <div class="ws-big">${d.entries}</div>
      <h2 class="ws-h">${d.entries === 1 ? 'día escribiste' : 'días escribiste'} en tu diario</h2>
      <p class="ws-text">${d.words.toLocaleString('es-ES')} palabras para tu yo del futuro.</p>
      ${d.topWords.length ? `<div class="ws-words">${d.topWords.map((w) => `<span>${esc(w)}</span>`).join('')}</div><p class="ws-sub">Las palabras que más repetiste</p>` : ''}` });
  }

  S.push({ bg: 'g1', html: `
    <div class="ws-kicker">Para llevarte</div>
    <p class="ws-quote">«${esc(d.quote.t)}»</p>
    <p class="ws-sub">${esc(d.quote.a || '')}</p>
    <h2 class="ws-h small">Gracias por este año. Sigue caminando.</h2>
    <button class="ws-share" data-share>${icons.share} Compartir mi resumen</button>`, final: true });
  return S;
}

function shareText(d) {
  const lines = [
    `Mi ${d.year} con Dios (GodPole)`,
    `📅 ${d.used} días · ✅ ${d.st.done} objetivos cumplidos`,
    `⭐ ${String(Math.round(d.st.ptsDone * 10) / 10).replace('.', ',')} puntos · 🔥 mejor racha ${d.best} días`,
    `📖 ${d.st.gospelDays} días leyendo el Evangelio`,
  ];
  if (d.star) lines.push(`⭐ Objetivo estrella: ${d.star.g.emoji} ${d.star.g.title}`);
  return lines.join('\n');
}

function openYearSummary(year) {
  const data = computeYear(String(year));
  const slides = data ? slidesFor(data) : [{ bg: 'g2', html: `<h2 class="ws-h">Aún no hay datos de ${esc(String(year))}</h2>` }];
  let i = 0;

  const el = document.createElement('div');
  el.className = 'wrapped';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  document.body.append(el);
  document.body.classList.add('sheet-open');

  const close = () => {
    el.classList.remove('show');
    document.removeEventListener('keydown', onKey);
    setTimeout(() => { el.remove(); if (!document.querySelector('.sheet')) document.body.classList.remove('sheet-open'); }, 300);
  };
  const draw = () => {
    const sl = slides[i];
    el.innerHTML = `
      <div class="ws-bg ${sl.bg}"></div>
      <div class="ws-top">
        <div class="ws-progress">${slides.map((_, j) => `<i class="${j < i ? 'past' : j === i ? 'now' : ''}"></i>`).join('')}</div>
        <button class="ws-close" data-close aria-label="Cerrar">${icons.x}</button>
      </div>
      <div class="ws-slide" key="${i}">${sl.html}</div>`;
  };
  const next = () => { if (i < slides.length - 1) { i++; draw(); } else close(); };
  const prev = () => { if (i > 0) { i--; draw(); } };
  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);

  el.addEventListener('click', async (e) => {
    if (e.target.closest('[data-close]')) return close();
    if (e.target.closest('[data-share]')) {
      const text = shareText(data);
      try {
        if (navigator.share) await navigator.share({ text });
        else { await navigator.clipboard.writeText(text); toast('Resumen copiado'); }
      } catch { /* cancelado */ }
      return;
    }
    const x = e.clientX / window.innerWidth;
    if (x < 0.3) prev(); else next();
  });

  draw();
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
}

return { openYearSummary };
})();
// ---- views/progress.js ----
__m['views/progress.js'] = (function () {
// Progreso: visión general, curva de cumplimiento (con detalle por punto), rueda, ánimo, calendario y diario.

const { getState, getLog, plannedIds, plannedGoals, goalProgress, goalPoints, isQuantity, GOSPEL_BONUS, isFlex } = __m['store.js'];
const { todayKey, addMonths, startOfMonth, endOfMonth, eachDay, fromKey, formatMonthYear, formatShort, capitalize, WEEK_ORDER, WEEKDAY_SHORT, MONTH_SHORT, diffDays, WEEKDAY_NAMES, minKey, maxKey, formatLong, } = __m['dates.js'];
const { rangeStats, currentStreak, bestStreak, periodRange, periodSeries, dayStats, goalDayStatus, goalRangeStats, moodSeries, facetStats, totalByYear, } = __m['stats.js'];
const { lineChart, bindLineCharts, moodChart, radarChart } = __m['charts.js'];
const { esc, icons, MOODS, moodFor, pct, ringSvg, fmtPts } = __m['ui.js'];
const { openYearSummary } = __m['wrapped.js'];
const { openDaySheet, openFacetsSheet, amountLabel } = __m['sheets.js'];

const PERIODS = [['month', 'Mes'], ['year', 'Año'], ['total', 'Total']];
let period = localStorage.getItem('godpole.period') || 'month';
if (!PERIODS.some(([p]) => p === period)) period = 'month';
let ref = todayKey();
let calRef = todayKey();
let goalFilter = 'all';
// El análisis se hace siempre en puntos (no en %): los flexibles y el Evangelio suman sin tope.
let metric = 'pts';

const MONTH_LETTER = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const r1 = (n) => Math.round(n * 10) / 10;

function isWrappedSeason() {
  const d = new Date();
  return d.getMonth() === 11 || (d.getMonth() === 0 && d.getDate() <= 15);
}
function wrappedYear() {
  const d = new Date();
  return String(d.getMonth() === 0 ? d.getFullYear() - 1 : d.getFullYear());
}

/**
 * Serie para la curva. Cada punto lleva su rango (from/to) para poder enseñar el detalle.
 *  pct  -> % de cumplimiento ponderado por prioridad (0..100)
 *  pts  -> puntos conseguidos;  plan -> puntos previstos
 * Con un objetivo concreto en la vista Mes los valores son acumulados (la línea diaria sería 0/100).
 */
function buildTrend(filter) {
  const s = getState();
  const today = todayKey();
  const goalId = filter.startsWith('g:') ? filter.slice(2) : null;
  const goal = goalId ? s.goals.find((g) => g.id === goalId) : null;
  const scope = filter.startsWith('f:') ? { facetId: filter.slice(2) } : null;
  const points = [];
  const pt = (label, title, from, to, r) => points.push({ label, title, from, to, ...r });
  const empty = { pct: null, pts: null, plan: null };

  const rangeVals = (from, to) => {
    if (goal && isFlex(goal)) {
      // flexible: % de semanas/meses con la meta cumplida (los libres no tienen %) y puntos extra sumados
      const r = goalRangeStats(goal.id, from, to);
      if (!r.count && !r.periods) return empty;
      return { pct: r.rate == null ? null : r1(r.rate * 100), pts: r1(r.pts), plan: r.planned ? r.planned * goalPoints(goal) : null };
    }
    if (goal) {
      const r = goalRangeStats(goal.id, from, to);
      const w = goalPoints(goal);
      return r.planned ? { pct: r1(r.rate * 100), pts: r1(r.frac * w), plan: r.planned * w } : empty;
    }
    const r = rangeStats(from, to, scope);
    return r.pts ? { pct: r1(r.rate * 100), pts: r1(r.ptsDone), plan: r.pts } : empty;
  };

  if (period === 'month') {
    let cF = 0, cP = 0;
    for (const k of eachDay(startOfMonth(ref), endOfMonth(ref))) {
      const label = String(fromKey(k).getDate());
      const title = capitalize(formatLong(k));
      if (k < s.startDate || k > today) { pt(label, title, k, k, empty); continue; }
      if (goal && isFlex(goal)) {
        pt(label, title, k, k, rangeVals(startOfMonth(ref), k)); // acumulado del mes hasta ese día
      } else if (goal) {
        const st = goalDayStatus(goal.id, k);
        const w = goalPoints(goal);
        if (st !== 'off' && st !== 'pending') { cP++; cF += goalProgress(goal, (getLog(k).done || {})[goal.id]); }
        pt(label, title, k, k, cP ? { pct: r1((cF / cP) * 100), pts: r1(cF * w), plan: cP * w } : empty);
      } else {
        const ds = dayStats(k, scope);
        const pendingToday = k === today && ds.ptsDone === 0; // el día en curso no "desploma" la curva
        pt(label, title, k, k, !ds.pts || pendingToday ? { ...empty, pts: ds.ptsDone ? r1(ds.ptsDone) : null, plan: ds.pts || null } : { pct: r1(ds.ratio * 100), pts: r1(ds.ptsDone), plan: ds.pts });
      }
    }
  } else if (period === 'total' && totalByYear()) {
    for (let y = Number(s.startDate.slice(0, 4)); y <= Number(today.slice(0, 4)); y++) {
      pt(String(y), String(y), `${y}-01-01`, `${y}-12-31`, rangeVals(`${y}-01-01`, `${y}-12-31`));
    }
  } else {
    const months = [];
    if (period === 'year') {
      for (let i = 0; i < 12; i++) months.push(`${ref.slice(0, 4)}-${String(i + 1).padStart(2, '0')}-01`);
    } else {
      let m = startOfMonth(s.startDate);
      while (m <= startOfMonth(today)) { months.push(m); m = addMonths(m, 1); }
    }
    months.forEach((m0, i) => {
      const d = fromKey(m0);
      const label = period === 'year' || months.length <= 12
        ? MONTH_LETTER[d.getMonth()]
        : (d.getMonth() === 0 || i === 0 ? `${MONTH_SHORT[d.getMonth()]} ${String(d.getFullYear()).slice(2)}` : MONTH_SHORT[d.getMonth()]);
      const title = capitalize(formatMonthYear(m0));
      pt(label, title, m0, endOfMonth(m0), m0 > today || endOfMonth(m0) < s.startDate ? empty : rangeVals(m0, endOfMonth(m0)));
    });
  }
  return points;
}

/** Cumplimiento (%) y media diaria de puntos de un rango, para comparar con el periodo anterior. */
function summary(filter, from, to) {
  const s = getState();
  const start = maxKey(from, s.startDate);
  const end = minKey(to, todayKey());
  if (start > end) return null;
  const days = diffDays(start, end) + 1;
  if (filter.startsWith('g:')) {
    const g = s.goals.find((x) => x.id === filter.slice(2));
    const r = goalRangeStats(filter.slice(2), start, end);
    if (r.flex) return r.count || r.periods ? { rate: r.rate, ptsDay: r.pts / days, pts: r.pts } : null;
    return r.planned ? { rate: r.rate, ptsDay: (r.frac * goalPoints(g)) / days, pts: r.frac * goalPoints(g) } : null;
  }
  const r = rangeStats(start, end, filter.startsWith('f:') ? { facetId: filter.slice(2) } : null);
  return r.pts ? { rate: r.rate, ptsDay: r.ptsDone / days, pts: r.ptsDone } : null;
}

/** Objetivos que entran en el filtro actual. */
function goalsForFilter(filter, list) {
  if (filter.startsWith('g:')) return list.filter((g) => g.id === filter.slice(2));
  if (filter.startsWith('f:')) {
    const f = filter.slice(2);
    return list.filter((g) => (f === '__none' ? !g.facetId : g.facetId === f));
  }
  return list;
}

const STATUS_ICON = { done: '✅', partial: '◐', missed: '✗', pending: '·', future: '·' };

/** Panel con el detalle del punto elegido: qué objetivos cumpliste ese día / mes / año. */
function detailHtml(point, filter, goalsList) {
  if (!point) return '';
  const today = todayKey();
  const head = `<div class="dt-head"><div><b>${esc(point.title)}</b>
      <span>${point.pts == null ? 'Sin datos' : `${fmtPts(point.pts)} pts${point.plan ? ` · ${fmtPts(point.plan)} previstos${point.pts > point.plan ? ' (con extra)' : ''}` : ' extra'}`}</span></div>
      ${point.from === point.to && point.from <= today ? `<button class="link-btn" data-day="${point.from}">Ver día</button>` : ''}</div>`;
  if (point.from > today) return `<div class="lc-detail">${head}<p class="muted">Aún no ha llegado.</p></div>`;

  if (point.from === point.to) {
    const k = point.from;
    const log = getLog(k);
    const goals = goalsForFilter(filter, plannedGoals(k));
    // el Evangelio es un extra que no pertenece a ninguna faceta: solo se muestra con "Todo"
    const gospelRow = filter === 'all' ? `<div class="dt-row bonus ${log.gospelRead ? 'st-done' : 'st-pending'}">
        <span class="dt-ico">${log.gospelRead ? '✅' : '·'}</span><span class="dt-emoji">📖</span>
        <span class="dt-name">Evangelio del día<small>Punto extra</small></span>
        <span class="dt-pts">${log.gospelRead ? `+${GOSPEL_BONUS}` : '0'}</span></div>` : '';
    const planSet = new Set(goals.map((g) => g.id));
    const flexRows = goalsForFilter(filter, getState().goals.filter((g) => isFlex(g) && !planSet.has(g.id) && (log.done || {})[g.id]))
      .map((g) => {
        const f = goalProgress(g, log.done[g.id]);
        return `<div class="dt-row bonus st-done"><span class="dt-ico">✅</span><span class="dt-emoji">${esc(g.emoji)}</span>
          <span class="dt-name">${esc(g.title)}<small>Flexible · punto extra</small></span>
          <span class="dt-pts">+${String(r1(goalPoints(g) * f)).replace('.', ',')}</span></div>`;
      }).join('');
    if (!goals.length) return `<div class="lc-detail">${head}${gospelRow || flexRows ? `<div class="dt-list">${flexRows}${gospelRow}</div>` : '<p class="muted">No había objetivos ese día.</p>'}</div>`;
    const rows = goals.map((g) => {
      const f = goalProgress(g, (log.done || {})[g.id]);
      const st = f >= 1 ? 'done' : f > 0 ? 'partial' : k === today ? 'pending' : 'missed';
      const w = goalPoints(g);
      return `<div class="dt-row st-${st}">
        <span class="dt-ico">${STATUS_ICON[st]}</span>
        <span class="dt-emoji">${esc(g.emoji)}</span>
        <span class="dt-name">${esc(g.title)}${isQuantity(g) ? `<small>${esc(amountLabel(g, (log.done || {})[g.id]))}</small>` : ''}</span>
        <span class="dt-pts">${String(r1(w * f)).replace('.', ',')}/${w}</span>
      </div>`;
    }).join('');
    return `<div class="lc-detail">${head}<div class="dt-list">${rows}${flexRows}${gospelRow}</div></div>`;
  }

  const all = goalsForFilter(filter, goalsList).map((g) => ({ g, ...goalRangeStats(g.id, point.from, point.to) }));
  const rows = all.filter((x) => !x.flex && x.planned > 0).sort((a, b) => (b.rate - a.rate) || (b.done - a.done));
  const unitOf = (x) => (x.every === 'week' ? ['semana', 'semanas'] : ['mes', 'meses']);
  const flexRange = all.filter((x) => x.flex && (x.count > 0 || x.periods > 0)).map((x) => `
    <button class="dt-row range bonus" data-goal-filter="g:${x.g.id}">
      <span class="dt-emoji">${esc(x.g.emoji)}</span>
      <span class="dt-name">${esc(x.g.title)}<small>${x.every ? `${x.periodsMet}/${x.periods} ${x.periods === 1 ? unitOf(x)[0] : unitOf(x)[1]} con la meta · ` : 'Libre · '}${String(r1(x.count)).replace('.', ',')} ${x.count === 1 ? 'vez' : 'veces'} · +${String(r1(x.pts)).replace('.', ',')} pts</small>${x.every ? `<i class="dt-bar"><em style="width:${(x.rate || 0) * 100}%"></em></i>` : ''}</span>
      <span class="dt-pts"><b>+${fmtPts(x.pts)} pts</b><small>${fmtPts(x.count)} ${x.count === 1 ? 'vez' : 'veces'}</small></span>
    </button>`).join('');
  const rs = filter === 'all' ? rangeStats(point.from, point.to) : null;
  const gospelRange = rs && rs.days ? `
    <div class="dt-row range bonus">
      <span class="dt-emoji">📖</span>
      <span class="dt-name">Evangelio leído<small>Punto extra · +${rs.gospelDays * GOSPEL_BONUS} ${rs.gospelDays * GOSPEL_BONUS === 1 ? "pt" : "pts"}</small><i class="dt-bar"><em style="width:${(rs.gospelDays / rs.days) * 100}%"></em></i></span>
      <span class="dt-pts"><b>+${fmtPts(rs.gospelDays * GOSPEL_BONUS)} pts</b><small>${rs.gospelDays}/${rs.days} días</small></span>
    </div>` : '';
  if (!rows.length && !gospelRange && !flexRange) return `<div class="lc-detail">${head}<p class="muted">Sin objetivos en este periodo.</p></div>`;
  return `<div class="lc-detail">${head}<div class="dt-list">${rows.map((x) => `
    <button class="dt-row range" data-goal-filter="g:${x.g.id}">
      <span class="dt-emoji">${esc(x.g.emoji)}</span>
      <span class="dt-name">${esc(x.g.title)}<i class="dt-bar"><em style="width:${(x.rate || 0) * 100}%"></em></i></span>
      <span class="dt-pts"><b>${fmtPts(x.frac * goalPoints(x.g))} pts</b><small>${x.done}/${x.planned} días</small></span>
    </button>`).join('')}${flexRange}${gospelRange}</div></div>`;
}

function goalsInRange(from, to) {
  // objetivos que tuvieron algún día programado en el rango (incluidos archivados)
  const s = getState();
  const ids = new Set();
  for (const k of eachDay(maxKey(from, s.startDate), minKey(to, todayKey()))) plannedIds(k).forEach((id) => ids.add(id));
  for (const g of s.goals) if (!g.archivedAt) ids.add(g.id);
  return s.goals.filter((g) => ids.has(g.id)).sort((a, b) => (!!a.archivedAt - !!b.archivedAt) || a.order - b.order);
}

function render(root, ctx) {
  const s = getState();
  const today = todayKey();
  const thr = s.settings.threshold;
  const { from, to } = periodRange(period, ref);
  const st = rangeStats(from, to);
  const streak = currentStreak();
  const best = bestStreak();
  const mood = moodFor(st.moodAvg);
  const pi = PERIODS.findIndex(([p]) => p === period);

  // navegación del periodo
  let navLabel;
  let canPrev = false;
  let canNext = false;
  if (period === 'month') {
    navLabel = capitalize(formatMonthYear(ref));
    canPrev = startOfMonth(ref) > startOfMonth(s.startDate);
    canNext = startOfMonth(ref) < startOfMonth(today);
  } else if (period === 'year') {
    navLabel = ref.slice(0, 4);
    canPrev = ref.slice(0, 4) > s.startDate.slice(0, 4);
    canNext = ref.slice(0, 4) < today.slice(0, 4);
  } else {
    const days = diffDays(s.startDate, today) + 1;
    navLabel = `Desde el ${formatShort(s.startDate)} · ${days} ${days === 1 ? 'día' : 'días'}`;
  }

  // 2) curva de puntos (estilo bolsa) con filtro por faceta u objetivo
  const goals = goalsInRange(from, to);
  const facets = s.facets.slice().sort((x, y) => x.order - y.order);
  if (goalFilter.startsWith('g:') && !goals.some((g) => g.id === goalFilter.slice(2))) goalFilter = 'all';
  if (goalFilter.startsWith('f:') && goalFilter !== 'f:__none' && !facets.some((f) => f.id === goalFilter.slice(2))) goalFilter = 'all';
  const trend = buildTrend(goalFilter);
  const single = goalFilter.startsWith('g:');
  const fg = single ? goals.find((g) => g.id === goalFilter.slice(2)) : null;
  const ff = goalFilter.startsWith('f:') ? (facets.find((f) => f.id === goalFilter.slice(2)) || { id: '__none', name: 'Sin faceta', emoji: '📌', color: '#94a3b8' }) : null;
  // faceta "activa" para la segunda fila de chips (la del objetivo elegido, si lo hay)
  const scopeFacet = ff ? ff.id : fg ? (fg.facetId || null) : null;

  const cur = summary(goalFilter, from, to);
  let compare = '';
  let lineColor = ff ? ff.color : 'var(--success)';
  if (period !== 'total' && cur) {
    const prevFrom = period === 'month' ? addMonths(startOfMonth(ref), -1) : `${Number(ref.slice(0, 4)) - 1}-01-01`;
    const prevTo = period === 'month' ? endOfMonth(prevFrom) : `${Number(ref.slice(0, 4)) - 1}-12-31`;
    const prev = summary(goalFilter, prevFrom, prevTo);
    const prevName = period === 'month' ? formatMonthYear(prevFrom).split(' ')[0] : prevFrom.slice(0, 4);
    if (prev) {
      if (metric === 'pct' && cur.rate != null && prev.rate != null) {
        const d = Math.round((cur.rate - prev.rate) * 100);
        if (d < 0) lineColor = 'var(--miss)';
        compare = `<div class="th-delta ${d >= 0 ? 'up' : 'down'}">${d >= 0 ? '▲' : '▼'} ${Math.abs(d)} p.p. <span>vs ${esc(prevName)}</span></div>`;
      } else if (metric === 'pts' && prev.ptsDay) {
        const d = (cur.ptsDay - prev.ptsDay) / prev.ptsDay;
        if (d < 0) lineColor = 'var(--miss)';
        compare = `<div class="th-delta ${d >= 0 ? 'up' : 'down'}">${d >= 0 ? '▲' : '▼'} ${Math.abs(Math.round(d * 100))}% <span>vs ${esc(prevName)}</span></div>`;
      }
    }
  }
  const goalChips = goals.filter((g) => (scopeFacet == null ? true : scopeFacet === '__none' ? !g.facetId : g.facetId === scopeFacet));

  // rueda de tu vida (cumplimiento ponderado de cada faceta)
  const wheel = facetStats(from, to).filter((x) => x.pts > 0 || x.ptsDone > 0);
  const wheelMax = Math.max(1, ...wheel.map((x) => x.ptsDone));
  // punto seleccionado por defecto: el último con datos (hoy o el mes en curso)
  let sel = -1;
  trend.forEach((p, i) => { if ((metric === 'pct' ? p.pct : p.pts) != null) sel = i; });
  if (sel < 0) sel = trend.length - 1;
  const chartPoints = trend.map((p) => (metric === 'pct'
    ? { label: p.label, title: p.title, value: p.pct, planned: null }
    : { label: p.label, title: p.title, value: p.pts, planned: p.plan }));
  const trendHtml = goals.length ? lineChart(chartPoints, metric === 'pct'
    ? { unit: '%', color: lineColor, max: 100, threshold: thr * 100, suffix: '%', selected: sel }
    : { unit: 'pts', color: lineColor, selected: sel }) : '';
  const bigVal = !cur ? '—' : metric === 'pct' ? (cur.rate == null ? '—' : `${Math.round(cur.rate * 100)}<small> %</small>`) : `${String(r1(cur.pts)).replace('.', ',')}<small> pts</small>`;
  const when = period === 'month' ? 'este mes' : period === 'year' ? 'este año' : 'en total';

  // 3) ánimo
  const moodPts = moodSeries(period, ref).map((p) => ({ ...p, today: p.key === today }));
  const moodSlice = period === 'total' ? moodPts.slice(-24) : moodPts;
  const maxDist = Math.max(...st.moodDist, 1);

  // 4) calendario
  const cFirst = startOfMonth(calRef);
  const lead = (fromKey(cFirst).getDay() + 6) % 7;
  let cal = '<div class="cal-cell out"></div>'.repeat(lead);
  for (const k of eachDay(cFirst, endOfMonth(calRef))) {
    const ds = dayStats(k);
    const log = getLog(k);
    const m = moodFor(log.mood);
    const fut = k > today;
    const before = k < s.startDate;
    const ratio = !fut && !before && ds.planned && !(k === today && ds.ptsDone === 0) ? ds.ratio : null;
    cal += `<button class="cal-cell ${fut ? 'future' : ''} ${k === today ? 'today' : ''}" data-day="${k}" ${fut ? 'disabled' : ''}>
      <span class="cc-num">${fromKey(k).getDate()}</span>
      <span class="cc-mood">${m ? m.emoji : ''}</span>
      <span class="cc-bar">${ratio != null ? `<i style="width:${Math.max(8, ratio * 100)}%;background:${ratio >= thr ? 'var(--success)' : 'var(--accent)'}"></i>` : ''}</span>
      ${log.note && log.note.trim() ? '<span class="cc-note" aria-label="Tiene entrada de diario"></span>' : ''}
    </button>`;
  }

  // 5) entradas del diario del periodo (las más recientes)
  const entries = Object.entries(s.logs)
    .filter(([k, l]) => l.note && l.note.trim() && k >= from && k <= to)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, 6);

  // insight
  let insight = '';
  const gd = st.moodOnGood;
  const bd = st.moodOnBad;
  if (gd.n >= 2 && bd.n >= 2 && Math.abs(gd.sum / gd.n - bd.sum / bd.n) >= 0.2) {
    const ga = gd.sum / gd.n;
    const ba = bd.sum / bd.n;
    insight = `<div class="insight"><span class="i-icon">${ga > ba ? '💡' : '🤔'}</span><div>
      Los días que cumples tus objetivos tu ánimo medio es <b>${ga.toFixed(1)}</b>, frente a <b>${ba.toFixed(1)}</b> los días que no.
      ${ga > ba ? '¡Cumplir te sienta bien!' : 'Quizá algún objetivo te pesa: revisa si es realista.'}</div></div>`;
  }

  root.innerHTML = `
    <header class="page-head">
      <div>
        <div class="eyebrow">Tu evolución</div>
        <h1 class="page-title">Progreso</h1>
      </div>
    </header>

    <div class="sticky-controls">
      <div class="seg" role="tablist">
        <div class="seg-thumb" style="transform: translateX(${pi * 100}%)"></div>
        ${PERIODS.map(([p, l]) => `<button role="tab" class="${p === period ? 'active' : ''}" data-period="${p}">${l}</button>`).join('')}
      </div>
      <div class="period-nav">
        ${period !== 'total' ? `<button class="icon-btn sm" data-nav="-1" ${canPrev ? '' : 'disabled'} aria-label="Anterior">${icons.chevronLeft}</button>` : '<span></span>'}
        <div class="p-label ${period === 'total' ? 'small' : ''}">${esc(navLabel)}</div>
        ${period !== 'total' ? `<button class="icon-btn sm" data-nav="1" ${canNext ? '' : 'disabled'} aria-label="Siguiente">${icons.chevronRight}</button>` : '<span></span>'}
      </div>
    </div>

    ${period === 'year' || isWrappedSeason() ? `<section class="section">
      <button class="wrapped-banner" data-wrapped="${period === 'year' ? ref.slice(0, 4) : wrappedYear()}">
        <span class="wb-icon">${icons.sparkles}</span>
        <div><b>Tu ${period === 'year' ? ref.slice(0, 4) : wrappedYear()} con Dios</b><span>Tu resumen del año, en historias</span></div>
        ${icons.chevronRight}
      </button>
    </section>` : ''}

    <section class="section">
      <div class="card hero-stats">
        <div class="ring big">${ringSvg(112, 11, st.rate || 0, st.rate != null && st.rate >= thr ? 'var(--success)' : 'var(--accent)')}
          <div class="ring-val"><b>${fmtPts(st.ptsDone)}</b><small>pts</small><span>${st.pts ? `de ${fmtPts(st.pts)} previstos` : 'conseguidos'}</span></div></div>
        <div class="hs-list">
          <div class="hs-item"><span class="hs-val">${st.achievedDays}<small>/${st.trackedDays}</small></span><span class="hs-lbl">Días logrados</span></div>
          <div class="hs-item"><span class="hs-val">🔥 ${streak}</span><span class="hs-lbl">Racha · mejor ${best}</span></div>
          <div class="hs-item"><span class="hs-val">${mood ? `${mood.emoji} ${st.moodAvg.toFixed(1)}` : '—'}</span><span class="hs-lbl">Ánimo medio</span></div>
        </div>
      </div>
      <div class="mini-stats">
        <div class="ms"><b>${st.done}</b><span>objetivos cumplidos</span></div>
        <div class="ms"><b>+${fmtPts(st.bonus)}</b><span>pts extra</span></div>
        <div class="ms"><b>${st.gospelDays}</b><span>días con Evangelio</span></div>
      </div>
    </section>

    <section class="section">
      <div class="card chart-card trend-card">
        <div class="trend-top">
          <div class="trend-head">
            <div class="th-label">${single ? `${esc(fg.emoji)} ${esc(fg.title)}` : ff ? `${esc(ff.emoji)} ${esc(ff.name)}` : 'Puntos'} · ${when}</div>
            <div class="th-row"><div class="th-val">${bigVal}</div>${compare}</div>
          </div>

        </div>
        ${facets.length ? `<div class="chips-scroll" aria-label="Filtrar por faceta">
          <button class="fchip ${goalFilter === 'all' ? 'on' : ''}" data-goal-filter="all">Todo</button>
          ${facets.map((f) => `<button class="fchip ${scopeFacet === f.id && !single ? 'on' : ''} ${scopeFacet === f.id ? 'scoped' : ''}" data-goal-filter="f:${f.id}" style="--fc:${f.color}"><span>${esc(f.emoji)}</span>${esc(f.name)}</button>`).join('')}
        </div>` : ''}
        ${goalChips.length > 1 || (goalChips.length === 1 && facets.length) ? `<div class="chips-scroll small" aria-label="Filtrar por objetivo">
          ${!facets.length ? `<button class="fchip sm ${goalFilter === 'all' ? 'on' : ''}" data-goal-filter="all">Todos</button>` : ''}
          ${goalChips.map((g) => `<button class="fchip sm ${goalFilter === `g:${g.id}` ? 'on' : ''}" data-goal-filter="g:${g.id}"><span>${esc(g.emoji)}</span>${esc(g.title)}</button>`).join('')}
        </div>` : ''}
        ${trendHtml || '<p class="muted">Crea objetivos para ver aquí tu evolución.</p>'}
        ${trendHtml ? `<div class="chart-legend">
          <span><i class="lg solid" style="background:${lineColor}"></i>${metric === 'pct' ? '% cumplido' : 'Puntos conseguidos'}${single && period === 'month' ? ' (acumulado)' : ''}</span>
          ${metric === 'pct' ? `<span><i class="lg line"></i>Umbral ${Math.round(thr * 100)}%</span>` : '<span><i class="lg line grey"></i>Previstos</span>'}
          <span class="lg-hint">Toca o desliza para ver el detalle</span>
        </div>
        <div class="detail-slot">${detailHtml(trend[sel], goalFilter, goals)}</div>` : ''}
      </div>
    </section>

    <section class="section">
      <div class="card chart-card">
        <div class="cc-head"><h3>Rueda de tu vida</h3><span class="muted">Puntos por faceta</span></div>
        ${wheel.length >= 3 ? radarChart(wheel.map((x) => ({ label: x.facet.name, emoji: x.facet.emoji, color: x.facet.color, value: x.ptsDone / wheelMax, text: `${fmtPts(x.ptsDone)} pts` })))
          : wheel.length ? `<div class="facet-bars">${wheel.map((x) => `<div class="fb-row" style="--fc:${x.facet.color}">
              <span class="fb-name">${esc(x.facet.emoji)} ${esc(x.facet.name)}</span>
              <div class="fb-track"><i style="width:${(x.ptsDone / wheelMax) * 100}%"></i></div><b>${fmtPts(x.ptsDone)} pts</b></div>`).join('')}</div>
              <p class="hint">Con 3 facetas o más verás la rueda completa.</p>`
          : ''}
        ${wheel.length ? `<div class="facet-legend">${wheel.map((x) => `<button class="fl-item" data-goal-filter="f:${x.facet.id}" style="--fc:${x.facet.color}">
            <span>${esc(x.facet.emoji)} ${esc(x.facet.name)}</span><b>${fmtPts(x.ptsDone)} pts</b></button>`).join('')}</div>`
          : `<button class="tip-card" data-facets><span>🧭</span><div><b>Crea tus facetas</b>Agrupa tus objetivos (Fe, Ejercicio, Finanzas…) para ver aquí el equilibrio de tu vida.</div>${icons.chevronRight}</button>`}
      </div>
    </section>

    <section class="section">
      <div class="card chart-card">
        <div class="cc-head"><h3>Estado de ánimo</h3><span class="muted">${st.moodCount} ${st.moodCount === 1 ? 'día registrado' : 'días registrados'}</span></div>
        ${st.moodCount ? `${moodChart(moodSlice)}
          <div class="mood-dist">${[...MOODS].reverse().map((m) => {
            const n = st.moodDist[m.v - 1];
            return `<div class="md-row"><span class="md-emoji">${m.emoji}</span>
              <div class="md-track"><div class="md-fill" style="width:${(n / maxDist) * 100}%;background:${m.color}"></div></div>
              <span class="md-n">${n}</span></div>`;
          }).join('')}</div>`
          : '<p class="muted">Registra cada noche cómo te has sentido para ver aquí tu evolución.</p>'}
      </div>
      ${insight}
    </section>

    <section class="section">
      <div class="card chart-card">
        <div class="cc-head">
          <button class="icon-btn sm" data-cal="-1" ${startOfMonth(calRef) <= startOfMonth(s.startDate) ? 'disabled' : ''} aria-label="Mes anterior">${icons.chevronLeft}</button>
          <h3>${esc(capitalize(formatMonthYear(calRef)))}</h3>
          <button class="icon-btn sm" data-cal="1" ${startOfMonth(calRef) >= startOfMonth(today) ? 'disabled' : ''} aria-label="Mes siguiente">${icons.chevronRight}</button>
        </div>
        <div class="cal">
          ${WEEK_ORDER.map((d) => `<div class="cal-head">${WEEKDAY_SHORT[d]}</div>`).join('')}
          ${cal}
        </div>
        <div class="chart-legend"><span><i class="lg note"></i>Entrada de diario</span><span><i class="lg done"></i>Cumplimiento</span><span>Toca un día para verlo</span></div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Diario</h2>
      ${entries.length ? `<div class="card list-card">${entries.map(([k, l]) => {
        const m = moodFor(l.mood);
        const d = fromKey(k);
        return `<button class="entry" data-day="${k}">
          <div class="en-date"><b>${d.getDate()}</b><span>${MONTH_SHORT[d.getMonth()]}</span></div>
          <div class="en-body">
            <div class="en-top">${esc(capitalize(WEEKDAY_NAMES[d.getDay()]))}${m ? ` · ${m.emoji} ${m.label}` : ''}</div>
            <div class="en-text">${esc(l.note.trim())}</div>
          </div>
        </button>`;
      }).join('')}</div>` : '<div class="card empty small"><p>No hay entradas de diario en este periodo.</p></div>'}
    </section>
  `;

  const slot = root.querySelector('.detail-slot');
  bindLineCharts(root.querySelector('.trend-card') || root, (i) => {
    if (slot) slot.innerHTML = detailHtml(trend[i], goalFilter, goals);
  });

  root.onclick = (e) => {
    const t = e.target.closest('button');
    if (!t || t.disabled) return;
    const rerender = () => render(root, ctx);
    if (t.dataset.period) {
      period = t.dataset.period;
      ref = todayKey();
      localStorage.setItem('godpole.period', period);
      return rerender();
    }
    if (t.dataset.nav) {
      const dir = Number(t.dataset.nav);
      ref = period === 'month' ? addMonths(ref, dir) : `${Number(ref.slice(0, 4)) + dir}-01-01`;
      if (ref > today) ref = today;
      if (period === 'month') calRef = ref;
      return rerender();
    }
    if (t.dataset.cal) { calRef = addMonths(calRef, Number(t.dataset.cal)); return rerender(); }
    if (t.dataset.wrapped) return openYearSummary(t.dataset.wrapped);
    if ('facets' in t.dataset) return openFacetsSheet(rerender);
    if (t.dataset.metric) {
      metric = t.dataset.metric;
      localStorage.setItem('godpole.metric', metric);
      return rerender();
    }
    if (t.dataset.goalFilter) {
      goalFilter = t.dataset.goalFilter;
      const x = root.querySelector('.chips-scroll')?.scrollLeft || 0;
      rerender();
      const sc = root.querySelector('.chips-scroll');
      if (sc) sc.scrollLeft = x;
      return;
    }
    if (t.dataset.day) return openDaySheet(t.dataset.day, rerender);
  };
}

return { render };
})();
// ---- views/welcome.js ----
__m['views/welcome.js'] = (function () {
// Bienvenida: se muestra solo la primera vez. Pide el nombre, que se usa en toda la app.

const { updateSettings } = __m['store.js'];
const { esc, icons } = __m['ui.js'];

function render(root, onDone) {
  root.innerHTML = `
    <div class="welcome">
      <div class="wl-hero">
        <img class="wl-logo" src="icons/icon-192.png" alt="" width="84" height="84" />
        <h1>Bienvenido a GodPole</h1>
        <p>Tus objetivos de cada día, tu estado de ánimo, tu diario y el Evangelio, en un solo lugar.</p>
      </div>

      <ul class="wl-points">
        <li><span>🎯</span><div><b>Objetivos</b>Diarios o para ciertos días de la semana.</div></li>
        <li><span>📖</span><div><b>Evangelio y frase del día</b>Para empezar cada día con Dios.</div></li>
        <li><span>📈</span><div><b>Tu progreso</b>Mes a mes, año a año y desde el primer día.</div></li>
      </ul>

      <form class="wl-form" novalidate>
        <label for="wl-name">¿Cómo te llamas?</label>
        <input id="wl-name" class="input" maxlength="30" autocomplete="given-name" autocapitalize="words"
          placeholder="Tu nombre" enterkeyhint="go" />
        <button class="btn block" type="submit" disabled>Empezar ${icons.chevronRight}</button>
        <p class="hint center">Podrás cambiarlo cuando quieras en Ajustes.</p>
      </form>
    </div>`;

  const form = root.querySelector('form');
  const input = root.querySelector('#wl-name');
  const btn = form.querySelector('button');
  input.addEventListener('input', () => { btn.disabled = !input.value.trim(); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return;
    updateSettings({ name, onboarded: true });
    onDone(esc(name));
  });
  root.onclick = null;
}

return { render };
})();
// ---- main.js ----
__m['main.js'] = (function () {
// Armazón de la app: pestañas (Inicio · Objetivos · Progreso), cambio de día y arranque.

const { freezePastDays, getState } = __m['store.js'];
const { todayKey } = __m['dates.js'];
const { prefetchUpcoming } = __m['gospel.js'];
const { icons, applyTheme, toast } = __m['ui.js'];
const home = __m['views/home.js'];
const goals = __m['views/goals.js'];
const progress = __m['views/progress.js'];
const welcome = __m['views/welcome.js'];

const VIEWS = {
  home: { mod: home, label: 'Inicio', icon: icons.home },
  goals: { mod: goals, label: 'Objetivos', icon: icons.target },
  progress: { mod: progress, label: 'Progreso', icon: icons.chart },
};

const $view = document.getElementById('view');
const $tabbar = document.getElementById('tabbar');

const ctx = {
  tab: sessionStorage.getItem('godpole.tab') || 'home',
  today: todayKey(),
  refresh,
  go,
};
if (!VIEWS[ctx.tab]) ctx.tab = 'home';

// Primera vez (o tras borrar todos los datos): pantalla de bienvenida que pide el nombre
function needsWelcome() {
  return !getState().settings.name;
}

function refresh() {
  if (needsWelcome()) {
    document.body.classList.add('welcome-mode');
    welcome.render($view, () => {
      document.body.classList.remove('welcome-mode');
      ctx.tab = 'home';
      sessionStorage.setItem('godpole.tab', 'home');
      renderTabbar();
      refresh();
      window.scrollTo(0, 0);
    });
    return;
  }
  document.body.classList.remove('welcome-mode');
  VIEWS[ctx.tab].mod.render($view, ctx);
}

function go(tab) {
  if (!VIEWS[tab]) return;
  const same = tab === ctx.tab;
  ctx.tab = tab;
  sessionStorage.setItem('godpole.tab', tab);
  renderTabbar();
  refresh();
  window.scrollTo({ top: 0, behavior: same ? 'smooth' : 'instant' });
}

function renderTabbar() {
  $tabbar.innerHTML = Object.entries(VIEWS).map(([id, v]) => `
    <button class="tab ${id === ctx.tab ? 'active' : ''}" data-tab="${id}" aria-current="${id === ctx.tab ? 'page' : 'false'}">
      ${v.icon}<span>${v.label}</span>
    </button>`).join('');
}

$tabbar.addEventListener('click', (e) => {
  const b = e.target.closest('[data-tab]');
  if (b) go(b.dataset.tab);
});

// Sombra de la barra superior al hacer scroll
addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', scrollY > 8);
}, { passive: true });

// Cambio de día con la app abierta o al volver a ella
function checkNewDay() {
  const now = todayKey();
  if (now !== ctx.today) {
    ctx.today = now;
    freezePastDays();
    prefetchUpcoming();
    goals.resetSelection();
  }
  refresh();
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') checkNewDay();
});
setInterval(() => { if (todayKey() !== ctx.today) checkNewDay(); }, 60_000);

// Arranque
applyTheme(getState().settings.theme);
freezePastDays();
renderTabbar();
refresh();
prefetchUpcoming();

// Pide al sistema que no borre los datos de la app para liberar espacio
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

// Si el almacenamiento se llena, avisar (si no, los cambios se perderían sin que lo notes)
addEventListener('godpole:save-error', () => toast('No se pudo guardar: el almacenamiento está lleno. Exporta una copia.'));

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((e) => console.warn('SW no registrado', e));
  });
}

return {  };
})();
})();
