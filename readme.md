# grunt-scss-image-helpers

Grunt tasks to replace Compass image helpers. It is recommended to run this task with watch task on image folder only.

### Helpers

All helpers have one argument: image name. Name is created relatively to the `imageRoot` option. If we want to use an image in subfolder, we need to enter a path incl. folder name.

Example: `image-url('foo.png')`, `image-url('subfolder/foo.png')`

#### image-width()

Returns width of specified image in pixels (for example `30px`).

#### image-height()

Returns height of specified image in pixels (for example `30px`).

#### image-url()

Returns path to specified image including `url()`.

Example: `background-image: image-url('foo.bar')` is compiled to `background-image: url('foo.bar')`.

When `relativePath` is set to `../img/`, helper will return `url('../img/foo.bar')`. 

When `antiCache` is set to `true`, helper will return path with timestamp: `url('foo.12345678.bar)` or `url('../img/foo.12345678.bar')`.

#### inline-image()

Returns image as data url.

Example: `inline-image('foo.png')` becomes `url('data:image/png;base64,...')`.

### Options

#### imageRoot

Type: `String`  
Default: `''`

Path to image folder. All image names are created relatively to this folder.

#### prefix

Type: `String`  
Default: `grunt-images`

Prefix for SCSS variables. These variables are created: `$grunt-images-names`, `$grunt-images-widths`, `$grunt-images-heights`, `$grunt-images-base64` and `$grunt-images-relative-path`.

#### antiCache

Type: `Boolean`  
Default: `false`

If set to `true`, task generates file names with timestamps to invalidate browser cache.


#### relativePath

Type: `String`  
Default: `''`

All image paths in css are prefixed with this path. For example path `../img/` and image `foo.png` become `../img/foo.png`.

#### size

Type: `Integer`  
Default: `10240`

Maximum file size for base64 encoding. Images bigger than that won't be encoded.

### Example config

```javascript
grunt.initConfig({
    scss_images: {
        dist: {
            options: {
                imageRoot: 'assets/img/',
                prefix: 'grunt-images',
                antiCache: true,
                relativePath: '../img/',
                size: 4096
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
