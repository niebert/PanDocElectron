param(
[string]$infile = "./projects/readme/readme.md",
[string]$outfile = "./projects/readme/readme___lvEXT___",
[string]$outFORMAT = "___outFORMAT___")

Write-Host "Call Script"
Write-Host "PANDOCmenu.sh $outFORMAT "
 
If ($outFORMAT -eq "___outFORMAT___")
{
    Write-Host "Output Format $outFORMAT "
    ___PANDOC_CALL___
}
else
{
    Write-Host "Output Format $outFORMAT is not defined"
 
}