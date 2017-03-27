/**
 * Plugin para dar funcionalidad a un checkbox para marcar/desmarcar todos
 * 
 * Dependencias: jQuery 
 * Date: 2016-02-15
 *  
 * @author Diego Malagón 
 * @param {Funtion} $ jQuery
 * @returns {undefined}
 */
(function($){
    
    var Checkall = function(){
        var $el;
        var options;
        var selector;
        var $checkboxes;
        
        var init = function(){
            selector = $el.data("check");
            $checkboxes = $(selector);
            
            // Marcar checkbox principal si todos los checkbox estan seleccionados
            validateAllChecked();
            
            // Evento change sobre checkbox principal
            $el.on("change", function(){
                var checked = $el.is(":checked");
                
                // Marcar/desmarcar todos los checkboxes
                $checkboxes.prop("checked", checked);                
                
                // Disparar evento change de cada checkbox
                $checkboxes.trigger("change");
                
                // Callback al cambiar checkbox principal
                if(typeof options.onChangeAll === "function"){
                    options.onChangeAll($el, checked, $checkboxes);
                }
            });
            
            // Evento change sobre checkboxes
            $checkboxes.on("change", function(){   
                // Marcar checkbox principal si todos los checkbox estan seleccionados
                validateAllChecked();
                
                // Callback al cambiar alguno de los checkboxes
                if(typeof options.onChangeOne === "function"){
                    options.onChangeOne(this, $(this).is(":checked"));
                }
            });
        };
        
        /**
         * Función que marca o desmarca el checkbox principal si todos estan marcados o no
         * 
         * @returns {undefined}
         */
        var validateAllChecked = function(){
            // Si todos los checkbox estan seleccionados
            if(isAllChecked()){
                $el.attr("checked", true);
            }
            else{
                $el.attr("checked", false);
            }
        };
                
        /**
         * Función que verifica si todos los checkboxes están marcados
         * 
         * @returns {Boolean}
         */
        var isAllChecked = function(){
            var allchecked = true;
            
            $checkboxes.each(function(){
                if(!$(this).is(":checked")){
                    allchecked = false;
                    return false;
                }
            });
            
            return allchecked;
        };
        
        return {
            init: function(element, opts){
                $el = $(element);
                options = opts;
                
                init();
            }
        };
    };
    
    $.fn.checkall = function(options, args){      
        var element = this;
        var Plugin = new Checkall();
        
        if(Plugin[options]){
            return Plugin[options](args);
        }
        else if(typeof(options) === "object" || !options){
            
            options = $.extend({}, $.fn.checkall.defaults, options);
            
            return Plugin.init(element, options, args);
        }
    };
    
    $.fn.checkall.defaults = {
        onChangeAll: null,
        onChangeOne: null
    };
    
})(jQuery);


