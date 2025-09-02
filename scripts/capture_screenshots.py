#!/usr/bin/env python3

import asyncio
from playwright.async_api import async_playwright
import os

async def capture_screenshots():
    """Captura screenshots das páginas que funcionam"""
    
    print("📸 Capturando screenshots das páginas funcionais...")
    
    # Páginas que funcionam
    working_pages = [
        {
            "name": "homepage", 
            "url": "https://appdeapostas.com.br",
            "title": "Página Principal"
        },
        {
            "name": "analises",
            "url": "https://appdeapostas.com.br/analises", 
            "title": "Seção Análises"
        },
        {
            "name": "apps",
            "url": "https://appdeapostas.com.br/apps",
            "title": "Seção Apps"
        },
        {
            "name": "bonus", 
            "url": "https://appdeapostas.com.br/bonus",
            "title": "Seção Bônus"
        },
        {
            "name": "404_categoria_promocoes",
            "url": "https://appdeapostas.com.br/categoria/promocoes",
            "title": "Erro 404 - Categoria Promoções"
        },
        {
            "name": "404_time_flamengo", 
            "url": "https://appdeapostas.com.br/times/flamengo",
            "title": "Erro 404 - Time Flamengo"
        }
    ]
    
    screenshot_dir = "/Users/caiobessa/news-portal/screenshots_final"
    os.makedirs(screenshot_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Configurar viewport para desktop
        await page.set_viewport_size({"width": 1280, "height": 720})
        
        for site in working_pages:
            try:
                print(f"📷 Capturando: {site['title']}")
                
                # Navegar para a página
                await page.goto(site['url'], wait_until='networkidle', timeout=30000)
                
                # Aguardar carregamento
                await page.wait_for_timeout(2000)
                
                # Capturar screenshot
                screenshot_path = f"{screenshot_dir}/{site['name']}_post_deploy.png"
                await page.screenshot(path=screenshot_path, full_page=True)
                
                print(f"  ✅ Salvo: {screenshot_path}")
                
            except Exception as e:
                print(f"  ❌ Erro ao capturar {site['name']}: {str(e)}")
        
        await browser.close()
    
    print(f"\\n🎯 Screenshots salvos em: {screenshot_dir}")
    return screenshot_dir

if __name__ == "__main__":
    asyncio.run(capture_screenshots())