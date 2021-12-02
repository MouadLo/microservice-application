# Ticketing application using microservices architecture

## Services

<bold>Auth</bold>: Everything related to user signup/signin/signout <br />
Tickets: Ticket creation/editing. Know whether a ticker can be updated. <br />
Orders: Order creation/editing. <br />
Expiration: Watches for orders to be created cancels them after 15 minutes. <br />
Payments: Handles credit card payments. Cancels orders if payments fails, completes if payment succeeds. <br />
