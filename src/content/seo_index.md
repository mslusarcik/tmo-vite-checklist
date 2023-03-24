## Jak na to?

Indexace předává vyhledávačům informaci, jestli má být stránka dohledatelná nebo ne.

Výchozím nastavením je indexace zapnutá. Pokud tedy nespecifikujeme, jestli se má stránka zobrazovat ve vyhledávači, pak se zobrazovat automaticky bude. To může být problém u skrytých nabídek nebo při přípravě testovacích stránek.

Standardně používáme dvě nastavení:

1. index/noindex - jak název napovídá, jde o indexaci (dohledatelné/nedohledatelné) **ve všech externích vyhledávačích** (google, seznam, bing...)
1. none - tímto nastavením říkáme, že chceme, aby se stránka **nezobrazovala v interním vyhledávači**

## Kde se popisek nastavuje?

### Liferay

Podobně jako u titulku nebo popisku se indexace vyplňuje pod záložkou "SEO". Pokud není indexace vyplněná, google a všechny ostatní vyhledávače si automaticky stránku do vyhledávání zařadí. V případě, že chcete stránku skrýt, je dobré nastavit také vyřazení ze sitemapy, které je na stejné záložce.

### OneShop

Na OS zatím takovou funkci nemáme. Jediným nastavením je tedy zobrazení v sitemapě, které si vyhledávače pravidelně procházejí. V případě, že chceme před vyhledávačem stránku skrýt, vyřadíme stránku ze sitemapy a modlíme se, aby na ni nenarazil nikde jinde.
