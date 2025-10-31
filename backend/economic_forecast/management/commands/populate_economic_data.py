from django.core.management.base import BaseCommand
from economic_forecast.models import EconomicMetric, EconomicNews, EconomicForecast, EconomicEvent
from datetime import datetime, date
import random
import requests

class Command(BaseCommand):
    help = 'Populate economic forecast data'

    def get_world_bank_data(self, indicator):
        url = f"https://api.worldbank.org/v2/country/NG/indicator/{indicator}?format=json&per_page=1"
        try:
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                if data and len(data) > 1 and data[1]:
                    latest = data[1][0]
                    return latest.get('value'), latest.get('date')
        except Exception as e:
            self.stdout.write(f"Error fetching {indicator}: {e}")
        return None, None

    def handle(self, *args, **options):
        self.stdout.write('Populating economic data...')

        # Economic Metrics - Scraped from World Bank
        gdp_value, gdp_year = self.get_world_bank_data('NY.GDP.MKTP.KD.ZG')
        inflation_value, inf_year = self.get_world_bank_data('FP.CPI.TOTL.ZG')
        unemployment_value, unemp_year = self.get_world_bank_data('SL.UEM.TOTL.ZS')
        trade_value, trade_year = self.get_world_bank_data('BN.GSR.GNFS.CD')

        metrics_data = [
            {
                'context': 'national',
                'name': 'GDP Growth',
                'value': gdp_value or 2.3,
                'change': 0.1,
                'unit': '%',
                'trend': 'up',
                'category': 'Growth',
            },
            {
                'context': 'national',
                'name': 'Inflation Rate',
                'value': inflation_value or 3.1,
                'change': -0.2,
                'unit': '%',
                'trend': 'down',
                'category': 'Prices',
            },
            {
                'context': 'national',
                'name': 'Unemployment Rate',
                'value': unemployment_value or 4.2,
                'change': -0.3,
                'unit': '%',
                'trend': 'down',
                'category': 'Labor',
            },
            {
                'context': 'national',
                'name': 'Trade Balance',
                'value': (trade_value / 1e9) if trade_value else -15.7,  # Convert to B USD
                'change': 2.1,
                'unit': 'B USD',
                'trend': 'up',
                'category': 'Trade',
            },
        ]

        for data in metrics_data:
            EconomicMetric.objects.create(**data)

        # Economic News - E-commerce & Marketplace Focus
        news_data = [
            {
                'context': 'national',
                'title': 'E-commerce Logistics Costs Decline 7% Month-over-Month',
                'summary': 'Improved last-mile delivery infrastructure and bulk freight agreements reduce fulfillment costs for online marketplaces like E-buy. Logistics bottlenecks ease ahead of peak shopping seasons.',
                'source': 'MarketWatch',
                'timestamp': datetime.now(),
                'impact': 'high',
                'category': 'Logistics',
            },
            {
                'context': 'national',
                'title': 'Digital Payment Adoption Surges in Online Retail',
                'summary': 'Wallet and BNPL (Buy Now Pay Later) share rises to 42% of marketplace checkouts. Mobile money transactions in e-commerce up 28% YoY, benefiting platforms like E-buy, Jumia, and Konga.',
                'source': 'FinDaily',
                'timestamp': datetime.now(),
                'impact': 'high',
                'category': 'Payments',
            },
            {
                'context': 'national',
                'title': 'Consumer Spending on Online Marketplaces Grows 15%',
                'summary': 'Nigerian consumers increasing online purchases across categories. Electronics, fashion, and groceries drive GMV growth for major e-commerce platforms.',
                'source': 'NBS',
                'timestamp': datetime.now(),
                'impact': 'medium',
                'category': 'Consumer Spending',
            },
            {
                'context': 'national',
                'title': 'Cross-border E-commerce Trade Increases',
                'summary': 'International marketplace orders up 22% as consumers access global products. Currency stability improves import affordability.',
                'source': 'TradeMonitor',
                'timestamp': datetime.now(),
                'impact': 'medium',
                'category': 'Trade',
            },
        ]

        for data in news_data:
            EconomicNews.objects.create(**data)

        # Economic Forecasts - E-commerce Focus
        forecasts_data = [
            {
                'context': 'national',
                'indicator': 'E-commerce GMV Growth',
                'period': 'Next 6M',
                'forecast': 18.5,
                'confidence': 75,
                'range_low': 15.0,
                'range_high': 22.0,
            },
            {
                'context': 'national',
                'indicator': 'Retail Sales (Online)',
                'period': 'Next 6M',
                'forecast': 12.3,
                'confidence': 72,
                'range_low': 9.5,
                'range_high': 15.1,
            },
            {
                'context': 'national',
                'indicator': 'Parcel Volume Growth',
                'period': 'Next 6M',
                'forecast': 14.2,
                'confidence': 68,
                'range_low': 11.0,
                'range_high': 17.5,
            },
            {
                'context': 'national',
                'indicator': 'Digital Payment Transaction Volume',
                'period': 'Next 6M',
                'forecast': 25.0,
                'confidence': 70,
                'range_low': 20.0,
                'range_high': 30.0,
            },
        ]

        for data in forecasts_data:
            EconomicForecast.objects.create(**data)

        # Economic Events - E-commerce & Marketplace Focus
        events_data = [
            {
                'context': 'national',
                'title': 'E-commerce Regulatory Framework Review',
                'date': date(2025, 2, 15),
                'description': 'Government review of online marketplace regulations, consumer protection, and digital payment policies affecting E-buy and competitors.',
                'impact': 'high',
                'category': 'Policy',
            },
            {
                'context': 'national',
                'title': 'Black Friday & Holiday Shopping Season',
                'date': date(2025, 11, 29),
                'description': 'Peak e-commerce sales period. Marketplaces expect 40-60% GMV increase. Logistics and payment systems under pressure.',
                'impact': 'high',
                'category': 'Seasonal',
            },
            {
                'context': 'national',
                'title': 'VAT Policy Review for Digital Services',
                'date': date(2025, 4, 10),
                'description': 'Potential VAT rate adjustment for online marketplaces and digital services under consideration.',
                'impact': 'medium',
                'category': 'Tax Policy',
            },
        ]

        for data in events_data:
            EconomicEvent.objects.create(**data)

        self.stdout.write(self.style.SUCCESS('Successfully populated economic data'))
