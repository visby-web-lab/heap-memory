if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("player", {});
  });

  // counter starts at 0
  Tracker.autorun( function () {
    var count = Players.find().count();
    if (count > 1) {
      if (_.isEmpty(Session.get("player"))) {
        Session.set("opponent", Players.findOne({_id: {$not: Session.get("player")}}));
        console.log(Session.get("opponent"));
      }
    }
  });

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
      var thisCard = this;
      console.log("clicked card: %s", JSON.stringify(thisCard));
      //
    }
  });
  Template.start_screen.helpers({
    'player': function() {
      return Session.get("player");
    }, 
    'opponent': function() {
      return Session.get("opponent");
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
