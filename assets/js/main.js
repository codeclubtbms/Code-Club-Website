function load_top_team(){

}

jQuery.fn.extend({
	loadtopteam: function(){
		$container = $(this);

		$.getJSON("/assets/data/team.json", function(json){
			$.each(json.members, function(index, val) {
				if(val.senior){
					$card = $('<div class="col-lg-4 col-md-6 col-12">'+
	          '<div class="card hoverable team_card">'+
	            '<div class="card-content center-align">'+
	             '<img class="circle responsive-img" src="'+val.image_url+'"></img>'+
	              '<h5>'+val.name+'</h5>'+
								'<p>'+val.description+'</p>'+
	           '</div>'+
	         '</div>'+
	        '</div>');
					console.log($card);
$container.append($card);
}
				});
		});
	}
});
