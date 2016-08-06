/* 
	@name: htaccess-generator
	@author: Dario Fadda
	@author-site: http://dariofadda.mercusa.it
	@description: htaccess-generator is a NodeJS project. htaccess-generator is a command-line software to generating file .htaccess for your web-server simply passing parameters and arguments. 
	@Notes: 444 is my internal error code.
*/


var stdio = require('stdio');
var ops = stdio.getopt({
	'www': {key: 'w', args: 1, minArgs: 1, description: 'Redirects example.com to www.example.com'},
	'oldfile': {key: 'o', args: 2, description: 'Redirects 301 old-file.html to new-file.html'},
	'olddir': {key: 'O', args: 2, description: '301 Redirect Entire Directory old-dir/ to new-dir/'},
	'cache': {key: 'c', args: '*', description: 'Cache System with separate arguments for extensions'},
	'cachepublic': {key: 'p', description: 'Option PUBLIC in cache system'},
	'cacheprivate': {key: 'P', description: 'Option PRIVATE in cache system'},
	'blockhtaccess': {key: 'b', description: 'Prevent viewing of .htaccess file'},
	'blockdirindex': {key: 'B', description: 'Prevent directory listings'},
	'defaultindex': {key: 'd', args: 1, description: 'Change default directory page'}
});

var Generator = {
	WWW: function(arg1) {
		if (arg1 != true) {
			var code = '\n// Rewrite to www\n'+
			'Options +FollowSymLinks\n'+
			'RewriteEngine on\n'+
			'RewriteCond %{HTTP_HOST} ^'+ arg1 +'[nc]\n'+
			'RewriteRule ^(.*)$ http://www.'+ arg1 +'/$1 [r=301,nc]\n';
			return code;
		} else {
			return 444;
		}
	},
	OldFile: function(arg1, arg2) {
		// there are no control for arg1 and arg2 because stdio.getopt controls it yet if args > 1.
		var code = '\n// 301 Redirect Old File\n'+
		'Redirect 301 '+ arg1 +' '+ arg2 + '\n';
		return code;
	},
	OldDir: function(arg1, arg2) {
		var code = '\n// 301 Redirect Entire Directory\n'+
		'RedirectMatch 301 '+ arg1 +'(.*) ' + arg2 +'/$1\n';
		return code;
	},
	Cache: function(argN){
		if (argN != true) {
			if (Array.isArray(argN)){
				var arg;
				var ext='';
				for (arg in argN) {
					 ext += argN[arg]+'|';
				};
			} else {
				ext = argN;
			}
			if (ops.cachepublic){
				var stat = 'public,';
			} else if (ops.cacheprivate){
				var stat = 'private,';
			} else {
				var stat = '';
			}
			var code = '\n// Caching schema\n'+
			'<FilesMatch "\\.(' + ext + ')$">\n'+
			'Header set Cache-Control "'+ stat +'max-age=0"\n'+
			'</FilesMatch>\n';
			return code;
		} else {
			return 444;
		}
	},
	BlockHtaccess: function(){
		var code = '\n// Prevent viewing of .htaccess file\n'+
		'<Files .htaccess>\n'+
		'order allow,deny\n'+
		'deny from all\n'+
		'</Files>\n';
		return code;
	},
	BlockDirIndex: function(){
		var code = '\n// Prevent directory listings\n'+
		'Options All -Indexes\n';
		return code;
	},
	DefaultIndex: function(arg1){
		if (arg1 != true){
			var code = '\n// Change default directory page\n'+
			'DirectoryIndex '+ arg1 +'\n';
			return code;
		} else {
			return 444;
		}
	},
	NoInput: function(argvs) {
		var index;
		for (index in argvs) {
		}
		return index;
	}
}

var myHtaccess = Object.create(Generator);
if (myHtaccess.NoInput(process.argv) != 1) {
	if ((myHtaccess.WWW(ops.www)!= 444) && (myHtaccess.Cache(ops.cache)!= 444) && (myHtaccess.DefaultIndex(ops.defaultindex) != 444)) {
		if (ops.www) {
			console.log(myHtaccess.WWW(ops.www));
		}
		if (ops.oldfile) {
			console.log(myHtaccess.OldFile(ops.oldfile[0], ops.oldfile[1]));
		}
		if (ops.olddir) {
			console.log(myHtaccess.OldDir(ops.olddir[0], ops.olddir[1]));
		}
		if (ops.cache) {
			console.log(myHtaccess.Cache(ops.cache));
		}
		if (ops.blockhtaccess) {
			console.log(myHtaccess.BlockHtaccess(ops.blockhtaccess));
		}
		if (ops.blockdirindex) {
			console.log(myHtaccess.BlockDirIndex(ops.blockdirindex));
		}
		if (ops.defaultindex) {
			console.log(myHtaccess.DefaultIndex(ops.defaultindex));
		}
	} else {
		ops.printHelp();
	}
} else {
	ops.printHelp();
}