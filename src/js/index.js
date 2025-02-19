import '../scss/styles.scss';

const tabletLinesContainer = document.getElementById('tablet_lines');
const fragment = document.createDocumentFragment();
let isOrange = true;
let isFirstWriting = true;

//Generar Radom Orange
const getRandomOrangeColor = () => {
  const r = 240;
  const g = Math.floor(Math.random() * 40) + 90;
  const b = Math.floor(Math.random() * 40);
  return `rgb(${r}, ${g}, ${b})`;
};

//Generar Radom Blu
const getRandomBlueColor = () => {
  const r = Math.floor(Math.random() * 50) + 100;
  const g = Math.floor(Math.random() * 50) + 100;
  const b = Math.floor(Math.random() * 50) + 200;
  return `rgb(${r}, ${g}, ${b})`;
};

const CreateLines = () => {
  // Establecer Tiempo animation de las lineas
  let animationDelay = isFirstWriting ? 3 : 0;

  // Pintar todas la lineas con clases
  for (let i = 1; i <= 12; i++) {
    const newDiv = document.createElement('div');

    newDiv.classList.add('tablet__line', `tablet__line${i}`);
    if (i === 12) {
      newDiv.id = 'tablet__line12';
    }

    newDiv.style.position = 'absolute';
    newDiv.style.top = `${50 + (i - 1) * 20}px`;
    if (isOrange) {
      newDiv.style.backgroundColor = getRandomOrangeColor();
    } else {
      newDiv.style.backgroundColor = getRandomBlueColor();
    }
    newDiv.style.width = '100%';
    newDiv.style.height = '10px';
    newDiv.style.width = '0';

    newDiv.style.animation = `writing-line${i} 0.5s ${animationDelay + (i - 1) * 0.5}s linear forwards`;

    fragment.appendChild(newDiv);
  }

  tabletLinesContainer.appendChild(fragment);

  // escucha Evento animationEnd
  const line12Element = document.getElementById('tablet__line12');
  line12Element.addEventListener('animationend', ev => {
    // console.log(ev);

    // Cambio de Color +  cambio de velocidad espera
    isOrange = !isOrange;
    isFirstWriting = false;

    // Quitar las lineeas antiguas
    let currentLine = tabletLinesContainer.firstChild;
    while (currentLine) {
      tabletLinesContainer.removeChild(currentLine);
      currentLine = tabletLinesContainer.firstChild;
    }

    CreateLines();
  });
};

CreateLines();
