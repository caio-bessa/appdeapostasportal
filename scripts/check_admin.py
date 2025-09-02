#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright
import json

async def check_admin_interface():
    async with async_playwright() as p:
        # Launch browser in headless mode
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080}
        )
        
        # Create a new page
        page = await context.new_page()
        
        # Enable console logging to capture JavaScript errors
        console_logs = []
        errors = []
        
        def handle_console(msg):
            console_logs.append({
                'type': msg.type,
                'text': msg.text
            })
            if msg.type in ['error', 'warn']:
                errors.append({
                    'type': msg.type,
                    'text': msg.text
                })
        
        def handle_page_error(error):
            errors.append({
                'type': 'page_error',
                'text': str(error)
            })
        
        page.on('console', handle_console)
        page.on('pageerror', handle_page_error)
        
        try:
            print("Navigating to https://appdeapostas.com.br/admin...")
            
            # Navigate to the admin interface
            response = await page.goto('https://appdeapostas.com.br/admin', 
                                     wait_until='networkidle', 
                                     timeout=30000)
            
            print(f"Response status: {response.status}")
            
            # Wait a bit for any dynamic content to load
            await page.wait_for_timeout(3000)
            
            # Take a screenshot
            screenshot_path = '/Users/caiobessa/news-portal/admin_screenshot.png'
            await page.screenshot(path=screenshot_path, full_page=True)
            print(f"Screenshot saved to: {screenshot_path}")
            
            # Check for specific elements that indicate the admin interface loaded
            title = await page.title()
            print(f"Page title: {title}")
            
            # Check for common Strapi admin elements
            elements_to_check = [
                '[data-testid="create-first-admin"]',  # Create first admin form
                'input[name="email"]',  # Email input
                'input[name="password"]',  # Password input
                '.strapi',  # Strapi class
                '[data-strapi]',  # Strapi data attribute
                'main',  # Main content area
                'h1',  # Any h1 elements
                'form',  # Any forms
            ]
            
            found_elements = {}
            for selector in elements_to_check:
                try:
                    element = await page.query_selector(selector)
                    found_elements[selector] = element is not None
                    if element:
                        text_content = await element.text_content()
                        found_elements[f"{selector}_text"] = text_content[:100] if text_content else None
                except Exception as e:
                    found_elements[selector] = f"Error: {str(e)}"
            
            # Get page content for analysis
            body_content = await page.content()
            
            # Print results
            print("\n=== PAGE ANALYSIS ===")
            print(f"Title: {title}")
            print(f"Status Code: {response.status}")
            print(f"URL: {page.url}")
            
            print("\n=== FOUND ELEMENTS ===")
            for selector, found in found_elements.items():
                print(f"{selector}: {found}")
            
            print("\n=== CONSOLE ERRORS ===")
            if errors:
                for error in errors[-10:]:  # Show last 10 errors
                    print(f"[{error['type']}] {error['text']}")
            else:
                print("No console errors found!")
            
            print("\n=== ALL CONSOLE LOGS (Last 20) ===")
            for log in console_logs[-20:]:
                print(f"[{log['type']}] {log['text']}")
            
            # Check if this looks like a successful Strapi admin load
            success_indicators = [
                'strapi' in title.lower(),
                'admin' in title.lower(),
                found_elements.get('input[name="email"]', False),
                found_elements.get('[data-testid="create-first-admin"]', False),
                response.status == 200
            ]
            
            print(f"\n=== SUCCESS ANALYSIS ===")
            print(f"Success indicators met: {sum(success_indicators)}/5")
            for i, indicator in enumerate(['Strapi in title', 'Admin in title', 'Email input found', 'Create admin form found', 'Status 200']):
                print(f"  {indicator}: {'✓' if success_indicators[i] else '✗'}")
            
        except Exception as e:
            print(f"Error during navigation: {str(e)}")
            
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(check_admin_interface())