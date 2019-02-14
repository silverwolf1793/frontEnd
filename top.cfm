<html>
<head>
<title>Tribunales Unitarios Agrarios</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<cfprocessingdirective pageencoding = "utf-8">
<cfoutput>
	<link href="#root#bootstrap/css/jquery-ui.min.css"  rel="stylesheet" />
	<script src="#root#js/jquery.min.js"></script>
	<script src="#root#bootstrap/js/jquery-ui-1.12.1.min.js" ></script>
	<script src="#root#js/elcalendario.js" ></script>
	<script src="#root#js/menu.js" ></script>
	<link rel="stylesheet" href="#root#css/menu.css"/>

	<script src="#root#js/popper.min.js"></script>
	<link href="#root#/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<script src="#root#/bootstrap/js/bootstrap.min.js"></script>
	
	
	
	<script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment-with-locales.min.js"></script>
	<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
	


	
	<script type="text/javascript" src="#root#js/wddx.js"> </script>
</cfoutput>
</head>
<body scroll="auto">
<cfquery password="#db_pass#" username="#db_user#"  name="Get_distrito" datasource="#session.dsn#" dbtype="odbc">
</cfquery>
<cfif (not isDefined("winfot")) or (isDefined("winfot") and winfot eq 0)>
<CFQUERY password="#db_pass#" username="#db_user#"   NAME="qry_buscar" DATASOURCE="#dsn#">
</CFQUERY>
<CFQUERY password="#db_pass#" username="#db_user#"   NAME="qry_menu_principal" DATASOURCE="#dsn#">
</CFQUERY>
<cfquery datasource="#dsn#" name="get_mensaje">
</cfquery>
</cfif>	

<cfset pagina_actual=FALSE>
<table width="100%" > 
  <thead>

    <th scope="col" style="text-align: left; padding-top: 10; padding-left: 10; padding-bottom: 30;">
      <cfoutput> <h4 style="color:024e92"> <img src="#root#images/logo_tsa.png" width="62" height="62" style="display: inline; vertical-align:middle;"/>	 Sistema de Seguimiento de Expediente Agrario
       </h4>	
       </cfoutput>
	</th>
    <th>
    <cfoutput>
		<cfquery password="#db_pass#" username="#db_user#" NAME="qry_notif_aud" datasource="#session.base#">
		</cfquery>

        <td width="14%" align="right">
				<cfif qry_notif_aud.cuenta GTE  1>
				<div class="dropdown">	
					  <button class="btn" style="background-color:transparent" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<img src="#root#images/bell ring icon.png" width="48" height="48" style="display: inline; vertical-align:middle;"/>&nbsp;<span style=" background-color: red;border-radius: 2px; color: white; padding: 1px 3px; font-size: 10px; text-decoration: none;">#qry_notif_aud.cuenta#</span>
					  </button>
					  <div  class="dropdown-menu dropdown-menu-right" style = "z-index:1001;" aria-labelledby="dropdownMenuButton">
						  <table class="table table-hover">
							<thead >
								<tr>
									<th scope="col">
										Aviso
									</th>
									<th scope="col">
										Fecha
									</th>
									<th scope="col">
										Origen
									</th>
									<th scope="col">
										Ver
									</th>
								<tr>
							</thead>
						<cfquery password="#db_pass#" username="#db_user#" NAME="qry_notif_aud_det" datasource="#session.base#">
							
						</cfquery>	
						<cfloop query="qry_notif_aud_det">
							<tr>
							
							<td>
								#qry_notif_aud_det.nombre#
							</td>
							<td nowrap>
								#qry_notif_aud_det.fecha_disparo#
							</td>
							<td>
								#qry_notif_aud_det.descripcion#
							</td>
							<td>
								<cfquery password="#db_pass#" username="#db_user#" NAME="qry_exp_id" datasource="#session.base#">
									
								</cfquery>
								<a class="dropdown-item" href="expedientes06.cfm?id_expedientes=#qry_exp_id.cod_expediente#">Abrir</a>
							</td>
							<tr>
						</cfloop>
							</table>
					  </div>
				</div>	
				<cfelse>					
					<a href="##" style="text-decoration: none;"><img src="#root#images/bell icon.png" width="48" height="48" style="display: inline; vertical-align:middle;"/>&nbsp;<span style=" background-color: ##b9b9b9;border-radius: 2px; color: white; padding: 1px 3px; font-size: 10px;">#qry_notif_aud.cuenta#</span></a>
				</cfif>	
		</td>
		<td>
			<a href="#root#index.cfm?logout=1" style="color:##333333; font-weight: bold"><img src="#root#images/salida.gif" width="64" height="48" style="display: inline; vertical-align:middle;"/></a>
		</td>
			
    </cfoutput>
    </th>
    
  </thead>
</table>

<div id="menu-wrapper" style="width: 100%; background-color: #372f2b"></div>
<cfset m_principal = []>
<cfset accesoaa = []>
<cfloop query="qry_menu_principal">
	<CFQUERY password="#db_pass#" username="#db_user#"   NAME="qry_sub_menu" DATASOURCE="#dsn#">

	</CFQUERY>
	<cfset m_principal[qry_menu_principal.CurrentRow]["menu"] = trim(qry_menu_principal.Menu)>
	<cfloop query="qry_sub_menu">		
		<cfset m_principal[qry_menu_principal.CurrentRow]["submenu"]["titulo"][qry_sub_menu.CurrentRow] = trim(qry_sub_menu.Opcion)>
		<cfset m_principal[qry_menu_principal.CurrentRow]["submenu"]["url"][qry_sub_menu.CurrentRow] = root&trim(qry_sub_menu.Archivo)>
		<cfscript>
		ArrayAppend(accesoaa,Replace(trim(qry_sub_menu.Archivo),"reports/",""),"true");
		</cfscript>
	</cfloop>
