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
  let score = 1;
  const prevSnake = [];
  let snake = 4;
  const numbers1 = [1, 1, 1, 2, 2, 2, 4, 4, 8, 8, 8, 16, 16, 16, 32, 32, 32, 64, 64, 64, 128, 128, 128, 128, 256, 256, 256];
  const numbers2 = [2, 4, 6, 8, 10, 12];
  const numbers3 = [4, 6, 8, 10, 12, 14];
  const numbers4 = [6, 8, 10, 12, 14, 16];
  const numbers5 = [8, 10, 12, 14, 16, 18];
  const numbers6 = [10, 12, 14, 16, 18, 20];
  const combinations = [numbers1, numbers2, numbers3, numbers4, numbers5, numbers6];




  function getFood() {
    // for(let i = 0; i < 6 ; i++ ){
    const rand = Math.ceil(Math.random() * 1600);
    const numb = numbers1[Math.floor(Math.random()*numbers1.length)];
    $grid.eq(rand).addClass('food');
    $grid.eq(rand).html(numb);
    // }
  }

  for(let i = 0; i < numbers1.length ; i++ ){
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
    const classNumber = parseFloat($grid.eq(heads).html());

    // removing class .food
    if($grid.eq(heads).hasClass( 'food' ) && classNumber === score){
      $grid.eq(heads).removeClass('food');
      score = score + classNumber;
      snake= snake + 2;
      $('span').html(score);
      $grid.eq(heads).html('');
    }else if($grid.eq(heads).hasClass( 'food' ) && classNumber !== score){
      console.log('you lost');
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
    let interval = setInterval(move, 300);
    return interval;
  }

  /////////////////////////////////////////////////////////////////
  function esc(){
    console.log('Escape');
    return clearInterval(enter());
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
