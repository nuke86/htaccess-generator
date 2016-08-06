# htaccess-generator
htaccess-generator is a command-line software to generating file .htaccess for your web-server simply passing parameters and arguments.

### USAGE ###


```
#!bash

htgen [OPTION1] [OPTION2]... arg1 arg2...
The following options are supported:
-w, --www [ARG1] Redirects example.com to www.example.com
-o, --oldfile [ARG1] [ARG2] Redirects 301 old-file.html to new-file.html
-O, --olddir [ARG1] [ARG2] 301 Redirect Entire Directory old-dir/ to new-dir/
-c, --cache [ARG1]...[ARGN] Cache System with separate arguments for extensions
-p, --cachepublic        Option PUBLIC in cache system
-P, --cacheprivate       Option PRIVATE in cache system
-b, --blockhtaccess      Prevent viewing of .htaccess file
-B, --blockdirindex      Prevent directory listings
-d, --defaultindex [ARG1] Change default directory page
```


### USE CASE ###

I personally use this tool to generate file .htaccess directly.

```
#!bash

 ./htgen -w example.com > .htaccess

```
... And put this file in home directory of example.com website. Ready-To-Use!

### Contributor ###

* Author: Dario Fadda
* Mail: nuke@spcnet.it
* Site: http://dariofadda.it
