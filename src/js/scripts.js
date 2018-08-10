global.jQuery = require('jquery');
mustache = require('mustache');

// JSON = JS Object Notation / mustache
/*
** Initiate the source of the datafile
** Define template as HTML object
** Define showTemplate and render as mustache object
** Output data in #gallery as HTML template
*/
jQuery(document).ready(function($){
	var jqxhr = $.getJSON('data.json', function(){

	}).done(function(data) {
		var template = $('#template').html();
		var showTemplate = mustache.render(template, data);
		$('#gallery').html(showTemplate);
	});
});