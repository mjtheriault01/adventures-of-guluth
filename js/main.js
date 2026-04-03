/* ============================================
   THE ADVENTURES OF GULUTH — main.js
   Read Aloud + Language Toggle
   ============================================ */

// ---- TRANSLATIONS ----
const translations = {
  en: {
    storyLabel: "Story 1",
    storyTitle: "The Mouse of This House",
    dqLabel: "Dad's Question",
    readBtn: "Read Aloud",
    pauseBtn: "Pause",
    stopBtn: "Stop",
    backLink: "← All Stories",
    paragraphs: [
      "Once upon a time, in a cozy little house with a warm fireplace and a kitchen that always smelled of cinnamon and toast, lived a little girl named Lisa and her parents. They were a very happy family, but they didn't know they had a secret guest living right inside their walls.",
      "In a small, hidden corner behind the baseboards lived a mouse. He was very small—so small he could hide behind a coffee mug—but he was very special. He had soft field-mouse-brown fur, large ears, and one single, bright purple spot right in the middle of his back. His name was Guluth.",
      "One night, while the moon was high and the house was silent, Guluth felt a rumbly in his tumbly. He tip-toed out on his tiny paws—pitter-patter, pitter-patter—until he reached the kitchen counter. There, right in the center, sat a glass bowl filled with colorful, crinkly candies.",
      "Num, num, num. He nibbled on a cherry drop. Crinkle, crinkle. He tucked into a peppermint. It was the most delicious thing he had ever tasted! After his belly was full, he scampered back into the safety of the walls and fell fast asleep.",
      "The next morning, Lisa's parents walked into the kitchen. They looked at the candy bowl and saw wrappers scattered everywhere!",
      "\"Lisa!\" they called out. \"Did you eat the candy in the middle of the night?\"",
      "\"No, no, I didn't eat it!\" Lisa said. But her parents didn't believe her. They thought she was telling a fib. \"Lisa, since you ate the candy without asking, you must go to your room,\" they said sadly.",
      "Lisa went to her room, feeling very blue because she knew she hadn't done it.",
      "Dad's Question: How do you think Lisa felt being in trouble for something a little mouse did?",
      "That night, Lisa couldn't sleep. She sat up in bed and thought, I think someone else is eating that candy. She crept into the kitchen and hid behind the big armchair. Sure enough, out came the little mouse!",
      "\"Hey, Mouse!\" Lisa whispered.",
      "Guluth jumped so high his little tail nearly twisted! He turned to run back to his hole, but Lisa said, \"Wait! Stop! Don't be scared.\"",
      "She walked over and looked at him. \"Why are you taking our candy?\"",
      "Guluth looked down at his paws, standing very still. \"I'm sorry,\" he squeaked softly. \"I thought the candy was for anyone. I will put it all back, I promise! I'll even find you more.\"",
      "\"You have to tell my parents,\" Lisa said. \"They think I'm the one eating it.\"",
      "\"I will,\" Guluth promised. He looked her in the eye with a quiet, steady strength. \"When they wake up, I'll tell them the truth. I don't want you to be blamed for something I did.\"",
      "The next morning, Lisa woke up extra early. When her parents walked into the kitchen, she said, \"Mom, Dad, don't be scared, but there's a mouse here! And he's my friend.\"",
      "Guluth stepped out from behind a toaster. He didn't brag, and he didn't try to hide. He stood calmly. \"It was me,\" he told them. \"I ate the candy. I am so very sorry. I didn't want Lisa to get in trouble for my mistake. I am willing to work and help around the house to make up for it.\"",
      "The parents were so impressed by the little mouse's honesty and his quiet strength. \"Well, thank you, Guluth,\" they said. \"A friend of Lisa's is a friend of ours.\"",
      "As the weeks went on, things began to change. Guluth didn't just live in the house; he became part of the family. He would sit on the arm of the sofa while they read stories, and some nights, he would even curl up at the foot of Lisa's bed, a tiny, loyal guardian keeping watch.",
      "But one night, Guluth heard a strange noise. Scratch. Scritch. Scrape.",
      "He looked at the counter and saw three big, mean-looking rats standing right in the candy bowl! There was Eddie, who looked very smart; Betty, who looked very fast; and Letty, who was the biggest rat Guluth had ever seen.",
      "\"Hey, Rats!\" Guluth called out. His voice was small, but it didn't shake. \"This is not your house. You shouldn't take the candy from this family!\"",
      "The rats just laughed. \"Haha! Like a tiny mouse like you is going to stop us?\"",
      "Guluth walked away, but he wasn't giving up. He was a very clever mouse. He went back to the rats and said, \"I'm sorry I was so harsh. I know you want candy. I actually have a secret stash of even better candy inside my wall hole. But it's my private stash—you definitely can't have that!\"",
      "The rats' eyes turned greedy. \"Who's going to stop us?\" they sneered.",
      "They scrambled toward the hole in the wall, thinking they were going to steal a treasure. But Guluth had been very busy. He had laid out a thick layer of slippery butter all inside the entry to the hole and down the long, steep slide he had built leading outside.",
      "As soon as the rats stepped in, their feet went out from under them! Whoosh!",
      "Eddie, Betty, and Letty went flying down the buttery slide, out through the gap in the wall, and tumbled right into the garden! They tried to scramble back up, but the butter was so thick and the slide was so slick that they just kept sliding back down into the grass. They couldn't climb back in!",
      "\"You've fallen for my trap,\" Guluth said calmly from the opening. \"Goodbye.\"",
      "Lisa's parents were so proud of their brave little protector. They decided that a mouse as special as Guluth shouldn't have to sleep in a hole in the wall or just on the edge of a bed. They built him a tiny, beautiful bed made of a soft woolen sock and placed it right next to the warm glow of the fireplace.",
      "He was a protector, a friend, and a true member of the family. He closed his eyes, content, and the smallest smile touched his humble face.",
      "\"I am Guluth,\" he whispered to the quiet room. \"And I am the mouse of this house. Now and forever.\""
    ]
  },
  es: {
    storyLabel: "Historia 1",
    storyTitle: "El Ratón de Esta Casa",
    dqLabel: "Pregunta de Papá",
    readBtn: "Leer en Voz Alta",
    pauseBtn: "Pausar",
    stopBtn: "Detener",
    backLink: "← Todas las Historias",
    paragraphs: [
      "Érase una vez, en una acogedora casita con una cálida chimenea y una cocina que siempre olía a canela y pan tostado, vivía una niña llamada Lisa y sus padres. Eran una familia muy feliz, pero no sabían que tenían un invitado secreto viviendo dentro de sus paredes.",
      "En un pequeño rincón escondido detrás de los zócalos vivía un ratón. Era muy pequeño—tan pequeño que podía esconderse detrás de una taza de café—pero era muy especial. Tenía suave pelaje marrón de ratón de campo, orejas grandes, y una sola y brillante mancha morada justo en el centro de su espalda. Su nombre era Guluth.",
      "Una noche, mientras la luna estaba alta y la casa en silencio, Guluth sintió un rumbly en su tumbly. Caminó de puntillas con sus pequeñas patas—pitar-patar, pitar-patar—hasta llegar al mostrador de la cocina. Allí, justo en el centro, había un tazón de vidrio lleno de caramelos coloridos y crujientes.",
      "Ñam, ñam, ñam. Mordisqueó un caramelo de cereza. Crunch, crunch. Se metió uno de menta. ¡Era lo más delicioso que había probado jamás! Después de llenarse la barriga, corrió de regreso a la seguridad de las paredes y se quedó dormido.",
      "A la mañana siguiente, los padres de Lisa entraron a la cocina. Miraron el tazón de caramelos y vieron envoltorios esparcidos por todas partes.",
      "\"¡Lisa!\" llamaron. \"¿Comiste los caramelos en medio de la noche?\"",
      "\"¡No, no, no fui yo!\" dijo Lisa. Pero sus padres no le creyeron. Pensaron que estaba mintiendo. \"Lisa, ya que comiste los caramelos sin permiso, debes ir a tu cuarto,\" dijeron con tristeza.",
      "Lisa fue a su cuarto sintiéndose muy triste porque sabía que no había sido ella.",
      "Pregunta de Papá: ¿Cómo crees que se sintió Lisa al ser castigada por algo que hizo un ratoncito?",
      "Esa noche, Lisa no podía dormir. Se sentó en la cama y pensó, Creo que alguien más está comiendo esos caramelos. Se escabulló a la cocina y se escondió detrás del sillón grande. ¡Y en efecto, salió el ratoncito!",
      "\"¡Oye, Ratón!\" susurró Lisa.",
      "¡Guluth saltó tan alto que su pequeña cola casi se retorció! Se giró para correr hacia su agujero, pero Lisa dijo, \"¡Espera! ¡Para! No tengas miedo.\"",
      "Se acercó y lo miró. \"¿Por qué estás tomando nuestros caramelos?\"",
      "Guluth miró sus patitas, quedándose muy quieto. \"Lo siento,\" chilló suavemente. \"Pensé que los caramelos eran para cualquiera. ¡Te los devolveré todos, lo prometo! Hasta te conseguiré más.\"",
      "\"Tienes que decírselo a mis padres,\" dijo Lisa. \"Ellos creen que soy yo quien los come.\"",
      "\"Lo haré,\" prometió Guluth. La miró con una calma y firmeza tranquila. \"Cuando se despierten, les diré la verdad. No quiero que te culpen por algo que hice yo.\"",
      "A la mañana siguiente, Lisa se despertó muy temprano. Cuando sus padres entraron a la cocina, dijo, \"Mamá, Papá, no se asusten, ¡pero hay un ratón aquí! ¡Y es mi amigo!\"",
      "Guluth salió desde detrás de la tostadora. No presumió ni intentó esconderse. Se quedó calmado. \"Fui yo,\" les dijo. \"Yo comí los caramelos. Lo siento muchísimo. No quería que Lisa se metiera en problemas por mi error. Estoy dispuesto a trabajar y ayudar en la casa para compensarlo.\"",
      "Los padres quedaron muy impresionados por la honestidad y la tranquila fortaleza del ratoncito. \"Bueno, gracias, Guluth,\" dijeron. \"Un amigo de Lisa es un amigo nuestro.\"",
      "Con el paso de las semanas, las cosas comenzaron a cambiar. Guluth no solo vivía en la casa; se convirtió en parte de la familia. Se sentaba en el brazo del sofá mientras leían cuentos, y algunas noches, se acurrucaba al pie de la cama de Lisa, un pequeño y leal guardián haciendo su ronda.",
      "Pero una noche, Guluth escuchó un ruido extraño. Scratch. Scritch. Scrape.",
      "Miró el mostrador y vio tres ratas grandes y de aspecto malvado paradas justo en el tazón de caramelos. Estaba Eddie, quien parecía muy listo; Betty, quien parecía muy rápida; y Letty, la rata más grande que Guluth había visto jamás.",
      "\"¡Oigan, Ratas!\" llamó Guluth. Su voz era pequeña, pero no temblaba. \"¡Esta no es su casa. No deberían tomar los caramelos de esta familia!\"",
      "Las ratas solo se rieron. \"¡Jaja! ¿Como si un ratoncito como tú nos fuera a detener?\"",
      "Guluth se alejó, pero no se rendía. Era un ratón muy listo. Volvió con las ratas y dijo, \"Lo siento por haber sido tan brusco. Sé que quieren caramelos. En realidad tengo una reserva secreta de caramelos aún mejores dentro de mi agujero en la pared. ¡Pero es mi reserva privada—definitivamente no pueden tenerla!\"",
      "Los ojos de las ratas se volvieron codiciosos. \"¿Quién nos va a detener?\" se burlaron.",
      "Corrieron hacia el agujero en la pared, pensando que iban a robar un tesoro. Pero Guluth había estado muy ocupado. Había puesto una gruesa capa de mantequilla resbaladiza en toda la entrada del agujero y por el largo y empinado tobogán que había construido hacia el exterior.",
      "¡En cuanto las ratas pisaron, sus pies se les fueron! ¡Wush!",
      "Eddie, Betty y Letty salieron disparados por el tobogán de mantequilla, a través de la grieta en la pared, ¡y cayeron rodando al jardín! Intentaron subir gateando, pero la mantequilla era tan gruesa y el tobogán tan resbaladizo que seguían deslizándose de vuelta a la hierba. ¡No podían volver a entrar!",
      "\"Han caído en mi trampa,\" dijo Guluth calmadamente desde la abertura. \"Adiós.\"",
      "Los padres de Lisa estaban muy orgullosos de su valiente pequeño protector. Decidieron que un ratón tan especial como Guluth no debería tener que dormir en un agujero en la pared. Le construyeron una pequeña y hermosa cama hecha de un calcetín de lana suave y la colocaron junto al cálido resplandor de la chimenea.",
      "Era un protector, un amigo y un verdadero miembro de la familia. Cerró los ojos, contento, y la más pequeña de las sonrisas tocó su humilde rostro.",
      "\"Soy Guluth,\" susurró a la habitación silenciosa. \"Y soy el ratón de esta casa. Ahora y para siempre.\""
    ]
  }
};

