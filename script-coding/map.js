//Cambio xd
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } =
  functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {};
////////////////////////

// Constantes para las escalas del canvas
const columnas = 28;
const filas = 26;
const lado = 20;
const ancho_canvas = columnas * lado;
const alto_canvas = filas * lado;
let canvas;

//Medidas Actuales
// ANCHO: 560
// ALTO: 520

// Constantes de Control
let arriba;
let abajo;
let derecha;
let izquierda;

// Constante de Juego
 //--> El puntaje del personaje
let score ;
//-->Contador de Vidas
let countLives = 3 ;
//-->Imagen de Fondo del Canvas
let fondo;


/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(7);
  drawfondo();
  windowRezired();
  direcciones();
  Mundo = {
    snake: [
      { x: columnas / 2, y: filas / 2 },
      { x: columnas / 2 - 1, y: filas / 2 },
      { x: columnas / 2 - 2, y: filas / 2 },
    ],
    dir: derecha,
    food: {
      x: int(random(columnas)),
      y: int(random(filas)),
    },
    cuadradoFinal: {
      x: 0,
      y: 0,
    },
    score: 0,
    lives: 3,
    tipe : "juego",
    timer: millis(),
    ñero: {
      x: 18,
      y: 10,
      dirx: true,
      diry: true,
    },
    knife: {
      x: 18,
      y: 10,
    },
  };
}


// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
  function drawGame(Mundo) {
  background(fondo);
  drawUi();
  fill(240, 240, 240);
  stroke(10, 10, 10);
  strokeWeight(4);
  drawFood(Mundo.food);
  forEach(Mundo.snake, (s) => {
    rect(s.x * lado, s.y * lado, lado, lado);
  });
	fill('white');
	drawÑero(Mundo.ñero);
	drawKnife(Mundo.knife);
	fill('white');
	textSize(12);
	text('Tiempo:', 1, 12);
	text(Mundo.timer, 45, 12);
}


/*
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola *
 */
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons(
    { x: head.x + dir.x, y: head.y + dir.y },
    snake.slice(0, length(snake) - 1)
  );
}


/**
 * Dibuja la comida #671796
 */
function drawFood(food) {
  fill("crimson");
  rect(food.x * lado, food.y * lado, lado, lado);
}

// Funcion del Fondo
function drawfondo(){
  fondo = loadImage('/Backgrounds/blue.png');
	createCanvas(ancho_canvas, alto_canvas);
  background(fondo);
}

// Direccines
function direcciones(){
  abajo = createVector(0, 1);
	arriba = createVector(0, -1);
	izquierda = createVector(-1, 0);
	derecha = createVector(1, 0);
}

// Posicionar comida
function posicionarComida() {
  comida = createVector(int(random(columnas)), int(random(filas)));
}

// Hacer que se vea bien en cualquier dimension
function windowRezired() {
  let escala = windowWidth / width;
  if (escala >= 1) {
    return;
  }
  canvas.style("width", width * escala + "px");
  canvas.style("height", height * escala + "px");
}


function drawKnife(knife) {
  fill("green");
  triangle(
    knife.x * lado+10,
    knife.y * lado,
    knife.x * lado ,
    knife.y * lado+10,
    knife.x * lado +10,
    knife.y * lado +20,
  );
}

function drawÑero(ñero) {
  fill("blue");
  rect(ñero.x * lado, ñero.y * lado, lado, lado);
}




// Funcion para dibujar lo que esta arriba del canvas, el puntaje.
function drawUi(){
  fill(255,255,255);
  stroke(50,150,50);
  strokeWeight(4);
  textSize(30)
  textAlign(LEFT);
  text("SCORE: " + Mundo.score,20,45);
  textAlign(RIGHT)
  text("LIVES: " + countLives,540,45)
function ñeroMove(ñero) {
  if (
    (ñero.dirx == true && ñero.y != 18 && ñero.diry == true) ||
    (ñero.x == 18 && ñero.diry == false)
  ) {
    return { x: 18, y: ñero.y + 1, dirx: true, diry: true };
  }
  if (ñero.y == 18) {
    return { x: 18, y: ñero.y - 1, dirx: false, diry: true };
  }
  if (ñero.dirx == false && ñero.y != 1) {
    return { x: 18, y: ñero.y - 1, dirx: false, diry: true };
  }
  if (ñero.y == 1 && ñero.dirx == false && ñero.x != 1 && ñero.diry == true) {
    return { x: ñero.x - 1, y: 1, dirx: false, diry: true };
  }
  if (ñero.x == 1) {
    return { x: ñero.x + 1, y: 1, dir: true, diry: false };
  }
  if (ñero.diry == false && ñero.x != 1) {
    return { x: ñero.x + 1, y: 1, dir: true, diry: false };
  }
}
}

