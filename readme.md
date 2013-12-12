# grunt-scss-image-helpers

Grunt tasks to replace Compass image dimension helpers. It is recommended to run this task with watch task on image folder only.

### Options

#### imageRoot

Type: `String`  
Default: `''`

Path to image folder. All image names are created relatively to this folder.

#### prefix

Type: `String`  
Default: `grunt-images`

Prefix for SCSS variables. Three variables are created: `$grunt-images-names`, `$grunt-images-widths` and `$grunt-images-heights`.

#### antiCache

Type: `Boolean`  
Default: `false`

If set to `true`, task generates file names with timestamps to invalidate browser cache.

### Example config

```javascript
grunt.initConfig({
    scss_images: {
        dist: {
            options: {
                imageRoot: 'assets/img/',
                prefix: 'grunt-images',
                antiCache: true       
            },
            files: {
                'assets/scss/_images.scss': ['assets/img/*.png']
            }
        }
    }
});

grunt.loadNpmTasks('grunt-scss-image-helpers');
grunt.registerTask('default', ['scss_images']);
```
## License

MIT License • © [Daniel Cirmaciu](http://cirmaciu.cz)
