var DEMO = DEMO || {};

//models
DEMO.User = Class.extend((function() {
	var self = {};

	var validators = {
		'name' : function() {
					if (this.profile['name'] == '') {
						this.errors['name'] = 'userNameValidError';
						return false;
					}
					return true;
				},
		'mail' : function() {
					if (this.profile['mail'] == '') {
						this.profile['mail'] = "Not registered";
					}
					return true;
				},
		'image' : function() {
					if (this.profile['image'] == '') {
						this.profile['image'] = "No image";
					}
					return true;
				}
	}
	
	self.init = function(attrs){
		this.errors = {};
		this.profile = {};
		this.profile['name'] = attrs.name || "";
		this.profile['mail'] = attrs.mail || "";
		this.profile['id'] = attrs.id || "";
		this.profile['url'] = attrs.url || "";
		this.profile['image'] = attrs.image || "";
	}
	self.getGooglePProfile = function(Search){
		if (this.profile.name == 'Not Registered') {
			return;
		}
		var inst = this;
		Search.get({query : this.profile.name}, function(res){
			if (res.items.length == 0) {
				return;
			}
			inst.profile['id'] = res.items[0].id;
			inst.profile['url'] = res.items[0].url;
			inst.profile['image'] = res.items[0].image.url;	
		});
	}
	self.validate = function(attrNames) {
		var valid = true;
		var inst = this;
		if (attrNames == null || attrNames.length == 0) {
			$.each(validators, function(key, val) {
				if (inst.profile[key] !== null) {
					valid &= validators[key].call(inst);
				}
			});
		} else {
			$.each(attrNames, function(index, val) {
				valid &= validators[val].call(inst);
			});
		}
		return valid;
	}

	return self;
})());