// ---- STATE ----
let currentLang = 'en';
let synth = window.speechSynthesis;
let utterance = null;
let isPlaying = false;
let isPaused = false;

// ---- LANGUAGE TOGGLE ----
function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Update UI text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update story paragraphs
  const paraEls = document.querySelectorAll('[data-para]');
  paraEls.forEach(el => {
    const idx = parseInt(el.getAttribute('data-para'));
    if (t.paragraphs[idx] !== undefined) {
      el.textContent = t.paragraphs[idx];
    }
  });

  // Update lang toggle buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Stop any reading in progress
  stopReading();
}

// ---- READ ALOUD ----
function getStoryText() {
  return translations[currentLang].paragraphs.join(' ');
}

function startReading() {
  if (!synth) return;
  stopReading();

  utterance = new SpeechSynthesisUtterance(getStoryText());
  utterance.lang = currentLang === 'es' ? 'es-ES' : 'en-US';
  utterance.rate = 0.92;
  utterance.pitch = 1.05;

  // Try to pick a pleasant voice
  const voices = synth.getVoices();
  const preferred = voices.find(v =>
    currentLang === 'es'
      ? v.lang.startsWith('es') && v.name.toLowerCase().includes('female')
      : v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Daniel'))
  ) || voices.find(v => v.lang.startsWith(currentLang));
  if (preferred) utterance.voice = preferred;

  utterance.onend = () => resetReadBtn();
  utterance.onerror = () => resetReadBtn();

  synth.speak(utterance);
  isPlaying = true;
  isPaused = false;
  updateReadBtn();
}

