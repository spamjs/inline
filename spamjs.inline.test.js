_define_({
  name: "spamjs.inline.test",
  extend : "spamjs.view",
  using: ["jQuery"]
}).as(function (test) {

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