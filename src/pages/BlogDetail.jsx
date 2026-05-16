import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { getArticleBySlug, getRelatedArticles } from '../utils/articleLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaClock, FaArrowLeft, FaWhatsapp, FaUser, FaCalendarAlt } from 'react-icons/fa';
import './BlogDetail.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const { openContactModal } = useModal();
  const article = useMemo(() => getArticleBySlug(slug), [slug]);
  const related = useMemo(() => getRelatedArticles(slug, 3), [slug]);

  if (!article) {
    return (
      <main className="blog-detail-page">
        <section className="page-hero section-dark"><div className="container"><h1>404</h1><p>{t('blog_page.no_results')}</p></div></section>
        <section className="section"><div className="container"><Link to="/blog" className="btn btn-outline"><FaArrowLeft /> {t('blog_page.back')}</Link></div></section>
      </main>
    );
  }

  const fm = article.frontmatter;
  const title = language === 'en' && fm.title_en ? fm.title_en : fm.title;

  return (
    <main className="blog-detail-page" id="blog-detail">
      <section className="page-hero section-dark">
        <div className="container">
          <Link to="/blog" className="back-link"><FaArrowLeft /> {t('blog_page.back')}</Link>
          {fm.category && <span className="detail-category">{fm.category}</span>}
          <h1>{title}</h1>
          <div className="detail-meta">
            <span><FaUser /> {fm.author}</span>
            <span><FaCalendarAlt /> {new Date(fm.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span><FaClock /> {fm.readingTime} {t('blog_page.read_time')}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-detail-layout">
            <article className="blog-detail-content">
              {fm.coverImage && <img src={fm.coverImage} alt={title} className="detail-cover" />}
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
              </div>

              {/* CTA */}
              <div className="article-cta glass-card">
                <h3>{t('blog_page.need_help')}</h3>
                <p>{t('blog_page.need_help_desc')}</p>
                <button onClick={() => openContactModal('Konsultasi Artikel')} className="btn btn-whatsapp">
                  <FaWhatsapp /> {t('blog_page.consult_now')}
                </button>
              </div>
            </article>

            {related.length > 0 && (
              <aside className="blog-sidebar">
                <h3>{t('blog_page.related')}</h3>
                {related.map(rel => {
                  const relTitle = language === 'en' && rel.frontmatter.title_en ? rel.frontmatter.title_en : rel.frontmatter.title;
                  return (
                    <Link to={`/blog/${rel.slug}`} key={rel.slug} className="related-card">
                      {rel.frontmatter.coverImage && <img src={rel.frontmatter.coverImage} alt={relTitle} />}
                      <div>
                        <h4>{relTitle}</h4>
                        <span>{rel.frontmatter.readingTime} {t('blog_page.read_time')}</span>
                      </div>
                    </Link>
                  );
                })}
              </aside>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
