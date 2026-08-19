$ErrorActionPreference = 'SilentlyContinue'

$project = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$url = 'http://localhost:3000/es'

Set-Location $project

function Test-KitNegocio {
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3
    return $response.StatusCode -eq 200 -and $response.Content -match 'KitNegocio'
  } catch {
    return $false
  }
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
