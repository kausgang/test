from pathlib import Path

import scrapy


class QuotesSpider(scrapy.Spider):
    name = "njdpb"

    def start_requests(self):
        urls = [
            # "https://quotes.toscrape.com/page/1/",
            # "https://quotes.toscrape.com/page/2/",
            "https://www.nj.gov/treasury/pensions/pension-active-pers.shtml"
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = f"njdpb-{page}.html"
        Path(filename).write_bytes(response.body)
        self.log(f"Saved file {filename}")