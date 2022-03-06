
$serviceFolder = Join-Path -Path (Get-Location) -Child \Service

Remove-Item $serviceFolder -Recurse
dotnet build -o $serviceFolder

docker build -t doc_server .