responses = {
  welcome:    'Enter the scrambled word',
  enter:      'Press enter to try your answer',
  correct:    'Good job! Can you get this one?',
  incorrect:  'Nope. It was ',
  blank:      'Here, try another one',
};

$(document).ready(function() {
  $('#response').text(responses['welcome']);
  initialize();
  pickNextWord();
  $('input').focus();
  $('input').keypress(handleKey);
});

function initialize() {
  // Get previous scores from persistent storage
  loadScores();

  // Load colors from stylesheet
  var colorContainer = $('<div style="display: none;">').appendTo($('body'));
  document.defaultColor = $('<input>').appendTo(colorContainer).css('background-color');
  document.correctColor = $('<input class="correct">').appendTo(colorContainer).css('background-color');
  document.incorrectColor = $('<input class="incorrect">').appendTo(colorContainer).css('background-color');
  colorContainer.remove();

  // Word set
  document.wordPool = [
    {unscrambled: 'uncoil', scrambled: 'clinou'},
    {unscrambled: 'influx', scrambled: 'flixun'},
    {unscrambled: 'frolic', scrambled: 'frilco'},
    {unscrambled: 'joyous', scrambled: 'yoosuj'},
    {unscrambled: 'triple', scrambled: 'plerti'},
    {unscrambled: 'martin', scrambled: 'rantim'},
    {unscrambled: 'trill', scrambled: 'lirlt'},
    {unscrambled: 'elope', scrambled: 'leepo'},
    {unscrambled: 'nether', scrambled: 'rethen'},
    {unscrambled: 'sexton', scrambled: 'nostex'},
    {unscrambled: 'probe', scrambled: 'borep'},
    {unscrambled: 'magic', scrambled: 'gimca'},
    {unscrambled: 'impact', scrambled: 'timcap'},
    {unscrambled: 'snappy', scrambled: 'spynap'},
    {unscrambled: 'facet', scrambled: 'tafec'},
    {unscrambled: 'novel', scrambled: 'venol'},
    {unscrambled: 'lotion', scrambled: 'toonil'},
    {unscrambled: 'cymbal', scrambled: 'myclab'},
    {unscrambled: 'patch', scrambled: 'chapt'},
    {unscrambled: 'draft', scrambled: 'tarfd'},
    {unscrambled: 'arcade', scrambled: 'draace'},
    {unscrambled: 'chorus', scrambled: 'coshur'},
    {unscrambled: 'abbot', scrambled: 'toabb'},
    {unscrambled: 'elate', scrambled: 'teale'},
    {unscrambled: 'hazard', scrambled: 'zardah'},
    {unscrambled: 'verbal', scrambled: 'blaver'},
  ]
}

function pickNextWord() {
  var wordbox = $('#word');
  document.currentWord = document.wordPool[Math.floor(Math.random() * document.wordPool.length)]
  wordbox.text('');
  wordbox.hide();
  wordbox.text(document.currentWord.scrambled);
  wordbox.fadeIn(800);
}

function checkWord() {
  var input = $('input');
  if (input.val().toLowerCase() == document.currentWord.unscrambled) {
    // Correct answer
    input.css({'background-color': document.correctColor});
    input.animate({'background-color': document.defaultColor}, 800);
    $('#response').text(responses['correct']);
    $('#correct').text(++document.correctCount);
  } else {
    // Incorrect answer
    input.css({'background-color': document.incorrectColor});
    input.animate({'background-color': document.defaultColor}, 800);
    if (input.val() == '')
      $('#response').text(responses['blank']);
    else
      $('#response').text(responses['incorrect'] + document.currentWord.unscrambled);
    $('#incorrect').text(++document.incorrectCount);
  }
  persistScores();
  pickNextWord();
  input.val('');
}

function webStorageSupported() {
  return ('localStorage' in window) && window['localStorage'] !== null;
}

function loadScores() {
  if (webStorageSupported()) {
    document.correctCount = localStorage['correctCount'] || 0;
    document.incorrectCount = localStorage['incorrectCount'] || 0;
  } else {
    document.correctCount = 0;
    document.incorrectCount = 0;
  }

  $('#correct').text(document.correctCount);
  $('#incorrect').text(document.incorrectCount);
}

function persistScores() {
  if (webStorageSupported()) {
    localStorage.setItem('correctCount', document.correctCount);
    localStorage.setItem('incorrectCount', document.incorrectCount);
  }
}

function handleKey(event) {
  var key = event.which;
  if (key == 13) { // enter
    checkWord();
  } else {
    $('#response').text(responses['enter']);
  }
}
