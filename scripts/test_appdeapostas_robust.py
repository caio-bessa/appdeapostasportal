#!/usr/bin/env python3
"""
Teste robusto do site https://appdeapostas.com.br usando Playwright
Versão melhorada com melhor tratamento de timeouts e erros
"""

import asyncio
import json
import time
import traceback
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.async_api import async_playwright


class RobustWebsiteTester:
    def __init__(self, base_url="https://appdeapostas.com.br"):
        self.base_url = base_url
        self.results = {
            "timestamp": datetime.now().isoformat(),
            "base_url": base_url,
            "site_status": "unknown",
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
            "recommendations": [],
            "accessibility_issues": [],
            "seo_analysis": {}
        }
        self.visited_urls = set()
        self.screenshots_dir = Path("screenshots")
        self.screenshots_dir.mkdir(exist_ok=True)
        
    async def take_screenshot(self, page, name, description=""):
        """Captura screenshot com tratamento de erro"""
        try:
            screenshot_path = self.screenshots_dir / f"{name}_{int(time.time())}.png"
            await page.screenshot(path=str(screenshot_path), full_page=True, timeout=15000)
            
            screenshot_info = {
                "name": name,
                "path": str(screenshot_path),
                "description": description,
                "timestamp": datetime.now().isoformat(),
                "status": "success"
            }
            self.results["screenshots"].append(screenshot_info)
            print(f"📸 Screenshot capturado: {screenshot_path}")
            return screenshot_path
        except Exception as e:
            screenshot_info = {
                "name": name,
                "description": description,
                "timestamp": datetime.now().isoformat(),
                "status": "failed",
                "error": str(e)
            }
            self.results["screenshots"].append(screenshot_info)
            print(f"❌ Erro ao capturar screenshot {name}: {str(e)}")
            return None

    def is_internal_link(self, url):
        """Verifica se o link é interno ao domínio"""
        if not url:
            return False
        if url.startswith('/'):
            return True
        parsed = urlparse(url)
        base_parsed = urlparse(self.base_url)
        return parsed.netloc == base_parsed.netloc or not parsed.netloc

    async def wait_for_page_ready(self, page, max_wait=60000):
        """Aguarda página estar pronta com múltiplas estratégias"""
        print("⏳ Aguardando página carregar completamente...")
        
        try:
            # Estratégia 1: Aguardar load básico
            await page.wait_for_load_state('load', timeout=15000)
            print("✅ Load básico concluído")
            
            # Estratégia 2: Aguardar um pouco mais por recursos
            await asyncio.sleep(3)
            
            # Estratégia 3: Tentar aguardar network idle (mais curto)
            try:
                await page.wait_for_load_state('networkidle', timeout=10000)
                print("✅ Network idle alcançado")
            except:
                print("⚠️ Network idle timeout - continuando mesmo assim")
                
            # Estratégia 4: Verificar se há conteúdo básico
            await page.wait_for_function(
                "document.body && document.body.innerHTML.length > 100",
                timeout=10000
            )
            print("✅ Conteúdo básico carregado")
            
            return True
            
        except Exception as e:
            print(f"⚠️ Timeout no carregamento: {str(e)}")
            # Tentar continuar mesmo com timeout
            try:
                content = await page.content()
                if len(content) > 500:  # Se temos algum conteúdo, continua
                    print("✅ Conteúdo parcial detectado - continuando")
                    return True
            except:
                pass
            return False

    async def monitor_console_and_errors(self, page):
        """Monitora erros do console e da página"""
        def handle_console(msg):
            if msg.type in ['error', 'warning']:
                self.results["errors"].append({
                    "type": f"console_{msg.type}",
                    "message": msg.text,
                    "timestamp": datetime.now().isoformat(),
                    "location": page.url
                })
                print(f"🚨 Console {msg.type}: {msg.text[:100]}...")

        def handle_page_error(error):
            self.results["errors"].append({
                "type": "javascript_error",
                "message": str(error),
                "timestamp": datetime.now().isoformat(),
                "location": page.url
            })
            print(f"🚨 JavaScript Error: {str(error)[:100]}...")

        page.on("console", handle_console)
        page.on("pageerror", handle_page_error)

    async def basic_site_check(self, page):
        """Verificação básica do site"""
        try:
            title = await page.title()
            url = page.url
            
            # Verificar elementos básicos
            elements_check = await page.evaluate("""
                () => {
                    return {
                        hasHead: !!document.head,
                        hasBody: !!document.body,
                        hasTitle: !!document.title,
                        bodyContent: document.body ? document.body.innerHTML.length : 0,
                        hasMetaViewport: !!document.querySelector('meta[name="viewport"]'),
                        linksCount: document.querySelectorAll('a').length,
                        formsCount: document.querySelectorAll('form').length,
                        imagesCount: document.querySelectorAll('img').length
                    };
                }
            """)
            
            self.results["site_status"] = "accessible"
            self.results["basic_info"] = {
                "title": title,
                "final_url": url,
                "elements": elements_check
            }
            
            print(f"🌐 Site: {title}")
            print(f"📊 Links: {elements_check['linksCount']}, Forms: {elements_check['formsCount']}, Images: {elements_check['imagesCount']}")
            
            return True
            
        except Exception as e:
            print(f"❌ Erro na verificação básica: {str(e)}")
            return False

    async def find_and_test_links(self, page):
        """Encontra e testa links de forma mais robusta"""
        try:
            print("🔍 Buscando todos os links da página...")
            
            links_data = await page.evaluate("""
                () => {
                    const links = Array.from(document.querySelectorAll('a[href]'));
                    return links.map((link, index) => ({
                        index: index,
                        href: link.href,
                        text: link.textContent ? link.textContent.trim().substring(0, 100) : '',
                        title: link.title || '',
                        target: link.target || '',
                        rel: link.rel || '',
                        visible: link.offsetParent !== null
                    }));
                }
            """)
            
            print(f"📊 Total de links encontrados: {len(links_data)}")
            
            # Separar links internos e externos
            internal_links = []
            external_links = []
            
            for link in links_data:
                if self.is_internal_link(link['href']):
                    internal_links.append(link)
                else:
                    external_links.append(link)
            
            print(f"🏠 Links internos: {len(internal_links)}")
            print(f"🌍 Links externos: {len(external_links)}")
            
            # Testar alguns links internos (limitar para não demorar muito)
            links_to_test = internal_links[:10]  # Testar primeiros 10
            
            for i, link in enumerate(links_to_test):
                await self.test_single_link(page, link, i + 1, len(links_to_test))
                await asyncio.sleep(1)  # Pausa entre testes
            
            # Salvar informações dos links
            self.results["internal_links"] = internal_links
            self.results["external_links"] = external_links
            
            return True
            
        except Exception as e:
            print(f"❌ Erro ao buscar links: {str(e)}")
            self.results["errors"].append({
                "type": "link_discovery_error",
                "message": str(e),
                "timestamp": datetime.now().isoformat()
            })
            return False

    async def test_single_link(self, page, link_info, current, total):
        """Testa um link específico"""
        url = link_info['href']
        text = link_info['text']
        
        print(f"🔗 [{current}/{total}] Testando: {text[:50]} -> {url}")
        
        if url in self.visited_urls:
            print("  ↳ Já testado anteriormente")
            return
        
        try:
            # Navegar para o link
            response = await page.goto(url, timeout=15000, wait_until='load')
            
            if response:
                status = response.status
                if status >= 400:
                    self.results["broken_links"].append({
                        "url": url,
                        "text": text,
                        "status_code": status,
                        "error": f"HTTP {status}",
                        "timestamp": datetime.now().isoformat()
                    })
                    print(f"  ❌ Link quebrado: HTTP {status}")
                else:
                    print(f"  ✅ Link OK: HTTP {status}")
                    
            self.visited_urls.add(url)
            
            # Voltar para página inicial
            await page.go_back(timeout=10000)
            await asyncio.sleep(1)
            
        except Exception as e:
            self.results["broken_links"].append({
                "url": url,
                "text": text,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            })
            print(f"  ❌ Erro: {str(e)[:50]}...")
            
            # Tentar voltar para página inicial
            try:
                await page.goto(self.base_url, timeout=10000)
                await asyncio.sleep(1)
            except:
                pass

    async def test_forms_and_inputs(self, page):
        """Testa formulários e campos de entrada"""
        try:
            print("📋 Analisando formulários e campos...")
            
            forms_data = await page.evaluate("""
                () => {
                    const forms = Array.from(document.querySelectorAll('form'));
                    return forms.map((form, index) => ({
                        index: index,
                        action: form.action || window.location.href,
                        method: form.method || 'GET',
                        id: form.id || '',
                        className: form.className || '',
                        fields: Array.from(form.querySelectorAll('input, textarea, select')).map(field => ({
                            tag: field.tagName.toLowerCase(),
                            type: field.type || field.tagName.toLowerCase(),
                            name: field.name || '',
                            id: field.id || '',
                            required: field.required,
                            placeholder: field.placeholder || '',
                            disabled: field.disabled
                        }))
                    }));
                }
            """)
            
            self.results["forms"] = forms_data
            print(f"📋 Formulários encontrados: {len(forms_data)}")
            
            for form in forms_data:
                print(f"  📝 Formulário {form['index']}: {len(form['fields'])} campos")
                
        except Exception as e:
            print(f"❌ Erro ao analisar formulários: {str(e)}")

    async def test_responsive_design(self, page):
        """Testa design responsivo"""
        viewports = [
            {"name": "Mobile", "width": 375, "height": 667},
            {"name": "Tablet", "width": 768, "height": 1024},
            {"name": "Desktop", "width": 1366, "height": 768}
        ]
        
        print("📱 Testando responsividade...")
        
        for viewport in viewports:
            try:
                print(f"  📱 {viewport['name']}: {viewport['width']}x{viewport['height']}")
                
                await page.set_viewport_size(width=viewport["width"], height=viewport["height"])
                await asyncio.sleep(2)  # Aguardar adaptação do layout
                
                # Verificar scroll horizontal
                has_horizontal_scroll = await page.evaluate(
                    "() => document.body.scrollWidth > window.innerWidth"
                )
                
                # Capturar screenshot
                screenshot_path = await self.take_screenshot(
                    page, 
                    f"responsive_{viewport['name'].lower()}", 
                    f"Layout responsivo - {viewport['name']}"
                )
                
                self.results["responsive_tests"][viewport["name"]] = {
                    "viewport": viewport,
                    "has_horizontal_scroll": has_horizontal_scroll,
                    "screenshot": screenshot_path is not None
                }
                
                if has_horizontal_scroll:
                    print(f"    ⚠️ Scroll horizontal detectado")
                else:
                    print(f"    ✅ Layout responsivo OK")
                    
            except Exception as e:
                print(f"    ❌ Erro no teste responsivo {viewport['name']}: {str(e)}")

    async def analyze_seo_basics(self, page):
        """Análise básica de SEO"""
        try:
            print("🔍 Analisando aspectos básicos de SEO...")
            
            seo_data = await page.evaluate("""
                () => {
                    return {
                        title: document.title || '',
                        titleLength: (document.title || '').length,
                        metaDescription: (document.querySelector('meta[name="description"]') || {}).content || '',
                        metaDescriptionLength: ((document.querySelector('meta[name="description"]') || {}).content || '').length,
                        h1Count: document.querySelectorAll('h1').length,
                        h1Text: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()).slice(0, 3),
                        metaViewport: !!document.querySelector('meta[name="viewport"]'),
                        canonicalUrl: (document.querySelector('link[rel="canonical"]') || {}).href || '',
                        imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
                        totalImages: document.querySelectorAll('img').length,
                        linksWithoutTitle: document.querySelectorAll('a[href]:not([title]):not([aria-label])').length,
                        externalLinksNofollow: document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"]):not([rel*="nofollow"])').length
                    };
                }
            """)
            
            self.results["seo_analysis"] = seo_data
            
            print(f"  📝 Título: {seo_data['titleLength']} caracteres")
            print(f"  📝 Meta Description: {seo_data['metaDescriptionLength']} caracteres")
            print(f"  📝 H1 tags: {seo_data['h1Count']}")
            print(f"  🖼️ Imagens sem ALT: {seo_data['imagesWithoutAlt']}/{seo_data['totalImages']}")
            
        except Exception as e:
            print(f"❌ Erro na análise SEO: {str(e)}")

    async def generate_comprehensive_recommendations(self):
        """Gera recomendações abrangentes"""
        recommendations = []
        
        # Análise de links quebrados
        broken_count = len(self.results["broken_links"])
        if broken_count > 0:
            recommendations.append({
                "priority": "HIGH" if broken_count > 3 else "MEDIUM",
                "category": "Navegação",
                "issue": f"{broken_count} links quebrados ou com erro",
                "recommendation": "Corrigir links que retornam erro 404 ou falham ao carregar",
                "impact": "Afeta experiência do usuário e SEO"
            })
        
        # Análise de erros JavaScript
        js_errors = [e for e in self.results["errors"] if "javascript" in e["type"] or "console_error" in e["type"]]
        if js_errors:
            recommendations.append({
                "priority": "HIGH",
                "category": "Funcionalidade",
                "issue": f"{len(js_errors)} erros JavaScript/Console encontrados",
                "recommendation": "Investigar e corrigir erros JavaScript que podem afetar funcionalidades",
                "impact": "Pode quebrar funcionalidades importantes do site"
            })
        
        # Análise SEO
        if "seo_analysis" in self.results:
            seo = self.results["seo_analysis"]
            
            if seo["titleLength"] == 0:
                recommendations.append({
                    "priority": "HIGH",
                    "category": "SEO",
                    "issue": "Página sem título",
                    "recommendation": "Adicionar título descritivo à página",
                    "impact": "Crítico para SEO e usabilidade"
                })
            elif seo["titleLength"] > 60:
                recommendations.append({
                    "priority": "MEDIUM",
                    "category": "SEO",
                    "issue": f"Título muito longo ({seo['titleLength']} caracteres)",
                    "recommendation": "Reduzir título para até 60 caracteres",
                    "impact": "Título pode ser cortado nos resultados de busca"
                })
            
            if seo["metaDescriptionLength"] == 0:
                recommendations.append({
                    "priority": "MEDIUM",
                    "category": "SEO",
                    "issue": "Meta description ausente",
                    "recommendation": "Adicionar meta description de 150-160 caracteres",
                    "impact": "Afeta como a página aparece nos resultados de busca"
                })
            
            if seo["h1Count"] == 0:
                recommendations.append({
                    "priority": "MEDIUM",
                    "category": "SEO",
                    "issue": "Página sem H1",
                    "recommendation": "Adicionar pelo menos um H1 com palavra-chave principal",
                    "impact": "H1 é importante para estrutura e SEO"
                })
            elif seo["h1Count"] > 1:
                recommendations.append({
                    "priority": "LOW",
                    "category": "SEO",
                    "issue": f"Múltiplos H1 ({seo['h1Count']})",
                    "recommendation": "Usar apenas um H1 por página",
                    "impact": "Pode diluir relevância SEO"
                })
            
            if seo["imagesWithoutAlt"] > 0:
                recommendations.append({
                    "priority": "MEDIUM",
                    "category": "Acessibilidade/SEO",
                    "issue": f"{seo['imagesWithoutAlt']} imagens sem texto alternativo",
                    "recommendation": "Adicionar atributo ALT em todas as imagens",
                    "impact": "Afeta acessibilidade e SEO de imagens"
                })
        
        # Análise de responsividade
        responsive_issues = [name for name, test in self.results["responsive_tests"].items() 
                           if test.get("has_horizontal_scroll")]
        if responsive_issues:
            recommendations.append({
                "priority": "MEDIUM",
                "category": "Design Responsivo",
                "issue": f"Scroll horizontal em: {', '.join(responsive_issues)}",
                "recommendation": "Ajustar CSS para evitar scroll horizontal indevido",
                "impact": "Prejudica experiência em dispositivos móveis"
            })
        
        self.results["recommendations"] = recommendations

    async def run_comprehensive_test(self):
        """Executa teste completo e robusto"""
        print("🎭 TESTE ABRANGENTE - VERSÃO ROBUSTA")
        print("🚀 Iniciando análise completa de https://appdeapostas.com.br")
        print("=" * 70)
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=False,
                slow_mo=500,
                args=[
                    '--start-maximized',
                    '--disable-blink-features=AutomationControlled',
                    '--disable-dev-shm-usage',
                    '--no-sandbox'
                ]
            )
            
            context = await browser.new_context(
                viewport={'width': 1366, 'height': 768},
                user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            )
            
            page = await context.new_page()
            await self.monitor_console_and_errors(page)
            
            try:
                print("1️⃣ Navegando para página principal...")
                response = await page.goto(self.base_url, timeout=20000)
                
                if response:
                    print(f"📡 Status HTTP: {response.status}")
                    if response.status >= 400:
                        print(f"❌ Erro HTTP: {response.status}")
                        self.results["site_status"] = "http_error"
                        await browser.close()
                        return
                
                print("2️⃣ Aguardando página carregar...")
                page_ready = await self.wait_for_page_ready(page)
                
                if not page_ready:
                    print("⚠️ Página não carregou completamente, mas continuando...")
                
                print("3️⃣ Capturando screenshot inicial...")
                await self.take_screenshot(page, "homepage", "Página principal do site")
                
                print("4️⃣ Verificação básica do site...")
                await self.basic_site_check(page)
                
                print("5️⃣ Analisando e testando links...")
                await self.find_and_test_links(page)
                
                print("6️⃣ Analisando formulários...")
                await self.test_forms_and_inputs(page)
                
                print("7️⃣ Testando responsividade...")
                await self.test_responsive_design(page)
                
                print("8️⃣ Análise básica de SEO...")
                await self.analyze_seo_basics(page)
                
                print("9️⃣ Gerando recomendações...")
                await self.generate_comprehensive_recommendations()
                
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
        
        await self.save_results()
        self.print_comprehensive_summary()

    async def save_results(self):
        """Salva resultados detalhados"""
        results_file = Path("test_results_detailed.json")
        
        with open(results_file, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Resultados salvos em: {results_file}")

    def print_comprehensive_summary(self):
        """Imprime resumo abrangente"""
        print("\n" + "="*70)
        print("📋 RELATÓRIO ABRANGENTE DE TESTES")
        print("="*70)
        
        print(f"🌐 Site testado: {self.base_url}")
        print(f"📅 Data/hora: {self.results['timestamp']}")
        print(f"🟢 Status do site: {self.results['site_status']}")
        
        if "basic_info" in self.results:
            info = self.results["basic_info"]
            print(f"📝 Título: {info['title']}")
            print(f"📊 Elementos: {info['elements']['linksCount']} links, {info['elements']['formsCount']} forms, {info['elements']['imagesCount']} imgs")
        
        print(f"\n🔗 NAVEGAÇÃO:")
        print(f"  ✅ Links internos: {len(self.results['internal_links'])}")
        print(f"  🌍 Links externos: {len(self.results['external_links'])}")
        print(f"  ❌ Links quebrados: {len(self.results['broken_links'])}")
        
        if self.results["broken_links"]:
            print(f"\n💥 LINKS COM PROBLEMA:")
            for link in self.results["broken_links"][:5]:
                error = link.get('error', f"HTTP {link.get('status_code', 'N/A')}")
                print(f"  🔴 {link['url'][:60]}... - {error}")
            if len(self.results["broken_links"]) > 5:
                print(f"  ... e mais {len(self.results['broken_links']) - 5} links")
        
        print(f"\n📋 FORMULÁRIOS: {len(self.results['forms'])}")
        for i, form in enumerate(self.results['forms']):
            print(f"  📝 Form {i+1}: {len(form['fields'])} campos")
        
        print(f"\n🎯 RESPONSIVIDADE:")
        for device, test in self.results["responsive_tests"].items():
            scroll_status = "⚠️ Com scroll horizontal" if test["has_horizontal_scroll"] else "✅ OK"
            print(f"  📱 {device}: {scroll_status}")
        
        if "seo_analysis" in self.results:
            seo = self.results["seo_analysis"]
            print(f"\n🔍 ANÁLISE SEO:")
            print(f"  📝 Título: {seo['titleLength']} chars")
            print(f"  📝 Meta Description: {seo['metaDescriptionLength']} chars")
            print(f"  📝 H1 tags: {seo['h1Count']}")
            print(f"  🖼️ Imgs sem ALT: {seo['imagesWithoutAlt']}/{seo['totalImages']}")
        
        print(f"\n❌ ERROS ENCONTRADOS: {len(self.results['errors'])}")
        error_types = {}
        for error in self.results['errors']:
            error_type = error['type']
            error_types[error_type] = error_types.get(error_type, 0) + 1
        
        for error_type, count in error_types.items():
            print(f"  🔴 {error_type}: {count}")
        
        print(f"\n📸 SCREENSHOTS CAPTURADOS: {len([s for s in self.results['screenshots'] if s.get('status') == 'success'])}")
        
        if self.results["recommendations"]:
            print(f"\n💡 RECOMENDAÇÕES PRIORITÁRIAS:")
            high_priority = [r for r in self.results["recommendations"] if r["priority"] == "HIGH"]
            medium_priority = [r for r in self.results["recommendations"] if r["priority"] == "MEDIUM"]
            
            for rec in high_priority:
                print(f"  🔴 [ALTA] {rec['category']}: {rec['issue']}")
                print(f"       💡 {rec['recommendation']}")
                print(f"       📈 {rec['impact']}\n")
            
            for rec in medium_priority[:3]:  # Mostrar só as 3 primeiras médias
                print(f"  🟡 [MÉDIA] {rec['category']}: {rec['issue']}")
                print(f"       💡 {rec['recommendation']}\n")
        
        print(f"\n📁 ARQUIVOS GERADOS:")
        print(f"  • test_results_detailed.json - Resultados completos")
        print(f"  • screenshots/ - Capturas de tela ({len(self.results['screenshots'])} arquivos)")
        
        print("\n" + "="*70)


async def main():
    """Execução principal"""
    print("🎭 PLAYWRIGHT - TESTE ABRANGENTE E ROBUSTO")
    print("Versão melhorada com tratamento de timeouts e análise detalhada")
    print("O navegador será aberto em modo visível para acompanhamento.\n")
    
    tester = RobustWebsiteTester("https://appdeapostas.com.br")
    await tester.run_comprehensive_test()


if __name__ == "__main__":
    asyncio.run(main())