
var EDGE_CONTRIBUTORS = '/contributors', EDGE_LANGUAGES = '/languages', TOKEN='45280929b0328baf43c3bd2a4e7d98e7cfdf432b';

jQuery.fn.extend({
	loadtopteam: function(){
		var $container = $(this);

		$.getJSON("/assets/data/team.json", function(json){
			$.each(json.members, function(index, val) {
				if(val.senior){
					$card = $('<div class="col-lg-4 col-md-6 col-12">'+
	          '<div class="card medium hoverable team_card">'+
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
	},
	loadprojects: function(){
		var $container = $(this);
		$.ajax({
      url: 		'https://api.github.com/orgs/codeclubtbms/repos?access_token='+TOKEN,
      type: 'GET',
      crossDomain: true,
      dataType: 'json',
      success: function(myData) {
    		$.each(myData, function(index, repository) {
					if(index < 8) {
						var contributors, contrib_images = ''	;
						getContributors(repository.contributors_url, function(contribData){
							contributors = contribData;
							$.each(contributors, function(index, contributor){
								contrib_images += '<a href="'+contributor.url+'" target="_blank"><div class="chip"><img class="contrib-img" src="'+contributor.avatar_url+'"></img>'+contributor.login+'</div></a>'

							});
							
								$card = $('<div class="col-lg-3 col-md-4 col-12">'+
									'<div onclick="window.location.href=\''+ repository.html_url+'\'" class="card small hoverable project_card valign-wrapper">'+
										'<div class="card-content center-align">'+
											'<h5>'+repository.name+'</h5>'+
											'<p style="margin-bottom: 10px;">'+repository.description+'</p>'+
											contrib_images+			
											'<div class="card-action">'+
											'<p class="valign-wrapper"><i class="material-icons" style="margin-right: 5px;">update</i>'+(new Date(repository.updated_at)).toLocaleString()+'</p>'+
											'</div>'+								
									 '</div>'+
								 '</div>'+
								'</div>');
								
								$container.append($card);	
						});
			
					}
    		});
      }
    });
	}
});

function getContributors(url,success){
	$.ajax({
		url: 		url + '?access_token='+TOKEN,
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(myData) {
				success(myData);
			
		}
	});
}
