$ErrorActionPreference = 'Stop'

$project = $PSScriptRoot
Set-Location $project
$url = 'http://localhost:3000/es'

function Test-KitNegocio {
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

if (Test-KitNegocio) {
  Start-Process $url
  exit 0
}

$ErrorActionPreference = 'SilentlyContinue'
$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen
if ($listener) {
  Stop-Process -Id $listener.OwningProcess -Force
  Start-Sleep -Seconds 2
}
$ErrorActionPreference = 'Stop'

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Add-Type -AssemblyName PresentationFramework
  [System.Windows.MessageBox]::Show(
    'Instala Node.js 18 o superior desde https://nodejs.org y vuelve a abrir KitNegocio.',
    'KitNegocio',
    'OK',
    'Error'
  )
  exit 1
}

if (-not (Test-Path (Join-Path $project 'node_modules\next'))) {
  Write-Host 'Instalando dependencias…'
  npm install
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

$nextCache = Join-Path $project '.next'
$buildId = Join-Path $nextCache 'BUILD_ID'
if ((Test-Path $nextCache) -and -not (Test-Path $buildId)) {
  Remove-Item -Recurse -Force $nextCache
}

Start-Process cmd.exe -ArgumentList '/k', "cd /d `"$project`" && title KitNegocio Server && npm run dev -- -p 3000"

$deadline = (Get-Date).AddMinutes(4)
do {
  Start-Sleep -Seconds 2
  if (Test-KitNegocio) {
    Start-Process $url
    exit 0
  }
} while ((Get-Date) -lt $deadline)

Add-Type -AssemblyName PresentationFramework
[System.Windows.MessageBox]::Show(
  'El servidor no respondió. Revisa la ventana "KitNegocio Server" para ver el error.',
  'KitNegocio',
  'OK',
  'Error'
)
exit 1
