import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { Book } from 'src/catalog/book/domain/interfaces';
import { LANGUAGES } from 'src/core/const';

@Injectable()
export class TodosTusLibrosAdapter {
  browser: Browser;
  context: BrowserContext;

  async get(bookSearch: string, pag = 1, clean = false): Promise<Book[]> {
    try {
      await this.createBrowser({
        headless: true,
        devtools: false,
      });
      const page = await this.getPage();

      console.log('---------------------');
      console.log(bookSearch, pag);
      console.log('---------------------');

      const url = `https://www.todostuslibros.com/busquedas?keyword=${bookSearch}`;
      // Navigate to the login page
      // type=searchType
      await page.goto(url);

      // click on button id accept-cookies
      // only on first page
      if (clean) {
        // wait only 5 secs
        try {
          await page.waitForTimeout(5000);
          page.click('#accept-cookies');
        } catch (e) {
          console.log('🚀 ~ e:', e);
        }
      }

      const title = await page.locator('h1.page-title');
      const titleHtml = await title.innerHTML();
      const titleText = load(titleHtml).html();

      // if not found any book
      if (titleText.includes('No se han encontrado')) {
        this.removeBrowser();
        return;
      }

      const total = titleText.split('títulos')[0];

      const pages = Math.ceil(parseInt(total) / 10);
      console.log('🚀  ~ pages:', pages);

      if (typeof pages !== 'number') {
        this.removeBrowser();
        return;
      }

      const books = await page.locator('ul.books');

      // books locator to html
      const booksHtml = await books.innerHTML();
      // console.log(booksHtml);

      const publisher = null;

      const booksScraped = await this.extractBooks(booksHtml, publisher);

      page.close();

      return booksScraped;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async extractBooks(html, publisher) {
    const books = [];
    const $ = load('<ul>' + html + '</ul>');
    const lis = $('ul').children('li');

    // recorrer todos los libros
    lis.each((index, element) => {
      const b = this.extractBook(element, publisher);
      if (b && b.title) {
        books.push(b);
      }
    });

    return books;
  }

  /**
   *
   * @param html
   * @param publisher
   * @returns
   */
  extractBook(html, publisher = '-'): Book {
    if (html.attribs['class'].includes('booklist-banner')) {
      return;
    }

    const $ = load(html);
    // console.log(html);

    if (html.attribs['data-gtm-editorial']) {
      publisher = html.attribs['data-gtm-editorial'];
    }

    const bookDetails = $('div.book-details');
    const img = $('div.book-image img');
    const isbn = html.attribs['data-gtm-isbn'];
    const authorsElements: any = $('div.book-details .author a');
    const authors = [];

    let image = '';
    try {
      image = img.data();
    } catch {}

    for (let i = 0; i < authorsElements.length; i++) {
      authors.push($(authorsElements[i]).text());
    }

    const precio = html.attribs['data-gtm-precio'];
    const title =
      html.attribs['data-gtm-titulo'] ||
      $('div.book-details .title').text().trim();
    const urls = $('a', bookDetails); //

    return {
      title,
      edition: {
        isbn_13: isbn.replace(/-/g, ''),
        pages: 0,
        lang: 'es',
        publisher: { name: publisher, url: '' },
        year_published: '',
        info: {
          en: '',
          es: '',
        },
        translators: [],
        ilustrators: [],
        images: [
          {
            url: image,
          },
        ],
        edition: 0,
        price: precio,
      },
      lang: 'es' as keyof typeof LANGUAGES,
      urls: urls.data(),
      authors,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Create Browser and Context
   */
  async createBrowser(config) {
    if (this.browser) {
      return;
    }

    this.browser = await chromium.launch({
      headless: config.headless ?? true,
      devtools: config.devtools ?? false,
    });
    this.context = await this.browser.newContext();
  }

  /**
   * Close Browser and Context
   */
  async removeBrowser() {
    await this.context.close();
    await this.browser.close();

    this.browser = null;
  }

  /**
   *
   * @returns
   */
  private async getPage(): Promise<Page> {
    if (!this.context) {
      this.browser = null;
      await this.createBrowser({
        headless: true,
        devtools: false,
      });
    }

    const page = await this.context.newPage();
    return page;
  }
}
