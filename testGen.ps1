## Find all BackupState.txt files in C:\ARCHIVE_VOLUMES
$files = Get-ChildItem C:\Users\Tianyu\Test\1\*.jpg

Set-Location -Path C:\Users\Tianyu\Test\2

## Read the contents of each file
foreach ($file in $files) {
    magick.exe $($file.FullName) -dither FloydSteinberg -colors 6 .\$($file.Name)
}