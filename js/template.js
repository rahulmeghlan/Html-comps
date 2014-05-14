
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery nor Found!");
	}
	
	ns.Component = function( el, attr ){
		console.log( "Tab()" );
		
		if ( el ){
			if ( el.jquery ){
				this.$el = el;
			}
			
			else if ( el.nodeName ){
				this.$el = $( el );
			}
			
			else {
				throw( "Invalid Parameters : Component ");
			}
			this.data = attr || {};
			this.cache  = {};
			this.init();
		}
	};
	
	ns.Component.prototype = {
		init: function(){
			console.log( "Component.init()" );
			
			this.initElements();
			this.bindEvents();
		},
		
		initElements: function(){
			console.log( "Component.initElements()" );
			
		},

		bindEvents: function(){
			console.log( "Component.bindEvents()" );
			
		}
	}
	
}( window.components = window.components || {}, jQuery ));