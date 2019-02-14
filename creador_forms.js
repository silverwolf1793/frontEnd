var creadorFormsCatDependientes = [];
var creadorFormsCatDependientesConfig  = [];
var creadorFormsChkDependientes;
function crearForm(datos){//accion,metodo,Id,root
	if (typeof datos.accion == 'undefined')
		datos.accion = '#';
	$('<form>').attr({
		action: datos.accion,
		method: datos.metodo,
		id: datos.id
	}).addClass('form-inline').appendTo('#'+datos.raiz);
	$('<div>').attr({
		id: 'mainDiv_'+datos.id
	}).css(datos.css).appendTo('#'+datos.id);
	
	if(typeof datos.enSubmit !== 'undefined'){
		$('#'+datos.id).on("submit", datos.enSubmit);
	}
}
function inputsConLabel(datos){
	
	$.each(datos.inputs, function(i, e) {
	if(e.tipo != 'escondido'){	
		$('<div>').attr({
			class:'form-row align-items-center',
			id: 'row_'+datos.id+'_'+i
		}).append($('<div>').attr({
			class:'col',
			id: 'col_'+datos.id+'_'+i
		})).appendTo('#mainDiv_'+datos.raiz);


		$('<div>').attr({
			class:'input-group',
			id: 'input-group_'+datos.id+'_'+i
		}).appendTo('#col_'+datos.id+'_'+i);


		$('<span>').html(acentos(e.label,'html')).css(e.cssLabel).addClass('input-group-addon').appendTo('#input-group_'+datos.id+'_'+i);
	}
		
	if( e.tipo == 'select'){
		$('<select>').attr({
				id: i,
				name: i,
		}).css(e.cssInput).addClass(e.clase).appendTo('#input-group_'+datos.id+'_'+i);	
		
		$.each(e.opciones, function( index, value ) {
			if(value[1] == e.seleccionado)
				$('#'+i).append($('<option>').val(value[1]).html(acentos(value[0].toString(),'html')).prop('selected', true));
			else
		  		$('#'+i).append($('<option>').val(value[1]).html(acentos(value[0].toString(),'html')));
		});

		if (typeof e.enCambio != 'undefined')
			$('#'+i).change(e.enCambio);
		if(typeof e.seleccionado == 'undefined' || e.seleccionado == '')
			$('#'+i).prop("selectedIndex", -1);
		
		$('#'+i).select2({
			placeholder: acentos(e.recordatorio,'hex'),
			language: {
				noResults: function (params) {
				  return "No hay datos que mostrar";
				}
			  }
		});

			
	}
	else if( e.tipo == 'fecha'){
		$('<input>').attr({
				id: i,
				name: i,
				type: 'hidden'
			}).appendTo('#input-group_'+datos.id+'_'+i);
		$('<input>').attr({
				type: 'text',
				id: 'input' + i,
				name: 'input' + i,
				placeholder: acentos( e.recordatorio,'hex'),
				autocomplete: 'off'
			}).css(e.cssInput).addClass(e.clase).appendTo('#input-group_'+datos.id+'_'+i);
		moment.locale('es');
		$('#input'+i).daterangepicker({
			singleDatePicker: true,
			showDropdowns: true,
			minYear: 1901,
			maxYear: parseInt(moment().format('YYYY'),10),
			autoUpdateInput: false
		  }, function(start, end, label) {
			$('#input'+i).val(start.format('DD/MM/YYYY'));
			if(start.format("YYYYMMDD") != 'Invalid date')
				$('#'+i).val(start.format("YYYYMMDD"));
			else
				$('#'+i).removeAttr('value');
		  });
		if(typeof e.valor !== 'undefined'){
			$('#input'+i).val(e.valor);
			if(moment(e.valor,"DD/MM/YYYY").format("YYYYMMDD") != 'Invalid date')
				$('#'+i).val(moment(e.valor,"DD/MM/YYYY").format("YYYYMMDD"));
			else
				$('#'+i).removeAttr('value');
		}
		if(e.requerido == true)
			$('#input'+i).prop('required', true);
	}
	else if ( e.tipo == 'checkbox'){
		$('<span>').attr({
				id: 'span_'+datos.id+'_'+i
			}).css(e.cssInput).addClass('input-group-addon').appendTo('#input-group_'+datos.id+'_'+i);
		$('<input>').attr({
				type: e.tipo,
				id: i,
				name: i,
			}).addClass(e.clase).appendTo('#span_'+datos.id+'_'+i);
		if(e.checado == true)
			$('#'+i).prop('checked',true)
	}
	else if ( e.tipo == 'textarea'){
		$('<textarea>').attr({
				type: e.tipo,
				id: i,
				name: i,
				rows: e.filas,
				placeholder: acentos( e.recordatorio,'hex')
			}).val(e.valor).css(e.cssInput).addClass(e.clase).appendTo('#input-group_'+datos.id+'_'+i);
	}
	else if ( e.tipo == 'escondido'){
		$('<input>').attr({
				type: 'hidden',
				id: i,
				name: i				
			}).val(e.valor).appendTo('#mainDiv_'+datos.raiz);
	}
	else{
		$('<input>').attr({
				type: e.tipo,
				id: i,
				name: i,
				placeholder: acentos( e.recordatorio,'hex')
			}).css(e.cssInput).addClass(e.clase).appendTo('#input-group_'+datos.id+'_'+i);
		if(typeof e.valor !== 'undefined')
			$('#'+i).val(e.valor);
	}
	
	if(e.requerido == true & e.tipo != 'checkbox')
		$('#'+i).prop('required', true);
	$('<br>').appendTo('#row_'+datos.id+'_'+i);
	});
	
	
	
}
function labels(datos){
	$.each(datos.labels, function(i, e) {
		$('<div>').attr({
			class:'form-row align-items-center',
			id: 'row_'+datos.id+'_'+i
		}).append($('<div>').attr({
			class:'col',
			id: 'col_'+datos.id+'_'+i
		})).appendTo('#mainDiv_'+datos.raiz);
		
		$('<'+e.tamano+'>').append($('<span>').html(acentos(e.label,'html')).addClass('label label-'+e.tipo)).appendTo('#col_'+datos.id+'_'+i);
		$('<br>').appendTo('#mainDiv_'+datos.raiz);
		
	});
}
function botonSubmit(datos){//form,label,id,clase
	
	$('<div>').attr({
		class:'form-row align-items-center',
		id: 'row_'+datos.id
	}).appendTo('#mainDiv_'+datos.raiz);
	
	$('<div>').attr({
		class:'col',
		id: 'col_'+datos.id
	}).appendTo('#row_'+datos.id);
	
	$('<br>').appendTo('#col_'+datos.id);
	
	$('<div>').attr({
		class:'input-group',
		id: 'input-group_'+datos.id
	}).css(datos.css).appendTo('#col_'+datos.id);
	
	$('<button>').attr({
				type: 'submit',
				
			}).text(acentos(datos.label,'html')).addClass('btn btn-'+datos.clase).appendTo('#input-group_'+datos.id);
}
function crearLabelBotones(datos){//form,texto,id,clase,click
	
	$('<div>').attr({
		class:'form-row',
		id: 'row_'+datos.id
	}).appendTo('#mainDiv_'+datos.form);
	
	$('<div>').attr({
		class:'col',
		id: 'col_'+datos.id
	}).appendTo('#row_'+datos.id);
	
	$('<br>').appendTo('#col_'+datos.id);
	
	$('<div>').attr({
		class:'input-group',
		id: 'input-group_'+datos.id
	}).appendTo('#col_'+datos.id);
	
	if(typeof datos.mostrarLabel == 'undefined' || datos.mostrarLabel)
		$('<span>').text(datos.label).css({'width':datos.lAncho,'text-align': 'right'}).addClass('input-group-addon').appendTo('#input-group_'+datos.id);
	
	$.each(datos, function(i, e) {
		if(i != 'form' && i != 'label' &&i != 'lAncho' && i!= 'id' && i!= 'mostrarLabel'){
			if(typeof e.tipo == undefined)
				$('<button>').attr({
							'id': i,
							'name': i,
							'type': 'button',
							'onClick': e.click,
							'disabled': e.desactivado
						}).text(e.texto).css({'width':e.bAncho}).addClass(e.clase).appendTo('#input-group_'+datos.id);
			else
				$('<button>').attr({
						'id': i,
						'name': e.nombre,
						'type': e.tipo,
						'onClick': e.click,
						'disabled': e.desactivado
					}).text(e.texto).css({'width':e.bAncho}).val(e.valor).addClass(e.clase).appendTo('#input-group_'+datos.id);
		}
			
	});
}
function confSelectsDependientes(datos,config){
	creadorFormsCatDependientes.push(datos) ;
	creadorFormsCatDependientesConfig.push(config);
	var seleccionado;
	$.each(datos, function(i, e) {
		$('#'+config.idSelectPadre).append($('<option>').attr({
			'id': 'valor_'+config.idSelectPadre+i
		}).val(e.valor).html(acentos(e.nombre,'html')));
		
		if(config.valorSelPadre == e.valor){
			$('#valor_'+config.idSelectPadre+i).prop('selected', true);
			seleccionado = i;
			}
	});
	
	if(typeof datos[seleccionado] !== 'undefined')
	$.each(datos[seleccionado].hijos, function(index, hijo) {
		$('#'+config.idSelectHijo).append($('<option>').attr({
			'id': 'valor_'+config.idSelectHijo+index
		}).val(hijo.valor).html(acentos(hijo.nombre,'html')));

		if(config.valorSelHijo == hijo.valor)
			$('#valor_'+config.idSelectHijo+index).prop('selected', true);
	});
	
	if(typeof config.valorSelPadre == 'undefined' || config.valorSelPadre == ''){
		
		$('#'+config.idSelectPadre).prop("selectedIndex", -1);
		$('#'+config.idSelectHijo).prop("selectedIndex", -1);
		$('#'+config.idSelectHijo).prop("disabled",true);
	}
	if(typeof config.valorSelHijo == 'undefined' || config.valorSelHijo == ''){
		$('#'+config.idSelectHijo).prop("selectedIndex", -1).select2({				
		placeholder: acentos(config.recordatorioHijo,'hex'),
		language: {
			noResults: function (params) {
			  return "No hay datos que mostrar";
			}
		  }});
	}
	
	
	$('#'+config.idSelectPadre).select2({
		placeholder: acentos(config.recordatorioPadre,'hex'),
		language: {
			noResults: function (params) {
			  return "No hay datos que mostrar";
			}
		  }
	});
	
	if($('#'+config.idSelectHijo).children('option').length == 0){
			$('#'+config.idSelectHijo).prop("disabled",true);
			$('#'+config.idSelectHijo).select2();
		}
	else{
		$('#'+config.idSelectHijo).select2({				
			placeholder: acentos(config.recordatorioHijo,'hex'),
			language: {
				noResults: function (params) {
				  return "No hay datos que mostrar";
				}
			  }
		});
	}
	
	$('#'+config.idSelectPadre).change(function(t){
		var datos;
		var config;
		var id = this.id;
		$.each(creadorFormsCatDependientesConfig,function(i,e){
			if(id == e.idSelectPadre){
			   datos = creadorFormsCatDependientes[i];
			   config = e;
			}
		})
		
		var seleccionado = $('#'+config.idSelectPadre).val();
		$('#'+config.idSelectHijo).find('option').remove().end();
		
		$.each(datos, function(i, e) {
			if(seleccionado == e.valor){
				$.each(e.hijos, function(index, hijo) {
					$('#'+config.idSelectHijo).append($('<option>').attr({
						'id': 'valor_'+config.idSelectHijo+index
					}).val(hijo.valor).html(acentos(hijo.nombre,'html')));
					if(config.valorSelHijo == hijo.valor && config.valorSelPadre == e.valor)
						$('#valor_'+config.idSelectHijo+index).prop('selected', true);
				});
			}
		});
		
		$('#'+config.idSelectPadre).select2({
			placeholder: acentos(config.recordatorioPadre,'hex'),
			language: {
						noResults: function (params) {
						  return "No hay datos que mostrar";
						}
					  }
		});
				
		if($('#'+config.idSelectHijo).children('option').length == 0){
			$('#'+config.idSelectHijo).prop("disabled",true);
			$('#'+config.idSelectHijo).select2();
		}
		else{
			$('#'+config.idSelectHijo).prop("disabled",false);
			$('#'+config.idSelectHijo).prop("selectedIndex", -1);
			$('#'+config.idSelectHijo).select2({				
				placeholder: acentos(config.recordatorioHijo,'hex'),
				language: {
					noResults: function (params) {
					  return "No hay datos que mostrar";
					}
				  }
			});
		}
	});
}
function checkboxDependientes(datos){
	creadorFormsChkDependientes = datos;
	$.each(datos, function(i, e) {
		$('#'+e).change(function() {
			var id = this.id;
			$.each(creadorFormsChkDependientes, function(i, e) {
				if( id != e)
					$('#'+e).prop('checked',false);
			});
    	});
	});
}
function confCheckboxIntercambiable(datos){
	
	$.each(datos.escondido, function(i, e) {
			if($('#'+datos.control).is(':checked')){
					if(e.requerido){
						$('#row_'+datos.raiz+'_'+e.id).show();
						$('#'+e.id).prop("required",true);
						$('#input'+e.id).prop("required",true);
						if(typeof e.selector !== 'undefined'){
							$('#'+e.id).select2({
								placeholder: acentos(e.selector.recordatorio,'hex'),
								language: {
									noResults: function (params) {
									  return "No hay datos que mostrar";
									}
								  }
							});
						}
					}

					
				}
			else{
					if(e.requerido){
						$('#'+e.id).removeAttr("required");
						$('#input'+e.id).removeAttr("required");
						if(typeof e.selector !== 'undefined'){
							$('#'+e.id).select2({
								placeholder: acentos(e.selector.recordatorio,'hex'),
								language: {
									noResults: function (params) {
									  return "No hay datos que mostrar";
									}
								  }
							});
						}
					}
					$('#row_'+datos.raiz+'_'+e.id).hide();
				}	
			});
	$.each(datos.principal, function(i, e) {
				if(!$('#'+datos.control).is(':checked')){
					if(e.requerido){
						$('#row_'+datos.raiz+'_'+e.id).show();
						$('#'+e.id).prop("required",true);
						$('#input'+e.id).prop("required",true);
						if(typeof e.selector !== 'undefined'){
							$('#'+e.id).select2({
								placeholder: acentos(e.selector.recordatorio,'hex'),
								language: {
									noResults: function (params) {
									  return "No hay datos que mostrar";
									}
								  }
							});
						}
					}

					
				}
				else{
						if(e.requerido){
							$('#'+e.id).removeAttr("required");
							$('#input'+e.id).removeAttr("required");
							if(typeof e.selector !== 'undefined'){
								$('#'+e.id).select2({
									placeholder: acentos(e.selector.recordatorio,'hex'),
									language: {
										noResults: function (params) {
										  return "No hay datos que mostrar";
										}
									  }
								});
							}
						}
						$('#row_'+datos.raiz+'_'+e.id).hide();
					}	
			});
	
	$('#'+datos.control).change(function(){
		$.each(datos.escondido, function(i, e) {
			if($('#'+datos.control).is(':checked')){
					if(e.requerido){
						$('#row_'+datos.raiz+'_'+e.id).show();
						$('#'+e.id).prop("required",true);
						$('#input'+e.id).prop("required",true);
						if(typeof e.selector !== 'undefined'){
							$('#'+e.id).select2({
								placeholder: acentos(e.selector.recordatorio,'hex'),
								language: {
									noResults: function (params) {
									  return "No hay datos que mostrar";
									}
								  }
							});
						}
					}

					
				}
			else{
					if(e.requerido){
						$('#'+e.id).removeAttr("required");
						$('#input'+e.id).removeAttr("required");
						if(typeof e.selector !== 'undefined'){
							$('#'+e.id).select2({
								placeholder: acentos(e.selector.recordatorio,'hex'),
								language: {
									noResults: function (params) {
									  return "No hay datos que mostrar";
									}
								  }
							});
						}
					}
					$('#row_'+datos.raiz+'_'+e.id).hide();
				}	
			});
		$.each(datos.principal, function(i, e) {
				if(!$('#'+datos.control).is(':checked')){
					if(e.requerido){
						$('#row_'+datos.raiz+'_'+e.id).show();
						$('#'+e.id).prop("required",true);
						$('#input'+e.id).prop("required",true);
						if(typeof e.selector !== 'undefined'){
							$('#'+e.id).select2({
								placeholder: acentos(e.selector.recordatorio,'hex'),
								language: {
									noResults: function (params) {
									  return "No hay datos que mostrar";
									}
								  }
							});
						}
					}

					
				}
				else{
						if(e.requerido){
							$('#'+e.id).removeAttr("required");
							$('#input'+e.id).removeAttr("required");
							if(typeof e.selector !== 'undefined'){
								$('#'+e.id).select2({
									placeholder: acentos(e.selector.recordatorio,'hex'),
									language: {
										noResults: function (params) {
										  return "No hay datos que mostrar";
										}
									  }
								});
							}
						}
						$('#row_'+datos.raiz+'_'+e.id).hide();
					}	
			});
	});
}
function crearModal(datos){//id,raiz,cabecera,cuerpo,pie,desencadenador
		$('#'+datos.raiz).append($('<div>').attr({
			'data-backdrop': 'false',
			'id':datos.id,
			'tabindex': '-1',
			'role': 'dialog',
			'aria-hidden': true,
			'class': 'modal fade'
		}).append($('<div>').attr({
			'class': 'modal-content',
			'id': 'modal-content-'+datos.id
		}).css(datos.css)));
			
			
		
		$('#modal-content-'+datos.id).append($('<div>').attr({
			class: 'modal-header',
			id: 'modal-header-'+datos.id
		}));
		
		$('#modal-content-'+datos.id).append($('<div>').attr({
			class: 'modal-body',
			id: 'modal-body-'+datos.id
		}));
		
		$('#modal-content-'+datos.id).append($('<div>').attr({
			class: 'modal-footer',
			id: 'modal-footer-'+datos.id
		}));
		
		if(typeof datos.cabecera !== 'undefined')
			$('#modal-header-'+datos.id).append(datos.cabecera);
		if(typeof datos.cuerpo !== 'undefined')
			$('#modal-body-'+datos.id).append(datos.cuerpo);
		if(typeof datos.pie !== 'undefined')
			$('#modal-footer-'+datos.id).append(datos.pie);
	
		$('#'+datos.desencadenador).on( "click", function() {
			$('#'+datos.id).modal();
		});
	
	}	
