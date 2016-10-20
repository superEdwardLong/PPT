/**
 * Created by John on 2016/10/21.
 */
var TimeTextPage = function(){
    var _TimeTextPage = new NSPPTPage();
    _TimeTextPage.editorMiddleItem = function(){
        var fonts = ['超大字号','大字号','中字号','小字号','微小字号'];
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox">';
        STR_HTML += '<div class="editorBoxToolbal">' +
            '<a href="javascript:void(0)" class="ui-icon ui-icon-text">纯文字</a>' +
            '<a href="javascript:void(0)" class="ui-icon ui-icon-time">时间点文字</a>' +
            '</div>';
        STR_HTML += '<div class="editorBoxToolbal">'
        for(var i=0; i< fonts.length; i++){
            STR_HTML += '<a href="javascript:void(0)"> '+fonts[i]+' </a>';
        }
        STR_HTML +='</div>';

            STR_HTML += '<div class="editorBox">';
            STR_HTML += '<div class="editorBoxInner">';
            STR_HTML += '<textarea placeholder="10字以内"></textarea>';
            STR_HTML += '</div>';

            ///试色器
            STR_HTML += '<div class="color_picker_rect">';
            STR_HTML += '<div class="color_picker_option"> ' +
                '<span><a href="javascript:void(0)">背景色</a><i></i></span> ' +
                '<span><a href="javascript:void(0)">文字色</a><i></i></span>' +
                '</div>';
            STR_HTML += '<div class="color_picker_slider">' +
                '<label>透明度<input type="range" min="0" max="100" name="color_alpha"/> <i>0%</i></label>' +
                '<label>红<input type="range" min="0" max="255" name="color_r"/> </label>' +
                '<label>绿<input type="range" min="0" max="255" name="color_g"/> </label>' +
                '<label>蓝<input type="range" min="0" max="255" name="color_b"/> </label>' +
                '</div>';

            STR_HTML += '<div class="color_picker_list">';
            for(var i=0; i< this.colors.length; i++){
                STR_HTML +='<span style="background-color:rgba('+this.colors[i].r+','+this.colors[i].g+','+this.colors[i].b+','+this.colors[i].alpha+')"> </span>';
            }
            STR_HTML +='</div>';
            STR_HTML += '</div>';
            STR_HTML += '</div>';

        STR_HTML += '</div>';
        return  STR_HTML;
    }

}