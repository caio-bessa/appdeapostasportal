#!/usr/bin/env python3
"""
Strapi Content Types Creation Script for AppdeApostas.com.br
This script systematically creates all required content types using Playwright automation.
"""

import asyncio
import time
from playwright.async_api import async_playwright, Page, Browser
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
            {"name": "name", "type": "text", "required": True, "unique": True},
            {"name": "slug", "type": "uid", "target": "name", "required": True},
            {"name": "description", "type": "richtext"},
            {"name": "seo_title", "type": "text"},
            {"name": "seo_description", "type": "textarea"},
            {"name": "featured", "type": "boolean", "default": False}
        ]
    },
    "authors": {
        "name": "Author",
        "plural": "Authors",
        "fields": [
            {"name": "name", "type": "text", "required": True},
            {"name": "slug", "type": "uid", "target": "name", "required": True},
            {"name": "bio", "type": "richtext"},
            {"name": "specialization", "type": "text"},
            {"name": "avatar_url", "type": "text"},
            {"name": "social_links", "type": "json"}
        ]
    },
    "teams": {
        "name": "Team",
        "plural": "Teams", 
        "fields": [
            {"name": "name", "type": "text", "required": True, "unique": True},
            {"name": "slug", "type": "uid", "target": "name", "required": True},
            {"name": "city", "type": "text"},
            {"name": "state", "type": "text"},
            {"name": "league", "type": "text"},
            {"name": "logo_url", "type": "text"},
            {"name": "founded_year", "type": "integer"}
        ]
    },
    "apps": {
        "name": "App",
        "plural": "Apps",
        "fields": [
            {"name": "name", "type": "text", "required": True, "unique": True},
            {"name": "slug", "type": "uid", "target": "name", "required": True},
            {"name": "description", "type": "richtext"},
            {"name": "rating", "type": "decimal", "min": 1, "max": 5},
            {"name": "pros", "type": "richtext"},
            {"name": "cons", "type": "richtext"},
            {"name": "bonus_info", "type": "richtext"},
            {"name": "minimum_deposit", "type": "integer"},
            {"name": "payment_methods", "type": "richtext"},
            {"name": "license_info", "type": "text"},
            {"name": "download_url", "type": "text"},
            {"name": "featured", "type": "boolean", "default": False}
        ]
    },
    "articles": {
        "name": "Article",
        "plural": "Articles",
        "fields": [
            {"name": "title", "type": "text", "required": True},
            {"name": "slug", "type": "uid", "target": "title", "required": True},
            {"name": "content", "type": "richtext", "required": True},
            {"name": "excerpt", "type": "textarea"},
            {"name": "seo_title", "type": "text"},
            {"name": "seo_description", "type": "textarea"},
            {"name": "featured_image_url", "type": "text"},
            {"name": "published_at", "type": "date"},
            {"name": "featured", "type": "boolean", "default": False}
        ]
    }
}

