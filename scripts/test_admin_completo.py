#!/usr/bin/env python3
"""
TESTE COMPLETO ADMIN AREA - AppdeApostas.com.br
==============================================

Teste abrangente da área administrativa usando Playwright
Inclui: Login, CMS, Content Types, APIs, e todas as funcionalidades admin

Credenciais:
- URL: https://appdeapostas.com.br/admin  
- Email: caio.bessa@acroud.media
- Senha: gIhmyj-dymtyp-gitqe0
- Token API: 5da051f16391ca01d8f0d9072a972299bf0d66677cef07bb2f67efb1134137f791ad6bc07b9474534b1551f6bf265e6bbc64cc638210e49f379204d92da05fd216dad0e67b74f4f6748446428431b33a35b83ae47869eb06056be88b309a9f93cac977cbaef8d0bc05067be44d1641ab452e3a499be89fd2d8c605d493567a4f

Executar com: python test_admin_completo.py
"""

import asyncio
import json
import os
import time
from datetime import datetime
from playwright.async_api import async_playwright
import requests

# Configurações
BASE_URL = "https://appdeapostas.com.br"
ADMIN_URL = f"{BASE_URL}/admin"
CREDENTIALS = {
    "email": "caio.bessa@acroud.media",
    "password": "gIhmyj-dymtyp-gitqe0"
}
API_TOKEN = "5da051f16391ca01d8f0d9072a972299bf0d66677cef07bb2f67efb1134137f791ad6bc07b9474534b1551f6bf265e6bbc64cc638210e49f379204d92da05fd216dad0e67b74f4f6748446428431b33a35b83ae47869eb06056be88b309a9f93cac977cbaef8d0bc05067be44d1641ab452e3a499be89fd2d8c605d493567a4f"

# Resultados do teste
test_results = {
    "timestamp": datetime.now().isoformat(),
    "admin_tests": {},
    "problems": [],
    "improvements": [],
    "screenshots": [],
    "summary": {}
}

def log_result(category, test_name, status, details="", screenshot_path=""):
    """Log dos resultados dos testes"""
    result = {
        "test": test_name,
        "status": status,
        "details": details,
        "timestamp": datetime.now().isoformat(),
        "screenshot": screenshot_path
    }
    
    if category not in test_results["admin_tests"]:
        test_results["admin_tests"][category] = []
    
    test_results["admin_tests"][category].append(result)
    
    status_emoji = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️"
    print(f"{status_emoji} {category} - {test_name}: {status}")
    if details:
        print(f"   Details: {details}")

def add_problem(priority, description, category="General"):
    """Adicionar problema identificado"""
    test_results["problems"].append({
        "priority": priority,
        "category": category,
        "description": description,
        "timestamp": datetime.now().isoformat()
    })

def add_improvement(description, impact="Medium", category="General"):
    """Adicionar melhoria sugerida"""
    test_results["improvements"].append({
        "description": description,
        "impact": impact,
        "category": category,
        "timestamp": datetime.now().isoformat()
    })

async def test_api_endpoints():
    """Testar endpoints da API via requests"""
    print("\n🔌 TESTANDO APIs DIRETAMENTE...")
    
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }
    
    api_endpoints = [
        "/api/articles",
        "/api/categories", 
        "/api/authors",
        "/api/teams",
        "/api/apps",
        "/api/tags",
        "/api/competitions"
    ]
    
    for endpoint in api_endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", headers=headers, timeout=10)
            status = "PASS" if response.status_code == 200 else "FAIL"
            details = f"HTTP {response.status_code}"
            
            if response.status_code == 404:
                add_problem("HIGH", f"API endpoint {endpoint} returns 404", "API")
            elif response.status_code != 200:
                add_problem("MEDIUM", f"API endpoint {endpoint} returns {response.status_code}", "API")
            
            log_result("API_Tests", f"GET {endpoint}", status, details)
            
        except requests.RequestException as e:
            log_result("API_Tests", f"GET {endpoint}", "FAIL", str(e))
            add_problem("HIGH", f"API endpoint {endpoint} connection failed: {str(e)}", "API")

