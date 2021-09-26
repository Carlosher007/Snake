
/**Funcion que se encarga de dibujar a Barrage 
 * 
*/
function drawBarrage(barrage) {
  forEach(barrage, (b) => {
    fill("white");
    rect(b.x * lado, b.y * lado, lado, lado);
  });
}

/**Funcion que se encarga de mover a Barrage 
 * 
*/
function moveBarrage(data) {
  const head = first(data)
  if (isEmpty(data)) {
    return []
  } else 
  if (head.x==20 && head.dirx==true) {
    if (isEmpty(data)) {
      return [];
    } else {
      if (isEmpty(rest(data))) {
        return [{ x: head.x +1, y: head.y, dirx: false}];
      } else {
        return cons(
          { x: head.x + 1, y: head.y, dirx: false},
          moveBarrage(rest(data))
        );
      }
    }
  } else if (head.dirx==true) {
    if (isEmpty(data)) {
      return [];
    } else {
      if (isEmpty(rest(data))) {
        return [{ x: head.x - 1, y: head.y, dirx: true}];
      } else {
        return cons(
          { x: head.x - 1, y: head.y, dirx: true},
          moveBarrage(rest(data))
        );
      }
    }
  } else if (head.dirx==false && head.x==26) {
    return [];
  } else {
    if (isEmpty(data)) {
      return [];
    } else {
      if (isEmpty(rest(data))) {
        return [{ x: head.x + 1, y: head.y, dirx: false}];
      } else {
        return cons(
          { x: head.x + 1, y: head.y, dirx: false},
          moveBarrage(rest(data))
        );
      }
    }
  }
    
  



/*  if (isEmpty(data)) {
    return [];
  } else {
    if (isEmpty(rest(data))) {
      return [{ x: head.x - 1, y: head.y }];
    } else {
      return cons({ x: head.x - 1, y: head.y }, moveBarrage(rest(data)));
    }
  } */
}

function moveBarragev(data) {
  const head = first(data)
  if (isEmpty(data)) {
    return []
  } else 
  if (head.y==10 && head.diry==true) {
    if (isEmpty(data)) {
      return [];
    } else {
      if (isEmpty(rest(data))) {
        return [{ x: head.x, y: head.y-1, diry: false }];
      } else {
        return cons(
          { x: head.x , y: head.y-1, diry: false },
          moveBarragev(rest(data))
        );
      }
    }
  } else if (head.diry==true) {
    if (isEmpty(data)) {
      return [];
    } else {
      if (isEmpty(rest(data))) {
        return [{ x: head.x, y: head.y+1,diry: true }];
      } else {
        return cons(
          { x: head.x , y: head.y+1, diry: true },
          moveBarragev(rest(data))
        );
      }
    }
  } else if (head.diry==false && head.y==4) {
    return [];
  } else {
    if (isEmpty(data)) {
      return [];
    } else {
      if (isEmpty(rest(data))) {
        return [{ x: head.x, y: head.y-1, diry: false }];
      } else {
        return cons(
          { x: head.x, y: head.y-1 ,diry: false },
          moveBarragev(rest(data))
        );
      }
    }
  }
}

function drawNewBarrage(barrage) {
  forEach(barrage, (b) => {
    fill("white");
    rect(b.x * lado, b.y * lado, lado, lado);
  });
}


/* function hitBodyB(lista) {
  forEach(lista, (element) => {
    forEach(Mundo.snake, (elementD) => {
      x = lookupx(Mundo.snake, elementD);
      if (
        element.x == elementD.x &&
        element.y == elementD.y 
      ) {
        update(Mundo, (Mundo.score = Mundo.score - 1));
      }
    });
  });
}
 */
function hitHeadB(snake, knife) {
  const head = first(knife);
  if (isEmpty(knife)) {
    return false;
  } else {
    if (isEmpty(rest(knife))) {
      if (
        (snake[0].x == head.x && snake[0].y == head.y) ||
        (snake[1].x == head.x && snake[1].y == head.y)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        (snake[0].x == head.x && snake[0].y == head.y) ||
        (snake[1].x == head.x && snake[1].y == head.y)
      ) {
        return true;
      } else {
        return hitHeadB(snake, rest(knife));
      }
    }
  }
}