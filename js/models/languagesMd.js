var Backbone = require('backbone');

/* use BCP 47 language tags as the key for each language http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry */

module.exports = Backbone.Model.extend({
  defaults: {
    languages: [
      {
        langName: "English",
        langCode: "en-US",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Next",
        IAgree: "I Agree",
        Back: "Back",
        EnterMessage: "Enter message...",
        Reload: "Reload",
        You: "You",
        Skip: "Skip",
        Done: "Done",
        Navigation: "Navigation", 
        Cancel: "Cancel",
        ClosingOpenBazaar: "Close (Your page will go offline)", 
        Minimize: "Minimize", //notTranslated
        Maximize: "Maximize", //notTranslated
        Close: "Close",
        Yes: "Yes",
        No: "No",
        of: "of",
        Sell: "Sell",
        New: "New",
        Excellent: "Excellent",
        Good: "Good",
        Poor: "Poor",
        SKU: "SKU",
        Refurbished: "Refurbished",
        Physical: "Physical",
        Digital: "Digital",
        Service: "Service",
        Visit: "View",
        Item: "Item",
        Items: "Items",
        Stores: "Stores",
        Follow: "Follow",
        Feed: "Feed",
        FeedPlaceholder: "A feed of updates from all of the pages you follow",
        ViewListing: "View Listing",
        Unfollow: "Unfollow",
        About: "About",
        NoDescriptionAdded: "No description added",
        NoListings: "No listings",
        CoverPhoto: "Cover Photo",
        AboutEmpty: "About is blank...",
        Followers: "Followers",
        Following: "Following",
        Message: "Message",
        Messages: "Messages",
        Store: "Store",
        Edit: "Edit",
        Used: "Used",
        Delete: "Delete",
        DontDelete: "Don't Delete",
        ConfirmDelete: "Confirm Delete",
        Website: "Website",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Welcome",
        CreateStore: "Become a Store",
        GoToMyPage: "My Page",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...",
        SearchForPagesPlaceholder: "Search by name or keyword",
        SearchFeedPlaceholder: "Type a keyword...",
        SearchForFollowersPlaceholder: "Type a name...",
        SearchForUsersPlaceholder: "Type a name...",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 Business Days",
        EstDeliveryInternationalPlaceholder: "7-15 Business Days",
        OrderProcessingTimePlaceholder: "Enter time needed to process order",
        TermsAndConditionsPlaceholder: "Enter terms and conditions...",
        TitlePlaceholder: "Enter title",
        DescriptionPlaceholder: "Enter description...",
        ReturnPolicyPlaceholder: "Enter return policy...",
        CategoryPlaceholder: "Enter category",
        CategoryHelperText: "Categories are used to group and organize listing within your store.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.",
        ExpirationDateHelperText: "Set a date for the listing to automatically be pulled from your store.",
        ClearExpirationDate: "Clear Expiration Date",
        ReturnPolicy: "Return Policy",
        TermsAndConditions: "Terms and Conditions",
        Photos: "Photos",
        Added: "Added",
        Categorization: "Categorization",
        Expiration: "Expiration",
        Search: "Search",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "Buy Now",
        Description: "Description",
        Reviews: "Reviews",
        Shipping: "Shipping",
        Addresses: "Addresses",
        NewAddress: "New Address",
        CurrentAddress: "Current Addresses",
        Returns: "Returns",
        ReturnsPolicy: "Returns Policy",
        Ampersand: "&",
        Tags: "Tags", //notTranslated
        Keywords: "Keywords",
        ShipsFrom: "Ships From",
        ShipsTo: "Ships To",
        Optional: "Optional",
        Customize: "Customize",
        Save: "Save",
        Changes: "Changes",
        SaveChanges: "Save Changes",
        YourName: "Your name",
        BitcoinReturnAddress: "Bitcoin Return Address",
        BitcoinReturnAddressPlaceholder: "Enter Bitcoin address...",
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.",
        LocalCurrency: "Local currency",
        TimeZone: "Time zone",
        ShipToName: "Name",
        ShipToStreet: "Street",
        ShipToCity: "City",
        ShipToState: "State/Province/Region",
        ShipToPostalCode: "Postal code",
        PostalCode: "Postal code",
        ShipToCountry: "Country",
        EnableNotifications: "Enable notifications",
        EnableSSL: "Enable SSL",
        LibbitcoinServerAddress: "Libbitcoin server address",
        ServerIPPort: "Server IP:Port",
        All: "All",
        Name: "Name",
        Price: "Price",
        Available: "Available",
        Type: "Type",
        Condition: "Condition",
        NSFW: "18+ (Adult content)",
        Select: "Select",
        Social: "Social",
        Theme: "Theme",
        Listing: "Listing",
        Listings: "Listings",
        ViewPage: "View page", //notTranslated
        Pages: "Pages",
        Page: "Page",
        Language: "Language",
        Reset: "Reset",
        Local: "Local",
        Domestic: "Domestic",
        Location: "Location",
        International: "International",
        Time: "Time",
        Free: "Free",
        Category: "Category",
        ProcessingTime: "Processing Time",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Drag or upload photos",
        ExpirationDate: "Expires On",
        UploadCoverPhoto: "Upload a cover photo",
        ShortDescription: "Short Description",
        UpTo140Characters: "Up to 140 Characters",
        PrimaryColor: "Primary Color",
        SecondaryColor: "Secondary Color",
        TextColor: "Text Color",
        CoverPhotoButton: "Select Cover Photo",
        AboutPlaceholder: "Full description",
        BackgroundColor: "Background Color",
        NotificationFollow: "is now following you",
        NoNotifications: "No notifications",
        WelcomeToYourPage: "Welcome to your page!",
        SearchForCategory: "Search for category",
        Moderators: "Moderators",
        CurrentModerators: "Current Moderators",
        AddModerators: "Add New Moderators",
        DeselectToRemoveModerator: "Deselect the moderators you want to remove",
        SelectToAddModerator: "Select the moderators you want to add",
        Categories: "Categories",
        UpTo3: "Up to 3",
        AboutYourStore: "A description of your store",
        PaymentType: "Payment Type",
        ShipTo: "Ship To",
        FreeShipping: "Free Shipping",
        OrderDetails: "Order Details",
        OrderSummary: "Order Summary",
        AllListings: "All Listings",
        ComingSoon: "Coming Soon",
        PaymentPending: "Payment Pending",
        FinalizePurchase: "Finalize Purchase",
        LoadingImage: "Loading Image...",
        UploadAvatar: "Select Avatar",
        SaveAvatar: "Save Avatar",
        NewAvatar: "Select New Avatar",
        NewCoverImage: "Select New Cover Image",
        Loading: "Loading...", // not translated
        Purchases: "Purchases",
        Sales: "Sales",
        Cases: "Cases",
        Enter: "Enter", //notTranslated
        Discover: "Discover",
        Block: "Block",
        Unblock: "Unblock",
        Blocked: "Blocked",
        Advanced: "Advanced",
        General: "General",
        AllItems: "All Items",
        DomesticShippingPrice: "Domestic Shipping Price",
        InternationalShippingPrice: "International Shipping Price",
        MinimumIs: "Minimum is",
        Visibility: "Visibility",
        Title: "Title",
        DigitalItem: "Digital Item",
        PhysicalItem: "Physical Item",
        DomesticShippingTime: "Domestic Shipping Time",
        InternationalShippingTime: "International Shipping Time",
        DisplayNSFWcontent: "Display NSFW content?",
        Basic: "Basic",
        Content: "Content",
        StandardThemes: "Standard themes",
        NoPhotosAdded: "No Photos Added",
        Summary: "Summary",
        Funds: "Funds",
        Discussion: "Discussion",
        Quantity: "Quantity",
        ShippingTo: "Shipping To",
        ModeratedBy: "Moderated by",
        Submit: "Submit",
        maxLength20: "maximum length 20 characters",
        maxLength80: "maximum length 80 characters",
        maxLength200: "maximum length 200 characters",
        StoreModeratorsOptional: "Store Moderators (Optional)",
        Searchformoderators: "Search for moderators",
        Contributors: "Contributors",
        Support: "Support",
        Licensing: "Licensing",
        Forward: "Forward",
        On: "On",
        Off: "Off",
        ClickToChange: "Click to change",
        NotProvided: "not provided",
        NotFollowingAnyone: "Not following anyone",
        NoFollowers: "No followers",
        Moderator: "Moderator",
        HandleResolver: "Handle Resolver",
        moderatorSettings: {
          ProvideResolution: "Provide dispute resolution",
          ServiceFee: "Service fee",
          ServiceFeeNote: "Percentage of transaction price (max 25)"
        },
        BecomeModerator: "Become a moderator",
        EditModerator: "Moderator Settings",
        transactions: {
          SoldBy: "Sold By",
          PurchasedBy: "Purchased By",
          searchByOrder: "Search by order id or item name",
          sortByStatusAll: "All",
          sortByStatus0: "Purchased",
          sortByStatus1: "Paid (Funds Waiting)",
          sortByStatus2: "Confirmed/Shipped",
          sortByStatus3: "Completed (Funds Released)",
          sortByStatus4: "Disputed",
          OrderID: "Order ID",
          OrderDate: "Order Date",
          OrderStatus: "Order Status",
          OrderStatus0: "Purchased (Not Funded)",
          OrderStatus1: "Paid (Funds Waiting)",
          OrderStatus2: "Confirmed/Shipped",
          OrderStatus3: "Completed (Funds Released)",
          OrderStatus4: "Disputed",
          OrderTotal: "Order Total",
          OrderTotalInBTC: "BTC Total",
          PaymentProtection: "Payment Protection",
          ShipTo: "Ship To",
          ConfirmOrder: "Confirm this Order",
          ReceivingAddress: "Receiving Address",
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at",
          Shipper: "Item Shipped By",
          ShipperPlaceholder: "Name of the company shipping the item",
          TrackingNumber: "Tracking Number",
          TrackingNumberPlaceholder: "Tracking number of item",
          EstimatedDelivery: "Estimated Delivery",
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered",
          URL: "URL",
          URLPlaceholder: "Link to download, schedule, or more information",
          Password: "Password",
          PasswordPlaceholder: "Password required for link, if any",
          DirectTransaction: "Direct transaction",
          ModeratedTransaction: "Moderated transaction",
          Seller: "Seller",
          Buyer: "Buyer",
          transferReceipt: "transferReceipt",
          copyTxid: "copy tx ID",
          Close: "Close",
          FundOrder: "Fund Order",
          sortByDateNewest: "By Date, Newest",
          sortByDateOldest: "By Date, Oldest",
          PayPurchase: "Pay for this Purchase",
          CompleteOrder: "Complete this Order",
          RateThisTransaction: "Rate this Transaction",
          TransactionReview: "Transaction Review",
          OverallRating: "Overall Rating",
          Quality: "Quality",
          Description: "Description",
          DeliveryTime: "DeliveryTime",
          CustomerService: "Customer Service",
          Review: "Review",
          ReviewPlaceHolder: "Your review of this transaction",
          NoneSent: "None sent"
        },
        errorMessages: {
          saveError: "Data could not be saved.",
          getError: "Data could not be retrieved.",
          missingError: "Some fields are missing or incorrect.",
          serverError: "An incorrect reply was received from the server.",
          userError: "Information for this ID could not be found",
          userNotFoundError: "This person's information is not available. They may have gone offline.",
          notFoundError: "Data could not be loaded for:",
          socketError: "URL for WebSocket failed. Connecting to socket with default address of ws://localhost:18466",
          contractError: "This Item Cannot be Purchased",
          sellerError: "The seller's server has rejected the purchase request",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid",
          pageUnavailable: "This page is currently unavailable.",
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "<p>OpenBazaar is a network of users who buy and sell goods and services directly with each other, using Bitcoin. This network is decentralized and isn't controlled by any organization.</p><p>The software is open source and MIT licensed. You can view the code on <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">Github</a>.</p><p>OpenBazaar is a community project, and we welcome participation in our <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">Slack</a> channel or on our <a href=\"http://www.reddit.com/r/openbazaar\" target=\"_blank\">subreddit</a>.</p><p>If you need help, read the OpenBazaar version 1.0 <a href=\"\" target=\"_blank\">Tutorial</a>.</p><p>If you still have questions, open an issue at our <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\" target=\"_blank\">support desk</a>.</p>",
          contributors: "<p>OpenBazaar is made possible by an international community of developers and volunteers contributing their time to help make trade free. This is a partial list of people who have contributed to the project, either through code or other assistance.</p><ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", 
          support: "<p>You can help OpenBazaar in several ways on our mission to make trade free.</p><p>Buying and selling goods and services on the network helps grow our community and make the platform more attractive to new users. Politely asking Bitcoin-accepting businesses to sell on the platform helps spread the word and shows demand for peer to peer trade.</p><p>If you're a developer, check out <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">our Github</a> and see where you can help us. Beyond helping with the core code, we hope the permissionless and open source nature of the project means you will build new services on top of the existing network.</p><p>You can also <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\" target=\"_blank\">donate Bitcoin</a> to the project, which will be used to defray costs for visiting conferences, offering bounties for development, and promoting OpenBazaar.</p><p>Please <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">join our Slack</a> if you have new ideas for OpenBazaar, or have questions for the core devs.</p>", //notTranslated
          licensing: "<p>OpenBazaar is open source software using the MIT license. This license is permissive and designed to allow people to freely reuse the code for other open source projects or for proprietary software. The full license text is below.</p><h4>The MIT License (MIT)</h4><h5>Copyright &#169 2015 OpenBazaar Developers</h5><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p><h4>Libraries</h4><p>The following libraries are used in OpenBazaar:</p><ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>",
        },
        saveMessages: {
          Saved: "Saved",
          SaveSuccess: "Your changes have been saved."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "All types",
          pagesStores: "Stores",
          pagesMods: "Moderator services",
          pagesBasic: "Basic users",
          listingsCurated: "Stores I follow",
          listingsAll: "All stores",
          categoryAll: "All"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...",
          myPage: "My Page",
          customizePage:"Customize Page",
          sellItem:"New",
          createListing:"Create Listing",
          purchases:"Purchases",
          sales:"Sales",
          cases:"Cases",
          notifications:"Notifications",
          settings:"Settings",
          about:"About OpenBazaar",
          support:"Support OpenBazaar"
        },
        onboarding: {
          intro: "OpenBazaar Configuration",
          Introduction: "Introduction",
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and it's open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
          theme: "Select a Theme for your Page",
          chooseLanguage: "Select Your Language",
          contributors: "%{smart_count} Contributor |||| %{smart_count} Contributors",
          configure: "Configure your experience",
          disclaimer_title: "Disclaimer",
          disclaimer_body: "OpenBazaar is a network for trading goods and services directly between people - using Bitcoin - without any central organization controlling the platform. This means you are responsible for your own activity on the network.\n\nOpenBazaar users are not anonymous by default. Most communications between parties are encrypted, but IP addresses are public and can be associated with activity on the network. Malicious parties could use this information against you; protecting your privacy is your own responsibility.\n\nOpenBazaar users must adhere to the laws in their own legal jurisdiction as well as their conscience. The OpenBazaar developers do not condone - and are not responsible for - any use of the platform for illegal activity.\n\nThe OpenBazaar community of developers has worked hard to deliver a free platform for trade to the world. But as with any software, bugs will be found. The developers are not responsible for any monetary loss associated with problems in the software.\n\nBy using OpenBazaar you're responsible for your own actions on the OpenBazaar network.",
          yourCountry: "Select Your Country",
          localCurrency: "Select Your Currency",
          LanguagePlaceholder: "Search for language",
          CountryPlaceholder: "Search for country",
          CurrencyPlaceholder: "Search for currency",
          TimezonePlaceholder: "Search for time zone",
          ShortDescriptionPlaceholder: "Say something interesting... (160 char max)",
          timeZone: "Select Your Time Zone",
          yourDetails: "Set Your Information",
          yourDescription: "Description",
          handle: "Handle",
          chooseHandle: "Choose a handle",
          knownAs: "You're currently known as:",
          wouldYou: "Would you like to register an easy to remember handle?",
          registerNew: "Register New",
          recommended: "Recommended Pages to Follow",
          connectExisting: "Connect Existing",
          avatar: "Set an Avatar",
          chooseAvatar: "Select Avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished"
        },
        buyFlow: {
          DirectPayment: "Direct Payment",
          SendDirectlyTo: "Send direct payment to %{handle}",
          MustAddAddress: "You must add an address to ship to",
          VendorShipsTo: "Ships to",
          DoesNotShipHere: "Does not ship here",
          Send: "Send",
          BTCto: "BTC to",
          SendBTCtoAddress: "Send %{amount} BTC to",
          OpenAddress: "Open in Local Wallet",
          CopyAddress: "Copy to Clipboard",
          RefreshPayment: "Refresh Payment Status",
          summaryMsg1: "Your payment has been sent to %{recipient}",
          summaryMsg2: "The expected processing time for this order is",
          summaryMsg3: "You can check the status of your order on your",
          purchasesPage: "purchases page",
          returnAddress: "Return Address",
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.",
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible",
          directPaymentTo: "Direct Payment to",
          paymentSent: "Payment Sent!",
          total: "Total"
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }
      },
      {
        langName: "Espa&ntilde;ol",
        langCode: "sp",
        Next: "Siguiente",
        IAgree: "Estoy de acuerdo",
        Back: "Atr&aacute;s",
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "Omitir",
        Done: "Hecho",
        Navigation: "Navigation", //notTranslated
        Cancel: "Cancelar",
        Yes: "S&iacute;",
        No: "No",
        of: "de",
        Sell: "Vender",
        New: "Nuevo",
        Excellent: "Excelente",
        Good: "Bueno",
        Poor: "Deteriorado",
        SKU: "SKU",
        Refurbished: "Restaurado",
        Physical: "F&iacute;sico",
        Digital: "Digital",
        Service: "Servicio",
        Visit: "Ver p&aacute;gina",
        Item: "Art&iacute;culo",
        Items: "Art&iacute;culos",
        Stores: "Tiendas",
        Follow: "Seguir",
        Feed: "Feed",
        FeedPlaceholder: "RSS de las p&aacute;ginas que sigue",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "Dejar de seguir",
        About: "Acerca de",
        NoDescriptionAdded: "No hay descripci&oacute;n a&ntilde;adida",
        NoListings: "No listings", //notTranslated
        AboutEmpty: "La secci&oacute;n Acerca de est&aacute; en blanco ...",
        Followers: "Seguidores",
        Following: "Siguiendo a",
        Message: "Mensaje",
        Messages: "Mensajes",
        Store: "Tienda",
        Edit: "Editar",
        Used: "Usado",
        Delete: "Borrar",
        DontDelete: "No Borrar",
        ConfirmDelete: "Confirmar eliminaci&oacute;n",
        Website: "Sitio Web",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Bienvenido",
        CreateStore: "Crear Tienda",
        GoToMyPage: "Ir a mi p&aacute;gina",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "B&uacute;squeda por palabra clave",
        SearchFeedPlaceholder: "B&uacute;squeda por nombre o apodo",
        SearchForFollowersPlaceholder: "B&uacute;squeda por nombre o apodo",
        SearchForUsersPlaceholder: "B&uacute;squeda por nombre o apodo",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomestic: "3-5 d&iacute;s h&aacute;biles",
        EstDeliveryInternational: "7-15 d&iacute;s h&aacute;biles",
        TermsAndConditionsPlaceholder: "Introduzca T&eacute;rminos y condiciones...",
        TitlePlaceholder: "Introduzca t&iacute;tulo",
        DescriptionPlaceholder: "Introduzca descripci&ooacute;n",
        ReturnPolicyPlaceholder: "Introduzca pol&iacute;ticas de devoluciones",
        CategoryPlaceholder: "Introduzca categor&iacute;a",
        CategoryHelperText: "Las categor&iacute;as se utilizan para agrupar y organizar art&iacute;culos dentro de su tienda.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText : "Establecer una fecha para que el art&iacute;culo sea autom&aacute;ticammente retirado de su tienda.",
        ClearExpirationDate : "Limpiar Fecha de Vencimiento",
        ReturnPolicy: "Pol&iacute;tica de devoluciones",
        TermsAndConditions: "T&eacute;rminos y Condiciones",
        Photos: "Fotos",
        Added: "Agregado",
        Categorization: "Categorizaci&oacute;n",
        Expiration: "Vencimiento",
        Search: "Buscar",
        Email: "Correo electr&oacute;nico",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "COMPRAR AHORA",
        Description: "Descripci&oacute;n",
        Reviews: "Cr&iacute;ticas",
        Shipping: "Envío",
        Addresses: "Direcciones",
        NewAddress: "Nueva Direcci&oacute;n",
        CurrentAddress: "Direcciones actuales",
        Returns: "Devoluciones",
        ReturnsPolicy: "Pol&iacute;tica de devoluciones",
        Ampersand: "y",
        ShipsFrom: "Realiza env&iacute;os desde",
        ShipsTo: "Realiza env&iacute;os a",
        Optional: "Opcional",
        Customize: "Personalizar",
        Save: "Guardar",
        Changes: "Cambios",
        SaveChanges: "Guardar Cambios",
        YourNombre: "Su nombre",
        BitcoinReturnAddress: "Direcci&oacute;n de devoluciones Bitcoin",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "Moneda local",
        TimeZone: "Zona horaria",
        ShipToName: "Env&iacute;r a nombre de",
        ShipToStreet: "Enviar a esta direcci&oacute;n",
        ShipToCity: "Ciudad",
        ShipToState: "Estado/Provincia/Regi&oacute;n",
        ShipToPostalCode: "C&oacute;digo postal",
        PostalCode: "C&oacute;digo postal",
        ShipToCountry: "Pa&iacute;s",
        EnableNotifications: "Activar notificaciones",
        EnableSSL: "Habilitar SSL",
        LibbitcoinServerAddress: "Direcci&oacute;n del servidor Libbitcoin",
        ServerIPPort: "IP del Servidor : Puerto",
        All: "Todo",
        Name: "Nombre",
        Price: "Precio",
        Available: "Disponible",
        Tags: "Tags", //notTranslated
        Keywords: "Palabras claves",
        Type: "Tipo",
        Condition: "Condici&oacute;n",
        NSFW: "18+ (contenido para adultos)",
        Select: "Select", //not translated
        Social: "Social", //not translated
        Theme: "Theme", //not translated
        Listing: "Listing", //not translated
        Listings: "Listings", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Pages", //not translated
        Page: "Page", //not translated
        Language: "Language", //not translated
        Reset: "Reset", //not translated
        Local: "Local",
        Domestic: "Interno",
        Location: "Ubicaci&oacute;n",
        International: "Internacional",
        Time: "Hora",
        Free: "Gratis",
        Category: "Categor&iacute;a",
        ProcessingTime: "Tiempo de procesamiento",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Arrastre o suba fotos",
        UploadCoverPhoto: "Suba una foto de portada",
        ExpirationDate: "Fecha de vencimiento",
        ShortDescription: "Breve descripci&oacute;n",
        UpTo140Characters: "Hasta 140 caracteres",
        PrimaryColor : "Color primario",
        SecondaryColor : "Color secundario",
        TextColor : "Color del texto",
        BackgroundColor : "Color de fondo",
        WelcomeToYourPage: "Bienvenido a su p&aacute;gina!",
        SearchForCategory: "B&uacute;squeda de categor&iacute;a",
        Moderators: "Moderadores",
        CurrentModerators: "Moderadores Actuales",
        AddModerators: "Add New Moderadores",
        DeselectToRemoveModerator: "Desactive los moderadores que desea eliminar",
        SelectToAddModerator: "Seleccione los moderadores que desee agregar",
        Categories: "Categor&iacute;as",
        UpTo3: "Hasta 3",
        AboutYourStore: "Una descripci&oacute;n de su tienda",
        PaymentType: "Tipo de pago",
        ShipTo: "Enviar a",
        OrderDetails: "Detalles Orden",
        OrderSummary : " Resumen Orden",
        AllListings: "Todos los listados",
        ComingSoon: "Pr&oacute;ximamente",
        PaymentPending: "En espera del pago",
        FinalizePurchase: "Finalizar Compra",
        LoadingImage: "Cargando Imagen ... ",
        UploadAvatar: "Subir Avatar ",
        SaveAvatar: "Guardar Avatar ",
        NewAvatar: "Seleccione Nuevo Avatar",
        NewCoverImage: "Seleccione Nueva Imagen de la Cubierta",
        Loading: "Loading...", // not translated
        Purchases:"Compras",
        Sales: "Sales", // not translated
        Cases: "Cases", // not translated
        Enter: "Enter", //notTranslated
        Discover: "Discover", // not translated
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Blocked", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        FreeShipping: "Free Shipping", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Visibility: "Visibility", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        DomesticShippingTime: "Domestic Shipping Time", // not translated
        InternationalShippingTime: "International Shipping Time", // not translated
        DisplayNSFWcontent: "Display NSFW content?", // not translated
        Basic: "Basic", // not translated
        Content: "Content", // not translated
        StandardThemes: "Standard themes", // not translated
        NoPhotosAdded: "No Photos Added", // not translated
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Sold By", // not translated
          PurchasedBy: "Purchased By", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Paid (Funds Waiting)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Paid (Funds Waiting)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "Los datos no se pudieron guardar.",
          getError: "Los datos no se pudieron recuperar.",
          missingError: "Algunos campos faltan o est&aacute;n incorrectos.",
          serverError: "Una respuesta incorrecta se recibi&oacute; desde el servidor.",
          userError: "La informaci&oacute;n para este ID no se pudo encontrar",
          userNotFoundError: "La informaci&oacute;n de esta persona no est&aacute; disponible. Es posible que se haya desconectado.",
          notFoundError: "Los datos no se pudieron cargar para:",
          socketError: "La URL del WebSocket fall&oacute;. Conectando a socket con la direcci&oacute;n predeterminada de ws://localhost:18466",
          contractError: "Este artículo no puede ser comprado" ,
          sellerError: "El servidor del vendedor ha rechazado la solicitud de compra",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "Guardado",
          SaveSuccess: "Se han guardado los cambios."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "Todos los tipos",
          pagesStores: "Tiendas",
          pagesMods: "Servicios de moderadores",
          pagesBasic: "Usuarios b&aacute;sicos",
          listingsCurated: "De tiendas que sigo",
          listingsAll: "De dodas las tiendas"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "Mi p&aacute;gina",
          customizePage:"Personalizar P&aacute;gina",
          sellItem:"Nuevo",
          createListing:"Nuevo Listado",
          purchases:"Compras",
          sales:"Ventas",
          cases:"Casos",
          notifications:"Notificaciones",
          settings:"Ajustes",
          about:"Acerca de OpenBazaar",
          support:"Soporte OpenBazaar"
        },
        onboarding: {
          intro: "Personalice Su OpenBazaar",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "", //notTranslated
          Theme: "Seleccione un tema para su p&aacute;gina",
          chooseLanguage: "Seleccione idioma",
          contributors: "%{smart_count} Colaboradores |||| %{smart_count} Colaboradores",
          configure: "Configure su Experiencia",
          disclaimer_title: "Nota Legal",
          disclaimer_body: "OpenBazaar es una red para el intercambio de bienes y servicios directamente entre la gente - utilizando Bitcoin - sin ninguna organizaci&oacute;n central que controle la plataforma. Esto quiere decir que eres responsable por tus propias actividades dentro de la red.\n\nLa plataforma de OpenBazaar NO HACE ANONIMOS a sus usuarios en forma predeterminada. La mayor&iacute;a de las comunicaciones entre las partes son encriptadas, pero las direcciones IP son p&uacute;blicas y pueden ser asociadas con la actividad en la red. Entes maliciosos pudieran utilizar esta informaci&oacute;n en su contra; el proteger su privacidad es su propia responsabilidad.\n\nLos usuarios de OpenBazaar deben apegarse tanto a las leyes de su propia jurisdicci&oacute;n legal, as&iacute; como a su conciencia. Los desarrolladores de OpenBazaar no condonan - y no son responsables de - ning&uacute;n uso de la plataforma para actividades ilegales.\n\nLa comunidad de desarrolladores de OpenBazaar ha trabajado duro en entregar una plataforma libre para el comercio internacional. Pero como en todo software, podr&iacute;a encontrar errores. Los desarrolladores no son responsables por ninguna p&eacute;rdida monetaria asociada a problemas con el software.\n\nAl utilizar OpenBazaar Ud. es responsable de sus propias acciones en la red OpenBazaar.",
          yourCountry: "Seleccione su pa&iacute;s",
          localCurrency: "Moneda Local",
          LanguagePlaceholder: "Buscar por idioma",
          CountryPlaceholder: "Buscar por pa&iacute;s",
          CurrencyPlaceholder: "Buscar por moneda",
          TimezonePlaceholder: "Seleccione su zona horaria",
          ShortDescriptionPlaceholder: "Say something interesting... (160 char max)", //not translated
          timeZone: "Zona Horaria",
          yourDetails: "Establecer su informaci&oacute;n",
          yourDescription: "Descripci&oacute;n",
          handle: "Apodo",
          chooseHandle: "Choose a handle", // not translated
          knownAs: "A Ud. se le conoce como:",
          wouldYou: "Desea registrar un apodo f&aacute;cil de recordar?",
          registerNew: "Registrar Nuevo",
          recommended: "P&aacute;ginas Recomendadas a Seguir",
          connectExisting: "Conectar Existente",
          avatar: "Establecer un Avatar",
          chooseAvatar: "Seleccione avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        buyFlow: {
          DirectPayment: "Direct Payment", //notTranslated
          SendDirectlyTo: "Send direct payment to %{handle}", //notTranslated
          MustAddAddress: "Usted debe agregar una dirección para env&iacute;os",
          VendorShipsTo: "Este proveedor despacha a estos países",
          DoesNotShipHere: "Does not ship here", //notTranslated
          Send: "Semd", //notTranslated
          BTCto: "BTC to", //notTranslated
          SendBTCtoAddress: "Send %{amount} BTC to", //notTranslated
          OpenAddress: "Open in Local Wallet", //notTranslated
          CopyAddress: "Copy to Clipboard", //notTranslated
          RefreshPayment: "Refresh Payment Status", //notTranslated
          summaryMsg1: "Your payment has been sent to %{recipient}", //notTranslated
          summaryMsg2: "The expected processing time for this order is", //notTranslated
          summaryMsg3: "You can check the status of your order on your", //notTranslated
          purchasesPage: "purchases page", //notTranslated
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          directPaymentTo: "Direct Payment to", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }
      },
      {
        langName: "German",
        langCode: "de",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Weiter",
        IAgree: "Akzeptieren",
        Back: "Zur&uuml;ck",
        EnterMessage: "Nachricht eingeben...",
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "&Uuml;berspringen",
        Done: "Fertig",
        Navigation: "Navigation", //notTranslated
        Cancel: "Abbrechen",
        Yes: "Ja",
        No: "Nein",
        of: "von",
        Sell: "Verkaufen",
        New: "Neu",
        Excellent: "Hervorragend",
        Good: "Gut",
        Poor: "Mangelhaft",
        SKU: "SKU",
        Refurbished: "&Uuml;berholt",
        Physical: "Physisch",
        Digital: "Digital",
        Service: "Dienstleistung",
        Visit: "Seite anzeigen",
        Item: "Gegenstand",
        Items: "Gegenst&auml;nde",
        Stores: "L&auml;den",
        Follow: "Folgen",
        Feed: "Feed",
        FeedPlaceholder: "Neuigkeiten aller Seiten denen du folgst",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "Nicht mehr folgen",
        About: "&Uuml;ber",
        NoDescriptionAdded: "Keine Beschreibung hinzugefügt",
        NoListings: "No listings", //notTranslated
        CoverPhoto: "Titelbild",
        AboutEmpty: "'&Uuml;ber' ist leer...",
        Followers: "Follower",
        Following: "Folgt",
        Message: 'Nachricht',
        Messages: "Messages",//notTranslated
        Store: "Laden",
        Edit: "Bearbeiten",
        Used: "Gebraucht",
        Delete: "L&ouml;schen",
        DontDelete: "Nicht l&ouml;schen",
        ConfirmDelete: "L&ouml;schen best&auml;tigen",
        Website: "Webseite",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Willkommen",
        CreateStore: "Werde ein Verk&auml;ufer",
        GoToMyPage: "Zur eigenen Seite",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Nach Name oder Schlagwort suchen",
        SearchFeedPlaceholder: "Nach GUID oder Handle suchen",
        SearchForFollowersPlaceholder: "Nach GUID oder Handle suchen",
        SearchForUsersPlaceholder: "Nach GUID oder Handle suchen",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 Werktage",
        EstDeliveryInternationalPlaceholder: "7-15 Werktage",
        OrderProcessingTimePlaceholder: "1-2 Werktage",
        TermsAndConditionsPlaceholder: "Gesch&auml;ftsbedingungen eingeben...",
        TitlePlaceholder: "Titel eingeben",
        DescriptionPlaceholder: "Beschreibung eingeben...",
        ReturnPolicyPlaceholder: "R&uuml;ckgabebedingungen eingeben...",
        CategoryPlaceholder: "Kategorie eingeben",
        CategoryHelperText: "Kategorien werden verwendet um Gegenst&auml;nde in deinem Laden zu gruppieren und organisieren",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "Setze ein Datum, an dem dein Gegenstand automatisch gel&ouml;scht werden soll.",
        ClearExpirationDate: "L&ouml;sche das Verfallsdatum",
        ReturnPolicy: "R&uuml;cknahmebedingungen",
        TermsAndConditions: "Gesch&auml;ftsbedingungen",
        Photos: "Fotos",
        Added: "Hinzugef&uuml;gt",
        Categorization: "Kategorisierung",
        Expiration: "Ablauf",
        Search: "Suchen",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "JETZT KAUFEN",
        Description: "Beschreibung",
        Reviews: "Rezensionen",
        Shipping: "Versand",
        Addresses: "Adressen",
        NewAddress : "Neue Adresse",
        CurrentAddress : "Aktuelle Adressen",
        Returns: "R&uuml;ckgabe",
        ReturnsPolicy: "R&uuml;cknahmebedingungen",
        Ampersand: "&",
        ShipsFrom: "Versand von",
        ShipsTo: "Versand nach",
        Optional: "Optional",
        Customize: "Anpassen",
        Save: "Speichern",
        Changes: "&Auml;nderungen",
        SaveChanges: "&Auml;nderungen speichern",
        YourName: "Dein Name",
        BitcoinReturnAddress: "Bitcoin R&uuml;cksendeaddresse",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "Lokale W&auml;hrung",
        TimeZone: "Zeitzone",
        ShipToName: "Empfänger",
        ShipToStreet: "Straße",
        ShipToCity: "Stadt",
        ShipToState: "Bundesland/Landkreis/Region",
        ShipToPostalCode: "Postleitzahl",
        PostalCode: "Postleitzahl",
        ShipToCountry: "Land",
        EnableNotifications: "Benachrichtigungen aktivieren",
        EnableSSL: "SSL aktivieren",
        LibbitcoinServerAddress: "Libbitcoin Server Addresse",
        ServerIPPort: "Server IP:Port",
        All: "Alle",
        Name: "Name",
        Price: "Preis",
        Available: "Verf&uuml;gbar",
        Tags: "Tags", //notTranslated
        Keywords: "Stichw&ouml;rter",
        Type: "Typ",
        Condition: "Zustand",
        NSFW: "18+ (nicht jugendfreie Inhalte)",
        Select: "Select", //not translated
        Social: "Social", //not translated
        Theme: "Theme", //not translated
        Listing: "Listing", //not translated
        Listings: "Listings", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Pages", //not translated
        Page: "Page", //not translated
        Language: "Language", //not translated
        Reset: "Reset", //not translated
        Local: "Lokal",
        Domestic: "Inland",
        Location: "Standort",
        International: "International",
        Time: "Zeit",
        Free: "Kostenlos",
        Category: "Kategorie",
        ProcessingTime: "Bearbeitungszeit",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Fotos hier hin ziehen oder hochladen",
        ExpirationDate: "Ablaufdatum",
        UploadCoverPhoto: "Titelbild hochladen",
        ShortDescription: "Kurzbeschreibung",
        UpTo140Characters: "Bis zu 140 Zeichen",
        PrimaryColor: "Prim&auml;rfarbe",
        SecondaryColor: "Sekond&auml;rfarbe",
        TextColor: "Textfarbe",
        CoverPhotoButton: "Titelbild auswählen",
        AboutPlaceholder: "Beschreibung",
        BackgroundColor: "Hintergrundfarbe",
        NotificationFollow: "folgt dir nun.",
        NoNotifications: "Keine Benachrichtigungen",
        WelcomeToYourPage: "Willkommen auf deiner Seite!",
        SearchForCategory: "Nach Kategorie suchen",
        Moderators: "Moderator",
        CurrentModerators: "Aktuelle Moderatoren",
        AddModerators: "Neuen Moderator hinzufügen",
        DeselectToRemoveModerator: "Moderatoren abw&auml;hlen, welche Sie entfernen wollen.",
        SelectToAddModerator: "Moderatoren ausw&auml;hlen, welche Sie hinzufügen wollen.",
        Categories: "Kategorien",
        UpTo3: "Bis zu 3",
        AboutYourStore: "Eine Beschreibung deines Ladens",
        PaymentType: "Zahlungsmethode",
        ShipTo: "Versenden an",
        OrderDetails: "Details zur Bestellung",
        OrderSummary: "Bestellungsübersicht",
        AllListings: "Alle Eintr&auml;ge",
        ComingSoon: "Demn&auml;chst verf&uuml;gbar",
        PaymentPending: "Zahlung steht aus",
        FinalizePurchase: "Kauf abschliessen",
        LoadingImage: "Bild wird geladen...",
        UploadAvatar: "Avatar hochladen",
        SaveAvatar: "Avatar speichern",
        NewAvatar: "W&auml;hlen Sie New Avatar",
        NewCoverImage: "W&auml;hlen Sie New Cover Image",
        Loading: "Loading...", // not translated
        Purchases:"Eink&auml;ufe",
        Sales: "Sales", // not translated
        Cases: "Cases", // not translated
        Enter: "Enter", //notTranslated
        Discover: "Discover", // not translated
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Blocked", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        FreeShipping: "Free Shipping", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Visibility: "Visibility", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        DomesticShippingTime: "Domestic Shipping Time", // not translated
        InternationalShippingTime: "International Shipping Time", // not translated
        DisplayNSFWcontent: "Display NSFW content?", // not translated
        Basic: "Basic", // not translated
        Content: "Content", // not translated
        StandardThemes: "Standard themes", // not translated
        NoPhotosAdded: "No Photos Added", // not translated
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Sold By", // not translated
          PurchasedBy: "Purchased By", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Paid (Funds Waiting)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Paid (Funds Waiting)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "Daten konnten nicht gespeichert werden.",
          getError: "Daten konnten nicht empfangen werden.",
          missingError: "Einige Felder fehlen oder sind fehlerhaft.",
          serverError: "Eine falsche R&uuml;ckmeldung wurde von dem Server empfangen.",
          userError: "Informationen f&uuml;r diese ID konnten nicht gefunden werden",
          userNotFoundError: "Die Informationen dieser Person sind nicht verf&uuml;gbar. M&ouml;glicherweise ist sie offline.",
          notFoundError: "Daten konnten nicht geladen werden f&uuml;r:",
          socketError: "URL f&uuml;r den Websocket ist fehlgschlagen. Verbindung mit der Standard-Addresse ws://localhost:18466 wird aufgebaut.",
          contractError: "Dieser Artikel kann nicht gekauft werden",
          sellerError: "Die Kaufanfrage wurde vom Server des Verkäufers abgelehnt",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "Gespeichert",
          SaveSuccess: "Ihre &Auml;nderungen wurden gespeichert."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "Alle Arten",
          pagesStores: "L&auml;den",
          pagesMods: "Moderator Services",
          pagesBasic: "Normaler Benutzer",
          listingsCurated: "Von L&auml;den, welchen ich folge",
          listingsAll: "Von allen L&auml;den"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "Meine Seite",
          customizePage:"Seite anpassen",
          sellItem:"Neu",
          createListing:"Neuer Eintrag",
          purchases:"Eink&auml;ufe",
          sales:"Verk&auml;ufe",
          cases:"F&auml;lle",
          notifications:"Benachrichtigungen",
          settings:"Einstellungen",
          about:"&Uuml;ber OpenBazaar",
          support:"OpenBazaar unterst&uuml;tzen"
        },
        onboarding: {
          intro: "OpenBazaar Konfiguration",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "", //notTranslated
          Theme: "W&auml;hle ein Farbschema f&uuml;r deine Seite",
          chooseLanguage: "W&auml;hle deine Sprache",
          contributors: "%{smart_count} Mitwirkeder |||| %{smart_count} Mitwirkende",
          configure: "Konfiguriere dein Erlebnis",
          disclaimer_title: "Ausschlussklausel",
          disclaimer_body: "OpenBazaar is a network for trading goods and services directly between people - using Bitcoin - without any central organization controlling the platform. This means you are responsible for your own activity on the network.\n\nOpenBazaar users are not anonymous by default. Most communications between parties are encrypted, but IP addresses are public and can be associated with activity on the network. Malicious parties could use this information against you; protecting your privacy is your own responsibility.\n\nOpenBazaar users must adhere to the laws in their own legal jurisdiction as well as their conscience. The OpenBazaar developers do not condone - and are not responsible for - any use of the platform for illegal activity.\n\nThe OpenBazaar community of developers has worked hard to deliver a free platform for trade to the world. But as with any software, bugs will be found. The developers are not responsible for any monetary loss associated with problems in the software.\n\nBy using OpenBazaar you're responsible for your own actions on the OpenBazaar network.",
          yourCountry: "W&auml;hle dein Land",
          localCurrency: "W&auml;hle deine W&auml;hrung",
          LanguagePlaceholder: "Suche nach Sprache",
          CountryPlaceholder: "Suche nach Land",
          CurrencyPlaceholder: "Suche nach W&auml;hrung",
          TimezonePlaceholder: "Suche nach Zeitzone",
          ShortDescriptionPlaceholder: "Sage etwas interessantes... (maximal 160 Zeichen)",
          timeZone: "W&auml;hle deine Zeitzone",
          yourDetails: "Setze deine Details",
          yourDescription: "Beschreibung",
          handle: "Handle",
          chooseHandle: "Choose a handle", // not translated
          knownAs: "Du bist derzeit bekannt als:",
          wouldYou: "Willst du dir einen leicht zu merkenden Handle registrieren?",
          registerNew: "Neu registrieren",
          recommended: "Empfohlene Seiten",
          connectExisting: "Verbinde existierenden",
          avatar: "Setze einen Avatar",
          chooseAvatar: "W&auml;hle einen Avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        buyFlow: {
          DirectPayment: "Direct Payment", //notTranslated
          SendDirectlyTo: "Send direct payment to %{handle}", //notTranslated
          MustAddAddress: "Sie m&uuml;ssen eine Versandadresse hinzuzuf&uuml;gen",
          VendorShipsTo: "Dieser Anbieter versendet nach",
          DoesNotShipHere: "Does not ship here", //notTranslated
          Send: "Semd", //notTranslated
          BTCto: "BTC to", //notTranslated
          SendBTCtoAddress: "Send %{amount} BTC to", //notTranslated
          OpenAddress: "Open in Local Wallet", //notTranslated
          CopyAddress: "Copy to Clipboard", //notTranslated
          RefreshPayment: "Refresh Payment Status", //notTranslated
          summaryMsg1: "Your payment has been sent to %{recipient}", //notTranslated
          summaryMsg2: "The expected processing time for this order is", //notTranslated
          summaryMsg3: "You can check the status of your order on your", //notTranslated
          purchasesPage: "purchases page", //notTranslated
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          directPaymentTo: "Direct Payment to", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "Italiano",
        langCode: "it",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Avanti",
        IAgree: "Sono d'accordo",
        Back: "Indietro",
        EnterMessage: "Inserire messaggio...",
        Reload: "Ricaricare",
        You: "Tu",
        Skip: "Salta",
        Done: "Finito",
        Navigation: "Navigation", //notTranslated
        Cancel: "Annulla",
        ClosingOpenBazaar: "Close (Your page will go offline)", //notTranslated
        Minimize: "Minimize", //notTranslated
        Maximize: "Maximize", //notTranslated
        Close: "Chiudi",
        Yes: "Si",
        No: "No",
        of: "di",
        Sell: "Vendere",
        New: "Nuovo",
        Excellent: "Eccellente",
        Good: "Buono",
        Poor: "Scarso",
        SKU: "SKU",
        Refurbished: "Ricondizionato",
        Physical: "Fisico",
        Digital: "Digitale",
        Service: "Servizio",
        Visit: "Visualizza pagina",
        Item: "Oggetto",
        Items: "Oggetti",
        Stores: "Negozi",
        Follow: "Segui",
        Feed: "Feed",
        FeedPlaceholder: "Un feed di aggiornamenti da tutte le pagine che segui",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "Smetti di seguire",
        About: "About",
        NoDescriptionAdded: "Nessuna descrizione aggiunta",
        NoListings: "No listings", //notTranslated
        CoverPhoto: "Foto di copertina",
        AboutEmpty: "L'about &egrave; vuoto...",
        Followers: "Seguaci",
        Following: "Segue",
        Message: "Messaggio",
        Messages: "Messaggi",
        Store: "Negozio",
        Edit: "Modifica",
        Used: "Usato",
        Delete: "Cancella",
        DontDelete: "Non eliminare",
        ConfirmDelete: "Conferma cancellazione",
        Website: "Sito web",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Benvenuto",
        CreateStore: "Diventa un negozio",
        GoToMyPage: "Vai alla mia pagina",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Cerca per nome o parola chiave",
        SearchFeedPlaceholder: "Cerca per nickname o guid",
        SearchForFollowersPlaceholder: "Cerca per nickname o guid",
        SearchForUsersPlaceholder: "Cerca per nickname o guid",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 giorni di lavoro",
        EstDeliveryInternationalPlaceholder: "7-15 giorni di lavoro",
        OrderProcessingTimePlaceholder: "1-2 giorni di lavoro",
        TermsAndConditionsPlaceholder: "Inserire termini e condizioni...",
        TitlePlaceholder: "Inserire titolo",
        DescriptionPlaceholder: "Inserire descrizione...",
        ReturnPolicyPlaceholder: "Inserire politiche di restituazione...",
        CategoryPlaceholder: "Inserire categoria",
        CategoryHelperText: "Le categorie sono usate per raggruppare e organizzare gli oggetti nel tuo negozio.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "Imposta una data per l'oggetto per far si che venga tolto automaticamente dal tuo negozio.",
        ClearExpirationDate: "Cancella data di scadenza",
        ReturnPolicy: "Politica di restituzione",
        TermsAndConditions: "Termini e condizioni",
        Photos: "Foto",
        Added: "Aggiunto",
        Categorization: "Categorizzazione",
        Expiration: "Scadenza",
        Search: "Ricerca",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "COMPRA ORA",
        Description: "Descrizione",
        Reviews: "Recensioni",
        Shipping: "Spedizione",
        Addresses: "Indirizzi",
        NewAddress: "Nuovo indirizzo",
        CurrentAddress: "Indirizzo attuale",
        Returns: "Restituzione",
        ReturnsPolicy: "Politica di restituzione",
        Ampersand: "&",
        Tags: "Tags", //notTranslated
        Keywords: "Parole chiave",
        ShipsFrom: "Inviato da",
        ShipsTo: "Inviato verso",
        Optional: "Facoltativo",
        Customize: "Personalizza",
        Save: "Salva",
        Changes: "Modifiche",
        SaveChanges: "Salva modifiche",
        YourName: "Tuo nome",
        BitcoinReturnAddress: "Indirizzo Bitcoin di restituzione",
        BitcoinReturnAddressPlaceholder: "Inserire indirizzo bitcoin...",
        BitcoinReturnAddressInfo: "In caso di restituzione, i tuoi soldi verranno messi nel seguente indirizzo.",
        LocalCurrency: "Moneta locale",
        TimeZone: "Fuso orario",
        ShipToName: "Invia a nominativo",
        ShipToStreet: "Invia all'indirizzo",
        ShipToCity: "Invia alla citt&agrave;",
        ShipToState: "Invia alla Stato/Provincia/Regione",
        ShipToPostalCode: "Invia al codice postale",
        PostalCode: "Codice postale",
        ShipToCountry: "Invia alla nazione",
        EnableNotifications: "Abilita notifiche",
        EnableSSL: "Abilita SSL",
        LibbitcoinServerAddress: "Indirizzo del server Libbitcoin",
        ServerIPPort: "Server IP:Port",
        All: "Tutti",
        Name: "Nome",
        Price: "Prezzo",
        Available: "Disponibile",
        Type: "Tipo",
        Condition: "Condizione",
        NSFW: "18+ (Materiale per adulti)",
        Select: "Seleziona",
        Social: "Social",
        Theme: "Argomento",
        Listing: "Listato",
        Listings: "Listati",
        ViewPage: "View page", //notTranslated
        Pages: "Pagine",
        Page: "Pagina",
        Language: "Lingua",
        Reset: "Reset",
        Local: "Locale",
        Domestic: "Nazionale",
        Location: "Locazione",
        International: "Internazionale",
        Time: "Tempo",
        Free: "Gratuito",
        Category: "Categoria",
        ProcessingTime: "Tempo di preparazione",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Trascina o carica foto",
        ExpirationDate: "Scadenza per il",
        UploadCoverPhoto: "Carica una foto di copertina",
        ShortDescription: "Breve descrizione",
        UpTo140Characters: "Fino a 140 caratteri",
        PrimaryColor: "Colore principale",
        SecondaryColor: "Colore secondario",
        TextColor: "Colore testo",
        CoverPhotoButton: "Seleziona foto di copertina",
        AboutPlaceholder: "Descrizione completa",
        BackgroundColor: "Colore di sfondo",
        NotificationFollow: "ora ti sta seguendo",
        NoNotifications: "Nessuna notifica",
        WelcomeToYourPage: "Benvenuto alla tua pagina!",
        SearchForCategory: "Cerca per categoria",
        Moderators: "Moderatori",
        CurrentModerators: "Moderatori Correnti",
        AddModerators: "Aggiungere Nuovi Moderatori",
        DeselectToRemoveModerator: "Deselezionare i moderatori che si desidera rimuovere",
        SelectToAddModerator: "Selezionare i moderatori che si desidera aggiungere",
        Categories: "Categorie",
        UpTo3: "Fino a 3",
        AboutYourStore: "Una descrizione del tuo negozio",
        PaymentType: "Tipo di pagamento",
        ShipTo: "Invia a",
        FreeShipping: "Spedizione gratuita",
        OrderDetails: "Dettaglio ordine",
        OrderSummary: "Riepilogo ordine",
        AllListings: "Tutti gli annunci",
        ComingSoon: "In arrivo",
        PaymentPending: "Pagamento in sospeso",
        FinalizePurchase: "Finalizza acquisto",
        LoadingImage: "Caricamento immagine...",
        UploadAvatar: "Carica Avatar",
        SaveAvatar: "Salva Avatar",
        NewAvatar: "Selezionare Nuovo Avatar",
        NewCoverImage: "Selezionare Nuovo Copertina",
        Loading: "Caricamento...",
        Purchases: "Acquisti",
        Sales: "Vendite",
        Cases: "Cause",
        Enter: "Enter", //notTranslated
        Discover: "Trova",
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Bloccato",
        Advanced: "Avanzato",
        General: "Generale",
        AllItems: "Tutti gli articoli",
        DomesticShippingPrice: "Prezzo per invio nazionale",
        InternationalShippingPrice: "Prezzo per invio internazionale",
        MinimumIs: "Il minimo &eacute;",
        Visibility: "Visibilit&agrave;",
        Title: "Titolo",
        DigitalItem: "Articolo digitale",
        PhysicalItem: "Articolo fisico",
        DomesticShippingTime: "Tempo di invio nazionale",
        InternationalShippingTime: "Tempo di invio internazionale",
        DisplayNSFWcontent: "Mostrare contenuto NSFW?",
        Basic: "Base",
        Content: "Contenuto",
        StandardThemes: "Temi standard",
        NoPhotosAdded: "Nessuna foto aggiunta",
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Venduto da",
          PurchasedBy: "Comprato da",
          searchByOrder: "Ricerca per ID di ordine o nome articolo",
          sortByStatusAll: "Tutti",
          sortByStatus0: "Comprato",
          sortByStatus1: "Pagato (fondi in attesa)",
          sortByStatus2: "Confermato/Inviato",
          sortByStatus3: "Completato (fondi rilasciati)",
          sortByStatus4: "Contestato",
          OrderID: "ID Ordine",
          OrderDate: "Data ordine",
          OrderStatus: "Stato dell'ordine",
          OrderStatus0: "Comprato (non finanziato)",
          OrderStatus1: "Pagato (fondi in attesa)",
          OrderStatus2: "Confermato/Inviato",
          OrderStatus3: "Completato (fondi rilasciati)",
          OrderStatus4: "Contestato",
          OrderTotal: "Totale ordine",
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "I dati non sono stati salvati.",
          getError: "I dati non sono stati recuperati.",
          missingError: "Alcuni campi sono mancanti o non corretti.",
          serverError: "E' stata ricevuta dal server una risposta non corretta.",
          userError: "Non &egrave; stato possibile trovare le informazioni di questo ID.",
          userNotFoundError: "Le informazioni di questa persona non sono disponibili. Potrebbero essere scollegati.",
          notFoundError: "I dati non sono stati caricati per:",
          socketError: "Connessione all'URL per WebSocket fallita. Connettere al socket con l'indirizzo di default ws://localhost:18466",
          contractError: "Questo articolo non pu&ograve; essere acquistato",
          sellerError: "Il server del venditore ha respinto la richiesta di acquisto",
          checkPurchaseData: "Controlla i tuoi dati di acquisto, come la quantit&agrave; e l'indirizzo Bitcoin di restituzione, per essere sicuro che sia tutto corretto",
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "Salvato",
          SaveSuccess: "Le modifiche sono state salvate."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "Tutti i tipi",
          pagesStores: "Negozi",
          pagesMods: "Servizi di moderazione",
          pagesBasic: "Utenti normali",
          listingsCurated: "Dai negozi che seguo",
          listingsAll: "Da tutti i negozi"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "La mia pagina",
          customizePage: "Personalizza pagina",
          sellItem: "Nuovo",
          createListing: "Crea elenco",
          purchases: "Acquisti",
          sales: "Vendite",
          cases: "Cause",
          notifications: "Notifiche",
          settings: "Impostazioni",
          about: "About OpenBazaar",
          support: "Supporto OpenBazaar"
        },
        onboarding: {
          intro: "Configurazione OpenBazaar",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "", //notTranslated
          Theme: "Seleziona un Tema per la tua pagina",
          chooseLanguage: "Seleziona la tua lingua",
          contributors: "%{smart_count} Contributore |||| %{smart_count} Contributori",
          configure: "Imposta la tua esperienza",
          disclaimer_title: "Disclaimer",
          disclaimer_body: "OpenBazaar &egrave; un network per scambi di beni e servizi direttamente fra le persone - usando Bitcoin - senza nessuna organizzazione centrale che controlli la piattaforma. Questo significa che tu sei responsabile per le tue attività sul network.\n\nGli utenti di OpenBazaar non sono anonimi di default. La maggior parte delle comunicazioni fra le parti sono cifrate, ma gli indirizzi IP sono pubblici e possono essere associati con le attivit&agrave; sul network. Parti malevole potrebbero utilizzare queste informazioni contro di voi; proteggere la tua privay è una tua responsabilit&agrave;.\n\nGli utenti di OpenBazaar devono rispettare le leggi nella propria giurisdizione legale cos&igrave; come la loro coscienza. Gli sviluppatori di OpenBazaar non perdonano - e non sono responsabili - per alcun uso illegale della piattaforma.\n\nLa comunit&agrave; deglo sviluppatori di OpenBazaar ha lavorato duramente per fornire una piattaforma libera per il commercio nel mondo. Ma come per ogni software, si troveranno bug. Gli sviluppatori non sono responsabili per alcuna perdita monetaria associata a problemi nel software.\n\nUsando OpenBazaar sei responsabile per le tue azioni sul network OpenBazaar.",
          yourCountry: "Seleziona il tuo paese",
          localCurrency: "Seleziona la tua moneta",
          LanguagePlaceholder: "Seleziona la tua lingua",
          CountryPlaceholder: "Cerca per paese",
          CurrencyPlaceholder: "Cerca per moneta",
          TimezonePlaceholder: "Cerca per fuso orario",
          ShortDescriptionPlaceholder: "Di qualcosa di interessante... (massimo 160 caratteri)",
          timeZone: "Seleziona il tuo fuso orario",
          yourDetails: "Imposta le tue informazioni",
          yourDescription: "Descrizione",
          handle: "Nickname",
          chooseHandle: "Scegli un nickname",
          knownAs: "Sei conosciuto come:",
          wouldYou: "Ti andrebbe di registrare un nickname facile da ricordare?",
          registerNew: "Registra nuovo",
          recommended: "Pagine raccomandate di seguire",
          connectExisting: "Collega ad esistente",
          avatar: "Imposta un Avatar",
          chooseAvatar: "Seleziona Avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finito"
        },
        buyFlow: {
          DirectPayment: "Pagamento diretto",
          SendDirectlyTo: "Invia pagamento diretto a %{handle}",
          MustAddAddress: "&Egrave; necessario aggiungere un indirizzo da spedire ai",
          VendorShipsTo: "Questo fornitore navi a questi paesi",
          DoesNotShipHere: "Questo venditore non invia qui",
          Send: "Invia",
          BTCto: "BTC a",
          SendBTCtoAddress: "Invia %{amount} BTC a",
          OpenAddress: "Apri indirizzo in portafoglio locale",
          CopyAddress: "Copia indirizzo di pagamento negli appunti",
          RefreshPayment: "Aggiorna lo stato di pagamento",
          summaryMsg1: "Il tuo pagamento è stato trasmesso a %{recipient}",
          summaryMsg2: "Il tempo previsto per il processo di quest'ordine &egrave;",
          summaryMsg3: "Puoi controllare lo stato del tuo ordine sulla tua",
          purchasesPage: "pagina acquisti",
          returnAddress: "Indirizzi di ritorno",
          moderatorPaymentDisclaimer: "Si applica solo se l'operazione si conclude in una contestazione.",
          directPaymentDisclaimer: "Usa il pagamento diretto con cauzione, i fondi sono irreversibili",
          directPaymentTo: "Pagamento diretto a",
          paymentSent: "Pagamento inviato!",
          total: "Totale"
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "Français",
        langCode: "fr-FR",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Suivant",
        IAgree: "Je suis d'accord",
        Back: "Retour",
        EnterMessage: "Entrer un message...",
        Reload: "Actualiser",
        You: "Vous",
        Skip: "Passer",
        Done: "Terminé",
        Navigation: "Navigation",
        Cancel: "Annuler",
        ClosingOpenBazaar: "Fermer (votre page sera déconnectée)",
        Minimize: "Réduire",
        Maximize: "Agrandir",
        Close: "Fermer",
        Yes: "Oui",
        No: "Non",
        of: "de",
        Sell: "Vendre",
        New: "Nouveau",
        Excellent: "Excellent",
        Good: "Bon",
        Poor: "Médiocre",
        SKU: "SKU",
        Refurbished: "Remis à neuf",
        Physical: "Physique",
        Digital: "Numérique",
        Service: "Service",
        Visit: "Voir",
        Item: "Article",
        Items: "Articles",
        Stores: "Boutiques",
        Follow: "Suivre",
        Feed: "Flux",
        FeedPlaceholder: "Un flux de mises à jour de toutes les pages que vous suivez",
        ViewListing: "Voir l'annonce",
        Unfollow: "Ne plus suivre",
        About: "&Agrave; propos",
        NoDescriptionAdded: "Aucune description ajoutée",
        NoListings: "Aucune annonce",
        CoverPhoto: "Photo de couverture",
        AboutEmpty: "&Agrave; propos est vide...",
        Followers: "Abonnés",
        Following: "Abonnements",
        Message: "Message",
        Messages: "Messages",
        Store: "Boutique",
        Edit: "Modifier",
        Used: "Utilisé",
        Delete: "Supprimer",
        DontDelete: "Ne pas supprimer",
        ConfirmDelete: "Confirmer la suppression",
        Website: "Site web",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Bienvenue",
        CreateStore: "Devenir une boutique",
        GoToMyPage: "Ma page",
        SearchForItemsPlaceholder: "Tapez #games, #shoes ou un autre #mot_clé...",
        SearchForPagesPlaceholder: "Rechercher par nom ou par mot-clé",
        SearchFeedPlaceholder: "Tapez un mot-clé...",
        SearchForFollowersPlaceholder: "Tapez un nom...",
        SearchForUsersPlaceholder: "Tapez un nom...",
        SearchOnUserStorePlaceholder: "Tapez un titre...",
        EstDeliveryDomesticPlaceholder: "3-5 jours ouvrés",
        EstDeliveryInternationalPlaceholder: "7-15 jours ouvrés",
        OrderProcessingTimePlaceholder: "Entrer le temps nécessaire pour traiter la commande",
        TermsAndConditionsPlaceholder: "Entrer les termes et conditions...",
        TitlePlaceholder: "Entrer un titre",
        DescriptionPlaceholder: "Entrer une description...",
        ReturnPolicyPlaceholder: "Entrer une condition de retour...",
        CategoryPlaceholder: "Entrer une catégorie",
        CategoryHelperText: "Les catégories sont utilisées pour regrouper et organiser les articles au sein de votre boutique.",
        KeywordsHelperText: "Ajouter des mots-clés permet à votre annonce d'être découverte sur le marché.",
        ExpirationDateHelperText: "Définir une date pour que l'article soit automatiquement retiré de votre boutique.",
        ClearExpirationDate: "Effacer la date d'expiration",
        ReturnPolicy: "Condition de retour",
        TermsAndConditions: "Termes et Conditions",
        Photos: "Photos",
        Added: "Ajouté",
        Categorization: "Catégorisation",
        Expiration: "Expiration",
        Search: "Rechercher",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "Clé PGP",
        Snapchat: "Snapchat",
        BUYNOW: "Acheter Maintenant",
        Description: "Description",
        Reviews: "Avis",
        Shipping: "Expédition",
        Addresses: "Adresses",
        NewAddress: "Nouvelle adresse",
        CurrentAddress: "Adresse actuelle",
        Returns: "Retours",
        ReturnsPolicy: "Conditions de retours",
        Ampersand: "&",
        Tags: "Mots-clés",
        Keywords: "Mots-clés",
        ShipsFrom: "Expédie de",
        ShipsTo: "Expédie vers",
        Optional: "Optionnel",
        Customize: "Personnaliser",
        Save: "Sauvegarder",
        Changes: "Changements",
        SaveChanges: "Sauvegarder les changements",
        YourName: "Votre nom",
        BitcoinReturnAddress: "Adresse Bitcoin de retour",
        BitcoinReturnAddressPlaceholder: "l'adresse bitcoin de remboursement",
        BitcoinReturnAddressInfo: "En cas de remboursement, vos fonds seront envoyés à l'adresse suivante.",
        LocalCurrency: "Devise locale",
        TimeZone: "Fuseau horaire",
        ShipToName: "Nom",
        ShipToStreet: "Rue",
        ShipToCity: "Ville",
        ShipToState: "État/Région/Département",
        ShipToPostalCode: "Code postal",
        PostalCode: "Code postal",
        ShipToCountry: "Pays",
        EnableNotifications: "Activer les notifications",
        EnableSSL: "Activer SSL",
        LibbitcoinServerAddress: "Adresse de serveur Libbitcoin",
        ServerIPPort: "Serveur IP :Port",
        All: "Tout",
        Name: "Nom",
        Price: "Prix",
        Available: "Disponible",
        Type: "Type",
        Condition: "Condition",
        NSFW: "18+ (Contenu adulte)",
        Select: "Sélectionner",
        Social: "Social",
        Theme: "Thème",
        Listing: "Annonce",
        Listings: "Annonces",
        ViewPage: "Voir la page",
        Pages: "Pages",
        Page: "Page",
        Language: "Langue",
        Reset: "Réinitialiser",
        Local: "Local",
        Domestic: "National",
        Location: "Emplacement",
        International: "International",
        Time: "Heure",
        Free: "Gratuit",
        Category: "Catégorie",
        ProcessingTime: "Délai de traitement",
        SelectPhotos: "Sélectionner des photos",
        DragOrUploadPhotos: "Glisser ou uploader des photos",
        ExpirationDate: "Expire le",
        UploadCoverPhoto: "Uploader une photo de couverture",
        ShortDescription: "Brève description",
        UpTo140Characters: "Jusqu'à 140 caractères",
        PrimaryColor: "Couleur primaire",
        SecondaryColor: "Couleur secondaire",
        TextColor: "Couleur de texte",
        CoverPhotoButton: "Sélectionner une photo de couverture",
        AboutPlaceholder: "Description complète",
        BackgroundColor: "Couleur de fond",
        NotificationFollow: "vous suit",
        NoNotifications: "Aucune notification",
        WelcomeToYourPage: "Bienvenue sur votre page !",
        SearchForCategory: "Rechercher par catégorie",
        Moderators: "Modérateurs",
        CurrentModerators: "Modérateurs actuels",
        AddModerators: "Ajouter de nouveaux modérateurs",
        DeselectToRemoveModerator: "Désélectionner les modérateurs que vous voulez supprimer",
        SelectToAddModerator: "Sélectionner les modérateurs que vous voulez ajouter",
        Categories: "Categories",
        UpTo3: "Jusqu'à 3",
        AboutYourStore: "Une description de votre boutique",
        PaymentType: "Type de paiement",
        ShipTo: "Expédier à",
        FreeShipping: "Livraison gratuite",
        OrderDetails: "Détails de la commande",
        OrderSummary: "Résumé de la commande",
        AllListings: "Toutes les annonces",
        ComingSoon: "À venir",
        PaymentPending: "Paiement en attente",
        FinalizePurchase: "Finaliser l'achat",
        LoadingImage: "Chargement de l'image...",
        UploadAvatar: "Sélectionner un avatar",
        SaveAvatar: "Enregistrer un avatar",
        NewAvatar: "Sélectionner un nouvel avatar",
        NewCoverImage: "Sélectionner une nouvelle image de couverture",
        Loading: "Chargement...",
        Purchases:"Achats",
        Sales: "Ventes",
        Cases: "Cas",
        Enter: "Entrer",
        Discover: "Découvrir",
        Block: "Bloquer",
        Unblock: "Débloquer",
        Blocked: "Bloqué",
        Advanced: "Avancé",
        General: "Général",
        AllItems: "Tous les articles",
        DomesticShippingPrice: "Prix d'expédition nationale",
        InternationalShippingPrice: "Prix d'expédition internationale",
        MinimumIs: "Le minimum est",
        Visibility: "Visibilité",
        Title: "Titre",
        DigitalItem: "Article numérique",
        PhysicalItem: "Article physique",
        DomesticShippingTime: "Délai d'expédition nationale",
        InternationalShippingTime: "Délai d'expédition internationale",
        DisplayNSFWcontent: "Afficher le contenu NSFW ?",
        Basic: "Basic",
        Content: "Contenu",
        StandardThemes: "Thèmes standards",
        NoPhotosAdded: "Aucune photo ajoutée",
        Summary: "Récapitulatif",
        Funds: "Fonds",
        Discussion: "Discussion",
        Quantity: "Quantité",
        ShippingTo: "Expédier à",
        ModeratedBy: "Modéré par",
        Submit: "Envoyer",
        maxLength20: "20 caractères maximum",
        maxLength80: "80 caractères maximum",
        maxLength200: "200 caractères maximum",
        StoreModeratorsOptional: "Modérateurs de boutique (Optionnel)",
        Searchformoderators: "Rechercher des modérateurs",
        Contributors: "Contributeurs",
        Support: "Soutenir",
        Licensing: "Licences",
        Forward: "Avancer",
        On: "Activer",
        Off: "Désactiver",
        ClickToChange: "Cliquez pour changer",
        NotProvided: "Non renseigné",
        NotFollowingAnyone: "Aucun abonnement",
        NoFollowers: "Aucun abonné",
        Moderator: "Modérateur",
      HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: {
          ProvideResolution: "Apporter des résolutions aux conflits",
          ServiceFee: "Frais de service",
          ServiceFeeNote: "Pourcentage du prix de la transaction (25 max)"
        },
        transactions: {
          SoldBy: "Vendu par",
          PurchasedBy: "Acheté par",
          searchByOrder: "Rechercher par ID de commande ou par nom d'article",
          sortByStatusAll: "Tout",
          sortByStatus0: "Acheté",
          sortByStatus1: "Payé (fonds en attente)",
          sortByStatus2: "Confirmé/Expédié",
          sortByStatus3: "Terminé (fonds reçus)",
          sortByStatus4: "Contesté",
          OrderID: "ID de commande",
          OrderDate: "Date de commande",
          OrderStatus: "Statut de commande",
          OrderStatus0: "Acheté (non payé)",
          OrderStatus1: "Payé (fonds en attente)",
          OrderStatus2: "Confirmé/Expédié",
          OrderStatus3: "Terminé (fonds reçus)",
          OrderStatus4: "Contesté",
          OrderTotal: "Total de la commande",
          OrderTotalInBTC: "Total BTC",
          PaymentProtection: "Protection de paiement",
          ShipTo: "Expédier à",
          ConfirmOrder: "Confirmer cette commande",
          ReceivingAddress: "Adresse de réception",
          RecievingAddressPlaceholder: "L'adresse Bitcoin à laquelle vous recevrez le paiement",
          Shipper: "Article expédié par",
          ShipperPlaceholder: "Nom de l'entreprise expédiant l'article",
          TrackingNumber: "Numéro de suivi",
          TrackingNumberPlaceholder: "Numéro de suivi de cet article",
          EstimatedDelivery: "Délai de livraison estimé",
          EstimatedDeliveryPlaceholder: "Date estimée de la livraison de l'article",
          URL: "URL",
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Mot de passe",
          PasswordPlaceholder: "Mot de passe requis pour le lien, si nécessaire",
          DirectTransaction: "Transaction directe",
          ModeratedTransaction: "Transaction modérée",
          Seller: "Vendeur",
          Buyer: "Acheteur",
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copier l'ID de transaction",
          Close: "Fermer",
          FundOrder: "Financer la commande",
          sortByDateNewest: "Par date, les plus récentes",
          sortByDateOldest: "Par date, les plus anciennes",
          PayPurchase: "Payer cet achat",
          CompleteOrder: "Compléter cette commande",
          RateThisTransaction: "Noter cette transaction",
          TransactionReview: "Avis de transaction",
          OverallRating: "Note générale",
          Quality: "Qualité",
          Description: "Description",
          DeliveryTime: "Heure de livraison",
          CustomerService: "Service client",
          Review: "Avis",
          ReviewPlaceHolder: "Votre avis sur cette transaction",
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "Impossible de sauvegarder les données.",
          getError: "Impossible de récupérer les données.",
          missingError: "Certains champs sont incorrects ou manquants.",
          serverError: "Une réponse incorrecte a été reçue du serveur.",
          userError: "Les informations pour cette ID sont introuvables",
          userNotFoundError: "Les informations de cette personne ne sont pas disponibles. Elles sont peut-être hors ligne.",
          notFoundError: "Les données ne peuvent pas être récupérées pour :",
          socketError: "L'URL pour WebSocket a échoué. Connexion au socket avec l'adresse par défaut de ws://localhost:18466",
          contractError: "Cet article ne peut pas être acheté",
          sellerError: "Le serveur du vendeur a rejeté la demande d'achat",
          checkPurchaseData: "Vérifiez vos données d'achat, telles que la quantité et l'adresse Bitcoin de remboursement, pour vous assurer que tout est conforme",
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "<p>OpenBazaar est un réseau d’utilisateurs qui achètent et vendent directement entre eux des biens et services, en utilisant Bitcoin. Ce réseau est décentralisé et n’est pas contrôlé par une quelconque organisation.</p><p>Ce logiciel est open-source et sous licence MIT. Vous pouvez voir le code sur <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">Github</a>.</p><p>OpenBazaar est un projet communautaire, et les participations sont les bienvenues sur notre cannal <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">Slack</a> ou sur notre <a href=\"http://www.reddit.com/r/openbazaar\" target=\"_blank\">subreddit</a>.</p><p>Si vous avez besoin d’aide, lisez le <a href=\"\" target=\"_blank\">Tutoriel</a> d’OpenBazaar version 1.0.</p><p>Si vous avez encore des questions, créez une question sur notre <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\" target=\"_blank\">centre d’aide</a>.</p>",
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>",
        },
        saveMessages: {
          Saved: "Enregistrés",
          SaveSuccess: "Vos changements ont été enregistrés."
        },
        discover: {
          searchDefaultText: "Analyse de votre réseau",
          searchingText: "Analyse de votre réseau pour",
          noResults: "Aucune annonce trouvée dans votre réseau avec le mot-clé"
        },
        filters: {
          pagesAllTypes: "Tous les types",
          pagesStores: "Boutiques",
          pagesMods: "Services de modérateur",
          pagesBasic: "Utilisateurs de base",
          listingsCurated: "Depuis les boutiques que je suis",
          listingsAll: "Depuis toutes les boutiques",
          categoryAll: "Toutes"
        },
        nav: {
          searchPlaceholder: "Tapez un @nom_d_utilisateur, GUID ou un #mot_clé...",
          myPage: "Ma page",
          customizePage:"Personnaliser ma page",
          sellItem:"Nouveau",
          createListing:"Nouvelle annonce",
          purchases:"Achats",
          sales:"Ventes",
          cases:"Cas",
          notifications:"Notifications",
          settings:"Paramètres",
          about:"&Agrave; propos d'OpenBazaar",
          support:"Soutenir OpenBazaar"
        },
        onboarding: {
          intro: "Configuration d'OpenBazaar",
          Introduction: "Présentation",
          IntroductionBody: "OpenBazaar est un marché social pair à pair, semblable à une fusion entre eBay&trade;, Twitter&trade; et BitTorrent. OpenBazaar est un projet open-source qui n'applique pas de frais ou de restrictions particulières. \n\n Veuillez noter que l’expérience d’utilisation peut être différente de celles que vous avez, essayez d’être patient pendant la phase de découverte.",
          Theme: "Sélectionner un thème pour votre page",
          chooseLanguage: "Sélectionner votre langue",
          contributors: "%{smart_count} Contributeur |||| %{smart_count} Contributeur",
          configure: "Configurez votre expérience",
          disclaimer_title: "Clause de non-responsabilité",
          disclaimer_body: "OpenBazaar est un réseau commercial de biens et services de personne à personne - utilisant Bitcoin - sans aucune organisation centrale exerçant une autorité sur la plate-forme. Cela signifie que vous êtes seul responsable de votre activité sur le réseau. \n\nLes utilisateurs d'OpenBazaar ne sont pas anonymes par défaut. La plupart des communications entre les partis sont chiffrées, mais les adresses IP sont publiques et peuvent être associées à une activité sur le réseau. Des partis malveillants pourraient utiliser ces informations contre vous ; protéger votre vie privée est votre propre responsabilité. \n\nLes utilisateurs d'OpenBazaar doivent respecter les lois de leur propre juridiction ainsi que leur conscience. Les développeurs d'OpenBazaar ne tolèrent pas - et ne sont pas responsables -  de toute utilisation de la plate-forme pour une activité illégale. \n\nLa communauté des développeurs d'OpenBazaar a travaillé sans relâche afin d'offrir une plate-forme commerciale libre et mondiale. Mais, comme avec tout logiciel, des bugs seront trouvés. Les développeurs ne sont pas responsables de toute perte monétaire associée à des problèmes dans le logiciel. \n\nEn utilisant OpenBazaar vous êtes seul responsable de vos actions sur le réseau d'OpenBazaar.",
          yourCountry: "Sélectionner votre pays",
          localCurrency: "Sélectionner votre devise",
          LanguagePlaceholder: "Rechercher par langue",
          CountryPlaceholder: "Rechercher par pays",
          CurrencyPlaceholder: "Rechercher par devise",
          TimezonePlaceholder: "Rechercher par fuseau horaire",
          ShortDescriptionPlaceholder: "Dites quelque chose d'intéressant... (160 caractères max)",
          timeZone: "Sélectionner votre fuseau horaire",
          yourDetails: "Définir vos informations",
          yourDescription: "Description",
          handle: "Nom d'utilisateur",
          chooseHandle: "Choisissez un nom d'utilisateur",
          knownAs: "Vous êtes actuellement connu comme :",
          wouldYou: "Voulez-vous enregistrer un nom d'utilisateur facilement mémorisable ?",
          registerNew: "Enregistrer",
          recommended: "Pages recommandées à suivre",
          connectExisting: "Connect Existing",
          avatar: "Définir un avatar",
          chooseAvatar: "Sélectionner un avatar",
          discoverCallOut: "Explorez les annonces et les pages sur OpenBazaar",
          Finished: "Terminé"
        },
        buyFlow: {
          DirectPayment: "Paiement direct",
          SendDirectlyTo: "Envoyer un paiement direct à %{handle}",
          MustAddAddress: "Vous devez ajouter une adresse pour expédier",
          VendorShipsTo: "Expédie vers",
          DoesNotShipHere: "N'expédie pas ici",
          Send: "Envoyer",
          BTCto: "BTC à",
          SendBTCtoAddress: "Envoyer %{amount} BTC à",
          OpenAddress: "Ouvrir dans le portefeuille local",
          CopyAddress: "Copier dans le presse-papier",
          RefreshPayment: "Actualiser le statut du paiement",
          summaryMsg1: "Votre paiement a été envoyé à %{recipient}",
          summaryMsg2: "Le temps de traitement prévu pour cette commande est",
          summaryMsg3: "Vous pouvez vérifier le statut de votre commande sur votre",
          purchasesPage: "page d'achat",
          returnAddress: "Adresse de retour",
          moderatorPaymentDisclaimer: "N'appliquer que si la transaction se termine par un litige.",
          directPaymentDisclaimer: "Utilisez le paiement direct avec prudence, les fonds sont irréversibles",
          directPaymentTo: "Paiement direct à",
          paymentSent: "Paiement envoyé !",
          total: "Total"
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "Română",
        langCode: "ro",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Următorul",
        IAgree: "Sunt de acord",
        Back: "Înapoi",
        EnterMessage: "Introduceți mesajul...",
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "Sari peste",
        Done: "Efectuat",
        Navigation: "Navigation", //notTranslated
        Cancel: "Anulare",
        Yes: "Da",
        No: "Nu",
        of: "din",
        Sell: "Vânzare",
        New: "Nou",
        Excellent: "Excelent",
        Good: "Bun",
        Poor: "Prost",
        SKU: "SKU",
        Refurbished: "Renovat",
        Physical: "Fizic",
        Digital: "Digital",
        Service: "Serviciu",
        Visit: "Vizualizare pagină",
        Item: "Produs",
        Items: "Produse",
        Stores: "Magazine",
        Follow: "Urmărire",
        Feed: "Feed",
        FeedPlaceholder: "Lista de actualizări de la toate paginile urmărite",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "Oprire Urmărire",
        About: "Despre",
        NoDescriptionAdded: "Nu a fost adăgată descrirea",
        NoListings: "No listings", //notTranslated
        CoverPhoto: "Fotografie Copertă",
        AboutEmpty: "Despre este gol...",
        Followers: "Urmăritori",
        Following: "Se Urmărește",
        Message: "Mesaj",
        Messages: "Mesaje",
        Store: "Magazin",
        Edit: "Modificare",
        Used: "Folosit",
        Delete: "Ștergere",
        DontDelete: "Nu Ștergeți",
        ConfirmDelete: "Confirmați Ștergerea",
        Website: "Website",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Bun Venit",
        CreateStore: "Deveniți un Magazin",
        GoToMyPage: "Pagina Mea",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Căutare după nume sau cuvânt cheie",
        SearchFeedPlaceholder: "Căutare după nume sau GUID",
        SearchForFollowersPlaceholder: "Căutare după nume sau GUID",
        SearchForUsersPlaceholder: "Căutare după nume sau GUID",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 Zile Lucrătoare",
        EstDeliveryInternationalPlaceholder: "7-15 Zile Lucrătoare",
        OrderProcessingTimePlaceholder: "1-2 Zile Lucrătoare",
        TermsAndConditionsPlaceholder: "Introduceți termenii și condițiile...",
        TitlePlaceholder: "Introduceți titlul",
        DescriptionPlaceholder: "Introduceți descrierea...",
        ReturnPolicyPlaceholder: "Introduceți politica de returnare...",
        CategoryPlaceholder: "Introduceți categoria",
        CategoryHelperText: "Categoriile sunt folosite pentru gruparea și organizarea produselor în magazinul dvs.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "Setați o dată pentru produsul dvs. să fie scos automat din magazin",
        ClearExpirationDate: "Ștergeți Data Expirării",
        ReturnPolicy: "Politica de Returnare",
        TermsAndConditions: "Termeni și Condiții",
        Photos: "Fotografii",
        Added: "Adăugat",
        Categorization: "Categorizare",
        Expiration: "Expirare",
        Search: "Căutare",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "CUMPĂRAȚI ACUM",
        Description: "Descriere",
        Reviews: "Recenzii",
        Shipping: "Livrare",
        Addresses: "Adrese",
        NewAddress: "Adresă Nouă",
        CurrentAddress: "Adresele Curente",
        Returns: "Returnări",
        ReturnsPolicy: "Politica de Returnări",
        Ampersand: "&",
        ShipsFrom: "Se Livrează Din",
        ShipsTo: "Se Livrează Spre",
        Optional: "Opțional",
        Customize: "Customizare",
        Save: "Salvare",
        Changes: "Modificări",
        SaveChanges: "Salvare Modificări",
        YourName: "Numele dvs.",
        BitcoinReturnAddress: "Adresa Bitcoin",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "Valuta locală",
        TimeZone: "Fus orar",
        ShipToName: "Numele",
        ShipToStreet: "Strada",
        ShipToCity: "Orașul",
        ShipToState: "Statul/Provincia/Regiunea",
        ShipToPostalCode: "Codul poștal",
        PostalCode: "Cod poștal",
        ShipToCountry: "Țara",
        EnableNotifications: "Activare notificări",
        EnableSSL: "Activare SSL",
        LibbitcoinServerAddress: "Adresa Libbitcoin a serverului",
        ServerIPPort: "Server IP:Port",
        All: "Toate",
        Name: "Nume",
        Price: "Preț",
        Available: "Disponibil",
        Tags: "Tags", //notTranslated
        Keywords: "Cuvinte cheie",
        Type: "Tip",
        Condition: "Condiție",
        NSFW: "18+ (Conținut pentru adulți)",
        Select: "Select", //not translated
        Social: "Social", //not translated
        Theme: "Theme", //not translated
        Listing: "Listing", //not translated
        Listings: "Listings", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Pages", //not translated
        Page: "Page", //not translated
        Language: "Language", //not translated
        Reset: "Reset", //not translated
        Local: "Local",
        Domestic: "Domestic",
        Location: "Locație",
        International: "Internațional",
        Time: "Timp",
        Free: "Gratis",
        Category: "Categorie",
        ProcessingTime: "Timp de Procesare",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Trageți sau încărcați imaginile",
        ExpirationDate: "Expiră Pe",
        UploadCoverPhoto: "Încărcați imaginea copertă",
        ShortDescription: "Descriere Scurtă",
        UpTo140Characters: "Până la 140 de caractere",
        PrimaryColor: "Culoarea Primară",
        SecondaryColor: "Culoarea Secundară",
        TextColor: "Culoarea Textului",
        CoverPhotoButton: "Selectați Fotografia Copertă",
        AboutPlaceholder: "Descrierea completă",
        BackgroundColor: "Culoarea de Fundal",
        NotificationFollow: "acum vă urmărește",
        NoNotifications: "Nu sunt notificări",
        WelcomeToYourPage: "Bun venit pe pagina dvs.!",
        SearchForCategory: "Căutare categorie",
        Moderators: "Moderatori",
        CurrentModerators: "Moderatorii Curenți",
        AddModerators: "Adăugare Moderator Nou",
        DeselectToRemoveModerator: "Deselectați moderatorii pe care doriți să îi ștergeți",
        SelectToAddModerator: "Selectați moderatorii pe care doriți să îi adăugați",
        Categories: "Categorii",
        UpTo3: "Până la 3",
        AboutYourStore: "O descriere pentru magazinul dvs.",
        PaymentType: "Tipul de Plată",
        ShipTo: "Livrare Spre",
        OrderDetails: "Detaliile Comenzii",
        OrderSummary: "Rezumatul Comenzii",
        AllListings: "Listări",
        ComingSoon: "Apare în Curând",
        PaymentPending: "Plata în așteptare",
        FinalizePurchase: "Finalizare Achiziție",
        LoadingImage: "Se Încarcă Imaginea...",
        UploadAvatar: "Încărcare Avatar",
        SaveAvatar: "Salvare Avatar",
        NewAvatar: "Selectare Avatar Nou",
        NewCoverImage: "Selectare Imagine Copertă Nouă",
        Loading: "Loading...", // not translated
        Purchases:"Cumpărături",
        Sales: "Sales", // not translated
        Cases: "Cases", // not translated
        Enter: "Enter", //notTranslated
        Discover: "Discover", // not translated
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Blocked", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        FreeShipping: "Free Shipping", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Visibility: "Visibility", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        DomesticShippingTime: "Domestic Shipping Time", // not translated
        InternationalShippingTime: "International Shipping Time", // not translated
        DisplayNSFWcontent: "Display NSFW content?", // not translated
        Basic: "Basic", // not translated
        Content: "Content", // not translated
        StandardThemes: "Standard themes", // not translated
        NoPhotosAdded: "No Photos Added", // not translated
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Sold By", // not translated
          PurchasedBy: "Purchased By", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Paid (Funds Waiting)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Paid (Funds Waiting)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "Datele nu au putut fi salvate.",
          getError: "Datele nu au putut fi primite.",
          missingError: "Câteva câmpuri lipsesc sau sunt încorecte.",
          serverError: "Un răspuns greșit a fost primit de la server.",
          userError: "Informația despre acest ID nu a fost găsită",
          userNotFoundError: "Informația persoanei date nu este disponibilă. Posibil s-a deconectat.",
          notFoundError: "Nu pot fi încarcate datele pentru:",
          socketError: "URL pentru WebSocket a eșuat. Conectarea la socket cu adresa implicită ws://localhost:18466",
          contractError: "Acest Articol Nu Poate Fi Procurat",
          sellerError: "Serverul vânzătorului a respins cererea de cumpărare",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "Salvat",
          SaveSuccess: "Modificările dvs. au fost salvate."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "Toate tipurile",
          pagesStores: "Magazine",
          pagesMods: "Servicii de moderare",
          pagesBasic: "Utilizatori de bază",
          listingsCurated: "Din magazinele urmărite de mine",
          listingsAll: "Din toate magazinele"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "Pagina mea",
          customizePage:"Customizare Pagină",
          sellItem:"Nou",
          createListing:"Listare Nouă",
          purchases:"Cumpărături",
          sales:"Vânzări",
          cases:"Cazuri",
          notifications:"Notificări",
          settings:"Setări",
          about:"Despre OpenBazaar",
          support:"Susținere OpenBazaar"
        },
        onboarding: {
          intro: "Configurare OpenBazaar",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "", //notTranslated
          Theme: "Selectați o Temă pentru Pagina dvs.",
          chooseLanguage: "Selectați Limba dvs.",
          contributors: "%{smart_count} Contributor |||| %{smart_count} Contributori",
          configure: "Configurați-vă experiența",
          disclaimer_title: "Act de Declinare a Responsabilităţii",
          disclaimer_body: "OpenBazaar este o rețea pentru comercializarea bunurilor și serviciilor direct între oameni - folosind Bitcoin - fără nici o organizație centrală care ar controla platforma. Aceasta înseamnă ca dvs. sunteți responsibil(ă) pentru activitatea dvs. în rețea.\n\nUtilizatorii OpenBazaar nu sunt anonimi implicit. Majoritatea cumunicațiilor între părți sunt criptate, dar adresa IP este publică și poate fi asociată cu activitatea în rețea. Părțile răutăcioase pot folosi această informație împotriva dvs.; protejarea confidențialității este responsabilitatea dvs.\n\nUtilizatorii OpenBazaar trebuie să respecte legile în jurisdicția lor legală de asemenea și conștiința lor. Dezvoltatorii OpenBazaar nu scuză - și nu sunt responsabili pentru - orice folosire a platformei în activități ileagale.\n\nComunitatea dezvoltatorilor OpenBazaar a lucrat din greu pentru a livra lumii o platformă gratuită pentru comerț. Dar ca orice soft, bug-uri vor fi găsite. Dezvoltatorii nu sunt responsabili pentru orice pierdere monetară asociată cu problemele din soft.\n\nFolosind OpenBazaar sunteți responsabili pentru acțiunile proprii în rețeaua OpenBazaar.",
          yourCountry: "Selectați Țara dvs.",
          localCurrency: "Selectați Valuta dvs.",
          LanguagePlaceholder: "Căutare limbă",
          CountryPlaceholder: "Căutare țară",
          CurrencyPlaceholder: "Căutare valută",
          TimezonePlaceholder: "Căutare fus orar",
          ShortDescriptionPlaceholder: "Spuneți ceva interesant... (160 caractere maxim)",
          timeZone: "Selectați Fusul dvs. Orar",
          yourDetails: "Setați Informația dvs.",
          yourDescription: "Descriere",
          handle: "Nume",
          chooseHandle: "Choose a handle", // not translated
          knownAs: "La moment sunteți cunoscut ca:",
          wouldYou: "Doriți să înregistrați un nume ușor de reținut?",
          registerNew: "Înregistrați-vă Acum",
          recommended: "Pagini Recomandate pentru Urmărire",
          connectExisting: "Conectare Existente",
          avatar: "Setați un Avatar",
          chooseAvatar: "Selectare Avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        buyFlow: {
          DirectPayment: "Direct Payment", //notTranslated
          SendDirectlyTo: "Send direct payment to %{handle}", //notTranslated
          MustAddAddress: "Trebuie să adăugați o adesă pentru livrare",
          VendorShipsTo: "Acest furnizor livrează către următoarele țări",
          DoesNotShipHere: "Does not ship here", //notTranslated
          Send: "Semd", //notTranslated
          BTCto: "BTC to", //notTranslated
          SendBTCtoAddress: "Send %{amount} BTC to", //notTranslated
          OpenAddress: "Open in Local Wallet", //notTranslated
          CopyAddress: "Copy to Clipboard", //notTranslated
          RefreshPayment: "Refresh Payment Status", //notTranslated
          summaryMsg1: "Your payment has been sent to %{recipient}", //notTranslated
          summaryMsg2: "The expected processing time for this order is", //notTranslated
          summaryMsg3: "You can check the status of your order on your", //notTranslated
          purchasesPage: "purchases page", //notTranslated
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          directPaymentTo: "Direct Payment to", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "Russian",
        langCode: "ru",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Далее",
        IAgree: "Согласен",
        Back: "Назад",
        EnterMessage: "Ввести сообщение...",
        Reload: "Обновить",
        You: "Вы",
        Skip: "Пропустить",
        Done: "Готово",
        Navigation: "Навигация",
        Cancel: "Отмена",
        Yes: "Да",
        No: "Нет",
        of: "из",
        Sell: "Продать",
        New: "Новый",
        Excellent: "Идеальное",
        Good: "Хорошее",
        Poor: "Плохое",
        SKU: "SKU",
        Refurbished: "Восстановленный",
        Physical: "Физический",
        Digital: "Цифровой",
        Service: "Услуга",
        Visit: "Просмотров",
        Item: "Штук",
        Items: "Штук",
        Stores: "Магазинов",
        Follow: "Подписан",
        Feed: "Лента",
        FeedPlaceholder: "Лента обновлений, за которыми я слежу",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "Отписаться",
        About: "О нас",
        NoDescriptionAdded: "Добавленные описания",
        NoListings: "Нет объявлений",
        CoverPhoto: "Обложка",
        AboutEmpty: "Описание не заполнено...",
        Followers: "Читатели",
        Following: "Читаемые",
        Message: "Сообщение",
        Messages: "Сообщений",
        Store: "Магазин",
        Edit: "Редактировать",
        Used: "В употреблении",
        Delete: "Удалить",
        DontDelete: "Не удалять",
        ConfirmDelete: "Да, удалить",
        Website: "Веб-сайт",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Welcome",
        CreateStore: "Создать магазин",
        GoToMyPage: "Моя страница",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Поиск по имени или ключевому слову",
        SearchFeedPlaceholder: "Поиск по имени или GUID",
        SearchForFollowersPlaceholder: "Поиск по имени или GUID",
        SearchForUsersPlaceholder: "Поиск по имени или GUID",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 рабочих дней",
        EstDeliveryInternationalPlaceholder: "7-15 рабочих дней",
        OrderProcessingTimePlaceholder: "1-2 рабочих дней",
        TermsAndConditionsPlaceholder: "Введите ваши правила и условия...",
        TitlePlaceholder: "Введите название",
        DescriptionPlaceholder: "Введите описание...",
        ReturnPolicyPlaceholder: "Введите ваши условия возврата...",
        CategoryPlaceholder: "Выберите категорию",
        CategoryHelperText: "Категории используются для сортировки выкладки товаров в вашем магазине.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "Выберите дату для автоматического снятия с продажи.",
        ClearExpirationDate: "Точная дата для снятия с продажи",
        ReturnPolicy: "Политика возвратов",
        TermsAndConditions: "Правила и условия",
        Photos: "фотографий",
        Added: "добавлено",
        Categorization: "Категоризация",
        Expiration: "Срок действия",
        Search: "Поиск",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "Купи сейчас",
        Description: "Описание",
        Reviews: "Отзывы",
        Shipping: "Доставка",
        Addresses: "Адреса",
        NewAddress: "Новый адрес",
        CurrentAddress: "Текущие адреса",
        Returns: "Возвраты",
        ReturnsPolicy: "Политика возвратов",
        Ampersand: "&",
        ShipsFrom: "Доставка из",
        ShipsTo: "Страны доставки",
        Optional: "Дополнительно",
        Customize: "Настроить",
        Save: "Сохранить",
        Changes: "Изменения",
        SaveChanges: "Применить",
        YourName: "Ваше имя",
        BitcoinReturnAddress: "Биткойн-адрес",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "Местная валюта",
        TimeZone: "Часовой пояс",
        ShipToName: "Имя",
        ShipToStreet: "Улица",
        ShipToCity: "Город",
        ShipToState: "Страна/Провинция/Город",
        ShipToPostalCode: "Почтовый индекс",
        PostalCode: "Почтовый индекс",
        ShipToCountry: "Страна",
        EnableNotifications: "Включить уведомления",
        EnableSSL: "Включить SSL",
        LibbitcoinServerAddress: "Адрес сервера Libbitcoin",
        ServerIPPort: "Сервер IP:Port",
        All: "Все",
        Name: "Имя",
        Price: "Цена",
        Available: "Доступно",
        Tags: "Tags", //notTranslated
        Keywords: "Ключевые слова",
        Type: "Тип",
        Condition: "Состояние",
        NSFW: "18+ (для взрослых)",
        Select: "Выбор", //not translated
        Social: "Социальный", //not translated
        Theme: "Тема", //not translated
        Listing: "Объявление", //not translated
        Listings: "Объявления", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Страницы", //not translated
        Page: "Страница", //not translated
        Language: "Язык", //not translated
        Reset: "Сброс", //not translated
        Local: "Местный",
        Domestic: "Внутри страны",
        Location: "Местонахождение",
        International: "Международный",
        Time: "Время",
        Free: "Свободный",
        Category: "Категория",
        ProcessingTime: "Дней на упаковку",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Перетащите или выберите фото",
        ExpirationDate: "Заканчивается",
        UploadCoverPhoto: "Загрузить фото для фоновой картинки",
        ShortDescription: "Короткое описание",
        UpTo140Characters: "До 140 знаков",
        PrimaryColor: "Главный цвет",
        SecondaryColor: "Дополнительный цвет",
        TextColor: "Цвет текста",
        CoverPhotoButton: "Выберите обложку",
        AboutPlaceholder: "Полное описание",
        BackgroundColor: "Фоновый цвет",
        NotificationFollow: "подписан на вас",
        NoNotifications: "Нет уведомлений",
        WelcomeToYourPage: "Добро пожаловать!",
        SearchForCategory: "Поиск категории",
        Moderators: "Модераторы",
        CurrentModerators: "Текущие модераторы",
        AddModerators: "Добавить модераторов",
        DeselectToRemoveModerator: "Выберите модераторов для удаления",
        SelectToAddModerator: "Выберите модераторов для добавления",
        Categories: "Категории",
        UpTo3: "До 3-х",
        AboutYourStore: "Описание магазина",
        PaymentType: "Способ платежа",
        ShipTo: "Доставка",
        OrderDetails: "Подробности заказа",
        OrderSummary: "Сведения заказа",
        AllListings: "Все позиции",
        ComingSoon: "Скоро",
        PaymentPending: "Платеж в процессе",
        FinalizePurchase: "Финализировать",
        LoadingImage: "Загрузка...",
        UploadAvatar: "Загрузить с компьютера",
        SaveAvatar: "Сохранить аватар",
        NewAvatar: "Выбрать аватар",
        NewCoverImage: "Выбрать обложку",
        Loading: "Загрузка...",
        Purchases:"Покупки",
        Sales: "Продажи",
        Cases: "Кейсы",
        Enter: "Enter",
        Discover: "Обзор",
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Заблокированно",
        Advanced: "Дополнительно",
        General: "Общий",
        AllItems: "Все инструменты",
        FreeShipping: "Бесплатная доставка",
        DomesticShippingPrice: "Бесплатная доставка внутри страны",
        InternationalShippingPrice: "Международные цены доставки",
        MinimumIs: "Минимум",
        Visibility: "Видимость",
        Title: "Название",
        DigitalItem: "Цифровой товар",
        PhysicalItem: "Физический товар",
        DomesticShippingTime: "Внутреннее время доставки",
        InternationalShippingTime: "Международное время доставки",
        DisplayNSFWcontent: "Отображать NSFW контент?",
        Basic: "Базовый",
        Content: "Контент",
        StandardThemes: "Стандартные темы",
        NoPhotosAdded: "Не добавлено фотографий",
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Продано",
          PurchasedBy: "Куплено",
          searchByOrder: "Искать по номеру заказа",
          sortByStatusAll: "Все",
          sortByStatus0: "Купленные",
          sortByStatus1: "Оплачено (ожидание средств)",
          sortByStatus2: "Подтверждено/Доставлено",
          sortByStatus3: "Завершено (средства освобождены)",
          sortByStatus4: "Оспорено",
          OrderID: "Order ID",
          OrderDate: "Дата ордера",
          OrderStatus: "Статус ордера",
          OrderStatus0: "Куплено (не оплачен)",
          OrderStatus1: "Оплачено (ожидание средств)",
          OrderStatus2: "Подтверждено/выслано",
          OrderStatus3: "Завершено (средства освобождены)",
          OrderStatus4: "Оспорено",
          OrderTotal: "Всего заказов",
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "Данные невозможно сохранить.",
          getError: "Данные невозможно получить.",
          missingError: "Поля заполнены неправильно.",
          serverError: "Сервер прислал неправильные запросы.",
          userError: "Информация по этому ID не найдена",
          userNotFoundError: "Человек недоступен. Возможно его нет в сети.",
          notFoundError: "Данные нельзя загрузить для:",
          socketError: "URL для WebSocket недоступен. Подключаемся к адресу по умолчанию ws://localhost:18466",
          contractError: "Этот товар недоступен для продажи",
          sellerError: "Сервер продавца отключил эту возможность",
          checkPurchaseData: "Проверьте пожалуйста данные ваших покупок, такие как кол-во и адрес возврата Биткойнов, чтобы убедиться ", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "о нас",
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "поддержка",
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>",
        },
        saveMessages: {
          Saved: "Сохранено",
          SaveSuccess: "Ваши изменения сохранены."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "Все типы",
          pagesStores: "Магазины",
          pagesMods: "Сервисы модератора",
          pagesBasic: "Базовые пользователи",
          listingsCurated: "С магазинов по подписке",
          listingsAll: "Со всех магазинов"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "Моя страница",
          customizePage:"Настроить страницу",
          sellItem:"Разместить товар",
          createListing:"Подать объявление",
          purchases:"Покупки",
          sales:"Продажи",
          cases:"История",
          notifications:"Уведомления",
          settings:"Настройки",
          about:"Об OpenBazaar",
          support:"Поддержка OpenBazaar"
        },
        onboarding: {
          intro: "Конфигурация OpenBazaar",
          Introduction: "Ознакомление",
          IntroductionBody: "Представление",
          Theme: "Выберите оформление для вашей страницы",
          chooseLanguage: "Выберите ваш язык",
          contributors: "%{smart_count} вкладчик |||| %{smart_count} вкладчиков",
          configure: "Настройте рабочее место",
          disclaimer_title: "Отказ от ответственности",
          disclaimer_body: "OpenBazaar является открытой сетью для прямой торговли с использованием сети Биткойна - без какого-либо центрального органа или компании контроллирующего платформу. Это значит что вы ответственны за ваши собственные действия.\n\nПользователи OpenBazaar не являются анонимными по умолчанию. Большинство коммуникаций между сторонами шифруются, но IP адреса публичны, поэтому могут быть ассоциированны с запросами поступающими с них в сеть. Злоумышленники могут использовать эту информацию против вас; защита приватности - в ваших руках.\n\nПользователи OpenBazaar должны соблюдать законы в непосредственной юрисдикции их местонахождения. Разработчики OpenBazaar не могут контроллировать каждое использование - и не несут ответственности за любое использование платформы в незаконных целях.\n\nСообщество OpenBazaar приложило огромное количество усилий по созданию свободной платформы для международной торговли. Как и в любом программном обеспечении, наши программы тоже содержат ошибки. Разработчики не несут ответственности за любые потери связанные с использованием этого программного продукта.\n\nИспользуя OpenBazaar вы несёте полную ответственность за любые действия совершаемые вами в сети OpenBazaar.",
          yourCountry: "Выберите вашу страну",
          localCurrency: "Выберите вашу валюту",
          LanguagePlaceholder: "Введите язык",
          CountryPlaceholder: "Введите страну",
          CurrencyPlaceholder: "Введите валюту",
          TimezonePlaceholder: "Введите часовой пояс",
          ShortDescriptionPlaceholder: "Расскажите что-нибудь о вашей деятельности... (160 букв максимум)",
          timeZone: "Выберите часовой пояс",
          yourDetails: "Профильная информация",
          yourDescription: "Описание",
          handle: "Логин",
          chooseHandle: "Выберите логин", // not translated
          knownAs: "Сейчас ваше имя:",
          wouldYou: "Вы желаете зарегистрировать простой логин?",
          registerNew: "Зарегистрировать новый",
          recommended: "Подпишитесь на популярные магазины",
          connectExisting: "Подключить существующий",
          avatar: "Поставить аватарку",
          chooseAvatar: "Выбрать аватарку",
          discoverCallOut: "Найти объявления и страницы на OpenBazaar",
          Finished: "Завершено"
        },
        buyFlow: {
          DirectPayment: "Оплатить напрямую",
          SendDirectlyTo: "Отправка прямого платежа %{handle}",
          MustAddAddress: "Вы должны указать адрес для доставки",
          VendorShipsTo: "Этот производитель отправляет в следующие страны",
          DoesNotShipHere: "Выбранный производитель не производит доставку в указанный регион",
          Send: "Отправить",
          BTCto: "BTC to",
          SendBTCtoAddress: "Отправить %{amount} BTC",
          OpenAddress: "Открывать адрес в кошельке по-умолчанию",
          CopyAddress: "Скопировать адрес оплаты в буфер обмена",
          RefreshPayment: "Обновить статус платежа",
          summaryMsg1: "Ваш платёж был отправлен на %{recipient}",
          summaryMsg2: "Ожидаемое время обработки вашего заказа составляет",
          summaryMsg3: "Чтобы проверить статус вашего заказа, загляните в",
          purchasesPage: "интерфейс покупок",
          returnAddress: "адрес возврата",
          moderatorPaymentDisclaimer: "Применяется только в случаях если транзакция имеет статус спора.",
          directPaymentDisclaimer: "Будьте осторожны при отправке средств напрямую, средства невозвратимы",
          directPaymentTo: "Прямой платёж",
          paymentSent: "Платёж отправлен!",
          total: "Всего"
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "Slovak",
        langCode: "sk",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Ďalej",
        IAgree: "Súhlasím",
        Back: "Späť",
        EnterMessage: "Vložte správu...",
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "Preskočiť",
        Done: "Hotovo",
        Navigation: "Navigation", //notTranslated
        Cancel: "Zrušiť",
        Yes: "Áno",
        No: "Nie",
        of: "z",
        Sell: "Predať",
        New: "New",
        Excellent: "Výborné",
        Good: "Dobré",
        Poor: "Nič moc",
        SKU: "SKU",
        Refurbished: "Renovované",
        Physical: "Fyzické",
        Digital: "Digitálne",
        Service: "Služba",
        Visit: "Zobraziť stránku",
        Item: "Položka",
        Items: "Položky",
        Stores: "Obchody",
        Follow: "Sleduj",
        Feed: "Feed",
        FeedPlaceholder: "Feed updatov zo všetkých stránok, ktoré sledujete.",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "Zrušiť sledovanie",
        About: "Informácie",
        NoDescriptionAdded: "Bez popisu",
        NoListings: "No listings", //notTranslated
        CoverPhoto: "Titulná fotka",
        AboutEmpty: "Stránka s informáciami je prázdna...",
        Followers: "Followeri",
        Following: "Sledované stránky",
        Message: "Správa",
        Store: "Obchod",
        Edit: "Upraviť",
        Used: "Použité",
        Delete: "Vymazať",
        DontDelete: "Nevymazávajte",
        ConfirmDelete: "Potvrďte vymazanie",
        Website: "Webstránka",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Vitajte",
        CreateStore: "Vytvorte si obchod",
        GoToMyPage: "Moja stránka",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Vyhľadať podľa mena alebo kľúčového slova",
        SearchFeedPlaceholder: "Vyhľadať podľa prezývky alebo GUID",
        SearchForFollowersPlaceholder: "Vyhľadať podľa prezývky alebo GUID",
        SearchForUsersPlaceholder: "Vyhľadať podľa prezývky alebo GUID",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 pracovných dní",
        EstDeliveryInternationalPlaceholder: "7-15 pracovných dní",
        OrderProcessingTimePlaceholder: "1-2 pracovné dni",
        TermsAndConditionsPlaceholder: "Vložte obchodné podmienky...",
        TitlePlaceholder: "Vložne titulok...",
        DescriptionPlaceholder: "Vložte popis...",
        ReturnPolicyPlaceholder: "Vložte pravidlá vrátenia tovaru...",
        CategoryPlaceholder: "Zadajte kategóriu",
        CategoryHelperText: "Kategórie slúžia na zoskupovanie a organizáciu položiek vo Vašom obchode.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "Zadajte dátum, kedy má byť tovar stiahnutý z Vášho obchodu.",
        ClearExpirationDate: "Zrušiť dátum stiahnutia tovaru.",
        ReturnPolicy: "Pravidlá vrátenie tovaru",
        TermsAndConditions: "Obchodné podmienky",
        Photos: "Obrázky",
        Added: "Pridané",
        Categorization: "Kategorizácia",
        Expiration: "Expirácia",
        Search: "Hľadať",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "KÚPIŤ IHNEĎ",
        Description: "Popis",
        Reviews: "Hodnotenia zákazníkov",
        Shipping: "Doprava",
        Addresses: "Adresy",
        NewAddress: "Nová adresa",
        CurrentAddress: "Aktuálna adresa",
        Returns: "Vrátenie",
        ReturnsPolicy: "Pravidlá vrátenia",
        Ampersand: "&",
        ShipsFrom: "Odosielané z",
        ShipsTo: "Odosielané do",
        Optional: "Viliteľne",
        Customize: "Upraviť",
        Save: "Uložiť",
        Changes: "Zmeny",
        SaveChanges: "Uložiť zmeny",
        YourName: "Vaše meno",
        BitcoinReturnAddress: "Bitcoinová adresa",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "Lokálna mena",
        TimeZone: "Časové pásmo",
        ShipToName: "Meno",
        ShipToStreet: "Ulica",
        ShipToCity: "Obec",
        ShipToState: "Štát/Provincia/Región",
        ShipToPostalCode: "PSČ",
        PostalCode: "PSČ",
        ShipToCountry: "Krajina",
        EnableNotifications: "Povoliť notifikácie",
        EnableSSL: "Povoliť SSL (šifrované spojenie)",
        LibbitcoinServerAddress: "Libbitcoin server address",
        ServerIPPort: "Server IP:Port",
        All: "Všetko",
        Name: "Meno",
        Price: "Cena",
        Available: "K dispozícii",
        Tags: "Tags", //notTranslated
        Keywords: "Kľúčové slová",
        Type: "Typ",
        Condition: "Podmienka",
        NSFW: "18+ (obsah pre dospelých)",
        Select: "Select", //not translated
        Social: "Social", //not translated
        Theme: "Theme", //not translated
        Listing: "Listing", //not translated
        Listings: "Listings", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Pages", //not translated
        Page: "Page", //not translated
        Language: "Language", //not translated
        Reset: "Reset", //not translated
        Local: "Lokálne",
        Domestic: "Vnútroštátne",
        Location: "Lokalita",
        International: "Medzinárodne",
        Time: "Čas",
        Free: "Zdarma",
        Category: "Kategória",
        ProcessingTime: "Čas spracovania",
        SelectPhotos: "Select photos", //notTranslated
        UploadPhotos: "Nahrajte obrázky",
        DragOrUploadPhotos: "Nahrať obrázky",
        ExpirationDate: "Dátum expirácie",
        UploadCoverPhoto: "Nahrajte titulný obrázok",
        ShortDescription: "Krátky popis",
        UpTo140Characters: "Do 140 znakov",
        PrimaryColor: "Hlavná farba",
        SecondaryColor: "Vedľajšia farba",
        TextColor: "Farba textu",
        CoverPhotoButton: "Zvoľte titulný obrázok",
        AboutPlaceholder: "Plný popis",
        BackgroundColor: "Farba pozadia",
        NotificationFollow: "vás od teraz sleduje",
        NoNotifications: "Žiadne notifikácie",
        WelcomeToYourPage: "Vitajte na svojej stránke!",
        SearchForCategory: "Hľadať kategóriu",
        Moderators: "Moderátori",
        CurrentModerators: "Aktuálni moderátori",
        AddModerators: "Pridať moderátorov",
        DeselectToRemoveModerator: "Od-značte moderátorov, ktorých chcete odstrániť",
        SelectToAddModerator: "Označte moderátorov, ktorých chcete pridať",
        Categories: "Kategórie",
        UpTo3: "Maximálne 3",
        AboutYourStore: "Popis Vášho obchodu",
        PaymentType: "Typ platby",
        ShipTo: "Odoslať do",
        OrderDetails: "Detaily objednávky",
        OrderSummary: "Zhrnutie objednávky",
        AllListings: "Listingy",
        ComingSoon: "Čoskoro",
        PaymentPending: "Čaká sa na prijatie platby...",
        FinalizePurchase: "Dokončuje sa nákup",
        LoadingImage: "Nahráva sa obrázok...",
        UploadAvatar: "Nahrať avatara",
        SaveAvatar: "Uložiť avatara",
        NewAvatar: "Zvoľte nového avatara",
        NewCoverImage: "Zvoľte nový titulný obrázok",
        Loading: "Loading...", // not translated
        Purchases:"Nákupy",
        Sales: "Sales", // not translated
        Cases: "Cases", // not translated
        Enter: "Enter", //notTranslated
        Discover: "Discover", // not translated
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Blocked", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        FreeShipping: "Free Shipping", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Visibility: "Visibility", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        DomesticShippingTime: "Domestic Shipping Time", // not translated
        InternationalShippingTime: "International Shipping Time", // not translated
        DisplayNSFWcontent: "Display NSFW content?", // not translated
        Basic: "Basic", // not translated
        Content: "Content", // not translated
        StandardThemes: "Standard themes", // not translated
        NoPhotosAdded: "No Photos Added", // not translated
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Sold By", // not translated
          PurchasedBy: "Purchased By", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Paid (Funds Waiting)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Paid (Funds Waiting)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "Nepodarilo sa uložiť údaje.",
          getError: "Nepodarilo sa načítať údaje.",
          missingError: "Niektoré políčka nie sú vyplnené, alebo sú vyplnené nesprávne.",
          serverError: "Server poslal nesprávnu odpoveď.",
          userError: "Nepodarilo sa nájsť informácie pre toto ID",
          userNotFoundError: "Informácie o tejto osobe nie sú k dispozícii.",
          notFoundError: "Nepodarilo sa načítať údaje o:",
          socketError: "URL for WebSocket failed. Connecting to socket with default address of ws://localhost:18466",
          contractError: "Nákup položky neprebehol.",
          sellerError: "Predajcov server odmietol žiadosť o nákup.",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "Uložené",
          SaveSuccess: "Vaše zmeny boli uložené."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "Všetky typy",
          pagesStores: "Obchody",
          pagesMods: "Služby moderátora",
          pagesBasic: "Základní používatelia",
          listingsCurated: "Z obchodov, ktoré sledujem",
          listingsAll: "Zo všetkých obchodov"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "Moja stránka",
          customizePage:"Upraviť stránku",
          sellItem:"Nová položka",
          createListing:"Nový listing",
          purchases:"Nákupy",
          sales:"Predaje",
          cases:"Prípady",
          notifications:"Notifikácie",
          settings:"Nastavenia",
          about:"O OpenBazaari",
          support:"Podporte OpenBazaar"
        },
        onboarding: {
          intro: "Konfigurácia OpenBazaaru",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "", //notTranslated
          Theme: "Zvoľte si grafickú tému Vašej stránky",
          chooseLanguage: "Zvoľte jazyk",
          contributors: "%{smart_count} prispievateľ |||| %{smart_count} prispievateľov",
          configure: "Configure your experience",
          disclaimer_title: "Upozornenie",
          disclaimer_body: "OpenBazaar je sieť umožňujúca ľuďom obchodovať s tovarmi a službami - prostredníctovm Bitcoinu - bez akejkoľvek centrálnej organizácie, ktorá by platformu ovládala. To znamená, že za svoju aktivitu v sieti ste zodpovední Vy sami.\n\nPoužívatelia OpenBazaaru nie sú anonymní. Väčšina komunikácie medzi používateľmi je šifrovaná, no IP adresy sú verejné a môžu byť spojené s aktivitou na sieti. Útočníci môžu tieto informácie použiť proti Vám; ochrana Vášho súkromia je Vaša vlastná zodpovednosť.\n\nPoužívatelia OpenBazaaru podliehajú zákonom platným v mieste ich pôsobenia, rovnako ako svojmu vlastnému svedomiu. Vývojári OpenBazaaru nenesú žiadnu vinu ani zodpovednosť za akékoľvek zneužitie platformy na nelegálnu činnosť.\n\nKomunita vývojárov OpenBazaaru tvrdo pracovala na tom, aby svetu priniesla slobodnú obchodnú platformu. Ale ako to už pri softvéri býva, určite sa vyskytnú nejaké chyby. Vývojári nie sú zodpovední za akékoľvek finančné škody spojené s problémami v tomto softvéri.\n\nPoužívaním OpenBazaaru príjmate zodpovednosť za všetky svoje činy na sieti OpenBazaar.",
          yourCountry: "Zvoľte svoju krajinu",
          localCurrency: "Zvoľte svoju menu",
          LanguagePlaceholder: "Vyhľadať jazyk",
          CountryPlaceholder: "Vyhľadať krajinu",
          CurrencyPlaceholder: "Vyhľadať menu",
          TimezonePlaceholder: "Vyhľadať časové pásmo",
          ShortDescriptionPlaceholder: "Napíšte o sebe niečo zaujímavé... (max 160 znakov)",
          timeZone: "Zvoľte svoje časové pásmo",
          yourDetails: "Zadajte detaily o sebe",
          yourDescription: "Popis", // notTranslated
          handle: "Handle",
          chooseHandle: "Choose a handle", // not translated
          knownAs: "Momentálne ste známi ako:",
          wouldYou: "Chcete si zaregistrovať ľahko zapamätateľný handle (prezývku)?",
          registerNew: "Zaregistrovať nové",
          recommended: "Odporúčané stránky hodné sledovania",
          connectExisting: "Pripojiť existujúci",
          avatar: "Vložiť avatara",
          chooseAvatar: "Zvoliť avatara",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        buyFlow: {
          DirectPayment: "Direct Payment", //notTranslated
          SendDirectlyTo: "Send direct payment to %{handle}", //notTranslated
          MustAddAddress: "Musíte zadať adresu pre doručenie",
          VendorShipsTo: "Tento predajca odosiela tovar do nasledujúcich krajín:",
          DoesNotShipHere: "Does not ship here", //notTranslated
          Send: "Semd", //notTranslated
          BTCto: "BTC to", //notTranslated
          SendBTCtoAddress: "Send %{amount} BTC to",
          OpenAddress: "Open in Local Wallet", //notTranslated
          CopyAddress: "Copy to Clipboard", //notTranslated
          RefreshPayment: "Refresh Payment Status", //notTranslated
          summaryMsg1: "Your payment has been sent to %{recipient}", //notTranslated
          summaryMsg2: "The expected processing time for this order is", //notTranslated
          summaryMsg3: "You can check the status of your order on your", //notTranslated
          purchasesPage: "purchases page", //notTranslated
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          directPaymentTo: "Direct Payment to", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "Turkish",
        langCode: "tr",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Sonraki",
        IAgree: "Kabul ediyorum",
        Back: "Geri",
        EnterMessage: "İletinizi yazın...",
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "Atla",
        Done: "Tamam",
        Navigation: "Navigation", //notTranslated
        Cancel: "İptal",
        ClosingOpenBazaar: "Close (Your page will go offline)", //notTranslated
        Minimize: "Minimize", //notTranslated
        Maximize: "Maximize", //notTranslated
        Close: "Kapat",
        Yes: "Evet",
        No: "Hayır",
        of: "de",
        Sell: "Sat",
        New: "Yeni",
        Excellent: "Çok iyi",
        Good: "İyi",
        Poor: "İyi değil",
        SKU: "Stok Takip Kodu",
        Refurbished: "Yenilenmiş",
        Physical: "Fiziksel",
        Digital: "Dijital",
        Service: "Hizmet",
        Visit: "Sayfayı Görüntüle",
        Item: "Öğe",
        Items: "Öğeler",
        Stores: "Mağazalar",
        Follow: "Takip et",
        Feed: "Haberler",
        FeedPlaceholder: "Takip ettiğiniz tüm sayfalardan haberler",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "Takibi bırak",
        About: "Hakkında",
        NoDescriptionAdded: "Tanım eklenmemiş",
        NoListings: "No listings", //notTranslated
        CoverPhoto: "Kapak görseli",
        AboutEmpty: "Hakkında kısmı boş...",
        Followers: "Takipçiler",
        Following: "Takip edilenler",
        Message: "İleti",
        Messages: "İletiler",
        Store: "Mağaza",
        Edit: "Düzenle",
        Used: "Kullanılmış",
        Delete: "Sil",
        DontDelete: "Silme",
        ConfirmDelete: "Silmeyi Onayla",
        Website: "Websitesi",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Hoşgeldiniz",
        CreateStore: "Mağaza Oluşturun",
        GoToMyPage: "Sayfam",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Bir ad ya da anahtar sözcük Ara",
        SearchFeedPlaceholder: "Takma ad ya da GUID Ara",
        SearchForFollowersPlaceholder: "Takma ad ya da GUID Ara",
        SearchForUsersPlaceholder: "Takma ad ya da GUID Ara",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 İş Günü",
        EstDeliveryInternationalPlaceholder: "7-15 İş Günü",
        OrderProcessingTimePlaceholder: "Siparişin hazırlanması için gereken süreyi girin",
        TermsAndConditionsPlaceholder: "Hüküm ve koşulları girin...",
        TitlePlaceholder: "Başlık girin...",
        DescriptionPlaceholder: "Tanım girin...",
        ReturnPolicyPlaceholder: "İade politkasını girin...",
        CategoryPlaceholder: "Kategori girin",
        CategoryHelperText: "Kategoriler mağazanızdaki öğeleri  gruplandırıp sınıflandırmak için kullanılır.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "Öğenin mağazanızdan otomatik olarak kaldırılacağı bir tarih belirleyin.",
        ClearExpirationDate: "Sonlanma Tarihini Sil",
        ReturnPolicy: "İade Politikası",
        TermsAndConditions: "Hükümler ve Koşullar",
        Photos: "Görseller",
        Added: "Eklendi",
        Categorization: "Sınıflandırma",
        Expiration: "Sonlanma",
        Search: "Ara",
        Email: "Eposta",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "Hemen Al",
        Description: "Tanım",
        Reviews: "Yorumlar",
        Shipping: "Gönderme",
        Addresses: "Adresler",
        NewAddress: "Yeni Adres",
        CurrentAddress: "Güncel Adres",
        Returns: "İadeler",
        ReturnsPolicy: "İade Politikası",
        Ampersand: "&",
        Tags: "Tags", //notTranslated
        Keywords: "Anahtar Sözcükler",
        ShipsFrom: "Gönderi Çıkış Yeri:",
        ShipsTo: "Gönderilebilecek Yerler",
        Optional: "İsteğe bağlı",
        Customize: "Özelleştir",
        Save: "Kaydet",
        Changes: "Değişiklikler",
        SaveChanges: "Değişiklikleri Kaydet",
        YourName: "Adınız",
        BitcoinReturnAddress: "Bitcoin adresiniz",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "Yerel para birimi",
        TimeZone: "Saat Dilimi",
        ShipToName: "Ad",
        ShipToStreet: "Sokak",
        ShipToCity: "Kent",
        ShipToState: "Eyalet/İl/Bölge",
        ShipToPostalCode: "Posta kodu",
        PostalCode: "Posta kodu",
        ShipToCountry: "Ülke",
        EnableNotifications: "Uyarıları etkinleştir",
        EnableSSL: "SSL'i etkinleştir",
        LibbitcoinServerAddress: "Libbitcoin sunucu adresi",
        ServerIPPort: "Sunucu IP:Port",
        All: "Tümü",
        Name: "Ad",
        Price: "Fiyat",
        Available: "Mevcut",
        Type: "Tür",
        Condition: "Şart",
        NSFW: "18+ (Yetişkinlere yönelik içerik)",
        Select: "Select", //not translated
        Social: "Social", //not translated
        Theme: "Theme", //not translated
        Listing: "Listing", //not translated
        Listings: "Listings", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Pages", //not translated
        Page: "Page", //not translated
        Language: "Language", //not translated
        Reset: "Sıfırla", //not translated
        Local: "Yerel",
        Domestic: "Yurt içi",
        Location: "Konum",
        International: "Uluslararası",
        Time: "Zaman",
        Free: "Ücretsiz",
        Category: "Kategori",
        ProcessingTime: "Hazırlanma süresi",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Görselleri yükle ya da sürükle",
        ExpirationDate: "Sona erme tarihi",
        UploadCoverPhoto: "Kapak görseli yükleyin",
        ShortDescription: "Kısa açıklama",
        UpTo140Characters: "140 karaktere kadar",
        PrimaryColor: "Ana Renk",
        SecondaryColor: "Ara Renk",
        TextColor: "Metin Rengi",
        CoverPhotoButton: "Kapak Görseli Seç",
        AboutPlaceholder: "Tam açıklama",
        BackgroundColor: "Arkaplan Rengi",
        NotificationFollow: "sizi takip etmeye başladı",
        NoNotifications: "Bildirim yok",
        WelcomeToYourPage: "Sayfanıza hoşgeldiniz!",
        SearchForCategory: "Kategori Ara",
        Moderators: "Aracılar",
        CurrentModerators: "Mevcut Aracılar",
        AddModerators: "Yeni Aracı Ekle",
        DeselectToRemoveModerator: "Kaldırmak istediğiniz aracıların seçimini iptal edin",
        SelectToAddModerator: "Eklemek istediğiniz aracıları seçin",
        Categories: "Kategoriler",
        UpTo3: "3 adede kadar",
        AboutYourStore: "Mağaza açıklamanız",
        PaymentType: "Ödeme Türü",
        ShipTo: "Gönderilecek Yer:",
        FreeShipping: "Ücretsiz Gönderim",
        OrderDetails: "Sipariş Bilgileri",
        OrderSummary: "Sipariş Özeti",
        AllListings: "Tüm Teklifler",
        ComingSoon: "Pek Yakında",
        PaymentPending: "Ödeme Beklemede",
        FinalizePurchase: "Siparişi Tamamla",
        LoadingImage: "Görsel Yükleniyor...",
        UploadAvatar: "Avatar Yükle",
        SaveAvatar: "Avatarı Kaydet",
        NewAvatar: "Yeni Avatar Seç",
        NewCoverImage: "Yeni Kapak Görseli Seç",
        Loading: "Loading...", // not translated
        Purchases: "Purchases", //not translated
        Sales: "Sales", // not translated
        Cases: "Cases", // not translated
        Enter: "Enter", //notTranslated
        Discover: "Discover", // not translated
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Blocked", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Visibility: "Visibility", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        DomesticShippingTime: "Domestic Shipping Time", // not translated
        InternationalShippingTime: "International Shipping Time", // not translated
        DisplayNSFWcontent: "Display NSFW content?", // not translated
        Basic: "Basic", // not translated
        Content: "Content", // not translated
        StandardThemes: "Standard themes", // not translated
        NoPhotosAdded: "No Photos Added", // not translated
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Sold By", // not translated
          PurchasedBy: "Purchased By", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Paid (Funds Waiting)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Paid (Funds Waiting)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "Veri kaydedilemedi.",
          getError: "Veri alınamadı.",
          missingError: "Bazı alanlar eksik ya da hatalı.",
          serverError: "Sunucudan hatalı bir yanıt alındı.",
          userError: "Bu ID hakkında bilgi bulunamadı.",
          userNotFoundError: "Bu kişinin bilgisi mevcut değil. Çevrimdışı olabilirler.",
          notFoundError: "Verisi yükelenemeyen öğe:",
          socketError: "Websoket URL'si hata verdi. Sokete öntanımlı ws://localhost:18466 ile bağlanılıyor.",
          contractError: "Bu Öğe Satın Alınamaz",
          sellerError: "Satıcının sunucusu alım talebini reddetti",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "Kaydedildi",
          SaveSuccess: "Değişiklikleriniz kaydedildi."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "Tüm çeşitler",
          pagesStores: "Mağazalar",
          pagesMods: "Aracı hizmetleri",
          pagesBasic: "Temel kullanıcılar",
          listingsCurated: "Takip ettiğim mağazalardan",
          listingsAll: "Tüm mağazalardan"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "Sayfam",
          customizePage:"Sayfayı Özelleştir",
          sellItem:"Yeni",
          createListing:"Yeni Öğe",
          purchases:"Alımlar",
          sales:"Satışlar",
          cases:"Olaylar",
          notifications:"Bildirimler",
          settings:"Ayarlar",
          about:"OpenBazaar Hakkında",
          support:"OpenBazaar'ı Destekle"
        },
        onboarding: {
          intro: "OpenBazaar Yaplandırma",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "", //notTranslated
          Theme: "Sayfanız için bir Tema Seçin",
          chooseLanguage: "Dilinizi Seçin",
          contributors: "%{smart_count} Katkıcı |||| %{smart_count} Katkıcı",
          configure: "Deneyiminizi Yapılandırın",
          disclaimer_title: "Sorumluluk Reddi",
          disclaimer_body: "OpenBazaar, insanların Bitcoin kullanarak doğrudan birbirleri arasında ürün ve hizmet alışverişi için kurulmş bir ağdır ve bu platformu kontrol eden merkezi hiçbir örgüt yoktur. Bu da, ağdaki eylemlerinizden kendinizin sorumlu olduğu anlamına gelir.\n\nOpenBazaar kullanıcıları varsayılan olarak anonim değillerdir. Taraflar arasındaki çoğu iletişim şifrelenmiştir, fakat IP adresleri herkesin erişimine açıktır ve ağdaki aktivitelerle ilişkilendirilebilir. Kötü niyetli kimseler bu bilgiyi aleyhinize kullanabilir; gizliliğinizi korumak sizin sorumluluğunuzdadır. \n\nOpenBazaar kullanıcıları kendi adli yargılama yasalarına ve vicdanlarına uygun biçimde hareket etmelidirler. OpenBazaar geliştiricileri platformun yasadışı etkinlik için kullanımını uygun görmez ve bundan sorumlu değillerdir.\n\n OpenBazaar geliştiricleri topluluğu dünyaya özgür bir alışveriş platformu sunmak için çok çalışmışlardır. Ancak her yazılımda olduğu gibi hatalar olacaktır. Geliştiriciler yazılımdaki hatalardan kaynaklanabilecek maddi kayıplardan sorumlu tutulamazlar. \n\nOpenBazaar'ı kullanarak, bu ağdaki eylemlerinizin sorumluluğunu üstlenmiş olursunuz.",
          yourCountry: "Ülkenizi Seçin",
          localCurrency: "Para Biriminizi Seçin",
          LanguagePlaceholder: "Dil Ara",
          CountryPlaceholder: "Ülke Ara",
          CurrencyPlaceholder: "Para birimi Ara",
          TimezonePlaceholder: "Saat dilimi Ara",
          ShortDescriptionPlaceholder: "İlginç bir şeyler söyleyin... (Azami 160 kar.)",
          timeZone: "Saat Diliminizi Seçin",
          yourDetails: "Bilginizi Girin",
          yourDescription: "Tanım", //notTranslated
          handle: "Takma Ad",
          chooseHandle: "Choose a handle", // not translated
          knownAs: "Mevcut Takma Adınız:",
          wouldYou: "Akılda kalıcı bir Takma Ad kaydetmek ister misiniz?",
          registerNew: "Yeni Kaydet",
          recommended: "Takip Edilesi Sayfalar",
          connectExisting: "Mevcuta Bağlan",
          avatar: "Avatar Ata",
          chooseAvatar: "Avatar Seç",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        buyFlow: {
          DirectPayment: "Direct Payment", //notTranslated
          SendDirectlyTo: "Send direct payment to %{handle}", //notTranslated
          MustAddAddress: "Gönderilecek bir adres eklemelisiniz",
          VendorShipsTo: "Satıcı şu ülkelere gönderim yapmaktadır",
          DoesNotShipHere: "Satıcı buraya gönderim yapmamaktadır",
          Send: "Gönder",
          BTCto: "BTC alıcısı",
          SendBTCtoAddress: "Gönder %{amount} BTC alıcısı",
          OpenAddress: "Adresi Yerel Cüzdanda Aç",
          CopyAddress: "Ödeme Adresini Panoya Kopyala",
          RefreshPayment: "Ödeme Durumunu Yenile",
          summaryMsg1: "Gönderilen ödemenin alıcısı %{recipient}",
          summaryMsg2: "Bu siparişin tahmini hazırlama süresi",
          summaryMsg3: "Siparişinizin durumunu kontrol edebileceğiniz yer",
          purchasesPage: "alımlar sayfası", //notTranslated
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          directPaymentTo: "Direct Payment to", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "Klingon",
        langCode: "klg",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Veb",
        IAgree: "jIQochbe'",
        Back: "Chap",
        EnterMessage: "QIn 'el...",
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "BuSHa'",
        Done: "PItlh",
        Navigation: "Navigation", //notTranslated
        Cancel: "QuvHa'ghach",
        ClosingOpenBazaar: "Close (Your page will go offline)", //notTranslated
        Minimize: "Minimize", //notTranslated
        Maximize: "Maximize", //notTranslated
        Close: "SoQmoH",
        Yes: "HIja'",
        No: "Be'",
        of: ",",
        Sell: "Ngev",
        New: "Chu'",
        Excellent: "Chon",
        Good: "Maj",
        Poor: "VIvup",
        SKU: "SKU",
        Refurbished: "SabHa'",
        Physical: "Hap 'u'",
        Digital: "Va",
        Service: "ChavmoH",
        Visit: "Legh JuH",
        Item: "Doch",
        Items: "Doch",
        Stores: "NgevwI'",
        Follow: "Pab",
        Feed: "BIQtIq",
        FeedPlaceholder: "BIQtIq chu' wa' vo' chaq juH Dapab",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "Mej",
        About: "Umqu' ghot",
        NoDescriptionAdded: "Pagh bang nob",
        NoListings: "No listings", //notTranslated
        CoverPhoto: "Yuvtlhe' mIllogh",
        AboutEmpty: "Ghot tu'lu'. mej chIm...",
        Followers: "PabwI'",
        Following: "Pab",
        Message: "QIn",
        Store: "NgevwI'",
        Edit: "ChoH",
        Used: "WaH",
        Delete: "HoH",
        DontDelete: "Wej HoH",
        ConfirmDelete: "Qapla' HoH",
        Website: "'ej bebvo' Juh",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "YI'el",
        CreateStore: "NgevwI' qach",
        GoToMyPage: "JuHwIj",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Pong mu' joq nej",
        SearchFeedPlaceholder: "Ngaj pong nej ghap GUID",
        SearchForFollowersPlaceholder: "Ngaj pong nej ghap GUID",
        SearchForUsersPlaceholder: "Ngaj pong nej ghap GUID",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "Wej pagh vagh jaj malja'",
        EstDeliveryInternationalPlaceholder: "Soch pagh wa'maH 'ej vagh jaj malja'",
        OrderProcessingTimePlaceholder: "wa' pagh cha' jaj malja'",
        TermsAndConditionsPlaceholder: "Wabmey je 'ej...",
        TitlePlaceholder: "Doch pong 'el",
        DescriptionPlaceholder: "Doch Del...",
        ReturnPolicyPlaceholder: "Ngoch 'el chegh...",
        CategoryPlaceholder: "MIwqoqvam'e' Doch 'el",
        CategoryHelperText: "Lo' bIquv Doch ghom tlham 'ej pa' ngevwI'.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "PoH Doch DaqaSmoH vo' ngevwI' HIjmeH.",
        ClearExpirationDate: "Hegh poH Huv",
        ReturnPolicy: "Ngoch chegh",
        TermsAndConditions: "Wabmey je 'ej",
        Photos: "MIllogh",
        Added: "Boq",
        Categorization: "Segh",
        Expiration: "Hegh",
        Search: "Nej",
        Email: "JabbI'ID vo' 'ul",
        Facebook: "QaD paq",
        Instagram: "MIllogh Soj ghu je",
        Twitter: "Mach mu'",
        PGPKey: "PGP Key",
        Snapchat: "MIllogh naked nuvpu'",
        BUYNOW: "DaH je'",
        Description: "Bang",
        Reviews: "YIqaw",
        Shipping: "NgeH Duj",
        Addresses: "SoQ",
        NewAddress: "Chu' SoQ",
        CurrentAddress: "JuH Dachegh SoQ",
        Returns: "NobHa'",
        ReturnsPolicy: "Ngoch chegh",
        Ampersand: "&",
        Tags: "Tags", //notTranslated
        Keywords: "Mu'mey",
        ShipsFrom: "Duj vo'",
        ShipsTo: "Duj",
        Optional: "Duh",
        Customize: "ChoH",
        Save: "Choq",
        Changes: "ChoH",
        SaveChanges: "ChoH toD",
        YourName: "PonglIj'e'",
        BitcoinReturnAddress: "Bot SoQ mIr",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "Huch lutu'lu'bej",
        TimeZone: "PoH mIch",
        ShipToName: "Pong",
        ShipToStreet: "Tuq",
        ShipToCity: "Veng",
        ShipToState: "Sep",
        ShipToPostalCode: "Duj Sep mI'",
        PostalCode: "Sep ml'",
        ShipToCountry: "Duj Sep",
        EnableNotifications: "GhuHmoH chaw'",
        EnableSSL: "Chaw' SSL",
        LibbitcoinServerAddress: "Libbitcoin tIn De'wI' SoQ",
        ServerIPPort: "TIn De'wI' IP:Port",
        All: "Hoch",
        Name: "Pong",
        Price: "'ay'",
        Available: "LupoQ",
        Type: "Segh",
        Condition: "Je",
        NSFW: "Dochmey nen",
        Select: "Select", //not translated
        Social: "Social", //not translated
        Theme: "Theme", //not translated
        Listing: "Listing", //not translated
        Listings: "Listings", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Pages", //not translated
        Page: "Page", //not translated
        Language: "Language", //not translated
        Reset: "Reset", //not translated
        Local: "Lutu'llu'bej",
        Domestic: "JuH Dachegh Sep",
        Location: "NuqDaq SoH",
        International: "Latlh Sep",
        Time: "PoH",
        Free: "Tlhab",
        Category: "Segh",
        ProcessingTime: "Poh mlw",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Chagh pagh mIllogh ngeH",
        ExpirationDate: "Hegh",
        UploadCoverPhoto: "MIllogh yuvtlhe' ngeH",
        ShortDescription: "QaS bang",
        UpTo140Characters: "Da'elDI' wa' wa'vatlh 'ej loSmaH jabbI'ID",
        PrimaryColor: "Wa'DIch rItlh",
        SecondaryColor: "Cha'DIch rItlh",
        TextColor: "JabbI'ID rItlh",
        CoverPhotoButton: "Yuvtlhe' mIllogh wIv",
        AboutPlaceholder: "Bang naQ",
        BackgroundColor: "rItlh patmey lulo'ta'",
        NotificationFollow: "SoH tlha'",
        NoNotifications: "Pagh ghuHmoH",
        WelcomeToYourPage: "MajQa' Sucheghmo'!",
        SearchForCategory: "Nej Segh",
        Moderators: "NoH",
        CurrentModerators: "Qu'mey potlh yIlo'",
        AddModerators: "NoH chu' chel",
        DeselectToRemoveModerator: "NoH teq",
        SelectToAddModerator: "NoH wIv",
        Categories: "Segh",
        UpTo3: "wej Da'elDI'",
        AboutYourStore: "Bang ngevwI'",
        PaymentType: "Segh yIDIl",
        ShipTo: "Duj",
        FreeShipping: "Tlhab ngeH",
        OrderDetails: "Tlham bang",
        OrderSummary: "Tlham ngaj bang",
        AllListings: "Hoch Dolmey ngev",
        ComingSoon: "Tugh, petaQ ghoS",
        PaymentPending: ", qatlh Ha' Huch",
        FinalizePurchase: "Huch wInobqang rIn",
        LoadingImage: "MIllogh ghuS...",
        UploadAvatar: "Upload Avatar",
        SaveAvatar: "QaD mIllogh nob",
        NewAvatar: "QaD mIllogh wIv",
        NewCoverImage: "Yuvtlhe' mIllogh wIv",
        Loading: "Loading...", // not translated
        Purchases:"Je'",
        Sales: "Sales", // not translated
        Cases: "Cases", // not translated
        Enter: "Enter", //notTranslated
        Discover: "Discover", // not translated
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Blocked", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Visibility: "Visibility", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        DomesticShippingTime: "Domestic Shipping Time", // not translated
        InternationalShippingTime: "International Shipping Time", // not translated
        DisplayNSFWcontent: "Display NSFW content?", // not translated
        Basic: "Basic", // not translated
        Content: "Content", // not translated
        StandardThemes: "Standard themes", // not translated
        NoPhotosAdded: "No Photos Added", // not translated
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Sold By", // not translated
          PurchasedBy: "Purchased By", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Paid (Funds Waiting)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Paid (Funds Waiting)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "Wej toDlu' De'.",
          getError: "LaH wej Suq De'.",
          missingError: "'op 'ay' tu'lu' QIH pagh chomuvbe''a'.",
          serverError: "Hev jang QIH vo' De'wI' tIn.",
          userError: "LaH wej tu' De' ID",
          userNotFoundError: "'oHbe' De' nuv tu'lu'. Chaq wej tu'lu' chaH.",
          notFoundError: "LaH wej qaSmoHlu' De':",
          socketError: "Luj URL WebSocket. Rar socket SoQ ws://localhost:18466",
          contractError: "LaH wej je' Doch",
          sellerError: "QuvHa' offer lajQo' loD 'Iv ngev",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "Choq",
          SaveSuccess: "YemwI' choH."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "Hoch Segh",
          pagesStores: "NgevwI'",
          pagesMods: "ChavmoH yIlo'",
          pagesBasic: "Nap nuvpu'",
          listingsCurated: "Vo' ngevwI' tlha' jIH",
          listingsAll: "Vo' Hoch ngevwI'"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "JuHwIj",
          customizePage:"JuHwIj choH",
          sellItem:"Chu'",
          createListing:"Chu' tetlh",
          purchases:"Je'",
          sales:"DIlmeH",
          cases:"Bo'DIj qaS",
          notifications:"GhuH",
          settings:"Bang",
          about:"Umqu' ghot OpenBazaar",
          support:"Qutlh OpenBazaar"
        },
        onboarding: {
          intro: "OpenBazaar bang",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "", //notTranslated
          Theme: "Hoch tuqwIj wIv",
          chooseLanguage: "Hol wIv",
          contributors: "%{smart_count} 'ach yIn nuvpu' 'Iv ghaq |||| %{smart_count} 'ach yIn nuvpu' 'Iv ghaq",
          configure: "SIQpu'bogh choH",
          disclaimer_title: "Tu' ghuHmoH",
          disclaimer_body: "OpenBazaar Doch chavmoH Hoch wo' SabtaHbogh yIn nuvpu'-bitcoin-lo' Hutlh vay' Vas DIvI' ravDaq yISeH 'ej mech network. SoHvaD ngoy' activity wa' nuv. qej \n\nOpenBazaar nuv wej Sovbe'lu'bogh Qoylu' 'ej mIv tIn vItuQchoH pong quvHa' nuvpu'. QaD QumpIn SabtaHbogh nuvpu' mI' pong, 'ach public vaj laH nuq Davang wa' nuv maqochpu'na' maHtaH ip SoQ. De' laH DanoHmeH nuv quvHa' harm SoH; ghob'e' vIchIDmeH, Qatlh Qu' QaD HoS.\n\nThe OpenBazaar group of men who build has worked hard to deliver a free floor for trade to the world. But as with any work, bugs will be found. The men who build are not responsible for any money lost associated with problems in the work.\n\nBy using OpenBazaar you're responsible for your own honor on the OpenBazaar people.",
          yourCountry: "Sep wlv",
          localCurrency: "Huch wIv",
          LanguagePlaceholder: "Nej Hol",
          CountryPlaceholder: "Nej Sep",
          CurrencyPlaceholder: "Nej Huch",
          TimezonePlaceholder: "Nej poH mIch",
          ShortDescriptionPlaceholder: "Vay' quv jatlh... (160 char max)",
          timeZone: "MIch poH wIv",
          yourDetails: "De' toD",
          yourDescription: "Bang", //notTranslated
          handle: "Mach pong",
          chooseHandle: "Choose a handle", // not translated
          knownAs: "DaSov je:",
          wouldYou: "NgeD mach pong qaw toD vIvut SoH?",
          registerNew: "Suy qachmey chu'",
          recommended: "Chup tuq toblu'",
          connectExisting: "NIv'e' rar",
          avatar: "MIllogh qab HIjmeH",
          chooseAvatar: "MIllogh qab wIv",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        buyFlow: {
          DirectPayment: "Direct Payment", //notTranslated
          SendDirectlyTo: "Send direct payment to %{handle}", //notTranslated
          MustAddAddress: "SoQ Duj ghob'e' chel SoH",
          VendorShipsTo: "Daq Duj tuq",
          DoesNotShipHere: "Does not ship here", //notTranslated
          Send: "NgeH",
          BTCto: "BTC to",
          SendBTCtoAddress: "Send %{amount} BTC to",
          OpenAddress: "SoQ poS qaStaHvIS Sum chom Huch",
          CopyAddress: "Huch SoQ pol lulIjbe'lu'bogh",
          RefreshPayment: "Legh Huch Dotlh",
          summaryMsg1: "NgeH Huch %{recipient}", //notTranslated
          summaryMsg2: "PIH mIw Dunqu'mo' tlham",
          summaryMsg3: "LaH legh SoH tlham Dotlh",
          purchasesPage: "Tuq je'", //notTranslated
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          directPaymentTo: "Direct Payment to", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "中文",
        langCode: "zh-CN",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "下一步",
        IAgree: "我同意",
        Back: "上一步",
        EnterMessage: "留言",
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "跳过",
        Done: "完成",
        Navigation: "Navigation", //notTranslated
        Cancel: "取消",
        ClosingOpenBazaar: "Close (Your page will go offline)", //notTranslated
        Minimize: "Minimize", //notTranslated
        Maximize: "Maximize", //notTranslated
        Close: "关闭",
        Yes: "是",
        No: "否",
        of: "有关",
        Sell: "卖l",
        New: "新",
        Excellent: "出色",
        Good: "完好",
        Poor: "较差",
        SKU: "SKU",
        Refurbished: "整修过",
        Physical: "实物",
        Digital: "数字",
        Service: "服务",
        Visit: "打开网页",
        Item: "物品",
        Items: "物品",
        Stores: "店铺",
        Follow: "关注",
        Feed: "消息来源",
        FeedPlaceholder: "更新您关注的所有网页",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "不再关注",
        About: "关于",
        NoDescriptionAdded: "未加描述",
        NoListings: "No listings", //notTranslated
        CoverPhoto: "封面照片",
        AboutEmpty: "关于空白着",
        Followers: "追随者",
        Following: "关注中",
        Message: "留言",
        Store: "店铺",
        Edit: "编辑",
        Used: "已用",
        Delete: "删除",
        DontDelete: "请不要删除",
        ConfirmDelete: "确认删除",
        Website: "网页",
        Guid: "OpenBazaar用户名(GUID)",
        Welcome: "欢迎",
        CreateStore: "开店铺",
        GoToMyPage: "我的主页",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "用名字或关键字查找",
        SearchFeedPlaceholder: "用 handle 或 GUID 查找",
        SearchForFollowersPlaceholder: "用 handle 或 GUID 查找",
        SearchForUsersPlaceholder: "用 handle 或 GUID 查找",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 个工作日",
        EstDeliveryInternationalPlaceholder: "7-15 工作日",
        OrderProcessingTimePlaceholder: "1-2 工作日",
        TermsAndConditionsPlaceholder: "输入合同条件.",
        TitlePlaceholder: "输入抬头",
        DescriptionPlaceholder: "输入描述",
        ReturnPolicyPlaceholder: "输入退货方式",
        CategoryPlaceholder: "输入分类",
        CategoryHelperText: "分类 为您店铺离商品作出归类和管理",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "输入货品自动上柜日期",
        ClearExpirationDate: "清空过期日期",
        ReturnPolicy: "退货条款",
        TermsAndConditions: "协议书",
        Photos: "照片",
        Added: "已加",
        Categorization: "归类",
        Expiration: "过期日期",
        Search: "查找",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "立即购买",
        Description: "描述",
        Reviews: "评价",
        Shipping: "物流",
        Addresses: "地址",
        NewAddress: "新地址",
        CurrentAddress: "当前地址",
        Returns: "退货",
        ReturnsPolicy: "退货规则",
        Ampersand: "&",
        Tags: "Tags", //notTranslated
        Keywords: "关键字",
        ShipsFrom: "发货地",
        ShipsTo: "发往",
        Optional: "可选",
        Customize: "个性化",
        Save: "保存",
        Changes: "更改",
        SaveChanges: "保存更改",
        YourName: "您的姓名",
        BitcoinReturnAddress: "比特币地址",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "当地货币",
        TimeZone: "时区",
        ShipToName: "姓名",
        ShipToStreet: "地址",
        ShipToCity: "城市",
        ShipToState: "州/省市/地区",
        ShipToPostalCode: "邮编",
        PostalCode: "邮编",
        ShipToCountry: "国家",
        EnableNotifications: "允许通知",
        EnableSSL: "允许 SSL",
        LibbitcoinServerAddress: "Libbitcoin 服务器地址",
        ServerIPPort: "服务器 IP:Port",
        All: "所有",
        Name: "名称",
        Price: "价格",
        Available: "有货",
        Type: "形式",
        Condition: "新旧程度",
        NSFW: "成人内容",
        Select: "Select", //not translated
        Social: "Social", //not translated
        Theme: "Theme", //not translated
        Listing: "Listing", //not translated
        Listings: "Listings", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Pages", //not translated
        Page: "Page", //not translated
        Language: "Language", //not translated
        Reset: "重置", //not translated
        Local: "本地",
        Domestic: "本国",
        Location: "地点",
        International: "国际",
        Time: "时间",
        Free: "免费",
        Category: "分类",
        ProcessingTime: "处理时间",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "拖移或上传照片",
        ExpirationDate: "失效日期",
        UploadCoverPhoto: "上传封面照片",
        ShortDescription: "简短介绍",
        UpTo140Characters: "140字以下",
        PrimaryColor: "主色调",
        SecondaryColor: "副色调",
        TextColor: "文字颜色",
        CoverPhotoButton: "选择封面照片",
        AboutPlaceholder: "详细介绍",
        BackgroundColor: "背景颜色",
        NotificationFollow: "在关注您",
        NoNotifications: "无新消息",
        WelcomeToYourPage: "欢迎来到您的主页",
        SearchForCategory: "查找分类项目",
        Moderators: "调解员",
        CurrentModerators: "当前调解员",
        AddModerators: "添加新的调解员",
        DeselectToRemoveModerator: "反选您想要去掉的调解员",
        SelectToAddModerator: "选择您想要添加的调解员",
        Categories: "分类",
        UpTo3: "最多三类",
        AboutYourStore: "您店铺的介绍",
        PaymentType: "付款方式",
        ShipTo: "发货到",
        FreeShipping: "免运费",
        OrderDetails: "订单内容",
        OrderSummary: "订单内容总结",
        AllListings: "所有货物展示",
        ComingSoon: "即将上架",
        PaymentPending: "付款正在进行中",
        FinalizePurchase: "完成购物",
        LoadingImage: "正在下载图像",
        UploadAvatar: "上载 Avatar",
        SaveAvatar: "保存 Avatar",
        NewAvatar: "选择新的 Avatar",
        NewCoverImage: "选择新的封面照片",
        Loading: "Loading...", // not translated
        Purchases: "Purchases", // not translated
        Sales: "Sales", // not translated
        Cases: "Cases", // not translated
        Enter: "Enter", //notTranslated
        Discover: "Discover", // not translated
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Blocked", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Visibility: "Visibility", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        DomesticShippingTime: "Domestic Shipping Time", // not translated
        InternationalShippingTime: "International Shipping Time", // not translated
        DisplayNSFWcontent: "Display NSFW content?", // not translated
        Basic: "Basic", // not translated
        Content: "Content", // not translated
        StandardThemes: "Standard themes", // not translated
        NoPhotosAdded: "No Photos Added", // not translated
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Sold By", // not translated
          PurchasedBy: "Purchased By", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Paid (Funds Waiting)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Paid (Funds Waiting)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "数据没有被储存",
          getError: "数据调出失败",
          missingError: "有错误或未填栏",
          serverError: "服务器响应错误应答",
          userError: "找不到此用户名的信息",
          userNotFoundError: "未能调出此人信息， 他有可能不在线。",
          notFoundError: "有关数据未能调出",
          socketError: "WebSocket的URL地址失败。请使用ws://localhost:18466",
          contractError: "找不到此项货物",
          sellerError: "卖家的服务器拒绝了这笔买卖",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "以保存",
          SaveSuccess: "以保存更改"
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "所有分类",
          pagesStores: "店铺",
          pagesMods: "调解员服务",
          pagesBasic: "基本用户",
          listingsCurated: "我关注的店家里找",
          listingsAll: "所有点家里找"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "我的主页",
          customizePage:"个性化主页",
          sellItem:"新品",
          createListing:"新条目",
          purchases:"已买到",
          sales:"以卖纪录",
          cases:"事件",
          notifications:"通知",
          settings:"设置",
          about:"关于 OpenBazaar",
          support:"支持 OpenBazaar"
        },
        onboarding: {
          intro: "OpenBazaar 布局",
          Introduction: "Introduction", //notTranslated
         IntroductionBody: "", //notTranslated          theme: "选择主页主题",
          chooseLanguage: "选择语言",
          contributors: "%{smart_count} Contributor |||| %{smart_count} Contributors",
          configure: "设定体验内容",
          disclaimer_title: "免责声明",
          disclaimer_body: "OpenBazaar 是一个没有任何集中体控制的网络平台，通过本网人们可以使用比特币自由直接的交换货物与互相提供服务。这意味着您将为您在本网的活动负全部责任。\n\nOpenBazaar 的使用者默认身份不为匿名的。大多数用户通讯信息是加密的，但是用户IP地址是公开的并且可以被追踪到本网。有人可以恶意使用您的信息损害您的利益；保护您的隐私是您本人的责任\n\nOpenBazaar 用户必须遵守他们所在地区管辖内的法律和道德标准。OpenBazaar 的创建者们不但不宽容并且不为任何利用本网进行非法活动分子负责。\n\nOpenBazaar 创建者们尽心尽力为用户提供了一个免费的贸易交流平台，但是就像所有的软件一样，避免不了程序错误。创建者们不为因软件问题而造成的经济损失。\n\n在使用 OpenBazaar 时，敬请对您本人的行为负责。",
          yourCountry: "选择您的国家",
          localCurrency: "选择您的币种",
          LanguagePlaceholder: "选择语言",
          CountryPlaceholder: "查找国家",
          CurrencyPlaceholder: "查找货币",
          TimezonePlaceholder: "查找时区",
          ShortDescriptionPlaceholder: "发表意见（最多160字）",
          timeZone: "选择您的时区",
          yourDetails: "设置您的信息",
          yourDescription: "描述", // notTranslated
          handle: "Handle", // not translated
          chooseHandle: "Choose a handle", // not translated
          knownAs: "您目前的用户名是",
          wouldYou: "您想注册一个更容易记得 handle吗?",
          registerNew: "注册一个新的",
          recommended: "建议关注此网页",
          connectExisting: "连接 Existing",
          avatar: "设置一个 Avatar",
          chooseAvatar: "选择 Avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        buyFlow: {
          DirectPayment: "Direct Payment", //notTranslated
          SendDirectlyTo: "Send direct payment to %{handle}", //notTranslated
          MustAddAddress: "务必添加送货地址",
          VendorShipsTo: "此商家向以下国家发货",
          DoesNotShipHere: "Does not ship here",
          Send: "发送",
          BTCto: "BTC至",
          SendBTCtoAddress: "Send %{amount} BTC to", //notTranslated
          OpenAddress: "将地址在本地钱包里打开",
          CopyAddress: "将付款地址拷贝到粘贴册",
          RefreshPayment: "刷新付款进度",
          summaryMsg1: "您付的款已经被交到%{recipient}", //notTranslated
          summaryMsg2: "这笔订单预计完成时间为",
          summaryMsg3: "到此查看您订单的状况",
          purchasesPage: "以购商品", //notTranslated
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          directPaymentTo: "Direct Payment to", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "한국어 (Korean)",
        langCode: "ko",
        /* Use capitalized keys for widely reused text that must be capitalized...
        Korean type doesn't have capitalized letters*/
        Next: "다음",
        IAgree: "동의",
        Back: "뒤",
        EnterMessage: "메세지 입력...",
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "거르다",
        Done: "끝난",
        Navigation: "Navigation", //notTranslated
        Cancel: "취소",
        ClosingOpenBazaar: "Close (Your page will go offline)", //notTranslated
        Minimize: "Minimize", //notTranslated
        Maximize: "Maximize", //notTranslated
        Close: "닫기",
        Yes: "네",
        No: "아니요",
        of: "한태서",
        Sell: "팔다",
        New: "새것",
        Excellent: "훌륭한",
        Good: "줗은",
        Poor: "불량",
        SKU: "SKU",
        Refurbished: "단장",
        Physical: "물질",
        Digital: "디지털",
        Service: "제공",
        Visit: "페이지 보기",
        Item: "물품",
        Items: "물품들",
        Stores: "가게",
        Follow: "팔로우",
        Feed: "새로고침",
        FeedPlaceholder: "당신이 따른 모든페이지에서 업데이트 공급",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "팔로우 취소",
        About: "정보",
        NoDescriptionAdded: "설명할수 없어",
        NoListings: "No listings", //notTranslated
        CoverPhoto: "표지 사진",
        AboutEmpty: "정보 없어...",
        Followers: "팔로워",
        Following: "팔로잉",
        Message: "메시지",
        Messages: "메시지들",
        Store: "가게",
        Edit: "편집",
        Used: "중고",
        Delete: "삭제",
        DontDelete: "삭제하지마",
        ConfirmDelete: "진짜삭제?",
        Website: "웹사이트",
        Guid: "오픈바자 ID (GUID)",
        Welcome: "어서오세요!",
        CreateStore: "가게 만들기",
        GoToMyPage: "내 페이지",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "이름과 주제어 검색",
        SearchFeedPlaceholder: "핸들과 오픈바자 ID (GUID) 검색",
        SearchForFollowersPlaceholder: "핸들과 오픈바자 ID (GUID) 검색",
        SearchForUsersPlaceholder: "핸들과 오픈바자 ID (GUID) 검색",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 영업일",
        EstDeliveryInternationalPlaceholder: "7-15 영업일",
        OrderProcessingTimePlaceholder: "시간을 입력시에 주문서 필요",
        TermsAndConditionsPlaceholder: "상품 조건 입력...",
        TitlePlaceholder: "제목 입력",
        DescriptionPlaceholder: "설명 입력...",
        ReturnPolicyPlaceholder: "반품 정책 입력...",
        CategoryPlaceholder: "항목 입력",
        CategoryHelperText: "항목그룹에 사용하고 매장내 항목을 구성하고  있습니다.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "물품이 자동으로 상점에서 가져오게될 날짜를 설정합니다.",
        ClearExpirationDate: "종료날 삭제",
        ReturnPolicy: "반품 정책",
        TermsAndConditions: "상품 조건",
        Photos: "사진들",
        Added: "추가된",
        Categorization: "분류",
        Expiration: "종료",
        Search: "검색",
        Email: "이메일",
        Facebook: "페이스북",
        Instagram: "인스타그램",
        Twitter: "트위터",
        PGPKey: "PGP Key",
        Snapchat: "스냅채트",
        BUYNOW: "지금 구매",
        Description: "설명",
        Reviews: "리뷰",
        Shipping: "배송",
        Addresses: "주소들",
        NewAddress: "새로 주소",
        CurrentAddress: "현재 주소들",
        Returns: "반품",
        ReturnsPolicy: "제품 반품",
        Ampersand: "&",
        Tags: "Tags", //notTranslated
        Keywords: "주제어",
        ShipsFrom: "배송지로 부터",
        ShipsTo: "배송지",
        Optional: "옵션포함",
        Customize: "사용자 지정",
        Save: "저장",
        Changes: "변경",
        SaveChanges: "변경 사항 저장",
        YourName: "당신 이름",
        BitcoinReturnAddress: "당신 비트코인 주소",
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.", //not translated
        LocalCurrency: "지역 통화",
        TimeZone: "시간대",
        ShipToName: "이름",
        ShipToStreet: "주소",
        ShipToCity: "시",
        ShipToState: "도",
        ShipToPostalCode: "우편 번호",
        PostalCode: "우편 번호",
        ShipToCountry: "나라",
        EnableNotifications: "공지 가능",
        EnableSSL: "SSL 가능",
        LibbitcoinServerAddress: "Libbitcoin 서버 주소",
        ServerIPPort: "서버 IP:포트",
        All: "모든",
        Name: "이름",
        Price: "가격",
        Available: "가능",
        Type: "종류",
        Condition: "상태",
        NSFW: "19+ (성인 콘텐츠)",
        Select: "Select", //not translated
        Social: "Social", //not translated
        Theme: "Theme", //not translated
        Listing: "Listing", //not translated
        Listings: "Listings", //not translated
        ViewPage: "View page", //notTranslated
        Pages: "Pages", //not translated
        Page: "Page", //not translated
        Language: "Language", //not translated
        Reset: "Reset", //not translated
        Local: "지역",
        Domestic: "국내",
        Location: "위치",
        International: "국제",
        Time: "시간",
        Free: "무료",
        Category: "항목",
        ProcessingTime: "과정 시간",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "끌기와 업로드 사진",
        ExpirationDate: "종료",
        UploadCoverPhoto: "표지 사진 업로드",
        ShortDescription: "짧은 설명",
        UpTo140Characters: "140 성격 만큼",
        PrimaryColor: "중심색",
        SecondaryColor: "2째색",
        TextColor: "문자색",
        CoverPhotoButton: "표지 사진 선택",
        AboutPlaceholder: "큰 설명",
        BackgroundColor: "배경색",
        NotificationFollow: "너를 팔로우하다",
        NoNotifications: "공지 없어",
        WelcomeToYourPage: "환영해 너의 페이지!",
        SearchForCategory: "항목 검색",
        Moderators: "중재인",
        CurrentModerators: "현재 중재인",
        AddModerators: "추가 중재인",
        DeselectToRemoveModerator: "중재인 선택 취소",
        SelectToAddModerator: "추가 중재인 선택",
        Categories: "항목",
        UpTo3: "3 만큼",
        AboutYourStore: "너의 가계 설명",
        PaymentType: "지불 종료",
        ShipTo: "배송지",
        FreeShipping: "무료배송",
        OrderDetails: "상세 주문내역",
        OrderSummary: "주문 요약",
        AllListings: "모든 제품",
        ComingSoon: "곧온다",
        PaymentPending: "지불 보류 중",
        FinalizePurchase: "지불 완료",
        LoadingImage: "사진 로딩 증...",
        UploadAvatar: "업로드 화신",
        SaveAvatar: "정장 화신",
        NewAvatar: "새로운 화신 선택",
        NewCoverImage: "새로운 표지사진 선택",
        Loading: "Loading...", // not translated
        Purchases: "Purchases", // not translated
        Sales: "Sales", // not translated
        Cases: "Cases", // not translated
        Enter: "Enter", //notTranslated
        Discover: "Discover", // not translated
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "Blocked", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Visibility: "Visibility", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        DomesticShippingTime: "Domestic Shipping Time", // not translated
        InternationalShippingTime: "International Shipping Time", // not translated
        DisplayNSFWcontent: "Display NSFW content?", // not translated
        Basic: "Basic", // not translated
        Content: "Content", // not translated
        StandardThemes: "Standard themes", // not translated
        NoPhotosAdded: "No Photos Added", // not translated
        Summary: "Summary", // not translated
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "Quantity", //not translated
        ShippingTo: "Shipping To", //not translated
        ModeratedBy: "Moderated by", //not translated
        Submit: "Submit", //not translated
        maxLength20: "maximum length 20 characters", //not translated
        maxLength80: "maximum length 80 characters", //not translated
        maxLength200: "maximum length 200 characters", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "Sold By", // not translated
          PurchasedBy: "Purchased By", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Paid (Funds Waiting)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Paid (Funds Waiting)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "데이타를 저장할수 없다.",
          getError: "데이타를 검색할수 없다.",
          missingError: "일부 필드가 사라지거나 틀려졌습니다.",
          serverError: "잘못된 응답은 서버에서 수신되었습니다.",
          userError: "이 ID에 대한 정보를 찾을 수 없습니다.",
          userNotFoundError: "이 사람의 정보를 사용할 수 없습니다. 그들은 오프라인이있습니다.",
          notFoundError: "데이터를 로딩 할 수 없습니다:",
          socketError: "웹 소켓의 URL에 실패했습니다.ws://localhost:18466 의 기본 주소와 소켓에 연결.",
          contractError: "이 제품은 지불 할수 없습니다 ",
          sellerError: "판매자의 서버는 구매 요청을 거부했습니다.",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "저장하다",
          SaveSuccess: "변경 사항 저장하다."
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "모든종류",
          pagesStores: "가게",
          pagesMods: "중재인 서비스",
          pagesBasic: "기본 사용자",
          listingsCurated: "나의 팔로우 가게",
          listingsAll: "모든 가게"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "내 페이지",
          customizePage:"사용자 페이지",
          sellItem:"새로운",
          createListing:"새로운 제품",
          purchases:"주문 사항",
          sales:"팔다",
          cases:"사례",
          notifications:"공지",
          settings:"설정",
          about:"오픈바자 정보",
          support:"오픈바자 지원"
        },
        onboarding: {
          intro: "오픈바자 구서",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "", //notTranslated          
          theme: "내 페이지 테마 선택",
          chooseLanguage: "언어 선택",
          contributors: "%{smart_count} Contributor |||| %{smart_count} Contributors", // not sure if I can change this..
          configure: "당신의 경험을 구성",
          disclaimer_title: "경고",
          disclaimer_body: "오픈바자 is a network for trading goods and services directly between people - using Bitcoin - without any central organization controlling the platform. This means you are responsible for your own activity on the network.\n\n오픈바자 users are not anonymous by default. Most communications between parties are encrypted, but IP addresses are public and can be associated with activity on the network. Malicious parties could use this information against you; protecting your privacy is your own responsibility.\n\n오픈바자 users must adhere to the laws in their own legal jurisdiction as well as their conscience. The 오픈바자 developers do not condone - and are not responsible for - any use of the platform for illegal activity.\n\nThe OpenBazaar community of developers has worked hard to deliver a free platform for trade to the world. But as with any software, bugs will be found. The developers are not responsible for any monetary loss associated with problems in the software.\n\nBy using 오픈바자 you're responsible for your own actions on the 오픈바자 network.", // leaving legalese alone, just changed the name OpenBazaar to ko
          yourCountry: "나라 선택",
          localCurrency: "선택 통화",
          LanguagePlaceholder: "언어 검색",
          CountryPlaceholder: "나라 검색",
          CurrencyPlaceholder: "통화 검색",
          TimezonePlaceholder: "시간대 검색",
          ShortDescriptionPlaceholder: "뭔가 흥미로운걸 말하다... (160 성격)",
          timeZone: "시간대 선택",
          yourDetails: "너의 정보 설정",
          yourDescription: "설명", // noTranslated
          handle: "핸들",
          chooseHandle: "Choose a handle", // not translated
          knownAs: "당신은 현재 알려져있어:",
          wouldYou: "당신은 기억하기 쉬운 핸들은 등록하겠습니까?",
          registerNew: "새로운 등록",
          recommended: "추천 페이지 팔로우",
          connectExisting: "기존 연결",
          avatar: "화신 설정",
          chooseAvatar: "화신 선택",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        buyFlow: {
          DirectPayment: "Direct Payment", //notTranslated
          SendDirectlyTo: "Send direct payment to %{handle}", //notTranslated
          MustAddAddress: "당신 에게 제공할수 있는 배송지 주소를 추가",
          VendorShipsTo: "공급업체 다른나라로 배송",
          DoesNotShipHere: "이업체는 여기에 배송되지 않습니다 ",
          Send: "보내다",
          BTCto: "비트코인 에게",
          SendBTCtoAddress: "Send %{amount} BTC to", //notTranslated
          OpenAddress: "비트코인 주소로 지역 지갑 열리다",
          CopyAddress: "클립보드에 비트코인 주소 복사",
          RefreshPayment: "지불 방법 새로 고침 ",
          summaryMsg1: "당신의 지불 보내졌다 %{recipient}", //notTranslated
          summaryMsg2: "이주문에 대한 예상 처리 시간",
          summaryMsg3: "당신은 당신의 주문상태를 확인할수 있다",
          purchasesPage: "지불 페이지", //notTranslated
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          directPaymentTo: "Direct Payment to", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }        
      },
      {
        langName: "日本語 (Japanese)",
        langCode: "ja-JP",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "次へ",
        IAgree: "同意する",
        Back: "戻る",
        EnterMessage: "本文",
        Reload: "リロード",
        You: "アカウント",
        Skip: "スキップ",
        Done: "完了",
        Cancel: "キャンセル",
        Maximize: "Maximize", //notTranslated
        Close: "閉じる",
        Yes: "はい",
        No: "いいえ",
        of: "／",
        Sell: "売る",
        New: "新品",
        Excellent: "極良質",
        Good: "良質",
        Poor: "まあまあ良い",
        SKU: "SKU",
        Refurbished: "整備済製品", // check
        Physical: "商品", // check
        Digital: "デジタル製品", //check
        Service: "サービス", // check
        Visit: "ページへ",
        Item: "商品",
        Items: "商品",
        Stores: "ストア",
        Follow: "フォロー",
        Feed: "フィード",
        FeedPlaceholder: "A feed of updates from all of the pages you follow",
        ViewListing: "View Listing", //notTranslated
        Unfollow: "フォローをやめる",
        About: "プロフェール",
        NoDescriptionAdded: "説明はありません",
        CoverPhoto: "カバー写真",
        AboutEmpty: "自己紹介はありません",
        Followers: "フォロワー",
        Following: "フォロー",
        Message: "メッセージを送る",
        Messages: "メッセージ",
        Store: "ストア",
        Edit: "編集",
        Used: "中古",
        Delete: "削除",
        DontDelete: "削除しない",
        ConfirmDelete: "削除する",
        Website: "ウェブサイト",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "こんにちは",
        CreateStore: "出品する",
        GoToMyPage: "マイページ",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "商品名・キーワードで探す",
        SearchFeedPlaceholder: "GUID・ユーザ名で探す",
        SearchForFollowersPlaceholder: "GUID・ユーザ名で探す",
        SearchForUsersPlaceholder: "GUID・ユーザ名で探す",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3〜5営業日以内",
        EstDeliveryInternationalPlaceholder: "7〜15営業日以内",
        OrderProcessingTimePlaceholder: "Enter time needed to process order",
        TermsAndConditionsPlaceholder: "利用規約を入力",
        TitlePlaceholder: "タイトルを入力",
        DescriptionPlaceholder: "説明を入力",
        ReturnPolicyPlaceholder: "返品ポリシーを入力",
        CategoryPlaceholder: "カテゴリーを入力",
        CategoryHelperText: "Categories are used to group and organize items within your store.",
        KeywordsHelperText: "Adding tags helps your listing to be discovered in the market.", //notTranslated
        ExpirationDateHelperText: "Set a date for the item to automatically be pulled from your store.",
        ClearExpirationDate: "終了日時を消す",
        ReturnPolicy: "返品ポリシー",
        TermsAndConditions: "利用規約",
        Photos: "写真",
        Added: "出品日時",
        Categorization: "カテゴリー",
        Expiration: "終了日時",
        Search: "検索",
        Email: "メールアドレス",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGPキー",
        Snapchat: "Snapchat",
        BUYNOW: "今すぐ購入する",
        Description: "商品の説明",
        Reviews: "レビュー",
        Shipping: "発送",
        Addresses: "住所",
        NewAddress: "新しいお届け先住所",
        CurrentAddress: "現在のお届け先住所",
        Returns: "返品",
        ReturnsPolicy: "返品ポリシー",
        Ampersand: "・",
        Tags: "Tags", //notTranslated
        Keywords: "キーワード",
        ShipsFrom: "発送元",
        ShipsTo: "配送可能エリア",
        Optional: "任意",
        Customize: "カスタマイズ",
        Save: "保存",
        Changes: "変更",
        SaveChanges: "変更を保存",
        YourName: "氏名",
        BitcoinReturnAddress: "返品用ビットコインアドレス",
        BitcoinReturnAddressPlaceholder: "返品用ビットコインアドレス",
        BitcoinReturnAddressInfo: "In case of a refund, your funds will be issued to the following address.",
        LocalCurrency: "現地通貨",
        TimeZone: "タイムゾーン",
        ShipToName: "氏名",
        ShipToStreet: "町名・番地・建物名",
        ShipToCity: "市区郡",
        ShipToState: "都道府県",
        ShipToPostalCode: "郵便番号",
        PostalCode: "郵便番号",
        ShipToCountry: "国",
        EnableNotifications: "通知を有効にする",
        EnableSSL: "SSLを使用する",
        LibbitcoinServerAddress: "Libbitcoinサーバーアドレス",
        ServerIPPort: "サーバーIP:ポート",
        All: "すべて",
        Name: "氏名",
        Price: "価格",
        Available: "在庫あり",
        Type: "種類",
        Condition: "品質状態",
        NSFW: "18+ (アダルト)",
        Select: "選択する",
        Social: "ソーシャル",
        Theme: "テーマ",
        Listing: "出品",
        Listings: "出品",
        ViewPage: "View page", //notTranslated
        Pages: "ページ",
        Page: "ページ",
        Language: "言語",
        Reset: "リセット",
        Local: "ローカル",
        Domestic: "国内",
        Location: "住所",
        International: "国際",
        Time: "日時",
        Free: "無料",
        Category: "カテゴリー",
        ProcessingTime: "発送までの日数",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "ドラッグ＆ドロップ・写真をアプロード",
        ExpirationDate: "終了日時",
        UploadCoverPhoto: "カバー写真をアップロード",
        ShortDescription: "商品紹介",
        UpTo140Characters: "140文字まで",
        PrimaryColor: "メインカラー",
        SecondaryColor: "サブカラー",
        TextColor: "文字カラー",
        CoverPhotoButton: "カバー写真選択",
        AboutPlaceholder: "商品の説明",
        BackgroundColor: "背景カラー",
        NotificationFollow: "があなたをフォローしました",
        NoNotifications: "新しい通知はありません。",
        WelcomeToYourPage: "マイページにようこそ！",
        SearchForCategory: "カテゴリーで検索する",
        Moderators: "仲介者",
        CurrentModerators: "現仲介者",
        AddModerators: "仲介者を追加",
        DeselectToRemoveModerator: "仲介者を削除したい場合、チェックを外してください。",
        SelectToAddModerator: "追加したい仲介者を選択",
        Categories: "カテゴリー",
        UpTo3: "３まで",
        AboutYourStore: "マイストア説明",
        PaymentType: "支払い方法",
        ShipTo: "お届け先",
        FreeShipping: "送料無料",
        OrderDetails: "注文の詳細",
        OrderSummary: "注文の確認",
        AllListings: "すべての出品",
        ComingSoon: "作成中",
        PaymentPending: "未払い",
        FinalizePurchase: "購入を完了",
        LoadingImage: "画像を読み込み中・・・",
        UploadAvatar: "画像をアップロード",
        SaveAvatar: "画像を保存",
        NewAvatar: "新しい画像を選択", //check
        NewCoverImage: "カバー写真を選択", // check
        Loading: "読み込み中・・・", //
        Purchases: "購入済み",
        Sales: "販売履歴",
        Cases: "事例",
        Enter: "Enter", //notTranslated
        Discover: "ピックアップ",
        Block: "Block", //notTranslated
        Unblock: "Unblock", //notTranslated        
        Blocked: "ブロック",
        Advanced: "詳細設定",
        General: "一般設定",
        AllItems: "すべて",
        DomesticShippingPrice: "国内配送料",
        InternationalShippingPrice: "国際配送料",
        MinimumIs: "最小", // is this used?
        Visibility: "表示",
        Title: "タイトル",
        DigitalItem: "デジタル製品",
        PhysicalItem: "品物", // check
        DomesticShippingTime: "国内配達日数",
        InternationalShippingTime: "国際配達日数",
        DisplayNSFWcontent: "アダルトコンテンツを表示しますか？",
        Basic: "ベーシック",
        Content: "コンテンツ設定",
        StandardThemes: "基本テーマ",
        NoPhotosAdded: "写真はありません",
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        Forward: "Forward", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        Moderator: "Moderator", // not translated
        HandleResolver: "Handle Resolver",  // not translated
        moderatorSettings: { // not translated
          ProvideResolution: "Provide dispute resolution", // not translated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Percentage of transaction price (max 25)" // not translated
        },
        transactions: {
          SoldBy: "出品者",
          PurchasedBy: "購入者",
          searchByOrder: "注文ID・商品名で探す",
          sortByStatusAll: "すべて",
          sortByStatus0: "購入済み",
          sortByStatus1: "支払い済み (お支払い確認中)",
          sortByStatus2: "確認完了・出荷済",
          sortByStatus3: "Completed (Funds Released)",
          sortByStatus4: "異議申立て",
          OrderID: "注文ID",
          OrderDate: "注文日時",
          OrderStatus: "注文ステータス",
          OrderStatus0: "ご注文受付中 (未払い)",
          OrderStatus1: "支払い済み (お支払い確認中)",
          OrderStatus2: "確認完了・出荷済",
          OrderStatus3: "Completed (Funds Released)",
          OrderStatus4: "異議・クレーム",
          OrderTotal: "注文合計",
          OrderTotalInBTC: "BTC Total", // not translated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ConfirmOrder: "Confirm this Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address you will receive payment at", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link, if any", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          transferReceipt: "transferReceipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          Description: "Description", // not translated
          DeliveryTime: "DeliveryTime", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoneSent: "None sent" // not translated
        },
        errorMessages: {
          saveError: "データの保存はできませんでした。",
          getError: "Data could not be retrieved.",
          missingError: "必修入力項目が正しくありません",
          serverError: "An incorrect reply was received from the server.",
          userError: "このIDの情報が見つかりませんでした",
          userNotFoundError: "ユーザ情報が見つかりませんでした。このユーザーは、オフラインの可能性があります。",
          notFoundError: "データは見つかりませんでした:",
          socketError: "URL for WebSocket failed. Connecting to socket with default address of ws://localhost:18466",
          contractError: "購入が完了できませんでした。",
          sellerError: "出品者のサーバーは購入要求を拒否しました。",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid",
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID"//notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>", //notTranslated
        },
        saveMessages: {
          Saved: "保存しました",
          SaveSuccess: "変更の保存をしました。"
        },
        discover: {
          searchDefaultText: "Scanning your network", //notTranslated
          searchingText: "Scanning your network for", //notTranslated
          noResults: "No listings found in your network tagged with" //notTranslated
        },
        filters: {
          pagesAllTypes: "すべて",
          pagesStores: "ストア",
          pagesMods: "仲介者のサービス",
          pagesBasic: "正規のユーザ",
          listingsCurated: "フォローしているストア",
          listingsAll: "すべてのストア",
          categoryAll: "すべて"
        },
        nav: {
          searchPlaceholder: "Type a @handle, GUID or #tag...", //notTranslated
          myPage: "マイページ",
          customizePage:"ページをカスタマイズ",
          sellItem:"出品する",
          createListing:"新しい商品を出品する",
          purchases:"購入済み",
          sales:"売り上げ",
          cases:"事例",
          notifications:"通知",
          settings:"設定",
          about:"OpenBazaarについて",
          support:"OpenBazaarをサポートする"
        },
        onboarding: {
          intro: "OpenBazaarの設定",
          theme: "マイページのテーマを選択",
          chooseLanguage: "言語",
          contributors: "投稿者: %{smart_count}人 |||| 投稿者: %{smart_count}人",
          configure: "ユーザーエクスペリエンスの構成",
          disclaimer_title: "担保文言",
          disclaimer_body: "OpenBazaarは、ビットコインを使用して、直接任意の中央機関の制御なしに商品やサービスを売買するためのネットワークです。ユーザーは、ネットワーク上の自分の活動に責任があります。\n\nOpenBazaarユーザーは、デフォルトでは匿名ではありません。当事者間のほとんどの通信は暗号化されていますが、IPアドレスは公開され、ネットワーク上のアクティビティに関連付けることができます。\n\n悪意のある当事者は、あなたに対して、この情報を使用することができます。あなたのプライバシーを保護することはあなた自身の責任です。\n\nOpenBazaarユーザーは自分の法的管轄区域の法律、また、自分の良心に従っている必要があります。OpenBazaarの開発者は、容認または違法行為のために、このプラットフォームのいずれかの使用については責任を負いません。\n\n開発者のOpenBazaarコミュニティは、世界の貿易のための無料のプラットフォームを提供するために懸命に働きました。しかし、他のソフトウェアと同様、バグが発見されます。開発者は、ソフトウェアでの問題に関連したいかなる金銭的損害について責任を負いません。\n\nOpenBazaarを使用することで、OpenBazaarネットワーク上の自分自身の行動に責任です。", // terrible. fix later.",
          yourCountry: "国を選択",
          localCurrency: "通貨を選択",
          LanguagePlaceholder: "言語を探す [例:日本語、English]",
          CountryPlaceholder: "国を探す [例:日本、United States]",
          CurrencyPlaceholder: "通貨を探す [例:Bitcoin、Yen]",
          TimezonePlaceholder: "タイムゾーンを探す [例:Tokyo、Pacific]",
          ShortDescriptionPlaceholder: "自己紹介をして下さい (160文字まで)",
          timeZone: "タイムゾーンを選択",
          yourDetails: "あなたの情報を入力してください",
          yourDescription: "自己紹介",
          handle: "ユーザ名",
          chooseHandle: "ユーザ名を選択",
          knownAs: "現在のユーザ名:",
          wouldYou: "ユーザ名を登録しますか?",
          registerNew: "登録する",
          recommended: "おすすめのページ",
          connectExisting: "既存サーバーに接続する",
          avatar: "プロフィール画像",
          chooseAvatar: "プロフィール画像を選択",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "完了"
        },
        buyFlow: {
          DirectPayment: "直接購入",
          SendDirectlyTo: "%{handle}に直接購入する",
          MustAddAddress: "お届け先住所を入力してください。",
          VendorShipsTo: "配達可能エリア",
          DoesNotShipHere: "配達不能",
          Send: "送る",
          BTCto: "BTC to",
          SendBTCtoAddress: "以下のアドレスに %{amount} BTC を送ってください",
          OpenAddress: "ウォレットで開く",
          CopyAddress: "アドレスをコピーする",
          RefreshPayment: "支払いステータスを更新する",
          summaryMsg1: "%{recipient}に直接購入しました。",
          summaryMsg2: "The expected processing time for this order is",
          summaryMsg3: "ご注文の状況はこちらで確認ができます",
          purchasesPage: "購入済み",
          returnAddress: "返品用アドレス",
          moderatorPaymentDisclaimer: "Only applies if the transaction ends in a dispute.",
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible",
          directPaymentTo: "%{handle}に直接購入",
          paymentSent: "送金しました！",
          total: "注文合計"
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        }       
      },
      {
        langName: "Polski",
        langCode: "pl",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Dalej",
        IAgree: "Zgadzam się",
        Back: "Wróć",
        EnterMessage: "Wprowadź tekst...",
        Reload: "Odśwież",
        You: "Ja",
        Skip: "Pomiń",
        Done: "Gotowe",
        Navigation: "Nawigacja", 
        Cancel: "Anuluj",
        ClosingOpenBazaar: "Ciekawostka: twoja strona jest online, póki nie zamkniesz programu.", 
        Minimize: "Zminimalizuj",
        Maximize: "Zmaksymalizuj",
        Close: "Zamknij",
        Yes: "Tak",
        No: "Nie",
        of: "of",//No Polish Equivalent
        Sell: "Sprzedaj",
        New: "Nowy",
        Excellent: "Doskonały",
        Good: "W dobrym stanie",
        Poor: "W złym stanie",
        SKU: "Na stanie",
        Refurbished: "Odnowiony",
        Physical: "Fizyczny",
        Digital: "Cyfrowy",
        Service: "Usługa",
        Visit: "Zobacz",
        Item: "Przedmiot",
        Items: "Przedmioty",
        Stores: "Sklepy",
        Follow: "Obserwuj",
        Feed: "Kanał",
        FeedPlaceholder: "Kanał aktualizacji ze stron, które obserwujesz",
        Unfollow: "Przestań obserwować",
        About: "O programie",
        NoDescriptionAdded: "Brak opisu",
        NoListings: "Brak pozycji",
        CoverPhoto: "Tło",
        AboutEmpty: "Pusto...",
        Followers: "Obserwujący",
        Following: "Obserwowani",
        Message: "Wiadomość",
        Messages: "Wiadomości",
        Store: "Sklep",
        Edit: "Edytuj",
        Used: "Użyte",
        Delete: "Usuń",
        DontDelete: "Nie usuwaj",
        ConfirmDelete: "Potwierdź usunięcie",
        Website: "Strona",
        Guid: "OpenBazaar ID (GUID)",
        Welcome: "Witaj",
        CreateStore: "Utwórz sklep",
        GoToMyPage: "Mój profil",
        SearchForItemsPlaceholder: "Wprowadź słowo kluczowe...",
        SearchForPagesPlaceholder: "Szukaj po nazwie lub słowie kluczowym",
        SearchFeedPlaceholder: "Wprowadź słowo kluczowe...",
        SearchForFollowersPlaceholder: "Wprowadź imię...",
        SearchForUsersPlaceholder: "Wprowadź imię...",
        SearchOnUserStorePlaceholder: "Wpisz tytuł lub #tag",
        SearchOnUserStorePlaceholder: "Type a title...", //notTranslated
        EstDeliveryDomesticPlaceholder: "3-5 dni roboczych",
        EstDeliveryInternationalPlaceholder: "7-15 dni roboczych",
        OrderProcessingTimePlaceholder: "Wprowadź czas realizacji zamówienia",
        TermsAndConditionsPlaceholder: "Wprowadź regulamin...",
        TitlePlaceholder: "Wprowadź tytuł",
        DescriptionPlaceholder: "Wprowadź opis...",
        ReturnPolicyPlaceholder: "Wprowadź zasady dokonywania zwrotów...",
        CategoryPlaceholder: "Wprowadź kategorię",
        CategoryHelperText: "Kategorie służą grupowaniu i organizowaniu przedmiotów w twoim sklepie.",
        KeywordsHelperText: "Dzięki słowom kluczowym twój przedmiot może zostać odkryty w markecie przez innych użytkowników.",
        ExpirationDateHelperText: "Ustaw datę wygaśnięcia pozycji z twojego sklepu.",
        ClearExpirationDate: "Wyczyść datę wygaśnięcia",
        ReturnPolicy: "Zasady dokonywania zwrotów",
        TermsAndConditions: "Regulamin",
        Photos: "Zdjęcia",
        Added: "Dodane",
        Categorization: "Categorization",
        Expiration: "Expiration",
        Search: "Wyszukaj",
        Email: "E-mail",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "Klucz PGP",
        Snapchat: "Snapchat",
        BUYNOW: "Kup teraz",
        Description: "Opis",
        Reviews: "Opinie",
        Shipping: "Wysyłka",
        Addresses: "Adresy",
        NewAddress: "Nowy adres",
        CurrentAddress: "Bieżący adres",
        Returns: "Zwroty",
        ReturnsPolicy: "Zasady dokonywania zwrotów",
        Ampersand: "&",
        Tags: "Tagi",
        Keywords: "Słowa kluczowe",
        ShipsFrom: "Wysyłka z",
        ShipsTo: "Wysyłka do",
        Optional: "Opcjonalne",
        Customize: "Dostosuj",
        Save: "Zapisz",
        Changes: "Zmiany",
        SaveChanges: "Zapisz wprowadzone zmiany",
        YourName: "Twoje imię",
        BitcoinReturnAddress: "Adres zwrotów BTC",
        BitcoinReturnAddressPlaceholder: "Wprowadź adres BTC...",
        BitcoinReturnAddressInfo: "W przypadku zwrotów środki będą zwracane na ten adres.",
        LocalCurrency: "Lokalna waluta",
        TimeZone: "Strefa czasowa",
        ShipToName: "Name",
        ShipToStreet: "Ulica",
        ShipToCity: "Miasto",
        ShipToState: "Województwo",
        ShipToPostalCode: "Kod pocztowy",
        PostalCode: "Kod pocztowy",
        ShipToCountry: "Kraj",
        EnableNotifications: "Włącz powiadomienia",
        EnableSSL: "Włącz SSL",
        LibbitcoinServerAddress: "Adres serwera Libbitcoin",
        ServerIPPort: "IP:port serwera",
        All: "Wszystko",
        Name: "Nazwa",
        Price: "Cena",
        Available: "Dostępne",
        Type: "Typ",
        Condition: "Stan",
        NSFW: "18+ (treści dla dorosłych)",
        Select: "Wybierz",
        Social: "Społecznościowy",
        Theme: "Motyw",
        Listing: "Pozycja",
        Listings: "Pozycje",
        ViewPage: "View page", //notTranslated
        Pages: "Strony",
        Page: "Strona",
        Language: "Język",
        Reset: "Reset",
        Local: "Lokalny",
        Domestic: "Krajowy",
        Location: "Lokalizacja",
        International: "Międzynarodowy",
        Time: "Czas",
        Free: "Darmowe",
        Category: "Kategoria",
        ProcessingTime: "Czas realizacji",
        SelectPhotos: "Select photos", //notTranslated
        DragOrUploadPhotos: "Przenieś i upuść lub wgraj zdjęcia",
        ExpirationDate: "Wygasa dnia",
        UploadCoverPhoto: "Wgraj tło",
        ShortDescription: "Krótki opis",
        UpTo140Characters: "Maksymalnie 140 znaków",
        PrimaryColor: "Kolor główny",
        SecondaryColor: "Kolor drugorzędny",
        TextColor: "Kolor tekstu",
        CoverPhotoButton: "Wybierz tło",
        AboutPlaceholder: "Pełny opis",
        BackgroundColor: "Kolor tła",
        NotificationFollow: "zaczął cię obserować!",
        NoNotifications: "Brak powiadomień",
        WelcomeToYourPage: "Witaj na swojej stronie!",
        SearchForCategory: "Szukaj w kategorii",
        Moderators: "Moderatorzy",
        CurrentModerators: "Obecni moderatorzy",
        AddModerators: "Dodaj nowych moderatorów",
        DeselectToRemoveModerator: "Odznacz moderatorów, których chcesz usunąć",
        SelectToAddModerator: "Zaznacz moderatorów, których chcesz dodać",
        Categories: "Kategorie",
        UpTo3: "Maksymalnie 3",
        AboutYourStore: "Opis twojego sklepu",
        PaymentType: "Metoda płatności",
        ShipTo: "Wysyłka do",
        FreeShipping: "Darmowa wysyłka",
        OrderDetails: "Szczegóły zamówienia",
        OrderSummary: "Podsumowanie zamówienia",
        AllListings: "Wszystkie artykuły",
        ComingSoon: "Wkrótce",
        PaymentPending: "Płatność w toku",
        FinalizePurchase: "Sfinalizuj transakcję",
        LoadingImage: "Ładuję zdjęcie...",
        UploadAvatar: "Wybierz avatar",
        SaveAvatar: "Zapisz avatar",
        NewAvatar: "Wybierz nowy avatar",
        NewCoverImage: "Wybierz nowe tło",
        Loading: "Ładowanie...",
        Purchases: "Kupione",
        Sales: "Sprzedane",
        Cases: "Sprawy",
        Enter: "Wprowadź",
        Discover: "Odkryj",
        Block: "Block",//notTranslated
        Unblock: "Unblock",//notTranslated
        Blocked: "Zablokowani",
        Advanced: "Zaawansowane",
        General: "Ogólne",
        AllItems: "Wszystkie przedmioty",
        DomesticShippingPrice: "Koszt wysyłki krajowej",
        InternationalShippingPrice: "Koszt wysyłki międzynarodowej",
        MinimumIs: "Minimum to",
        Visibility: "Widoczność",
        Title: "Tytuł",
        DigitalItem: "Przedmiot cyfrowy",
        PhysicalItem: "Przedmiot fizyczny",
        DomesticShippingTime: "Termin wysyłki krajowej",
        InternationalShippingTime: "Termin wysyłki międzynarodowej",
        DisplayNSFWcontent: "Pokaż treści NSFW?",
        Basic: "Basic",//nottranslated
        Content: "Zawartość",
        StandardThemes: "Standardowe motywy",
        NoPhotosAdded: "Brak zdjęć",
        Summary: "Podsumowanie",
        Funds: "Środki",
        Discussion: "Dyskusja",
        Quantity: "Ilość",
        ShippingTo: "Wysyłka do",
        ModeratedBy: "Nadzorowany przez",
        Submit: "Wyślij",
        maxLength20: "maksymalnie 20 znaków",
        maxLength80: "maksymalnie 80 znaków",
        maxLength200: "maksymalnie 200 znaków",
        StoreModeratorsOptional: "Moderatorzy sklepu (opcjonalne)",
        Searchformoderators: "Szukaj moderatorów",
        Contributors: "Kontrybutorzy",
        Support: "Pomoc",
        Licensing: "Licencja",
        Forward: "Dalej",
        On: "Włączony",
        Off: "Wyłączony",
        ClickToChange: "Kliknij, by zmienić",
        NotProvided: "niezapewniane",
        NotFollowingAnyone: "Brak obserwowanych",
        NoFollowers: "Brak obserwujących",
        Moderator: "Moderator",//notTranslated
        moderatorSettings: {
          ProvideResolution: "Provide dispute resolution",//notTranslated
          ServiceFee: "Service fee",//notTranslated
          ServiceFeeNote: "Percentage of transaction price (max 25)"//notTranslated
        },
        BecomeModerator: "Become a moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          SoldBy: "Sprzedawca",
          PurchasedBy: "Nabywca",
          searchByOrder: "Szukaj po ID lub nazwie przedmiotu",
          sortByStatusAll: "Wszystko",
          sortByStatus0: "Kupione",
          sortByStatus1: "Zapłacone (w trakcie realizacji)",
          sortByStatus2: "Potwierdzone/Wysłane",
          sortByStatus3: "Zakończone (opłacone)",
          sortByStatus4: "W trakcie sporu",
          OrderID: "Numer zamówienia",
          OrderDate: "Data zamówienia",
          OrderStatus: "Status zamówienia",
          OrderStatus0: "Kupione (nieopłacone)",
          OrderStatus1: "Zapłacone (w trakcie realizacji)",
          OrderStatus2: "Potwierdzone/Wysłane",
          OrderStatus3: "Zakończone (opłacone)",
          OrderStatus4: "W trakcie sporu",
          OrderTotal: "Do zapłaty",
          OrderTotalInBTC: "Łącznie (BTC)",
          PaymentProtection: "Ubezpieczenie płatności",
          ShipTo: "Wysyłka do",
          ConfirmOrder: "Potwierdź to zamówienie",
          ReceivingAddress: "Adres odbiorczy",
          RecievingAddressPlaceholder: "Adres portfela, na którzy otrzymasz płatność",
          Shipper: "Wysłane przez",
          ShipperPlaceholder: "Firma przesyłkowa",
          TrackingNumber: "Numer śledzenia",
          TrackingNumberPlaceholder: "Numer śledzenia przesyłki",
          EstimatedDelivery: "Przybliżona wysyłka",
          EstimatedDeliveryPlaceholder: "Przybliżony czas dostarczenia",
          URL: "URL",
          URLPlaceholder: "Link do pobrania, harmonogramu lub innych informacji",
          Password: "Hasło",
          PasswordPlaceholder: "Hasło zabezpieczające link (opcjonalne)",
          DirectTransaction: "Transakcja bez pośredników",
          ModeratedTransaction: "Transakcja nadzorowana",
          Seller: "Sprzedawca",
          Buyer: "Kupujący",
          transferReceipt: "Dowód transakcji",
          copyTxid: "Kopiuj numer transakcji",
          Close: "Zamknij",
          FundOrder: "Zapłać",
          sortByDateNewest: "Od najnowszych",
          sortByDateOldest: "Od najstarszych",
          PayPurchase: "Zapłać",
          CompleteOrder: "Sfinalizuj zamówienie",
          RateThisTransaction: "Oceń transakcję",
          TransactionReview: "Opinia o transakcji",
          OverallRating: "Średnia ocen",
          Quality: "Jakość",
          Description: "Opis",
          DeliveryTime: "Czas dostawy",
          CustomerService: "Obsługa klienta",
          Review: "Oceń",
          ReviewPlaceHolder: "Twoja opinia o tej transakcji",
          NoneSent: "Brak informacji"
        },
        errorMessages: {
          saveError: "Nie można zapisać zmian.",
          getError: "Nie można wczytać danych.",
          missingError: "Wypełnij poprawnie pola.",
          serverError: "Nieprawidłowa odpowiedź serwera.",
          userError: "Brak danych dla tego ID",
          userNotFoundError: "Dane tej osoby są obecnie niedostępne. Możliwe, że jest offline.",
          notFoundError: "Nie można załadować danych dla:",
          socketError: "URL dla WebSocket nieprawidłowy. Łączę z domyślnym adresem ws://localhost:18466",
          contractError: "Nie można kupić tego przedmiotu",
          sellerError: "Serwer sprzedawcy odrzucił płatność",
          checkPurchaseData: "Upewnij się, że wprowadziłeś poprawne dane. Sprawdź stan konta oraz adresu zwrotów.",
          pageUnavailable: "This page is currently unavailable."  //notTranslated
        },
        aboutSection: {
          about: "<p>OpenBazaar to sieć osób, które kupują i sprzedają dobra oraz usługi bez pośredników, przy użyciu Bitcoina. Sieć ta jest zdecentralizowana i nie podlega żadnej organizacji.</p><p>Oprogramowanie jest otwarte, udostępniane na licencji MIT. Kod dostępny jest na <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">Githubie</a>.</p><p>OpenBazaar jest projektem społeczośniowym i zachęcamy do wejścia na nasz kanał <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">Slack</a> lub odwiedzenia naszego <a href=\"http://www.reddit.com/r/openbazaar\" target=\"_blank\">subreddita</a>.</p><p>Jeśli potrzebujesz pomocy, przeczytaj <a href=\"\" target=\"_blank\">poradnik</a> do OpenBazaar w wersji 1.0.</p><p>Jeśli nadaj masz jakieś pytania, kliknij <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\" target=\"_blank\">tutaj</a>.</p>",
          contributors: "<p>OpenBazaar jest rozwijany przez międzynarodową społeczność, złożoną zarówno z deweloperów, jak i wolontariuszy, którzy poświęcają swój czas, by uczynić handel wolnym. Oto niepełna lista osób, które wsparły projekt poprzez pisanie kodu lub inny rodzaj uczestnictwa.</p><ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li><li>Michał Pado</li></ul>", 
          support: "<p>Możesz wesprzeć OpenBazaar na wiele sposobów, by wspomóc nas w naszej misji.</p><p>Kupowanie i sprzedawanie dóbr i usług przyczynia się do powiększenia naszej społeczności, a to z kolei zwiększa atrakcyjność platformy w oczach potencjalnych nowych użytkowników. Uprzejme prośby (kierowane do sprzedawców) o akceptację płatności w Bitcoinie za pośrednictwem naszej platformy pomaga docierać do kolejnych osób i pokazuje, że jest zapotrzebowanie na handel P2P.</p><p>Jeśli jesteś programistą, odwiedź naszego <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">Githuba</a> i zobacz, czy może nie ma czegoś, w czym mógłbyś nam pomóc. Oprócz pomocy z kodem źrodłowym mamy nadzieję, liberalna natura projektu zachęci was do tworzenia nowych usług bazujących na istniejącej sieci.</p><p>Możesz również <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\" target=\"_blank\">wspomóc nas finansowo</a>. Środki zostaną wykorzystane na pokrycie kosztów związanych z konferencjami, programem Bug Bounty oraz promocją //bounties.</p><p><a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">Dołącz do naszego Slacka</a>, jeśli masz jakieś pomysły związane z projektem lub chciałbyś o coś zapytać deweloperów.</p>",
          licensing: "<p>OpenBazaar to otwarte oprogramowanie oparte na licencj MIT. To liberalna licencja, zezwala pozwala na wykorzystanie kodu przy innych otwartych projektach, jak i projektach prawnie zastrzeżonych. Pełna treść licencji dostępna jest pod poniższym linkiem.</p><h4>The MIT License (MIT)</h4><h5>Copyright &#169 2015 OpenBazaar Developers</h5><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p><h4>Libraries</h4><p>The following libraries are used in OpenBazaar:</p><ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>",
        },
        saveMessages: {
          Saved: "Zapisano",
          SaveSuccess: "Zmiany zostały zapisane."
        },
        discover: {
          searchDefaultText: "Przeszukiwanie sieci",
          searchingText: "Przeszukiwanie sieci dla",
          noResults: "Brak pozycji z tagiem"
        },
        filters: {
          pagesAllTypes: "Wszystkie typy",
          pagesStores: "Sklepy",
          pagesMods: "Usługi moderatorów",
          pagesBasic: "Zwykli użytkownicy",
          listingsCurated: "Obserowane sklepy",
          listingsAll: "Wszystkie sklepy",
          categoryAll: "Wszystko"
        },
        nav: {
          searchPlaceholder: "Wprowadź pseudonim lub szukaj",
          myPage: "Moja strona",
          customizePage:"Dostosuj stronę",
          sellItem:"Nowy",
          createListing:"Utwórz pozycję",
          purchases:"Kupione",
          sales:"Sprzedane",
          cases:"Sprawy",
          notifications:"Powiadomienia",
          settings:"Ustawienia",
          about:"O projekcie",
          support:"Wspomóż projekt"
        },
        onboarding: {
          intro: "Konfiguracja OpenBazaar",
          Introduction: "Wprowadzenie",
          IntroductionBody: "OpenBazaar to społecznościowy market P2P. Można powiedzieć, że jesteśmy połączeniem Allegro, Twittera i BitTorrenta. Ponadto nie ma żadnych opłat czy ograniczeń, a projekt jest otwarty źródłowo. \n\n Może ci to wydać odmienne od tego, do czego przywykłeś, dlatego prosimy o cierpliwość podczas zapoznawania się z OpenBazaar.",
          theme: "Wybierz motyw dla swojej strony",
          chooseLanguage: "Wybierz język",
          contributors: "%{smart_count} Kontrybutor |||| %{smart_count} Kontrybutorzy",
          configure: "Konfiguracja",
          disclaimer_title: "Wyłączenie odpowiedzialności",
          disclaimer_body: "OpenBazaar to sieć osób, które kupują i sprzedają dobra oraz usługi bez pośredników, przy użyciu Bitcoina. Sieć ta jest zdecentralizowana i nie podlega żadnej organizacji. Oznacza to, że tylko ty odpowiadasz za swoje działania w sieci. \n\nUżytkownicy OpenBazaar nie są domyślnie anonimowi. Większość komunikacji między stronami jest szyfrowana, lecz adresy IP są publiczne i mogą zostać powiązane z aktywnością w sieci. Złośliwe osoby mogą wykorzystać te informacje je przeciwko tobie. Ochrona własnej prywatności spoczywa na tobie.\n\n \\ Użytkownicy OpenBazaar muszą przestrzegać prawa obowiązującego w ich kraju, jak i prawa moralnego. Twórcy projektu OpenBazaar nie odpowiadają za nielegalne działania użytkowników.\n\nProgramiści OpenBazaar ciężko pracowali, by dostarczyć platformę umożliwiającą handel bez ograniczeń. Jednak, jak w każdym oprogramowaniu, bugi mogą się zdarzyć. Twórcy nie odpowiadają za straty materialne wynikłe z problemów z programem.\n\nJesteś odpowiedzialny za wszelkie swoje działania w OpenBazaar.",
          yourCountry: "Wybierz kraj",
          localCurrency: "Wybierz lokalną walutę",
          LanguagePlaceholder: "Wyszukaj język",
          CountryPlaceholder: "Wyszukaj kraj",
          CurrencyPlaceholder: "Wyszukaj walutę",
          TimezonePlaceholder: "Wyszukaj strefę czasową",
          ShortDescriptionPlaceholder: "Napisz coś o sobie... (do 160 znaków)",
          timeZone: "Wybierz strefę czasową",
          yourDetails: "Informacje o tobie",
          yourDescription: "Opis",
          handle: "Pseudonim",
          chooseHandle: "Wybierz pseudonim",
          knownAs: "Jesteś znany jako:",
          wouldYou: "Chciałbyś zarejestrować łatwy do zapamiętania pseudonim?",
          registerNew: "Zarejestruj nowy",
          recommended: "Proponowane strony do obserowania",
          connectExisting: "Połącz istniejący",
          avatar: "Ustaw avatar",
          chooseAvatar: "Wybierz avatar",
          discoverCallOut: "Odkrywaj produkty i strony na OpenBazaar",
          Finished: "Gotowe"
        },
        buyFlow: {
          DirectPayment: "Płatność bezpośrednia",
          SendDirectlyTo: "Wyślij bezpośrednią płatność do %{handle}",
          MustAddAddress: "Musisz wprowadzić adres wysyłki",
          VendorShipsTo: "Wysyłka do",
          DoesNotShipHere: "Wysyłka niedostępna do",
          Send: "Wyślij",
          BTCto: "BTC do",
          SendBTCtoAddress: "Wyślij %{amount} BTC do",
          OpenAddress: "Otwórz w portfelu lokalnym",
          CopyAddress: "Kopiuj do schowka",
          RefreshPayment: "Odśwież status płatności",
          summaryMsg1: "Płatność została wysłana do %{recipient}",
          summaryMsg2: "Szacowany czas realizacji tego zamówienia to",
          summaryMsg3: "Możesz sprawdzić status swojego zamówienia na",
          purchasesPage: "Kupione",
          returnAddress: "Adres zwrotów",
          moderatorPaymentDisclaimer: "Dotyczy wyłącznie transakcji w sporze.",
          directPaymentDisclaimer: "Korzystaj z płatności bezpośredniej ostrożnie; środki nie są zwracane",
          directPaymentTo: "Płatność bezpośrednia do",
          paymentSent: "Dokonano płatności!",
          total: "Suma"
        }
      }
    ]
  }
});