function acentos(string,tipo){
	if(typeof string !== 'undefined'){
	var chr = ['À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý','Þ','ß','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','þ','ÿ','Œ','œ','Š','š','Ÿ','ƒ'];	
	var regex;
	
	if(tipo == 'html'){
		var html = ['&Agrave;','&Aacute;','&Acirc;','&Atilde;','&Auml;','&Aring;','&AElig;','&Ccedil;','&Egrave;','&Eacute;','&Ecirc;','&Euml;','&Igrave;','&Iacute;','&Icirc;','&Iuml;','&ETH;','&Ntilde;','&Ograve;','&Oacute;','&Ocirc;','&Otilde;','&Ouml;','&Oslash;','&Ugrave;','&Uacute;','&Ucirc;','&Uuml;','&Yacute;','&THORN;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&OElig;','&oelig;','&Scaron;','&scaron;','&Yuml;','&fnof;'];
		$.each(chr, function(i, e) {
			regex = new RegExp(eval("/"+e+"/g"));
			string = string.replace(regex,html[i]);
		});
	}
	else if (tipo == 'hex'){
		var hex = ['\xC0','\xC1','\xC2','\xC3','\xC4','\xC5','\xC6','\xC7','\xC8','\xC9','\xCA','\xCB','\xCC','\xCD','\xCE','\xCF','\xD0','\xD1','\xD2','\xD3','\xD4','\xD5','\xD6','\xD8','\xD9','\xDA','\xDB','\xDC','\xDD','\xDE','\xDF','\xE0','\xE1','\xE2','\xE3','\xE4','\xE5','\xE6','\xE7','\xE8','\xE9','\xEA','\xEB','\xEC','\xED','\xEE','\xEF','\xF0','\xF1','\xF2','\xF3','\xF4','\xF5','\xF6','\xF8','\xF9','\xFA','\xFB','\xFC','\xFD','\xFE','\xFF','\u0152','\u0153','\u0160','\u0161','\u0178','\u0192'];
	$.each(chr, function(i, e) {
			regex = new RegExp(eval("/"+e+"/g"));
			string = string.replace(regex,hex[i]);
		});}
	else if (tipo == 'numeric'){
		var numeric = ['&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#338;','&#339;','&#352;','&#353;','&#376;','&#402;'];
	$.each(chr, function(i, e) {
			regex = new RegExp(eval("/"+e+"/g"));
			string = string.replace(regex,numeric[i]);
		});}
	else if (tipo == 'escape'){
		var escape = ['%C0','%C1','%C2','%C3','%C4','%C5','%C6','%C7','%C8','%C9','%CA','%CB','%CC','%CD','%CE','%CF','%D0','%D1','%D2','%D3','%D4','%D5','%D6','%D8','%D9','%DA','%DB','%DC','%DD','%DE','%DF','%E0','%E1','%E2','%E3','%E4','%E5','%E6','%E7','%E8','%E9','%EA','%EB','%EC','%ED','%EE','%EF','%F0','%F1','%F2','%F3','%F4','%F5','%F6','%F8','%F9','%FA','%FB','%FC','%FD','%FE','%FF','%u0152','%u0153','%u0160','%u0161','%u0178','%u0192'];
	$.each(chr, function(i, e) {
			regex = new RegExp(eval("/"+e+"/g"));
			string = string.replace(regex,escape[i]);
		});}
	else if (tipo == 'uri'){
		var encodeURI = ['%C3%80','%C3%81','%C3%82','%C3%83','%C3%84','%C3%85','%C3%86','%C3%87','%C3%88','%C3%89','%C3%8A','%C3%8B','%C3%8C','%C3%8D','%C3%8E','%C3%8F','%C3%90','%C3%91','%C3%92','%C3%93','%C3%94','%C3%95','%C3%96','%C3%98','%C3%99','%C3%9A','%C3%9B','%C3%9C','%C3%9D','%C3%9E','%C3%9F','%C3%A0','%C3%A1','%C3%A2','%C3%A3','%C3%A4','%C3%A5','%C3%A6','%C3%A7','%C3%A8','%C3%A9','%C3%AA','%C3%AB','%C3%AC','%C3%AD','%C3%AE','%C3%AF','%C3%B0','%C3%B1','%C3%B2','%C3%B3','%C3%B4','%C3%B5','%C3%B6','%C3%B8','%C3%B9','%C3%BA','%C3%BB','%C3%BC','%C3%BD','%C3%BE','%C3%BF','%C5%92','%C5%93','%C5%A0','%C5%A1','%C5%B8','%C6%92'];
	$.each(chr, function(i, e) {
			regex = new RegExp(eval("/"+e+"/g"));
			string = string.replace(regex,uri[i]);
		});}}
	return string;
}