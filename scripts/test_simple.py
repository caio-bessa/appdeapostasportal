#!/usr/bin/env python3

import requests
import json
from datetime import datetime
import time

def test_portal_simple():
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
            "note": "Era 404 antes do deploy"
        },
        {
            "name": "Time Flamengo",
            "url": "https://appdeapostas.com.br/times/flamengo",
            "expected": "200",
            "note": "Era 404 antes do deploy"
        },
        {
            "name": "Autor Admin",
            "url": "https://appdeapostas.com.br/autor/admin",
            "expected": "200",
            "note": "Era 404 antes do deploy"
        },
        {
            "name": "Notícia Específica",
            "url": "https://appdeapostas.com.br/noticias/promocoes/betano-super-odd-brasil-copa",
            "expected": "200",
            "note": "Link quebrado específico que estava 404"
        },
        {
            "name": "Tag Bonus",
            "url": "https://appdeapostas.com.br/tag/bonus",
            "expected": "200",
            "note": "Era 404 antes do deploy"
        }
    ]
    
    print("Testando URLs do portal AppdeApostas...")
    print("=" * 60)
    
    for i, test in enumerate(test_urls):
        print(f"\n[{i+1}/{len(test_urls)}] {test['name']}")
        print(f"URL: {test['url']}")
        
        try:
            # Fazer requisição HTTP
            response = requests.get(
                test['url'], 
                headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                timeout=30,
                allow_redirects=True
            )
            
            # Verificar se é uma página 404 baseada no conteúdo
            is_404_content = (
                "404" in response.text.lower() and 
                ("not found" in response.text.lower() or 
                 "página não encontrada" in response.text.lower() or
                 "page not found" in response.text.lower())
            )
            
            # Verificar se tem conteúdo real
            has_real_content = (
                len(response.text.strip()) > 500 and
                not is_404_content and
                ("html" in response.text.lower() or "<!doctype" in response.text.lower())
            )
            
            test_result = {
                "name": test['name'],
                "url": test['url'],
                "final_url": response.url,
                "status_code": response.status_code,
                "has_content": has_real_content,
                "is_404_content": is_404_content,
                "content_length": len(response.text),
                "note": test.get('note', ''),
                "success": response.status_code == 200 and has_real_content and not is_404_content
            }
            
            results["tests"].append(test_result)
            
            status_icon = "✅" if test_result["success"] else "❌"
            print(f"{status_icon} Status HTTP: {response.status_code}")
            print(f"   Conteúdo: {len(response.text)} chars")
            print(f"   É 404: {'Sim' if is_404_content else 'Não'}")
            print(f"   Sucesso: {'Sim' if test_result['success'] else 'Não'}")
            
        except Exception as e:
            print(f"❌ Erro: {str(e)}")
            test_result = {
                "name": test['name'],
                "url": test['url'],
                "error": str(e),
                "success": False,
                "note": test.get('note', '')
            }
            results["tests"].append(test_result)
        
        time.sleep(1)  # Pausa entre requisições
    
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
    
    print(f"✅ Sucessos: {len(successful_tests)}")
    print(f"❌ Falhas: {len(failed_tests)}")
    print()
    
    print("DETALHES DOS TESTES:")
    print("-" * 80)
    
    for test in results['tests']:
        status_icon = "✅" if test.get('success', False) else "❌"
        print(f"\n{status_icon} {test['name']}")
        print(f"   URL: {test['url']}")
        
        if 'error' in test:
            print(f"   ❌ ERRO: {test['error']}")
        else:
            print(f"   Status HTTP: {test.get('status_code', 'N/A')}")
            print(f"   Tamanho do conteúdo: {test.get('content_length', 0)} chars")
            print(f"   É página 404: {'Sim' if test.get('is_404_content', False) else 'Não'}")
            print(f"   Tem conteúdo real: {'Sim' if test.get('has_content', False) else 'Não'}")
        
        if test.get('note'):
            print(f"   📝 Nota: {test['note']}")
    
    print("\n" + "="*80)
    print("RESUMO COMPARATIVO (Antes vs Depois do Deploy)")
    print("="*80)
    
    routes_that_were_404 = [t for t in results['tests'] if t.get('note') and '404' in t.get('note', '')]
    
    print("\n🔍 Rotas que eram 404 ANTES do deploy:")
    for test in routes_that_were_404:
        status = "✅ AGORA FUNCIONANDO" if test.get('success', False) else "❌ AINDA COM PROBLEMA"
        print(f"  • {test['name']}: {status}")
        if not test.get('success', False):
            if 'error' in test:
                print(f"    - Erro: {test['error']}")
            else:
                print(f"    - Status: {test.get('status_code', 'N/A')}")
                print(f"    - É 404: {'Sim' if test.get('is_404_content', False) else 'Não'}")
    
    success_rate = len(successful_tests) / len(results['tests']) * 100
    
    if len(successful_tests) == len(results['tests']):
        print(f"\n🎉 EXCELENTE! TODOS OS TESTES PASSARAM!")
        print(f"✅ O deploy foi 100% bem-sucedido - todas as rotas que eram 404 agora funcionam!")
    elif len([t for t in routes_that_were_404 if t.get('success', False)]) == len(routes_that_were_404):
        print(f"\n🎊 BOM! Todas as rotas que eram 404 agora funcionam!")
        print(f"📊 Taxa de sucesso: {success_rate:.1f}%")
    else:
        print(f"\n⚠️ PARCIALMENTE RESOLVIDO:")
        print(f"📊 Taxa de sucesso geral: {success_rate:.1f}%")
        fixed_routes = len([t for t in routes_that_were_404 if t.get('success', False)])
        total_broken_routes = len(routes_that_were_404)
        print(f"🔧 Rotas 404 corrigidas: {fixed_routes}/{total_broken_routes}")
    
    # Salvar resultados
    with open('/Users/caiobessa/news-portal/test_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Resultados salvos em: /Users/caiobessa/news-portal/test_results.json")

if __name__ == "__main__":
    print("🚀 Iniciando testes do portal AppdeApostas...")
    results = test_portal_simple()
    print_report(results)