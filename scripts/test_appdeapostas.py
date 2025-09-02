#!/usr/bin/env python3
"""
Teste abrangente do site https://appdeapostas.com.br usando Playwright
"""

import asyncio
import json
import time
import traceback
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.async_api import async_playwright


class WebsiteTester:
    def __init__(self, base_url="https://appdeapostas.com.br"):
        self.base_url = base_url
        self.results = {
            "timestamp": datetime.now().isoformat(),
            "base_url": base_url,
            "navigation_map": {},
            "internal_links": [],
            "external_links": [],
            "broken_links": [],
            "forms": [],
            "interactive_elements": [],
            "performance": {},
            "errors": [],
            "screenshots": [],
            "responsive_tests": {},
            "api_tests": [],
            "recommendations": []
        }
        self.visited_urls = set()
        self.screenshots_dir = Path("screenshots")
        self.screenshots_dir.mkdir(exist_ok=True)
        
    async def take_screenshot(self, page, name, description=""):
        """Captura screenshot e salva na pasta"""
        screenshot_path = self.screenshots_dir / f"{name}_{int(time.time())}.png"
        await page.screenshot(path=str(screenshot_path), full_page=True)
        
        screenshot_info = {
            "name": name,
            "path": str(screenshot_path),
            "description": description,
            "timestamp": datetime.now().isoformat()
        }
        self.results["screenshots"].append(screenshot_info)
        print(f"📸 Screenshot capturado: {screenshot_path}")
        return screenshot_path

    def is_internal_link(self, url):
        """Verifica se o link é interno ao domínio"""
        if not url:
            return False
        if url.startswith('/'):
            return True
        parsed = urlparse(url)
        base_parsed = urlparse(self.base_url)
        return parsed.netloc == base_parsed.netloc or not parsed.netloc

    async def monitor_console_errors(self, page):
        """Monitora erros do console"""
        page.on("console", lambda msg: self.log_console_message(msg))
        page.on("pageerror", lambda error: self.results["errors"].append({
            "type": "javascript_error",
            "message": str(error),
            "timestamp": datetime.now().isoformat()
        }))
        
    def log_console_message(self, msg):
        """Log mensagens do console"""
        if msg.type in ['error', 'warning']:
            self.results["errors"].append({
                "type": f"console_{msg.type}",
                "message": msg.text,
                "timestamp": datetime.now().isoformat()
            })

    async def test_page_performance(self, page, url):
        """Testa performance da página"""
        start_time = time.time()
        
        # Aguardar carregamento completo
        await page.wait_for_load_state('networkidle', timeout=30000)
        
        load_time = time.time() - start_time
        
        # Obter métricas de performance
        performance_metrics = await page.evaluate("""
            () => {
                const navigation = performance.getEntriesByType('navigation')[0];
                return {
                    loadEventEnd: navigation.loadEventEnd,
                    domContentLoaded: navigation.domContentLoadedEventEnd,
                    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || null,
                    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || null
                };
            }
        """)
        
        self.results["performance"][url] = {
            "total_load_time": load_time,
            "metrics": performance_metrics,
            "timestamp": datetime.now().isoformat()
        }
        
        print(f"⏱️ Performance {url}: {load_time:.2f}s")

    async def find_all_links(self, page):
        """Encontra todos os links na página"""
        links = await page.evaluate("""
            () => {
                const links = Array.from(document.querySelectorAll('a[href]'));
                return links.map(link => ({
                    href: link.href,
                    text: link.textContent.trim(),
                    title: link.title || '',
                    target: link.target || '',
                    rel: link.rel || ''
                }));
            }
        """)
        
        return links

    async def test_link(self, page, link_info, context):
        """Testa um link específico"""
        url = link_info["href"]
        text = link_info["text"]
        
        if not self.is_internal_link(url):
            self.results["external_links"].append({
                "url": url,
                "text": text,
                "status": "external"
            })
            return
            
        # Normalizar URL interna
        if url.startswith('/'):
            full_url = urljoin(self.base_url, url)
        else:
            full_url = url
            
        if full_url in self.visited_urls:
            return
            
        print(f"🔗 Testando link: {text} -> {full_url}")
        
        try:
            # Criar nova página para testar o link
            test_page = await context.new_page()
            await self.monitor_console_errors(test_page)
            
            response = await test_page.goto(full_url, timeout=30000)
            
            if response and response.status >= 400:
                self.results["broken_links"].append({
                    "url": full_url,
                    "text": text,
                    "status_code": response.status,
                    "error": f"HTTP {response.status}"
                })
                print(f"❌ Link quebrado: {full_url} (HTTP {response.status})")
            else:
                self.results["internal_links"].append({
                    "url": full_url,
                    "text": text,
                    "status": "working",
                    "status_code": response.status if response else None
                })
                print(f"✅ Link funcionando: {full_url}")
                
            await test_page.close()
            self.visited_urls.add(full_url)
            
        except Exception as e:
            self.results["broken_links"].append({
                "url": full_url,
                "text": text,
                "error": str(e)
            })
            print(f"❌ Erro ao testar link {full_url}: {str(e)}")

    async def test_forms(self, page):
        """Testa formulários na página"""
        forms = await page.evaluate("""
            () => {
                const forms = Array.from(document.querySelectorAll('form'));
                return forms.map((form, index) => ({
                    index: index,
                    action: form.action || '',
                    method: form.method || 'GET',
                    fields: Array.from(form.querySelectorAll('input, textarea, select')).map(field => ({
                        name: field.name || '',
                        type: field.type || field.tagName.toLowerCase(),
                        id: field.id || '',
                        required: field.required || false,
                        placeholder: field.placeholder || ''
                    }))
                }));
            }
        """)
        
        for form in forms:
            self.results["forms"].append(form)
            print(f"📋 Formulário encontrado: {len(form['fields'])} campos")

    async def test_interactive_elements(self, page):
        """Testa elementos interativos"""
        elements = await page.evaluate("""
            () => {
                const selectors = [
                    'button',
                    'input[type="button"]',
                    'input[type="submit"]',
                    '[onclick]',
                    '[role="button"]',
                    '.btn',
                    '.button'
                ];
                
                let interactive = [];
                selectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach((el, index) => {
                        interactive.push({
                            type: el.tagName.toLowerCase(),
                            text: el.textContent.trim(),
                            id: el.id || '',
                            class: el.className || '',
                            selector: selector
                        });
                    });
                });
                
                return interactive;
            }
        """)
        
        self.results["interactive_elements"].extend(elements)
        print(f"🎯 Elementos interativos encontrados: {len(elements)}")

    async def test_responsive_design(self, page):
        """Testa design responsivo"""
        viewports = [
            {"name": "Mobile", "width": 375, "height": 667},
            {"name": "Tablet", "width": 768, "height": 1024},
            {"name": "Desktop", "width": 1920, "height": 1080}
        ]
        
        for viewport in viewports:
            print(f"📱 Testando viewport: {viewport['name']} ({viewport['width']}x{viewport['height']})")
            
            await page.set_viewport_size(
                width=viewport["width"], 
                height=viewport["height"]
            )
            
            # Aguardar layout se estabilizar
            await page.wait_for_timeout(2000)
            
            # Capturar screenshot
            await self.take_screenshot(
                page, 
                f"responsive_{viewport['name'].lower()}", 
                f"Layout em {viewport['name']}"
            )
            
            # Verificar se há scroll horizontal indevido
            has_horizontal_scroll = await page.evaluate("""
                () => document.body.scrollWidth > window.innerWidth
            """)
            
            self.results["responsive_tests"][viewport["name"]] = {
                "viewport": viewport,
                "has_horizontal_scroll": has_horizontal_scroll,
                "screenshot": f"responsive_{viewport['name'].lower()}"
            }
            
            if has_horizontal_scroll:
                print(f"⚠️ Scroll horizontal detectado em {viewport['name']}")

    async def test_api_calls(self, page):
        """Monitora chamadas de API"""
        api_calls = []
        
        def handle_response(response):
            url = response.url
            if any(api_indicator in url for api_indicator in ['/api/', '/wp-json/', '.json', '/ajax']):
                api_calls.append({
                    "url": url,
                    "status": response.status,
                    "method": response.request.method,
                    "timestamp": datetime.now().isoformat()
                })
                print(f"🌐 API chamada: {response.request.method} {url} -> {response.status}")
        
        page.on("response", handle_response)
        
        # Aguardar um tempo para capturar chamadas de API
        await page.wait_for_timeout(5000)
        
        self.results["api_tests"] = api_calls

    async def run_comprehensive_test(self):
        """Executa o teste completo do site"""
        print(f"🚀 Iniciando teste abrangente de {self.base_url}")
        print("=" * 60)
        
        async with async_playwright() as p:
            # Usar Chromium em modo visível (não-headless)
            browser = await p.chromium.launch(
                headless=False,  # Modo visível
                slow_mo=1000,    # Desacelerar para visualização
                args=[
                    '--start-maximized',
                    '--disable-blink-features=AutomationControlled'
                ]
            )
            
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            )
            
            page = await context.new_page()
            await self.monitor_console_errors(page)
            
            try:
                print("1️⃣ Navegando para página principal...")
                await page.goto(self.base_url, timeout=30000)
                await self.test_page_performance(page, self.base_url)
                
                # Screenshot da página principal
                await self.take_screenshot(page, "homepage", "Página principal do site")
                
                print("2️⃣ Mapeando estrutura de navegação...")
                all_links = await self.find_all_links(page)
                print(f"📊 Total de links encontrados: {len(all_links)}")
                
                print("3️⃣ Testando formulários...")
                await self.test_forms(page)
                
                print("4️⃣ Testando elementos interativos...")
                await self.test_interactive_elements(page)
                
                print("5️⃣ Monitorando chamadas de API...")
                await self.test_api_calls(page)
                
                print("6️⃣ Testando design responsivo...")
                await self.test_responsive_design(page)
                
                print("7️⃣ Testando todos os links internos...")
                for i, link in enumerate(all_links):
                    if i > 20:  # Limitar para evitar teste excessivamente longo
                        print(f"⚠️ Limitando teste a primeiros 20 links para demonstração")
                        break
                    await self.test_link(page, link, context)
                    await asyncio.sleep(1)  # Pausa entre testes
                
            except Exception as e:
                error_info = {
                    "type": "critical_error",
                    "message": str(e),
                    "traceback": traceback.format_exc(),
                    "timestamp": datetime.now().isoformat()
                }
                self.results["errors"].append(error_info)
                print(f"❌ Erro crítico: {str(e)}")
                
            finally:
                await browser.close()
        
        await self.generate_recommendations()
        await self.save_results()
        
    async def generate_recommendations(self):
        """Gera recomendações baseadas nos resultados"""
        recommendations = []
        
        # Analisar links quebrados
        if self.results["broken_links"]:
            recommendations.append({
                "priority": "HIGH",
                "category": "Navegação",
                "issue": f"{len(self.results['broken_links'])} links quebrados encontrados",
                "recommendation": "Corrigir ou remover os links que retornam erro 404 ou falham ao carregar"
            })
        
        # Analisar performance
        slow_pages = [url for url, perf in self.results["performance"].items() 
                     if perf["total_load_time"] > 3]
        if slow_pages:
            recommendations.append({
                "priority": "MEDIUM",
                "category": "Performance",
                "issue": f"{len(slow_pages)} páginas com carregamento lento (>3s)",
                "recommendation": "Otimizar recursos, implementar cache e comprimir imagens"
            })
        
        # Analisar erros JavaScript
        js_errors = [e for e in self.results["errors"] if "javascript" in e["type"]]
        if js_errors:
            recommendations.append({
                "priority": "HIGH",
                "category": "Funcionalidade",
                "issue": f"{len(js_errors)} erros JavaScript encontrados",
                "recommendation": "Corrigir erros de JavaScript que podem afetar a funcionalidade"
            })
        
        # Analisar responsividade
        responsive_issues = [name for name, test in self.results["responsive_tests"].items() 
                           if test["has_horizontal_scroll"]]
        if responsive_issues:
            recommendations.append({
                "priority": "MEDIUM",
                "category": "Design Responsivo",
                "issue": f"Scroll horizontal em: {', '.join(responsive_issues)}",
                "recommendation": "Ajustar CSS para evitar scroll horizontal indevido"
            })
        
        self.results["recommendations"] = recommendations
        
    async def save_results(self):
        """Salva os resultados em arquivo JSON"""
        results_file = Path("test_results.json")
        
        with open(results_file, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Resultados salvos em: {results_file}")
        return results_file

    def print_summary(self):
        """Imprime resumo dos resultados"""
        print("\n" + "="*60)
        print("📋 RESUMO DOS TESTES")
        print("="*60)
        
        print(f"🌐 Site testado: {self.base_url}")
        print(f"📅 Data/hora: {self.results['timestamp']}")
        
        print(f"\n🔗 LINKS:")
        print(f"  • Links internos funcionando: {len(self.results['internal_links'])}")
        print(f"  • Links externos: {len(self.results['external_links'])}")
        print(f"  • Links quebrados: {len(self.results['broken_links'])}")
        
        if self.results["broken_links"]:
            print(f"\n❌ LINKS QUEBRADOS:")
            for link in self.results["broken_links"][:5]:  # Mostrar apenas os primeiros 5
                print(f"  • {link['url']} - {link.get('error', link.get('status_code', 'Erro desconhecido'))}")
        
        print(f"\n📋 FORMULÁRIOS: {len(self.results['forms'])}")
        print(f"🎯 ELEMENTOS INTERATIVOS: {len(self.results['interactive_elements'])}")
        print(f"🌐 CHAMADAS DE API: {len(self.results['api_tests'])}")
        print(f"❌ ERROS ENCONTRADOS: {len(self.results['errors'])}")
        
        if self.results["recommendations"]:
            print(f"\n💡 RECOMENDAÇÕES:")
            for rec in self.results["recommendations"]:
                print(f"  [{rec['priority']}] {rec['category']}: {rec['issue']}")


async def main():
    """Função principal"""
    tester = WebsiteTester("https://appdeapostas.com.br")
    
    print("🎭 Executando teste com Playwright - Chromium Visível")
    print("Você poderá acompanhar os testes na janela do navegador que será aberta.\n")
    
    await tester.run_comprehensive_test()
    tester.print_summary()
    
    print(f"\n📁 Verifique os arquivos gerados:")
    print(f"  • test_results.json - Resultados detalhados")
    print(f"  • screenshots/ - Capturas de tela")


if __name__ == "__main__":
    asyncio.run(main())