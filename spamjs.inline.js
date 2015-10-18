_define_({
  name : "spamjs.inline",
  using : ["jQuery","jsutils.file"]
}).as(function(jqxform,jQuery,fileUtil){

  var $ = jQuery;

  return {
    inlineType : "default",
    viewSrc : "default.view.html",
    editSrc : "default.edit.html",
    callInlineEvent : function(eventName,args){
      if(is.Function(this[eventName])){
        return this[eventName].apply(this,arguments);
      }
    },
    /**
     Renders input from tpl

     @method render()
     **/
    render: function() {
      //this.$input = this.$tpl.find('input');
      return this.callInlineEvent("_render_",arguments);
    },

    /**
     Default method to show value in element. Can be overwritten by display option.

     @method value2html(value, element)
     **/
    value2html: function(value, element) {
      fileUtil.loadView(is.String(this.viewSrc) ? this.path(this.viewSrc) : this.viewSrc,value).done(function(obj){
        $(element).data(value || {}).html(obj.html);
      });
    },

    /**
     Gets value from element's html

     @method html2value(html)
     **/
    html2value: function(html) {
      /*
       you may write parsing method to get value by element's html
       e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
       but for complex structures it's not recommended.
       Better set value directly via javascript, e.g.
       editable({
       value: {
       city: "Moscow",
       street: "Lenina",
       building: "15"
       }
       });
       */
      return this.callInlineEvent("_html2value_",arguments);
    },

    /**
     Converts value to string.
     It is used in internal comparing (not for sending to server).

     @method value2str(value)
     **/
    value2str: function(value) {
      var str = '';
      if(value) {
        for(var k in value) {
          str = str + k + ':' + value[k] + ';';
        }
      }
      return str;
    },

    /*
     Converts string to value. Used for reading value from 'data-value' attribute.

     @method str2value(str)
     */
    str2value: function(str) {
      /*
       this is mainly for parsing value defined in data-value attribute.
       If you will always set value by javascript, no need to overwrite it
       */
      return str;
    },

    /**
     Sets value of input.

     @method value2input(value)
     @param {mixed} value
     **/
    value2input: function(value) {
      var self = this;
      fileUtil.loadView(is.String(this.editSrc) ? this.path(this.editSrc) : this.editSrc, value).done(function(obj){
        self.$tpl.data(value || {}).html(obj.html);
      });
    },

    /**
     Returns value of input.

     @method input2value()
     **/
    input2value: function() {
      return this.callInlineEvent("_input2value_",this.$tpl.data());
    },
    _input2value_: function(eName,data) {
      data.name = this.$tpl.find("[name=name]").val();
      return data;
    },
    /**
     Activates input: sets focus on the first field.

     @method activate()
     **/
    activate: function() {
      //this.$input.filter('[name="city"]').focus();
      return this.callInlineEvent("_activate_",arguments);
    },

    /**
     Attaches handler to submit form in case of 'showbuttons=false' mode

     @method autosubmit()
     **/
    autosubmit: function() {
      return this.callInlineEvent("_autosubmit_",arguments);
    },
    defineEditableForm : function(){
      var formType = this.inlineType || this.name || "default";
      var SpamjsInline = function (options) {
        this.init(formType, options, SpamjsInline.defaults);
      };

      //inherit from Abstract input
      $.fn.editableutils.inherit(SpamjsInline, $.fn.editabletypes.abstractinput);

      $.extend(SpamjsInline.prototype,this);

      SpamjsInline.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div class="editable-'+formType+'"></div>',
        inputclass: ''
      });
      $.fn.editabletypes[formType] = SpamjsInline;
    },
    _ready_ : function(){
      this.defineEditableForm();
    }
  };

});