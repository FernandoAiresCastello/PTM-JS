@echo off
if exist generated\*.js (
    del generated\*.js
)
if exist build\*.js (
    del build\*.js
)
