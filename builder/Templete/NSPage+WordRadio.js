/**
 * Created by BOT01 on 16/10/20.
 */
var WordRadioPage = function(){
    var _WordRadioPage = new NSPPTPage();
    _WordRadioPage.scrollDirection = scrollDirectionEnum.horizontally;
    _WordRadioPage.editoMiddleItem = function(){
        ///// 颜色编辑器
        STR_HTML += '<div class="editorBox">';
        STR_HTML += '<div class="editorBoxToolbal"><span>布局</span>' +
            '<a href="javascript:void(0)" class="ui-icon-layout ui-icon-layout-topBottom">上下</a>' +
            '<a href="javascript:void(0)" class="ui-icon-layout ui-icon-layout-leftRight">左右</a>' +
            '</div>';

        for(var i=0; i<2; i++){
            STR_HTML += '<div class="editorBox">';
            STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>答案'+(i+1)+'</span></div>';
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
        }
        STR_HTML += '</div>';
        return  STR_HTML;
    };
    _WordRadioPage.colors = [
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
    ]
}