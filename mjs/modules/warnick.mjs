const Warnick = {

    close: function(){
        // CLOSE 
        (() => {
            /* */
            if (document.querySelector(".close")) {
                document.querySelectorAll(".close").forEach(function(obj) {
                    obj.addEventListener("click", function(e) {
                        e.target.parentNode.remove();
                    });
                });
            }
        })();
    },

    menu_toggle: function(){
        // MENU TOGGLE
        (() => {
            /* */
            if (document.querySelector(".menu_toggle")) {
              document.querySelectorAll(".menu_toggle").forEach(function(obj) {
                obj.addEventListener("click", function() {
                  document.body.classList.toggle("menu_hidden");
                });
              });
            }
        })();
    },

    init: function(){
        this.menu_toggle();
        this.close();
    }
}

export { Warnick }