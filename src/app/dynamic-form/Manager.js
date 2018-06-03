import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

//declare var Plugin = Plugin;

export default class Manager extends Plugin {

    init() {
        console.log( 'InsertImage was initialized' );
    }
}

