#!/usr/bin/env python3
"""
Strapi Setup Verification Script
Tests all API endpoints to confirm content types are working properly.
"""

import asyncio
import requests
from datetime import datetime

# Configuration
BASE_API_URL = "https://appdeapostas.com.br/api"
CONTENT_TYPES = ["categories", "authors", "teams", "apps", "articles"]

def test_endpoint(endpoint):
    """Test a single API endpoint"""
    try:
        response = requests.get(endpoint, timeout=10)
        return {
            "endpoint": endpoint,
            "status": response.status_code,
            "success": response.status_code == 200,
            "error": None,
            "response_type": type(response.json()).__name__ if response.status_code == 200 else "N/A"
        }
    except requests.exceptions.RequestException as e:
        return {
            "endpoint": endpoint,
            "status": "ERROR",
            "success": False,
            "error": str(e),
            "response_type": "N/A"
        }

def main():
    """Main verification function"""
    print("🧪 STRAPI API ENDPOINTS VERIFICATION")
    print("=" * 50)
    print(f"🕒 Test time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🌐 Base URL: {BASE_API_URL}")
    print()
    
    results = []
    all_success = True
    
    print("Testing endpoints...")
    print("-" * 30)
    
    for content_type in CONTENT_TYPES:
        endpoint = f"{BASE_API_URL}/{content_type}"
        result = test_endpoint(endpoint)
        results.append(result)
        
        status_icon = "✅" if result["success"] else "❌"
        status_text = f"Status: {result['status']}"
        
        if result["success"]:
            print(f"{status_icon} {content_type:<12} - {status_text} - Returns: {result['response_type']}")
        else:
            print(f"{status_icon} {content_type:<12} - {status_text}")
            if result["error"]:
                print(f"   Error: {result['error']}")
            all_success = False
    
    print()
    print("=" * 50)
    print("📊 SUMMARY")
    print("=" * 50)
    
    success_count = sum(1 for r in results if r["success"])
    total_count = len(results)
    
    print(f"✅ Successful: {success_count}/{total_count}")
    print(f"❌ Failed: {total_count - success_count}/{total_count}")
    
    if all_success:
        print("\n🎉 ALL ENDPOINTS ARE WORKING!")
        print("✅ Your Strapi content types are properly configured.")
        print("✅ Public permissions are correctly set.")
        print("✅ API is ready for the AppdeApostas.com.br portal!")
    else:
        print("\n⚠️  SOME ENDPOINTS ARE NOT WORKING")
        print("🔧 Possible issues:")
        print("   • Content types not created yet")
        print("   • Server in production mode")
        print("   • Public permissions not configured")
        print("   • Server not running")
        
        print("\n📋 Next steps:")
        if any(r["status"] == 404 for r in results):
            print("   1. Create missing content types")
            print("   2. Ensure server is in development mode")
        if any(r["status"] == 403 for r in results):
            print("   1. Configure public permissions")
            print("   2. Enable 'find' and 'findOne' for all content types")
    
    print("\n" + "=" * 50)
    return all_success

if __name__ == "__main__":
    main()