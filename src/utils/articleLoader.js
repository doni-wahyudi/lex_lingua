// Simple frontmatter parser - no Node.js dependencies needed
function parseFrontmatter(content) {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(fmRegex);
  if (!match) return { data: {}, content };

  const frontmatterStr = match[1];
  const body = match[2];
  const data = {};

  let currentKey = null;
  let currentArray = null;

  frontmatterStr.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Array item
    if (trimmed.startsWith('- ') && currentKey && currentArray !== null) {
      let val = trimmed.slice(2).trim();
      val = val.replace(/^["']|["']$/g, '');
      data[currentKey].push(val);
      return;
    }

    // Key-value pair
    const kvMatch = trimmed.match(/^(\w[\w_]*)\s*:\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      let value = kvMatch[2].trim();

      if (value === '') {
        // Could be start of array or empty value
        currentKey = key;
        currentArray = true;
        data[key] = [];
        return;
      }

      currentArray = null;
      currentKey = key;

      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');

      // Parse numbers
      if (/^\d+$/.test(value)) {
        data[key] = parseInt(value, 10);
      } else if (/^\d+\.\d+$/.test(value)) {
        data[key] = parseFloat(value);
      } else if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array
        data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      } else {
        data[key] = value;
      }
    }
  });

  return { data, content: body };
}

// Import all markdown files from the articles directory at build time
const articleFiles = import.meta.glob('/src/data/articles/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllArticles() {
  const articles = Object.entries(articleFiles).map(([path, content]) => {
    const { data, content: body } = parseFrontmatter(content);
    const filename = path.split('/').pop().replace('.md', '');
    return {
      slug: data.slug || filename,
      frontmatter: data,
      content: body
    };
  });

  return articles.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export function getArticleBySlug(slug) {
  return getAllArticles().find(a => a.slug === slug) || null;
}

export function getArticlesByCategory(category) {
  if (!category || category === 'all') return getAllArticles();
  return getAllArticles().filter(a =>
    a.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedArticles(currentSlug, limit = 3) {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];
  const all = getAllArticles().filter(a => a.slug !== currentSlug);
  const sameCategory = all.filter(a => a.frontmatter.category === current.frontmatter.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  return [...sameCategory, ...all.filter(a => a.frontmatter.category !== current.frontmatter.category)].slice(0, limit);
}

export function getCategories() {
  const articles = getAllArticles();
  const cats = new Set(articles.map(a => a.frontmatter.category).filter(Boolean));
  return ['all', ...Array.from(cats)];
}
