<cfinclude template="includes/inc_logout.cfm">
<html>
<head>
	  <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="bootstrap/css/bootstrap-theme.min.css" rel="stylesheet">
        <script src="bootstrap/js/bootstrap.min.js"></script>
<title>Tribunal Superior Agrario - Administration</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
@import url(css/estiloslogin.CSS);
	p.thicker {
    font-weight: 900;
}
</style>
<script language="javascript" type="text/javascript">
	function setFocus() {
		document.loginForm.usuario.select();
		document.loginForm.usuario.focus();
	}
	
	
</script>
</head>



<body onload="setFocus();" class="hold-transition login-page">
<div class="login-box">
	  <div>
        <img src="images/tas.png" width="350" >
    </div>
       <div class="login-logo">
		   </div>
	<table class="table"><td><p  style="font-size: 20px" align="center">Sistema de Integraci&oacute;n y Seguimiento de Expediente Agrario</p>
		<p></p>
		 <p  style="font-size: 40px" align="center" class="thicker" >SISEA</p>
		</td></table>

  <div class="login-box-body">
    <p class="login-box-msg">Ingresa tu Usuario y Contrase&ntildea para Iniciar Sesi&oacuten</p>
	<cfoutput>
    <form #action# method="post" name="loginForm" target="_parent" id="loginForm">
      <div class="form-group has-feedback">
        <input id="usuario" name="usuario" type="#text#" class="form-control" placeholder="Usuario">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input id="pass" name="pass"  type="password" class="form-control" placeholder="Contrase&ntilde;a">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" name="submit"  class="btn btn-primary btn-block btn-flat">Ingresar</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

</cfoutput>
  </div>
  
  
  
  
    
</div>



</body>
</html>