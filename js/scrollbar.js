
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery nor Found!");
	}
	
	ns.Scrollbar = function( el, attr ){
		console.log( "Scrollbar()" );
		
		if ( el ){
			if ( el.jquery ){
				this.$el = el;
			}
			
			else if ( el.nodeName ){
				this.$el = $( el );
			}
			
			else {
				throw( "Invalid Parameters : Scrollbar ");
			}
			this.data = attr || {};
			this.cache  = {};
			this.init();
		}
	};
	
	ns.Scrollbar.prototype = {
		init: function(){
			console.log( "Scrollbar.init()" );
			
			this.initElements();
			this.bindEvents();
		},
		
		initElements: function(){
			console.log( "Scrollbar.initElements()" );
			
			// Container for scrollable data
			this.cache.scrollPane = $("<div class='scrollpane' data-id='scrollpane'>")
										.append( this.$el.children() )
										.appendTo( this.$el );
			
			// The boundaries for within which scrollbar can be scrolled
			this.cache.scrollTrack = $("<div class='scrolltrack' data-id='scrolltrack'>")
										.append( $("<span class='bar' data-id='bar'>") )
										.appendTo( this.$el )
										.height( this.$el.height() );
			
			// Scrollbar that user drags up and down to scroll 
			this.cache.bar = this.$el.find("[data-id=bar]");
			
			// Flag denotes if scrollbar is currently beign scrolled
			this.data.scrollActive = false;
			
			// To offset for scrollbar, usefull in translate global mouse cordinates to Local Cordinates
			this.data.barOffsetTop = this.cache.bar.offset().top;
			
			// Height for data container
			this.data.scrollPaneHeight = this.cache.scrollPane.height();
			
			// Scroll Track's height
			this.data.trackHeight = this.cache.scrollTrack.height();
						
			// Height of scrollbar
			this.data.barHeight = Math.round( this.data.trackHeight / ( this.data.scrollPaneHeight / this.data.trackHeight ) );
			
			// The bottom boundary till which scrollbar can be scrolled
			this.data.netTrackHeight = this.data.trackHeight - this.data.barHeight;
			
			// Hown much content to scroll if 1px scrollbar is moved
			// TODO: remove this 30 and make it logical
			this.data.contentScrollOffset = (this.data.scrollPaneHeight - this.data.trackHeight + 30 ) / this.data.netTrackHeight;
			
			// Point on scrollbar at which user is dragging the scroll bar ( between 0 to this.data.barHeight ) 
			this.data.dragPoint = 0;
			
			// Assign bar's new height
			this.cache.bar.height( this.data.barHeight );
		},

		bindEvents: function(){
			console.log( "Scrollbar.bindEvents()" );
			
			$( document ).on( "mousemove", this, this.hBarDrag );
			$( document ).on( "mouseup", this, this.hDeactivateDrag );
			this.cache.bar.on( "mousedown", this, this.hActivateDrag );
		},
		
		hBarDrag: function( e ){
			console.log( "Scrollbar.hBarDrag()" );
			
			var that = e.data;
			
			if ( that.data.scrollActive ){
				// Local Y cordinates w.r.t sctollbar
				var scrollTop = e.pageY - that.data.barOffsetTop;
				
				// Adjust dragPoint value to get scroll precision
				scrollTop -= that.data.dragPoint;
				
				// Limit bar position within scrolltrack's boundaries
				scrollTop = scrollTop < 0 ? 0 : ( scrollTop > that.data.netTrackHeight ? that.data.netTrackHeight : scrollTop );				
				
				// Set scroll bars new position				
				that.cache.bar.css( "top", scrollTop + "px");
				
				// Set content's new position
				that.cache.scrollPane.css( "margin-top", Math.round( -1 * that.data.contentScrollOffset * scrollTop ) + "px" );
				
				// Trigger scroll Event
				that.$el.trigger( "scroll", {scrollTop: scrollTop} );
			}
		},

		// Activates scrolling
 		hActivateDrag: function( e ){
			console.log( "Scrollbar.hActivateDrag()" );
			
			var that = e.data;
			
			that.data.scrollActive = true;
			
			// Need to recalculate offset as scrollbar position may have changed
			that.data.dragPoint = e.pageY - that.cache.bar.offset().top;
		},

		// Deactivates scrolling
 		hDeactivateDrag: function( e ){
			console.log( "Scrollbar.hDeactivateDrag()" );
			
			var that = e.data;
			
			that.data.scrollActive = false;
			
			// Inapplicale, so set it to zero
			that.data.dragPoint = 0;
		} 
	}
	
}( window.components = window.components || {}, jQuery ));