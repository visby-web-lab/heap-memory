if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("player", {});
    Session.set('cardInTurnCounter', 0);
  });
  
  // counter starts at 0

  Template.start_screen.rendered = function () {
    $(".table").hide();
  };

  Template.start_screen.events({
    'submit .name': function (event) {
      event.preventDefault();
      var self = this; 
      Players.insert({name: $(event.currentTarget).find("#name_field").val()}, function (error, result) {
        if (error) {
          console.log("Error: ", error);
        } else {
          Session.set("player", {name: Players.findOne({_id: result}).name});
          $(".table").fadeIn();
          $(event.currentTarget).fadeOut();
        }
      });
    },

    'click .card': function (evt, template) {
      var thisCard = this,
        cardCounter = Session.get('cardInTurnCounter');
      console.log("clicked card: %s", JSON.stringify(thisCard));
      // First card - show it and remember
      if (cardCounter == 0) {
        Session.set('openCardPairNumber', thisCard.imagePair);
      } else {
        if (thisCard.imagePair === Session.get('openCardPairNumber')) {
          //MATCH !!!!
          console.log("Matched pair %d", thisCard.imagePair);
          var cardsToRemove = VisibleCards.find({imagePair: thisCard.imagePair}).fetch();
          cardsToRemove.forEach(function (cardItem) {
            VisibleCards.upsert(cardItem._id, {$set: { removed: true }});
          });
        }
        Session.set('openCardPairNumber', undefined);
      }
      Session.set('cardInTurnCounter', cardCounter == 1? 0: 1);

    }
  });
  Template.start_screen.helpers({
    'player': function() {
      return Session.get("player");
    }, 
    'visibleCards': function() {
      return VisibleCards.find().fetch();
    } 
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
