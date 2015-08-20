_tag_("spamjs.inline.tag", function (inline) {

  var jq = module("jQuery");

  return {
    tagName: "x-inline",
    events: {
      "change a[view-link]" : "internChanges"
    },
    accessors: {
      value: {
        type: "string",
        default: "",
        onChange: "valueOnChange"
      },
      popup: {
        type: "boolean",
        default: true
      },
      type: {
        type: "string",
        default: "default"
      },
      emptyString: {
        type: "string",
        default: "Select"
      }
    },
    attachedCallback: function () {
      var self = this;
      this.$.innerHTML = '<a view-link href=# data-title="' + this.$.placeholder + '" >' + this.$.innerHTML + '</a>';

      this.$a = jq(this.$).find("a[view-link]").data(this.$.dataset);

      self.$a.editable({
        send: 'never',
        mode: (self.$.popup ? 'popup' : 'inline'),
        type: self.$.type
      }).on("save", debounce(function (e, params) {
        self.$.value = params.newValue;
        self.setValue(params.newValue);
        self.trigger("change");
        self.trigger("input");
      }));
    },
    detachedCallback: function () {
      this.$a.editable("destroy");
    },
    internChanges : function(e){
      return preventPropagation(e);
    },
    setValue: function (newValue) {
      this.$a.editable("option","value", newValue);
    },
    valueOnChange: function (e, oldValue, newValue) {
      this.setValue(newValue);
    }
  };
});