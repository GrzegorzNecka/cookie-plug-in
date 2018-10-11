(function ($, window, document, undefined) {


    //Save parametrs to local Storage
    function saveToLS(key, val) {

        if( !("localStorage" in window) ) return;

        window.localStorage.setItem(key, val);
    }
    
    //Read parametr from local Storage

    function readFromLS(key) {
        
        //if web browser doesn't have localStorage object, end function
        if( !("localStorage" in window) ) return;

        return window.localStorage.getItem(key);
    }


    
    
    //Plugin
    $.fn.cookieAlert = function (userOptions) {
        
        //if cookiesAccepted has val = 1 in local storage, end function
        if( readFromLS("cookieAccepted") === "1" ) {
            return this;
        }
        
        //mix default&user options
        var options = $.extend({}, $.fn.cookieAlert.defaults, userOptions);
        
        //create elements
        var div = $("<div></div>", {
            "class": options.containerClass
        }).hide();

        var p = $("<p></p>", {
            "class": options.textClass,
            "text": options.message
        });

        var span = $("<span></span>", {
            class: options.closeClass,
            "html": options.closeIcon
        });

        
        //adding crated block 
        p.append(span);
        div.append(p);
        this.prepend(div);
        
        //animation
        div.slideDown(options.animSpeed);
        
     
        //event
        span.on("click", function () {
            
            //add to local storage key = cookieAccepted and val = 1
            saveToLS("cookieAccepted", 1);

            div.slideUp(options.animSpeed, function () {
                $(this).remove();
            });

        }); //.event

        return this;

    }; //.plugin

    
    //default options
    $.fn.cookieAlert.defaults = {
        message: "ta strona wykorzystuje pliki cookie",
        closeIcon: "x",
        animSpeed: 300,
        containerClass: "cookie",
        textClass: "cookie__text",
        closeClass: "cookie__close"
    };

})(jQuery, window, document);
