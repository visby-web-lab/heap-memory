if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Template.start_screen.rendered = function () {
    $(".table").hide();
  }

  Template.start_screen.events({
    'submit .name': function (event) {
      event.preventDefault();
      var self = this; 
      Players.insert({name: $(event.currentTarget).find("#name_field").val()}, function (error, result) {
        if (error) {
          console.log("Error: ", error);
        } else {
          console.log(result, Players.findOne({_id: result}).name);
          $(".table").fadeIn();
        }
      });

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
