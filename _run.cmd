@echo off
SetLocal EnableExtensions
SetLocal EnableDelayedExpansion

chcp 65001 2>nul >nul

if "%~1" == ""     goto NOFILE
if not exist %~s1  goto NOFILE
if exist %~s1\NUL  goto NOFILE

set "NODE_EXE=%~dp0node.exe"
set "NODE__JS=%~dp0_run.js"

for /f %%a in ("%NODE_EXE%") do ( set "NODE_EXE=%%~fsa" )
for /f %%a in ("%NODE__JS%") do ( set "NODE__JS=%%~fsa" )

call "%NODE_EXE%" "%NODE__JS%" "%*"
goto EXIT

:NOFILE
  echo ERROR: Please Specify At Least One Argument ^(File-Name To Convert^).
  goto EXIT

:EXIT
  pause
