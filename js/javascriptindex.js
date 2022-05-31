if (Enabler.isInitialized()) {
              init();
            } else {
              Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
            }
            
            // Se ejecuta cuando el Enabler está preparado.
            function init() {
              if (Enabler.isPageLoaded()) {
                   
                politeInit();
              } else {
                Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
              }
            };
            
            // Se ejecuta cuando la página se ha cargado por completo.
            function politeInit(){
                document.getElementById("cargando").innerHTML=" ";
              // Añada el código para ocultar la imagen o la animación de carga y suba los recursos
                document.getElementById("Img3M").style.visibility="visible";
                const element = document.querySelector('#Img3M');
                
                element.classList.add('animate__animated', 'animate__zoomIn');
                element.addEventListener('animationend', () => {
                   document.getElementById("maininfo").style.visibility="visible";
                   const element = document.querySelector('#maininfo');
                   element.classList.add('animate__animated', 'animate__zoomIn');
                });
              // de la creatividad o inicie la animación de la creatividad.
            };
                function open_nav() {
                   $j('html').addClass('panel-nav');
                   is_open = 1;
                }
                
                function close_nav() {
                    $j('html').removeClass('panel-nav');
                    is_open = 0;
                }
                
                function myFunction(x) {
                    var menu = document.querySelector('.hamburger');
                    // metodo
                    function toggleMenu (event) {
                      this.classList.toggle('is-active');
                      document.querySelector( ".menu" ).classList.toggle("is_active");
                      event.preventDefault();
                    }
                    menu.addEventListener('click', toggleMenu, false);
                }
                
                var x = window.matchMedia("(max-width: 701px)")
                myFunction(x) // Ocultar el menu cuando la pantalla sea pequeña
                x.addListener(myFunction);
