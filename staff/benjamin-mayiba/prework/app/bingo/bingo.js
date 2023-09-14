const generateRandomNumber = () => Math.floor(Math.random() * 20) + 1;

const shuffleCard = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const startBingo = () => {
  const players = [
    { name: "Jugador1", card: [], points: 0 },
    { name: "Jugador2", card: [], points: 0 }
  ];

  console.log("¡Bienvenido al juego de Bingo!");

  const usedNumbers = new Set();

  for (let currentPlayerIndex = 0; currentPlayerIndex < players.length; currentPlayerIndex++) {
    const currentPlayer = players[currentPlayerIndex];

    let acceptCard = false;

    while (!acceptCard) {
      currentPlayer.card = generateBingoCard();
      console.log(`${currentPlayer.name}, esta es tu tarjeta:`);
      displayBingoCard(currentPlayer.card);

      if (askToAcceptCard(currentPlayer.name)) {
        acceptCard = true;
      } else {
        console.log(`${currentPlayer.name}, generando una nueva tarjeta...`);
      }
    }

    let continuePlaying = true;
    let turns = 0;
    let linea = false;

    console.log(`${currentPlayer.name}, es tu turno.`);

    while (!isBingoCardComplete(currentPlayer.card) && continuePlaying) {
      let randomNum = generateRandomNumber();

      while (usedNumbers.has(randomNum)) {
        randomNum = generateRandomNumber();
      }

      usedNumbers.add(randomNum);
      turns++;
      console.log(`Número seleccionado: ${randomNum}`);

      if (askForNewTurn(currentPlayer.name)) {
        if (matchNumberAndMarkCard(randomNum, currentPlayer.card)) {
          console.log(`¡Número ${randomNum} coincidió!`);
          displayBingoCard(currentPlayer.card);
          currentPlayer.points++;
        }

        if (checkLine(currentPlayer.card) && !linea) {
          console.log("LINEA!");
          linea = true;
        }
      } else {
        console.log(`${currentPlayer.name}, has decidido detener el juego.`);
        continuePlaying = false;
      }
    }

    console.log(`${currentPlayer.name}, tu juego ha terminado.`);
    console.log(`Tus puntos: ${currentPlayer.points}`);
    console.log(`Total de turnos jugados: ${turns}`);
  }

  console.log("---- Puntuaciones finales ----");
  for (const player of players) {
    console.log(`${player.name}: ${player.points} puntos`);
  }

  console.log("¡Gracias por jugar al Bingo!");
};

const generateBingoCard = () => {
  const allNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
  shuffleCard(allNumbers);

  const card = [];
  for (let i = 0; i < 10; i++) {
    card.push({ number: allNumbers.pop(), matched: false });
  }

  return card;
};

const showPointsSystem = () => {
  console.log("Sistema de puntos:");
  console.log("Menos turnos -> Más puntos");
};

const isBingoCardComplete = (card) => card.every(cell => cell.matched);

const askToAcceptCard = (playerName) => {
  const response = prompt(`${playerName}, ¿Aceptas esta tarjeta? (yes/no)`);
  if (response === null) {
    console.log(`${playerName}, has decidido detener el juego.`);
    return false;
  }
  return response.toLowerCase() === "yes";
};

const askForNewTurn = (playerName) => {
  const response = prompt(`${playerName}, ¿Deseas un nuevo turno? (yes/no)`);
  if (response === null) {
    console.log(`${playerName}, has decidido detener el juego.`);
    return false;
  }
  return response.toLowerCase() === "yes";
};

const matchNumberAndMarkCard = (number, card) => {
  for (const cell of card) {
    if (cell.number === number && !cell.matched) {
      cell.matched = true;
      return true;
    }
  }
  return false;
};

const checkLine = (card) => {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9]
  ];

  for (const line of lines) {
    if (line.every(index => card[index].matched)) {
      return true;
    }
  }

  return false;
};

const displayBingoCard = (card) => {
  console.log("Cartón:");
  for (let i = 0; i < card.length; i++) {
    console.log(`Número ${i + 1}: ${card[i].matched ? 'X' : card[i].number}`);
  }
};

startBingo();