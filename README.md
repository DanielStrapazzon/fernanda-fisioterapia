# Fernanda Strapazzon · Fisioterapia Domiciliar

Site da fisioterapeuta Fernanda Strapazzon, que atende em casa em Serra Alta, Saltinho e Modelo (SC).

**Acesse:** https://danielstrapazzon.github.io/fernanda-fisioterapia/

## Estrutura

| Pasta/arquivo | Conteúdo |
|---|---|
| `index.html` | Página e textos. Os dados (cômodos, regiões do corpo, dúvidas, WhatsApp) ficam no bloco `<script type="text/x-dc">` no fim do arquivo |
| `css/` | Estilos (`site.css`) e declaração das fontes (`fonts.css`) |
| `fonts/` | Fraunces, Geist Mono e Instrument Sans, sob a [SIL Open Font License](fonts/OFL.txt) |
| `img/` | Foto e ícone |
| `js/` | React 18 e o runtime que monta as partes interativas |

## Rodar localmente

Dê dois cliques em `iniciar-site.bat` (Windows, requer Node.js) ou rode:

```
npx serve .
```

Abra http://localhost:3000. Abrir o `index.html` direto pelo arquivo pode não carregar as partes interativas.

## Publicação

Hospedado no GitHub Pages a partir da branch `main`. Cada alteração enviada aparece no site em cerca de 1 minuto.
