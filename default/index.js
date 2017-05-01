var Generator = require('yeoman-generator');
var _ = require('lodash');

module.exports = Generator.extend({
	initializing: function () {
		// Read the original package.json
		this.pkg = this.fs.readJSON(
			this.destinationPath('package.json'), {}
		);
	},

	installing: function() {
		this.npmInstall(["done-element", "steal-conditional"], { save: true });
	},
	
	writing: function () {
		var pkg = this.pkg;
	 
		var configDeps = pkg.steal.configDependencies =
			pkg.steal.configDependencies || [];

		configDeps.push("node_modules/steal-conditional/conditional");

		this.fs.writeJSON('package.json', pkg, null, ' ');
	}
});
