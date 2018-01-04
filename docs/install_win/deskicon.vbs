'* ----------------------------------------------.
'* ----create a Desktop Icon for Application-----.
'* ----------------------------------------------.
Set wshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
Set args = WScript.Arguments
'* -----Read Parameter---------------------------.
pAppLink = args(0)
WScript.Echo "Parameter: "+pAppLink
'* -------------Check Argument 1-----------------.
If args.Count < 1 Then
WScript.Echo "ERROR 1: Filename as first parameter of deskicon.vbs is missing."
End If
If args.Count < 2 Then
WScript.Echo "ERROR 2: Application Name as second parameter of deskicon.vbs is missing."
End If
If args.Count < 3 Then
WScript.Echo "ERROR 3: Working Directory as third parameter of deskicon.vbs is missing."
WScript.Quit
End If

'* ----extent Link to absolute pathname----------.
pAppLink = fso.GetAbsolutePathName(pAppLink)
WScript.Echo "Parameter absolute: "+pAppLink


'* ----extract App Name--------------------------.
'* If idxExt < idxName Then idxExt = Len(pAppLink) + 1
'* vAppName = Mid(pAppLink, idxName + 1, idxExt - idxName - 1)
vAppName = args(1)
'* ----extract App Directory---------------------.
'* idxName = InStrRev(pAppLink, "\")
'* WScript.Echo "Index of last Backslash: " + idxName
'* vAppDir = Left(pAppLink, idxName - 1)
vAppDir = args(2)
WScript.Echo "App Directory: " +vAppDir

'* ----extract App Extension---------------------.
'* idxExt = InStrRev(pAppLink, ".")
'* lenExt = len(pAppLink) - idxExt
'* vAppExt = Right(pAppLink, lenExt)
'* WScript.Echo "App Extension: " +vAppExt

'* ----Create Desktop Shortcut-------------------.
desktop = wshShell.SpecialFolders("Desktop")
Set link = wshShell.CreateShortcut(desktop & "\" & vAppName & ".lnk")
link.TargetPath = pAppLink
link.WorkingDirectory = vAppDir
link.Save
