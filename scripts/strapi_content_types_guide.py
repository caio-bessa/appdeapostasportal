#!/usr/bin/env python3
"""
Strapi Content Types Creation Guide for AppdeApostas.com.br

This script provides a comprehensive guide and semi-automated approach for creating
content types when the server is in production mode.
"""

import asyncio
import time
from playwright.async_api import async_playwright
from datetime import datetime
import os

# Configuration
STRAPI_URL = "https://appdeapostas.com.br/admin"
EMAIL = "caio.bessa@acroud.media" 
PASSWORD = "gIhmyj-dymtyp-gitqe0"
SCREENSHOTS_DIR = "strapi_screenshots"

# Content types configuration
CONTENT_TYPES = {
    "categories": {
        "name": "Category",
        "plural": "Categories",
        "fields": [
            {"name": "name", "type": "Text", "required": True, "unique": True},
            {"name": "slug", "type": "UID", "target": "name", "required": True},
            {"name": "description", "type": "Rich text"},
            {"name": "seo_title", "type": "Text"},
            {"name": "seo_description", "type": "Long text"},
            {"name": "featured", "type": "Boolean", "default": False}
        ]
    },
    "authors": {
        "name": "Author", 
        "plural": "Authors",
        "fields": [
            {"name": "name", "type": "Text", "required": True},
            {"name": "slug", "type": "UID", "target": "name", "required": True},
            {"name": "bio", "type": "Rich text"},
            {"name": "specialization", "type": "Text"},
            {"name": "avatar_url", "type": "Text"},
            {"name": "social_links", "type": "JSON"}
        ]
    },
    "teams": {
        "name": "Team",
        "plural": "Teams",
        "fields": [
            {"name": "name", "type": "Text", "required": True, "unique": True},
            {"name": "slug", "type": "UID", "target": "name", "required": True},
            {"name": "city", "type": "Text"},
            {"name": "state", "type": "Text"}, 
            {"name": "league", "type": "Text"},
            {"name": "logo_url", "type": "Text"},
            {"name": "founded_year", "type": "Number", "number_format": "integer"}
        ]
    },
    "apps": {
        "name": "App",
        "plural": "Apps", 
        "fields": [
            {"name": "name", "type": "Text", "required": True, "unique": True},
            {"name": "slug", "type": "UID", "target": "name", "required": True},
            {"name": "description", "type": "Rich text"},
            {"name": "rating", "type": "Number", "number_format": "decimal", "min": 1, "max": 5},
            {"name": "pros", "type": "Rich text"},
            {"name": "cons", "type": "Rich text"},
            {"name": "bonus_info", "type": "Rich text"},
            {"name": "minimum_deposit", "type": "Number", "number_format": "integer"},
            {"name": "payment_methods", "type": "Rich text"},
            {"name": "license_info", "type": "Text"},
            {"name": "download_url", "type": "Text"},
            {"name": "featured", "type": "Boolean", "default": False}
        ]
    },
    "articles": {
        "name": "Article",
        "plural": "Articles",
        "fields": [
            {"name": "title", "type": "Text", "required": True},
            {"name": "slug", "type": "UID", "target": "title", "required": True},
            {"name": "content", "type": "Rich text", "required": True},
            {"name": "excerpt", "type": "Long text"},
            {"name": "seo_title", "type": "Text"},
            {"name": "seo_description", "type": "Long text"},
            {"name": "featured_image_url", "type": "Text"},
            {"name": "published_at", "type": "Date"},
            {"name": "featured", "type": "Boolean", "default": False}
        ]
    }
}