class StrapiContentTypeCreator:
    def __init__(self):
        self.playwright = None
        self.browser = None
        self.page = None
        self.screenshots_dir = SCREENSHOTS_DIR
        os.makedirs(self.screenshots_dir, exist_ok=True)
        
    async def setup_browser(self):
        """Initialize browser and page"""
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(headless=True, slow_mo=500)
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
        
    async def navigate_to_content_type_builder(self):
        """Navigate to Content-Type Builder"""
        print("🔧 Navigating to Content-Type Builder...")
        
        # Look for Content-Type Builder in sidebar
        try:
            await self.page.click('text=Content-Type Builder', timeout=5000)
        except:
            # Try alternative selectors
            await self.page.click('[data-testid="content-type-builder"]', timeout=5000)
        
        await self.page.wait_for_load_state("networkidle")
        await self.take_screenshot("02_content_type_builder")
        print("✅ Navigated to Content-Type Builder!")
        
    async def create_content_type(self, content_type_key: str, content_type_config: dict):
        """Create a single content type with all its fields"""
        print(f"📝 Creating {content_type_config['name']} content type...")
        
        # Click Create new collection type
        try:
            await self.page.click('text=Create new collection type', timeout=5000)
        except:
            await self.page.click('[data-testid="create-collection-type-button"]', timeout=5000)
            
        await self.page.wait_for_load_state("networkidle")
        
        # Fill in the basic information
        await self.page.fill('input[name="displayName"]', content_type_config["name"])
        
        # Click Continue
        await self.page.click('button:has-text("Continue")')
        await self.page.wait_for_load_state("networkidle")
        
        # Add each field
        for field in content_type_config["fields"]:
            await self.add_field(field)
            await self.page.wait_for_timeout(1000)
        
        # Save the content type
        await self.page.click('button:has-text("Save")')
        await self.page.wait_for_load_state("networkidle")
        await self.page.wait_for_timeout(3000)  # Wait for server restart
        
        await self.take_screenshot(f"03_{content_type_key}_created")
        print(f"✅ {content_type_config['name']} content type created successfully!")
        
    async def add_field(self, field_config: dict):
        """Add a specific field to the content type"""
        field_type = field_config["type"]
        field_name = field_config["name"]
        
        print(f"  📌 Adding field: {field_name} ({field_type})")
        
        # Click the appropriate field type button
        field_type_mapping = {
            "text": "Text",
            "textarea": "Long text", 
            "richtext": "Rich text",
            "uid": "UID",
            "boolean": "Boolean",
            "integer": "Number",
            "decimal": "Number",
            "date": "Date",
            "json": "JSON"
        }
        
        display_type = field_type_mapping.get(field_type, field_type.title())
        
        try:
            await self.page.click(f'button:has-text("{display_type}")', timeout=5000)
        except:
            # Try finding by data attribute or class
            await self.page.click(f'[data-testid="field-{field_type}"]', timeout=5000)
        
        await self.page.wait_for_load_state("networkidle")
        
        # Fill field name
        await self.page.fill('input[name="name"]', field_name)
        
        # Handle specific field configurations
        if field_config.get("required"):
            try:
                await self.page.check('input[name="required"]')
            except:
                pass
                
        if field_config.get("unique"):
            try:
                await self.page.check('input[name="unique"]')
            except:
                pass
                
        if field_type == "uid" and field_config.get("target"):
            try:
                await self.page.select_option('select[name="targetField"]', field_config["target"])
            except:
                pass
                
        if field_type == "boolean" and "default" in field_config:
            try:
                if field_config["default"]:
                    await self.page.check('input[name="default"]')
                else:
                    await self.page.uncheck('input[name="default"]')
            except:
                pass
                
        if field_type in ["integer", "decimal"]:
            if field_config.get("min"):
                try:
                    await self.page.fill('input[name="min"]', str(field_config["min"]))
                except:
                    pass
            if field_config.get("max"):
                try:
                    await self.page.fill('input[name="max"]', str(field_config["max"]))
                except:
                    pass
                    
        # Click Add field or Finish
        try:
            await self.page.click('button:has-text("Add field")')
        except:
            await self.page.click('button:has-text("Finish")')
            
        await self.page.wait_for_load_state("networkidle")
        
    async def configure_permissions(self):
        """Configure public permissions for all content types"""
        print("🔑 Configuring public permissions...")
        
        # Navigate to Settings
        await self.page.click('text=Settings')
        await self.page.wait_for_load_state("networkidle")
        
        # Go to Roles & Permissions
        await self.page.click('text=Roles & Permissions')
        await self.page.wait_for_load_state("networkidle")
        
        # Click on Public role
        await self.page.click('text=Public')
        await self.page.wait_for_load_state("networkidle")
        
        # Enable find and findOne for all content types
        for content_type_key in CONTENT_TYPES.keys():
            try:
                # Enable 'find' permission
                await self.page.check(f'input[name="{content_type_key}.find"]')
                # Enable 'findOne' permission  
                await self.page.check(f'input[name="{content_type_key}.findOne"]')
            except Exception as e:
                print(f"  ⚠️  Could not set permissions for {content_type_key}: {e}")
        
        # Save permissions
        await self.page.click('button:has-text("Save")')
        await self.page.wait_for_load_state("networkidle")
        
        await self.take_screenshot("04_permissions_configured")
        print("✅ Public permissions configured!")
        
    async def verify_content_manager(self):
        """Verify all content types appear in Content Manager"""
        print("🔍 Verifying Content Manager...")
        
        # Navigate to Content Manager
        await self.page.click('text=Content Manager')
        await self.page.wait_for_load_state("networkidle")
        
        await self.take_screenshot("05_content_manager_final")
        
        # Check that all content types are visible
        for content_type_key, config in CONTENT_TYPES.items():
            try:
                await self.page.wait_for_selector(f'text={config["plural"]}', timeout=3000)
                print(f"  ✅ {config['plural']} content type visible")
            except:
                print(f"  ❌ {config['plural']} content type NOT visible")
        
        print("✅ Content Manager verification complete!")
        
    async def test_api_endpoints(self):
        """Test API endpoints to ensure they return JSON instead of 404"""
        print("🧪 Testing API endpoints...")
        
        base_api_url = "https://appdeapostas.com.br/api"
        
        for content_type_key in CONTENT_TYPES.keys():
            endpoint = f"{base_api_url}/{content_type_key}"
            try:
                response = await self.page.request.get(endpoint)
                status = response.status
                
                if status == 200:
                    print(f"  ✅ {endpoint} - Status: {status} (OK)")
                elif status == 404:
                    print(f"  ❌ {endpoint} - Status: {status} (NOT FOUND)")
                else:
                    print(f"  ⚠️  {endpoint} - Status: {status}")
                    
            except Exception as e:
                print(f"  ❌ {endpoint} - Error: {e}")
        
        print("✅ API endpoint testing complete!")
        
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
            await self.navigate_to_content_type_builder()
            
            # Create each content type
            for content_type_key, config in CONTENT_TYPES.items():
                await self.create_content_type(content_type_key, config)
                
            await self.configure_permissions()
            await self.verify_content_manager()
            await self.test_api_endpoints()
            
            print("🎉 All content types created successfully!")
            print(f"📁 Screenshots saved in: {self.screenshots_dir}")
            
        except Exception as e:
            print(f"❌ Error during execution: {e}")
            if self.page:
                try:
                    await self.take_screenshot("error_state")
                except:
                    pass
            raise
        finally:
            await self.cleanup()

async def main():
    """Entry point"""
    print("🚀 Starting Strapi Content Types Creation...")
    print("=" * 60)
    
    creator = StrapiContentTypeCreator()
    await creator.run()
    
    print("=" * 60)
    print("✅ Process completed!")

if __name__ == "__main__":
    asyncio.run(main())