# Agent mentoring

Homepage offer sits directly beneath Rambo. On desktop the pair is pinned to the bottom of the left column, just above the footer. On phones it follows the work list, still last before the footer.

₹2,500 buys one 60-minute, one-to-one session. The homepage asks the buyer to send their workflow before the call so the hour is prepared against that process. Checkout uses the same Dodo hosted-session pattern as Astrothunder, with a separate mentoring product. After checkout, customers return to the existing Cal.com booking link.

Checkout is always one hour at ₹2,500. Dodo hosted checkout does not support customer-editable quantity, so multi-hour buyers need a separate purchase or should email to arrange. Quantity does not change Cal.com appointment lengths automatically: reconcile the purchased hours with bookings manually.

## Activation

Add this note to the Dodo mentoring product description when configuring checkout: “After payment, choose your 60-minute session time on Cal.com”. Keep booking instructions and availability links off the homepage.

Create a one-time mentoring product in the existing Dodo account: INR 250000 in minor units, with tax configuration checked against the advertised ₹2,500 price. Use that product's ID, not the Astrothunder licence ID.

Set server-only deployment variables:

- `DODO_PAYMENTS_API_KEY`
- `DODO_MENTORING_PRODUCT_ID`
- `DODO_PAYMENTS_ENVIRONMENT` (`test_mode` first, `live_mode` after verification)

Verify that the existing Cal.com schedule offers 60-minute appointments. Run a test checkout and check the redirect, receipt, cancellation, and failed-payment behaviour before enabling live payments.

The Cal.com URL is already public and can be used without paying. This is a manual reconciliation flow: match Dodo payments to bookings by customer email. A booking or browser return is not evidence of payment. No automated paid entitlement or slot reservation is implemented.

API reference: https://docs.dodopayments.com/api-reference/checkout-sessions/create
