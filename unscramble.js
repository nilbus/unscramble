responses = {
  welcome:    'Enter the scrambled word',
  enter:      'Press Enter to try your answer',
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
  document.correctCount = 0;
  document.incorrectCount = 0;

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
  var originalInputBackground = input.css('background-color');
  console.log(document.c=originalInputBackground);
  if (input.val().toLowerCase() == document.currentWord.unscrambled) {
    // Correct answer
    input.css({'background-color': '#68ED85'});
    input.animate({'background-color': originalInputBackground}, 800);
    $('#response').text(responses['correct']);
    $('#correct').text(++document.correctCount);
  } else {
    // Incorrect answer
    input.css({'background-color': '#FF7D6F'});
    input.animate({'background-color': originalInputBackground}, 800);
    if (input.val() == '')
      $('#response').text(responses['blank']);
    else
      $('#response').text(responses['incorrect'] + document.currentWord.unscrambled);
    $('#incorrect').text(++document.incorrectCount);
  }
  pickNextWord();
  input.val('');
}

function handleKey(event) {
  var key = event.which;
  if (key == 13) { // enter
    checkWord();
  } else {
    $('#response').text(responses['enter']);
  }
}
