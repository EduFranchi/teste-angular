$(document).ready(function(){

    LoadFields();

    $(document).on("change", "#select-state", function(){
        if($(this).val() == null || $(this).val() == ""){
            $(this).focus();
            $(this).notify("Estado incorreto!", "error");
        } else {
            let obj = {
                "state": $(this).val()
            };
            GetCityList(obj);
        }
    });

    $(document).on("click", "#btn-new", function(){
        location.reload();
    });

    $(document).on("click", "#btn-save", function(){
        let isOk = true;
        $(".field-require").each(function(){
            if($(this).val() == "" || $(this).val() == null || ($(this).val() != null && $(this).val().trim() == "")){
                $(this).focus();
                $(this).notify("Campo preenchido incorretamente!", "error");
                isOk = false;
            }
        });

        let obj = {
            "id": $("#hidden-occupation-id").val().trim(),
            "name": $("#input-name").val().trim(),
            "lastname": $("#input-lastname").val().trim(),
            "email": $("#input-email").val().trim(),
            "gender": $("#select-gender").val(),
            "date": ConvertDate($("#input-date").val().trim()),
            "state": $("#select-state").val(),
            "city": $("#select-city").val(),
            "occupation": $("#select-occupation").val(),
            "trainingArea": $("#input-training-area").val().trim()
        };

        if(!ValidateEmail(obj.email)){
            $("#input-email").notify("Campo preenchido incorretamente!", "error");
            isOk = false;
        }

        if(isOk){
            SaveOccupation(obj);
        }
    });

    $(document).on("click", "#btn-search", function(){
        $("#modal-filter").modal();
    });

    $(document).on("click", "#btn-filter", function(){
        let obj = {
            "name": $("#input-name-modal").val().trim(),
            "occupation": $("#select-occupation-modal").val()
        }
        if(obj.name == "" && (obj.occupation == null || obj.occupation == "")){
            $.notify("Campo(s) preenchido(s) incorretamente!", "error");
        } else {
            FilterOccupation(obj);
        }
    });

    $(document).on("click", "#div-table-occupation td", function(){
        let obj = {
            "id": $(this).parent().attr("data-id")
        };
        if(obj.id == null || obj.id == ""){
            $.notify("Profissão não encontrada!", "error");
        } else {
            OpenOccupation(obj);
        }
    });

    $(document).on("click", "#btn-alter", function(){
        $("#btn-alter").parent().addClass("hide");
        $("#btn-save").parent().removeClass("hide");
        $("#btn-delete").parent().removeClass("hide");
    });

    $(document).on("click", "#btn-delete", function(){
        let obj = {
            "id": $("#hidden-occupation-id").val().trim()
        };
        if(obj.id == null || obj.id == ""){
            $.notify("Profissão não encontrada!", "error");
        } else {
            DeleteOccupation(obj);
        }
    });

});

function LoadFields(){
    $("#input-date").val(GetDateToday());
}

function GetDateToday(type = "pt-br"){
    let dateToday = new Date();
    let month = dateToday.getMonth()+1;
    let day = dateToday.getDate();
    if(type == "en"){
        return dateToday.getFullYear() + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day); 
    } else {
        return (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + dateToday.getFullYear(); 
    }   
}

function WriteTableOccupation(listReturn){
    let html = '';
    if(listReturn.length > 0){
        for(let i = 0; i < listReturn.length; i++){
            let city = (listReturn[i].city == null || listReturn[i].city == "" ? "N/A" : listReturn[i].city);
            let state = (listReturn[i].state == null || listReturn[i].state == "" ? "N/A" : listReturn[i].state);
            let cityState = city == "N/A" && "N/A" ? "N/A" : city + "/" + state.toUpperCase();
            html += '<tr data-id="'+listReturn[i].id+'">';
            html += '    <td scope="row" class="align-center" title="'+listReturn[i].name+' '+listReturn[i].lastname+'">'+listReturn[i].name+' '+listReturn[i].lastname+'</td>';
            html += '    <td class="align-center" title="'+listReturn[i].email+'">'+listReturn[i].email+'</td>';
            html += '    <td class="align-center" title="'+cityState+'">'+cityState+'</td>';
            html += '    <td class="align-center" title="'+GetOccupationById(listReturn[i].occupation)+'">'+GetOccupationById(listReturn[i].occupation)+'</td>';
            html += '    <td class="align-center" title"'+listReturn[i].trainingArea+'">'+listReturn[i].trainingArea+'</td>';
            html += '</tr>';
        }
    } else {
        html += '<tr>';
        html += '    <td colspan="5">Nenhum registro encontrado!</td>';
        html += '</tr>';
    }
    $("#table-occupation tbody").html(html);
    $("#div-table-occupation").removeClass("hide");
}

