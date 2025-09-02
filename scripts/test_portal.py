#!/usr/bin/env python3

import asyncio
from playwright.async_api import async_playwright
import json
from datetime import datetime

async def test_portal():
    results = {
        "timestamp": datetime.now().isoformat(),
        "base_url": "https://appdeapostas.com.br",
        "tests": []
    }
    
    # URLs para testar
    test_urls = [
        {
            "name": "Home Page",
            "url": "https://appdeapostas.com.br",
            "expected": "200"
        },
        {
            "name": "Categoria Promoções",
            "url": "https://appdeapostas.com.br/categoria/promocoes",
            "expected": "200",
            "note": "Era 404 antes"
        },
        {
            "name": "Time Flamengo",
            "url": "https://appdeapostas.com.br/times/flamengo",
            "expected": "200",
            "note": "Era 404 antes"
        },
        {
            "name": "Autor Admin",
            "url": "https://appdeapostas.com.br/autor/admin",
            "expected": "200",
            "note": "Era 404 antes"
        },
        {
            "name": "Notícia Específica",
            "url": "https://appdeapostas.com.br/noticias/promocoes/betano-super-odd-brasil-copa",
            "expected": "200",
            "note": "Link quebrado específico"
        },
        {
            "name": "Tag Bonus",
            "url": "https://appdeapostas.com.br/tag/bonus",
            "expected": "200",
            "note": "Era 404 antes"
        }
    ]
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 720},
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        )
        
        page = await context.new_page()
        
        for i, test in enumerate(test_urls):
            print(f"\n[{i+1}/{len(test_urls)}] Testando: {test['name']}")
            print(f"URL: {test['url']}")
            
            try:
                # Navegar para a URL
                response = await page.goto(test['url'], wait_until='networkidle', timeout=30000)
                
                # Aguardar carregamento
                await page.wait_for_timeout(2000)
                
                # Capturar screenshot
                screenshot_path = f"/Users/caiobessa/news-portal/screenshots/{test['name'].lower().replace(' ', '_')}.png"
                await page.screenshot(path=screenshot_path, full_page=True)
                
                # Obter informações da página
                title = await page.title()
                url_final = page.url
                status_code = response.status if response else "N/A"
                
                # Verificar se há conteúdo na página
                body_text = await page.locator('body').text_content()
                has_content = len(body_text.strip()) > 100
                
                # Verificar se há erro 404
                is_404 = "404" in title.lower() or "not found" in title.lower() or status_code == 404
                
                test_result = {
                    "name": test['name'],
                    "url": test['url'],
                    "final_url": url_final,
                    "status_code": status_code,
                    "title": title,
                    "has_content": has_content,
                    "is_404": is_404,
                    "screenshot": screenshot_path,
                    "note": test.get('note', ''),
                    "success": status_code == 200 and not is_404 and has_content
                }
                
                results["tests"].append(test_result)
                
                print(f"Status: {status_code}")
                print(f"Title: {title}")
                print(f"É 404: {is_404}")
                print(f"Tem conteúdo: {has_content}")
                print(f"Screenshot: {screenshot_path}")
                
            except Exception as e:
                print(f"Erro ao testar {test['name']}: {str(e)}")
                test_result = {
                    "name": test['name'],
                    "url": test['url'],
                    "error": str(e),
                    "success": False,
                    "note": test.get('note', '')
                }
                results["tests"].append(test_result)
        
        await browser.close()
    
    # Salvar resultados
    with open('/Users/caiobessa/news-portal/test_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    return results

def print_report(results):
    print("\n" + "="*80)
    print("RELATÓRIO DE TESTES DO PORTAL APPDEAPOSTAS.COM.BR")
    print("="*80)
    print(f"Data/Hora: {results['timestamp']}")
    print(f"URL Base: {results['base_url']}")
    print(f"Total de Testes: {len(results['tests'])}")
    
    successful_tests = [t for t in results['tests'] if t.get('success', False)]
    failed_tests = [t for t in results['tests'] if not t.get('success', False)]
    
    print(f"Sucessos: {len(successful_tests)}")
    print(f"Falhas: {len(failed_tests)}")
    print()
    
    print("DETALHES DOS TESTES:")
    print("-" * 80)
    
    for test in results['tests']:
        status_icon = "✅" if test.get('success', False) else "❌"
        print(f"\n{status_icon} {test['name']}")
        print(f"   URL: {test['url']}")
        
        if 'error' in test:
            print(f"   ERRO: {test['error']}")
        else:
            print(f"   Status: {test.get('status_code', 'N/A')}")
            print(f"   Title: {test.get('title', 'N/A')}")
            print(f"   É 404: {'Sim' if test.get('is_404', False) else 'Não'}")
            print(f"   Tem conteúdo: {'Sim' if test.get('has_content', False) else 'Não'}")
            if 'screenshot' in test:
                print(f"   Screenshot: {test['screenshot']}")
        
        if test.get('note'):
            print(f"   Nota: {test['note']}")
    
    print("\n" + "="*80)
    print("RESUMO COMPARATIVO (Antes vs Depois do Deploy)")
    print("="*80)
    
    routes_that_were_404 = [t for t in results['tests'] if t.get('note') and '404' in t.get('note', '')]
    
    print("\nRotas que eram 404 ANTES do deploy:")
    for test in routes_that_were_404:
        status = "✅ FUNCIONANDO" if test.get('success', False) else "❌ AINDA COM PROBLEMA"
        print(f"  • {test['name']}: {status}")
    
    if len(successful_tests) == len(results['tests']):
        print(f"\n🎉 TODOS OS TESTES PASSARAM! O deploy foi bem-sucedido.")
    else:
        print(f"\n⚠️  {len(failed_tests)} de {len(results['tests'])} testes falharam.")

if __name__ == "__main__":
    print("Iniciando testes do portal AppdeApostas...")
    results = asyncio.run(test_portal())
    print_report(results)