/*
 |--------------------------------------------------------------------------
 | SkyCaiji (蓝天采集器)
 |--------------------------------------------------------------------------
 | Copyright (c) 2018 https://www.skycaiji.com All rights reserved.
 |--------------------------------------------------------------------------
 | 使用协议  https://www.skycaiji.com/licenses
 |--------------------------------------------------------------------------
 */
'use strict';var taskOpClass={import_rule:function(ruleId,ruleName){$('#form_item input[name="rule_id"]').val(ruleId);$('#btn_import_rule').text('导入规则：'+ruleName);if(ruleId=='file'){var settings=getFormAjaxSettings($('#form_item'));settings.url=ulink('task/import_rule_file');settings.beforeSend=null;settings.error=null;settings.success=function(data){data.url='';if(data.msg){ajaxDataMsg(data)}
$('#import_rule_file_plugins').hide().find('.plugins-info').html('');var dataData=data.data;if(isObject(dataData)){if(isObject(dataData.show_plugins)){var html='<input type="hidden" name="upload_addon[ignore_plugin]" value="1" />';for(var app in dataData.show_plugins){html+='<div class="checkbox"><label><input type="checkbox" name="upload_addon[plugins][]" value="'+app+'">'+dataData.show_plugins[app]+'</label></div>'}
$('#import_rule_file_plugins').show().find('.plugins-info').html(html)}}};ajaxOpen(settings)}else{$('#form_item [name="rule_file"]').val('')}
$('#myModal').modal('hide')},import_task:function(id,name){$('#form_item input[name="task_id"]').val(id);$('#btn_import_task').text('导入任务：'+name);$('#myModal').modal('hide')},task_init:function(){$('#form_item select[name="module"]').bind('change',function(){if($(this).val()!='pattern'){$('#btn_import_rule').parents('.input-group-btn').hide()}else{$('#btn_import_rule').parents('.input-group-btn').show()}});$('#form_item select[name="auto"]').bind('change',function(){var val=$(this).val();val=toInt(val);if(val==2){$('#config_task_timer').show()}else{$('#config_task_timer').hide()}});$('select[id^="task_timer_"]').bind('change',function(){var name=$(this).attr('data-name');if(name){var val=$(this).val();val=val?val.join(','):'';$('#form_item [name="'+name+'"]').val(val)}});$('#form_item [name="rule_file"]').bind('change',function(){taskOpClass.import_rule('file',$(this).val());$(this).parents('.dropdown').removeClass('open')});$('#form_item [name="config[proxy]"]').bind('click',function(){var open=!1;var val=$(this).val();if(val=='y'){open=!0}else if($(this).attr('data-global')){open=!0}
if(open){$('#config_proxy').removeClass('box-not-enable')}else{$('#config_proxy').addClass('box-not-enable')}});$('#form_item [name="config[download_img]"]').bind('click',function(){var open=!1;var val=$(this).val();if(val=='y'){open=!0}else if($(this).attr('data-global')){open=!0}
if(open){$('#config_download_img').removeClass('box-not-enable')}else{$('#config_download_img').addClass('box-not-enable')}});$('#form_item [name="config[img_name]"]').bind('change',function(){var val=$(this).val();if(val=='custom'){$('#config_img_name_custom').show()}else{$('#config_img_name_custom').hide()}});$('#config_img_name_custom').on('click','.name-custom-path a[data-val]',function(){insertAtCaret($('[name="config[name_custom_path]"]'),$(this).attr('data-val'))});$('#config_img_name_custom').on('click','.name-custom-name a[data-val]',function(){insertAtCaret($('[name="config[name_custom_name]"]'),$(this).attr('data-val'))});$('#form_item [name="config[img_func]"]').bind('change',function(){var open=!1;var val=$(this).val();if(val){if(val!='n'){open=!0}}else{if($(this).attr('data-global')){open=!0}}
if(open){$('#config_img_func').show()}else{$('#config_img_func').hide()}});$('#form_item .dropup-img-params .dropdown-menu a').bind('click',function(){var val=$(this).attr('data-val');if(val){var obj=$('#form_item [name="config[img_func_param]"]');var objVal=obj.val();objVal=objVal?(objVal+"\r\n"):'';obj.val(objVal+val)}})},task_load:function(taskData,fieldList){taskOpClass.task_init();var imgFunc='';if(taskData){$('#form_item select[name="tg_id"]').val(toInt(taskData.tg_id));$('#form_item select[name="module"]').val(taskData.module);$('#form_item select[name="auto"]').val(toInt(taskData.auto)).trigger('change');var task_timer=taskData._task_timer;if(task_timer){var timerNames=['month','day','hour','minute'];for(var i in timerNames){var timerName=timerNames[i];var timerData=task_timer[timerName];if(!timerData||typeof(timerData)!='object'){timerData=[]}
if(timerData.length>0){$('#form_item [name="task_timer['+timerName+']"]').val(timerData.join(','));for(var ii in timerData){$('#task_timer_'+timerName).find('option[value="'+timerData[ii]+'"]').prop('selected','selected')}}else{$('#task_timer_'+timerName).find('option[value=""]').prop('selected','selected')}}}
var task_config=taskData.config;var showConfig=!1;if(task_config){imgFunc=task_config.img_func;for(var i in task_config){if(task_config[i]){showConfig=!0;break}}
for(var i in task_config){var ele=$('#form_item').find('[name="config['+i+']"]').eq(0);var eleType=ele.attr('type');if(ele.is('input')&&eleType=='radio'){$('#form_item').find('[name="config['+i+']"][value="'+task_config[i]+'"]').prop('checked','checked')}else if(ele.is('input')&&eleType=='number'){task_config[i]=toInt(task_config[i]);if(task_config[i]!=0){ele.val(task_config[i])}}else{ele.val(task_config[i])}}
$('#form_item [name="config[proxy]"][value="'+task_config.proxy+'"]').trigger('click');$('#form_item [name="config[download_img]"][value="'+task_config.download_img+'"]').trigger('click');$('#form_item [name="config[img_name]"]').trigger('change');$('#form_item [name="config[img_func]"]').trigger('change')}
if(taskData._show_config||showConfig){showPanelCollapse('#task_config')}
if(fieldList&&fieldList.length>0){$('#config_img_name_custom .name-custom-path-fields').html('');$('#config_img_name_custom .name-custom-name-fields').html('');for(var i in fieldList){var fieldHtml='[字段:'+fieldList[i]+']';fieldHtml='<li><a href="javascript:;" data-val="'+fieldHtml+'">'+fieldHtml+'</a></li>';$('#config_img_name_custom .name-custom-path-fields').append(fieldHtml);$('#config_img_name_custom .name-custom-name-fields').append(fieldHtml)}}}
loadPluginFunc({module:'downloadImg',boxObj:'#form_item',funcObj:'[name="config[img_func]"]',funcVal:imgFunc,paramObj:'[name="config[img_func_param]"]'})}}