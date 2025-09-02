# Strapi Data Population Guide - App de Apostas

This guide provides comprehensive sample data for populating your Strapi admin at https://appdeapostas.com.br/admin

## Content Types Required

Before importing data, ensure you have these content types in your Strapi admin:

### 1. Categories
- name (Text, required)
- slug (UID, required) 
- description (Rich Text)
- seo_title (Text)
- seo_description (Text)
- featured (Boolean, default: false)

### 2. Teams  
- name (Text, required)
- slug (UID, required)
- city (Text)
- state (Text) 
- league (Text)
- logo_url (Text)
- founded_year (Number)

### 3. Apps
- name (Text, required)
- slug (UID, required)
- description (Rich Text)
- rating (Decimal, min: 1, max: 5)
- pros (Rich Text)
- cons (Rich Text)
- bonus_info (Rich Text)
- minimum_deposit (Number)
- payment_methods (Rich Text)
- license_info (Text)
- download_url (Text)
- featured (Boolean, default: false)

### 4. Authors
- name (Text, required)
- slug (UID, required)
- bio (Rich Text)
- specialization (Text)
- avatar_url (Text)
- social_links (JSON)

### 5. Articles
- title (Text, required)
- slug (UID, required)
- content (Rich Text)
- excerpt (Text)
- seo_title (Text)
- seo_description (Text)
- featured_image_url (Text)
- published_at (DateTime)
- featured (Boolean, default: false)
- categories (Relation: Many-to-Many with Categories)
- author (Relation: Many-to-One with Authors)
- related_apps (Relation: Many-to-Many with Apps)
- related_teams (Relation: Many-to-Many with Teams)

## Data Population Methods

### Method 1: Automated Import (Recommended)
Use the bulk import script for fastest results:

1. **Install Dependencies:**
   ```bash
   cd /Users/caiobessa/news-portal
   npm install axios
   ```

2. **Configure API Token:**
   - Go to https://appdeapostas.com.br/admin
   - Settings → API Tokens → Create Token
   - Copy the token and replace in `strapi-bulk-import-script.js`

3. **Run Import:**
   ```bash
   node strapi-bulk-import-script.js
   ```

### Method 2: Manual Entry (Step by Step)
If you prefer manual control, follow the detailed sections below.

## Sample Data

### Manual Entry Instructions

For each content type, follow these steps:
1. Go to your Strapi admin: https://appdeapostas.com.br/admin
2. Navigate to Content Manager → [Content Type]
3. Click "Create New Entry"
4. Copy-paste the data from the templates below
5. Click "Save" and "Publish"
