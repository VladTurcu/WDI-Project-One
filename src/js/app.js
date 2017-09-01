///////////////////////////////////////////////////////////////////////////////////////////
//                               ~ The SnakeStein Code ~                                 //
///////////////////////////////////////////////////////////////////////////////////////////
$(() => {
  let intervalSet = null;
  let intervalNumbers = null;
  let classNumber = null;
  const $game = $('#game');
  for (let i = 0; i < 1500; i++) {
    $game.append('<div id="pix" class="pix"></div>');
  }

  //global variables
  const $click = $('#click')[0];
  const $correct = $('#correct')[0];
  const $fail = $('#fail')[0];

  $click.volume = 0.5;
  $correct.volume = 0.3;
  $fail.volume = 0.7;

  const $startBtn = $('#start');
  const $resetBtn = $('#reset');
  const $grid = $('.pix');
  const $intro = $('.intro');
  const $restartBtn = $('#restartBtn');
  const $info = $('#info');
  const $infoBtn = $('#infoBox');
  const $howtoBtn = $('#how');

  //Mobile movement control buttons
  const $upBtn = $('.up');
  const $rightBtn = $('.right');
  const $downBtn = $('.down');
  const $leftBtn = $('.left');

  // Keyboard arrow codes
  const keyUp = 38;
  const keyDown = 40;
  const keyRight = 39;
  const keyLeft =  37;

  //Arrays with numbers Level 1, Level 2
  const numbers1 = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 8, 8, 8, 8, 12, 12, 12, 12, 16, 16, 16, 16, 32, 32, 32, 32, 64, 64, 64, 64, 128, 128,
    128, 128, 256, 256, 256, 256, 512, 512, 512, 512];
  const numbers2 = [1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 16, 16, 16, 16, 256, 256, 256, 256];
  //Game values

  let speed = null;
  let heads = 1480;
  let up = null;
  let right = null;
  let down = null;
  let left = null;
  let score = 0;
  let result = 1;
  let resultM = 2;
  let prevSnake = [];
  let snake = 4;
  const setSpeed = 5000;
  let level = 1;
  let life = 3;
  let infoBox = false;





  // SnakeStein start function
  function startGame(){
    const radio =  $('input[name="dificult"]:checked').val();
    speed = radio;
    $intro.fadeOut('easing');
    up = null;
    right = null;
    down = null;
    left = null;
    score = 0;
    result = 1;
    prevSnake = [];
    startSnake();
    $click.play();

  }



  // Reset game function
  function resetGame(){
    prevSnake = [];
    $intro.fadeOut('easing');
    $grid.removeClass('head');
    heads = 1480;
    up = null;
    right = null;
    down = null;
    left = null;
    snake = 4;
    // result = 1;
    startSnake();
    $click.play();

  }

  //Function called when hit borders and get wrong number
  function snakeDie(){
    life--;
    $('span').html('');
    $grid.removeClass('food').html('');
    $grid.removeClass('head').html('');
    stopSnake();
    $fail.play();
    if(life === 0){
      $('#restart').show('slow');
    }else{
      console.log('Life');
      $('#res').show('slow');
    }
  }



  //Restart game  function
  function restartGame(){
    console.log('click');
    $intro.fadeOut('easing');
    $('#intro').show('easing');
    intervalSet = null;
    intervalNumbers = null;
    classNumber = null;
    heads = 1480;
    up = null;
    right = null;
    down = null;
    left = null;
    score = 0;
    result = null;
    resultM = 1;
    prevSnake = [];
    snake = 4;
    level = 1;
    life = 3;
    $click.play();
  }



  // Getting random index numbers and displaying fiboncci sequence on page ////////////////
  function numbers(){
    if(score === 50)level = 2;
    if(level===1){
      $grid.removeClass('food').html('');
      for(let i = 0; i < numbers1.length ; i++ ){
        const rand = Math.round(Math.random() * 2100);
        const numb = numbers1[i];
        $grid.eq(rand).addClass('food').html(numb);
      }
    }else if(level === 2){
      $grid.removeClass('food').html('');
      result = 2;
      for(let i = 0; i < numbers2.length ; i++ ){
        const rand = Math.round(Math.random() * 2100);
        const numb = numbers2[i];
        $grid.eq(rand).addClass('food').html(numb);
      }
    }
  }

  //Addition GAME LEVEL 1 ///////////////////////////////////////////////

  //Game win conditions

  function addition(){
    // Removing class .food if conditions are met ///////////////////
    classNumber = parseFloat($grid.eq(heads).html());
    if($grid.eq(heads).hasClass( 'food' ) && classNumber === result){
      $grid.eq(heads).removeClass('food');
      score += 5;
      snake= snake + 2;
      result = result + classNumber;
      $grid.eq(heads).html('');
      $correct.play();
    }else if($grid.eq(heads).hasClass( 'food' ) && classNumber !== result){
      snakeDie();
    }
  }
  //END OF Addition GAME LEVEL 1 ///////////////////////////////////////////////


  // Multiply (Level 2) game win conditions
  function multiply(){
    classNumber = parseFloat($grid.eq(heads).html());
    if($grid.eq(heads).hasClass( 'food' ) && classNumber === resultM){
      $grid.eq(heads).removeClass('food');
      score += 5;
      resultM = resultM * classNumber;
      snake= snake + 2;
      $grid.eq(heads).html('');
    }else if($grid.eq(heads).hasClass( 'food' ) &&  resultM !== classNumber ){
      snakeDie();
    }
  }

  //Remove the first index from the array witch should be the tail of the snake
  function snakeInd(){
    if(prevSnake.length === snake)prevSnake.shift(0);
  }

  //Adding and removing class to make The Snakestein move
  function addRemoveClass(){
    $grid.eq(heads).addClass('head');
    $grid.eq(prevSnake[0]).removeClass('head');
    snakeInd();
    prevSnake.push(heads);
  }

  //Snakestein movement controls
  function moveSnake(){
    if(up === null && right === null && down === null && left === null){
      heads = heads - 50;
      addRemoveClass();
    }else if(up === 1){
      heads = heads - 50;
      addRemoveClass();
    }else if(right === 2){
      heads = ++heads;
      addRemoveClass();
    }else if(down === 3){
      heads = heads + 50;
      addRemoveClass();
    }else if(left === 4){
      heads = --heads;
      addRemoveClass();
    }

    //  Killing the SnakeStein when overlay with self
    for (let i = 0; i < prevSnake.length - 2; i++) {
      if (prevSnake[i + 1] === prevSnake[prevSnake.length - 1] ||
        prevSnake[prevSnake.length - 1] < 0 ||
        prevSnake[prevSnake.length - 1] > 1500 )snakeDie();
    }

    //SnakeStein die if touch border right
    const boardR = [];
    for(let e = 1; e < 1550; e += 50){
      boardR.push(e);
    }
    boardR.forEach(function(item){
      if(prevSnake[prevSnake.length - 1] === item && right === 2)snakeDie();
    });

    //SnakeStein die if touch border left
    const boardL = [];
    for(let e = 1549; e > 0; e -= 50){
      boardL.push(e);
    }

    boardL.forEach(function(item){
      if(prevSnake[prevSnake.length - 1] === item && left === 4)snakeDie();
    });

    if(level === 1) addition();
    if(level === 2) multiply();
    $('.life').html(life);
    $('.score').html(score);
    $('.level').html(level);
  }

  //////////////////////////////////////////////////////////////////
  function moveUp(){
    up = 1;
    right = null;
    down = null;
    left = null;
    moveSnake();
  }

  //////////////////////////////////////////////////////////////
  function moveRight(){
    up = null;
    right = 2;
    down = null;
    left = null;
    moveSnake();
  }

  ///////////////////////////////////////////////////////////////
  function moveDown(){
    up = null;
    right = null;
    down = 3;
    left = null;
    moveSnake();
  }

  /////////////////////////////////////////////////////////////////
  function moveLeft(){
    up = null;
    right = null;
    down = null;
    left = 4;
    moveSnake();
  }

  ///////////////////////////////////////////////////////////////
  function startSnake(){
    intervalSet = setInterval(moveSnake, speed);
    intervalNumbers = setInterval(numbers, setSpeed);
  }

  /////////////////////////////////////////////////////////////////
  function stopSnake(){
    clearInterval(intervalSet);
    clearInterval(intervalNumbers);
  }

  window.addEventListener('keydown', function (e) {
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
      // case 'Enter':
      //   startSnake();
      //   break;
      case 'Escape':
        stopSnake();
        break;
    }
  }, true);
  function info(){
    if(infoBox === false){
      $info.show();
      $click.play();
      infoBox = true;

    }else{
      $info.hide();
      $click.play();
      infoBox = false;
    }

  }
  $howtoBtn.on('click', info);
  $infoBtn.on('click', info);
  $startBtn.on('click', startGame);
  $resetBtn.on('click', resetGame);
  $restartBtn.on('click', restartGame);
  $upBtn.on('click', moveUp);
  $rightBtn.on('click', moveRight);
  $downBtn.on('click', moveDown);
  $leftBtn.on('click', moveLeft);
});
