'use strict';
var sizeOf = require('image-size'),
	path = require('path');

module.exports = function (grunt) {
	grunt.registerMultiTask('scss_images', 'Create image size variables', function() {
		var options = this.options({
			prefix: 'grunt-images'
		});

		this.files.forEach(function(filePair) {
			var dest = filePair.dest,
				src = filePair.src,
				output = '',
				list = {
					names: [],
					widths: [],
					heights: []
				};

			src.forEach(function(file) {
				var filePath = path.relative(options.imageRoot, file);
				var size = sizeOf(file);
				list.names.push(filePath);
				list.widths.push(size.width);
				list.heights.push(size.height);
			});

			output += '$' + options.prefix + '-names: ' +  '\'' + list.names.join('\', \'') + '\';\n';
			output += '$' + options.prefix + '-widths: ' + list.widths.join(', ') + ';\n';
			output += '$' + options.prefix + '-heights: ' + list.heights.join(', ') + ';';

			grunt.file.write(dest, output);

		});

	});
};
