
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery nor Found!");
	}
	
	ns.Animation = {
		fadeIn: function( el, delay ){
			var d = delay && delay + "s" || "0.5s";
			
			el.css("opacity", 0);
			el.removeClass("hide");
			el.css({
				transition: "opacity " + d,
				opacity: 1
			});
		},
		
		fadeOut: function( el , cb, delay ){
			var d = delay && delay + "s" || "0.5s";
			
			el.css({
				transition: "opacity " + d,
				opacity: 0
			});
			setTimeout( function(){ el.addClass("hide"); cb && cb(); }, delay && delay * 1000 || 500);
		},
		
		fadeOutIn: function( fadeOutEl, fadeInEl, delay ){
			var that = this,
				d = delay || 0.5;
			
			var fn = function(){
				that.fadeIn( fadeInEl, d );
			};
			
			this.fadeOut( fadeOutEl, fn, d );			
		},
		
		slideUp: function( el, delay, cb ){
			var d = delay && delay + "s" || "0.5s";
			
			el.attr("data-height", el.height());
			//el.attr("data-height", el.height());
			el.css({
				transition: "height " + d,
				height: 0,
				fontSize: 0
			});
			setTimeout( function(){ el.hide(); cb && cb(); }, d && d * 1000 || 500);
		},

		slideDown: function( el, delay, cb ){
			var d = delay && delay + "s" || "0.5s",
				h = el.attr("data-height");
			
			el.css({
				transition: "height " + d,
				height: h
			});
			setTimeout( function(){ el.show(); cb && cb(); }, d && d * 1000 || 500);
		},
		
		slideUpDown: function( slideUpEl, slideDownEl, delay ){
			var that = this,
				d = delay || 0.5;
			
			var fn = function(){
				that.slideDown( slideDownEl, d );
			};
			
			this.slideUp( slideUpEl, d, fn );	
		}
	};
	
}( window, jQuery ));