(function( $ ){
    $.fn.paramObj = function() {
        var paramObj = {};
        $.each(this.serializeArray(), function(_, kv) {
          if (paramObj.hasOwnProperty(kv.name)) {
            paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
            paramObj[kv.name].push(kv.value);
          }
          else {
            paramObj[kv.name] = kv.value;
          }
        });
        return paramObj;
    };
})( jQuery );

(function( $ ){
    $.fn.mailchimpList = function(callback) {
        var form, message;
        form = this;
        message = "[data-form="+$(this).attr("data-name")+"]";
        form.submit(function(event){
            var form_data = $(this).paramObj();
            var data;
            event.preventDefault();
            data = $(this).serialize() + '&url=' + encodeURIComponent(window.location.host),
            $.ajax({
                dataType: 'jsonp',
                url: $(this).attr("action"),
                data: data,
                success:function(mailchimp){
                    mailchimp.form_data = form_data;
                    $(message+" .success").hide();
                    $(message+" .error").hide();
                    $(message).show();
                    if(mailchimp.success){
                        $(message+" .success").show();
                    }else{
                        $(message+" .error").show().text("Something went wrong, "+mailchimp.message);
                    }
                    if(typeof callback !== "undefined") return callback(mailchimp);
                }
            });
        });
        return form;
    };
})( jQuery );