function pauseReading() {
  if (synth.speaking && !isPaused) {
    synth.pause();
    isPaused = true;
    isPlaying = false;
    updateReadBtn();
  }
}

function resumeReading() {
  if (isPaused) {
    synth.resume();
    isPaused = false;
    isPlaying = true;
    updateReadBtn();
  }
}

function stopReading() {
  synth.cancel();
  isPlaying = false;
  isPaused = false;
  resetReadBtn();
}

function handleReadBtn() {
  if (!isPlaying && !isPaused) {
    startReading();
  } else if (isPlaying && !isPaused) {
    pauseReading();
  } else if (isPaused) {
    resumeReading();
  }
}

function updateReadBtn() {
  const btn = document.getElementById('readAloudBtn');
  if (!btn) return;
  const t = translations[currentLang];
  if (isPlaying) {
    btn.innerHTML = '<span class="icon">⏸</span> <span data-i18n="pauseBtn">' + t.pauseBtn + '</span>';
    btn.classList.add('playing');
  } else if (isPaused) {
    btn.innerHTML = '<span class="icon">▶</span> <span>' + t.readBtn + '</span>';
    btn.classList.remove('playing');
  }
}

function resetReadBtn() {
  const btn = document.getElementById('readAloudBtn');
  if (!btn) return;
  const t = translations[currentLang];
  btn.innerHTML = '<span class="icon">▶</span> <span data-i18n="readBtn">' + t.readBtn + '</span>';
  btn.classList.remove('playing');
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  // Language buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });

  // Read aloud button
  const readBtn = document.getElementById('readAloudBtn');
  if (readBtn) readBtn.addEventListener('click', handleReadBtn);

  // Voices load async in some browsers
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => {};
  }
});
