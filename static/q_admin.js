function admin() {
    if ($("#admin").text() == "Включить режим администратора"){
        $("#admin").text("Выключить режим администратора")
        $( ".admin" ).addClass("admin_open");
        $( ".user" ).addClass("user_closed");
    }
    else{
        $("#admin").text("Включить режим администратора");
        $( ".admin" ).removeClass("admin_open");
        $( ".user" ).removeClass("user_closed");
    }       
}

function cancel(){
    $("input:radio").prop( "checked", false );
}