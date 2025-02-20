import scrapy
from w3lib.html import remove_tags

class NJPensionSpider(scrapy.Spider):
    name = 'nj_pension'
    start_urls = ['https://www.nj.gov/treasury/pensions/pension-active-pers.shtml']

    def parse(self, response):
        with open('scraped_content.txt', 'w', encoding='utf-8') as f:
            for section in response.css('#accordion .card'):
                title = section.css('.card-header a.card-title::text').get()
                content = section.css('.card-body').get()
                clean_content = remove_tags(content) if content else 'N/A'

                pdf_links = section.css('.card-body a::attr(href)').re(r'.*\.pdf$')
                pdf_links = [response.urljoin(link) for link in pdf_links]

                data = f"Title: {title.strip() if title else 'N/A'}\nContent: {clean_content.strip()}\nPDF Links: {', '.join(pdf_links)}\n\n"
                f.write(data)

                yield {
                    'title': title.strip() if title else None,
                    'content': clean_content.strip(),
                    'pdf_links': pdf_links
                }
