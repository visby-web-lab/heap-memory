/**
 * Created by johan on 15-08-27.
 */

const numberOfCards = 20; // 5 by 4
const numberOfRows = 5;
const numberOfCols = 5;

function createGame() {
  var imagePairsLeft = [];
  for (var pairIndex = 0; pairIndex < numberOfCards/2; pairIndex++) {
    imagePairsLeft.push(pairIndex);
    imagePairsLeft.push(pairIndex);
  }
  for (var cardIndex = 0; cardIndex < numberOfCards; cardIndex++) {
    var row = Math.floor(cardIndex / 4),
      col = cardIndex % 4,
      xOffset = 0.6 * Math.random() - 0.3,
      yOffset = 0.6 * Math.random() - 0.3;
    rotation = Math.round(360 * Math.random());
    imagePair = imagePairsLeft.splice(Math.floor(Math.random() * imagePairsLeft.length), 1)[0];
    VisibleCards.insert({
      row: row,
      col: col,
      xOffset: xOffset,
      yOffset: yOffset,
      rotation: rotation,
      imagePair: imagePair
    });
  }

  console.log(VisibleCards.find().fetch());
}

Meteor.startup(function () {
  VisibleCards.remove({});
  createGame();
});