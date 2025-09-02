# Strapi Content Types Implementation Guide
## AppdeApostas.com.br Portal

### 🚨 CURRENT STATUS
- **Server Mode**: Production (Content type editing disabled)
- **API Status**: All endpoints return 404 (content types don't exist)
- **Action Required**: Switch to development mode to create content types

### 🔧 SETUP REQUIRED

#### Step 1: Switch to Development Mode
1. SSH into your server
2. Navigate to your Strapi project directory
3. Stop the current Strapi process
4. Start in development mode:
   ```bash
   npm run develop
   # or
   yarn develop
   ```
5. Verify admin panel is accessible at https://appdeapostas.com.br/admin

#### Step 2: Run Automated Creation Script
Once in development mode, run:
```bash
python3 strapi_development_mode_creator.py
```

### 📋 CONTENT TYPES TO CREATE

#### 1. CATEGORIES (Collection Type)
**API Endpoint**: `/api/categories`
```
Fields:
• name (Text) - Required, Unique
• slug (UID) - Required, Target: name  
• description (Rich text)
• seo_title (Text)
• seo_description (Long text)
• featured (Boolean) - Default: false
```

#### 2. AUTHORS (Collection Type)  
**API Endpoint**: `/api/authors`
```
Fields:
• name (Text) - Required
• slug (UID) - Required, Target: name
• bio (Rich text)
• specialization (Text)
• avatar_url (Text)
• social_links (JSON)
```

#### 3. TEAMS (Collection Type)
**API Endpoint**: `/api/teams`
```
Fields:
• name (Text) - Required, Unique
• slug (UID) - Required, Target: name
• city (Text)
• state (Text)
• league (Text)
• logo_url (Text)
• founded_year (Number - Integer)
```

#### 4. APPS (Collection Type)
**API Endpoint**: `/api/apps`
```
Fields:
• name (Text) - Required, Unique
• slug (UID) - Required, Target: name
• description (Rich text)
• rating (Number - Decimal, Min: 1, Max: 5)
• pros (Rich text)
• cons (Rich text)
• bonus_info (Rich text)
• minimum_deposit (Number - Integer)
• payment_methods (Rich text)
• license_info (Text)
• download_url (Text)
• featured (Boolean) - Default: false
```

#### 5. ARTICLES (Collection Type)
**API Endpoint**: `/api/articles`
```
Fields:
• title (Text) - Required
• slug (UID) - Required, Target: title
• content (Rich text) - Required
• excerpt (Long text)
• seo_title (Text)
• seo_description (Long text)
• featured_image_url (Text)
• published_at (Date)
• featured (Boolean) - Default: false
```

### 🔑 PERMISSIONS CONFIGURATION

After creating all content types:

1. **Navigate to**: Settings → Roles & Permissions → Public
2. **Enable permissions** for each content type:
   - ✅ `find` (list all items)
   - ✅ `findOne` (get single item)
3. **Click Save**

### 🧪 VERIFICATION CHECKLIST

#### Content Manager Verification
- [ ] Categories appears in Content Manager
- [ ] Authors appears in Content Manager  
- [ ] Teams appears in Content Manager
- [ ] Apps appears in Content Manager
- [ ] Articles appears in Content Manager

#### API Endpoints Verification
Test these URLs (should return JSON, not 404):
- [ ] https://appdeapostas.com.br/api/categories
- [ ] https://appdeapostas.com.br/api/authors
- [ ] https://appdeapostas.com.br/api/teams
- [ ] https://appdeapostas.com.br/api/apps
- [ ] https://appdeapostas.com.br/api/articles

### 📁 AVAILABLE SCRIPTS

#### 1. `strapi_content_types_guide.py`
- **Purpose**: Analysis and detailed guide generation
- **Use**: Run this first to understand current state
- **Output**: Comprehensive guide and screenshots

#### 2. `strapi_development_mode_creator.py` 
- **Purpose**: Automated content type creation
- **Requirements**: Strapi must be in development mode
- **Features**: 
  - Automatically creates all 5 content types
  - Configures all fields with proper settings
  - Sets up public permissions
  - Takes screenshots for verification
  - Tests API endpoints

### 🚀 EXECUTION FLOW

1. **Run Analysis**:
   ```bash
   python3 strapi_content_types_guide.py
   ```

2. **Switch Server to Development Mode** (manually via SSH)

3. **Run Automated Creation**:
   ```bash
   python3 strapi_development_mode_creator.py
   ```

4. **Verify Results** using the checklist above

5. **Switch Back to Production Mode** when complete

### 📸 DOCUMENTATION

All scripts generate timestamped screenshots in:
- `strapi_screenshots/` (from analysis script)
- `strapi_dev_screenshots/` (from creation script)

### ⚠️ IMPORTANT NOTES

- **Development Mode**: Only use temporarily for content type creation
- **Server Restart**: Each content type creation triggers a server restart (normal)
- **Permissions**: Must be configured for public API access
- **Production Mode**: Switch back after content types are created
- **Backup**: Consider backing up before making changes

### 🎯 SUCCESS CRITERIA

✅ **All content types visible in Content Manager**  
✅ **All API endpoints return JSON (even if empty arrays)**  
✅ **Public permissions properly configured**  
✅ **Server can be switched back to production mode**

---

**Contact**: caio.bessa@acroud.media  
**Project**: AppdeApostas.com.br Portal  
**Date**: September 2, 2025