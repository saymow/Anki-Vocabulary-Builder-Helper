# Get card data

> ## Success
> - ❌ Receive a **GET** request on route **/api/card-data?word={word}** 
> - ❌ Validate query param **word**
> - ❌ **Create** a card containing a phrase with the given word and, on the back, the word meaning 
> - ✅ Returns **200** with the card data

> ## Exceptions
> - ✅ Returns **400** error if word isn't provided
> - ✅ Returns **404** error if cant create card
> - ✅ Returns **404** error if api does no exists
> - ❌ Returns **500** error if some unexpected error happen