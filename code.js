//cargar todo el html hasta que termine de ejecutarse y luego el JS
document.addEventListener('DOMContentLoaded', () => {
    //seleccionar todos los cuadritos del cuadrado y se guardan
    const squares = document.querySelectorAll('.grid div');
    //guarda en la variable lo que esta almacenado en el span del HTML, seleccionando el primer elemento
    const scoreDisplay = document.querySelector('span');
    //selecciona el primer elemento y llama la clase start del HTML, ademas lo guarda en la constante
    const startBtn = document.querySelector('.start');
    //define la constante que sera el tamaño del cuadrado
    const width = 10;
    //variable definida con el valor 0
    let currentIndex = 0;
    //variable definida con el valor 0
    let appleIndex = 0;
    //variable definida como arreglo
    let currentSnake = [2,1,0];
    //variable definida como 1, la direccion que se tomara
    let direction = 1;
    //inicializamos el puntaje 0
    let score = 0;
    //se inicializa la velocidad de la serpiente
    let speed = 0.6;
    //variable inicializada
    let intervalTime = 0;
    //variable inicializada
    let interval = 0;
  
    //funcion para iniciar el juego o reiniciarlo
    function startGame() {
      //forEach para recorrer los elementos almacenados en el arreglo de currentSnake
      //muestra cada cuadro de la serpiente, almacenando cada cuadrado en in arreglo squares[i]
      //classList.remove hace que se eliminen los elementos que ya estaban en el arreglo, en este caso los cuadrados rellenados
      //desponta los cuadritos
      currentSnake.forEach(index => squares[index].classList.remove('snake'));
      //se posiciona en los cuadros de las manzanas y elimina los cuadros que ya se han mostrado
      squares[appleIndex].classList.remove('apple');
      //llama a una funcion que contiene la variable intervalo, la cual borrara todo
      clearInterval(interval);
      //inicializa los puntos en 0
      score = 0;
      //llama a la funcion de las manzanas, de mostrarlas en posiciones al azar
      randomApple();
      //se muestra la direccion, que es hacia la derecha
      direction = 1;
      //se define un nuevo valor para la variable anteriormente definida y con el .innerText la edita para que aparezca de otra manera
      scoreDisplay.innerText = score;
      //le da un nuevo valor al intervalo
      intervalTime = 1000;
      //mostrar de nuevo las posiciones
      //2-cola, 1-cuerpo,0-cabeza
      currentSnake = [2,1,0];
      //se almacena en esta parte del codigo el valor almacenado en la variable
      currentIndex = 0;
      //se agregan cuadritos pintados a la snake, se agrega la clase snake al nuevo cuadrado
      //ciclo foreach para recorrer cada elemento
      currentSnake.forEach(index => squares[index].classList.add('snake'));
      //setInterval llama la funcion y el tiempo en milisegundos
      //define un nuevo valor para intervalo, el setInterval hace que una funcion se repita
      interval = setInterval(moveOutcomes, intervalTime);
    }
  
    //funcion que determina las diferentes acciones posibles a ocurrir en las que el juego se debe reiniciar
    function moveOutcomes() {
      //evalua con condicional cuando la serpiente toca el borde o asi misma
      if (
        //evalua que la posicion de la serpiente no pase del cuadrado y que no toque el boton
        (currentSnake[0] + width >= (width * width) && direction === width ) ||
        //evalua si la serpiente choca contra la pared de la derecha
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        //evalua si la serpiente choca contra la pared izquierda
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        //evalua si la serpiente toca la parte de arriba
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
        //evalua si la funcion se toca a si misma
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
      ) {
        //que retorne la funcion, que borra todo lo realizado 
        return clearInterval(interval);
      }
      //define una funcion como el elemento eliminado del arreglo, que es el de la ultima posicion de este
      const tail = currentSnake.pop();
      //en el elemento eliminado, el cual lo almacena en el arreglo de cuadrados, remueve o elimina de estos cuadros la clase snake
      //es decir, que elimina cuadros pintados del ultimo elemento.
      squares[tail].classList.remove('snake');
      //agrega elementos al arreglo de currentSnake, ademas da una direccion a la cabeza del arreglo
      currentSnake.unshift(currentSnake[0] + direction);
      
      //metodos cuando la serpiente tome la manzana
      //condicional que evalue si la posicion del cuadrado en el arreglo
      //contiene la clase manzana
      if(squares[currentSnake[0]].classList.contains('apple')) {
        //quitar el color del cuadrado que contiene la manzana
        squares[currentSnake[0]].classList.remove('apple');
        //dar a esta posicion la clase snake, es decir, pintarlos como la serpiente
        squares[tail].classList.add('snake');
        //agrega una nueva posicion al arreglo, en este caso lo que contenga tail, que es el nuevo cuadro agregados
        currentSnake.push(tail);
        //llama a la funcion de mostrar las manzanas
        randomApple();
        //aumenta los puntos en 1 cada vez que toma una manzana
        score++;
        //modifica el puntaje cada vez que se come una manzana, mostrandolo en el texto
        scoreDisplay.textContent = score;
        //borra todo lo que haya antes
        clearInterval(interval);
        //define el intervalo de tiempo multiplicado por la velocidad
        intervalTime = intervalTime * speed;
        //y el intervalo lo define que ejecute la funcion en un tiempo determinado
        interval = setInterval(moveOutcomes, intervalTime);
      }
      //pinta, o agrega la clase de snake, en la posicion 0
      squares[currentSnake[0]].classList.add('snake');
    }
  
  
  
    //mostrar la manzana en un lugar del cuadrado con una funcion
    function randomApple() {
      do{
        //da una posicion a la manzana que sea al azar y que de un numero entero
        //ademas que convierta los cuadrados a numero, es decir la cantidad de datos en el arreglo
        appleIndex = Math.floor(Math.random() * squares.length);
        //asegurar que la manzana no aparezca encima de la serpiente
        //contains que el elemento contiene la clasea
      } while(squares[appleIndex].classList.contains('snake')); //making sure apples dont appear on the snake
      //agrega la clase manzana en la posicion del arreglo
      squares[appleIndex].classList.add('apple');
    }
  
    //asigna funciones a las diferentes teclas
    //la e es un evento, lo recibe como parametro
    function control(e) {
      //al cuadro del arreglo se le quita lo pintado, o la clase snake
      //indice actual y cuando avanza se limpian
      squares[currentIndex].classList.remove('snake');
      //condicional que evalua el click en cada tecla
      //e.keycode: es un evento del teclado y los # sopn su identificador
      if(e.keyCode === 39) {
        //si presiona la tecla derecha la serpiente se movera a la derecha en 1 cuadro
        direction = 1;
      } else if (e.keyCode === 38) {
        //si se presiona la tecla hacia arriba la serpiente se movera 10 cuadros atras, como si subiera
        direction= -width;
      } else if (e.keyCode === 37) {
        //si presiona la tecla izquierda la serpiente se movera un espacio a la izquierda
        direction = -1;
      } else if (e.keyCode === 40) {
        //si se presiona la tecla hacia abajo la serpiente aparecera en lso 10 cuadros desde donde esta
        direction = +width;
      }
    }
    //llama un evento que se presiona una tecla, pero lo toma cuando se suelta
    //ademas llama la funcion de cada tecla presionada
    document.addEventListener('keyup', control);
    //cuando se de click en el boton se ejecuta la funcion startGame ya creada
    startBtn.addEventListener('click', startGame);
  })