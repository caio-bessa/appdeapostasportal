# Strapi Public Permissions Manual Configuration Guide

## Current Status
✅ **Logged into Strapi Admin Panel**: https://appdeapostas.com.br/admin  
✅ **In Settings Page**: Navigation sidebar visible  
❌ **API Endpoints**: All returning 404 (permissions not configured)  

## 🎯 Objective
Configure public permissions for content types: `categories`, `authors`, `teams`, `apps`, `articles`

## 📋 Step-by-Step Instructions

### Step 1: Navigate to Users & Permissions
In the Strapi admin panel (currently open in browser):

1. **Look at the left sidebar** - you should see:
   ```
   Settings
   ├── GLOBAL SETTINGS
   ├── ADMINISTRATION PANEL  
   └── USERS & PERMISSIONS PLUGIN
       ├── Roles  ← Click this
       ├── Providers
       ├── Email templates
       └── Advanced settings
   ```

2. **Click on "Roles"** under "USERS & PERMISSIONS PLUGIN"

### Step 2: Select Public Role
1. You should see a list of roles (typically: Authenticated, Public, etc.)
2. **Click on the "Public" role** to edit its permissions

### Step 3: Configure Permissions for Each Content Type
For **EACH** of the following content types, you need to enable specific permissions:

#### Content Types to Configure:
- ✅ **categories**
- ✅ **authors** 
- ✅ **teams**
- ✅ **apps**
- ✅ **articles**

#### For Each Content Type:
1. **Find the content type section** (e.g., "categories")
2. **Check the following checkboxes**:
   - ☑️ **find** - allows GET /api/categories
   - ☑️ **findOne** - allows GET /api/categories/:id

#### Visual Guide:
```
Content Type: categories
├── count         [ ] (leave unchecked)
├── create        [ ] (leave unchecked)  
├── delete        [ ] (leave unchecked)
├── find          [✓] ← CHECK THIS
├── findOne       [✓] ← CHECK THIS
├── update        [ ] (leave unchecked)
└── ...
```

### Step 4: Save Changes
1. **Look for a "Save" button** (usually at the top right or bottom of the page)
2. **Click "Save"** to apply the permission changes
3. **Wait for confirmation** (success message or page reload)

## 🧪 Testing After Configuration
After completing the manual configuration, run this command to test:

```bash
node test-api-endpoints.js
```

**Expected Results After Configuration:**
```
✅ categories: 200 OK - X items found
✅ authors: 200 OK - X items found  
✅ teams: 200 OK - X items found
✅ apps: 200 OK - X items found
✅ articles: 200 OK - X items found
```

## 🔧 Current Browser Status
- Browser is **open and logged in**
- **Manual intervention required** - automated navigation failed
- Browser will stay open until you press **Ctrl+C** in the terminal

## 📸 Screenshots Taken
- ✅ Login page: `screenshots/manual-01-login.png`
- ✅ Dashboard: `screenshots/manual-02-dashboard.png` 
- ✅ Settings page: `screenshots/manual-03-settings.png`
- ✅ Navigation attempts: `screenshots/manual-04-*.png`

## ❗ Important Notes

1. **Only enable `find` and `findOne`** - don't enable create, update, delete for security
2. **All 5 content types must be configured** for the portal to work properly
3. **Save is crucial** - changes won't take effect without saving
4. **Test immediately** after saving to verify configuration

## 🆘 Troubleshooting

### If you can't find "Users & Permissions Plugin":
- Try refreshing the page
- Look for "Settings" in the main navigation
- Check for "Plugins" in the navigation

### If content types are not visible:
- The content types exist in the database but may not be visible in permissions
- Try creating one entry manually first in Content Manager
- Check Content-Type Builder to ensure they're properly defined

### If permissions don't seem to save:
- Check browser console for errors
- Try refreshing and reconfiguring
- Ensure you have admin privileges

---

**Next Step**: After manual configuration, the script will automatically test the API endpoints and provide a final report.