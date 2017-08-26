$(() => {

  const game = document.getElementById('game');
  for (let i = 0; i < 3600; i++) {
    game.innerHTML += '<div class="pix"></div>';
  }

  //getting all variables necesary to run the SNAKESTEIN
  const keyUp = 38;
  const keyDown = 40;
  const keyRight = 39;
  const keyLeft =  37;
  const $grid = $('.pix');
  const $game = $('.game');
  let heads = 3570;
  // let tail = 401;
  let up = null;
  let right = null;
  let down = null;
  let left = null;

  const prevSnake = [];


  ///////////////////////////////////////////////////////////////////////////////////////////
  //                               ~ The SnakeStein Code ~                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////

  //Remove the first index from the array witch should be the tail of the snake
  function  snakeInd(){
    if(prevSnake.length === 10){
      prevSnake.shift(0);
    }
  }
  function move(){
    //////////////////////////////////////////////////////////////////////////
    if(up === null && right === null && down === null && left === null){
      heads = heads - 60;
      $grid.eq(heads).addClass('head');
      $grid.eq(prevSnake[0]).removeClass('head');
      snakeInd();
      prevSnake.push(heads);


    //////////////////////////////////////////////////////////////////////////
    }else if(up === 1 && right === null && down === null && left === null){
      heads = heads - 60;
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
      heads = heads + 60;
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
    return  setInterval(move, 100);
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
