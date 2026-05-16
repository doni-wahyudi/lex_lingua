import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { getAllArticles, getCategories } from '../utils/articleLoader';
import { FaClock, FaSearch } from 'react-icons/fa';
import './Blog.css';

export default function Blog() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const articles = useMemo(() => getAllArticles(), []);
  const categories = useMemo(() => getCategories(), []);

  const filtered = useMemo(() => {
    let result = articles;
    if (activeCategory !== 'all') {
      result = result.filter(a => a.frontmatter.category?.toLowerCase() === activeCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.frontmatter.title?.toLowerCase().includes(q) ||
        a.frontmatter.excerpt?.toLowerCase().includes(q) ||
        (a.frontmatter.tags || []).some(tag => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [articles, activeCategory, searchQuery]);

  return (
    <main id="blog-page">
      <section className="page-hero section-dark">
        <div className="container">
          <h1>{t('blog_page.title')}</h1>
          <p>{t('blog_page.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-controls">
            <div className="blog-categories">
              {categories.map(cat => (
                <button key={cat} className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}>
                  {cat === 'all' ? t('blog_page.all') : cat}
                </button>
              ))}
            </div>
            <div className="blog-search">
              <FaSearch />
              <input type="text" placeholder={t('blog_page.search_placeholder')} value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="no-results">{t('blog_page.no_results')}</p>
          ) : (
            <div className="blog-grid">
              {filtered.map(article => {
                const fm = article.frontmatter;
                const title = language === 'en' && fm.title_en ? fm.title_en : fm.title;
                const excerpt = language === 'en' && fm.excerpt_en ? fm.excerpt_en : fm.excerpt;
                return (
                  <Link to={`/blog/${article.slug}`} key={article.slug} className="article-card light-card">
                    {fm.coverImage && (
                      <div className="article-card-img" style={{ backgroundImage: `url(${fm.coverImage})` }}>
                        {fm.category && <span className="article-category">{fm.category}</span>}
                      </div>
                    )}
                    <div className="article-card-content">
                      <h3>{title}</h3>
                      <p>{excerpt}</p>
                      <div className="article-meta">
                        <span className="article-date">{new Date(fm.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="article-read-time"><FaClock /> {fm.readingTime} {t('blog_page.read_time')}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
