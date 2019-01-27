const ApplicationPolicy = require("./application");

moduel.exports = class TopicPolicy extends ApplicationPolicy {

	new(){
		reutrn this._isAdmin();
	}

	create(){
		reutrn this.new();
	}

	edit(){
		return this._isAdmin();
	}

	update(){
		return this.edit();
	}

	destroy() {
		return this.update();
	}
}