async def test_admin_login(page):
    """Testar processo de login no admin"""
    print("\n🔐 TESTANDO LOGIN ADMINISTRATIVO...")
    
    try:
        # Ir para página de login
        await page.goto(ADMIN_URL, wait_until="networkidle")
        await page.wait_for_timeout(2000)
        
        # Capturar screenshot da página de login
        screenshot_path = f"screenshots/admin_login_{int(time.time())}.png"
        await page.screenshot(path=screenshot_path, full_page=True)
        test_results["screenshots"].append(screenshot_path)
        
        # Verificar se há página de login ou se já está logado
        current_url = page.url
        
        if "/auth/login" in current_url or "login" in current_url.lower():
            # Tentar fazer login
            try:
                await page.fill('input[name="email"], input[type="email"]', CREDENTIALS["email"])
                await page.fill('input[name="password"], input[type="password"]', CREDENTIALS["password"])
                
                # Procurar e clicar no botão de login
                login_button = page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Login")')
                await login_button.click()
                
                # Aguardar redirecionamento
                await page.wait_for_timeout(3000)
                
                # Verificar se login foi bem-sucedido
                if "/admin" in page.url and "/login" not in page.url:
                    log_result("Authentication", "Admin Login", "PASS", f"Redirected to {page.url}")
                    return True
                else:
                    log_result("Authentication", "Admin Login", "FAIL", "Login failed or no redirect")
                    add_problem("HIGH", "Admin login process is not working", "Authentication")
                    return False
                    
            except Exception as e:
                log_result("Authentication", "Admin Login Form", "FAIL", str(e))
                add_problem("HIGH", f"Login form interaction failed: {str(e)}", "Authentication")
                return False
                
        elif "/admin" in current_url:
            log_result("Authentication", "Admin Access", "PASS", "Already logged in or no auth required")
            return True
        else:
            log_result("Authentication", "Admin Access", "FAIL", f"Unexpected URL: {current_url}")
            add_problem("HIGH", f"Admin page redirects to unexpected URL: {current_url}", "Authentication")
            return False
            
    except Exception as e:
        log_result("Authentication", "Admin Page Load", "FAIL", str(e))
        add_problem("CRITICAL", f"Cannot load admin page: {str(e)}", "Infrastructure")
        return False

async def test_admin_dashboard(page):
    """Testar dashboard administrativo"""
    print("\n📊 TESTANDO DASHBOARD ADMINISTRATIVO...")
    
    try:
        # Capturar screenshot do dashboard
        screenshot_path = f"screenshots/admin_dashboard_{int(time.time())}.png"
        await page.screenshot(path=screenshot_path, full_page=True)
        test_results["screenshots"].append(screenshot_path)
        
        # Verificar elementos do dashboard
        dashboard_elements = [
            ("Navigation Menu", "nav, .navigation, [role='navigation']"),
            ("Main Content", "main, .main-content, .dashboard"),
            ("Content Types Menu", "text=Content-Type, text=Content Manager, text=Articles"),
            ("User Menu", ".user-menu, .profile, [data-testid='user-menu']")
        ]
        
        for element_name, selector in dashboard_elements:
            try:
                element = page.locator(selector).first
                if await element.count() > 0:
                    log_result("Dashboard", element_name, "PASS", "Element found")
                else:
                    log_result("Dashboard", element_name, "FAIL", "Element not found")
                    add_problem("MEDIUM", f"Dashboard element missing: {element_name}", "UI")
            except:
                log_result("Dashboard", element_name, "FAIL", "Element check failed")
        
        # Verificar se há erros de console
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        
        await page.wait_for_timeout(2000)
        
        if console_errors:
            log_result("Dashboard", "Console Errors", "WARN", f"{len(console_errors)} errors found")
            for error in console_errors[:3]:  # Primeiros 3 erros
                add_problem("MEDIUM", f"Console error: {error}", "JavaScript")
        else:
            log_result("Dashboard", "Console Errors", "PASS", "No console errors")
            
    except Exception as e:
        log_result("Dashboard", "Dashboard Analysis", "FAIL", str(e))
        add_problem("HIGH", f"Dashboard analysis failed: {str(e)}", "Dashboard")

