# Agent mentoring

Homepage offer sits directly beneath Rambo, in the left column on desktop and after the work list and portrait on phones.

₹2,500 buys one 60-minute, one-to-one session. Checkout uses the same Dodo hosted-session pattern as Astrothunder, with a separate mentoring product. After checkout, customers return to the existing Google Calendar booking link.

Customers choose a whole number of hours on the homepage before opening checkout. Each hour adds one product unit at ₹2,500. There is no website-defined maximum; positive safe integers are validated server-side, and Dodo/payment-provider transaction limits still apply. Quantity does not change Calendar appointment lengths automatically: reconcile the purchased hours with bookings manually.

## Activation

Add this note to the Dodo mentoring product description when configuring checkout: “After payment, choose your 60-minute session time on Google Calendar”. Keep booking instructions and availability links off the homepage.

Create a one-time mentoring product in the existing Dodo account: INR 250000 in minor units, with tax configuration checked against the advertised ₹2,500 price. Use that product's ID, not the Astrothunder licence ID.

Set server-only deployment variables:

- `DODO_PAYMENTS_API_KEY`
- `DODO_MENTORING_PRODUCT_ID`
- `DODO_PAYMENTS_ENVIRONMENT` (`test_mode` first, `live_mode` after verification)

Verify that the existing Calendar schedule offers 60-minute appointments. Run a test checkout and check the redirect, receipt, cancellation, and failed-payment behaviour before enabling live payments.

The Calendar URL is already public and can be used without paying. This is a manual reconciliation flow: match Dodo payments to bookings by customer email. A booking or browser return is not evidence of payment. No automated paid entitlement or slot reservation is implemented.

API reference: https://docs.dodopayments.com/api-reference/checkout-sessions/create
