
var EDGE_CONTRIBUTORS = '/contributors', EDGE_LANGUAGES = '/languages', TOKEN='0fd2b5dcefa201400f4376d0c7aa86d72f3ac5c8';

jQuery.fn.extend({
	loadtopteam: function(){
		var $container = $(this);

		$.getJSON("/assets/data/team.json", function(json){
			$.each(json.members, function(index, val) {
				if(val.senior){
					var sociallinks = "";
					wSocial = 100 / Object.keys(val.social).length;
					$.each(val.social, function(key, val) {
						
						sociallinks += '<a class="fa '+json.social_links[key].fa_icon+'" style="width:'+wSocial+'%" href="'+json.social_links[key].prefix + val+'"></a>';
					});
					console.log(sociallinks);
					$card = $('<div class="col-lg-4 col-md-6 col-12">'+
	          '<div class="card medium hoverable team_card">'+
	            '<div class="card-content center-align">'+
	             '<img class="circle responsive-img" src="'+val.image_url+'"></img>'+
	              '<h5>'+val.name+'</h5>'+
								'<p>'+val.description+'</p>'+
	           '</div>'+
						 '<div class="card-action">'+
						 sociallinks+
	         '</div>'+
	        '</div>');
					console.log($card);
$container.append($card);
}
				});
		});
	},
	loadprojects: function(loadAll){
		console.log(loadAll);
		var $container = $(this);
		$.ajax({
      url: 		'https://hackesta.pythonanywhere.com/github/orgs/codeclubtbms/repos',
      crossDomain: true,
      dataType: 'json',
      success: function(myData) {
    		$.each(myData, function(index, repository) {
					if(index < 8 || loadAll) {
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
	},
	loadallteam: function(){
		$container = this;
		$.getJSON("/assets/data/team.json", function(json){
			$.each(json.members, function(index, val) {
			var sociallinks =""
				$.each(val.social, function(key, val) {
					
					sociallinks += '<a class="fa '+json.social_links[key].fa_icon+'" href="'+json.social_links[key].prefix + val+'"></a>';
				});
				console.log(sociallinks);
					$tr = $('<tr><td>'+val.name+'</td><td>'+val.joined_year+'</td><td>'+val.roles+'</td><td>'+sociallinks+'</td></tr>');
$container.append($tr);
				});
		});
	}
});

function getContributors(url,success){
	$.ajax({
		url: 		url.replace("api.github.com","hackesta.pythonanywhere.com/github"),
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(myData) {
				success(myData);
			
		}
	});
}
