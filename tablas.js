function crearTabla(datos){
	var buffer;
	
	buffer = $('<table>').attr({
		id: datos.id
	});
	
	if(typeof datos.clase != 'undefined')
		buffer.addClass(datos.clase);
	if(typeof datos.estilo != 'undefined')
		buffer.css(datos.estilo);
	buffer.appendTo('#'+datos.nodo_base);
}

function crearFila(datos){
	var buffer;
	
	buffer = $('<tr>').attr({
		id: 'fila_'+datos.id
	});
	
	if(typeof datos.clase != 'undefined')
		buffer.addClass(datos.clase);
	if(typeof datos.estilo != 'undefined')
		buffer.css(datos.estilo);
	buffer.appendTo('#'+datos.nodo_base);
	
	datos.celdas.forEach(function(celda){
		buffer = $('<td>').attr({
			id: 'celda_'+celda.id,
			colspan: celda.tamano
		}).html(celda.contenido);
		
		if(typeof celda.clase != 'undefined')
			buffer.addClass(celda.clase);
		if(typeof celda.estilo != 'undefined')
			buffer.css(celda.estilo);
		
		buffer.appendTo('#fila_'+datos.id);
	});
	
}

function crearContenidoHTML(datos){
	var buffer_html = $(datos.tipo);
	var buffer2;
	 
	
	if(typeof datos.id != 'undefined')
		buffer_html.attr({id: 'sHTML_' + datos.id});
	if(typeof datos.contenido != 'undefined')
		buffer_html.html(datos.contenido);
	if(typeof datos.clase != 'undefined')
		buffer_html.addClass(datos.clase);
	if(typeof datos.estilo != 'undefined')
		buffer_html.css(datos.estilo);
	if(typeof datos.href != 'undefined')
		buffer_html.attr({href: datos.href});
	
	if(typeof datos.abrirVentana != 'undefined'){
		buffer2 = datos.abrirVentana;
		buffer_html.attr({onclick: 'window.open(\''+buffer2.url+'\',\''+buffer2.nombre+'\',\''+buffer2.opciones+'\')'});
	}
	
	return buffer_html;
}

function crearTablaDin(datos){
   	var cargando = $('<div>').attr({id: 'cargando_'+datos.id}).css({'width':'100%','text-align':'center'});
	cargando.append($('<h1>').html('CARGANDO '+datos.datos.length+' '+datos.palabraClave.toUpperCase()));
	cargando.append($('<br>'));
	cargando.append($('<h1>').attr({src: '/backend/images/loading.gif'}).css({'width':'200','height':'200'}));
   	$('#'+datos.id).before(cargando);
	
   	var buffer = $('#'+datos.id).DataTable( {
	select: datos.seleccionar,
	data: datos.datos,
	columns : datos.columnas,
    sScrollY: datos.alto,
	bSort : datos.ordenar,
	info: datos.info,
    bPaginate: datos.paginar,	
    language: {
		lengthMenu: "Mostrar _MENU_ "+datos.palabraClave+" por p&aacute;gina",
		zeroRecords: "No se han encontrado "+datos.palabraClave,
		info: "Mostrando p&aacute;gina _PAGE_ of _PAGES_",
		infoEmpty: "No hay "+datos.palabraClave+" disponibles",
		infoFiltered: "(Se han filtrado _MAX_ "+datos.palabraClave+")",
		search: "Buscar"
	 }
   });
   	$('#cargando_'+datos.id).hide();
   return buffer;
}

function rellenarSelect(datos){
	$.each(datos.valores, function(i, e) {
		var option = $('<option>').attr({
			value: e[1]
		}).html(e[0]);
		
		if(e[1] == datos.seleccionado)
			option.attr('selected', true)
		option.appendTo('#'+datos.selectID);
	});
}