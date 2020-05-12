$(document).ready(function () {

    var set_up_ace = function () {


        $('textarea.acesvg:not([data-init])').attr('data-init', true).each(function (i, o) {
            var $this = $(this),
                textarea = $(o),
                $editorWrap,
                id = textarea.attr('id') + '_ace',
                editor;

            textarea.wrap('<div class="editor-wrap" ></div>');
            textarea.after('<div id="' + id + '" class="ace_editdiv editor-wrap ' + textarea.attr('class') + '"></div>');
            textarea.hide();

            ace.config.set('basePath', Perch.path + '/addons/plugins/editors/acesvg/src-min-noconflict');
            editor = ace.edit(id);
            editor.getSession().setUseWorker(false);
            editor.setTheme("ace/theme/monokai");
            editor.getSession().setMode("ace/mode/svg");
            editor.getSession().setValue(textarea.val());

            editor.getSession().on('change', function () {
                textarea.val(editor.getSession().getValue());
            });

            editor.getSession().setUseWrapMode(true);
            editor.setHighlightActiveLine(false);
            editor.setShowPrintMargin(false);
            editor.renderer.setShowGutter(true);

            editor.getSession().on('change', function () {
                $this.closest('.editor-wrap').find('.editor-preview').trigger('update', editor.getSession().getValue());
            });
            //Perch.UI.Global.resizeFields();
            editor.resize();

            $(window).on('perch.sidebar-toggle', function () {
                editor.resize();
            });
            $this.closest('.editor-wrap').find('.editor-preview').trigger('update', editor.getSession().getValue());

            $editorWrap = textarea.closest('.editor-wrap').first();

            $editorWrap.append($('<div class="editor-preview" style="display:none"></div>'));

            $editorWrap.find('.editor-preview').on('update', function (e, data) {
                $(this).html(data);
            });

            $editorWrap.append($('<button class="btn-preview button button-small action-info" type="button">Toggle Preview</button>'));
            $editorWrap.find('.btn-preview').on('click', function (e) {
                e.preventDefault();
                console.log($editorWrap.find('.editor-preview').length);
                $editorWrap.find('.editor-preview').trigger('update', editor.getSession().getValue()).toggle();
            });


        });


    };

    $(window).on('Perch_Init_Editors', function () {
        set_up_ace();
    });

    set_up_ace();
});