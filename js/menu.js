
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery nor Found!");
	}
	
	ns.Menu = function( el, attr ){
		console.log( "Menu()" );
		
		if ( el ){
			if ( el.jquery ){
				this.$el = el;
			}
			
			else if ( el.nodeName ){
				this.$el = $( el );
			}
			
			else {
				throw( "Invalid Parameters : Menu ");
			}
			this.data = attr || {};
			this.cache  = {};
			this.init();
		}
	};
	
	ns.Menu.prototype = {
		init: function(){
			console.log( "Menu.init()" );
			
			this.initElements();
			this.bindEvents();
			
			// Hide Menu on Load
			this.cache.subMenus.hide();
		},
		
		initElements: function(){
			console.log( "Menu.initElements()" );
			
			this.cache.subMenus = this.$el.find("ul");
		},

		bindEvents: function(){
			console.log( "Menu.bindEvents()" );
			
			this.$el.on( "click", "a", this, this.hMenuClicked );
			$( document ).on( "click", this, this.hHideMenu );
		},

		hMenuClicked: function( e ){
			console.log( "Menu.hMenuClicked()" );
			
			var that = e.data,
				clickedLink = $( this ),
				subMenu = clickedLink.siblings("ul");
			
			// If not Clicked same menu Item Again
			if ( that.clickedLink && that.clickedLink[0] !== clickedLink[0] ){
				clickedLink.closest("ul").find("ul").hide();
			}
			
			subMenu.fadeIn();
			// Save reference
			that.clickedLink = clickedLink;
			
			// Dont need bubbling here;
			e.stopPropagation();
		},

		hHideMenu: function( e ){
			console.log( "Menu.hMenuClicked()" );
			
			var that = e.data;
			
			that.cache.subMenus.hide();
		}
	}
	
}( window.components = window.components || {}, jQuery ));