
# Link Global Skills Script
# Run this script in the root of any Antigravity project to link the global skills folder.

$globalSkillsPath = "c:\Users\franc\.gemini\global_skills"
$localAgentPath = Join-Path $pwd ".agent"
$localSkillsPath = Join-Path $localAgentPath "skills"

# Ensure .agent directory exists
if (-not (Test-Path $localAgentPath)) {
    New-Item -ItemType Directory -Path $localAgentPath -Force | Out-Null
    Write-Host "Created .agent directory."
}

# Check if skills already exist locally
if (Test-Path $localSkillsPath) {
    if ((Get-Item $localSkillsPath).Attributes -match "ReparsePoint") {
        # Already linked or junction
        Write-Host "Skills directory is already a link. Updating..."
        Remove-Item $localSkillsPath -Force
    } else {
        # Regular directory with potential content
        Write-Host "Found existing skills directory. Moving content to global folder..."
        Move-Item -Path "$localSkillsPath\*" -Destination $globalSkillsPath -Force
        Remove-Item $localSkillsPath -Force
    }
}

# Create Junction
New-Item -ItemType Junction -Path $localSkillsPath -Target $globalSkillsPath -Force | Out-Null
Write-Host "Successfully linked project skills to global repository at $globalSkillsPath"
