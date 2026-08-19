$ErrorActionPreference = 'SilentlyContinue'

# Usa la carpeta donde está este script, no una ruta fija.
$project = $PSScriptRoot
if (-not $project) {
  $project = Split-Path -Parent $MyInvocation.MyCommand.Path
}
Set-Location $project

$url = 'http://localhost:3000/es'
$node = Get-Command node -ErrorAction SilentlyContinue
$npm = Get-Command npm -ErrorAction SilentlyContinue

function Test-KitNegocio {
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3
    return $response.StatusCode -eq 200 -and $response.Content -match 'KitNegocio'
  } catch {
    return $false
  }
}

if (-not $node -or -not $npm) {
  Add-Type -AssemblyName PresentationFramework
  [System.Windows.MessageBox]::Show(
    "No se encontró Node.js.`n`nInstálalo desde https://nodejs.org (versión 18 o superior) y vuelve a hacer doble clic en ABRIR-KITNEGOCIO.cmd.",
    'KitNegocio',
    'OK',
    'Error'
  )
  exit 1
}

if (-not (Test-Path (Join-Path $project 'node_modules'))) {
  Write-Host 'Instalando dependencias (solo la primera vez)...'
  npm install
  if ($LASTEXITCODE -ne 0) {
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show(
      'No se pudieron instalar las dependencias. Revisa la ventana de PowerShell para ver el error.',
      'KitNegocio',
      'OK',
      'Error'
    )
    exit 1
  }
}

$envExample = Join-Path $project '.env.example'
$envLocal = Join-Path $project '.env.local'
if ((Test-Path $envExample) -and -not (Test-Path $envLocal)) {
  Copy-Item $envExample $envLocal
}

if (Test-KitNegocio) {
  Start-Process $url
  exit 0
}

$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  Stop-Process -Id $listener.OwningProcess -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 2
}

$buildId = Join-Path $project '.next\BUILD_ID'
$serverCommand = if (Test-Path $buildId) {
  'npm run start -- -p 3000'
} else {
  'npm run dev -- -p 3000'
}

Start-Process cmd.exe -ArgumentList '/k', "cd /d `"$project`" && title KitNegocio Server && $serverCommand"

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
