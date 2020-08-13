(function($){
	//add class to html tag
	$('html').addClass('stylish-select');

	//create cross-browser indexOf
	function indexOfArray (arr, obj, start) {
		for (var i = (start || 0); i < arr.length; i++) {
			if (arr[i] == obj) {
				return i;
			}
		}
	};
	
	
	//제이쿼리 버전업으로 인해 발생하는 오류로 추가 2016-08-02 by 우정민.
	jQuery.browser = {};
	(function(){
		jQuery.browser.msie = false;
		jQuery.browser.version = 0;
		if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
			jQuery.browser.msie = true;
			jQuery.browser.version = RegExp.$1;
		}
	})();
	
	//utility methods
	$.fn.extend({
		hidden: function() {
			oldOpts = $(this).data('ssOpts');
			$this = $(this);
			$this.next().remove();
		},
		
		visible: function() {
			$this = $(this);
			$this.sSelect({width: $this.css("width")});
		},
		
		getSetSSValue: function(value){
			if (value){
				//set value and trigger change event
				$(this).val(value).change();
				return this;
			} else {
				return $(this).find(':selected').val();
			}
		},
		//added by Justin Beasley
		resetSS: function(){
			var oldOpts = $(this).data('ssOpts');
			$this = $(this);
			$this.next().remove();
			//unbind all events and redraw
			$this.unbind('.sSelect').sSelect(oldOpts);
		},
		
		disable: function() { 
			$this = $(this);
			$this.next().remove();
			$this.unbind('.sSelect').sSelect({disabled: 'disabled', width: $(this).data('ssOpts').width, ddMaxHeight: $(this).data('ssOpts').ddMaxHeight});
		},

		enable: function() { 
			$this = $(this);
			$this.next().remove();
			$this.unbind('.sSelect').sSelect({disabled: '', width: $(this).data('ssOpts').width, ddMaxHeight: $(this).data('ssOpts').ddMaxHeight});
		},

		onclick: function(onclickFunction) { 
			$this = $(this);
			$this.next().remove();
			$this.unbind('.sSelect').sSelect({onclickFunction: onclickFunction, disabled: $(this).data('ssOpts').disabled, width: $(this).data('ssOpts').width, ddMaxHeight: $(this).data('ssOpts').ddMaxHeight});
		}
	});

	/** @author $이중한$ @since $2013-02-18$ @job $sSelect key, mouse 같은 동작 하도록 변경$ @etc $$  */
	$.fn.sSelect_new = function(options) {
		$.fn.sSelect.apply(this, [options]);
		$(this).next().keydown(function(event){
			var code = (event.keyCode ? event.keyCode : event.which);
		    if(code == 13) {
		    	if(!options.notForm){
		    		$(this).parents('form:first').submit();
		    	}
		    }
		}).find('.newList li').click(function(){
			if(!options.notForm){
	    		$(this).parents('form:first').submit();
	    	}
		});
	};
	
	$.fn.sSelect_key = function(options) {
		options = $.extend({useTab:true}, options);
		$.fn.sSelect.apply(this, [options]);
	}
	
	$.fn.sSelect = function(options) {
		return this.each(function(){
		
		var defaults = {
			useTab: $(this).hasClass('ui-usetab'),
			defaultText: '',
			animationSpeed: 0, //set speed of dropdown
			ddMaxHeight: '', //set css max-height value of dropdown
			containerClass: '' //additional classes for container div
		}; 
		//initial variables
		
		var opts = $.extend(defaults, options),
		$input = $(this), 
		$isOnclick = $(this).attr('onclick') || opts.isClick,
		$containerDivText = $('<div class="selectedTxt"></div>'),
		$containerDiv = $('<div class="newListSelected ' + opts.containerClass + '" style="width: ' + (parseInt(opts.width)) + 'px;" ></div>'),
		$newUl = $('<ul class="newList" style="visibility: hidden;"></ul>'),
		itemIndex = -1,
		currentIndex = -1,
		keys = [],
		prevKey = false,
		prevented = false,
		$newLi,
		newLiLength;

		if (opts.disabled == 'disabled') { 
			
			$containerDivText.removeClass();
			$containerDivText.addClass('disSelectedTxt');
			
			$containerDiv.removeClass();
			$containerDiv.addClass('newListDisSelected ' + opts.containerClass);
		}
		
		if (opts.width.indexOf('%') > -1) { 
			$containerDiv.css("width", opts.width);
		}
		
		if (opts.ddMarginRight) { 
			$containerDiv.css("margin-right", opts.ddMarginRight);
		}
		
		if (opts.ddMarginTop) { 
			$containerDiv.css("margin-top", opts.ddMarginTop);
		}
			
		//added by Justin Beasley
		$(this).data('ssOpts',options);

		//build new list
		
		if( $.browser.opera ) {
			if (opts.width.indexOf('%') > -1) { 
				$newUl.css("width", opts.width);
			} else { 
				$newUl.css("width", parseInt(opts.width)-2 + "px");
			}
		} else {
			if (opts.width.indexOf('%') > -1) { 
				$newUl.width(opts.width);
			} else { 
				$newUl.width(parseInt(opts.width) + 0 + "px");
			}
		}
		
		$containerDiv.insertAfter($input);
		$containerDiv.attr("tabindex", $input.attr("tabindex") || "0");
		$containerDiv.attr("title", $input.attr("title") || "");
		$containerDivText.prependTo($containerDiv);
		$newUl.appendTo($containerDiv);
		$input.css("width", opts.width);
		$input.hide();
		
		
		//added by Justin Beasley (used for lists initialized while hidden)
		$containerDivText.data('ssReRender',!$containerDivText.is(':visible'));
						
		//test for optgroup
            if ($input.children('optgroup').length == 0){
                $input.children().each(function(i){
                    var option = $(this).html();
                    var key = $(this).val();

                    //add first letter of each word to array
                    keys.push(option.charAt(0).toLowerCase());
                    if ($(this).attr('selected') == 'selected'){
                        opts.defaultText = option;
                        currentIndex = i;
                    }
                    $newUl.append($('<li><a class="newListItem" href="JavaScript:void(0);">'+option+'</a></li>').data('key', key));
                        
                
                });
                //cache list items object
                $newLi = $newUl.children().children();
                
               
            } else { //optgroup
                $input.children('optgroup').each(function(){

                    var optionTitle = $(this).attr('label'),
                    _jQueryptGroup = $('<li class="newListOptionTitle">'+optionTitle+'</li>');

                    _jQueryptGroup.appendTo($newUl);

                    var _jQueryptGroupList = $('<ul></ul>');

                    _jQueryptGroupList.appendTo(_jQueryptGroup);

                    $(this).children().each(function(){
                        ++itemIndex;
                        var option = $(this).html();
                        var key = $(this).val();
                        //add first letter of each word to array
                        keys.push(option.charAt(0).toLowerCase());
                        if ($(this).attr('selected') == true){
                            opts.defaultText = option;
                            currentIndex = itemIndex;
                        }
                        _jQueryptGroupList.append($('<li><a class="newListItem" href="JavaScript:void(0);">'+option+'</a></li>').data('key',key));
                    })
                });
                //cache list items object
                $newLi = $newUl.find('ul li a');
            }
            
            //get heights of new elements for use later
			if( $.browser.opera ) {
				var newUlHeight = $newUl.css("height");
				newUlHeight = newUlHeight.replace("px", "");
				containerHeight = $containerDiv.css("height");
				containerHeight = containerHeight.replace("px", "");
			} else {
				var newUlHeight = $newUl.height();
				containerHeight = $containerDiv.height();
			}
            newLiLength = $newLi.length;
           
            
            //check if a value is selected
            if (currentIndex != -1){
                navigateList(currentIndex, true);
            } else {
                //set placeholder text
                $containerDivText.text(opts.defaultText);
            }
            
            
             //$containerDiv.css("width", (parseInt($containerDiv.css("width"))  + 7));
			 $containerDiv.css("display", "inline");
 			 			 
 			 $newUl.css("width", (parseInt($containerDiv.css("width")) - 2));  //-4에서 -2로 변경 김광호
         
            //decide if to place the new list above or below the drop-down
            function newUlPos(){
                var containerPosY = $containerDiv.offset().top,
                docHeight = jQuery(window).height(),
                scrollTop = jQuery(window).scrollTop();
                //if height of list is greater then max height, set list height to max height value
                if (newUlHeight > parseInt(opts.ddMaxHeight)) {
                    newUlHeight = parseInt(opts.ddMaxHeight);
                }

                containerPosY = containerPosY-scrollTop;
                
                /*
                if (parseInt(containerPosY)+parseInt(newUlHeight) >= docHeight){
                	$newUl.css({
                        top: '-'+newUlHeight+'px',
                        height: newUlHeight
                    });
					$newUl.addClass("borderTop");
                    $input.onTop = true;
                } else {
                    $newUl.css({
                        top: containerHeight-2+'px',
                        height: newUlHeight
                    });
					$newUl.removeClass("borderTop");
                    $input.onTop = false;
                }
                */
                $newUl.css({
                	top: containerHeight+'px',  //-2수치 없앰 김광호
                    height: newUlHeight
                });
				$newUl.removeClass("borderTop");
                $input.onTop = false;
            }

            //run function on page load
            newUlPos();

            //run function on browser window resize
			$(window).bind('resize.sSelect scroll.sSelect', newUlPos);

            //positioning
            function positionFix(){
                $containerDiv.css('position','relative');
            }

            function positionHideFix(){
                $containerDiv.css('position','static');
            }

            $containerDivText.bind('click.sSelect',function(event){
            	if($.browser.msie) {
            		$newLi.each(function(){
                		$(this).attr('tabindex', 0);
                	});	
            	}
            	
            	if (opts.disabled != 'disabled' && opts.onclickFunction == null) { 
            	
            	    event.stopPropagation();
	
					//added by Justin Beasley
					if($(this).data('ssReRender')) {
						newUlHeight = $newUl.height('').height();
						containerHeight = $containerDiv.height();
						$(this).data('ssReRender',false);
						newUlPos();
					}
	
	                //hide all menus apart from this one
					$('.newList').not($(this).next()).hide()
	                    .parent()
	                        .css('position', 'static')
	                        .removeClass('newListSelFocus');
	
	                //show/hide this menu
	                $newUl.toggle();
	                positionFix();
	                //scroll list to selected item
	                $newLi.eq(currentIndex).focus();
            	}
            	
            	if (opts.onclickFunction != '') { 
	         		eval(opts.onclickFunction);
            	}
            });

            $newLi.bind('click.sSelect',function(e){
                var $clickedLi = $(e.target);

                //update counter
                currentIndex = $newLi.index($clickedLi);

                //remove all hilites, then add hilite to selected item
                prevented = true;
                navigateList(currentIndex);
                $newUl.hide();
                $containerDiv.css('position','static');//ie

            });

            $newLi.bind('mouseenter.sSelect',
				function(e) {
					var $hoveredLi = $(e.target);
					$hoveredLi.addClass('newListHover');
				}
			).bind('mouseleave.sSelect',
				function(e) {
					var $hoveredLi = $(e.target);
					$hoveredLi.removeClass('newListHover');
				}
			);

            function navigateList(currentIndex, init){
                $newLi.removeClass('hiLite')
                .eq(currentIndex)
                .addClass('hiLite');

                if ($newUl.is(':visible')){
                    $newLi.eq(currentIndex).focus();
                }

                var text = $newLi.eq(currentIndex).text();
                var val = $newLi.eq(currentIndex).parent().data('key');
                
                //page load
                if (init == true){
                    $input.val(val);
                    //$containerDivText.text(text);
                    $containerDivText.html('<span class="wordin">' + text + '</span>');
                    return false;
                }

				try {
				    $input.val(val);
				} catch(ex) {
				    // handle ie6 exception
				    $input[0].selectedIndex = currentIndex;
				}
				
				if($isOnclick) {
					$input.click();
				}else {
					$input.change();
				}
               
                
                $containerDivText.html('<span class="wordin">' + text + '</span>');
            }

            $input.bind('change.sSelect',function(event){
            	$targetInput = $(event.target);
                //stop change function from firing
            	if (prevented == true){
                    prevented = false;
                    return false;
                }
                $currentOpt = $targetInput.find(':selected');

                //currentIndex = $targetInput.find('option').index($currentOpt);
                currentIndex = $targetInput.find('option').index($currentOpt);

                navigateList(currentIndex, true);
			});
            
            $input.bind('click.sSelect',function(event){
            	$targetInput = $(event.target);
                //stop change function from firing
            	if (prevented == true){
                    prevented = false;
                    return false;
                }
                $currentOpt = $targetInput.find(':selected');

                //currentIndex = $targetInput.find('option').index($currentOpt);
                currentIndex = $targetInput.find('option').index($currentOpt);

                navigateList(currentIndex, true);
			});

            //handle up and down keys
            function keyPress(element) {
                //when keys are pressed
                $(element).unbind('keydown.sSelect').bind('keydown.sSelect',function(e){
                    var keycode = e.which;

                    //prevent change function from firing
                    prevented = true;

                    switch(keycode) {
                        case 40: //down
                        case 39: //right
                            incrementList();
                            
                            if(opts.useTab) {
                        		if(!$newUl.is(':visible')) {
                            		$input.next().find('.wordin').click();
                        		}
                            }
                            
                            return false;
                            break;
                        case 38: //up
                        case 37: //left
                            decrementList();
                            
                            if(opts.useTab) {
                        		if(!$newUl.is(':visible')) {
                            		$input.next().find('.wordin').click();
                        		}
                            }
                            return false;
                            break;
                        case 33: //page up
                        case 36: //home
                            gotoFirst();
                            return false;
                            break;
                        case 34: //page down
                        case 35: //end
                            gotoLast();
                            return false;
                            break;
                        case 13:
                        	if(opts.useTab) {
                        		if(!$newUl.is(':visible')) {
                            		$input.next().find('.wordin').click();
                            	}else {
                            		entercrementList();
                           			$newUl.hide();
                                	positionHideFix();
                                	$containerDiv.focus(); // enter_esc_keydown_focus
                            	}
                        	}else {
                        		 entercrementList();
                            	 $newUl.hide();
                                 positionHideFix();
                        	}
                            return false;
                            break;
                        case 27:
                            $newUl.hide();
                            positionHideFix();
                            
                            $containerDiv.focus(); // enter_esc_keydown_focus
                            return false;
                            break;
                    }
                   
                    if(opts.useTab && keycode == 9) { // 9 == tab
                    	if($newUl.is(':visible')) {
                    		$newUl.hide();
                            positionHideFix();
                            
                            nextFormElement();
                            return false;
                    	}
                    }
                    
                    
                    //check for keyboard shortcuts
                    keyPressed = String.fromCharCode(keycode).toLowerCase();

                    var currentKeyIndex = indexOfArray(keys, keyPressed);
                    
                    if (typeof currentKeyIndex != 'undefined') { //if key code found in array
                        ++currentIndex;
                        currentIndex = indexOfArray(keys, keyPressed, currentIndex); //search array from current index
                        if (currentIndex == -1 || currentIndex == null || prevKey != keyPressed) currentIndex = indexOfArray(keys, keyPressed); //if no entry was found or new key pressed search from start of array


                        navigateList(currentIndex);
                        //store last key pressed
                        prevKey = keyPressed;
                        return false;
                    }
                });
            }
            
            function nextFormElement() {
                var fields = $('body').find('button,input,textarea,select,a').not('a.newListItem').not('input[type=hidden]'),
                    index = fields.index($input);
                if (index > -1 && (index + 1) < fields.length) {
                    fields.eq(index + 1).focus();
                }
                return false;
            }
            
            function incrementList(){
                if (currentIndex < (newLiLength-1)) {
                    ++currentIndex;
                    if($isOnclick) {
                    	navigateList(currentIndex, true);
                    }else {
                    	navigateList(currentIndex, false);
                    }
                    return true;
                }
                return false;
            }

            function decrementList(){
                if (currentIndex > 0) {
                    --currentIndex;
                    if($isOnclick) {
                    	navigateList(currentIndex, true);
                    }else {
                    	navigateList(currentIndex, false);
                    }
                    return true;
                }
                return false;
            }
            
            function entercrementList(){
            	if (currentIndex >= 0) {
                    if($isOnclick) {
                    	navigateList(currentIndex, false);
                    }else {
                    	navigateList(currentIndex, true);
                    }
                }
            }

            function gotoFirst(){
                currentIndex = 0;
                navigateList(currentIndex);

            }

            function gotoLast(){
                currentIndex = newLiLength-1;
                navigateList(currentIndex);
            }

            $containerDiv.bind('click.sSelect',function(e){
                e.stopPropagation();
                keyPress(this);
            });

            $containerDiv.bind('focus.sSelect',function(){
                $(this).addClass('newListSelFocus');
                keyPress(this);
            });

            $containerDiv.bind('blur.sSelect',function(){
                $(this).removeClass('newListSelFocus');
            });

            //hide list on blur
            $(document).bind('click.sSelect',function(){
                $containerDiv.removeClass('newListSelFocus');
                $newUl.hide();
                positionHideFix();
            });

            //add classes on hover
            $containerDivText.bind('mouseenter.sSelect',
				function(e) {
					var $hoveredTxt = $(e.target);
					$hoveredTxt.parent().addClass('newListSelHover');
				}
			).bind('mouseleave.sSelect',
				function(e) {
					var $hoveredTxt = $(e.target);
					$hoveredTxt.parent().removeClass('newListSelHover');
				}
            );

            //reset left property and hide
            $newUl.css({
                left: '0',
                display: 'none',
                visibility: 'visible'
            });
            
            // @author $이중한$ @since $2013-04-10$ @job $ie7 : z-index bug$ @etc $$
            if($.browser.msie && parseInt($.browser.version) === 7){
            	if($input.hasClass('ie7_check') && $input.parent().prop('tagName').toLowerCase() == 'fieldset') {
	            	var _parent;
	            	for(var i = 0 ; i < 3 ; i++) {
	            		_parent = $input.parent().css('z-index', 100);
	            		if(_parent.prop('tagName').toLowerCase() == 'tr') {
	            			break;
	            		}
	            	}
	            }
            }
            
        });

    };

})(jQuery);