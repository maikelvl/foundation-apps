
console.log('toggle-helper loaded');

function zfToggleHelper(name) {
	console.log(arguments);
	return;
	var options = slice.call(arguments, -1)[0];
	var params = slice.call(arguments, 0, -1);
	var hash = options.hash;

	Ember.assert("You must provide one or more parameters to the zf-toggle helper.", params.length);

	if (params[params.length - 1] instanceof QueryParams) {
		hash.queryParamsObject = params.pop();
	}

	hash.disabledBinding = hash.disabledWhen;

	if (!options.fn) {
		var linkTitle = params.shift();
		var linkType = options.types.shift();
		var context = this;
		if (linkType === 'ID') {
			options.linkTextPath = linkTitle;
			options.fn = function() {
				return EmberHandlebars.getEscaped(context, linkTitle, options);
			};
		} else {
			options.fn = function() {
				return linkTitle;
			};
		}
	}

	hash.parameters = {
		context: this,
		options: options,
		params: params
	};

	options.helperName = options.helperName || 'zf-toggle';

	return viewHelper.call(this, LinkView, options);
}