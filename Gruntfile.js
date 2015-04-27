"use strict";

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			dev: {
				options: {
					script: 'server/app.js'
				}
			}
		},
		watch: {
			livereload: {
				files: ['client/**/*.html', 'client/**/*.css', 'client/**/*.js']
			},
			options: {
				livereload: true
			},
			express: {
				files: [
					'server/**/*.{js,json}'
				],
				tasks: ['express:dev'],
				options: {
					livereload: true,
					nospawn: true //Without this option specified express won't be reloaded
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['express:dev', 'watch']);
};

