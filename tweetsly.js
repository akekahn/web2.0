$(document).ready(function() {
	tweetsly(1);
});

function tweetsly(woeid){
	if(woeid == 1){
		$("#nav .path").html(" > World Wide");
	}else if(woeid == 23424977){
		$("#nav .path").html(" > USA");
	}

	for(var i = 0; i < 10; i++){
		$("#hit"+(i+1)).html("");
		if(!$("#hit"+(i+1)).hasClass("empty")){
			$("#hit"+(i+1)).addClass("empty");
		}
	}

	getTweets(woeid);
}

function getTweets(woeid){
	return $.getJSON("./tweetsly/tweetsly-"+woeid+".json", function(json) {
		var trends = json[0].trends;
		var query = "";
		var news = "";

		for(var i = 0; i < trends.length; i++){
			news = "";
			query = trends[i].name;

			news = getNews(woeid, i);
			$("#hit"+(i+1) +" .content").html("<h1>"+ query +"</h1><div class='wrapper_news'>"+ news + "</div>");
		}
		return 1;
	});

}

function getNews(woeid, count){
	var feedzillaHTML = "";
	$.ajaxSetup( { "async": false } );
	$.getJSON("./tweetsly/tweetsly-"+woeid+"-"+count+".json", function(json) {

		try {
			if(json.articles) {
				var news = json.articles;
				for (var i = 0; i < news.length; i++) {
					feedzillaHTML += "<div class='news'>";
					try {
						feedzillaHTML += "<img src='" + news[i].enclosures[0].uri + "' />";
					} catch (err) { }
					feedzillaHTML += "<a href='" + news[i].url + "' target='_blank'>";
					feedzillaHTML += "<p>" + news[i].title + " <span class='date'>" + news[i].publish_date + "</span></p>";
					feedzillaHTML += "</a>";
					feedzillaHTML += "</div>";
				}
				if(news.length > 0) {
					$("#hit" + (count + 1)).removeClass("empty");
				}
			}
			
		} catch(err) {
			console.log("error in feedzilla query", count);
		}
	});
	$.ajaxSetup( { "async": true} );
	return feedzillaHTML;
}
