const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let missHit = 0;

let timerId = 0; 

function round() {
  // D FIXME: надо бы убрать "target" прежде чем искать новый
  $(".target").text('');
  $(".target").removeClass('target');
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // D TODO: помечать target текущим номером
  $(divSelector).text(hits+1)
  // D FIXME: тут надо определять при первом клике firstHitTime
  // передвинули в reload
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // D FIXME: спрятать игровое поле сначала
  $(".target").text('');
  $(".target").removeClass('target');
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(4);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(missHit);
  $("#win-message").removeClass("d-none");
  $(".game-field").addClass("d-none");
  clearInterval(timerId);
  $("#timer-message").addClass("d-none");
}

function handleClick(event) {
  // D FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(".game-field").removeClass("miss");
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else if ($(".game-field").hasClass("target"))
  { 
    $(event.target).addClass("miss");
    missHit = missHit + 1;
  }
  // D TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}
function reload()
{
  firstHitTime = getTimestamp();
  hits = 0;
  missHit = 0;
  $("#win-message").addClass("d-none");
  $(".game-field").removeClass("d-none");
  $("#button-reload").text('Играть заново');
  round();
  timerId = setInterval(function(){$("#time-left").text((getTimestamp()-firstHitTime) / 1000)}, 10)
  $("#timer-message").removeClass("d-none");
  $("#button-start").addClass('d-none');
  $("#button-reload").removeClass('d-none');
}

function init() {
  //  TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  
  $(".game-field").click(handleClick);
  $("#button-start").click(reload);
  $("#button-reload").click(function(){
        location.reload();
  });
  $("#win-message").addClass("d-none"); // убрать надпись с результатом

}

$(document).ready(init);
