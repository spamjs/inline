define({
  name: "spamjs.inline.test",
  extend : "spamjs.view",
  modules: ["jQuery","spamjs.inline"]
}).as(function (test,jq,inline) {

  module("spamjs.inline.tag");
  var $ = jQuery;

  return {
    src : [
      "spamjs.inline.test.html"
    ],
    _init_: function(){
       this.$$.loadView(this.path("spamjs.inline.test.html")).done(function(){
          this.find("#name").editable({
            mode : "inline"
          });
      });
    },
    _ready_: function () {


    }
  };

});