cls
call clean.bat
@echo on
start "tsc" /wait cmd /c call tsc 
browserify generated\main.js -o build\ptm.js
