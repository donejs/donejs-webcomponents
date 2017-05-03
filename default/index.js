var Generator = require('yeoman-generator');
var _ = require('lodash');

module.exports = Generator.extend({
	initializing: function () {
		this.pkgPath = this.destinationPath('package.json');
	},

	installing: function() {
		this.npmInstall(["done-element", "steal-conditional"], { save: true });
	},
	
	writing: function () {
		// force writing to package.json so the user isn’t prompted
		this.conflicter.force = true;

		var pkg = require(this.pkgPath);
	 
		var configDeps = pkg.steal.configDependencies || [];
		configDeps.push("node_modules/steal-conditional/conditional");

		var newPkgConfig = {
			steal: {
				configDependencies: configDeps
			}
		};

		this.fs.extendJSON(this.pkgPath, newPkgConfig);
	}
});
