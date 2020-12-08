# https://github.com/DanielLarsenNZ/Set-ContentVariables

<#
.SYNOPSIS
    Replace placeholders in a file with values from input environment variables and/or input variables.
.EXAMPLE
    PS C:\> Set-ContentVariables -Path './test.json' -Variables @{ myVar = 'replacement value'}
    Replaces any occurrance in `test.json` of `$(myVar)` with 'replacement value'. Also replaces any
    occurrance of a placeholder named for an environment variable with the value of that variable,
    e.g. `$(COMPUTERNAME)`.

.PARAMETER Path
    Path to the file that will have its values replaces
    
.PARAMETER Variables
    Optional. A PSObject of variables to find and replace. e.g. @{ firstVar = 'first value'; secondVar = 'second value' }
.NOTES
    Variables that cannot be found are ignored.
    Variables parameter variable overrides an environment variable of the same name.
#>
function Set-ContentVariables {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]  [string]    $Path,
        [Parameter(Mandatory = $false)] [psobject]  $Variables = @{}
    )
    
    begin {

    }
    
    process {
        $content = Get-Content $Path
        $vars = $content | Select-String -Pattern '\$(\(|\{)[a-zA-Z_]*(\)|})'

        foreach ($var in $vars)
        { 
            foreach ($match in $var.Matches)
            {
                $varname = $match.Value -replace '\$\(', '' -replace '\$\{', '' -replace '\}', '' -replace '\)', ''
                
                if ($null -ne $Variables[$varname])
                {
                    $content = $content.Replace($match.Value, $Variables[$varname])
                    Write-Verbose "Replaced $($match.Value) with variable value '$Variables[$varname]'"
                }
                else 
                {
                    if (Test-Path env:$varname)
                    {
                        $content = $content.Replace($match.Value, (Get-Item env:$varname).Value)
                        Write-Verbose "Replaced $($match.Value) with env var value '$((Get-Item env:$varname).Value)'"
                    }
                }
            }
        }

        Set-Content $Path $content
    }
    
    end {
        
    }
}

#Set-ContentVariables -Path './_test.json' -Variables @{myvar = 'XXXXXX'} -Verbose