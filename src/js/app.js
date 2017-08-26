$(() => {

  const game = document.getElementById('game');
  for (let i = 0; i < 1600; i++) {
    game.innerHTML += '<div class="pix"></div>';
  }

  //getting all variables necesary to run the SNAKESTEIN
  const keyUp = 38;
  const keyDown = 40;
  const keyRight = 39;
  const keyLeft =  37;

  const $grid = $('.pix');

  let heads = 1580;
  let up = null;
  let right = null;
  let down = null;
  let left = null;
  let score = 0;
  const prevSnake = [];
  let snake = 4;


  function getFood() {
    const rand = Math.ceil(Math.random() * 1600);
    $grid.eq(rand).addClass('food');
  }
  for(let i = 0; i < 16 ; i++ ){
    getFood();
  }
  ///////////////////////////////////////////////////////////////////////////////////////////
  //                               ~ The SnakeStein Code ~                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////

  //Remove the first index from the array witch should be the tail of the snake
  function  snakeInd(){
    if(prevSnake.length === snake){
      prevSnake.shift(0);
    }
  }
  //////////////////////////////////////////////////////////////////////////
  function move(){
    if(up === null && right === null && down === null && left === null){
      heads = heads - 40;
      $grid.eq(heads).addClass('head');
      $grid.eq(prevSnake[0]).removeClass('head');
      snakeInd();
      prevSnake.push(heads);

    }else if(up === 1 && right === null && down === null && left === null){
      heads = heads - 40;
      $grid.eq(heads).addClass('head');
      $grid.eq(prevSnake[0]).removeClass('head');
      snakeInd();
      prevSnake.push(heads);
    }else if(up === null && right === 2 && down === null && left === null){
      heads = ++heads;
      $grid.eq(heads).addClass('head');
      $grid.eq(prevSnake[0]).removeClass('head');
      snakeInd();
      prevSnake.push(heads);
    }else if(up === null && right === null && down === 3 && left === null){
      //////////////////////////////////////////////////////////////////////////
      heads = heads + 40;
      $grid.eq(heads).addClass('head');
      $grid.eq(prevSnake[0]).removeClass('head');
      snakeInd();
      prevSnake.push(heads);
    }else if(up === null && right === null && down === null && left === 4){
      //////////////////////////////////////////////////////////////////////////
      heads = --heads;
      $grid.eq(heads).addClass('head');
      $grid.eq(prevSnake[0]).removeClass('head');
      snakeInd();
      prevSnake.push(heads);
    }

    ////////////////////////////////////////////////////////////////
    if($grid.eq(heads).hasClass( 'food' )){
      console.log('Works');
      $grid.eq(heads).removeClass('food');
      score++;
      snake++;
      $('span').html(score);
    }else{
      console.log('Nope');
      console.log(heads);
    }
  }
  //////////////////////////////////////////////////////////////////
  function moveUp(){
    up = 1;
    right = null;
    down = null;
    left = null;
    move();
  }
  //////////////////////////////////////////////////////////////
  function moveRight(){
    up = null;
    right = 2;
    down = null;
    left = null;
    move();
  }
  ///////////////////////////////////////////////////////////////
  function moveDown(){
    up = null;
    right = null;
    down = 3;
    left = null;
    move();
  }
  /////////////////////////////////////////////////////////////////
  function moveLeft(){
    up = null;
    right = null;
    down = null;
    left = 4;
    move();
  }
  ///////////////////////////////////////////////////////////////
  function enter(){
    console.log('Enter');
    move();
    const intervalSet = setInterval(move, 300);
    return intervalSet;


  }
  /////////////////////////////////////////////////////////////////
  function esc(){
    console.log('Escape');
  }

  window.addEventListener('keydown', function (e) {
    if (event.defaultPrevented) {
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowUp':
        moveUp();
        break;
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      case 'Enter':
        enter();
        break;
      case 'Escape':
        esc();
        break;
      default:
        return;
    }

    e.preventDefault();
  }, true);

});
