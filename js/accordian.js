
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery nor Found!");
	}
	
	ns.Accordian = function( el, attr ){
		console.log( "Accordian()" );
		
		if ( el ){
			if ( el.jquery ){
				this.$el = el;
			}
			
			else if ( el.nodeName ){
				this.$el = $( el );
			}
			
			else {
				throw( "Invalid Parameters : Accordian ");
			}
			this.data = attr || {};
			this.cache  = {};
			this.init();
		}
	};
	
	ns.Accordian.prototype = {
		init: function(){
			console.log( "Accordian.init()" );
			
			this.initElements();
			this.bindEvents();
		},
		
		initElements: function(){
			console.log( "Accordian.initElements()" );
			
			this.cache.contents = this.$el.find("dd");
			
			// Hide all content at start
			this.cache.contents.addClass("hide");
		},

		bindEvents: function(){
			console.log( "Accordian.bindEvents()" );
			
			this.$el.on( "click", "dt", this, this.hHeadingClicked );
		},

		hHeadingClicked: function( e ){
			console.log( "Accordian.hHeadingClicked()" );
			
			var that = e.data,
				clickedHeading = $( this );
			
			if ( that.clickedHeading && that.clickedHeading[0] !== clickedHeading[0] ){
				that.clickedHeading.removeClass("active");
				that.clickedHeading.next().slideUp();
				//Animation.slideUpDown( that.clickedHeading.next(), clickedHeading.next() );
			}
			/*else {
				Animation.slideDown( clickedHeading.next() );
			}*/
			
			clickedHeading.addClass("active");
			clickedHeading.next().slideToggle();
			
			//save references
			that.clickedHeading = clickedHeading;
		}
	}
	
}( window.components = window.components || {}, jQuery ));