#!/usr/bin/env python3
"""
Strapi Content Types Creator for Development Mode
This script will work when Strapi is running in development mode.
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
SCREENSHOTS_DIR = "strapi_dev_screenshots"

# Content types configuration with exact Strapi field mappings
CONTENT_TYPES = {
    "categories": {
        "display_name": "Category",
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
        "display_name": "Author",
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
        "display_name": "Team",
        "fields": [
            {"name": "name", "type": "text", "required": True, "unique": True},
            {"name": "slug", "type": "uid", "target": "name", "required": True},
            {"name": "city", "type": "text"},
            {"name": "state", "type": "text"},
            {"name": "league", "type": "text"},
            {"name": "logo_url", "type": "text"},
            {"name": "founded_year", "type": "number", "number_format": "integer"}
        ]
    },
    "apps": {
        "display_name": "App",
        "fields": [
            {"name": "name", "type": "text", "required": True, "unique": True},
            {"name": "slug", "type": "uid", "target": "name", "required": True},
            {"name": "description", "type": "richtext"},
            {"name": "rating", "type": "number", "number_format": "decimal", "min": 1, "max": 5},
            {"name": "pros", "type": "richtext"},
            {"name": "cons", "type": "richtext"},
            {"name": "bonus_info", "type": "richtext"},
            {"name": "minimum_deposit", "type": "number", "number_format": "integer"},
            {"name": "payment_methods", "type": "richtext"},
            {"name": "license_info", "type": "text"},
            {"name": "download_url", "type": "text"},
            {"name": "featured", "type": "boolean", "default": False}
        ]
    },
    "articles": {
        "display_name": "Article",
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

class StrapiDevModeCreator:
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
        
    async def verify_development_mode(self):
        """Verify Strapi is in development mode"""
        print("🔍 Verifying development mode...")
        
        # Navigate to Content-Type Builder
        await self.page.click('text=Content-Type Builder')
        await self.page.wait_for_load_state("networkidle")
        await self.take_screenshot("02_content_type_builder")
        
        # Check if we can create content types
        try:
            await self.page.wait_for_selector('text=Create new collection type', timeout=5000)
            print("✅ Development mode confirmed - can create content types!")
            return True
        except:
            print("❌ Still in production mode or unable to create content types")
            return False
    
    async def create_content_type(self, content_type_key, config):
        """Create a single content type with all fields"""
        print(f"\n📝 Creating {config['display_name']} content type...")
        
        # Navigate back to Content-Type Builder if needed
        try:
            await self.page.click('text=Content-Type Builder')
            await self.page.wait_for_load_state("networkidle")
        except:
            pass
        
        # Click Create new collection type
        await self.page.click('text=Create new collection type')
        await self.page.wait_for_load_state("networkidle")
        
        # Fill display name
        await self.page.fill('input[name="displayName"]', config['display_name'])
        await self.page.wait_for_timeout(500)
        
        # Click Continue
        await self.page.click('button:has-text("Continue")')
        await self.page.wait_for_load_state("networkidle")
        
        # Add each field
        for i, field in enumerate(config['fields']):
            print(f"  📌 Adding field {i+1}/{len(config['fields'])}: {field['name']}")
            await self.add_field(field)
            await self.page.wait_for_timeout(1000)
        
        # Save the content type
        print(f"  💾 Saving {config['display_name']} content type...")
        await self.page.click('button:has-text("Save")')
        await self.page.wait_for_load_state("networkidle")
        
        # Wait for Strapi server restart (important!)
        print("  ⏳ Waiting for server restart...")
        await self.page.wait_for_timeout(5000)
        
        await self.take_screenshot(f"03_{content_type_key}_created")
        print(f"  ✅ {config['display_name']} content type created successfully!")
        
    async def add_field(self, field_config):
        """Add a specific field to the content type"""
        field_type = field_config["type"]
        field_name = field_config["name"]
        
        # Map field types to Strapi UI text
        field_type_mapping = {
            "text": "Text",
            "textarea": "Long text",
            "richtext": "Rich text (Blocks)",
            "uid": "UID",
            "boolean": "Boolean",
            "number": "Number",
            "date": "Date",
            "json": "JSON"
        }
        
        display_type = field_type_mapping.get(field_type, field_type.title())
        
        # Click the field type
        field_selector = f'button:has-text("{display_type}")'
        await self.page.click(field_selector)
        await self.page.wait_for_load_state("networkidle")
        
        # Fill field name
        await self.page.fill('input[name="name"]', field_name)
        await self.page.wait_for_timeout(500)
        
        # Configure field options
        await self.configure_field_options(field_config)
        
        # Continue to advanced settings if needed
        try:
            continue_button = await self.page.query_selector('button:has-text("Continue")')
            if continue_button:
                await continue_button.click()
                await self.page.wait_for_load_state("networkidle")
                await self.configure_advanced_options(field_config)
        except:
            pass
        
        # Finish adding the field
        try:
            await self.page.click('button:has-text("Finish")')
        except:
            try:
                await self.page.click('button:has-text("Add another field")')
            except:
                pass
                
        await self.page.wait_for_load_state("networkidle")
        
    async def configure_field_options(self, field_config):
        """Configure basic field options"""
        # Required checkbox
        if field_config.get("required"):
            try:
                await self.page.check('input[name="required"]')
            except:
                pass
        
        # Unique checkbox  
        if field_config.get("unique"):
            try:
                await self.page.check('input[name="unique"]')
            except:
                pass
        
        # UID target field
        if field_config.get("type") == "uid" and field_config.get("target"):
            try:
                await self.page.select_option('select[name="targetField"]', field_config["target"])
            except:
                pass
        
        # Boolean default value
        if field_config.get("type") == "boolean" and "default" in field_config:
            try:
                if field_config["default"]:
                    await self.page.select_option('select[name="default"]', "true")
                else:
                    await self.page.select_option('select[name="default"]', "false")
            except:
                pass
        
        # Number format
        if field_config.get("type") == "number" and field_config.get("number_format"):
            try:
                if field_config["number_format"] == "integer":
                    await self.page.select_option('select[name="format"]', "integer")
                elif field_config["number_format"] == "decimal":
                    await self.page.select_option('select[name="format"]', "decimal")
            except:
                pass
    
    async def configure_advanced_options(self, field_config):
        """Configure advanced field options"""
        # Min/Max values for numbers
        if field_config.get("type") == "number":
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
    
    async def configure_permissions(self):
        """Configure public permissions for all content types"""
        print("\n🔑 Configuring public permissions...")
        
        # Navigate to Settings
        await self.page.click('text=Settings')
        await self.page.wait_for_load_state("networkidle")
        
        # Click Roles & Permissions
        await self.page.click('text=Roles & Permissions')
        await self.page.wait_for_load_state("networkidle")
        
        # Click Public role
        await self.page.click('text=Public')
        await self.page.wait_for_load_state("networkidle")
        
        await self.take_screenshot("04_public_permissions")
        
        # Enable permissions for each content type
        for content_type_key in CONTENT_TYPES.keys():
            print(f"  🔓 Setting permissions for {content_type_key}...")
            try:
                # Find and enable 'find' permission
                find_checkbox = f'input[name="{content_type_key}.find"]'
                await self.page.check(find_checkbox)
                
                # Find and enable 'findOne' permission
                findone_checkbox = f'input[name="{content_type_key}.findOne"]'
                await self.page.check(findone_checkbox)
                
                print(f"    ✅ Enabled find and findOne for {content_type_key}")
            except Exception as e:
                print(f"    ⚠️  Could not set permissions for {content_type_key}: {e}")
        
        # Save permissions
        await self.page.click('button:has-text("Save")')
        await self.page.wait_for_load_state("networkidle")
        
        await self.take_screenshot("05_permissions_saved")
        print("✅ Public permissions configured!")
    
    async def verify_content_manager(self):
        """Verify all content types appear in Content Manager"""
        print("\n🔍 Verifying Content Manager...")
        
        # Navigate to Content Manager
        await self.page.click('text=Content Manager')
        await self.page.wait_for_load_state("networkidle")
        
        await self.take_screenshot("06_content_manager")
        
        # Check each content type
        for content_type_key, config in CONTENT_TYPES.items():
            try:
                plural_name = f"{config['display_name']}s"  # Simple pluralization
                await self.page.wait_for_selector(f'text={plural_name}', timeout=3000)
                print(f"  ✅ {plural_name} visible in Content Manager")
            except:
                # Try alternative selectors
                try:
                    await self.page.wait_for_selector(f'text={config["display_name"]}', timeout=3000)
                    print(f"  ✅ {config['display_name']} visible in Content Manager")
                except:
                    print(f"  ⚠️  {config['display_name']} may not be visible - check manually")
    
    async def test_api_endpoints(self):
        """Test API endpoints to verify they work"""
        print("\n🧪 Testing API endpoints...")
        
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
                elif status == 403:
                    print(f"  🔒 {endpoint} - Status: {status} (FORBIDDEN - check permissions)")
                else:
                    print(f"  ⚠️  {endpoint} - Status: {status}")
                    
            except Exception as e:
                print(f"  ❌ {endpoint} - Error: {e}")
    
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
            
            # Verify development mode
            if not await self.verify_development_mode():
                print("❌ Cannot proceed - Strapi is not in development mode!")
                return
            
            # Create each content type
            print("\n🏗️  Creating content types...")
            for content_type_key, config in CONTENT_TYPES.items():
                await self.create_content_type(content_type_key, config)
            
            # Configure permissions
            await self.configure_permissions()
            
            # Verify Content Manager
            await self.verify_content_manager()
            
            # Test API endpoints
            await self.test_api_endpoints()
            
            print("\n🎉 ALL CONTENT TYPES CREATED SUCCESSFULLY!")
            print(f"📁 Screenshots saved in: {self.screenshots_dir}")
            print("\n✅ Next steps:")
            print("1. Verify all content types in Content Manager")
            print("2. Test API endpoints")
            print("3. Switch back to production mode when ready")
            
        except Exception as e:
            print(f"❌ Error during execution: {e}")
            if self.page:
                try:
                    await self.take_screenshot("error_state")
                except:
                    pass
            import traceback
            traceback.print_exc()
        finally:
            await self.cleanup()

async def main():
    """Entry point"""
    print("🚀 Starting Strapi Content Types Creation (Development Mode)")
    print("="*70)
    print("⚠️  IMPORTANT: This script only works when Strapi is in development mode!")
    print("⚠️  Make sure you have switched to development mode first!")
    print("="*70)
    
    creator = StrapiDevModeCreator()
    await creator.run()

if __name__ == "__main__":
    asyncio.run(main())