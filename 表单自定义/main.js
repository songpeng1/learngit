;(function($){
$.extend({
radio_obj: function(obj) {
	window.radio_obj=window.radio_obj || [];
	obj?radio_obj.push(obj):"";
	return radio_obj; 
}
});
$.extend($.fn,{
	set_input:function(e){
		var opation={
			init_css:{'display':'block','width':'20px','height':'20px','border':'2px solid #333','background':'#fff','border-radius':'50%'},
			active_css:{'background':'#333'},
			click_ele:function(e){}
		};
		opation=$.extend({},opation,e);
		//console.log(e)
		$(this).each(function(){
		var _this=$(this);
		var time=new Date().getTime();
		var class_name='input_'+time.toString().substr(8)+Math.floor(Math.random()*10000);
		var icon_class=opation.icon?opation.icon[0]:'';
		var icon_init=opation.icon?opation.icon[1]:'';
		var icon_active=opation.icon?opation.icon[2]:'';
		
		var html="<span class='"+icon_class+" "+class_name+"' data-value='"+_this.attr('data-value')+"'>"+icon_init+"</span>";
		_this.append(html);
		
		!opation.icon?$('.'+class_name).css(opation['init_css']):'';
		if(_this.attr('data-type')=='radio'){
			var name=_this.attr('data-name');
			$.radio_obj({ele:_this,name:name})
			
		}
		
		$('.'+class_name).on('click',function(){
			if(!$(this).prop('data-state')){
				check_radio();
				$(this).prop('data-state',1);
				if(opation.icon){
					$(this).html(icon_active);
				}else{
					$(this).css(opation['active_css']);
				}
				 
			}else{
				
				$(this).prop('data-state',0);
				if(opation.icon){
					$(this).html(icon_init);
				}else{
					$(this).css(opation['init_css']);
				}
			}
			
			opation.click_ele($(this));
			
		
		
		});
		//
		function check_radio(){
			for(a in $.radio_obj()){
				if($.radio_obj()[a]['name']==_this.attr('data-name')){
					$.radio_obj()[a]['ele'].children().prop('data-state',0);
					if(opation.icon){
						$.radio_obj()[a]['ele'].children().html(icon_init);
					}else{
						$.radio_obj()[a]['ele'].children().css(opation['init_css']);
					}
				}
			}
		}
		//
		return this;
	});	
	}
		
});


})(jQuery);