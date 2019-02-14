function crearMenu(datos){
	var buffer;
	
	buffer = $('<ul>').attr({
		id: datos.id
	});
	
	if(typeof datos.clase != 'undefined')
		buffer.addClass(datos.clase);
	if(typeof datos.estilo != 'undefined')
		buffer.css(datos.estilo);
	buffer.appendTo('#'+datos.nodo_base);
}
function crearTitulo(datos){ //id,estilo,clase,nodo_base,titulo,subMenu{id,titulo,clase,estilo,lista{titulo,url,clase,estilo}}
		var buffer;
	
	buffer = $('<li>').attr({
		id: 'li_titulo_'+datos.id
	});
	
	if(typeof datos.clase != 'undefined')
		buffer.addClass(datos.clase);
	if(typeof datos.estilo != 'undefined')
		buffer.css(datos.estilo);
	buffer.appendTo('#'+datos.nodo_base);
	
	$('<a>').attr({
		id: 'n_titulo_'+datos.id,
		href: '#'
	}).html(datos.titulo).appendTo('#li_titulo_'+datos.id);
	
	$('<div>').attr({
		id: 'div_sub_titulos_'+datos.id,
		href: '#'
	}).appendTo('#li_titulo_'+datos.id);
	
	$.each(datos.subMenu, function(i, sMenu){
		buffer = new Object();
		buffer = $('<div>').attr({
			id: 'div_subMenu_'+sMenu.id+i,
		}).html(sMenu.titulo);
		
		if(typeof sMenu.clase != 'undefined')
			buffer.addClass(sMenu.clase);
		if(typeof sMenu.estilo != 'undefined')
			buffer.css(sMenu.estilo);
		buffer.appendTo('#div_sub_titulos_'+datos.id);
		
		buffer = $('<ul>').attr({
			id: 'ul_subMenu_'+sMenu.id+i,
		});
		
		buffer.appendTo('#div_subMenu_'+sMenu.id+i);

		$.each(sMenu.lista.titulo, function(index,titulo){
			buffer = $('<li>').append($('<a>').attr({
				href: sMenu.lista.url[index]
			}).html(sMenu.lista.titulo[index]));

			buffer.appendTo('#ul_subMenu_'+sMenu.id+i);
		});
		
		
		
		
	});
}