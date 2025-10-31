from django.core.management.base import BaseCommand
from market_analysis.models import MarketSegment, Competitor, MarketTrend
from datetime import date

class Command(BaseCommand):
    help = 'Populate database with initial market analysis mock data'

    def handle(self, *args, **options):
        # Market Segments - E-commerce Marketplace Focus
        MarketSegment.objects.all().delete()
        electronics_segment = MarketSegment.objects.create(
            name="Electronics & Technology",
            description="Consumer electronics, smartphones, laptops, and tech accessories",
            market_size=850000000,
            growth_rate=12.5,
        )
        fashion_segment = MarketSegment.objects.create(
            name="Fashion & Apparel",
            description="Clothing, footwear, accessories, and fashion items",
            market_size=620000000,
            growth_rate=15.2,
        )
        home_living_segment = MarketSegment.objects.create(
            name="Home & Living",
            description="Home goods, furniture, kitchenware, and home improvement",
            market_size=450000000,
            growth_rate=10.8,
        )
        groceries_segment = MarketSegment.objects.create(
            name="Groceries & Daily Essentials",
            description="Food, beverages, personal care, and household essentials",
            market_size=720000000,
            growth_rate=18.3,
        )

        # Competitors - E-commerce Marketplaces
        Competitor.objects.all().delete()
        Competitor.objects.create(
            name="Jumia",
            market_segment=electronics_segment,
            market_share=32.5,
            strengths="Established brand, Wide product range, Pan-African presence, Strong logistics network",
            weaknesses="High marketing costs, Intense competition, Thin margins",
        )
        Competitor.objects.create(
            name="Konga",
            market_segment=electronics_segment,
            market_share=18.7,
            strengths="Nigerian market focus, Trusted brand, Good customer service",
            weaknesses="Limited geographic expansion, Smaller GMV compared to Jumia",
        )
        Competitor.objects.create(
            name="Amazon (International)",
            market_segment=electronics_segment,
            market_share=12.3,
            strengths="Global scale, Prime benefits, Vast inventory, Fast shipping",
            weaknesses="Limited local presence, Currency challenges, Higher prices",
        )
        Competitor.objects.create(
            name="Temu",
            market_segment=fashion_segment,
            market_share=15.8,
            strengths="Ultra-low prices, Direct China sourcing, Social commerce, Fast-growing",
            weaknesses="Quality concerns, Longer shipping times, Customer service challenges",
        )
        Competitor.objects.create(
            name="AliExpress",
            market_segment=home_living_segment,
            market_share=9.2,
            strengths="Huge product catalog, Competitive pricing, Cross-border expertise",
            weaknesses="Long delivery times, Limited local support, Currency volatility",
        )

        # Market Trends - E-commerce Focus
        MarketTrend.objects.all().delete()
        MarketTrend.objects.create(
            title="Mobile-First Shopping Dominance",
            description="Over 85% of e-commerce transactions now occur on mobile devices. Marketplaces must optimize for mobile experience.",
            impact="High",
            start_date=date(2023, 1, 1),
            end_date=date(2026, 12, 31),
        )
        MarketTrend.objects.create(
            title="Social Commerce Integration",
            description="Integration of social media with shopping. Live streaming, influencer partnerships, and social proof drive purchases.",
            impact="High",
            start_date=date(2022, 6, 1),
        )
        MarketTrend.objects.create(
            title="Same-Day & Next-Day Delivery Expectations",
            description="Consumer demand for faster fulfillment increasing. Marketplaces investing in local warehouses and logistics partnerships.",
            impact="High",
            start_date=date(2024, 1, 1),
        )
        MarketTrend.objects.create(
            title="Buy Now Pay Later (BNPL) Adoption",
            description="Flexible payment options becoming standard. BNPL accounts for 25%+ of online marketplace transactions.",
            impact="High",
            start_date=date(2023, 9, 1),
        )
        MarketTrend.objects.create(
            title="Hyperlocal Marketplace Growth",
            description="Focus on local sellers, same-city delivery, and regional product preferences gaining traction.",
            impact="Medium",
            start_date=date(2024, 3, 1),
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated database with market analysis mock data'))
