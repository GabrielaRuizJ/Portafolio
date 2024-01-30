var turnos = [];
var turno= 0;

    const tiempoF = Date.now();
    const hoy = new Date(tiempoF);
    const fechoy = hoy.toLocaleDateString();
    document.getElementById("datfecha").innerHTML = fechoy;
    const horaInicio = '06:00';
    const horaFin = '18:00';
    const arrayHoras = generarArrayDeHoras(horaInicio, horaFin);
    if(arrayHoras){arrayTurnos(arrayHoras);}  

    function generarArrayDeHoras(horaInicio, horaFin) {
        const arrayHoras = [];
        const inicio = new Date(`2024-01-01 ${horaInicio}`);
        const fin = new Date(`2024-01-01 ${horaFin}`);
        while (inicio <= fin) {
          // Obtiene la parte de la hora y los minutos y los concatena en formato "hh:mm"
          const horaFormateada = `${inicio.getHours().toString().padStart(2, '0')}:${inicio.getMinutes().toString().padStart(2, '0')}`;
          arrayHoras.push(horaFormateada);
          inicio.setHours(inicio.getHours() + 1);
        }
        return arrayHoras;
    }

    function crearreserva(cancha,hora,horas){
        const bhora = horas[hora];
        if(bhora){
            turno = (cancha-1)+"_"+hora;
            $("#turno"+turno).css("background","#566573");
            $(".color"+turno).css("color","white");
            $("#horareserva").val(bhora);
            $("#canchareserva").val(cancha);        
            $("#exampleModal").modal({backdrop: 'static'});
            $("#exampleModal").modal('show');
        }else{
            $("#"+turno).css("background","var(--bs-table-bg)");
            $(".color"+turno).css("color","rgba(0,0,0,0.3)");
            mensaje("error","Datos incompletos");
        }
    }
    
    function guardarr(){
    
        var nombre = $("#nombrejugador").val();
        var email = $("#emailjugador").val();
        var hora = $("#horareserva").val();
        var cancha = $("#canchareserva").val();
        if (nombre && email && hora && cancha){
            Swal.fire({
                title: "Confirmación",
                text: "¿Esta seguro de realizar la siguiente reserva?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, reservar"
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Su reserva ha sido realizada con exito",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        location.reload();
                    });
                    
                }else{
                    limpiarv();
                }
            });
        }else{
            mensaje("error","Los campos no están completos");
        } 
    }
    
    function mensaje(tipo,mensaje1){
        Swal.fire({
            icon: tipo,
            title: "Mensaje",
            position:'top',
            text: mensaje1
        });
    }

    function limpiarv(){
        console.log("limpiar aca"+turno);
        $("#horareserva").empty();
        $("#canchareserva").empty();
        $("#turno"+turno).css("background","#eaecee");
        $(".color"+turno).css("color","rgba(0,0,0,0.3)");
        $("#nombrejugador").val("");
        $("#emailjugador").val("");
    }
    
    function arrayTurnos(arrayHoras){
            
        const tabla = document.getElementById('tdhorarios');
        const encabezado = document.createElement('tr');
        const th1 = document.createElement('th');
        encabezado.appendChild(th1);
        arrayHoras.forEach((nombreColumna,indice) => {
            const th = document.createElement('th');
            th.className ="table-secondary";
            th.textContent = nombreColumna;
            encabezado.appendChild(th);
        });
        tabla.appendChild(encabezado);
        var tabla2 = document.getElementById('tdturnos');  
        var contCancha = 0;
        for (var z1 = 0; z1 <= 12; z1++) {
            contCancha++
            var filas = document.createElement('tr');
            var span = document.createElement('span');
            span.innerHTML = "Cancha "+contCancha;
            var tdfila1 = document.createElement('td');
            tdfila1.appendChild(span);
            filas.appendChild(tdfila1);
        
            for (var z = 0; z <13; z++) {
                var tdfila = document.createElement('td');
                tdfila.id = "turno"+z1+"_"+z;
                tdfila.classList.add('border', 'text-center', 'align-middle', 'borrarborder');
                (function(contCancha,z,arrayHoras) {
                    tdfila.addEventListener('click', function() {
                        crearreserva(contCancha,z,arrayHoras);
                    });
                })(contCancha,z,arrayHoras);
                var element_i = document.createElement('i');
                element_i.classList.add('bi', 'bi-calendar2-plus', 'color'+z1+'_'+z);
                tdfila.appendChild(element_i);
                filas.appendChild(tdfila);
            }
            tabla2.appendChild(filas);
        }
    }


