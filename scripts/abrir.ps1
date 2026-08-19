$ErrorActionPreference = 'Stop'

$project = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location $project

$cmd = Join-Path $project 'ABRIR-KITNEGOCIO.cmd'
if (-not (Test-Path $cmd)) {
  throw "No se encontro ABRIR-KITNEGOCIO.cmd en $project"
}

cmd.exe /c "`"$cmd`""
exit $LASTEXITCODE
