var result_table, table_body;
var max_character_per_line = 10;

function look_up(key) {
	return dictionary[key] || (key == ' ' ? key : '-_-');
}

function construct_cell(raw_content) {
	var tokens = raw_content.split('_');
	var first_choice = tokens.shift();
	var substitute = tokens.join(",");
	return tokens.length == 0 ? first_choice : 
		"<a href='#' data-toggle='tooltip' title='"
		+ substitute + "'>" + first_choice + "</a>";
}

function translate(passage) {
	for (var i = 0; i < passage.length; i ++) {
		var line = passage[i];
		var line_res = [];
		for (var j = 0; j < line.length; j ++) {
			var raw_res = look_up(line[j]);
			line_res.push(raw_res);
		}
		for (var j = 0; j < line.length + max_character_per_line; j += max_character_per_line) {
			var tr = $("<tr></tr>").appendTo(table_body);
			for (var k = 0; k < max_character_per_line; k ++) {
				var c = j + k < line.length ? line_res[j + k] : ' ';
				tr.append($("<td>" + construct_cell(c) + "</td>"));
			}
			tr = $("<tr></tr>").appendTo(table_body);
			for (var k = 0; k < max_character_per_line; k ++) {
				var c = j + k < line.length ? line[j + k] : ' ';
				tr.append($("<td>" + c + "</td>"));
			}
			tr.css("border-bottom", "#00000");
		}
	}
}

function enable_tooltip() {
	$('[data-toggle="tooltip"]').tooltip(); 
}

function init_table(column_count) {
	if (!result_table) result_table = $("#result-table");
	result_table.children().remove();
	var thead = result_table.find("thead");
	if (thead.length == 0) thead = $("<thead></thead>").appendTo(result_table);
	var tr = $("<tr></tr>").appendTo(thead);
	for (var i = 0; i < column_count; i ++)
		tr.append($("<th></th>"));
	table_body = $("<tbody></tbody>").appendTo(result_table);
}

$(document).ready(function () {
	$('#translate').click(function () {
		var passage = $('#content').val().split("\n");
		init_table(max_character_per_line);
		translate(passage);
		enable_tooltip();
	})
});
