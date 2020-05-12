$(document).ready(function () {

    var set_up_ace = function () {
        $('<div class="editor-preview">Live Preview:</div>').on('update', function (e, data) {
            $(this).html(data);
        }).insertAfter($('textarea.acesvg:not([data-init])'));
        $('textarea.acesvg:not([data-init])').attr('data-init', true)
            .wrap('<div class="editor-wrap" ></div>')
            .each(function (i, o) {
                var $this = $(this);
                var textarea = $(o);
                var id = textarea.attr('id') + '_ace';
                var editdiv = textarea.after('<div id="' + id + '" class="ace_editdiv editor-wrap ' + textarea.attr('class') + '"></div>');
                textarea.hide();
                ace.config.set('basePath', Perch.path +'/addons/plugins/editors/acesvg/src-min-noconflict');
                var editor = ace.edit(id);
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
                    $this.closest('.editor-wrap').siblings('.editor-preview').trigger('update', editor.getSession().getValue());
                });
                //Perch.UI.Global.resizeFields();
                editor.resize();

                $(window).on('perch.sidebar-toggle', function () {
                    editor.resize();
                });
                $this.closest('.editor-wrap').siblings('.editor-preview').trigger('update', editor.getSession().getValue());

            });
    }

    $(window).on('Perch_Init_Editors', function () {
        set_up_ace();
    });

    set_up_ace();
});