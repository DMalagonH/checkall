# checkall
Checkbox to select all

## Dependencies
* jQuery

## Usage
	<input type="checkbox" class="checkall" data-check=".checkbox-child"/>

	<input type="checkbox" class="checkbox-child"/>
	<input type="checkbox" class="checkbox-child"/>
	<input type="checkbox" class="checkbox-child"/>

	$(".checkall").checkall({
		onChangeAll: function($el, checked, $checkboxes){
			// ...
		},
        onChangeOne: function(){
			// ...
		}
	});