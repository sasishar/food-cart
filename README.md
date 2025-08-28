# Indian Food Ordering System - Frontend

This is a frontend web application for an Indian food ordering system featuring a dynamic menu with diverse food items, including Veg and Non-Veg options across categories such as Starters, Main Course, Biryanis, Desserts, Soft Drinks, and Ice Creams.

## Features

- **Menu Navigation**: Switch between All, Veg, Non-Veg food types.
- **Category Filtering**: View food by categories such as Starters, Biryanis, Main Course, etc.
- **Dynamic Menu Display**: Food items show image, name, price, and Add to Cart button.
- **Shopping Cart**: Add multiple items with quantity control, view totals, remove items, and clear cart options.
- **Billing Page**: Review order summary with final amount.
- **Payment Integration**: Pay Now button redirects to UPI payment apps (Google Pay, PhonePe) for seamless payment processing via UPI URL scheme.
- **Responsive Design**: Clean, user-friendly UI built with CSS grid for various screen sizes.

## Technologies Used

- HTML5, CSS3 (styles.css)
- Vanilla JavaScript (script.js)
- UPI Payment URL scheme integration for mobile payment redirection (Pay Now button)

## How to Run

1. Clone or download this repository.
2. Open the `index.html` file in any modern web browser.
3. Navigate through the menu, add items to the cart.
4. Proceed to billing and click **Pay Now** to pay using your preferred UPI app on mobile.

## Customization

- To **add more food items**, edit the `allFoods` array in `script.js` with additional objects describing each dish.
- To **update payment information**, change the `pa` (payee VPA) and `pn` (payee name) fields in the UPI URL in the **Pay Now** button event handler in `script.js`.

## Notes

- The **UPI payment redirection works best on mobile devices** with UPI apps installed.
- Desktop browsers may not support UPI URI schemes; alternate payment options can be added as enhancements.
- This project is frontend-only; integrating a backend for user authentication, order persistence, or inventory management requires additional development.

## Future Enhancements

- Backend API for user accounts, orders, and payment verification.
- QR code generation for payment where UPI URI scheme is unsupported.
- User authentication and order history.
- Responsive improvements for mobile/tablet layouts.
- Integration with food delivery services.

## License

This project is open-source and free to use or modify.

---

Enjoy building your Indian Food Ordering System! Feel free to contribute or report issues.

