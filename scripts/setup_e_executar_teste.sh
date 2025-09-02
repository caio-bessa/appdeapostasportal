#!/bin/bash

# SETUP E EXECUÇÃO COMPLETA - TESTE ADMIN APPDEAPOSTAS
# ===================================================
# 
# Este script instala todas as dependências necessárias e executa
# o teste completo da área administrativa do AppdeApostas.com.br
#
# Uso: ./setup_e_executar_teste.sh

echo "🚀 SETUP COMPLETO - TESTE ADMIN APPDEAPOSTAS"
echo "============================================="
echo ""

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não encontrado. Por favor, instale Python 3.8 ou superior."
    exit 1
fi

echo "✅ Python encontrado: $(python3 --version)"

# Verificar se pip está instalado
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 não encontrado. Instalando pip..."
    python3 -m ensurepip --upgrade
fi

echo "✅ pip encontrado: $(pip3 --version)"

# Criar ambiente virtual se não existir
if [ ! -d "venv" ]; then
    echo "🔨 Criando ambiente virtual..."
    python3 -m venv venv
else
    echo "✅ Ambiente virtual já existe"
fi

# Ativar ambiente virtual
echo "🔌 Ativando ambiente virtual..."
source venv/bin/activate

# Instalar dependências
echo "📦 Instalando dependências necessárias..."
pip install --upgrade pip

# Instalar Playwright e requests
pip install playwright requests

# Instalar browsers do Playwright
echo "🌐 Instalando browsers Playwright (pode demorar alguns minutos)..."
playwright install chromium

# Verificar instalação
echo ""
echo "🔍 VERIFICANDO INSTALAÇÃO:"
python3 -c "
try:
    import playwright
    import requests
    print('✅ Playwright instalado:', playwright.__version__)
    print('✅ Requests instalado')
    print('✅ Todas as dependências prontas!')
except ImportError as e:
    print('❌ Erro na importação:', e)
    exit(1)
"

echo ""
echo "📋 INFORMAÇÕES DO TESTE:"
echo "- URL Admin: https://appdeapostas.com.br/admin"
echo "- Email: caio.bessa@acroud.media"
echo "- Modo: Chromium visível (você pode acompanhar)"
echo "- Screenshots serão salvos em: screenshots/"
echo "- Relatório final: RELATORIO_ADMIN_COMPLETO.md"
echo ""

read -p "🚀 Deseja executar o teste agora? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🎯 EXECUTANDO TESTE COMPLETO..."
    echo "=================================================="
    echo ""
    echo "⚠️  IMPORTANTE:"
    echo "- Uma janela do Chrome será aberta (modo visível)"
    echo "- NÃO feche a janela durante o teste"
    echo "- O teste pode demorar alguns minutos"
    echo "- Acompanhe o progresso no terminal e no navegador"
    echo ""
    
    # Executar o teste
    python3 test_admin_completo.py
    
    echo ""
    echo "✅ TESTE FINALIZADO!"
    echo ""
    echo "📁 ARQUIVOS GERADOS:"
    if [ -f "RELATORIO_ADMIN_COMPLETO.md" ]; then
        echo "✅ RELATORIO_ADMIN_COMPLETO.md"
    fi
    if [ -f "admin_test_results.json" ]; then
        echo "✅ admin_test_results.json"
    fi
    if [ -d "screenshots" ]; then
        echo "✅ screenshots/ ($(ls -1 screenshots/ 2>/dev/null | wc -l) arquivos)"
    fi
    
    echo ""
    echo "📖 Para ver o relatório detalhado:"
    echo "   cat RELATORIO_ADMIN_COMPLETO.md"
    echo ""
    echo "🖼️  Para ver as capturas de tela:"
    echo "   open screenshots/"
    
else
    echo ""
    echo "ℹ️  Para executar o teste manualmente:"
    echo "   source venv/bin/activate"
    echo "   python3 test_admin_completo.py"
fi

echo ""
echo "🎉 Setup completo finalizado!"