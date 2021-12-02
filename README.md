# Ticketing application using microservices architecture

## Services

Auth: Everything related to user signup/signin/signout
Tickets: Ticket creation/editing. Know whether a ticker can be updated.
Orders: Order creation/editing.
Expiration: Watches for orders to be created cancels them after 15 minutes.
Payments: Handles credit card payments. Cancels orders if payments fails, completes if payment succeeds.