async def test_content_management(page):
    """Testar funcionalidades de gerenciamento de conteúdo"""
    print("\n📝 TESTANDO GERENCIAMENTO DE CONTEÚDO...")
    
    content_types = ["Articles", "Categories", "Authors", "Teams", "Apps", "Tags"]
    
    for content_type in content_types:
        try:
            # Tentar navegar para o content type
            navigation_selectors = [
                f"text={content_type}",
                f"a:has-text('{content_type}')",
                f"[href*='{content_type.lower()}']",
                f".menu-item:has-text('{content_type}')"
            ]
            
            clicked = False
            for selector in navigation_selectors:
                try:
                    element = page.locator(selector).first
                    if await element.count() > 0:
                        await element.click()
                        clicked = True
                        break
                except:
                    continue
            
            if clicked:
                await page.wait_for_timeout(2000)
                
                # Capturar screenshot da seção
                screenshot_path = f"screenshots/admin_{content_type.lower()}_{int(time.time())}.png"
                await page.screenshot(path=screenshot_path, full_page=True)
                test_results["screenshots"].append(screenshot_path)
                
                # Verificar elementos da listagem
                list_elements = [
                    ("Content List", "table, .list, .collection"),
                    ("Add Button", "text=Add, text=Create, text=New, button[data-testid='add']"),
                    ("Search", "input[type='search'], input[placeholder*='search']")
                ]
                
                for element_name, selector in list_elements:
                    try:
                        if await page.locator(selector).first.count() > 0:
                            log_result("Content_Management", f"{content_type} - {element_name}", "PASS", "Found")
                        else:
                            log_result("Content_Management", f"{content_type} - {element_name}", "FAIL", "Not found")
                            add_problem("MEDIUM", f"{content_type} missing {element_name}", "CMS")
                    except:
                        log_result("Content_Management", f"{content_type} - {element_name}", "FAIL", "Check failed")
                
                log_result("Content_Management", f"{content_type} Navigation", "PASS", "Successfully accessed")
            else:
                log_result("Content_Management", f"{content_type} Navigation", "FAIL", "Could not find navigation")
                add_problem("HIGH", f"Cannot access {content_type} content type", "CMS")
                
        except Exception as e:
            log_result("Content_Management", f"{content_type} Test", "FAIL", str(e))
            add_problem("HIGH", f"{content_type} content management failed: {str(e)}", "CMS")

async def test_admin_settings(page):
    """Testar configurações administrativas"""
    print("\n⚙️ TESTANDO CONFIGURAÇÕES ADMINISTRATIVAS...")
    
    settings_areas = [
        ("General Settings", ["Settings", "General", "Configuration"]),
        ("User Management", ["Users", "Roles", "Permissions"]),
        ("API Tokens", ["API Tokens", "API Keys", "Tokens"]),
        ("Plugins", ["Plugins", "Marketplace", "Extensions"])
    ]
    
    for area_name, search_terms in settings_areas:
        try:
            found = False
            for term in search_terms:
                try:
                    element = page.locator(f"text={term}").first
                    if await element.count() > 0:
                        await element.click()
                        await page.wait_for_timeout(1000)
                        log_result("Settings", f"{area_name} Access", "PASS", f"Found via '{term}'")
                        found = True
                        break
                except:
                    continue
            
            if not found:
                log_result("Settings", f"{area_name} Access", "FAIL", "Navigation not found")
                add_problem("MEDIUM", f"Cannot access {area_name}", "Settings")
                
        except Exception as e:
            log_result("Settings", f"{area_name} Test", "FAIL", str(e))

async def generate_report():
    """Gerar relatório final dos testes"""
    print("\n📋 GERANDO RELATÓRIO FINAL...")
    
    # Calcular estatísticas
    total_tests = sum(len(tests) for tests in test_results["admin_tests"].values())
    passed_tests = sum(1 for tests in test_results["admin_tests"].values() 
                      for test in tests if test["status"] == "PASS")
    failed_tests = sum(1 for tests in test_results["admin_tests"].values() 
                      for test in tests if test["status"] == "FAIL")
    
    test_results["summary"] = {
        "total_tests": total_tests,
        "passed": passed_tests,
        "failed": failed_tests,
        "success_rate": round((passed_tests / total_tests * 100), 2) if total_tests > 0 else 0,
        "critical_issues": len([p for p in test_results["problems"] if p["priority"] == "CRITICAL"]),
        "high_issues": len([p for p in test_results["problems"] if p["priority"] == "HIGH"]),
        "medium_issues": len([p for p in test_results["problems"] if p["priority"] == "MEDIUM"])
    }
    
    # Salvar relatório JSON detalhado
    with open("admin_test_results.json", "w", encoding="utf-8") as f:
        json.dump(test_results, f, indent=2, ensure_ascii=False)
    
    # Gerar relatório Markdown
    report_md = generate_markdown_report()
    with open("RELATORIO_ADMIN_COMPLETO.md", "w", encoding="utf-8") as f:
        f.write(report_md)
    
    print(f"\n📊 RESUMO DOS TESTES:")
    print(f"Total de testes: {total_tests}")
    print(f"Passou: {passed_tests}")
    print(f"Falhou: {failed_tests}")
    print(f"Taxa de sucesso: {test_results['summary']['success_rate']}%")
    print(f"Problemas críticos: {test_results['summary']['critical_issues']}")
    print(f"Problemas alta prioridade: {test_results['summary']['high_issues']}")

