jQuery(document).ready(function($) {
  if(!getUrlParameter('session')){
    //Load list of all sessions
    $(".specific").addClass("hide");
    getAllSessions();
  }
  else {
    $(".all").addClass("hide");
    getSession(getUrlParameter('session'));
  }
});


function getAllSessions(){
  $.ajax({
    url: 'https://codeclubtbms.pythonanywhere.com/sessions/?format=json',
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function(json){

      $(json).each(function(index){
        $("#sessions").append('<tr>'+
                              '<td><a href="?session='+index.toString()+'">'+this.name.replace(".md", "")+'</a></td>'+
                              '<td>'+getValueFromKey(this.properties,"Delivered By",true)+'</td>'+
                              '<td>'+getValueFromKey(this.properties,"Date",true)+'</td>'+
                              '</tr>');
      });
      $(".progress").addClass("hide");
    }
  });
}

function getSession(session_id){
  $.ajax({
    url: 'http://codeclubtbms.pythonanywhere.com/sessions/?format=json&session_id=' + session_id.toString(),
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function(json){
      // $("#date-time").html( (new Date(json.date)).toLocaleString());
      $("#markdown").load(json.url, function(data){
        markdown(function(){
          $(".progress").addClass("hide");
          
        });
      });
    }
  });
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function getValueFromKey(dict, key, replaceNull){
  if(dict[key]){
    if(replaceNull){
      return dict[key].replace("null","");
    }
    return dict[key];
  }
  return "";
}
