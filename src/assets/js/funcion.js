jQuery(document).ready(function($) {
        
    if( localStorage.getItem('departamento') ){

        let ValDepart = localStorage.getItem('departamento')
        $(`#departID option[value='${ValDepart}']`).attr("selected", true);
    
    }else{
    
        $("#departID option[value='5']").attr("selected", true);
    }



    if( localStorage.getItem('ciudad') ){

        let ValCiudad = localStorage.getItem('ciudad')
        $(`#ciudadID option[value='${ValCiudad}']`).attr("selected", true);
    
    }else{
    
        $("#ciudadID option[value='Anzoátegui']").attr("selected", true);
    }


});


