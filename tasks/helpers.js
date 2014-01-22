'use strict';
var sizeOf = require('image-size'),
    path = require('path'),
    fs = require('fs');

module.exports = function (grunt) {
    grunt.registerMultiTask('scss_images', 'Create image size variables', function() {
        var options = this.options({
            prefix: 'grunt-images',
            imageRoot: '',
            relativePath: '',
            antiCache: false
        });

        this.files.forEach(function(filePair) {
            var dest = filePair.dest,
                src = filePair.src,
                output = '',
                list = {
                    ids: [],
                    widths: [],
                    heights: [],
                    paths: []
                };

            src.forEach(function(file) {
                var filePath = unixifyPath(path.relative(options.imageRoot, file)),
                    size = null,
                    time = 0;

                if (path.extname(file) === '.svg') { // waiting for image-size to implement svg support
                    size = {
                        width: 0,
                        height: 0
                    };
                } else {
                    size = sizeOf(file);
                }

                list.ids.push(filePath);
                list.widths.push(size.width);
                list.heights.push(size.height);

                if (options.antiCache) {
                    time = (new Date(fs.statSync(file).mtime).getTime()/1000).toFixed(0);
                    filePath = filePath.replace(/([^\.]*)$/, time + '.$1');
                }
                list.paths.push(filePath);
            });

            output += '$' + options.prefix + '-ids: ' +  '\'' + list.ids.join('\', \'') + '\';\n';
            output += '$' + options.prefix + '-names: ' +  '\'' + list.paths.join('\', \'') + '\';\n';
            output += '$' + options.prefix + '-widths: ' + list.widths.join(', ') + ';\n';
            output += '$' + options.prefix + '-heights: ' + list.heights.join(', ') + ';\n';
            output += '$' + options.prefix + '-relative-path: \'' + options.relativePath + '\';\n';

            // this is temporary solution
            output += [
                "@function image-width($image) {",
                    "$index: index($" + options.prefix + "-ids, $image);",
                    "@if $index {",
                        "@return nth($" + options.prefix + "-widths, $index)*1px;",
                    "}",
                "}",

                "@function image-height($image) {",
                    "$index: index($" + options.prefix + "-ids, $image);",
                    "@if $index {",
                        "@return nth($" + options.prefix + "-heights, $index)*1px;",
                    "}",
                "}",

                "@function image-url($image) {",
                    "$index: index($" + options.prefix + "-ids, $image);",
                    "@if $index {",
                        "$image-name: nth($" + options.prefix + "-names, $index);",
                        "@return url('#{$" + options.prefix + "-relative-path}#{$image-name}')",
                    "}",
                    "@else {",
                        "@return url('#{$" + options.prefix + "-relative-path}#{$image}');",
                    "}",
                "}",

                "@function inline-image($image) {",
                    "@return url('#{$" + options.prefix + "-relative-path}#{$image}?base64');",
                "}"
            ].join('\n');

            grunt.file.write(dest, output);

        });

    });

    var unixifyPath = function(filepath) {
        if (process.platform === 'win32') {
            return filepath.replace(/\\/g, '/');
        } else {
            return filepath;
        }
    };
};