</cfloop>
<cfoutput>
<script>
	var menu = #SerializeJSON(m_principal)#;
	
	console.log(menu);
	crearMenu({
		nodo_base: 'menu-wrapper',
		id: 'menu',
		clase: 'menu'
	});
	
	
	menu.forEach(function(menuTitulo, i){
		var buffer = [];
		var buffer2 = { titulo:[],url:[]};
		var index = 0;
		var subindex = 0;
		
		$.each(menuTitulo.submenu.titulo, function(i,titulo){
			buffer2.titulo.push( menuTitulo.submenu.titulo[i]);
			buffer2.url.push(menuTitulo.submenu.url[i]);
			subindex ++;
			if(subindex == 10){
				subindex = 0;
				buffer.push({
					id: 'sub_menu_'+menuTitulo.menu.replace(/ /g,''),
					clase: 'submenu-columna',
					lista: buffer2
				});
				buffer2 = new Object();
				buffer2.titulo = new Array() ;
				buffer2.url = new Array();
			}
		});
		
		buffer.push({
						id: 'sub_menu_'+menuTitulo.menu.replace(/ /g,''),
						clase: 'submenu-columna',
						lista: buffer2
					});
			
		crearTitulo({
			id: 'menu_principal_'+menuTitulo.menu.replace(/ /g,''),
			nodo_base: 'menu',
			titulo: menuTitulo.menu,
			subMenu: buffer
		});
	});
</script>
</cfoutput>

<table width="100%" class="menubar" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="menudottedline" width="56%">
    <cfoutput>
      <div class="col-sm-6"><strong>Distrito Actual: #get_distrito.distrito# #get_distrito.municipio#, #get_distrito.estado# / #get_distrito.nombre# #get_distrito.apellido#</strong></div>
      </td>
    </cfoutput>
    <td width="44%" align="right" class="menudottedline"><script language="JavaScript" type="text/JavaScript">
		
		</script>
      <table cellpadding="3" cellspacing="0" border="0">
        <tr>
          <td>&nbsp;</td>
        </tr>
      </table></td>
  </tr>
</table>
<cfset paginaactual = listlast(cgi.script_name,"/")>
	<cfset pagact=#paginaactual.trim()#>
	<cfif pagact eq "expedientes06.cfm">
	<cfset pagact="expedientes.cfm">
	</cfif>
	
	<cfif pagact eq "mod_usuctrl2.cfm" || pagact eq "mod_usuctrl3.cfm">
		<cfset pagact="mod_usuctrl.cfm">
	</cfif>
	
	<cfif pagact eq "alta_usuctrl2.cfm">
		<cfset pagact="alta_usuctrl.cfm">
	</cfif>
	
	<cfif pagact eq "cons_usuctrl2.cfm">
		<cfset pagact="cons_usuctrl.cfm">
	</cfif>
	
	<cfif pagact eq "baja_usuctrl2.cfm" || pagact eq "baja_usuctrl3.cfm">
		<cfset pagact="baja_usuctrl.cfm">
	</cfif>
	
	<cfif pagact eq "rep_actuarios1.cfm">
		<cfset pagact="rep_actuarios.cfm">
	</cfif>
	
	<cfif pagact eq "rep_correspondenciaentrada.cfm">
		<cfset pagact="rep_correspondenciaEntrada.cfm">
	</cfif>
	
	<cfif pagact eq "rep_magistrado1.cfm">
		<cfset pagact="rep_magistrado.cfm">
	</cfif>
	
	<cfif pagact eq "alta_menuadm2.cfm">
		<cfset pagact="alta_menuadm.cfm">
	</cfif>
	
	<cfif pagact eq "baja_menuadm2.cfm" || pagact eq "baja_menuadm3.cfm">
		<cfset pagact="baja_menuadm.cfm">
	</cfif>

	<cfif pagact eq "mod_menuadm2.cfm" || pagact eq "mod_menuadm3.cfm">
		<cfset pagact="mod_menuadm.cfm">
	</cfif>
	
	<cfif pagact eq "rep_secretario1.cfm">
		<cfset pagact="rep_secretario.cfm">
	</cfif>
	
	<cfif pagact eq "expedientes_delete1.cfm">
		<cfset pagact="expedientes_delete.cfm">
	</cfif>

	<cfif pagact eq "rep_totLibros1.cfm">
		<cfset pagact="rep_totLibros.cfm">
	</cfif>
	
	<cfscript>
		ArrayAppend(accesoaa,"inicio.cfm","true");
		ArrayAppend(accesoaa,"expedientes_consultar.cfm","true");
		ArrayAppend(accesoaa,"buscador.cfm","true");
		ArrayAppend(accesoaa,"repmagiant.cfm","true");
	</cfscript>
	
	<cfif! arrayFindNoCase(accesoaa, pagact )>
		<cflocation url="#root#inicio.cfm?error=NPV" addtoken="no">
	</cfif>


