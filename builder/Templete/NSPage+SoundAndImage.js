/**
 * Created by BOT01 on 16/10/20.
 */
/**
 * Created by BOT01 on 16/10/20.
 * 语音 + 图片
 * 图片作为背景
 */
var SoundAndImage = function(){
    var _SoundAndImage =  new NSPPTPage();
    _SoundAndImage.colors = [
        {r:255,g:255,b:255,alpha:1},
        {r:255,g:204,b:0,alpha:1},
        {r:255,g:153,b:0,alpha:1},
        {r:255,g:102,b:0,alpha:1},
        {r:255,g:51,b:0,alpha:1},
        {r:255,g:255,b:102,alpha:1},
        {r:255,g:204,b:102,alpha:1},
        {r:255,g:102,b:102,alpha:1},
        {r:255,g:51,b:102,alpha:1},
        {r:0,g:255,b:0,alpha:1},
        {r:0,g:204,b:0,alpha:1},
        {r:0,g:153,b:0,alpha:1},
        {r:0,g:102,b:0,alpha:1},
        {r:0,g:51,b:0,alpha:1},
        {r:0,g:255,b:204,alpha:1},
        {r:0,g:204,b:204,alpha:1},
        {r:0,g:153,b:204,alpha:1},
        {r:0,g:102,b:204,alpha:1},
        {r:0,g:51,b:204,alpha:1},
        {r:0,g:0,b:0,alpha:1}
    ];
    _SoundAndImage.editorMiddleItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-image"></span><span>图片编辑</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
        STR_HTML += '<tr>';
        STR_HTML += '<td width="15%" align="center">图片</td>';
        STR_HTML += '<td><div class = "dashedRect"></div></td>';
        STR_HTML += '<td width="15">';
        STR_HTML += '<a href="javascript:void(0)" data-type="button"  data-theme="gray">上传图片</a>';
        STR_HTML += '</td>';
        STR_HTML += '</tr>';
        STR_HTML += '</table>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _SoundAndImage.editorBottomItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目文字</span></div>';
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
        return STR_HTML;

    };
    return _SoundAndImage;
}