class StrapiGuide:
    def __init__(self):
        self.playwright = None
        self.browser = None 
        self.page = None
        self.screenshots_dir = SCREENSHOTS_DIR
        os.makedirs(self.screenshots_dir, exist_ok=True)
        
    async def setup_browser(self):
        """Initialize browser and page"""
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(headless=False, slow_mo=1000)
        self.page = await self.browser.new_page()
        await self.page.set_viewport_size({"width": 1440, "height": 900})
        
    async def login(self):
        """Login to Strapi admin panel"""
        print("🔐 Logging into Strapi admin...")
        await self.page.goto(STRAPI_URL)
        await self.page.wait_for_load_state("networkidle")
        
        # Fill login form
        await self.page.fill('input[name="email"]', EMAIL)
        await self.page.fill('input[name="password"]', PASSWORD)
        await self.page.click('button[type="submit"]')
        
        # Wait for dashboard to load
        await self.page.wait_for_load_state("networkidle")
        await self.take_screenshot("01_login_success")
        print("✅ Successfully logged in!")
        
    async def check_strapi_mode(self):
        """Check if Strapi is in development or production mode"""
        print("🔍 Checking Strapi server mode...")
        
        # Navigate to Content-Type Builder
        await self.page.click('text=Content-Type Builder')
        await self.page.wait_for_load_state("networkidle")
        await self.take_screenshot("02_content_type_builder_check")
        
        # Check for production mode warning
        try:
            production_warning = await self.page.wait_for_selector('text=Strapi is in production mode', timeout=3000)
            if production_warning:
                print("⚠️  STRAPI IS IN PRODUCTION MODE")
                print("❌ Content type editing is disabled in production mode")
                return "production"
        except:
            pass
            
        # Check if we can create content types (development mode)
        try:
            await self.page.wait_for_selector('text=Create new collection type', timeout=3000)
            print("✅ STRAPI IS IN DEVELOPMENT MODE")
            print("✅ Content type editing is enabled")
            return "development"
        except:
            print("❓ Unable to determine Strapi mode")
            return "unknown"
    
    async def test_api_endpoints(self):
        """Test current API endpoints"""
        print("🧪 Testing current API endpoints...")
        
        base_api_url = "https://appdeapostas.com.br/api"
        
        for content_type_key in CONTENT_TYPES.keys():
            endpoint = f"{base_api_url}/{content_type_key}"
            try:
                response = await self.page.request.get(endpoint)
                status = response.status
                
                if status == 200:
                    print(f"  ✅ {endpoint} - Status: {status} (OK)")
                elif status == 404:
                    print(f"  ❌ {endpoint} - Status: {status} (NOT FOUND - Content type doesn't exist)")
                elif status == 403:
                    print(f"  🔒 {endpoint} - Status: {status} (FORBIDDEN - Permissions issue)")
                else:
                    print(f"  ⚠️  {endpoint} - Status: {status}")
                    
            except Exception as e:
                print(f"  ❌ {endpoint} - Error: {e}")
    
    def print_detailed_guide(self, mode):
        """Print detailed instructions based on server mode"""
        print("\n" + "="*80)
        print("📋 STRAPI CONTENT TYPES CREATION GUIDE")
        print("="*80)
        
        if mode == "production":
            print("🚨 PRODUCTION MODE DETECTED")
            print("\nTo create content types, you need to switch to development mode:")
            print("1. SSH into your server")
            print("2. Navigate to your Strapi project directory")
            print("3. Stop the current Strapi process")
            print("4. Start Strapi in development mode with: npm run develop")
            print("5. Access the admin panel again at https://appdeapostas.com.br/admin")
            print("\n⚠️  WARNING: Development mode should only be used temporarily!")
            print("⚠️  Remember to switch back to production mode after creating content types!")
            
        print(f"\n📝 CONTENT TYPES TO CREATE ({len(CONTENT_TYPES)} total):")
        print("="*60)
        
        for i, (key, config) in enumerate(CONTENT_TYPES.items(), 1):
            print(f"\n{i}. {config['name'].upper()} (Collection Type)")
            print(f"   API ID: {key}")
            print("   Fields:")
            for field in config['fields']:
                field_desc = f"   • {field['name']} ({field['type']})"
                if field.get('required'):
                    field_desc += " - Required"
                if field.get('unique'):
                    field_desc += " - Unique"
                if field.get('target'):
                    field_desc += f" - Target: {field['target']}"
                if 'default' in field:
                    field_desc += f" - Default: {field['default']}"
                if field.get('min') or field.get('max'):
                    field_desc += f" - Range: {field.get('min', 'N/A')} to {field.get('max', 'N/A')}"
                print(field_desc)
                
        print("\n🔑 PERMISSIONS CONFIGURATION:")
        print("="*40)
        print("After creating all content types:")
        print("1. Go to Settings → Roles & Permissions → Public")
        print("2. Enable 'find' and 'findOne' permissions for ALL content types:")
        for key in CONTENT_TYPES.keys():
            print(f"   • {key}: ✅ find, ✅ findOne")
        print("3. Click Save")
        
        print("\n🧪 API ENDPOINTS VERIFICATION:")
        print("="*40)
        print("After setup, these endpoints should return JSON (not 404):")
        for key in CONTENT_TYPES.keys():
            print(f"   • https://appdeapostas.com.br/api/{key}")
            
    async def take_screenshot(self, name: str):
        """Take a screenshot with timestamp"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{name}.png"
        filepath = os.path.join(self.screenshots_dir, filename)
        await self.page.screenshot(path=filepath, full_page=True)
        print(f"📸 Screenshot saved: {filename}")
        
    async def cleanup(self):
        """Clean up browser resources"""
        try:
            if self.browser:
                await self.browser.close()
            if self.playwright:
                await self.playwright.stop()
        except:
            pass
            
    async def run(self):
        """Main execution flow"""
        try:
            await self.setup_browser()
            await self.login()
            
            # Check server mode
            mode = await self.check_strapi_mode()
            
            # Test current API endpoints
            await self.test_api_endpoints()
            
            # Print detailed guide
            self.print_detailed_guide(mode)
            
            if mode == "development":
                print("\n✅ Ready to create content types!")
                print("You can now manually create the content types using the guide above.")
            else:
                print("\n⚠️  Server needs to be in development mode to proceed.")
                
            print(f"\n📁 Screenshots saved in: {self.screenshots_dir}")
            
        except Exception as e:
            print(f"❌ Error during execution: {e}")
            if self.page:
                try:
                    await self.take_screenshot("error_state")
                except:
                    pass
        finally:
            await self.cleanup()

async def main():
    """Entry point"""
    print("🚀 Starting Strapi Content Types Analysis...")
    print("="*60)
    
    guide = StrapiGuide()
    await guide.run()
    
    print("="*60)
    print("✅ Analysis completed!")

if __name__ == "__main__":
    asyncio.run(main())