def generate_markdown_report():
    """Gerar relatório em Markdown"""
    summary = test_results["summary"]
    
    report = f"""# RELATÓRIO COMPLETO - ÁREA ADMINISTRATIVA
## Apps de Apostas Brasil

**Data:** {test_results['timestamp'][:19]}  
**URL Testada:** {ADMIN_URL}  
**Status:** Teste Completo Executado  

---

## 📊 RESUMO EXECUTIVO

### Score Geral: {summary['success_rate']}%
- **Total de testes:** {summary['total_tests']}
- **Testes aprovados:** {summary['passed']} ✅
- **Testes falharam:** {summary['failed']} ❌
- **Taxa de sucesso:** {summary['success_rate']}%

### Problemas Identificados
- 🚨 **Críticos:** {summary['critical_issues']}
- 🔴 **Alta prioridade:** {summary['high_issues']}
- 🟡 **Média prioridade:** {summary['medium_issues']}

---

## 🔍 RESULTADOS DETALHADOS DOS TESTES

"""
    
    # Adicionar resultados por categoria
    for category, tests in test_results["admin_tests"].items():
        report += f"\n### {category.replace('_', ' ')}\n\n"
        for test in tests:
            status_emoji = "✅" if test["status"] == "PASS" else "❌" if test["status"] == "FAIL" else "⚠️"
            report += f"- {status_emoji} **{test['test']}:** {test['status']}"
            if test["details"]:
                report += f" - {test['details']}"
            report += "\n"
    
    # Adicionar problemas identificados
    if test_results["problems"]:
        report += "\n## 🚨 PROBLEMAS IDENTIFICADOS\n\n"
        
        for priority in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
            priority_problems = [p for p in test_results["problems"] if p["priority"] == priority]
            if priority_problems:
                priority_emoji = {"CRITICAL": "🚨", "HIGH": "🔴", "MEDIUM": "🟡", "LOW": "🟢"}
                report += f"### {priority_emoji[priority]} {priority} Priority\n\n"
                for problem in priority_problems:
                    report += f"**{problem['category']}:** {problem['description']}\n\n"
    
    # Adicionar melhorias sugeridas
    if test_results["improvements"]:
        report += "\n## 💡 MELHORIAS SUGERIDAS\n\n"
        for improvement in test_results["improvements"]:
            report += f"**{improvement['category']}** ({improvement['impact']} impact): {improvement['description']}\n\n"
    
    # Adicionar screenshots
    if test_results["screenshots"]:
        report += "\n## 📸 EVIDÊNCIAS VISUAIS\n\n"
        for screenshot in test_results["screenshots"]:
            report += f"- `{screenshot}`\n"
    
    report += f"""
---

## 📋 AÇÕES RECOMENDADAS

### Prioridade Imediata (1-3 dias)
1. Corrigir problemas críticos de infraestrutura
2. Restaurar acesso ao admin/CMS
3. Verificar conectividade das APIs

### Prioridade Alta (1 semana)
1. Corrigir problemas de alta prioridade identificados
2. Testar todas as funcionalidades do CMS
3. Verificar integridade dos content types

### Prioridade Média (2-3 semanas)
1. Implementar melhorias de UX identificadas
2. Otimizar performance da área administrativa
3. Adicionar funcionalidades ausentes

---

**Relatório gerado automaticamente via Playwright**  
**Ferramenta:** Claude Code + Playwright  
**Timestamp:** {datetime.now().isoformat()}
"""
    
    return report

async def main():
    """Função principal para executar todos os testes"""
    print("🚀 INICIANDO TESTE COMPLETO DA ÁREA ADMINISTRATIVA")
    print(f"URL: {ADMIN_URL}")
    print(f"Timestamp: {datetime.now()}")
    
    # Criar diretório para screenshots
    os.makedirs("screenshots", exist_ok=True)
    
    # Testar APIs primeiro (sem browser)
    await test_api_endpoints()
    
    async with async_playwright() as p:
        # Usar Chromium em modo não-headless (visível)
        browser = await p.chromium.launch(
            headless=False,  # Modo visível para acompanhar
            slow_mo=1000,   # Slow motion para melhor visualização
            args=['--start-maximized']
        )
        
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        
        page = await context.new_page()
        
        try:
            # Executar testes sequencialmente
            login_success = await test_admin_login(page)
            
            if login_success:
                await test_admin_dashboard(page)
                await test_content_management(page)
                await test_admin_settings(page)
            else:
                add_problem("CRITICAL", "Cannot proceed with admin tests - login failed", "Authentication")
            
        except Exception as e:
            print(f"❌ Erro durante execução dos testes: {str(e)}")
            add_problem("CRITICAL", f"Test execution failed: {str(e)}", "General")
        
        finally:
            await browser.close()
    
    # Gerar relatório final
    await generate_report()
    
    print(f"\n✅ TESTE COMPLETO FINALIZADO!")
    print(f"📋 Relatório: RELATORIO_ADMIN_COMPLETO.md")
    print(f"📁 Dados: admin_test_results.json")
    print(f"📸 Screenshots: screenshots/")

if __name__ == "__main__":
    asyncio.run(main())