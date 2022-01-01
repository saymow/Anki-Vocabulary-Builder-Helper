# Get card

> ## Success
> - ❌ Receive a **GET** request on route **/api/card?word={word}** 
> - ❌ Validate query param **word**
> - ❌ **Create**, if it's a valid word, a card containing a phrase with the given word and, on the back, the word meaning 
> - ❌ Returns **200** with the card data

> ## Exceptions
> - ❌ Returns **400** error if word isn't provided
> - ❌ Returns **400** error if word isn't valid
> - ❌ Returns **404** error if api does to exists
> - ❌ Returns **500** error if some unexpected error happen