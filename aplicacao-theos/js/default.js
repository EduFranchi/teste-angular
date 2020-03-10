let URL_REQUISITION = "http://198.199.79.34/servlet/TestServlet.class.php?";

function ValidateEmail(email){
    var regez = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regez.test(email)) {
        return false;
    }
    return true;
}

function ConvertDate( value ){
    var from = "";
    var to = "";

    if(value.indexOf("/") > -1){
        from = "/";
        to = "-";
    } else if(value.indexOf("-") > -1){
        from = "-";
        to = "/";
    }
    var time = value.trim().split(" ")[1];
    var date = value.trim().split(" ")[0].split(from);
    
    value = date[2] + to + date[1] + to + date[0];

    if(time != undefined){
    	value += " " + time;
    }

    return value;
};