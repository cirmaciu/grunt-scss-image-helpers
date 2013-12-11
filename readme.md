# grunt-scss-image-helpers

Grunt tasks to replace Compass image dimension helpers. It is recommended running this task with watch task on image folder only.

### Options

#### imageRoot

Type: `String`  
Default: `''`

Path to image folder. All image names are created relatively to this folder.


#### prefix

Type: `String`  
Default: `grunt-images`

Prefix for SCSS variables. Three variables are created: `$grunt-images-names`, `$grunt-images-widths` and `$grunt-images-heights`.

### Example config

```javascript
grunt.initConfig({
	scss_images: {										// Task
		dist: {									// Target
			options: {
				imageRoot: 'assets/img/',
				prefix: 'scss-img'
			},
			files: {							// Dictionary of files
				'assets/scss/_images.scss': ['assets/img/*.png']	// 'destination': 'source'
			}
		}
	}
});

grunt.loadNpmTasks('grunt-scss-image-helpers');
grunt.registerTask('default', ['scss_images']);
```
## License

MIT License • © [Daniel Cirmaciu](http://cirmaciu.cz)
