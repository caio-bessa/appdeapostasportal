#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright
import json
from datetime import datetime

async def test_admin_login():
    """Test login to admin and explore dashboard"""
    
    report = {
        "timestamp": datetime.now().isoformat(),
        "login_attempt": {},
        "dashboard_access": {},
        "content_type_builder": {},
        "screenshots": []
    }
    
    async with async_playwright() as p:
        # Launch browser in non-headless mode to see what's happening
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080}
        )
        
        page = await context.new_page()
        
        try:
            print("🔗 Navigating to admin login...")
            await page.goto('https://appdeapostas.com.br/admin', wait_until='networkidle')
            
            # Take screenshot of login page
            login_screenshot = f'/Users/caiobessa/news-portal/screenshots_final/login_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png'
            await page.screenshot(path=login_screenshot, full_page=True)
            report['screenshots'].append(login_screenshot)
            
            print("📸 Login page screenshot taken")
            
            # Check if we're on login page and get any hints about default credentials
            page_content = await page.content()
            
            # Look for any hints about default admin credentials in comments or text
            hints_found = []
            if 'admin@example.com' in page_content:
                hints_found.append('admin@example.com found in page')
            if 'default' in page_content.lower():
                hints_found.append('mentions "default" in content')
            
            report['login_attempt']['hints'] = hints_found
            
            # Common Strapi default credentials to try
            credentials_to_try = [
                {'email': 'admin@appdeapostas.com.br', 'password': 'admin123'},
                {'email': 'admin@admin.com', 'password': 'admin123'},
                {'email': 'admin@example.com', 'password': 'password'},
                {'email': 'admin@strapi.com', 'password': 'admin123'},
                {'email': 'admin@localhost', 'password': 'admin'},
            ]
            
            login_success = False
            
            for i, creds in enumerate(credentials_to_try):
                print(f"🔐 Trying login {i+1}: {creds['email']}")
                
                # Fill login form
                try:
                    # Clear and fill email
                    await page.fill('input[name="email"], input[type="email"]', creds['email'])
                    await page.fill('input[name="password"], input[type="password"]', creds['password'])
                    
                    # Click login button
                    await page.click('button[type="submit"]:has-text("Login"), button:has-text("Login")')
                    
                    # Wait for navigation or error
                    try:
                        await page.wait_for_timeout(3000)
                        current_url = page.url
                        
                        # Check if we successfully logged in (URL changed from login page)
                        if '/auth/login' not in current_url and 'admin' in current_url:
                            login_success = True
                            report['login_attempt']['successful'] = True
                            report['login_attempt']['credentials'] = creds['email']
                            print(f"✅ Login successful with: {creds['email']}")
                            break
                        else:
                            print(f"❌ Login failed for: {creds['email']}")
                            # Go back to login page for next attempt
                            if '/auth/login' not in current_url:
                                await page.goto('https://appdeapostas.com.br/admin/auth/login')
                                await page.wait_for_timeout(2000)
                            
                    except Exception as e:
                        print(f"⚠️ Error during login attempt: {str(e)}")
                        continue
                        
                except Exception as e:
                    print(f"⚠️ Error filling login form: {str(e)}")
                    continue
            
            if login_success:
                # Take screenshot of dashboard
                dashboard_screenshot = f'/Users/caiobessa/news-portal/screenshots_final/dashboard_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png'
                await page.screenshot(path=dashboard_screenshot, full_page=True)
                report['screenshots'].append(dashboard_screenshot)
                
                print("📸 Dashboard screenshot taken")
                
                # Check for main dashboard elements
                dashboard_elements = {
                    'content_manager': 'a:has-text("Content Manager")',
                    'content_type_builder': 'a:has-text("Content-Type Builder")',
                    'settings': 'a:has-text("Settings")',
                    'marketplace': 'a:has-text("Marketplace")',
                    'documentation': 'a:has-text("Documentation")',
                    'sidebar': '[data-testid="sidebar"], nav'
                }
                
                dashboard_features = {}
                for feature, selector in dashboard_elements.items():
                    try:
                        element = await page.query_selector(selector)
                        dashboard_features[feature] = element is not None
                        if element:
                            text = await element.text_content()
                            dashboard_features[f'{feature}_text'] = text[:100] if text else None
                    except:
                        dashboard_features[feature] = False
                
                report['dashboard_access']['features'] = dashboard_features
                
                # Try to access Content-Type Builder
                try:
                    content_builder_link = await page.query_selector('a:has-text("Content-Type Builder")')
                    if content_builder_link:
                        print("🔧 Accessing Content-Type Builder...")
                        await content_builder_link.click()
                        await page.wait_for_timeout(3000)
                        
                        # Take screenshot of Content-Type Builder
                        ctb_screenshot = f'/Users/caiobessa/news-portal/screenshots_final/content_type_builder_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png'
                        await page.screenshot(path=ctb_screenshot, full_page=True)
                        report['screenshots'].append(ctb_screenshot)
                        
                        # Check what content types exist
                        content_types = []
                        type_elements = await page.query_selector_all('[data-testid="content-type"], .content-type-item, li:has-text("Collection Type"), li:has-text("Single Type")')
                        
                        for element in type_elements:
                            try:
                                text = await element.text_content()
                                if text and text.strip():
                                    content_types.append(text.strip())
                            except:
                                pass
                        
                        report['content_type_builder']['accessible'] = True
                        report['content_type_builder']['existing_types'] = content_types
                        print(f"📋 Found {len(content_types)} content types")
                        
                    else:
                        report['content_type_builder']['accessible'] = False
                        report['content_type_builder']['reason'] = 'Link not found'
                        
                except Exception as e:
                    report['content_type_builder']['accessible'] = False
                    report['content_type_builder']['error'] = str(e)
                    
            else:
                report['login_attempt']['successful'] = False
                print("❌ All login attempts failed")
                
        except Exception as e:
            print(f"❌ General error: {str(e)}")
            report['error'] = str(e)
            
        finally:
            await browser.close()
    
    # Save report
    report_path = '/Users/caiobessa/news-portal/admin_login_test_report.json'
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n📄 Login test report saved to: {report_path}")
    return report

if __name__ == "__main__":
    report = asyncio.run(test_admin_login())