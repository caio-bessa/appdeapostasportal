#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright
import json
from datetime import datetime

async def comprehensive_admin_check():
    """Comprehensive check of the Strapi admin interface"""
    
    report = {
        "timestamp": datetime.now().isoformat(),
        "url": "https://appdeapostas.com.br/admin",
        "status": {},
        "interface": {},
        "navigation": {},
        "errors": [],
        "console_logs": [],
        "screenshots": []
    }
    
    async with async_playwright() as p:
        # Launch browser in headless mode
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080}
        )
        
        # Create a new page
        page = await context.new_page()
        
        # Enable console logging to capture JavaScript errors
        def handle_console(msg):
            log_entry = {
                'type': msg.type,
                'text': msg.text,
                'timestamp': datetime.now().isoformat()
            }
            report['console_logs'].append(log_entry)
            
            if msg.type in ['error', 'warn']:
                report['errors'].append(log_entry)
        
        def handle_page_error(error):
            error_entry = {
                'type': 'page_error',
                'text': str(error),
                'timestamp': datetime.now().isoformat()
            }
            report['errors'].append(error_entry)
        
        page.on('console', handle_console)
        page.on('pageerror', handle_page_error)
        
        try:
            print("🔍 Checking Strapi Admin Interface...")
            print(f"Navigating to {report['url']}")
            
            # Navigate to the admin interface
            response = await page.goto(report['url'], 
                                     wait_until='networkidle', 
                                     timeout=30000)
            
            # Basic status information
            report['status'] = {
                'response_code': response.status,
                'url': page.url,
                'title': await page.title(),
                'loaded': True
            }
            
            print(f"✅ Page loaded with status: {response.status}")
            print(f"📄 Page title: {report['status']['title']}")
            
            # Wait for dynamic content
            await page.wait_for_timeout(3000)
            
            # Take initial screenshot
            screenshot_path = f'/Users/caiobessa/news-portal/screenshots_final/admin_current_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png'
            await page.screenshot(path=screenshot_path, full_page=True)
            report['screenshots'].append(screenshot_path)
            print(f"📸 Screenshot saved: {screenshot_path}")
            
            # Check for Strapi admin elements
            admin_elements = {
                # Welcome/setup screen elements
                'welcome_message': 'h1:has-text("Welcome")',
                'strapi_logo': '[data-testid="strapi-logo"], .strapi-logo, img[alt*="Strapi"]',
                'first_admin_form': '[data-testid="create-first-admin"]',
                
                # Login screen elements
                'login_form': 'form:has(input[name="email"]), form:has(input[type="email"])',
                'email_input': 'input[name="email"], input[type="email"]',
                'password_input': 'input[name="password"], input[type="password"]',
                'login_button': 'button[type="submit"]:has-text("Login"), button:has-text("Sign in")',
                
                # Admin dashboard elements (if already logged in)
                'admin_sidebar': '[data-testid="sidebar"], .sidebar, nav[role="navigation"]',
                'content_manager': 'a:has-text("Content Manager"), [href*="content-manager"]',
                'content_type_builder': 'a:has-text("Content-Type Builder"), [href*="content-type-builder"]',
                'settings_menu': 'a:has-text("Settings"), [href*="settings"]',
                
                # General elements
                'main_content': 'main, [role="main"], .main-content',
                'forms': 'form',
                'buttons': 'button',
                'inputs': 'input'
            }
            
            print("🔎 Analyzing page elements...")
            found_elements = {}
            
            for element_name, selector in admin_elements.items():
                try:
                    element = await page.query_selector(selector)
                    found_elements[element_name] = {
                        'found': element is not None,
                        'selector': selector
                    }
                    
                    if element:
                        text_content = await element.text_content()
                        found_elements[element_name]['text'] = (text_content or '').strip()[:200]
                        
                        # Get element attributes
                        try:
                            class_name = await element.get_attribute('class')
                            found_elements[element_name]['class'] = class_name
                        except:
                            pass
                            
                except Exception as e:
                    found_elements[element_name] = {
                        'found': False,
                        'error': str(e),
                        'selector': selector
                    }
            
            report['interface']['elements'] = found_elements
            
            # Determine the current state of the admin
            if found_elements.get('first_admin_form', {}).get('found'):
                report['interface']['state'] = 'setup_required'
                report['interface']['description'] = 'Strapi is in initial setup - needs first admin user creation'
                print("📋 Status: Initial setup required - no admin user exists yet")
                
            elif found_elements.get('login_form', {}).get('found'):
                report['interface']['state'] = 'login_screen'
                report['interface']['description'] = 'Strapi login screen - admin user exists'
                print("🔐 Status: Login screen - admin user already exists")
                
            elif found_elements.get('admin_sidebar', {}).get('found'):
                report['interface']['state'] = 'admin_dashboard'
                report['interface']['description'] = 'Already logged into admin dashboard'
                print("🎛️ Status: Admin dashboard loaded")
                
            else:
                report['interface']['state'] = 'unknown'
                report['interface']['description'] = 'Unable to determine interface state'
                print("❓ Status: Unknown state")
            
            # Try to identify available features
            navigation_features = {}
            
            if found_elements.get('content_manager', {}).get('found'):
                navigation_features['content_manager'] = True
                print("✅ Content Manager available")
                
            if found_elements.get('content_type_builder', {}).get('found'):
                navigation_features['content_type_builder'] = True
                print("✅ Content-Type Builder available")
                
            if found_elements.get('settings_menu', {}).get('found'):
                navigation_features['settings'] = True
                print("✅ Settings menu available")
            
            report['navigation']['features'] = navigation_features
            
            # Get page source for further analysis
            page_content = await page.content()
            report['interface']['has_react'] = 'react' in page_content.lower() or 'React' in page_content
            report['interface']['has_strapi'] = 'strapi' in page_content.lower() or 'Strapi' in page_content
            
            # Summary
            total_elements = len(admin_elements)
            found_count = sum(1 for elem in found_elements.values() if elem.get('found', False))
            report['interface']['element_detection_rate'] = f"{found_count}/{total_elements}"
            
            print(f"\n📊 Summary:")
            print(f"   Elements detected: {found_count}/{total_elements}")
            print(f"   Interface state: {report['interface']['state']}")
            print(f"   Has React: {report['interface']['has_react']}")
            print(f"   Has Strapi: {report['interface']['has_strapi']}")
            print(f"   Console errors: {len(report['errors'])}")
            
        except Exception as e:
            report['status']['error'] = str(e)
            report['status']['loaded'] = False
            print(f"❌ Error during check: {str(e)}")
            
        finally:
            await browser.close()
    
    # Save report
    report_path = '/Users/caiobessa/news-portal/admin_check_report.json'
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n📄 Full report saved to: {report_path}")
    return report

if __name__ == "__main__":
    report = asyncio.run(comprehensive_admin_check())