function GetOccupationById(id){
    switch(id){
        case "1":
            return "Carpinteiro";
            break;
        case "2":
            return "Programador";
            break;
        case "3":
            return "Engenheiro";
            break;
        case "4":
            return "Médico";
            break;
        case "5":
            return "Eletricista";
            break;
    }
}

function LoadOccupationInFields(objReturn){
    $("#hidden-occupation-id").val(objReturn.id);
    $("#input-name").val(objReturn.name);
    $("#input-lastname").val(objReturn.lastname);
    $("#input-email").val(objReturn.email);
    $("#select-gender").val(objReturn.gender);
    $("#input-date").val(ConvertDate(objReturn.date).substring(0, 10));
    WriteSelectCity(objReturn.cityList);
    $("#select-state").val(objReturn.state);
    $("#input-training-area").val(objReturn.trainingArea);
    $("#select-occupation").val(objReturn.occupation);
    $("#modal-filter").modal("toggle");

    window.setTimeout(function(){
        $("#select-city option").each(function(){
            if($(this).text() == objReturn.city){
                $(this).prop("selected", true);
            }
        });
    }, 500);

    $("#btn-save").parent().addClass("hide");
    $("#btn-delete").parent().addClass("hide");
    $("#btn-alter").parent().removeClass("hide");
}

function WriteSelectCity(list){
    let html = '<option value="null" selected disabled>Selecionar</option>';
    for(let i = 0; i < list.length; i++){
        html += '<option value="'+list[i].id+'">'+list[i].name+'</option>';
    }
    $("#select-city").html(html);
    $("#select-city").prop("disabled", false);
}

function GetCityList(obj){
    $("body").addClass("loading");

    $.ajax({
        url: URL_REQUISITION + "action=get-city-list&state="+obj.state,
        type: "GET",
        cache: false,
        dataType: 'json',
        success: function(response){
            if(response.result == 1){
                WriteSelectCity(response.data);
            } else {
                $.notify(response.message, "error");
            }
            $("body").removeClass("loading");
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
            $.notify("Erro ao fazer requisição!", "error");
            $("body").removeClass("loading");
        }
    });
}

function SaveOccupation(obj){
    $("body").addClass("loading");

    $.ajax({
        url: URL_REQUISITION + "action=save-occupation",
        type: "POST",
        data: obj,
        cache: false,
        dataType: 'json',
        success: function(response){
            if(response.result == 1){
                location.reload();
            } else {
                $.notify(response.message, "error");
            }
            $("body").removeClass("loading");
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
            $.notify("Erro ao fazer requisição!", "error");
            $("body").removeClass("loading");
        }
    });
}

function FilterOccupation(obj){
    $("body").addClass("loading");

    $.ajax({
        url: URL_REQUISITION + "action=filter-occupation",
        type: "POST",
        data: obj,
        cache: false,
        dataType: 'json',
        success: function(response){
            if(response.result == 1){
                WriteTableOccupation(response.data);
            } else {
                $.notify(response.message, "error");
            }
            $("body").removeClass("loading");
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
            $.notify("Erro ao fazer requisição!", "error");
            $("body").removeClass("loading");
        }
    });
}

function OpenOccupation(obj){
    $("body").addClass("loading");

    $.ajax({
        url: URL_REQUISITION + "action=open-occupation",
        type: "POST",
        data: obj,
        cache: false,
        dataType: 'json',
        success: function(response){
            if(response.result == 1){
                LoadOccupationInFields(response.data);
            } else {
                $.notify(response.message, "error");
            }
            $("body").removeClass("loading");
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
            $.notify("Erro ao fazer requisição!", "error");
            $("body").removeClass("loading");
        }
    });
}

function DeleteOccupation(obj){
    $("body").addClass("loading");

    $.ajax({
        url: URL_REQUISITION + "action=delete-occupation",
        type: "POST",
        data: obj,
        cache: false,
        dataType: 'json',
        success: function(response){
            if(response.result == 1){
                location.reload();
            } else {
                $.notify(response.message, "error");
            }
            $("body").removeClass("loading");
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
            $.notify("Erro ao fazer requisição!", "error");
            $("body").removeClass("loading");
        }
    });
}