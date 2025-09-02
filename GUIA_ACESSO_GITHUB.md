# Guia de Acesso GitHub - AppdeApostas Portal

## 🔐 Configuração de Autenticação

Para conectar e fazer push para o repositório `git@github.com:caio-bessa/appdeapostasportal.git`, você tem duas opções:

### Opção 1: SSH Key (Recomendado)

**1. Verificar se já tem chave SSH:**
```bash
ls ~/.ssh/
```

**2. Se não tiver, gerar nova chave:**
```bash
ssh-keygen -t ed25519 -C "caio.bessa@acroud.media"
# Pressione Enter 3x (usar padrões)
```

**3. Adicionar chave ao SSH agent:**
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**4. Copiar chave pública:**
```bash
cat ~/.ssh/id_ed25519.pub
```

**5. Adicionar no GitHub:**
- Vá em: GitHub → Settings → SSH and GPG keys → New SSH key
- Cole a chave pública
- Salve como "AppdeApostas Development"

**6. Testar conexão:**
```bash
ssh -T git@github.com
```

### Opção 2: HTTPS com Token

**1. Criar Personal Access Token:**
- GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Gerar novo token com permissões: `repo`, `workflow`, `write:packages`

**2. Configurar remote para HTTPS:**
```bash
cd /Users/caiobessa/appdeapostas-github
git remote set-url origin https://github.com/caio-bessa/appdeapostasportal.git
```

**3. Fazer push (será solicitado usuário/token):**
```bash
git push -u origin main
# Usuário: caio-bessa (ou seu username GitHub)
# Senha: [seu_personal_access_token]
```

## 🚀 Push Inicial

Após configurar autenticação:

```bash
cd /Users/caiobessa/appdeapostas-github
git push -u origin main
```

## 📋 Status Atual

- ✅ Repositório local criado
- ✅ 52 arquivos commitados
- ✅ Remote configurado
- 🔄 **Pendente:** Push para GitHub (aguardando autenticação)

## 🔧 Comandos Úteis

**Ver status do repositório:**
```bash
git status
git log --oneline
```

**Ver remote configurado:**
```bash
git remote -v
```

**Verificar arquivos staged:**
```bash
git ls-files
```

## 📞 Suporte

Se encontrar problemas:
1. Verificar conexão de rede
2. Confirmar permissões do repositório GitHub
3. Testar autenticação SSH/HTTPS separadamente
4. Verificar se o repositório existe e está acessível

---

**Próximo passo:** Escolher método de autenticação e executar push inicial.