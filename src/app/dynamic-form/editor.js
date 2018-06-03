/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image.js';
import ImagecaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImagestylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImagetoolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';

export default class Editor extends ClassicEditorBase {}

Editor.build = {
    plugins: [
        EssentialsPlugin,
        BoldPlugin,
        ItalicPlugin,
        ImagePlugin,
        ImagecaptionPlugin,
        ImagestylePlugin,
        ImagetoolbarPlugin,
        ParagraphPlugin,
    ],
    config: {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'imageUpload',
                'blockQuote',
                'undo',
                'redo'
            ]
        },
        image: {
            toolbar: [
                '|',
                'imageTextAlternative'
            ]
        },
        language: 'en'
    },
    skin: '@ckeditor/ckeditor5-lark',
};