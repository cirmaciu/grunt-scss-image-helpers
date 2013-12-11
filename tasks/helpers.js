'use strict';
var sizeOf = require('image-size'),
	path = require('path'),
	fs = require('fs');

module.exports = function (grunt) {
	grunt.registerMultiTask('scss_images', 'Create image size variables', function() {
		var options = this.options({
			prefix: 'grunt-images',
			imageRoot: ''
		});

		this.files.forEach(function(filePair) {
			var dest = filePair.dest,
				src = filePair.src,
				output = '',
				list = {
					names: [],
					widths: [],
					heights: [],
					cacheNames: []
				};

			src.forEach(function(file) {
				var filePath = path.relative(options.imageRoot, file),
					size = null,
					time = (new Date(fs.statSync(file).mtime).getTime()/1000).toFixed(0);

				if (path.extname(file) === '.svg') {
					size = {
						width: 0,
						height: 0
					};
				} else {
					size = sizeOf(file);
				}
				list.names.push(filePath);
				list.widths.push(size.width);
				list.heights.push(size.height);
				list.cacheNames.push(filePath.replace(/([^\.]*)$/, time + '.$1'));
			});

			output += '$' + options.prefix + '-names: ' +  '\'' + list.names.join('\', \'') + '\';\n';
			output += '$' + options.prefix + '-anti-cache-names: ' +  '\'' + list.cacheNames.join('\', \'') + '\';\n';
			output += '$' + options.prefix + '-widths: ' + list.widths.join(', ') + ';\n';
			output += '$' + options.prefix + '-heights: ' + list.heights.join(', ') + ';';

			grunt.file.write(dest, output);

		});

	});
};
