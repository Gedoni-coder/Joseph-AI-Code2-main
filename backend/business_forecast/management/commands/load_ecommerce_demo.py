from django.core.management.base import BaseCommand
from django.utils import timezone
from decimal import Decimal

# Import models across modules
from economic_forecast.models import EconomicMetric, EconomicNews, EconomicForecast, EconomicEvent
from business_forecast.models import (
    CustomerProfile,
    RevenueProjection,
    CostStructure,
    CashFlowForecast,
    KPI,
    ScenarioPlanning,
)


class Command(BaseCommand):
    help = "Load demo data for E-buy - an e-commerce marketplace (similar to Jumia, Konga, Temu, Amazon)"

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING("Clearing existing demo data..."))

        EconomicMetric.objects.all().delete()
        EconomicNews.objects.all().delete()
        EconomicForecast.objects.all().delete()
        EconomicEvent.objects.all().delete()

        CustomerProfile.objects.all().delete()
        RevenueProjection.objects.all().delete()
        CostStructure.objects.all().delete()
        CashFlowForecast.objects.all().delete()
        KPI.objects.all().delete()
        ScenarioPlanning.objects.all().delete()

        self.stdout.write(self.style.SUCCESS("Seeding e-commerce demo data..."))

        # Economic metrics relevant to e-commerce
        EconomicMetric.objects.bulk_create([
            EconomicMetric(context=EconomicMetric.NATIONAL, name="Inflation (CPI)", value=11.2, change=-0.2, unit="% YoY", trend=EconomicMetric.DOWN, category="Macro"),
            EconomicMetric(context=EconomicMetric.NATIONAL, name="Unemployment", value=5.1, change=0.1, unit="%", trend=EconomicMetric.UP, category="Labor"),
            EconomicMetric(context=EconomicMetric.NATIONAL, name="Consumer Confidence", value=98.0, change=1.5, unit="index", trend=EconomicMetric.UP, category="Sentiment"),
            EconomicMetric(context=EconomicMetric.NATIONAL, name="FX USD/Local", value=1450.0, change=-25.0, unit="rate", trend=EconomicMetric.DOWN, category="FX"),
        ])

        # News
        now = timezone.now()
        EconomicNews.objects.bulk_create([
            EconomicNews(context=EconomicNews.NATIONAL, title="Logistics bottlenecks ease ahead of holiday season", summary="Freight costs down 7% MoM; last-mile capacity improving in urban centers.", source="MarketWatch", timestamp=now, impact=EconomicNews.MEDIUM, category="Logistics"),
            EconomicNews(context=EconomicNews.NATIONAL, title="Payments adoption accelerates", summary="Wallet/BNPL share rises to 42% of marketplace checkouts.", source="FinDaily", timestamp=now, impact=EconomicNews.HIGH, category="Payments"),
        ])

        # Forecasts
        EconomicForecast.objects.bulk_create([
            EconomicForecast(context=EconomicForecast.NATIONAL, indicator="Retail Sales", period="Next 6M", forecast=4.2, confidence=72, range_low=2.1, range_high=6.3),
            EconomicForecast(context=EconomicForecast.NATIONAL, indicator="Parcel Volume", period="Next 6M", forecast=8.5, confidence=68, range_low=4.0, range_high=12.0),
        ])

        # Events
        EconomicEvent.objects.create(context=EconomicEvent.NATIONAL, title="VAT Policy Review", date=now.date(), description="Potential VAT rate adjustment under consideration.", impact=EconomicEvent.MEDIUM, category="Policy")

        # Customer segments
        CustomerProfile.objects.bulk_create([
            CustomerProfile(segment="New Customers", demand_assumption=50000, growth_rate=0.12, retention=35, avg_order_value=18.5, seasonality=60),
            CustomerProfile(segment="Returning Customers", demand_assumption=80000, growth_rate=0.08, retention=68, avg_order_value=24.0, seasonality=55),
            CustomerProfile(segment="Prime/Plus", demand_assumption=15000, growth_rate=0.15, retention=82, avg_order_value=45.0, seasonality=50),
        ])

        # Revenue projections (quarterly)
        RevenueProjection.objects.bulk_create([
            RevenueProjection(period="Q1", projected=8_500_000, conservative=7_800_000, optimistic=9_800_000, actual_to_date=2_100_000, confidence=70),
            RevenueProjection(period="Q2", projected=9_900_000, conservative=9_100_000, optimistic=11_200_000, confidence=68),
            RevenueProjection(period="Q3", projected=11_300_000, conservative=10_200_000, optimistic=12_900_000, confidence=65),
            RevenueProjection(period="Q4", projected=14_600_000, conservative=13_200_000, optimistic=16_900_000, confidence=62),
        ])

        # Cost structure
        CostStructure.objects.bulk_create([
            CostStructure(category="COGS - Merchant Payouts", type=CostStructure.COGS, amount=5_800_000, percentage=58.0, variability=CostStructure.VARIABLE, trend=CostStructure.UP),
            CostStructure(category="Logistics (Fulfillment + Last-mile)", type=CostStructure.OPERATING, amount=1_600_000, percentage=16.0, variability=CostStructure.SEMI_VARIABLE, trend=CostStructure.DOWN),
            CostStructure(category="Payment Processing", type=CostStructure.OPERATING, amount=450_000, percentage=4.5, variability=CostStructure.VARIABLE, trend=CostStructure.UP),
            CostStructure(category="Marketing (Paid + Affiliates)", type=CostStructure.OPERATING, amount=900_000, percentage=9.0, variability=CostStructure.VARIABLE, trend=CostStructure.DOWN),
            CostStructure(category="G&A + Tech", type=CostStructure.OPERATING, amount=650_000, percentage=6.5, variability=CostStructure.FIXED, trend=CostStructure.STABLE),
        ])

        # Cash flow forecast (next 6 months)
        CashFlowForecast.objects.bulk_create([
            CashFlowForecast(month="Jan", cash_inflow=2_200_000, cash_outflow=1_950_000, net_cash_flow=250_000, cumulative_cash=250_000, working_capital=1_100_000),
            CashFlowForecast(month="Feb", cash_inflow=2_400_000, cash_outflow=2_050_000, net_cash_flow=350_000, cumulative_cash=600_000, working_capital=1_150_000),
            CashFlowForecast(month="Mar", cash_inflow=2_700_000, cash_outflow=2_250_000, net_cash_flow=450_000, cumulative_cash=1_050_000, working_capital=1_200_000),
            CashFlowForecast(month="Apr", cash_inflow=2_800_000, cash_outflow=2_350_000, net_cash_flow=450_000, cumulative_cash=1_500_000, working_capital=1_250_000),
            CashFlowForecast(month="May", cash_inflow=3_000_000, cash_outflow=2_500_000, net_cash_flow=500_000, cumulative_cash=2_000_000, working_capital=1_300_000),
            CashFlowForecast(month="Jun", cash_inflow=3_200_000, cash_outflow=2_650_000, net_cash_flow=550_000, cumulative_cash=2_550_000, working_capital=1_350_000),
        ])

        # KPIs tailored to marketplace
        KPI.objects.bulk_create([
            KPI(name="GMV", current=12_500_000, target=14_000_000, unit="USD", trend=KPI.UP, category="Revenue", frequency="Monthly"),
            KPI(name="AOV", current=23.8, target=25.0, unit="USD", trend=KPI.UP, category="Commerce", frequency="Monthly"),
            KPI(name="Orders", current=520_000, target=580_000, unit="count", trend=KPI.UP, category="Commerce", frequency="Monthly"),
            KPI(name="Take Rate", current=12.6, target=13.0, unit="%", trend=KPI.STABLE, category="Monetization", frequency="Monthly"),
            KPI(name="Fulfillment Cost / Order", current=2.95, target=2.70, unit="USD", trend=KPI.DOWN, category="Logistics", frequency="Monthly"),
            KPI(name="Churn", current=3.2, target=2.6, unit="%", trend=KPI.DOWN, category="Retention", frequency="Monthly"),
            KPI(name="CAC", current=6.3, target=5.5, unit="USD", trend=KPI.DOWN, category="Marketing", frequency="Monthly"),
            KPI(name="LTV", current=78.0, target=85.0, unit="USD", trend=KPI.UP, category="Monetization", frequency="Quarterly"),
        ])

        # Scenarios
        ScenarioPlanning.objects.bulk_create([
            ScenarioPlanning(scenario=ScenarioPlanning.BEST_CASE, revenue=42_000_000, costs=33_000_000, profit=9_000_000, probability=0.25, key_assumptions={"AOV": 26.0, "Orders": 2.3e6, "TakeRate": 13.2}),
            ScenarioPlanning(scenario=ScenarioPlanning.BASE_CASE, revenue=38_000_000, costs=31_500_000, profit=6_500_000, probability=0.55, key_assumptions={"AOV": 24.8, "Orders": 2.0e6, "TakeRate": 12.8}),
            ScenarioPlanning(scenario=ScenarioPlanning.WORST_CASE, revenue=33_000_000, costs=30_000_000, profit=3_000_000, probability=0.20, key_assumptions={"AOV": 23.0, "Orders": 1.7e6, "TakeRate": 12.2}),
        ])

        self.stdout.write(self.style.SUCCESS("E-commerce demo data loaded successfully."))


