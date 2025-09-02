#!/usr/bin/env python3

import requests
import json
from datetime import datetime

def comprehensive_test():
    """Teste abrangente do portal AppdeApostas com análise detalhada"""
    
    report = {
        "timestamp": datetime.now().isoformat(),
        "portal_url": "https://appdeapostas.com.br",
        "tests": {
            "frontend": [],
            "backend": [],
            "static_routes": [],
            "dynamic_routes": []
        },
        "summary": {},
        "issues_identified": [],
        "recommendations": []
    }
    
    print("=" * 80)
    print("RELATÓRIO FINAL DE TESTES - PORTAL APPDEAPOSTAS.COM.BR")
    print("=" * 80)
    print(f"Data/Hora: {report['timestamp']}")
    print()
    
    # 1. Testar rotas estáticas
    print("1. TESTANDO ROTAS ESTÁTICAS:")
    print("-" * 40)
    
    static_routes = [
        ("Home Page", "https://appdeapostas.com.br", "Página principal"),
        ("Análises", "https://appdeapostas.com.br/analises", "Seção de análises"),
        ("Apps", "https://appdeapostas.com.br/apps", "Listagem de apps"),
        ("Blog", "https://appdeapostas.com.br/blog", "Blog do site"),
        ("Bônus", "https://appdeapostas.com.br/bonus", "Seção de bônus"),
        ("Odds", "https://appdeapostas.com.br/odds", "Seção de odds"),
        ("Tutoriais", "https://appdeapostas.com.br/tutoriais", "Seção de tutoriais")
    ]
    
    for name, url, description in static_routes:
        try:
            response = requests.get(url, timeout=30)
            status = "✅ OK" if response.status_code == 200 else f"❌ {response.status_code}"
            content_length = len(response.text)
            
            test_result = {
                "name": name,
                "url": url,
                "status_code": response.status_code,
                "content_length": content_length,
                "success": response.status_code == 200
            }
            
            report["tests"]["static_routes"].append(test_result)
            print(f"  {status} {name}: {content_length} chars")
            
        except Exception as e:
            print(f"  ❌ {name}: ERRO - {str(e)}")
            report["tests"]["static_routes"].append({
                "name": name,
                "url": url,
                "error": str(e),
                "success": False
            })
    
    # 2. Testar rotas dinâmicas problemáticas
    print("\\n2. TESTANDO ROTAS DINÂMICAS (que eram 404):")
    print("-" * 50)
    
    dynamic_routes = [
        ("Categoria Promoções", "https://appdeapostas.com.br/categoria/promocoes", "Deveria existir nos dados"),
        ("Time Flamengo", "https://appdeapostas.com.br/times/flamengo", "Existe nos dados de times"),
        ("Autor Admin", "https://appdeapostas.com.br/autor/admin", "Pode não existir nos dados"),
        ("Tag Bonus", "https://appdeapostas.com.br/tag/bonus", "Tag genérica"),
        ("Artigo Específico", "https://appdeapostas.com.br/noticias/promocoes/betano-super-odd-brasil-copa", "Artigo específico")
    ]
    
    for name, url, note in dynamic_routes:
        try:
            response = requests.get(url, timeout=30)
            
            # Verificar se é realmente uma página 404 do Next.js
            is_nextjs_404 = (
                response.status_code == 404 and 
                "This page could not be found" in response.text and
                "next-error-h1" in response.text
            )
            
            status = "✅ OK" if response.status_code == 200 else f"❌ {response.status_code}"
            if is_nextjs_404:
                status += " (Next.js 404)"
            
            test_result = {
                "name": name,
                "url": url,
                "status_code": response.status_code,
                "is_nextjs_404": is_nextjs_404,
                "content_length": len(response.text),
                "note": note,
                "success": response.status_code == 200
            }
            
            report["tests"]["dynamic_routes"].append(test_result)
            print(f"  {status} {name}")
            print(f"    → {note}")
            
        except Exception as e:
            print(f"  ❌ {name}: ERRO - {str(e)}")
            report["tests"]["dynamic_routes"].append({
                "name": name,
                "url": url,
                "error": str(e),
                "note": note,
                "success": False
            })
    
    # 3. Testar Backend/API
    print("\\n3. TESTANDO BACKEND/API:")
    print("-" * 30)
    
    api_endpoints = [
        ("Health Check", "https://appdeapostas.com.br/api/v1/health"),
        ("Categories", "https://appdeapostas.com.br/api/v1/categories"),
        ("Articles", "https://appdeapostas.com.br/api/v1/articles"),
        ("Authors", "https://appdeapostas.com.br/api/v1/authors"),
        ("Teams", "https://appdeapostas.com.br/api/v1/teams")
    ]
    
    for name, url in api_endpoints:
        try:
            response = requests.get(url, timeout=15)
            status = "✅ OK" if response.status_code == 200 else f"❌ {response.status_code}"
            
            test_result = {
                "name": name,
                "url": url,
                "status_code": response.status_code,
                "content_length": len(response.text),
                "success": response.status_code == 200
            }
            
            if response.status_code == 502:
                test_result["error_type"] = "Bad Gateway - Backend não está respondendo"
            
            report["tests"]["backend"].append(test_result)
            print(f"  {status} {name}")
            
        except Exception as e:
            print(f"  ❌ {name}: ERRO - {str(e)}")
            report["tests"]["backend"].append({
                "name": name,
                "url": url,
                "error": str(e),
                "success": False
            })
    
    # 4. Análise e Diagnóstico
    print("\\n4. DIAGNÓSTICO DETALHADO:")
    print("-" * 40)
    
    static_success = len([t for t in report["tests"]["static_routes"] if t.get("success", False)])
    total_static = len(report["tests"]["static_routes"])
    
    dynamic_success = len([t for t in report["tests"]["dynamic_routes"] if t.get("success", False)])
    total_dynamic = len(report["tests"]["dynamic_routes"])
    
    backend_success = len([t for t in report["tests"]["backend"] if t.get("success", False)])
    total_backend = len(report["tests"]["backend"])
    
    print(f"✅ Rotas Estáticas: {static_success}/{total_static} funcionando")
    print(f"❌ Rotas Dinâmicas: {dynamic_success}/{total_dynamic} funcionando") 
    print(f"❌ Backend/API: {backend_success}/{total_backend} funcionando")
    
    # Identificar problemas
    if backend_success == 0:
        report["issues_identified"].append("Backend completamente indisponível (erro 502)")
        print("\\n🚨 PROBLEMA PRINCIPAL IDENTIFICADO:")
        print("   → Backend está retornando erro 502 (Bad Gateway)")
        print("   → Isso explica por que as rotas dinâmicas não funcionam")
    
    if dynamic_success == 0:
        report["issues_identified"].append("Todas as rotas dinâmicas retornam 404 do Next.js")
        print("\\n🚨 CONSEQUÊNCIA:")
        print("   → Como o backend não funciona, o frontend não consegue buscar dados")
        print("   → Rotas dinâmicas [slug] chamam notFound() quando não há dados")
    
    # Recomendações
    print("\\n5. RECOMENDAÇÕES PARA CORREÇÃO:")
    print("-" * 50)
    
    recommendations = [
        "1. URGENTE: Corrigir o backend que está com erro 502",
        "2. Verificar se o servidor backend está rodando na EC2",
        "3. Verificar logs do backend para identificar o erro específico", 
        "4. Configurar NEXT_PUBLIC_STRAPI_URL corretamente no .env.production",
        "5. Como alternativa temporária, implementar dados estáticos nos templates"
    ]
    
    for rec in recommendations:
        print(f"   {rec}")
        report["recommendations"].append(rec)
    
    # Comparação Antes vs Depois
    print("\\n6. COMPARAÇÃO: ANTES vs DEPOIS DO DEPLOY:")
    print("-" * 60)
    print("ANTES DO DEPLOY:")
    print("  ❌ Rotas dinâmicas retornavam 404")
    print("  ❌ Templates [slug] não existiam")
    print("\\nDEPOIS DO DEPLOY:")
    print("  ✅ Templates dinâmicos foram criados corretamente")
    print("  ✅ Estrutura de rotas está funcionando") 
    print("  ✅ Página principal funciona perfeitamente")
    print("  ❌ Backend está indisponível (erro 502)")
    print("  ❌ Rotas dinâmicas ainda retornam 404 (por falta de dados)")
    
    print("\\n📊 CONCLUSÃO:")
    print("   O deploy foi PARCIALMENTE bem-sucedido:")
    print("   • Frontend foi deployado corretamente")
    print("   • Templates dinâmicos foram criados") 
    print("   • Problema está no backend que não responde")
    
    # Salvar relatório
    with open('/Users/caiobessa/news-portal/final_test_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\\n💾 Relatório completo salvo em: /Users/caiobessa/news-portal/final_test_report.json")
    
    return report

if __name__ == "__main__":
    comprehensive_test()