function moveKnife(knife) {
  return {x: knife.x-1,y:knife.y}
}
function ñeroUpdate() {}


// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
	if (
		(Mundo.snake[0].x > columnas - 1 ||
			Mundo.snake[0].y > filas - 1 ||
			Mundo.snake[0].x < 0 ||
			Mundo.snake[0].y < 0 ||
			choqueSnake(rest(Mundo.snake), Mundo.snake[0]) == true) &&
		Mundo.lives >= 1
	) {
		countLives = Mundo.lives - 1;
		Mundo = {
			snake: [
				{ x: columnas / 2, y: filas / 2 },
				{ x: columnas / 2 - 1, y: filas / 2 },
				{ x: columnas / 2 - 2, y: filas / 2 },
			],
			dir: derecha,
			food: {
				x: int(random(columnas)),
				y: int(random(filas)),
			},
			cuadradoFinal: {
				x: 0,
				y: 0,
			},
			score: 0,
			lives: Mundo.lives - 1,
			tipe: 'juego',
		};
		return Mundo;
	} else if (
		Mundo.snake[0].x > columnas - 1 ||
		Mundo.snake[0].y > filas - 1 ||
		Mundo.snake[0].x < 0 ||
		Mundo.snake[0].y < 0 ||
		(choqueSnake(rest(Mundo.snake), Mundo.snake[0]) == true && Mundo.lives < 1)
	) {
		textAlign(CENTER, CENTER);
		textSize(50);
		text(' Has perdido', width / 2, height / 2);
		text(Mundo.score, width / 2, height / 1.5);
		rect(
			Mundo.cuadradoFinal.x * lado,
			Mundo.cuadradoFinal.y * lado,
			lado,
			lado
		);
		return update(Mundo, {});
	} else {
		if (Mundo.snake[0].x == Mundo.food.x && Mundo.snake[0].y == Mundo.food.y) {
			Mundo.snake.push({ x: 5, y: 5 });
			return update(Mundo, {
				snake: moveSnake(Mundo.snake, Mundo.dir),
				food: {
					x: Math.floor(Math.random() * (20 - 0) + 0),
					y: Math.floor(Math.random() * (20 - 0) + 0),
				},
				score: Mundo.score + 1,
				// ñero: ñeroMove(Mundo.ñero),
				// knife: moveKnife(Mundo.knife)
			});
		} else {
			return update(Mundo, {
				snake: moveSnake(Mundo.snake, Mundo.dir),
				cuadradoFinal: {
					x: Mundo.snake[Mundo.snake.length - 1].x,
					y: Mundo.snake[Mundo.snake.length - 1].y,
				},
				// ñero: ñeroMove(Mundo.ñero),
				// timer: int(millis()/1000)
			});
		}
		// return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });
	}
}


//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
  return update(Mundo, {});
}

/**
 * Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
 */
function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      if (Mundo.dir == abajo) {
        break;
      }
      if ((Mundo.dir = arriba));
      break;
    case RIGHT_ARROW:
      if (Mundo.dir == izquierda) {
        break;
      }
      if ((Mundo.dir = derecha));
      brek;
    case DOWN_ARROW:
      if (Mundo.dir == arriba) {
        break;
      }
      if ((Mundo.dir = abajo));
      break;
    case LEFT_ARROW:
      if (Mundo.dir == derecha) {
        break;
      }
      if ((Mundo.dir = izquierda));
      break;
  }
}

function onKeyEvent(Mundo, keyCode) {
  return update(Mundo, { dir: keyDirection(Mundo.dir, keyCode) });
}


/*
Propósito: Retornar si la cabeza del Snake tiene la misma posición de uno de las posiciones de su cuerpo
Contrato: listaDeItems, JSON -> boolean
Prototipo: choqueSnake(snake, cabezaSnake)
Ejemplos:
choqueSnake([{x:3, y:3},{x:3, y:4}], {x:3, y:2}) -> false
choqueSnake([{x:3, y:3},{x:3, y:4}], {x:3, y:3}) -> true
*/

function choqueSnake(snake, cabezaSnake) {
  if (isEmpty(snake) == true) {
    return false;
  } else if (
    first(snake).x == cabezaSnake.x &&
    first(snake).y == cabezaSnake.y
  ) {
    return true;
  } else {
    return choqueSnake(rest(snake), cabezaSnake);
  }
}

