# Manual Fix Steps - AppdeApostas Portal

## URGENT: Follow these steps in order to fix the portal immediately

### Step 1: Access Strapi Admin Panel (5 minutes)
1. Go to: https://appdeapostas.com.br/admin
2. Login with your admin credentials
3. Verify you can access the dashboard

### Step 2: Enable Content Type API Access (10 minutes)
1. In Strapi admin, go to **Settings** (left sidebar)
2. Click **Users & Permissions Plugin**
3. Click **Roles** 
4. Click **Public** role
5. In the permissions section, find each content type and enable:

**For Categories:**
- ✅ category → find
- ✅ category → findOne

**For Articles:**
- ✅ article → find  
- ✅ article → findOne

**For Authors:**
- ✅ author → find
- ✅ author → findOne  

**For Teams:**
- ✅ team → find
- ✅ team → findOne

**For Apps:**
- ✅ app → find
- ✅ app → findOne

6. Click **Save** after enabling all permissions

### Step 3: Verify Content Types Exist (5 minutes)
1. Go to **Content Manager** (left sidebar)
2. Check if you see these collection types:
   - Category
   - Article  
   - Author
   - Team
   - App

If any are missing, go to **Content-Type Builder** and create them.

### Step 4: Add Sample Data (10 minutes)
1. In **Content Manager**, click on **Category**
2. Click **Create new entry**
3. Add these sample categories:

**Category 1:**
- Name: Futebol
- Slug: futebol
- Description: Notícias sobre futebol

**Category 2:**
- Name: Basquete
- Slug: basquete  
- Description: Notícias sobre basquete

4. Click **Publish** for each entry
5. Repeat for other content types using the sample data files created

### Step 5: Test API Endpoints (2 minutes)
Run this command to test if APIs work:
```bash
cd /Users/caiobessa/news-portal
node fix-strapi-content-types.js
```

You should see ✅ instead of ❌ for all content types.

### Step 6: Test Frontend Pages (3 minutes)
1. Visit: https://appdeapostas.com.br/
2. Visit: https://appdeapostas.com.br/noticias
3. Check if category page loads instead of showing 404

## If Content Types Don't Exist

### Create Content Types in Strapi
1. Go to **Content-Type Builder**
2. Click **Create new collection type**

**For Category:**
- Collection Type Name: category
- Add fields:
  - name (Text, required)
  - slug (UID, target field: name)
  - description (Rich Text)

**For Article:**  
- Collection Type Name: article
- Add fields:
  - title (Text, required)
  - slug (UID, target field: title)
  - content (Rich Text)
  - featuredImage (Media, single)
  - category (Relation: article belongs to category)
  - author (Relation: article belongs to author)

**For Author:**
- Collection Type Name: author  
- Add fields:
  - name (Text, required)
  - email (Email)
  - bio (Rich Text)
  - avatar (Media, single)

**For Team:**
- Collection Type Name: team
- Add fields:
  - name (Text, required)
  - shortName (Text)
  - logo (Media, single)
  - description (Rich Text)

**For App:**
- Collection Type Name: app
- Add fields:
  - name (Text, required)
  - description (Rich Text)
  - rating (Number, decimal)
  - downloadUrl (Text)
  - logo (Media, single)
  - screenshots (Media, multiple)

3. Click **Save** after creating each content type
4. Go back to Step 2 to enable permissions

## Verification Commands

After completing all steps, run these commands to verify everything works:

```bash
# Test API endpoints
node fix-strapi-content-types.js

# Test specific endpoints manually
curl -H "Authorization: Bearer 5da051f16391ca01d8f0d9072a972299bf0d66677cef07bb2f67efb1134137f791ad6bc07b9474534b1551f6bf265e6bbc64cc638210e49f379204d92da05fd216dad0e67b74f4f6748446428431b33a35b83ae47869eb06056be88b309a9f93cac977cbaef8d0bc05067be44d1641ab452e3a499be89fd2d8c605d493567a4f" https://appdeapostas.com.br/api/categories

# Run Playwright tests
npx playwright test --project=chromium
```

## Expected Results After Fix

✅ All API endpoints return JSON data instead of 404
✅ Category pages load properly  
✅ Admin panel allows content management
✅ Frontend displays data from CMS
✅ No more 404 errors on main navigation links

## Troubleshooting

**If APIs still return 404:**
- Double-check permissions are enabled and saved
- Verify content types are published (not draft)
- Check that entries exist and are published

**If frontend still shows errors:**
- Clear browser cache
- Check browser console for JavaScript errors
- Verify API calls in Network tab

**If admin panel is inaccessible:**
- Check if containers are running: `docker ps`
- Check container logs: `docker logs appdeapostas-strapi`

## Time Estimate
- **Total fix time: 30-35 minutes**
- **Critical path: Steps 2-4 (API permissions and sample data)**
- **Verification: 5 minutes**

This should resolve all the major issues and get the portal fully functional!