
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery nor Found!");
	}
	
	ns.Tab = function( el, attr ){
		console.log( "Tab()" );
		
		if ( el ){
			if ( el.jquery ){
				this.$el = el;
			}
			
			else if ( el.nodeName ){
				this.$el = $( el );
			}
			
			else {
				throw( "Invalid Parameters : Tab ");
			}
			this.data = attr || {};
			this.cache  = {};
			this.init();
		}
	};
	
	ns.Tab.prototype = {
		init: function(){
			console.log( "Tab.init()" );
			
			this.initElements();
			this.bindEvents();
		},
		
		initElements: function(){
			console.log( "Tab.initElements()" );
			
			var helper;
			
			this.cache.links = this.$el.find("[data-id=links]");
			this.cache.content = this.$el.find("[data-id=content]");
			
			// Check dependencied
			if ( !this.cache.links.length || !this.cache.content.length ){
				throw("Missing required sections : Tab");
			}
			
			// Save reference to active tab, if not then activate first tab
			helper = this.cache.links.find(".active");
			if ( !helper.length ){
				helper = this.cache.links.find("a").first();
				helper.addClass("active");				
			}
			this.clickedTab = helper;
			
			this.clickedTabContent = $( this.clickedTab.attr("href") );
			this.clickedTabContent.removeClass("hide");				
		},
		
		bindEvents: function(){
			console.log( "Tab.bindEvents()" );
			
			this.cache.links.on("click", "a", this, this.hTabClicked );
		},

		hTabClicked: function( e ){
			console.log( "Tab.hTabClicked()" );
		
			var that = e.data,
				clickedTab = $(this ),
				clickedTabContent = $( clickedTab.attr("href") );
			
			// If same tab is clicked more than once
			if ( clickedTab[0] === that.clickedTab ){
				return false;
			}
			
			// Clear active state from previous tab
			else if ( that.clickedTab ){
				that.clickedTab.removeClass("active");
			}
			
			clickedTab.addClass("active");

			// Hide previously activated content
			Animation.fadeOutIn( that.clickedTabContent, clickedTabContent, 0.5 );
			
			// Save reference
			that.clickedTab = clickedTab;
			that.clickedTabContent = clickedTabContent;			

			return false;
		}
	}
	
}( window.components = window.components || {}, jQuery ));