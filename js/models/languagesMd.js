var Backbone = require('backbone');

/* use BCP 47 language tags as the key for each language http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry */

module.exports = Backbone.Model.extend({
  defaults: {
    languages: [
      {
        langName: "English",
        langCode: "en-US",
        /* Use capitalized keys for widely reused text that must be capitalized */
        IHaveAWalletNow: "I have a Wallet now",
        Next: "Next",
        IAgree: "I Agree",
        Back: "Back",
        EnterMessage: "Enter message...",
        Recommended: "Recommended",
        Reload: "Reload",
        You: "You",
        Skip: "Skip",
        Done: "Done",
        Status: "Status",
        Navigation: "Navigation",
        Cancel: "Cancel",
        ClosingOpenBazaar: "Close (Your page will go offline)",
        Minimize: "Minimize",
        Maximize: "Maximize",
        Close: "Close",
        Yes: "Yes",
        No: "No",
        of: "of",
        Sell: "Sell",
        New: "New",
        HighlightToStyle: "Highlight text to style",
        Excellent: "Excellent",
        Good: "Good",
        Poor: "Poor",
        StillValidating: "Your handle is still validating",
        CheckStatus: "Check Status",
        ChangeCurrency: "Change currency",
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
        FollowsYou: "Follows You",
        Message: "Message",
        Messages: "Messages",
        Store: "Store",
        Edit: "Edit",
        Clone: "Clone",
        Used: "Used",
        Delete: "Delete",
        DontDelete: "Don't Delete",
        ConfirmDelete: "Confirm Delete",
        Website: "Website",
        Guid: "OpenBazaar ID",
        Welcome: "Welcome",
        CreateStore: "Become a Store",
        GoToMyPage: "My Page",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...",
        SearchForPagesPlaceholder: "Search by name or keyword",
        SearchFeedPlaceholder: "Type a keyword...",
        SearchForFollowersPlaceholder: "Type a name...",
        SearchForUsersPlaceholder: "Type a name...",
        SearchOnUserStorePlaceholder: "Type a title...",
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
        Signature: "PGP Signature",
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key",
        Snapchat: "Snapchat",
        BUYNOW: "Buy Now",
        Description: "Description",
        Reviews: "Reviews",
        Shipping: "Shipping",
        Addresses: "Addresses",
        Files: "Files", //notTranslated
        NewAddress: "New Address",
        CurrentAddress: "Current Addresses",
        Returns: "Returns",
        ReturnsPolicy: "Returns Policy",
        Ampersand: "&",
        Tags: "Tags",
        Keywords: "Keywords",
        ShipsFrom: "Ships From",
        ShipsTo: "Ships To",
        Optional: "Optional",
        Customize: "Customize",
        Save: "Save",
        Change: "Change",
        Changes: "Changes",
        SaveChanges: "Save Changes",
        YourName: "Your name",
        BitcoinReturnAddress: "Enter your Bitcoin Address",
        BitcoinReturnAddressPlaceholder: "Enter Bitcoin address...",
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.",
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
        ViewPage: "View page",
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
        SelectPhotos: "Select photos",
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
        NotificationPaymentSent: "Payment was sent to",
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "is now following you",
        NotificationDispute: "has opened a dispute",
        NotificationDisputeClosed: "this dispute is closed",
        NotificationRefund: "has refunded your order",
        NoticationOrderStatus: "Order status updated, buyer notified",
        NotificationNewOrder: "has made a purchase",
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
        Loading: "Loading...",
        Purchases: "Purchases",
        Sales: "Sales",
        Cases: "Cases",
        Enter: "Enter",
        Discover: "Discover",
        Block: "Block",
        Unblock: "Unblock",
        Blocked: "Blocked",
        NoBlockedList: "You are not currently blocking anyone.",
        Advanced: "Advanced",
        General: "General",
        AllItems: "All Items",
        DomesticShippingPrice: "Domestic Shipping Price",
        InternationalShippingPrice: "International Shipping Price",
        MinimumIs: "Minimum is",
        Title: "Title",
        DigitalItem: "Digital Item",
        PhysicalItem: "Physical Item",
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        maxLength20: "max length 20 char",
        maxLength80: "max length 80 char",
        maxLength200: "max length 200 char",
        StoreModeratorsOptional: "Store Moderators (Optional)",
        Searchformoderators: "Search for moderators",
        Contributors: "Contributors",
        Support: "Support",
        Licensing: "Licensing",
        On: "On",
        Off: "Off",
        ClickToChange: "Click to change",
        NotProvided: "not provided",
        NotFollowingAnyone: "Not following anyone",
        NoFollowers: "No followers",
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator",
        ActiveStore:"Store is Active",
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people",
        Firewall: "Firewall",
        ServerSettings: "Server Settings",
        ReadOnly: "(This Field is Read Only)",
        HandleResolver: "Handle Resolver",
        ShutDownServer: "Shut Down the Server",
        NoFancyStyles: "Disable Visual Effects",
        NoFancyStylesWarning: "This will disable animations and transparencies. It may improve performance on slow systems.",
        LoadingBitcoinPrices: "Loading Bitcoin Prices...",
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list",
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW",
        ShowBlockedUser: "Show this user's page except for NSFW listings",
        ShowNSFWContent: "Show this user's page, and all NSFW listings",
        ServerChangeWarningHeadline: "Caution: Record Your Settings",
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.",
        moderatorSettings: {
          DisputeResolution: "Dispute Resolution",
          ServiceFee: "Service fee",
          ServiceFeeNote: "Min: 0%, Max: 25%"
        },
        BecomeModerator: "Become a Moderator",
        EditModerator: "Moderator Settings",
        transactions: {
          OrderDetails: "Order Details",
          ViewOnBlockchain: "View Details",
          SoldBy: "Seller",
          PurchasedBy: "Buyer",
          searchByOrder: "Search by order id or item name",
          sortByStatusAll: "All",
          sortByStatus0: "Purchasing (Payment pending)",
          sortByStatus1: "Ready to process (Paid in full)",
          sortByStatus2: "Confirmed/Shipped",
          sortByStatus3: "Completed (Payment released)",
          sortByStatus4: "Disputed",
          OrderID: "Order ID",
          OrderDate: "Order Date",
          OrderStatus: "Order Status",
          OrderStatus0: "Purchasing (Payment pending)",
          OrderStatus1: "Ready to process (Paid in full)",
          OrderStatus2: "Confirmed/Shipped",
          OrderStatus3: "Completed (Payment released)",
          OrderStatus4: "Disputed",
          OrderStatusopen: "Disputed",
          OrderStatus5: "Dispute Closed",
          OrderStatusclosed: "Dispute Closed",
          OrderStatus6: "Dispute Finalized",
          OrderStatus7: "Refunded",
          AcceptDisputeResolution: "Accept Dispute Payout",
          InEscrow: "- In Escrow",
          OrderTotal: "Order Total",
          OrderTotalInBTC: "BTC Total",
          NoMessages: "No messages",
          PaymentProtection: "Payment Protection",
          ShipTo: "Ship To",
          ViewRating: "(View Rating)",
          ContractDetails: "Contract Details",
          HideDetails: "Hide Details",
          ConfirmOrder: "Confirm Order",
          RefundOrder: "Refund Order",
          RefundReason: "Reason for refund",
          RefundReasonPlaceholder: "Explain why you are sending a refund",
          ReceivingAddress: "Receiving Address",
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at",
          Comments: "Comments",
          CommentsPlaceHolder: "Comments on this order",
          Shipper: "Item Shipped By",
          ShipperPlaceholder: "Name of the company shipping the item",
          TrackingNumber: "Tracking Number",
          TrackingNumberPlaceholder: "Tracking number of item",
          EstimatedDelivery: "Estimated Delivery",
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered",
          URL: "File URL",
          URLPlaceholder: "Link to download, schedule, or more information",
          Password: "Password",
          PasswordPlaceholder: "Password required for link (optional)",
          DirectTransaction: "Direct transaction",
          ModeratedTransaction: "Moderated transaction",
          Seller: "Seller",
          Buyer: "Buyer",
          Moderator: "Moderator",
          transferReceipt: "Transfer Receipt",
          copyTxid: "copy tx ID",
          Close: "Close",
          FundOrder: "Fund Order",
          sortByDateNewest: "By Date, Newest",
          sortByDateOldest: "By Date, Oldest",
          PayPurchase: "Pay for this Purchase",
          CompleteOrder: "Complete this Order",
          MarkAsShipped: "Mark as Shipped",
          RateThisTransaction: "Rate this Transaction",
          TransactionReview: "Transaction Review",
          OverallRating: "Overall Rating",
          Quality: "Quality",
          MatchedDescription: "Matched Description",
          DeliverySpeed: "Delivery Speed",
          CustomerService: "Customer Service",
          Review: "Review",
          ReviewPlaceHolder: "Your review of this transaction",
          NoFileProvided: "No file provided",
          None: "None",
          NoneSent: "None sent",
          ModerationFee: "Moderation Fee:",
          DisputeTransaction: "Start a Dispute",
          sendMessagePlaceholder: "Enter message...",
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.",
          SendMessage: "Send",
          CloseDispute: "Close Dispute",
          TotalInTransaction: "Transaction:",
          StartDisputeFlag: "START DISPUTE",
          CloseDisputeFlag: "END DISPUTE",
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer."
        },
        errorMessages: {
          saveError: "Data could not be saved.",
          getError: "Data could not be retrieved.",
          missingError: "Some fields are missing or incorrect.",
          serverError: "An incorrect reply was received from the server.",
          userError: "Information for this ID could not be found",
          userNotFoundError: "This person's information is not available. They may have gone offline.",
          notFoundError: "Data could not be loaded for:",
          socketError: "URL for WebSocket failed. Connecting to socket with default address of ws://localhost:18466.",
          contractError: "This Item Cannot be Purchased.",
          sellerError: "The seller's server has rejected the purchase request. This may be due to a connection issue.",
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid. If it is valid, try again in a few seconds.",
          pageUnavailable: "This page is currently unavailable.",
          badHandle: "The handle you entered does not have a valid OpenBazaar ID.",
          serverDown: "The server has been shut down",
          tooManyPhotosTitle: "Too many photos",
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.",
          badJSON: "The JSON data returned from the server was malformed"
        },
        aboutSection: {
          about: "<p>OpenBazaar is a network of users who buy and sell goods and services directly with each other, using Bitcoin. This network is decentralized and isn't controlled by any organization.</p><p>The software is open source and MIT licensed. You can view the code on <a href=\"https://github.com/OpenBazaar/\">Github</a>.</p><p>OpenBazaar is a community project, and we welcome participation in our <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">Slack</a> channel or on our <a href=\"http://www.reddit.com/r/openbazaar\">subreddit</a>.</p><p>If you need help, read the OpenBazaar version 1.0 <a href=\"\">Tut  orial</a>.</p><p>If you still have questions, open an issue at our <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\">support desk</a>.</p>",
          contributors: "<p>OpenBazaar is made possible by an international community of developers and volunteers contributing their time to help make trade free. This is a partial list of people who have contributed to the project, either through code or other assistance.</p><ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "<p>You can help OpenBazaar in several ways on our mission to make trade free.</p><p>Buying and selling goods and services on the network helps grow our community and make the platform more attractive to new users. Politely asking Bitcoin-accepting businesses to sell on the platform helps spread the word and shows demand for peer to peer trade.</p><p>If you're a developer, check out <a href=\"https://github.com/OpenBazaar/\">our Github</a> and see where you can help us. Beyond helping with the core code, we hope the permissionless and open source nature of the project means you will build new services on top of the existing network.</p><p>You can also <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\">donate Bitcoin</a> to the project, which will be used to defray costs for visiting conferences, offering bounties for development, and promoting OpenBazaar.</p><p>Please <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">join our Slack</a> if you have new ideas for OpenBazaar, or have questions for the core devs.</p>",
          licensing: "<p>OpenBazaar is open source software under the MIT license. This license is permissive and designed to allow people to freely reuse the code for other open source projects or for proprietary software. The full license text is below.</p><h4>The MIT License (MIT)</h4><h5>Copyright &#169 2016 OpenBazaar Developers</h5><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p><h4>Libraries</h4><p>The following libraries are used in OpenBazaar:</p><ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>",
        },
        saveMessages: {
          Saved: "Saved",
          SaveSuccess: "Your changes have been saved."
        },
        discover: {
          searchDefaultText: "Scanning your network",
          searchingText: "Scanning your network for",
          noResults: "No listings found in your network tagged with"
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...",
          myPage: "My Page",
          testMode: "Test Mode",
          customizePage:"Customize Page",
          sellItem:"New",
          createListing:"Create Listing",
          purchases:"Purchases",
          sales:"Sales",
          cases:"Cases",
          notifications:"Notifications",
          settings:"Settings",
          about:"About OpenBazaar",
          support:"Support OpenBazaar",
          Forward: "Forward",
          Back: "Back"
        },
        onboarding: {
          intro: "OpenBazaar Configuration",
          Introduction: "Introduction",
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "Set an Avatar",
          chooseAvatar: "Select Avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar",
          Finished: "Finished"
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...",
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.",
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>."
        },
        walletProviders: {
          ExchangeAndWallet: "Exchange and Wallet",
          WalletOnly: "Wallet Only",
          CoinbaseTagline: "The world's most popular way to buy, sell, and use bitcoin.",
          SamouraiTagline: "Secure mobile wallet. Emphasis on privacy.",
          AirbitzTagline: "Privacy. Security. Autonomy. Decentralized.",
          BreadwalletTagline: "Connects directly to the bitcoin network, no servers. Beautiful simplicity, maximum security.",
          RushWalletTagline: "Get a Bitcoin address quickly and easily in your browser.",
          MyceliumTagline: "One of the longest in market, most secure and reliable Bitcoin wallets.",
          CoinkiteTagline: "The Most Powerful Bitcoin Wallet",
          BlockchaininfoTagline: "The world's most popular bitcoin wallet. Safer, Friendlier, Easier.",
          DuoMoneyTagline: "Euro wallet for dead-easy Bitcoin payments. OpenBazaar for Grandma.",
          BitGoTagline: "The world's most secure bitcoin wallet. Trusted by leading Bitcoin businesses."
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available",
          installUpdate: "Install Update",
          dismiss: "Dismiss"
        },
        buyFlow: {
          PayForOrder: "Pay for Order",
          NeedTempAddress: "I need a temporary Bitcoin address",
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address",
          CantFindAddress: "I can't find my bitcoin address",
          BitcoinWallet: "Bitcoin Wallet",
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.",
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.",
          ModeratedPayment: "Moderated Payment",
          DisputeFee: "Dispute fee",
          HaveWallet: "Do you have a Bitcoin Wallet?",
          QuickSetup: "It only takes a few minutes to set one up",
          CreateWallet: "Create a Wallet",
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.",
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.",
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible",
          paymentSent: "Payment Sent!",
          total: "Total"
        },
        chat: {
          noSearchResultsFound: "No results found"
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server",
          statusConnected: "Connected",
          statusFailedConnection: "Unable to connect to your server",
          statusFailedAuthentication: "Authentication failed",
          statusTooManyAttempts: "Too many failed login attempts",
          serverConfiguration: "Server Configuration",
          connecting: "Connecting",
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.",
          serverIP: "Server IP",
          restApiPort: "Rest API port",
          websocketApiPort: "Websocket API port",
          heartbeatSocketApiPort: "Heartbeat socket port",
          username: "Username",
          password: "Password",
          restoreDefaults: "Restore defaults",
          saveChanges: "Save Changes",
          retry: "Retry connection",
        }
      },

      {

        langName: "Espa&ntilde;ol",
        langCode: "sp",

        /*

         Translators: @jjeffryes @gubatron @PolyDeveloper
         02/28/2016: ~ 263 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "Siguiente",
        IAgree: "Estoy de acuerdo",
        Back: "Atr&aacute;s",
        Recommended: "Recomendado", //notTranslated
        Reload: "Refrescar", //notTranslated
        You: "Tu", //notTranslated
        Skip: "Omitir",
        Done: "Hecho",
        Status: "Estado",
        Navigation: "Navegaci&oacute;n", //notTranslated
        Cancel: "Cancelar",
        Yes: "S&iacute;",
        No: "No",
        of: "de",
        Sell: "Vender",
        New: "Nuevo",
        HighlightToStyle: "Seleccionar texto para darle estilo", //notTranslated
        Excellent: "Excelente",
        Good: "Bueno",
        Poor: "Deteriorado",
        StillValidating: "Tu apodo se est&aacute; validando", //notTranslated
        CheckStatus: "Revisar estado", //notTranslated
        ChangeCurrency: "Cambiar moneda", //notTranslated
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
        ViewListing: "Ver publicaciones", //notTranslated
        Unfollow: "Dejar de seguir",
        About: "Acerca de",
        NoDescriptionAdded: "No hay descripci&oacute;n a&ntilde;adida",
        NoListings: "Sin publicaciones", //notTranslated
        AboutEmpty: "La secci&oacute;n Acerca de est&aacute; en blanco ...",
        Followers: "Seguidores",
        Following: "Siguiendo a",
        FollowsYou: "Te siguen", //notTranslated
        Message: "Mensaje",
        Messages: "Mensajes",
        Store: "Tienda",
        Edit: "Editar",
        Clone: "Duplicar", //notTranslated
        Used: "Usado",
        Delete: "Borrar",
        DontDelete: "No Borrar",
        ConfirmDelete: "Confirmar eliminaci&oacute;n",
        Website: "Sitio Web",
        Guid: "OpenBazaar ID",
        Welcome: "Bienvenido",
        CreateStore: "Crear Tienda",
        GoToMyPage: "Ir a mi p&aacute;gina",
        SearchForItemsPlaceholder: "Ingresa #juegos, #zapatos u otra #etiqueta...", //notTranslated
        SearchForPagesPlaceholder: "B&uacute;squeda por palabra clave",
        SearchFeedPlaceholder: "B&uacute;squeda por nombre o apodo",
        SearchForFollowersPlaceholder: "B&uacute;squeda por nombre o apodo",
        SearchForUsersPlaceholder: "B&uacute;squeda por nombre o apodo",
        SearchOnUserStorePlaceholder: "Introduzca un t&iacute;tulo...", //notTranslated
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
        PGPKey: "PGP Key",  //not translated
        Signature: "PGP Signature",  //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "COMPRAR AHORA",
        Description: "Descripci&oacute;n",
        Reviews: "Cr&iacute;ticas",
        Shipping: "Envío",
        Addresses: "Direcciones",
        Files: "Files", //notTranslated
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
        Change: "Cambio", //notTranslated
        SaveChanges: "Guardar Cambios",
        YourNombre: "Su nombre",
        BitcoinReturnAddress: "Introduzca su direcci&oacute;n Bitcoin", //notTranslated
        BitcoinReturnAddressPlaceholder: "direcci&oacute;n Bitcoin para retornar las monedas", //not translated
        BitcoinReturnAddressInfo: "Si se emite un reembolso, los fondos ser&aacute;n enviados a una direcci&oacute;n Bitcoin. Por favor, introduzca su billetera a continuaci&oacute;n.", //not translated
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
        Tags: "Etiquetas", //notTranslated
        Keywords: "Palabras claves",
        Type: "Tipo",
        Condition: "Condici&oacute;n",
        NSFW: "18+ (contenido para adultos)",
        Select: "Seleccionar", //not translated
        Social: "Social", //not translated
        Theme: "Template", //not translated
        Listing: "Publicaci&oacute;n", //not translated
        Listings: "Publicaciones", //not translated
        ViewPage: "Ver p&aacute;gina", //notTranslated
        Pages: " P&aacute;ginas", //not translated
        Page: " P&aacute;gina", //not translated
        Language: "Lenguaje", //not translated
        Reset: "Restaurar", //not translated
        Local: "Local",
        Domestic: "Interno",
        Location: "Ubicaci&oacute;n",
        International: "Internacional",
        Time: "Hora",
        Free: "Gratis",
        Category: "Categor&iacute;a",
        ProcessingTime: "Tiempo de procesamiento",
        SelectPhotos: "Seleccionar fotos", //notTranslated
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
        AddModerators: "Agregar Moderadores",
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
        Loading: "Cargando...", // not translated
        Purchases:"Compras",
        Sales: "Ventas", // not translated
        Cases: "Cases", // not translated
        Enter: "Ingresar", //notTranslated
        Discover: "Descubrir", // not translated
        Block: "Bloquear", //notTranslated
        Unblock: "Desbloquear", //notTranslated
        Blocked: "Bloqueado", // not translated
        NoBlockedList: "No bloqueaste a nadie.", // not translated
        Advanced: "Avanzado", // not translated
        General: "General", // not translated
        AllItems: "Todos los items", // not translated
        FreeShipping: "Env&iacute;o gratuito", // not translated
        DomesticShippingPrice: "Precio de env&iacute;o nacional", // not translated
        InternationalShippingPrice: "Precio de env&iacute;o internacional", // not translated
        MinimumIs: "M&iacute;nimo", // not translated
        Visibility: "Visibilidad", // not translated
        Title: "T&iacute;tulo", // not translated
        DigitalItem: "&Iacute;tem digital", // not translated
        PhysicalItem: "&Iacute;tem  f&iacute;sico", // not translated
        MinimumPrice: "Un m&iacute,nimo es necesario para cubrir los costos de la transacci&oacute;n Bitcoin", //notTranslated
        DomesticShippingTime: "Tiempo de env&iacute;o nacional", // not translated
        InternationalShippingTime: "Tiempo de env&iacute;o internacional", // not translated
        DisplayNSFWcontent: "Mostrar contenido no apto para el trabajo?", // not translated
        Basic: "B&aacute;sico", // not translated
        Content: "Contenido", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Configuraci&oacute;n del servidor", //notTranslated
        ReadOnly: "(Campo de solo lectura)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ServerSettings: "Configuraci&oacute;n del servidor",  // not translated duplicated?
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
          SoldBy: "Seller", // not translated
          PurchasedBy: "Buyer", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Ready to process (Paid in full)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Ready to process (Paid in full)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          AcceptDisputeResolution: "Accept Dispute Payout",
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "El servidor del vendedor ha rechazado la solicitud de compra. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID",//notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>", //notTranslated
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "Mi p&aacute;gina",
          testMode: "Test Mode", //notTranslated
          customizePage:"Personalizar P&aacute;gina",
          sellItem:"Nuevo",
          createListing:"Nuevo Listado",
          purchases:"Compras",
          sales:"Ventas",
          cases:"Casos",
          notifications:"Notificaciones",
          settings:"Ajustes",
          about:"Acerca de OpenBazaar",
          support:"Soporte OpenBazaar",
          Forward: "Forward", //notTranslated
          Back: "Atr&aacute;s"
        },
        onboarding: {
          intro: "Personalice Su OpenBazaar",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "Establecer un Avatar",
          chooseAvatar: "Seleccione avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection", //notTranslated
        }
      },

      {

        langName: "German",
        langCode: "de",

        /*

         Translators: @z3ntu @johirner
         02/28/2016: ~ 265 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "Weiter",
        IAgree: "Akzeptieren",
        Back: "Zur&uuml;ck",
        EnterMessage: "Nachricht eingeben...",
        Recommended: "Recommended", //notTranslated
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "&Uuml;berspringen",
        Done: "Fertig",
        Status: "Status",
        Navigation: "Navigation", //notTranslated
        Cancel: "Abbrechen",
        Yes: "Ja",
        No: "Nein",
        of: "von",
        Sell: "Verkaufen",
        New: "Neu",
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "Hervorragend",
        Good: "Gut",
        Poor: "Mangelhaft",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: 'Nachricht',
        Messages: "Messages",//notTranslated
        Store: "Laden",
        Edit: "Bearbeiten",
        Clone: "Clone", //notTranslated
        Used: "Gebraucht",
        Delete: "L&ouml;schen",
        DontDelete: "Nicht l&ouml;schen",
        ConfirmDelete: "L&ouml;schen best&auml;tigen",
        Website: "Webseite",
        Guid: "OpenBazaar ID",
        Welcome: "Willkommen",
        CreateStore: "Werde ein Verk&auml;ufer",
        GoToMyPage: "Zur eigenen Seite",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Nach Name oder Schlagwort suchen",
        SearchFeedPlaceholder: "Nach OpenBazaar ID oder Handle suchen",
        SearchForFollowersPlaceholder: "Nach OpenBazaar ID oder Handle suchen",
        SearchForUsersPlaceholder: "Nach OpenBazaar ID oder Handle suchen",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
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
        Change: "Change", //notTranslated
        SaveChanges: "&Auml;nderungen speichern",
        YourName: "Dein Name",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //not translated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "folgt dir nun.",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        FreeShipping: "Free Shipping", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        maxLength20: "max length 20 char", //not translated
        maxLength80: "max length 80 char", //not translated
        maxLength200: "max length 200 char", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
          SoldBy: "Seller", // not translated
          PurchasedBy: "Buyer", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Ready to process (Paid in full)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Ready to process (Paid in full)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "Die Kaufanfrage wurde vom Server des Verkäufers abgelehnt. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID", //notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>", //notTranslated
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "Meine Seite",
          testMode: "Test Mode", //notTranslated
          customizePage:"Seite anpassen",
          sellItem:"Neu",
          createListing:"Neuer Eintrag",
          purchases:"Eink&auml;ufe",
          sales:"Verk&auml;ufe",
          cases:"F&auml;lle",
          notifications:"Benachrichtigungen",
          settings:"Einstellungen",
          about:"&Uuml;ber OpenBazaar",
          support:"OpenBazaar unterst&uuml;tzen",
          Forward: "Forward", //notTranslated
          Back: "Zur&uuml;ck"
        },
        onboarding: {
          intro: "OpenBazaar Konfiguration",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "Setze einen Avatar",
          chooseAvatar: "W&auml;hle einen Avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection" //notTranslated
        }
      },

      {

        langName: "Italiano",
        langCode: "it",

        /*

         Translator: @HostFat
         02/28/2016: ~ 195 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "Ho un Portafoglio ora",
        Next: "Avanti",
        IAgree: "Sono d'accordo",
        Back: "Indietro",
        EnterMessage: "Inserire messaggio...",
        Recommended: "Raccomandato",
        Reload: "Ricaricare",
        You: "Tu",
        Skip: "Salta",
        Done: "Finito",
        Status: "Status",
        Navigation: "Navigazione",
        Cancel: "Annulla",
        ClosingOpenBazaar: "Chiudi (La tua pagina sar&agrave; disconnessa)",
        Minimize: "Minimizza",
        Maximize: "Massimizza",
        Close: "Chiudi",
        Yes: "Si",
        No: "No",
        of: "di",
        Sell: "Vendere",
        New: "Nuovo",
        HighlightToStyle: "Evidenza testo per stilizzarlo",
        Excellent: "Eccellente",
        Good: "Buono",
        Poor: "Scarso",
        StillValidating: "Il tuo nickname &egrave; ancora in validazione",
        CheckStatus: "Controllare lo stato",
        ChangeCurrency: "Cambia valuta",
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
        ViewListing: "Visualizza il listino",
        Unfollow: "Smetti",
        About: "About",
        NoDescriptionAdded: "Nessuna descrizione aggiunta",
        NoListings: "Nessun listino",
        CoverPhoto: "Foto di copertina",
        AboutEmpty: "L'About &egrave; vuoto...",
        Followers: "Followers",
        Following: "Following",
        FollowsYou: "Ti segue",
        Message: "Messaggio",
        Messages: "Messaggi",
        Store: "Negozio",
        Edit: "Modifica",
        Clone: "Clone",
        Used: "Usato",
        Delete: "Cancella",
        DontDelete: "Non eliminare",
        ConfirmDelete: "Conferma cancellazione",
        Website: "Sito web",
        Guid: "OpenBazaar ID",
        Welcome: "Benvenuto",
        CreateStore: "Diventa un negozio",
        GoToMyPage: "Vai alla mia pagina",
        SearchForItemsPlaceholder: "Scrivi #giochi, #scarpe o un qualsiasi #tag...",
        SearchForPagesPlaceholder: "Cerca per nome o parola chiave",
        SearchFeedPlaceholder: "Cerca per nickname o OpenBazaar ID",
        SearchForFollowersPlaceholder: "Cerca per nickname o OpenBazaar ID",
        SearchForUsersPlaceholder: "Cerca per nickname o OpenBazaar ID",
        SearchOnUserStorePlaceholder: "Scrivi un titolo...",
        EstDeliveryDomesticPlaceholder: "3-5 giorni di lavoro",
        EstDeliveryInternationalPlaceholder: "7-15 giorni di lavoro",
        OrderProcessingTimePlaceholder: "1-2 giorni di lavoro",
        TermsAndConditionsPlaceholder: "Inserire termini e condizioni...",
        TitlePlaceholder: "Inserire titolo",
        DescriptionPlaceholder: "Inserire descrizione...",
        ReturnPolicyPlaceholder: "Inserire politiche di restituazione...",
        CategoryPlaceholder: "Inserire categoria",
        CategoryHelperText: "Le categorie sono usate per raggruppare e organizzare gli oggetti nel tuo negozio.",
        KeywordsHelperText: "Aggiungere tag aiuta i tuoi listino ad essere trovato sul mercato.",
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
        Signature: "Firma PGP",
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "COMPRA ORA",
        Description: "Descrizione",
        Reviews: "Recensioni",
        Shipping: "Spedizione",
        Addresses: "Indirizzi",
        Files: "File",
        NewAddress: "Nuovo indirizzo",
        CurrentAddress: "Indirizzo attuale",
        Returns: "Restituzione",
        ReturnsPolicy: "Politica di restituzione",
        Ampersand: "&",
        Tags: "Tag",
        Keywords: "Parole chiave",
        ShipsFrom: "Inviato da",
        ShipsTo: "Inviato verso",
        Optional: "Facoltativo",
        Customize: "Personalizza",
        Save: "Salva",
        Changes: "Modifiche",
        Change: "Cambia",
        SaveChanges: "Salva modifiche",
        YourName: "Tuo nome",
        BitcoinReturnAddress: "Inserisci il tuo Indirizzo Bitcoin",
        BitcoinReturnAddressPlaceholder: "Inserire indirizzo bitcoin...",
        BitcoinReturnAddressInfo: "Se sar&agrave; rilasciato un rimborso, i fondi dovranno essere inviati ad un indirizzo Bitcoin. Si prega di fornire qui sotto un indirizzo al vostro portafoglio.",
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
        ServerIPPort: "Server IP:Porta",
        All: "Tutti",
        Name: "Nome",
        Price: "Prezzo",
        Available: "Disponibile",
        Type: "Tipo",
        Condition: "Condizione",
        NSFW: "18+ (Materiale per adulti)",
        Select: "Seleziona",
        Social: "Sociale",
        Theme: "Argomento",
        Listing: "Listato",
        Listings: "Listati",
        ViewPage: "Mostra pagina",
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
        SelectPhotos: "Seleziona foto",
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
        NotificationPaymentSent: "Il pagamento è stato inviato a",
        NotificationOrderFor: "piazza un ordine per",
        NotificationOrderConfirmed: "Il tuo ordine &egrave; stato confermato/inviato",
        NotificationFollow: "ora ti sta seguendo",
        NotificationDispute: "ha aperto una disputa",
        NotificationDisputeClosed: "questa disputa &egrave; chiusa",
        NotificationRefund: "ha rimborsato il tuo ordine",
        NoticationOrderStatus: "Stato ordine aggiornato, notifica inviata al compratore",
        NotificationNewOrder: "ha fatto un acquisto",
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
        Enter: "Inserire",
        Discover: "Trova",
        Block: "Blocca",
        Unblock: "Sblocca",
        Blocked: "Bloccato",
        NoBlockedList: "Attualmente non stai bloccando nessuno.",
        Advanced: "Avanzato",
        General: "Generale",
        AllItems: "Tutti gli articoli",
        DomesticShippingPrice: "Prezzo per invio nazionale",
        InternationalShippingPrice: "Prezzo per invio internazionale",
        MinimumIs: "Il minimo &eacute;",
        Title: "Titolo",
        DigitalItem: "Articolo digitale",
        PhysicalItem: "Articolo fisico",
        MinimumPrice: "&Egrave; necessario un minimo per assicurare che siano coperti i costi di transazione",
        DomesticShippingTime: "Tempo di invio nazionale",
        InternationalShippingTime: "Tempo di invio internazionale",
        DisplayNSFWcontent: "Mostrare contenuto NSFW?",
        Basic: "Base",
        Content: "Contenuto",
        StandardThemes: "Temi standard",
        NoPhotosAdded: "Nessuna foto aggiunta",
        Summary: "Sommario",
        Funds: "Fondi",
        Discussion: "Discussione",
        Quantity: "Quantit&agrave;",
        ShippingTo: "Spedire a",
        ModeratedBy: "Moderato da",
        Submit: "Invio",
        maxLength20: "lunghezza massima 20 caratteri",
        maxLength80: "lunghezza massima 80 caratteri",
        maxLength200: "lunghezza massima 200 caratteri",
        StoreModeratorsOptional: "Moderatori negozio (Opzionale)",
        Searchformoderators: "Ricerca per moderatori",
        Contributors: "Contributori",
        Support: "Supporto",
        Licensing: "Licenze",
        On: "On",
        Off: "Off",
        ClickToChange: "Clicca per cambiare",
        NotProvided: "non fornito",
        NotFollowingAnyone: "Non segui nessuno",
        NoFollowers: "Nessun seguace",
        NoReviews: "Nessuna recensione",     
        Moderator: "Moderatore",
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall",
        ServerSettings: "Impostazioni Server",
        ReadOnly: "(Questo campo &egrave; di sola lettura)",
        HandleResolver: "Recupero Nickname",
        ShutDownServer: "Spegni il server",
        LoadingBitcoinPrices: "Caricamento Prezzi Bitcoin...",
        ThisUserIsBlocked: "Questo utente &egrave; nascosto perch&egrave; si trova nella tua lista bloccati",
        ThisUserIsNSFW: "Questo utente &egrave; nascosto perch&egrave; la sua pagina &egrave; indicata come NSFW",
        ShowBlockedUser: "Mostra la pagina di questo utente eccetto per il contenuto NSFW",
        ShowNSFWContent: "Mostra la pagina di questo utente, e tutto il listino NSFW",
        ServerChangeWarningHeadline: "Attenzione: registra le tue impostazioni",
        ServerChangeWarning: "Ti raccomandiamo di fare una copia dei delle tue precedenti impostazioni, mostrate sotto. I tuoi precedenti nomeutente e password non saranno pi&ugrave; disponibili dopo questo punto.",
        moderatorSettings: {
          DisputeResolution: "Risoluzione disputa",
          ServiceFee: "Commissione servizio",
          ServiceFeeNote: "Min: 0%, Max: 25%"
        },
        BecomeModerator: "Diventa un moderatore",
        EditModerator: "Impostazioni moderatore",
        transactions: {
          OrderDetails: "Dettagli ordine",
          ViewOnBlockchain: "Mostra dettagli",
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
          OrderStatusopen: "Contestato",
          OrderStatus5: "Contestazione chiusa",
          OrderStatusclosed: "Contestazione chiusa",
          OrderStatus6: "Contestazione finalizzata",
          OrderStatus7: "Rimborsato",
          AcceptDisputeResolution: "Accetta il pagamento della contestazione",
          InEscrow: "- In deposito di garanzia (escrow)",
          OrderTotal: "Totale ordine",
          OrderTotalInBTC: "BTC Totali",
          NoMessages: "Nessun messaggio",
          PaymentProtection: "Protezione pagamento",
          ShipTo: "Spedire a",
          ViewRating: "(Mostra Valutazione)",
          ContractDetails: "Dettagli Contratto",
          HideDetails: "Nascondi Dettagli",
          ConfirmOrder: "Conferma ordine",
          RefundOrder: "Rimborsa Ordine",
          RefundReason: "Motivo per il rimborso",
          RefundReasonPlaceholder: "Spiega perch&egrave; sti inviando un rimborso",
          ReceivingAddress: "Indirizzo di ricezione",
          RecievingAddressPlaceholder: "Indirizzo Bitcoin per ricevere fondi a",
          Comments: "Commenti",
          CommentsPlaceHolder: "Commenti a questo ordine",
          Shipper: "Articolo spedito a",
          ShipperPlaceholder: "Nome della compagnia inviante l'articolo",
          TrackingNumber: "Numero di tracciamento",
          TrackingNumberPlaceholder: "Numero di tracciamento dell'articolo",
          EstimatedDelivery: "Consegna stimata",
          EstimatedDeliveryPlaceholder: "Data stimada per la consegna dell'articolo",
          URL: "File URL",
          URLPlaceholder: "Link per scaricare, calendario, o pi&ugrave; informazioni",
          Password: "Password",
          PasswordPlaceholder: "Password richiesta per link (opzionale)",
          DirectTransaction: "Transazione diretta",
          ModeratedTransaction: "Transazione moderata",
          Seller: "Venditore",
          Buyer: "Compratore",
          Moderator: "Moderatore",
          transferReceipt: "Ricecevuta di trasferimento",
          copyTxid: "copia tx ID",
          Close: "Chiudi",
          FundOrder: "Finanzia l'ordine",
          sortByDateNewest: "Per data, i pi&ugrave; nuovi",
          sortByDateOldest: "Per data, i pi&ugrave; vecchi",
          PayPurchase: "Paga per questo acquisto",
          CompleteOrder: "Completa questo ordine",
          MarkAsShipped: "Segna come Inviato",
          RateThisTransaction: "Valuta questa transazione",
          TransactionReview: "Analisi Transazione",
          OverallRating: "Valutazione complessiva",
          Quality: "Qualit&agrave;",
          MatchedDescription: "Descrizione combaciante",
          DeliverySpeed: "Velocit&agrave; di consegna",
          CustomerService: "Assistenza clienti",
          Review: "Analisi",
          ReviewPlaceHolder: "La tua analisi su questa transazione",
          NoFileProvided: "Nessun file fornito",
          None: "Niente",
          NoneSent: "Niente inviato",
          ModerationFee: "Commissione di moderazione:",
          DisputeTransaction: "Apri una controversia",
          sendMessagePlaceholder: "Inserisci messaggio...",
          DisputeInstructions: "Per aprire una controversia per questa transazione, scrivi la ragione la controversia qui sotto, e attiva la casella Apri una Controversia. Questo includer&agrave; il moderatore nella tua conversazione fintanto che la controversia non sar&agrave; risolta. Il moderatore far&agrave; la decisione finale sul fatto che i fondi vi verranno restituiti, e la quantit&agrave;. La commissione di moderazione sar&agrave; presa dai fondi che hai gi&agrave; inviato.",
          SendMessage: "Invia",
          CloseDispute: "Chiudi controversia",
          TotalInTransaction: "Transazione:",
          StartDisputeFlag: "APRI CONTROVERSIA",
          CloseDisputeFlag: "CONCLUDI CONTROVERSIA",
          PayoutOnlyBuyer: "Chiundere questa controversia rimborser&agrave; il 100% dei fondi al compratore"
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
          sellerError: "Il server del venditore ha respinto la richiesta di acquisto. Qusto pu&ograve; essere a causa di un problema di connessione.", 
          checkPurchaseData: "Controlla i tuoi dati di acquisto, come la quantit&agrave; e l'indirizzo Bitcoin di restituzione, per essere sicuro che sia tutto corretto",
          pageUnavailable: "Questa pagina non &egrave; attualmente disponibile.",
          badHandle: "Il nickname che hai inserito non ha un valido OpenBazaar ID",
          serverDown: "Il server &egrave; stato spento",
          tooManyPhotosTitle: "Troppe foto",
          tooManyPhotosBody: "Ad alcune o a tutte le foto &egrave; stato impedito di essere caricate perch&egrave; avresti superato la massima quantit&agrave; consentita.",
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "<p>OpenBazaar is a network of users who buy and sell goods and services directly with each other, using Bitcoin. This network is decentralized and isn't controlled by any organization.</p><p>The software is open source and MIT licensed. You can view the code on <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">Github</a>.</p><p>OpenBazaar is a community project, and we welcome participation in our <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">Slack</a> channel or on our <a href=\"http://www.reddit.com/r/openbazaar\" target=\"_blank\">subreddit</a>.</p><p>If you need help, read the OpenBazaar version 1.0 <a href=\"\" target=\"_blank\">Tut  orial</a>.</p><p>If you still have questions, open an issue at our <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\" target=\"_blank\">support desk</a>.</p>",
          contributors: "<p>OpenBazaar is made possible by an international community of developers and volunteers contributing their time to help make trade free. This is a partial list of people who have contributed to the project, either through code or other assistance.</p><ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "<p>You can help OpenBazaar in several ways on our mission to make trade free.</p><p>Buying and selling goods and services on the network helps grow our community and make the platform more attractive to new users. Politely asking Bitcoin-accepting businesses to sell on the platform helps spread the word and shows demand for peer to peer trade.</p><p>If you're a developer, check out <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">our Github</a> and see where you can help us. Beyond helping with the core code, we hope the permissionless and open source nature of the project means you will build new services on top of the existing network.</p><p>You can also <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\" target=\"_blank\">donate Bitcoin</a> to the project, which will be used to defray costs for visiting conferences, offering bounties for development, and promoting OpenBazaar.</p><p>Please <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">join our Slack</a> if you have new ideas for OpenBazaar, or have questions for the core devs.</p>",
          licensing: "<p>OpenBazaar is open source software under the MIT license. This license is permissive and designed to allow people to freely reuse the code for other open source projects or for proprietary software. The full license text is below.</p><h4>The MIT License (MIT)</h4><h5>Copyright &#169 2016 OpenBazaar Developers</h5><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p><h4>Libraries</h4><p>The following libraries are used in OpenBazaar:</p><ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>",
        },
        saveMessages: {
          Saved: "Salvato",
          SaveSuccess: "Le modifiche sono state salvate."
        },
        discover: {
          searchDefaultText: "Scansione del tuo network",
          searchingText: "Scansionando il tuo network per",
          noResults: "Nessun listino trovato sul tuo network taggato con"
        },
        filters: {
          pagesAllTypes: "Tutti i tipi",
          pagesStores: "Negozi",
          pagesMods: "Servizi di moderazione",
          pagesBasic: "Utenti normali",
          listingsCurated: "Dai negozi che seguo",
          listingsAll: "Da tutti i negozi",
          categoryAll: "Tutti"
        },
        nav: {
          searchPlaceholder: "Scrivi un @Nickname, OpenBazaar ID o #tag...",
          myPage: "La mia pagina",
          testMode: "Modalit&agrave; Test",
          customizePage: "Personalizza pagina",
          sellItem: "Nuovo",
          createListing: "Crea elenco",
          purchases: "Acquisti",
          sales: "Vendite",
          cases: "Cause",
          notifications: "Notifiche",
          settings: "Impostazioni",
          about: "About OpenBazaar",
          support: "Supporto OpenBazaar",
          Forward: "Inoltra",
          Back: "Indietro"
        },
        onboarding: {
          intro: "Configurazione OpenBazaar",
          Introduction: "Introduzione",
          IntroductionBody: "OpenBazaar &agrave; un mercato sociale peer-to-peer. &Egrave; come combinare eBay, Twitter e Bittorrent in un uno. Giusto, non ci sono commissioni e OpenBazaar &egrave; open-source. \n\n Si prega di notare che pu&ograve; apparire e sembrare un po' differente da ci&ograve; a cui sei abituato, quindi sii paziente per come ti regoli.",
          Theme: "Seleziona un Tema per la tua pagina",
          chooseLanguage: "Seleziona la tua lingua",
          contributors: "%{smart_count} Contributore |||| %{smart_count} Contributori",
          configure: "Imposta la tua esperienza",
          disclaimer_title: "Disclaimer",
          disclaimer_body: "OpenBazaar &egrave; un network per scambi di beni e servizi direttamente fra le persone - usando Bitcoin - senza nessuna organizzazione centrale che controlli la piattaforma. Questo significa che tu sei responsabile per le tue attivit&agrave; sul network.\n\nGli utenti di OpenBazaar non sono anonimi di default. La maggior parte delle comunicazioni fra le parti sono cifrate, ma gli indirizzi IP sono pubblici e possono essere associati con le attivit&agrave; sul network. Parti malevole potrebbero utilizzare queste informazioni contro di voi; proteggere la tua privay &egrave; una tua responsabilit&agrave;.\n\nGli utenti di OpenBazaar devono rispettare le leggi nella propria giurisdizione legale cos&igrave; come la loro coscienza. Gli sviluppatori di OpenBazaar non perdonano - e non sono responsabili - per alcun uso illegale della piattaforma.\n\nLa comunit&agrave; deglo sviluppatori di OpenBazaar ha lavorato duramente per fornire una piattaforma libera per il commercio nel mondo. Ma come per ogni software, si troveranno bug. Gli sviluppatori non sono responsabili per alcuna perdita monetaria associata a problemi nel software.\n\nUsando OpenBazaar sei responsabile per le tue azioni sul network OpenBazaar.",
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
          avatar: "Imposta un Avatar",
          chooseAvatar: "Seleziona Avatar",
          discoverCallOut: "Esplora i Listini e Pagine su OpenBazaar",
          Finished: "Finito"
        },
        guidStillCreating: {
          HangTight: "Porta pazienza per un po'...",
          YourPersonal: "Le tue chiavi personali e l'OpenBazaar ID si stanno generando e dovrebbe richiedero richiedre circa solo 30 secondi per finire.\n\nTi connetterai automaticamente al network una volta completato il processo, quindi se puoi attendere un attimo.",
          LookingFor: "Sei alla ricerca di qualcosa da fare nel frattempo? Leggi l'<a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>."
        },
        walletProviders: {
          ExchangeAndWallet: "Exchange and Portafoglio",
          WalletOnly: "Solo Portafoglio",
          CoinbaseTagline: "Il pi&ugrave; popolare modo al mondo per comprare, vendere e usare bitcoin.",
          SamouraiTagline: "Portafoglio sicuro mobile. Con particolare attenzione alla privacy.",
          AirbitzTagline: "Privacy. Sicurezza. Autonomia. Decentralizzato.",
          BreadwalletTagline: "Connette direttamente al network Bitcoin, nessun server. Bellissima semplicit&agrave;, massima sicurezza.",
          RushWalletTagline: "Ottienti un Indirizzo Bitcoin velocemente e facilmente nel tuo browser.",
          MyceliumTagline: "Uno dei primi sul mercato, dei pi&ugrave; sicuri e affidabile fra i portafogli Bitcoin",
          CoinkiteTagline: "Il pi&ugrave; potente Portafoglio Bitcoin",
          BlockchaininfoTagline: "Il portafoglio bitcoin pi&ugrave; popolare al mondo. Sicuro, Amichevole, Facile.",
          DuoMoneyTagline: "Portafoglio euro per pagamenti estremamente facili. OpenBazaar per Nonna.",
          BitGoTagline: "Il portafoglio bitcoin pi&ugrave; sicuro al mondo. Scelto da imprese leader diBitcoin."
        },
        softwareUpdate: {
          updateAvailable: "Disponibile aggiornamento per OpenBazaar",
          installUpdate: "Installa aggiornamento",
          dismiss: "Respingi"
		},
        buyFlow: {
          PayForOrder: "Paga per ordinare",
          NeedTempAddress: "Ho bisogno di un indirizzo Bitcoin temporaneo",
          NeedTempAddressHelper: "Si prega di contrassegnare l'url al suo indirizzo bitcoin temporaneo",
          CantFindAddress: "Non riesco a trovare il mio indirizzo bitcoin",
          BitcoinWallet: "Portafoglio Bitcoin",
          ModeratedPaymentDescription: "Il tuo pagamento &egrave; mantenuto in un portafoglio sicuro fintanto che il venditore completa la sua parte dell'accordo. Se sorgono dei problemi, un moderatore ver&agrave; in aiuto",
          ModeratorFeeHelper: "Il moderatore potrebbe richiedere delle commissioni, ma solo in caso di controversia.",
          ModeratedPayment: "Pagamento moderato",
          DisputeFee: "Commissione per disputa",
          HaveWallet: "Hai un portafoglio Bitcoin?",
          QuickSetup: "Ci vogliono solo pochi minuti per crearne uno",
          CreateWallet: "Crea un Portafoglio",
          DirectPaymentDescription: "I fondi vengono inviati direttamente al venditore. Utilizzare solo su piccoli acquisti o se si acquista da un venditore di fiducia.",
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
          summaryMsg1: "Il tuo pagamento &egrave; stato trasmesso a %{recipient}",
          summaryMsg2: "Il tempo previsto per il processo di quest'ordine &egrave;",
          summaryMsg3: "Puoi controllare lo stato del tuo ordine sulla tua",
          purchasesPage: "pagina acquisti",
          returnAddress: "Indirizzi di ritorno",
          moderatorPaymentDisclaimer: "Pagato dal totale se la transazione si conclude in una disputa.",
          directPaymentDisclaimer: "Usa il pagamento diretto con cauzione, i fondi sono irreversibili",
          paymentSent: "Pagamento inviato!",
          total: "Totale"
        },
        chat: {
          noSearchResultsFound: "Nessun risultato trovato"
        },
        serverConnectModal: {
          statusTryingToConnect: "Tentativo di connettere al tuo server",
          statusConnected: "Connesso",
          statusFailedConnection: "Impossibile connettere al tuo server",
          statusFailedAuthentication: "Autenticazione fallita",
          statusTooManyAttempts: "Troppi tentativi di accesso falliti",
          serverConfiguration: "Configurazione server",
          connecting: "Connessione",
          intro: "OpenBazaar &egrave; progettato per consentire di ospitare il vostro server in modo separato dal client. Per impostazione predefinita, il server verr&agrave; eseguito in locale, ma &egrave; possibile ignorare sottostante.",
          serverIP: "Server IP",
          restApiPort: "Porta Rest API",
          websocketApiPort: "Porta Websocket API",
          heartbeatSocketApiPort: "Porta Heartbeat socket port",
          username: "Nome utente",
          password: "Password",
          restoreDefaults: "Ripristina i valori predefiniti",
          saveChanges: "Salva cambiamenti",
          retry: "Riprova connessione"
        }
      },

      {

        langName: "Français",
        langCode: "fr-FR",

        /*

         Translator: @Kirvx
         Reviewer  : @JustinDrake

         02/28/2016: ~ 0 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "J'ai maintenant un portefeuille",
        Next: "Suivant",
        IAgree: "Je suis d'accord",
        Back: "Précédent",
        EnterMessage: "Écrivez un message...",
        Recommended: "Recommandé",
        Reload: "Actualiser",
        You: "Vous",
        Skip: "Passer",
        Done: "Terminé",
        Status: "État",
        Navigation: "Navigation",
        Cancel: "Annuler",
        ClosingOpenBazaar: "Fermer (votre page sera déconnectée)",
        Minimize: "Réduire",
        Maximize: "Agrandir",
        Close: "Fermer",
        Yes: "Oui",
        No: "Non",
        of: "sur",
        Sell: "Vendre",
        New: "Neuf",
        HighlightToStyle: "Sélectionnez votre texte pour lui appliquer un style",
        Excellent: "Excellent",
        Good: "Bon",
        Poor: "Médiocre",
        StillValidating: "Votre identifiant est toujours en cours de validation",
        CheckStatus: "Vérifier l'état",
        ChangeCurrency: "Changer la devise",
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
        About: "À propos",
        NoDescriptionAdded: "Aucune description ajoutée",
        NoListings: "Aucune annonce",
        CoverPhoto: "Photo de couverture",
        AboutEmpty: "À propos est vide...",
        Followers: "Abonnés",
        Following: "Abonnements",
        FollowsYou: "Vous suit",
        Message: "Message",
        Messages: "Messages",
        Store: "Boutique",
        Edit: "Modifier",
        Clone: "Dupliquer",
        Used: "Utilisé",
        Delete: "Supprimer",
        DontDelete: "Ne pas supprimer",
        ConfirmDelete: "Confirmer la suppression",
        Website: "Site web",
        Guid: "OpenBazaar ID",
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
        OrderProcessingTimePlaceholder: "Écrivez le temps nécessaire pour traiter la commande",
        TermsAndConditionsPlaceholder: "Écrivez les termes et conditions...",
        TitlePlaceholder: "Écrivez un titre",
        DescriptionPlaceholder: "Écrivez une description...",
        ReturnPolicyPlaceholder: "Écrivez une condition de retour...",
        CategoryPlaceholder: "Choisissez une catégorie",
        CategoryHelperText: "Les catégories sont utilisées pour regrouper et organiser les articles au sein de votre boutique.",
        KeywordsHelperText: "Ajouter des mots-clés permet à votre annonce d'être découverte sur le marché.",
        ExpirationDateHelperText: "Définissez une date pour que l'article soit automatiquement retiré de votre boutique.",
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
        Signature: "Signature PGP",
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "Acheter Maintenant",
        Description: "Description",
        Reviews: "Avis",
        Shipping: "Expédition",
        Addresses: "Adresses",
        Files: "Fichiers",
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
        Save: "Enregistrer",
        Change: "Modifier",
        Changes: "Modifications",
        SaveChanges: "Enregistrer les modifications",
        YourName: "Votre nom",
        BitcoinReturnAddress: "Entrez votre adresse Bitcoin",
        BitcoinReturnAddressPlaceholder: "l'adresse bitcoin de remboursement",
        BitcoinReturnAddressInfo: "Si un remboursement est émis, les fonds devront être envoyés à une adresse Bitcoin. Veuillez fournir ci-dessous une adresse de votre portefeuille.",
        LocalCurrency: "Devise locale",
        TimeZone: "Fuseau horaire",
        ShipToName: "Nom",
        ShipToStreet: "Rue",
        ShipToCity: "Ville",
        ShipToState: "État / Région / Département",
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
        Condition: "État",
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
        DragOrUploadPhotos: "Glisser ou sélectionner des photos",
        ExpirationDate: "Expire le",
        UploadCoverPhoto: "Sélectionner une photo de couverture",
        ShortDescription: "Brève description",
        UpTo140Characters: "Jusqu'à 140 caractères",
        PrimaryColor: "Couleur primaire",
        SecondaryColor: "Couleur secondaire",
        TextColor: "Couleur de texte",
        CoverPhotoButton: "Sélectionner une photo de couverture",
        AboutPlaceholder: "Description complète",
        BackgroundColor: "Couleur de fond",
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "a placé une commande pour",
        NotificationOrderConfirmed: "Votre commande a été confirmée / expédiée",
        NotificationFollow: "vous suit",
        NotificationDispute: "a ouvert un nouveau litige",
        NotificationDisputeClosed: "ce litige est clôturé",
        NotificationRefund: "a remboursé votre commande",
        NoticationOrderStatus: "L'état de la commande a été mis à jour, l'acheteur a été averti",
        NotificationNewOrder: "a effectué un achat",
        NoNotifications: "Aucune notification",
        WelcomeToYourPage: "Bienvenue sur votre page !",
        SearchForCategory: "Rechercher par catégorie",
        Moderators: "Modérateurs",
        CurrentModerators: "Modérateurs actuels",
        AddModerators: "Ajouter de nouveaux modérateurs",
        DeselectToRemoveModerator: "Désélectionnez les modérateurs que vous voulez supprimer",
        SelectToAddModerator: "Sélectionnez les modérateurs que vous voulez ajouter",
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
        Cases: "Affaires",
        Enter: "Entrer",
        Discover: "Découvrir",
        Block: "Bloquer",
        Unblock: "Débloquer",
        Blocked: "Bloqué",
        NoBlockedList: "Vous ne bloquez personne",
        Advanced: "Avancé",
        General: "Général",
        AllItems: "Tous les articles",
        DomesticShippingPrice: "Prix d'expédition nationale",
        InternationalShippingPrice: "Prix d'expédition internationale",
        MinimumIs: "Le minimum est",
        Title: "Titre",
        DigitalItem: "Article numérique",
        PhysicalItem: "Article physique",
        MinimumPrice: "Un montant minimal est nécessaire afin de couvrir les frais de transaction Bitcoin",
        DomesticShippingTime: "Délai d'expédition nationale",
        InternationalShippingTime: "Délai d'expédition internationale",
        DisplayNSFWcontent: "Afficher le contenu NSFW ?",
        Basic: "Général",
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
        On: "Activer",
        Off: "Désactiver",
        ClickToChange: "Cliquez pour changer",
        NotProvided: "Non renseigné",
        NotFollowingAnyone: "Aucun abonnement",
        NoFollowers: "Aucun abonné",
        NoReviews: "No reviews", //notTranslated
        Moderator: "Modérateur",
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Pare-feu",
        ServerSettings: "Paramètres du serveur",
        ReadOnly: "(Ce champ est en lecture seule)",
        HandleResolver: "Résolveur d'identifiant",
        ShutDownServer: "Arrêter le serveur",
        LoadingBitcoinPrices: "Chargement des prix Bitcoin...",
        ThisUserIsBlocked: "Cet utilisateur est masqué parce que vous l'avez bloqué",
        ThisUserIsNSFW: "Cet utilisateur est masqué parce que sa page est listée comme NSFW",
        ShowBlockedUser: "Voir la page de cet utilisateur en dehors des annonces NSFW",
        ShowNSFWContent: "Voir la page de cet utilisateur et toutes les annonces NSFW",
        ServerChangeWarningHeadline: "Attention: Enregistrez vos paramètres",
        ServerChangeWarning: "Nous vous recommandons de faire une copie de vos paramètres précédents, indiqués ci-dessous. Votre nom d'utilisateur et mot de passe précédents ne seront plus disponibles au-delà de ce point.",
        moderatorSettings: {
          DisputeResolution: "Résolution de litige",
          ServiceFee: "Frais de service",
          ServiceFeeNote: "Min: 0%, Max: 25%"
        },
        BecomeModerator: "Devenir modérateur",
        EditModerator: "Paramètres de modérateur",
        transactions: {
          OrderDetails: "Détails de la commande",
          ViewOnBlockchain: "Voir les détails",
          SoldBy: "Vendu par",
          PurchasedBy: "Acheté par",
          searchByOrder: "Rechercher par ID de commande ou par nom d'article",
          sortByStatusAll: "Tout",
          sortByStatus0: "Achat (paiement en attente)",
          sortByStatus1: "Prêt à traiter (entièrement payé)",
          sortByStatus2: "Confirmé / Expédié",
          sortByStatus3: "Terminé (paiement délivré)",
          sortByStatus4: "Litige",
          OrderID: "ID de la commande",
          OrderDate: "Date de la commande",
          OrderStatus: "État de la commande",
          OrderStatus0: "Achat (paiement en attente)",
          OrderStatus1: "Prêt à traiter (entièrement payé)",
          OrderStatus2: "Confirmé / Expédié",
          OrderStatus3: "Terminé (paiement délivré)",
          OrderStatus4: "Litige",
          OrderStatusopen: "Litige",
          OrderStatus5: "Litige clôturé",
          OrderStatusclosed: "Litige clôturé",
          OrderStatus6: "Litige finalisé",
          OrderStatus7: "Remboursé",
          InEscrow: "- Sous séquestre",
          OrderTotal: "Total de la commande",
          OrderTotalInBTC: "Total BTC",
          NoMessages: "Aucun message",
          PaymentProtection: "Protection de paiement",
          ShipTo: "Expédier à",
          ViewRating: "(Voir l'évaluation)",
          ContractDetails: "Détails du contrat",
          ConfirmOrder: "Confirmer cette commande",
          ReceivingAddress: "Adresse de réception",
          RecievingAddressPlaceholder: "L'adresse Bitcoin à laquelle vous recevrez le paiement",
          Comments: "Commentaires",
          CommentsPlaceHolder: "Commentaires sur la commandes",
          Shipper: "Article expédié par",
          ShipperPlaceholder: "Nom de l'entreprise expédiant l'article",
          TrackingNumber: "Numéro de suivi",
          TrackingNumberPlaceholder: "Numéro de suivi de cet article",
          EstimatedDelivery: "Délai de livraison estimé",
          EstimatedDeliveryPlaceholder: "Date estimée de la livraison de l'article",
          URL: "URL du fichier",
          URLPlaceholder: "Lien pour télécharger, planifier, ou plus d'informations",
          Password: "Mot de passe",
          PasswordPlaceholder: "Mot de passe requis pour le lien (optionnel)",
          DirectTransaction: "Transaction directe",
          ModeratedTransaction: "Transaction modérée",
          Seller: "Vendeur",
          Buyer: "Acheteur",
          Moderator: "Modérateur",
          transferReceipt: "Reçu de transfert",
          copyTxid: "copier l'ID de transaction",
          Close: "Fermer",
          FundOrder: "Financer la commande",
          sortByDateNewest: "Par date, les plus récents",
          sortByDateOldest: "Par date, les plus anciens",
          PayPurchase: "Payer cet achat",
          CompleteOrder: "Terminer cette commande",
          MarkAsShipped: "Marquer comme expédié",
          RateThisTransaction: "Noter cette transaction",
          TransactionReview: "Avis de transaction",
          OverallRating: "Note générale",
          Quality: "Qualité",
          MatchedDescription: "Conformité à l'annonce",
          DeliverySpeed: "Vitesse de livraison",
          CustomerService: "Service client",
          Review: "Avis",
          ReviewPlaceHolder: "Votre avis sur cette transaction",
          NoFileProvided: "Aucun fichier fourni",
          None: "Aucun",
          NoneSent: "Aucun avis envoyé",
          ModerationFee: "Frais de modération :",
          DisputeTransaction: "Initier un litige",
          sendMessagePlaceholder: "Écrivez votre message...",
          DisputeInstructions: "Afin de déposer un litige pour cette transaction, écrivez ci-dessous la raison du litige, et cliquez sur le bouton Initier un litige. Le modérateur interviendra dans votre discussion jusqu'à ce que le litige soit résolu. Le modérateur prendra la décision finale quant à savoir si les fonds doivent vous être retournés, et combien. Les frais du modérateur seront payés avec les fonds que vous avez déjà envoyés.",
          SendMessage: "Envoyer",
          CloseDispute: "Clôturer le litige",
          TotalInTransaction: "Transaction :",
          StartDisputeFlag: "LITIGE DÉMARRÉ",
          CloseDisputeFlag: "LITIGE CLÔTURÉ",
          PayoutOnlyBuyer: "La fermeture de ce litige retournera 100% des fonds à l'acheteur."
        },
        errorMessages: {
          saveError: "Impossible de sauvegarder les données.",
          getError: "Impossible de récupérer les données.",
          missingError: "Certains champs sont incorrects ou manquants.",
          serverError: "Une réponse incorrecte a été reçue du serveur.",
          userError: "Les informations pour cet ID sont introuvables",
          userNotFoundError: "Les informations de cette personne ne sont pas disponibles. Elles sont peut-être hors ligne.",
          notFoundError: "Les données ne peuvent pas être récupérées pour :",
          socketError: "L'URL pour WebSocket a échoué. Connexion au socket avec l'adresse par défaut de ws://localhost:18466",
          contractError: "Cet article ne peut pas être acheté",
          sellerError: "Le serveur du vendeur a rejeté la demande d'achat. Cela peut être dû à un problème de connexion.",
          checkPurchaseData: "Vérifiez vos données d'achat, telles que la quantité et l'adresse Bitcoin de remboursement, pour vous assurer que tout est conforme",
          pageUnavailable: "Cette page est actuellement indisponible.",
          badHandle: "L'identifiant que vous avez entré n'a pas un ID OpenBazaar valide",
          serverDown: "Le serveur a été arrêté",
          tooManyPhotosTitle: "Trop de photos",
          tooManyPhotosBody: "Toutes ou une partie de vos photos n'ont pas pu être mises en ligne parce que vous avez probablement dépassé la quantité maximale autorisée.",
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "<p>OpenBazaar est un réseau d’utilisateurs qui achètent et vendent directement entre eux des biens et services, en utilisant Bitcoin. Ce réseau est décentralisé et n’est pas contrôlé par une quelconque organisation.</p><p>Ce logiciel est open-source et sous licence MIT. Vous pouvez voir le code sur <a href=\"https://github.com/OpenBazaar/\">Github</a>.</p><p>OpenBazaar est un projet communautaire, et les participations sont les bienvenues sur notre cannal <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">Slack</a> ou sur notre <a href=\"http://www.reddit.com/r/openbazaar\">subreddit</a>.</p><p>Si vous avez besoin d’aide, lisez le   <a href=\"\">Tutoriel</a> d’OpenBazaar version 1.0.</p><p>Si vous avez encore des questions, créez une question sur notre <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\">centre d’aide</a>.</p>",
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "<p>Vous pouvez aider OpenBazaar de plusieurs manières afin de faciliter les échanges commerciaux libres et gratuits.</p><p>Acheter et vendre des biens et services sur le réseau aide la communauté à s’agrandir et rend la plateforme plus attractive pour de nouveaux utilisateurs. Demandez poliment à des commerces qui acceptent Bitcoin de vendre sur la plateforme afin de faire passer le mot et démontrez la demande pour des échanges pair à pair.</p><p>Si vous êtes un développeur, allez sur <a href=\"https://github.com/OpenBazaar/\">notre Github</a> et voyez où vous pouvez nous aider. En plus d’aider à coder, nous espérons que la nature open-source et sans permissions du projet vous donnera l’envie de construire de nouveaux services sur le réseau existant.</p><p>Vous pouvez également <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\">donner des Bitcoins</a> au projet, qui seront utilisés pour couvrir les frais des conférences, offrir des récompenses pour le développement, et promouvoir OpenBazaar.</p><p>Vous pouvez <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">rejoindre notre Slack</a> si vous avez de nouvelles idées pour OpenBazaar, ou si vous avez des questions sur le développement du logiciel.</p>",
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>",
        },
        saveMessages: {
          Saved: "Enregistrés",
          SaveSuccess: "Vos modifications ont été enregistrées."
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
          searchPlaceholder: "Tapez un @identifiant, OpenBazaar ID ou un #mot_clé...",
          myPage: "Ma page",
          testMode: "Mode de test",
          customizePage:"Personnaliser ma page",
          sellItem:"Nouveau",
          createListing:"Nouvelle annonce",
          purchases:"Achats",
          sales:"Ventes",
          cases:"Affaires",
          notifications:"Notifications",
          settings:"Paramètres",
          about:"À propos d'OpenBazaar",
          support:"Soutenir OpenBazaar",
          Forward: "Avancer",
          Back: "Reculer"
        },
        onboarding: {
          intro: "Configuration d'OpenBazaar",
          Introduction: "Présentation",
          IntroductionBody: "OpenBazaar est un marché social pair à pair, semblable à une fusion entre eBay&trade;, Twitter&trade; et BitTorrent. Ce projet est open-source et n'applique pas de frais ou de restrictions particulières. \n\n Veuillez noter que l’expérience d’utilisation peut être différente de celles que vous avez, essayez d’être patient pendant la phase de découverte.",
          Theme: "Sélectionner un thème pour votre page",
          chooseLanguage: "Sélectionner votre langue",
          contributors: "%{smart_count} Contributeur |||| %{smart_count} Contributeur",
          configure: "Configurez votre expérience",
          disclaimer_title: "Clause de non-responsabilité",
          disclaimer_body: "OpenBazaar est un réseau commercial de biens et services de personne à personne - utilisant Bitcoin - sans aucune organisation centrale exerçant une autorité sur la plate-forme. Cela signifie que vous êtes seul responsable de votre activité sur le réseau. \n\nLes utilisateurs d'OpenBazaar ne sont pas anonymes par défaut. La plupart des communications entre les partis sont chiffrées, mais les adresses IP sont publiques et peuvent être associées à une activité sur le réseau. Des partis malveillants pourraient utiliser ces informations contre vous ; protéger votre vie privée est votre propre responsabilité. \n\nLes utilisateurs d'OpenBazaar doivent respecter les lois de leur propre juridiction aussi bien que leur conscience. Les développeurs d'OpenBazaar ne tolèrent pas - et ne sont pas responsables -  de toute utilisation de la plate-forme à des fins illégales. \n\nLa communauté des développeurs d'OpenBazaar a travaillé sans relâche afin d'offrir une plate-forme commerciale libre et mondiale. Mais, comme avec tout logiciel, des bugs seront trouvés. Les développeurs ne sont pas responsables de toute perte monétaire associée à des problèmes dans le logiciel. \n\nEn utilisant OpenBazaar vous êtes seul responsable de vos actions sur le réseau d'OpenBazaar.",
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
          handle: "Identifiant",
          chooseHandle: "Choisissez un identifiant",
          knownAs: "Vous êtes actuellement connu comme :",
          wouldYou: "Voulez-vous enregistrer un identifiant facilement mémorisable ?",
          registerNew: "Enregistrer",
          recommended: "Pages recommandées à suivre",
          avatar: "Définir un avatar",
          chooseAvatar: "Sélectionner un avatar",
          discoverCallOut: "Explorez les annonces et les pages sur OpenBazaar",
          Finished: "Terminé"
        },
        softwareUpdate: {
          updateAvailable: "Mise à jour d'OpenBazaar disponible",
          installUpdate: "Installer la mise à jour",
          dismiss: "Refuser"
        },
        guidStillCreating: {
          HangTight: "Veuillez patienter quelques instants...",
          YourPersonal: "Vos clés personnelles et votre identifiant OpenBazaar sont en cours de création et devrait s'achever d'ici quelques secondes.\n\nVous serez automatiquement connecté au réseau d'OpenBazaar une fois la création terminée, alors tâchez d'être patient.",
          LookingFor: "Vous souhaitez patienter autrement ? Vous pouvez lire le <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">blog d'OpenBazaar</a>."
        },
        buyFlow: {
          PayForOrder: "Payer pour commander",
          NeedTempAddress: "J'ai besoin d'une adresse Bitcoin temporaire",
          NeedTempAddressHelper: "Veuillez mettre en favoris l'url de votre adresse Bitcoin temporaire",
          CantFindAddress: "Je ne trouve pas mon adresse Bitcoin",
          BitcoinWallet: "Portefeuille Bitcoin",
          ModeratedPaymentDescription: "Votre paiement est retenu dans un portefeuille sécurisé jusqu'à ce que le vendeur respecte les conditions de l'accord. Si des problèmes surviennent, un modérateur aidera.",
          ModeratorFeeHelper: "Le modérateur peut facturer des frais, mais uniquement en cas de litige.",
          ModeratedPayment: "Paiement modéré",
          DisputeFee: "Frais de litige",
          HaveWallet: "Avez-vous un portefeuille Bitcoin ?",
          QuickSetup: "La création d'un portefeuille ne prend que quelques minutes",
          CreateWallet: "Créer un portefeuille",
          DirectPaymentDescription: "Les fonds sont envoyés directement au vendeur. À utiliser pour un petit achat ou avec un vendeur de confiance.",
          DirectPayment: "Paiement direct",
          SendDirectlyTo: "Envoyer un paiement direct à %{handle}",
          MustAddAddress: "Vous devez ajouter une adresse pour expédier",
          VendorShipsTo: "Expédie vers",
          DoesNotShipHere: "N'expédie pas ici",
          Send: "Envoyer",
          BTCto: "BTC à",
          SendBTCtoAddress: "Envoyez %{amount} BTC à",
          OpenAddress: "Ouvrir dans le portefeuille local",
          CopyAddress: "Copier dans le presse-papier",
          RefreshPayment: "Actualiser l'état du paiement",
          summaryMsg1: "Votre paiement a été envoyé à %{recipient}",
          summaryMsg2: "Le temps de traitement prévu pour cette commande est de",
          summaryMsg3: "Vous pouvez vérifier l'état de votre commande sur votre",
          purchasesPage: "page d'achat",
          returnAddress: "Adresse de retour",
          moderatorPaymentDisclaimer: "Payé depuis le total si la transaction se termine par un litige.",
          directPaymentDisclaimer: "Utilisez le paiement direct avec prudence, les fonds sont irréversibles",
          paymentSent: "Paiement envoyé !",
          total: "Total"
        },
        chat: {
          noSearchResultsFound: "Aucun résultat trouvé"
        },
        serverConnectModal: {
          statusTooManyAttempts: "Trop de tentatives de connexion infructueuses",
          connecting: "Connexion",
          statusTryingToConnect: "Tentative de connexion à votre serveur",
          statusConnected: "Connecté",
          statusFailedConnection: "Impossible de se connecter à votre serveur",
          statusFailedAuthentication: "L'authentification a échoué",
          serverConfiguration: "Configuration du serveur",
          attempt: "Tentative",
          intro: "OpenBazaar est conçu de sorte à vous permettre d'héberger séparément votre serveur du client. Par défaut, le serveur sera exécuté localement, mais vous pouvez modifier cela avec les paramètres ci-dessous.",
          serverIP: "IP du serveur",
          restApiPort: "Port API REST",
          websocketApiPort: "Port API Websocket",
          heartbeatSocketApiPort: "Port socket Heartbeat",
          username: "Nom d'utilisateur",
          password: "Mot de passe",
          restoreDefaults: "Paramètres par défaut",
          saveChanges: "Enregistrer les modifications",
          retry: "Réessayer",
        }
      },

      {

        langName: "Română",
        langCode: "ro",

        /*

         Translator: @moldcraft
         02/28/2016: ~ 265 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "Următorul",
        IAgree: "Sunt de acord",
        Back: "Înapoi",
        EnterMessage: "Introduceți mesajul...",
        Recommended: "Recommended", //notTranslated
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "Sari peste",
        Done: "Efectuat",
        Status: "Status",
        Navigation: "Navigation", //notTranslated
        Cancel: "Anulare",
        Yes: "Da",
        No: "Nu",
        of: "din",
        Sell: "Vânzare",
        New: "Nou",
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "Excelent",
        Good: "Bun",
        Poor: "Prost",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: "Mesaj",
        Messages: "Mesaje",
        Store: "Magazin",
        Edit: "Modificare",
        Clone: "Clone", //notTranslated
        Used: "Folosit",
        Delete: "Ștergere",
        DontDelete: "Nu Ștergeți",
        ConfirmDelete: "Confirmați Ștergerea",
        Website: "Website",
        Guid: "OpenBazaar ID",
        Welcome: "Bun Venit",
        CreateStore: "Deveniți un Magazin",
        GoToMyPage: "Pagina Mea",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Căutare după nume sau cuvânt cheie",
        SearchFeedPlaceholder: "Căutare după nume sau OpenBazaar ID",
        SearchForFollowersPlaceholder: "Căutare după nume sau OpenBazaar ID",
        SearchForUsersPlaceholder: "Căutare după nume sau OpenBazaar ID",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "CUMPĂRAȚI ACUM",
        Description: "Descriere",
        Reviews: "Recenzii",
        Shipping: "Livrare",
        Addresses: "Adrese",
        Files: "Files", //notTranslated
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
        Change: "Change", //notTranslated
        SaveChanges: "Salvare Modificări",
        YourName: "Numele dvs.",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //not translated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "acum vă urmărește",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        FreeShipping: "Free Shipping", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        maxLength20: "max length 20 char", //not translated
        maxLength80: "max length 80 char", //not translated
        maxLength200: "max length 200 char", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
          SoldBy: "Seller", // not translated
          PurchasedBy: "Buyer", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Ready to process (Paid in full)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Ready to process (Paid in full)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "Serverul vânzătorului a respins cererea de cumpărare. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID", //notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>", //notTranslated
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "Pagina mea",
          testMode: "Test Mode", //notTranslated
          customizePage:"Customizare Pagină",
          sellItem:"Nou",
          createListing:"Listare Nouă",
          purchases:"Cumpărături",
          sales:"Vânzări",
          cases:"Cazuri",
          notifications:"Notificări",
          settings:"Setări",
          about:"Despre OpenBazaar",
          support:"Susținere OpenBazaar",
          Forward: "Forward", //notTranslated
          Back: "Înapoi"
        },
        onboarding: {
          intro: "Configurare OpenBazaar",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "Setați un Avatar",
          chooseAvatar: "Selectare Avatar",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection", //notTranslated
        }
      },

      {

        langName: "Russian",
        langCode: "ru",

        /*

         Translator: @Squirrel2020
         02/28/2016: ~ 194 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "Далее",
        IAgree: "Согласен",
        Back: "Назад",
        EnterMessage: "Ввести сообщение...",
        Recommended: "Recommended", //notTranslated
        Reload: "Обновить",
        You: "Вы",
        Skip: "Пропустить",
        Done: "Готово",
        Status: "Status",
        Navigation: "Навигация",
        Cancel: "Отмена",
        Yes: "Да",
        No: "Нет",
        of: "из",
        Sell: "Продать",
        New: "Новый",
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "Идеальное",
        Good: "Хорошее",
        Poor: "Плохое",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: "Сообщение",
        Messages: "Сообщений",
        Store: "Магазин",
        Edit: "Редактировать",
        Clone: "Clone", //notTranslated
        Used: "В употреблении",
        Delete: "Удалить",
        DontDelete: "Не удалять",
        ConfirmDelete: "Да, удалить",
        Website: "Веб-сайт",
        Guid: "OpenBazaar ID",
        Welcome: "Welcome",
        CreateStore: "Создать магазин",
        GoToMyPage: "Моя страница",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Поиск по имени или ключевому слову",
        SearchFeedPlaceholder: "Поиск по имени или OpenBazaar ID",
        SearchForFollowersPlaceholder: "Поиск по имени или OpenBazaar ID",
        SearchForUsersPlaceholder: "Поиск по имени или OpenBazaar ID",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "Купи сейчас",
        Description: "Описание",
        Reviews: "Отзывы",
        Shipping: "Доставка",
        Addresses: "Адреса",
        Files: "Files", //notTranslated
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
        Change: "Change", //notTranslated
        SaveChanges: "Применить",
        YourName: "Ваше имя",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //not translated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "подписан на вас",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "Дополнительно",
        General: "Общий",
        AllItems: "Все инструменты",
        FreeShipping: "Бесплатная доставка",
        DomesticShippingPrice: "Бесплатная доставка внутри страны",
        InternationalShippingPrice: "Международные цены доставки",
        MinimumIs: "Минимум",
        Title: "Название",
        DigitalItem: "Цифровой товар",
        PhysicalItem: "Физический товар",
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        maxLength20: "max length 20 char", //not translated
        maxLength80: "max length 80 char", //not translated
        maxLength200: "max length 200 char", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
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
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Всего заказов",
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "Сервер продавца отключил эту возможность. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Проверьте пожалуйста данные ваших покупок, такие как кол-во и адрес возврата Биткойнов, чтобы убедиться ", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID", //notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "о нас",
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "поддержка",
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>",
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "Моя страница",
          testMode: "Test Mode", //notTranslated
          customizePage:"Настроить страницу",
          sellItem:"Разместить товар",
          createListing:"Подать объявление",
          purchases:"Покупки",
          sales:"Продажи",
          cases:"История",
          notifications:"Уведомления",
          settings:"Настройки",
          about:"Об OpenBazaar",
          support:"Поддержка OpenBazaar",
          Forward: "Forward", //notTranslated
          Back: "Назад"
        },
        onboarding: {
          intro: "Конфигурация OpenBazaar",
          Introduction: "Ознакомление",
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "Поставить аватарку",
          chooseAvatar: "Выбрать аватарку",
          discoverCallOut: "Найти объявления и страницы на OpenBazaar",
          Finished: "Завершено"
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", // not translated
          directPaymentDisclaimer: "Будьте осторожны при отправке средств напрямую, средства невозвратимы",
          paymentSent: "Платёж отправлен!",
          total: "Всего"
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection", //notTranslated
        }
      },

      {

        langName: "Slovak",
        langCode: "sk",

        /*

         Translator: @michalvalasek
         02/28/2016: ~ 265 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "Ďalej",
        IAgree: "Súhlasím",
        Back: "Späť",
        EnterMessage: "Vložte správu...",
        Recommended: "Recommended", //notTranslated
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "Preskočiť",
        Done: "Hotovo",
        Status: "Status",
        Navigation: "Navigation", //notTranslated
        Cancel: "Zrušiť",
        Yes: "Áno",
        No: "Nie",
        of: "z",
        Sell: "Predať",
        New: "New",
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "Výborné",
        Good: "Dobré",
        Poor: "Nič moc",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: "Správa",
        Store: "Obchod",
        Edit: "Upraviť",
        Clone: "Clone", //notTranslated
        Used: "Použité",
        Delete: "Vymazať",
        DontDelete: "Nevymazávajte",
        ConfirmDelete: "Potvrďte vymazanie",
        Website: "Webstránka",
        Guid: "OpenBazaar ID",
        Welcome: "Vitajte",
        CreateStore: "Vytvorte si obchod",
        GoToMyPage: "Moja stránka",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Vyhľadať podľa mena alebo kľúčového slova",
        SearchFeedPlaceholder: "Vyhľadať podľa prezývky alebo OpenBazaar ID",
        SearchForFollowersPlaceholder: "Vyhľadať podľa prezývky alebo OpenBazaar ID",
        SearchForUsersPlaceholder: "Vyhľadať podľa prezývky alebo OpenBazaar ID",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "KÚPIŤ IHNEĎ",
        Description: "Popis",
        Reviews: "Hodnotenia zákazníkov",
        Shipping: "Doprava",
        Addresses: "Adresy",
        Files: "Files", //notTranslated
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
        Change: "Change", //notTranslated
        SaveChanges: "Uložiť zmeny",
        YourName: "Vaše meno",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //not translated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "vás od teraz sleduje",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        FreeShipping: "Free Shipping", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        maxLength20: "max length 20 char", //not translated
        maxLength80: "max length 80 char", //not translated
        maxLength200: "max length 200 char", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
          SoldBy: "Seller", // not translated
          PurchasedBy: "Buyer", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Ready to process (Paid in full)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Ready to process (Paid in full)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "Predajcov server odmietol žiadosť o nákup. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID", //notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>", //notTranslated
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "Moja stránka",
          testMode: "Test Mode", //notTranslated
          customizePage:"Upraviť stránku",
          sellItem:"Nová položka",
          createListing:"Nový listing",
          purchases:"Nákupy",
          sales:"Predaje",
          cases:"Prípady",
          notifications:"Notifikácie",
          settings:"Nastavenia",
          about:"O OpenBazaari",
          support:"Podporte OpenBazaar",
          Forward: "Forward", //notTranslated
          Back: "Späť"
        },
        onboarding: {
          intro: "Konfigurácia OpenBazaaru",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "Vložiť avatara",
          chooseAvatar: "Zvoliť avatara",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection", //notTranslated
        }
      },

      {

        langName: "Turkish",
        langCode: "tr",

        /*

         Translator: @Kahpecuce
         02/28/2016: ~ 259 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "Sonraki",
        IAgree: "Kabul ediyorum",
        Back: "Geri",
        EnterMessage: "İletinizi yazın...",
        Recommended: "Recommended", //notTranslated
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "Atla",
        Done: "Tamam",
        Status: "Status",
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
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "Çok iyi",
        Good: "İyi",
        Poor: "İyi değil",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: "İleti",
        Messages: "İletiler",
        Store: "Mağaza",
        Edit: "Düzenle",
        Clone: "Clone", //notTranslated
        Used: "Kullanılmış",
        Delete: "Sil",
        DontDelete: "Silme",
        ConfirmDelete: "Silmeyi Onayla",
        Website: "Websitesi",
        Guid: "OpenBazaar ID",
        Welcome: "Hoşgeldiniz",
        CreateStore: "Mağaza Oluşturun",
        GoToMyPage: "Sayfam",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Bir ad ya da anahtar sözcük Ara",
        SearchFeedPlaceholder: "Takma ad ya da OpenBazaar ID Ara",
        SearchForFollowersPlaceholder: "Takma ad ya da OpenBazaar ID Ara",
        SearchForUsersPlaceholder: "Takma ad ya da OpenBazaar ID Ara",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "Hemen Al",
        Description: "Tanım",
        Reviews: "Yorumlar",
        Shipping: "Gönderme",
        Addresses: "Adresler",
        Files: "Files", //notTranslated
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
        Change: "Change", //notTranslated
        SaveChanges: "Değişiklikleri Kaydet",
        YourName: "Adınız",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //not translated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "sizi takip etmeye başladı",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        maxLength20: "max length 20 char", //not translated
        maxLength80: "max length 80 char", //not translated
        maxLength200: "max length 200 char", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
          SoldBy: "Seller", // not translated
          PurchasedBy: "Buyer", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Ready to process (Paid in full)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Ready to process (Paid in full)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "Satıcının sunucusu alım talebini reddetti. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID", //notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>", //notTranslated
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "Sayfam",
          testMode: "Test Mode", //notTranslated
          customizePage:"Sayfayı Özelleştir",
          sellItem:"Yeni",
          createListing:"Yeni Öğe",
          purchases:"Alımlar",
          sales:"Satışlar",
          cases:"Olaylar",
          notifications:"Bildirimler",
          settings:"Ayarlar",
          about:"OpenBazaar Hakkında",
          support:"OpenBazaar'ı Destekle",
          Forward: "Forward", //notTranslated
          Back: "Geri"
        },
        onboarding: {
          intro: "OpenBazaar Yaplandırma",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "Avatar Ata",
          chooseAvatar: "Avatar Seç",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection", //notTranslated
        }
      },

      {

        langName: "Klingon",
        langCode: "klg",

        /*

         Translator: @drwasho
         02/28/2016: ~ 260 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "Veb",
        IAgree: "jIQochbe'",
        Back: "Chap",
        EnterMessage: "QIn 'el...",
        Recommended: "Recommended", //notTranslated
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "BuSHa'",
        Done: "PItlh",
        Status: "Status",
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
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "Chon",
        Good: "Maj",
        Poor: "VIvup",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: "QIn",
        Store: "NgevwI'",
        Edit: "ChoH",
        Clone: "Clone", //notTranslated
        Used: "WaH",
        Delete: "HoH",
        DontDelete: "Wej HoH",
        ConfirmDelete: "Qapla' HoH",
        Website: "'ej bebvo' Juh",
        Guid: "OpenBazaar ID",
        Welcome: "YI'el",
        CreateStore: "NgevwI' qach",
        GoToMyPage: "JuHwIj",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "Pong mu' joq nej",
        SearchFeedPlaceholder: "Ngaj pong nej ghap OpenBazaar ID",
        SearchForFollowersPlaceholder: "Ngaj pong nej ghap OpenBazaar ID",
        SearchForUsersPlaceholder: "Ngaj pong nej ghap OpenBazaar ID",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "MIllogh naked nuvpu'",
        BUYNOW: "DaH je'",
        Description: "Bang",
        Reviews: "YIqaw",
        Shipping: "NgeH Duj",
        Addresses: "SoQ",
        Files: "Files", //notTranslated
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
        Change: "Change", //notTranslated
        SaveChanges: "ChoH toD",
        YourName: "PonglIj'e'",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //not translated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "SoH tlha'",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        maxLength20: "max length 20 char", //not translated
        maxLength80: "max length 80 char", //not translated
        maxLength200: "max length 200 char", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
          SoldBy: "Seller", // not translated
          PurchasedBy: "Buyer", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Ready to process (Paid in full)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Ready to process (Paid in full)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "QuvHa' offer lajQo' loD 'Iv ngev. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID", //notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>", //notTranslated
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "JuHwIj",
          testMode: "Test Mode", //notTranslated
          customizePage:"JuHwIj choH",
          sellItem:"Chu'",
          createListing:"Chu' tetlh",
          purchases:"Je'",
          sales:"DIlmeH",
          cases:"Bo'DIj qaS",
          notifications:"GhuH",
          settings:"Bang",
          about:"Umqu' ghot OpenBazaar",
          support:"Qutlh OpenBazaar",
          Forward: "Forward", //notTranslated
          Back: "Chap"
        },
        onboarding: {
          intro: "OpenBazaar bang",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "MIllogh qab HIjmeH",
          chooseAvatar: "MIllogh qab wIv",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection", //notTranslated
        }
      },

      {

        langName: "中文",
        langCode: "zh-CN",

        /*

         Translators: Jingyi Yang | @saltduck
         03/02/2016: ~ 55 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "我已经有一个钱包",
        Next: "下一步",
        IAgree: "我同意",
        Back: "上一步",
        EnterMessage: "留言",
        Recommended: "建议",
        Reload: "刷新",
        You: "你",
        Skip: "跳过",
        Done: "完成",
        Status: "状态",
        Navigation: "导航",
        Cancel: "取消",
        ClosingOpenBazaar: "关闭(你的页面将处于离线状态)",
        Minimize: "最小化",
        Maximize: "最大化",
        Close: "关闭",
        Yes: "是",
        No: "否",
        of: "有关",
        Sell: "卖l",
        New: "新",
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "出色",
        Good: "完好",
        Poor: "较差",
        StillValidating: "你的简称正在验证中...",
        CheckStatus: "检查状态",
        ChangeCurrency: "改变货币",
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
        Followers: "被关注",
        Following: "关注中",
        FollowsYou: "关注你",
        Message: "留言",
        Store: "店铺",
        Edit: "编辑",
        Clone: "克隆",
        Used: "已用",
        Delete: "删除",
        DontDelete: "请不要删除",
        ConfirmDelete: "确认删除",
        Website: "网页",
        Guid: "OpenBazaar ID",
        Welcome: "欢迎",
        CreateStore: "开店铺",
        GoToMyPage: "我的主页",
        SearchForItemsPlaceholder: "输入 #games, #shoes 或任何 #标签...",
        SearchForPagesPlaceholder: "用名字或关键字查找",
        SearchFeedPlaceholder: "用简称或 OpenBazaar ID 查找",
        SearchForFollowersPlaceholder: "用简称或 OpenBazaar ID 查找",
        SearchForUsersPlaceholder: "用简称或 OpenBazaar ID 查找",
        SearchOnUserStorePlaceholder: "输入标题...",
        EstDeliveryDomesticPlaceholder: "3-5 个工作日",
        EstDeliveryInternationalPlaceholder: "7-15 工作日",
        OrderProcessingTimePlaceholder: "1-2 工作日",
        TermsAndConditionsPlaceholder: "输入合同条件.",
        TitlePlaceholder: "输入标题",
        DescriptionPlaceholder: "输入描述",
        ReturnPolicyPlaceholder: "输入退货方式",
        CategoryPlaceholder: "输入分类",
        CategoryHelperText: "分类 为您店铺里的商品作出归类和管理",
        KeywordsHelperText: "添加标签以便于被市场发现",
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
        PGPKey: "PGP Key", //not translated
        Signature: "PGP签名",
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "立即购买",
        Description: "描述",
        Reviews: "评价",
        Shipping: "物流",
        Addresses: "地址",
        Files: "Files", //notTranslated
        NewAddress: "新地址",
        CurrentAddress: "当前地址",
        Returns: "退货",
        ReturnsPolicy: "退货规则",
        Ampersand: "&",
        Tags: "标签",
        Keywords: "关键字",
        ShipsFrom: "发货地",
        ShipsTo: "发往",
        Optional: "可选",
        Customize: "个性化",
        Save: "保存",
        Changes: "更改",
        Change: "修改",
        SaveChanges: "保存更改",
        YourName: "您的姓名",
        BitcoinReturnAddress: "输入你的比特币地址",
        BitcoinReturnAddressPlaceholder: "退款至该地址",
        BitcoinReturnAddressInfo: "如果发生退款情形，款项需要发送到一个比特币地址。请提供你钱包中的一个地址：",
        LocalCurrency: "当地货币",
        TimeZone: "时区",
        ShipToName: "姓名",
        ShipToStreet: "地址",
        ShipToCity: "城市",
        ShipToState: "州/省市/地区",
        ShipToPostalCode: "邮编",
        PostalCode: "邮编",
        ShipToCountry: "国家",
        Notifications: "通知",
        Menu: "主菜单",
        Messages: "消息",
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
        Select: "选择",
        Social: "社交",
        Theme: "主题",
        Listing: "列表",
        Listings: "商品",
        ViewPage: "查看主页",
        Pages: "主页",
        Page: "主页",
        Language: "语言",
        Reset: "重置",
        Local: "本地",
        Domestic: "本国",
        Location: "地点",
        International: "国际",
        Time: "时间",
        Free: "免费",
        Category: "分类",
        ProcessingTime: "处理时间",
        SelectPhotos: "选择照片",
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
        NotificationPaymentSent: "款项已支付给",
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "你的订单已确认/发货",
        NotificationFollow: "在关注您",
        NotificationDispute: "已发起争议",
        NotificationDisputeClosed: "本次争议已关闭",
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
        NoNotifications: "无新消息",
        WelcomeToYourPage: "欢迎来到您的主页",
        SearchForCategory: "查找分类项目",
        Moderators: "仲裁员",
        CurrentModerators: "当前仲裁员",
        AddModerators: "添加新的仲裁员",
        DeselectToRemoveModerator: "反选您想要去掉的仲裁员",
        SelectToAddModerator: "选择您想要添加的仲裁员",
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
        Avatar: "头像",
        UploadAvatar: "上载头像",
        SaveAvatar: "保存头像",
        NewAvatar: "选择新的头像",
        NewCoverImage: "选择新的封面照片",
        Loading: "装载中...",
        Transactions: "交易记录",
        Purchases: "已买",
        Sales: "已卖",
        Cases: "事件",
        Enter: "Enter", //notTranslated
        Discover: "发现",
        Block: "屏蔽",
        Unblock: "取消屏蔽",
        Blocked: "屏蔽列表",
        NoBlockedList: "你目前没有屏蔽任何人.",
        Advanced: "高级",
        General: "通用",
        AllItems: "所有商品",
        DomesticShippingPrice: "国内运费",
        InternationalShippingPrice: "国际运费",
        MinimumIs: "最少",
        Title: "标题",
        DigitalItem: "数字商品",
        PhysicalItem: "实物商品",
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
        DomesticShippingTime: "国内货运时长",
        InternationalShippingTime: "国际货运时长",
        DisplayNSFWcontent: "显示成人内容?",
        Basic: "基本",
        Content: "内容",
        StandardThemes: "标准主题",
        NoPhotosAdded: "未添加照片",
        Summary: "汇总",
        Funds: "Funds", // not translated
        Discussion: "Discussion", // not translated
        Quantity: "数量",
        ShippingTo: "运往",
        ModeratedBy: "仲裁员为",
        Submit: "提交",
        maxLength20: "最多20个字符",
        maxLength80: "最多80个字符",
        maxLength200: "最多200个字符",
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "查找仲裁员",
        Contributors: "贡献者",
        Support: "支持",
        Licensing: "许可",
        On: "打开",
        Off: "关闭",
        ClickToChange: "点击以改变",
        NotProvided: "未提供",
        NotFollowingAnyone: "未关注任何人",
        NoFollowers: "没有人关注你",
        NoReviews: "没有客户评价",
        Moderator: "仲裁员",
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "防火墙",
        ServerSettings: "服务器设置",
        ReadOnly: "(这个字段是只读的)",
        HandleResolver: "简称解析器",
        ShutDownServer: "关闭服务器",
        LoadingBitcoinPrices: "正在载入比特币价格...",
        ThisUserIsBlocked: "该用户已隐藏，因为在你的屏蔽清单中",
        ThisUserIsNSFW: "该用户已隐藏，因为主页包含成人内容",
        ShowBlockedUser: "显示该用户的主页，剔除成人商品",
        ShowNSFWContent: "显示该用户的主页，包含成人商品",
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: {
          DisputeResolution: "争议处理",
          ServiceFee: "服务费率",
          ServiceFeeNote: "最低: 0%, 最高: 25%"
        },
        BecomeModerator: "成为仲裁员",
        EditModerator: "仲裁员设置",
        transactions: {
          OrderDetails: "订单详细内容",
          ViewOnBlockchain: "查看细节",
          SoldBy: "卖家",
          PurchasedBy: "买家",
          searchByOrder: "用订单ID或货物名称来检索",
          sortByStatusAll: "全部",
          sortByStatus0: "已下单",
          sortByStatus1: "待处理(已付全款)",
          sortByStatus2: "已确认/已发货",
          sortByStatus3: "已完成(款已支付给卖家)",
          sortByStatus4: "有争议",
          OrderID: "订单ID",
          OrderDate: "订单日期",
          OrderStatus: "订单状态",
          OrderStatus0: "已下单(未付款)",
          OrderStatus1: "待处理(已付全款)",
          OrderStatus2: "已确认/已发货",
          OrderStatus3: "已完成(款已支付给卖家)",
          OrderStatus4: "有争议",
          OrderStatusopen: "争议中",
          OrderStatus5: "争议已关闭",
          OrderStatusclosed: "争议已关闭",
          OrderStatus6: "争议终止",
          OrderStatus7: "已退款",
          InEscrow: "- 托管中",
          OrderTotal: "订单总计",
          OrderTotalInBTC: "BTC总计",
          NoMessages: "没有消息",
          PaymentProtection: "付款保护",
          ShipTo: "运往",
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "合同详情",
          HideDetails: "隐藏详情",
          ConfirmOrder: "确认订单",
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "备注",
          CommentsPlaceHolder: "订单的备注(如果有的话)",
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "预计运货天数",
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "口令",
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "直接交易",
          ModeratedTransaction: "仲裁交易",
          Seller: "卖家",
          Buyer: "买家",
          Moderator: "仲裁员",
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "关闭",
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "按日期排序(倒序)",
          sortByDateOldest: "按日期排序(正序)",
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "标记为已送达",
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "仲裁费:",
          DisputeTransaction: "发起争议",
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "发送",
          CloseDispute: "关闭争议",
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "启动争议",
          CloseDisputeFlag: "结束争议",
          PayoutOnlyBuyer: "关闭本次争议会将货款100%退回给买家."
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
          sellerError: "卖家的服务器拒绝了这笔买卖。这可能是由于连接故障导致。",
          checkPurchaseData: "请检查你的购买请求数据，比如数量、比特币退款地址等，确认它们是有效的。",
          pageUnavailable: "该页面现在无法访问.",
          badHandle: "你输入的简称没有对应的OpenBazaar ID",
          serverDown: "服务器已关闭",
          tooManyPhotosTitle: "照片过多",
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "",
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "",
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>",
        },
        saveMessages: {
          Saved: "已保存",
          SaveSuccess: "已保存更改"
        },
        discover: {
          searchDefaultText: "正在扫描你的网络",
          searchingText: "正在你的网络中检索",
          noResults: "你的网络中没有商品具有标签"
        },
        filters: {
          pagesAllTypes: "所有分类",
          pagesStores: "店铺",
          pagesMods: "仲裁员",
          pagesBasic: "普通用户",
          listingsCurated: "我关注的店家里找",
          listingsAll: "所有店家里找"
        },
        nav: {
          searchPlaceholder: "输入一个 @简称, OpenBazaar ID or #标签...",
          myPage: "我的主页",
          testMode: "测试模式",
          customizePage:"个性化主页",
          sellItem:"新品",
          createListing:"新条目",
          purchases:"已买记录",
          sales:"已卖纪录",
          cases:"事件记录",
          notifications:"通知",
          settings:"设置",
          about:"关于 OpenBazaar",
          support:"支持 OpenBazaar",
          Forward: "前进",
          Back: "后退"
        },
        onboarding: {
          intro: "OpenBazaar 布局",
          Introduction: "简介",
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
          theme: "选择主页主题",
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
          yourDescription: "描述",
          handle: "简称",
          chooseHandle: "选择一个简称",
          knownAs: "您目前的用户名是",
          wouldYou: "您想注册一个更易记的简称吗?",
          registerNew: "注册一个新的",
          recommended: "建议关注此网页",
          avatar: "设置一个头像",
          chooseAvatar: "选择头像",
          discoverCallOut: "在OpenBazaar中查找商品和主页",
          Finished: "已完成"
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar有新版本",
          installUpdate: "安装更新",
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "支付订单",
          NeedTempAddress: "我需要一个临时的比特币地址",
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "我找不到自己的比特币地址",
          BitcoinWallet: "比特币钱包",
          ModeratedPaymentDescription: "你支付的款项将存放在一个安全的钱包中，直到卖家履行完协定。如果有异议，仲裁员将会提供帮助。",
          ModeratorFeeHelper: "当且仅当发生争议时，仲裁员会收取一定费用",
          ModeratedPayment: "仲裁支付",
          DisputeFee: "仲裁费",
          HaveWallet: "你有比特币钱包吗?",
          QuickSetup: "创建一个钱包仅需几分钟",
          CreateWallet: "创建一个钱包",
          DirectPaymentDescription: "款项将直接支付给卖家。仅当金额较小或你信任卖家时选择该选项。",
          DirectPayment: "直接支付",
          SendDirectlyTo: "将款项直接支付给 %{简称}",
          MustAddAddress: "务必添加送货地址",
          VendorShipsTo: "此商家向以下国家/地区发货",
          DoesNotShipHere: "不向以下国家/地区发货",
          Send: "发送",
          BTCto: "BTC至",
          SendBTCtoAddress: "发送 %{amount} BTC 到",
          OpenAddress: "将地址在本地钱包里打开",
          CopyAddress: "将付款地址拷贝到粘贴册",
          RefreshPayment: "刷新付款进度",
          summaryMsg1: "您付的款已经被交到%{recipient}",
          summaryMsg2: "这笔订单预计完成时间为",
          summaryMsg3: "到此查看您订单的状况",
          purchasesPage: "已购商品",
          returnAddress: "Return Address", //notTranslated
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "请谨慎使用直接支付方式，这是不可逆的。",
          paymentSent: "支付指令已发送!",
          total: "总计"
        },
        chat: {
          noSearchResultsFound: "没有符合要求的结果"
        },
        serverConnectModal: {
          statusTryingToConnect: "正在尝试连接服务器",
          statusConnected: "已连接服务器",
          statusFailedConnection: "无法连接服务器",
          statusFailedAuthentication: "身份认证失败",
          statusTooManyAttempts: "登录失败次数过多",
          serverConfiguration: "服务器配置",
          connecting: "正在连接",
          intro: "OpenBazaar被设计为服务器与客户端是可分离的。默认情况下，服务器在本地运行，但你可以在这里修改配置。",
          serverIP: "服务器IP地址",
          restApiPort: "Rest API端口号",
          websocketApiPort: "Websocket API端口号",
          heartbeatSocketApiPort: "心跳socket端口号",
          username: "用户名",
          password: "口令",
          restoreDefaults: "恢复默认值",
          saveChanges: "保存修改",
          retry: "重新连接服务器",
        }
      },

      {

        langName: "한국어 (Korean)",
        langCode: "ko",

        /*

         Translator: @mpatc
         02/28/2016: ~ 261 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "다음",
        IAgree: "동의",
        Back: "뒤",
        EnterMessage: "메세지 입력...",
        Recommended: "Recommended", //notTranslated
        Reload: "Reload", //notTranslated
        You: "You", //notTranslated
        Skip: "거르다",
        Done: "끝난",
        Status: "Status",
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
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "훌륭한",
        Good: "줗은",
        Poor: "불량",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: "메시지",
        Messages: "메시지들",
        Store: "가게",
        Edit: "편집",
        Clone: "Clone", //notTranslated
        Used: "중고",
        Delete: "삭제",
        DontDelete: "삭제하지마",
        ConfirmDelete: "진짜삭제?",
        Website: "웹사이트",
        Guid: "오픈바자 ID",
        Welcome: "어서오세요!",
        CreateStore: "가게 만들기",
        GoToMyPage: "내 페이지",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "이름과 주제어 검색",
        SearchFeedPlaceholder: "핸들과 오픈바자 ID 검색",
        SearchForFollowersPlaceholder: "핸들과 오픈바자 ID 검색",
        SearchForUsersPlaceholder: "핸들과 오픈바자 ID 검색",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "스냅채트",
        BUYNOW: "지금 구매",
        Description: "설명",
        Reviews: "리뷰",
        Shipping: "배송",
        Addresses: "주소들",
        Files: "Files", //notTranslated
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
        Change: "Change", //notTranslated
        SaveChanges: "변경 사항 저장",
        YourName: "당신 이름",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "bitcoin address to return coins to", //not translated
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //not translated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "너를 팔로우하다",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "Advanced", // not translated
        General: "General", // not translated
        AllItems: "All Items", // not translated
        DomesticShippingPrice: "Domestic Shipping Price", // not translated
        InternationalShippingPrice: "International Shipping Price", // not translated
        MinimumIs: "Minimum is", // not translated
        Title: "Title", // not translated
        DigitalItem: "Digital Item", // not translated
        PhysicalItem: "Physical Item", // not translated
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        maxLength20: "max length 20 char", //not translated
        maxLength80: "max length 80 char", //not translated
        maxLength200: "max length 200 char", //not translated
        StoreModeratorsOptional: "Store Moderators (Optional)", // not translated
        Searchformoderators: "Search for moderators", // not translated
        Contributors: "Contributors", // not translated
        Support: "Support", // not translated
        Licensing: "Licensing", // not translated
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
          SoldBy: "Seller", // not translated
          PurchasedBy: "Buyer", // not translated
          searchByOrder: "Search by order id or item name", // not translated
          sortByStatusAll: "All", // not translated
          sortByStatus0: "Purchased", // not translated
          sortByStatus1: "Ready to process (Paid in full)", // not translated
          sortByStatus2: "Confirmed/Shipped", // not translated
          sortByStatus3: "Completed (Funds Released)", // not translated
          sortByStatus4: "Disputed", // not translated
          OrderID: "Order ID", // not translated
          OrderDate: "Order Date", // not translated
          OrderStatus: "Order Status", // not translated
          OrderStatus0: "Purchased (Not Funded)", // not translated
          OrderStatus1: "Ready to process (Paid in full)", // not translated
          OrderStatus2: "Confirmed/Shipped", // not translated
          OrderStatus3: "Completed (Funds Released)", // not translated
          OrderStatus4: "Disputed", // not translated
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Order Total", // not translated
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "판매자의 서버는 구매 요청을 거부했습니다. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid", //not translated
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID", //notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>", //notTranslated
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "내 페이지",
          testMode: "Test Mode", //notTranslated
          customizePage:"사용자 페이지",
          sellItem:"새로운",
          createListing:"새로운 제품",
          purchases:"주문 사항",
          sales:"팔다",
          cases:"사례",
          notifications:"공지",
          settings:"설정",
          about:"오픈바자 정보",
          support:"오픈바자 지원",
          Forward: "Forward", //notTranslated
          Back: "뒤"
        },
        onboarding: {
          intro: "오픈바자 구서",
          Introduction: "Introduction", //notTranslated
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "화신 설정",
          chooseAvatar: "화신 선택",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "Finished" //notTranslated
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          paymentSent: "Payment Sent!", //notTranslated
          total: "Total" //notTranslated
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection", //notTranslated
        }
      },

      {

        langName: "日本語 (Japanese)",
        langCode: "ja-JP",

        /*

         Translator: @ayalan
         02/28/2016: ~ 181 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "次へ",
        IAgree: "同意する",
        Back: "戻る",
        EnterMessage: "本文",
        Recommended: "Recommended", //notTranslated
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
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "極良質",
        Good: "良質",
        Poor: "まあまあ良い",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: "メッセージを送る",
        Messages: "メッセージ",
        Store: "ストア",
        Edit: "編集",
        Clone: "Clone", //notTranslated
        Used: "中古",
        Delete: "削除",
        DontDelete: "削除しない",
        ConfirmDelete: "削除する",
        Website: "ウェブサイト",
        Guid: "OpenBazaar ID",
        Welcome: "こんにちは",
        CreateStore: "出品する",
        GoToMyPage: "マイページ",
        SearchForItemsPlaceholder: "Type #games, #shoes or any #tag...", //notTranslated
        SearchForPagesPlaceholder: "商品名・キーワードで探す",
        SearchFeedPlaceholder: "OpenBazaar ID・ユーザ名で探す",
        SearchForFollowersPlaceholder: "OpenBazaar ID・ユーザ名で探す",
        SearchForUsersPlaceholder: "OpenBazaar ID・ユーザ名で探す",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "今すぐ購入する",
        Description: "商品の説明",
        Reviews: "レビュー",
        Shipping: "発送",
        Addresses: "住所",
        Files: "Files", //notTranslated
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
        Change: "Change", //notTranslated
        SaveChanges: "変更を保存",
        YourName: "氏名",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "返品用ビットコインアドレス",
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //notTranslated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "があなたをフォローしました",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "詳細設定",
        General: "一般設定",
        AllItems: "すべて",
        DomesticShippingPrice: "国内配送料",
        InternationalShippingPrice: "国際配送料",
        MinimumIs: "最小", // is this used?
        Title: "タイトル",
        DigitalItem: "デジタル製品",
        PhysicalItem: "品物", // check
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        On: "On", // not translated
        Off: "Off", // not translated
        ClickToChange: "Click to change", // not translated
        NotProvided: "not provided", // not translated
        NotFollowingAnyone: "Not following anyone", // not translated
        NoFollowers: "No followers", // not translated
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator", // not translated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: { // not translated
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee", // not translated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
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
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "注文合計",
          OrderTotalInBTC: "BTC Total", // not translated
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Payment Protection", // not translated
          ShipTo: "Ship To", // not translated
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Confirm Order", // not translated
          ReceivingAddress: "Receiving Address", // not translated
          RecievingAddressPlaceholder: "Bitcoin address to receive funds at", // not translated
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Item Shipped By", // not translated
          ShipperPlaceholder: "Name of the company shipping the item", // not translated
          TrackingNumber: "Tracking Number", // not translated
          TrackingNumberPlaceholder: "Tracking number of item", // not translated
          EstimatedDelivery: "Estimated Delivery", // not translated
          EstimatedDeliveryPlaceholder: "Estimated date item will be delivered", // not translated
          URL: "File URL", // not translated
          URLPlaceholder: "Link to download, schedule, or more information", // not translated
          Password: "Password", // not translated
          PasswordPlaceholder: "Password required for link (optional)", // not translated
          DirectTransaction: "Direct transaction", // not translated
          ModeratedTransaction: "Moderated transaction", // not translated
          Seller: "Seller", // not translated
          Buyer: "Buyer", // not translated
          Moderator: "Moderator", //not translated
          transferReceipt: "Transfer Receipt", // not translated
          copyTxid: "copy tx ID", // not translated
          Close: "Close", // not translated
          FundOrder: "Fund Order", // not translated
          sortByDateNewest: "By Date, Newest", // not translated
          sortByDateOldest: "By Date, Oldest", // not translated
          PayPurchase: "Pay for this Purchase", // not translated
          CompleteOrder: "Complete this Order", // not translated
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Rate this Transaction", // not translated
          TransactionReview: "Transaction Review", // not translated
          OverallRating: "Overall Rating", // not translated
          Quality: "Quality", // not translated
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Customer Service", // not translated
          Review: "Review", // not translated
          ReviewPlaceHolder: "Your review of this transaction", // not translated
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "出品者のサーバーは購入要求を拒否しました。. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Check your purchase data, such as quantity and Bitcoin refund address, to make sure it is valid",
          pageUnavailable: "This page is currently unavailable.",  //notTranslated
          badHandle: "The handle you entered does not have a valid OpenBazaar ID", //notTranslated
          serverDown: "The server has been shut down", //notTranslated
          tooManyPhotosTitle: "Too many photos", //notTranslated
          tooManyPhotosBody: "Some or all of your photos were prevented from being uploaded because you would exceeded the maximum allowable amount.", //notTranslated
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "", //notTranslated
          contributors: "<ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", //notTranslated
          support: "", //notTranslated
          licensing: "<ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>", //notTranslated
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
          searchPlaceholder: "Type a @handle, OpenBazaar ID or #tag...", //notTranslated
          myPage: "マイページ",
          testMode: "Test Mode", //notTranslated
          customizePage:"ページをカスタマイズ",
          sellItem:"出品する",
          createListing:"新しい商品を出品する",
          purchases:"購入済み",
          sales:"売り上げ",
          cases:"事例",
          notifications:"通知",
          settings:"設定",
          about:"OpenBazaarについて",
          support:"OpenBazaarをサポートする",
          Forward: "Forward", //notTranslated
          Back: "戻る"
        },
        onboarding: {
          intro: "OpenBazaarの設定",
          theme: "マイページのテーマを選択",
          chooseLanguage: "言語",
          IntroductionBody: "OpenBazaar is a peer-to-peer social market. It's like combining eBay&trade;, Twitter&trade; and BitTorrent into one. Only, there are no fees or restrictions and OpenBazaar is open-source. \n\n Please note that it may look and feel a bit different than what you're use to, so please be patient as you adjust.",
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
          avatar: "プロフィール画像",
          chooseAvatar: "プロフィール画像を選択",
          discoverCallOut: "Explore Listings and Pages on OpenBazaar", //notTranslated
          Finished: "完了"
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          summaryMsg2: "The expected processing time for this order is", //notTranslated
          summaryMsg3: "ご注文の状況はこちらで確認ができます",
          purchasesPage: "購入済み",
          returnAddress: "返品用アドレス",
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Use direct payment with caution, funds are irreversible", //notTranslated
          paymentSent: "送金しました！",
          total: "注文合計"
        },
        chat: {
          noSearchResultsFound: "No results found" //notTranslated
        },
        serverConnectModal: {
          statusTryingToConnect: "Trying to connect to your server", //notTranslated
          statusConnected: "Connected", //notTranslated
          statusFailedConnection: "Unable to connect to your server", //notTranslated
          statusFailedAuthentication: "Authentication failed", //notTranslated
          statusTooManyAttempts: "Too many failed login attempts", //notTranslated
          serverConfiguration: "Server Configuration", //notTranslated
          connecting: "Connecting", //notTranslated
          intro: "OpenBazaar is designed to allow you to host your server separate from the client. By default, your server will run locally, but you can override it below.", //notTranslated
          serverIP: "Server IP", //notTranslated
          restApiPort: "Rest API port", //notTranslated
          websocketApiPort: "Websocket API port", //notTranslated
          heartbeatSocketApiPort: "Heartbeat socket port", //notTranslated
          username: "Username", //notTranslated
          password: "Password", //notTranslated
          restoreDefaults: "Restore defaults", //notTranslated
          saveChanges: "Save Changes", //notTranslated
          retry: "Retry connection", //notTranslated
        }
      },

      {

        langName: "Polski",
        langCode: "pl",

        /*

         Translator: @Mido
         02/28/2016: ~ 95 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "I have a Wallet now", //notTranslated
        Next: "Dalej",
        IAgree: "Zgadzam się",
        Back: "Wróć",
        EnterMessage: "Wprowadź tekst...",
        Recommended: "Recommended", //notTranslated
        Reload: "Odśwież",
        You: "Ja",
        Skip: "Pomiń",
        Done: "Gotowe",
        Status: "Status",
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
        HighlightToStyle: "Highlight text to style", //notTranslated
        Excellent: "Doskonały",
        Good: "W dobrym stanie",
        Poor: "W złym stanie",
        StillValidating: "Your handle is still validating", //notTranslated
        CheckStatus: "Check Status", //notTranslated
        ChangeCurrency: "Change currency", //notTranslated
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
        FollowsYou: "Follows You", //notTranslated
        Message: "Wiadomość",
        Messages: "Wiadomości",
        Store: "Sklep",
        Edit: "Edytuj",
        Clone: "Clone", //notTranslated
        Used: "Użyte",
        Delete: "Usuń",
        DontDelete: "Nie usuwaj",
        ConfirmDelete: "Potwierdź usunięcie",
        Website: "Strona",
        Guid: "OpenBazaar ID",
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
        Signature: "PGP Signature", //not translated
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "Kup teraz",
        Description: "Opis",
        Reviews: "Opinie",
        Shipping: "Wysyłka",
        Addresses: "Adresy",
        Files: "Files", //notTranslated
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
        Change: "Change", //notTranslated
        SaveChanges: "Zapisz wprowadzone zmiany",
        YourName: "Twoje imię",
        BitcoinReturnAddress: "Enter your Bitcoin Address", //notTranslated
        BitcoinReturnAddressPlaceholder: "Wprowadź adres BTC...",
        BitcoinReturnAddressInfo: "If a refund is issued, the funds will need to be sent to a Bitcoin address. Please provide an address to your Wallet below.", //notTranslated
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
        NotificationPaymentSent: "Payment was sent to", //notTranslated
        NotificationOrderFor: "placed an order for", //notTranslated
        NotificationOrderConfirmed: "Your order has been confirmed/shipped", //notTranslated
        NotificationFollow: "zaczął cię obserować!",
        NotificationDispute: "has opened a dispute", //not translated
        NotificationDisputeClosed: "this dispute is closed", //not translated
        NotificationRefund: "has refunded your order", //not translated
        NoticationOrderStatus: "Order status updated, buyer notified", //notTranslated
        NotificationNewOrder: "has made a purchase", //not translated
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
        NoBlockedList: "You are not currently blocking anyone.", // not translated
        Advanced: "Zaawansowane",
        General: "Ogólne",
        AllItems: "Wszystkie przedmioty",
        DomesticShippingPrice: "Koszt wysyłki krajowej",
        InternationalShippingPrice: "Koszt wysyłki międzynarodowej",
        MinimumIs: "Minimum to",
        Title: "Tytuł",
        DigitalItem: "Przedmiot cyfrowy",
        PhysicalItem: "Przedmiot fizyczny",
        MinimumPrice: "A minimum is necessary to ensure Bitcoin transaction costs are covered", //notTranslated
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
        On: "Włączony",
        Off: "Wyłączony",
        ClickToChange: "Kliknij, by zmienić",
        NotProvided: "niezapewniane",
        NotFollowingAnyone: "Brak obserwowanych",
        NoFollowers: "Brak obserwujących",
        NoReviews: "No reviews", //notTranslated
        Moderator: "Moderator",//notTranslated
        ActiveStore:"Store is Active", // not translated
        ActiveStoreDetails: "Inactive stores and listings are not visible to other people", //not translated
        Firewall: "Firewall", //notTranslated
        ServerSettings: "Server Settings", //notTranslated
        ReadOnly: "(This Field is Read Only)", //notTranslated
        HandleResolver: "Handle Resolver",  // not translated
        ShutDownServer: "Shut Down the Server",  // not translated
        LoadingBitcoinPrices: "Loading Bitcoin Prices...", // not translated
        ThisUserIsBlocked: "This user is hidden because they are on your blocked list", // not translated
        ThisUserIsNSFW: "This user is hidden because their page is listed as NSFW", // not translated
        ShowBlockedUser: "Show this user's page except for NSFW listings", // not translated
        ShowNSFWContent: "Show this user's page, and all NSFW listings", // not translated
        ServerChangeWarningHeadline: "Caution: Record Your Settings", // not translated
        ServerChangeWarning: "We recommend you make a copy of your previous settings, shown below. Your previous username and password will no longer be available beyond this point.", // not translated
        moderatorSettings: {
          DisputeResolution: "Dispute Resolution", //notTranslated
          ServiceFee: "Service fee",//notTranslated
          ServiceFeeNote: "Min: 0%, Max: 25%"//notTranslated
        },
        BecomeModerator: "Become a Moderator",//notTranslated
        EditModerator: "Moderator Settings",//notTranslated
        transactions: {
          OrderDetails: "Order Details", //notTranslated
          ViewOnBlockchain: "View Details", //noTranslated
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
          OrderStatusopen: "Disputed", // not translated
          OrderStatus5: "Dispute Closed", // not translated
          OrderStatusclosed: "Dispute Closed", // not translated
          OrderStatus6: "Dispute Finalized",// not translated
          OrderStatus7: "Refunded", // not translated
          InEscrow: "- In Escrow", // not translated
          OrderTotal: "Do zapłaty",
          OrderTotalInBTC: "Łącznie (BTC)",
          NoMessages: "No messages", //notTranslated
          PaymentProtection: "Ubezpieczenie płatności",
          ShipTo: "Wysyłka do",
          ViewRating: "(View Rating)", // not translated
          ContractDetails: "Contract Details", //notTranslated
          HideDetails: "Hide Details", //notTranslated
          ConfirmOrder: "Potwierdź to zamówienie",
          ReceivingAddress: "Adres odbiorczy",
          RecievingAddressPlaceholder: "Adres portfela, na którzy otrzymasz płatność",
          Comments: "Comments", // not translated
          CommentsPlaceHolder: "Comments on this order", // not translated
          Shipper: "Wysłane przez",
          ShipperPlaceholder: "Firma przesyłkowa",
          TrackingNumber: "Numer śledzenia",
          TrackingNumberPlaceholder: "Numer śledzenia przesyłki",
          EstimatedDelivery: "Przybliżona wysyłka",
          EstimatedDeliveryPlaceholder: "Przybliżony czas dostarczenia",
          URL: "File URL",
          URLPlaceholder: "Link do pobrania, harmonogramu lub innych informacji",
          Password: "Hasło",
          PasswordPlaceholder: "Hasło zabezpieczające link (opcjonalne)",
          DirectTransaction: "Transakcja bez pośredników",
          ModeratedTransaction: "Transakcja nadzorowana",
          Seller: "Sprzedawca",
          Buyer: "Kupujący",
          Moderator: "Moderator", //not translated
          transferReceipt: "Dowód transakcji",
          copyTxid: "Kopiuj numer transakcji",
          Close: "Zamknij",
          FundOrder: "Zapłać",
          sortByDateNewest: "Od najnowszych",
          sortByDateOldest: "Od najstarszych",
          PayPurchase: "Zapłać",
          CompleteOrder: "Sfinalizuj zamówienie",
          MarkAsShipped: "Mark as Shipped", // not translated
          RateThisTransaction: "Oceń transakcję",
          TransactionReview: "Opinia o transakcji",
          OverallRating: "Średnia ocen",
          Quality: "Jakość",
          MatchedDescription: "Matched Description", // not translated
          DeliverySpeed: "Delivery Speed", // not translated
          CustomerService: "Obsługa klienta",
          Review: "Oceń",
          ReviewPlaceHolder: "Twoja opinia o tej transakcji",
          NoFileProvided: "No file provided", //notTranslated
          None: "None", //notTranslated
          NoneSent: "None sent", // not translated
          ModerationFee: "Moderation Fee:", // not translated
          DisputeTransaction: "Start a Dispute", // not translated
          sendMessagePlaceholder: "Enter message...", // not translated
          DisputeInstructions: "To file a dispute for this transaction, type the reason for the dispute below, and check the Start a Dispute box. This will include the moderator in your conversation until the dispute is resolved. The moderator will make the final decision as to whether any funds are returned to you, and how much. The moderator's fee will be paid out of the funds you have already sent.", //not translated
          SendMessage: "Send",// not translated
          CloseDispute: "Close Dispute",// not translated
          TotalInTransaction: "Transaction:", // not translated
          StartDisputeFlag: "START DISPUTE", // not translated
          CloseDisputeFlag: "END DISPUTE", // not translated
          PayoutOnlyBuyer: "Closing this dispute will return 100% of the funds to the buyer." // not translated
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
          sellerError: "Serwer sprzedawcy odrzucił płatność. This may be due to a connection issue.", // not translated
          checkPurchaseData: "Upewnij się, że wprowadziłeś poprawne dane. Sprawdź stan konta oraz adresu zwrotów.",
          pageUnavailable: "This page is currently unavailable."  //notTranslated
        },
        aboutSection: {
          about: "<p>OpenBazaar to sieć osób, które kupują i sprzedają dobra oraz usługi bez pośredników, przy użyciu Bitcoina. Sieć ta jest zdecentralizowana i nie podlega żadnej organizacji.</p><p>Oprogramowanie jest otwarte, udostępniane na licencji MIT. Kod dostępny jest na <a href=\"https://github.com/OpenBazaar/\">Githubie</a>.</p><p>OpenBazaar jest projektem społeczośniowym i zachęcamy do wejścia na nasz kanał <a href=\"https://openbazaar-slackin -drwasho.herokuapp.com/\">Slack</a> lub odwiedzenia naszego <a href=\"http://www.reddit.com/r/openbazaar\">subreddita</a>.</p><p>Jeśli potrzebujesz pomocy, przeczytaj <a href=\"\">poradnik</a> do OpenBazaar w wersji 1.0.</p><p>Jeśli nadaj masz jakieś pytania, kliknij <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\">tutaj</a>.</p>",
          contributors: "<p>OpenBazaar jest rozwijany przez międzynarodową społeczność, złożoną zarówno z deweloperów, jak i wolontariuszy, którzy poświęcają swój czas, by uczynić handel wolnym. Oto niepełna lista osób, które wsparły projekt poprzez pisanie kodu lub inny rodzaj uczestnictwa.</p><ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li><li>Michał Pado</li></ul>",
          support: "<p>Możesz wesprzeć OpenBazaar na wiele sposobów, by wspomóc nas w naszej misji.</p><p>Kupowanie i sprzedawanie dóbr i usług przyczynia się do powiększenia naszej społeczności, a to z kolei zwiększa atrakcyjność platformy w oczach potencjalnych nowych użytkowników. Uprzejme prośby (kierowane do sprzedawców) o akceptację płatności w Bitcoinie za pośrednictwem naszej platformy pomaga docierać do kolejnych osób i pokazuje, że jest zapotrzebowanie na handel P2P.</p><p>Jeśli jesteś programistą, odwiedź naszego <a href=\"https://github.com/OpenBazaar/\">Githuba</a> i zobacz, czy może nie ma czegoś, w czym mógłbyś nam pomóc. Oprócz pomocy z kodem źrodłowym mamy nadzieję, liberalna natura projektu zachęci was do tworzenia nowych usług bazujących na istniejącej sieci.</p><p>Możesz również <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\">wspomóc nas finansowo</a>. Środki zostaną wykorzystane na pokrycie kosztów związanych z konferencjami, programem Bug Bounty oraz promocją //bounties.</p><p><a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">Dołącz do naszego Slacka</a>, jeśli masz jakieś pomysły związane z projektem lub chciałbyś o coś zapytać deweloperów.</p>",
          licensing: "<p>OpenBazaar to otwarte oprogramowanie oparte na licencj MIT. To liberalna licencja, zezwala pozwala na wykorzystanie kodu przy innych otwartych projektach, jak i projektach prawnie zastrzeżonych. Pełna treść licencji dostępna jest pod poniższym linkiem.</p><h4>The MIT License (MIT)</h4><h5>Copyright &#169 2016 OpenBazaar Developers</h5><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p><h4>Libraries</h4><p>The following libraries are used in OpenBazaar:</p><ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>",
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
          testMode: "Test Mode", //notTranslated
          customizePage:"Dostosuj stronę",
          sellItem:"Nowy",
          createListing:"Utwórz pozycję",
          purchases:"Kupione",
          sales:"Sprzedane",
          cases:"Sprawy",
          notifications:"Powiadomienia",
          settings:"Ustawienia",
          about:"O projekcie",
          support:"Wspomóż projekt",
          Forward: "Dalej",
          Back: "Wróć"
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
          avatar: "Ustaw avatar",
          chooseAvatar: "Wybierz avatar",
          discoverCallOut: "Odkrywaj produkty i strony na OpenBazaar",
          Finished: "Gotowe"
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar Update Available", //notTranslated
          installUpdate: "Install Update", //notTranslated
          dismiss: "Dismiss" //notTranslated
        },
        guidStillCreating: {
          HangTight: "Hang tight for a few...", //notTranslated
          YourPersonal: "Your personal keys and OpenBazaar ID are generating and should only take about 30 seconds to finish.\n\nYou'll be automatically connected to the network once the process is finished, so please hang tight.", //notTranslated
          LookingFor: "Looking for something to do in the meantime? Read the <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar blog</a>." //notTranslated
        },
        buyFlow: {
          PayForOrder: "Pay for Order", //notTranslated
          NeedTempAddress: "I need a temporary Bitcoin address", //notTranslated
          NeedTempAddressHelper: "Please bookmark the url to your temporary bitcoin address", //notTranslated
          CantFindAddress: "I can't find my bitcoin address", //notTranslated
          BitcoinWallet: "Bitcoin Wallet", //notTranslated
          ModeratedPaymentDescription: "Your payment is held in a secure wallet until the seller completes their end of the agreement. If issues arise, a Moderator will help.", //notTranslated
          ModeratorFeeHelper: "The moderator may charge a fee, but only if a dispute arises.", //notTranslated
          ModeratedPayment: "Moderated Payment", //notTranslated
          DisputeFee: "Dispute fee", //notTranslated
          HaveWallet: "Do you have a Bitcoin Wallet?", //notTranslated
          QuickSetup: "It only takes a few minutes to set one up", //notTranslated
          CreateWallet: "Create a Wallet", //notTranslated
          DirectPaymentDescription: "Funds are sent directly to the seller. Only use on small purchases or when purchasing from a trusted seller.", //notTranslated
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
          moderatorPaymentDisclaimer: "Paid from the total if the transaction ends in a dispute.", //notTranslated
          directPaymentDisclaimer: "Korzystaj z płatności bezpośredniej ostrożnie; środki nie są zwracane",
          paymentSent: "Dokonano płatności!",
          total: "Suma"
        }
      },

      {

        langName: "Dansk",
        langCode: "da",

        /*

         Translator: @pryds
         02/28/2016: ~ 49 untranslated strings

         Use capitalized keys for widely reused text that must be capitalized

         */

        IHaveAWalletNow: "Nu har jeg en tegnebog",
        Next: "Næste",
        IAgree: "Jeg er enig",
        Back: "Tilbage",
        EnterMessage: "Indtast besked…",
        Recommended: "Anbefalet",
        Reload: "Genindlæs",
        You: "Dig",
        Skip: "Spring over",
        Done: "Færdig",
        Status: "Status",
        Navigation: "Navigering",
        Cancel: "Annullér",
        ClosingOpenBazaar: "Luk (din side vil gå offline)",
        Minimize: "Minimér",
        Maximize: "Maksimér",
        Close: "Luk",
        Yes: "Ja",
        No: "Nej",
        of: "af",
        Sell: "Sælg",
        New: "Ny",
        Excellent: "Fremragende",
        Good: "God",
        Poor: "Dårlig",
        StillValidating: "Dit brugernavn valideres stadig",
        CheckStatus: "Tjek status",
        ChangeCurrency: "Ændr valuta",
        SKU: "Varenr.",
        Refurbished: "Renoveret",
        Physical: "Fysisk",
        Digital: "Digital",
        Service: "Serviceydelse",
        Visit: "Vis",
        Item: "Vare",
        Items: "Varer",
        Stores: "Butikker",
        Follow: "Følg",
        Feed: "Feed",
        FeedPlaceholder: "Et feed med opdateringer fra alle de sider, du følger",
        ViewListing: "Vis listning",
        Unfollow: "Følg ikke",
        About: "Om",
        NoDescriptionAdded: "Ingen beskrivelse tilføjet",
        NoListings: "Ingen listninger",
        CoverPhoto: "Coverbillede",
        AboutEmpty: "Om er ikke udfyldt…",
        Followers: "Følgere",
        Following: "Følger",
        FollowsYou: "Følger dig",
        Message: "Besked",
        Messages: "Beskeder",
        Store: "Butik",
        Edit: "Redigér",
        Clone: "Klon",
        Used: "Brugt",
        Delete: "Slet",
        DontDelete: "Slet ikke",
        ConfirmDelete: "Bekræft sletning",
        Website: "Websted",
        Guid: "OpenBazaar-ID",
        Welcome: "Velkommen",
        CreateStore: "Opret en butik",
        GoToMyPage: "Min side",
        SearchForItemsPlaceholder: "Skriv #games, #shoes eller et andet #tag…",
        SearchForPagesPlaceholder: "Søg efter navn eller nøgleord",
        SearchFeedPlaceholder: "Indtast et nøgleord…",
        SearchForFollowersPlaceholder: "Indtast et navn…",
        SearchForUsersPlaceholder: "Indtast et navn…",
        SearchOnUserStorePlaceholder: "Indtast en titel…",
        EstDeliveryDomesticPlaceholder: "3-5 hverdage",
        EstDeliveryInternationalPlaceholder: "7-15 hverdage",
        OrderProcessingTimePlaceholder: "Indtast den tid, der er behov for, for at håndtere ordren",
        TermsAndConditionsPlaceholder: "Indtast betingelser og vilkår…",
        TitlePlaceholder: "Indtast titel",
        DescriptionPlaceholder: "Indtast beskrivelse…",
        ReturnPolicyPlaceholder: "Indtast returpolitik…",
        CategoryPlaceholder: "Indtast kategori",
        CategoryHelperText: "Kategorier bruges til at gruppere og organisere varer i din butik.",
        KeywordsHelperText: "Tilføjelse af tags hjælper med at gøre din vare synlig i markedet.",
        ExpirationDateHelperText: "Sæt en dato, hvor din vare automatisk bliver fjernet fra din butik.",
        ClearExpirationDate: "Ryd udløbsdato",
        ReturnPolicy: "Returret",
        TermsAndConditions: "Betingelser og vilkår",
        Photos: "Billeder",
        Added: "Tilføjet",
        Categorization: "Kategorisering",
        Expiration: "Udløb",
        Search: "Søg",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "PGP-nøgle",
        Signature: "PGP-signatur",
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "Køb nu",
        Description: "Beskrivelse",
        Reviews: "Anmeldelser",
        Shipping: "Forsendelse",
        Addresses: "Adresser",
        Files: "Filer",
        NewAddress: "Ny adresse",
        CurrentAddress: "Aktuelle adresser",
        Returns: "Returret",
        ReturnsPolicy: "Returpolitik",
        Ampersand: "&",
        Tags: "Tags",
        Keywords: "Nøgleord",
        ShipsFrom: "Afsendes fra",
        ShipsTo: "Sendes til",
        Optional: "Valgfri",
        Customize: "Tilpas",
        Save: "Gem",
        Change: "Ændr", // a verb, to change something. This is used on buttons.
        Changes: "Ændringer",
        SaveChanges: "Gem ændringer",
        YourName: "Dit navn",
        BitcoinReturnAddress: "Indtast din Bitcoin-adresse",
        BitcoinReturnAddressPlaceholder: "Indtast Bitcoin-adresse…",
        BitcoinReturnAddressInfo: "Hvis en returnering godkendes, skal pengene sendes til en Bitcoin-adresse. Angiv venligst en adresse i din tegnebog herunder.",
        LocalCurrency: "Lokal valuta",
        TimeZone: "Tidszone",
        ShipToName: "Navn",
        ShipToStreet: "Gade",
        ShipToCity: "By",
        ShipToState: "Stat/Provins/Region",
        ShipToPostalCode: "Postnummer",
        PostalCode: "Postnummer",
        ShipToCountry: "Land",
        EnableNotifications: "Aktivér notifikationer",
        EnableSSL: "Aktivér SSL",
        LibbitcoinServerAddress: "Libbitcoin serveradresse",
        ServerIPPort: "Server IP:Port",
        All: "Alle",
        Name: "Navn",
        Price: "Pris",
        Available: "Tilgængelig",
        Type: "Type",
        Condition: "Stand",
        NSFW: "18+ (voksenindhold)",
        Select: "Vælg",
        Social: "Social",
        Theme: "Tema",
        Listing: "Listning",
        Listings: "Listninger",
        ViewPage: "Vis side",
        Pages: "Sider",
        Page: "Side",
        Language: "Sprog",
        Reset: "Nulstil",
        Local: "Lokal",
        Domestic: "Indenlands",
        Location: "Lokation",
        International: "International",
        Time: "Tid",
        Free: "Gratis",
        Category: "Kategori",
        ProcessingTime: "Håndteringstid",
        SelectPhotos: "Vælg billeder",
        DragOrUploadPhotos: "Træk eller upload billeder",
        ExpirationDate: "Udløber",
        UploadCoverPhoto: "Upload et coverbillede",
        ShortDescription: "Kort beskrivelse",
        UpTo140Characters: "Op til 140 tegn",
        PrimaryColor: "Primær farve",
        SecondaryColor: "Sekundær farve",
        TextColor: "Tekstfarve",
        CoverPhotoButton: "Vælg coverbillede",
        AboutPlaceholder: "Fuld beskrivelse",
        BackgroundColor: "Baggrundsfarve",
        NotificationPaymentSent: "Betaling blev sendt til",
        NotificationOrderFor: "lagde en ordre på",
        NotificationOrderConfirmed: "Din ordre er blevet bekræftet/afsendt",
        NotificationFollow: "følger nu dig",
        NotificationDispute: "har åbnet en ny uenighed",
        NotificationDisputeClosed: "denne uenighed er lukket",
        NotificationRefund: "har refunderet din ordre",
        NoticationOrderStatus: "Ordrestatus opdateret; køber notificeret",
        NotificationNewOrder: "har gjort et køb",
        NoNotifications: "Ingen notifikationer",
        WelcomeToYourPage: "Velkommen til din side!",
        SearchForCategory: "Søg efter kategori",
        Moderators: "Moderatorer",
        CurrentModerators: "Aktuelle moderatorer",
        AddModerators: "Tilføj nye moderatorer",
        DeselectToRemoveModerator: "Afmarkér de moderatorer, du vil fjerne",
        SelectToAddModerator: "Markér de moderatorer, du vil tilføje",
        Categories: "Kategorier",
        UpTo3: "Op til 3",
        AboutYourStore: "En beskrivelse af din butik",
        PaymentType: "Betalingstype",
        ShipTo: "Send til",
        FreeShipping: "Gratis forsendelse",
        OrderDetails: "Ordredetaljer",
        OrderSummary: "Ordreopsummering",
        AllListings: "Alle listninger",
        ComingSoon: "Kommer snart",
        PaymentPending: "Betaling afventer",
        FinalizePurchase: "Færdiggør køb",
        LoadingImage: "Indlæser billede…",
        UploadAvatar: "Vælg avatar",
        SaveAvatar: "Gem avatar",
        NewAvatar: "Vælg ny avatar",
        NewCoverImage: "Vælg nyt coverbillede",
        Loading: "Indlæser…",
        Purchases: "Køb",
        Sales: "Salg",
        Cases: "Sager",
        Enter: "Gå ind", // this is used on a button in a tooltip asking if users want to look at the Discover section. In this context it means "Go inside" or "Go to this place"
        Discover: "Opdagelse",
        Block: "Blokér",
        Unblock: "Afblokér",
        Blocked: "Blokeret",
        NoBlockedList: "Du blokerer ikke nogen p.t.",
        Advanced: "Avanceret",
        General: "Generelt",
        AllItems: "Alle varer",
        DomesticShippingPrice: "Indenlands forsendelsespris",
        InternationalShippingPrice: "International forsendelsespris",
        MinimumIs: "Minimum er",
        Title: "Titel",
        DigitalItem: "Digital vare",
        PhysicalItem: "Fysisk vare",
        MinimumPrice: "Det er nødvendigt med et minimum for at sikre, at omkostninger ved Bitcoin-transaktion er dækket",
        DomesticShippingTime: "Indenlands forsendelsestid",
        InternationalShippingTime: "International forsendelsestid",
        DisplayNSFWcontent: "Vis potentielt stødende indhold?",
        Basic: "Basalt",
        Content: "Indhold",
        StandardThemes: "Standardtemaer",
        NoPhotosAdded: "Ingen billeder tilføjet",
        Summary: "Opsummering",
        Funds: "Beløb",
        Discussion: "Diskussion",
        Quantity: "Mængde",
        ShippingTo: "Afsendes til",
        ModeratedBy: "Modereret af",
        Submit: "Indsend",
        maxLength20: "maksimal længde 20 tegn",
        maxLength80: "maksimal længde 80 tegn",
        maxLength200: "maksimal længde 200 tegn",
        StoreModeratorsOptional: "Butiksmoderatorer (valgfrit)",
        Searchformoderators: "Søg efter moderatorer",
        Contributors: "Bidragere",
        Support: "Support",
        Licensing: "Licensering",
        On: "Aktiveret",
        Off: "Deaktiveret",
        ClickToChange: "Klik for at ændre",
        NotProvided: "ikke angivet",
        NotFollowingAnyone: "Følger ingen",
        NoFollowers: "Ingen følgere",
        NoReviews: "Ingen anmeldelser",
        Moderator: "Moderator",
        ActiveStore:"Butikken er aktiv",
        ActiveStoreDetails: "Inaktive butikker og listninger er ikke synlige for andre",
        Firewall: "Firewall",
        ServerSettings: "Serverindstillinger",
        ReadOnly: "(dette felt er skrivebeskyttet)",
        HandleResolver: "Håndtering af brugernavn", // This is related to the Handle phrase. A Handle is a unique name that starts with @ that users can register with OneName. For example, "@joshob1". If a user wants to use a different web service to resolve Handles, they can put in the URL of a Handle Resolver in this field.
        ServerSettings: "Serverindstillinger",
        ShutDownServer: "Luk serveren ned",
        LoadingBitcoinPrices: "Indlæser Bitcoin-priser…",
        ThisUserIsBlocked: "Denne bruger er skjult, da vedkommende er på din blokeringsliste",
        ThisUserIsNSFW: "Denne bruger er skjult, da vedkommendes side står opført som potentielt stødende",
        ShowBlockedUser: "Vis denne brugers side, undtaget potentielt stødende listninger",
        ShowNSFWContent: "Vis denne brugers side, inkl. alle potentielt stødende listninger",
        ServerChangeWarningHeadline: "Advarsel: Gem dine indstillinger",
        ServerChangeWarning: "Vi anbefaler, at du laver en kopi af dine tidligere indstillinger, der vises herunder. Dit tidligere brugernavn og adgangskode vil ikke længere være tilgængelig herefter.",
        moderatorSettings: {
          DisputeResolution: "Løsning af uenigheder",
          ServiceFee: "Servicegebyr",
          ServiceFeeNote: "Min: 0%, Maks: 25%"
        },
        BecomeModerator: "Bliv moderator",
        EditModerator: "Moderatorindstillinger",
        transactions: {
          OrderDetails: "Ordredetaljer",
          ViewOnBlockchain: "Se detajler",
          SoldBy: "Sælger",
          PurchasedBy: "Køber",
          searchByOrder: "Søg ud fra ordre-ID eller varenavn",
          sortByStatusAll: "Alle",
          sortByStatus0: "Køb er i gang (afventer betaling)",
          sortByStatus1: "Klar til håndtering (betaling komplet)",
          sortByStatus2: "Bekræftet/afsendt",
          sortByStatus3: "Gennemført (betaling frigivet)",
          sortByStatus4: "Uenighed",
          OrderID: "Ordre-ID",
          OrderDate: "Ordredato",
          OrderStatus: "Ordrestatus",
          OrderStatus0: "Køb er i gang (afventer betaling)",
          OrderStatus1: "Klar til håndtering (betaling komplet)",
          OrderStatus2: "Bekræftet/Afsendt",
          OrderStatus3: "Gennemført (betaling frigivet)",
          OrderStatus4: "Uenighed",
          OrderStatusopen: "Uenighed er i gang", //orig string: "Disputed"
          OrderStatus5: "Uenighed lukket",
          OrderStatusclosed: "Uenighed lukket",
          OrderStatus6: "Uenighed færdiggjort",
          OrderStatus7: "Refunderet",
          InEscrow: "– i depot",
          OrderTotal: "Ordretotal",
          OrderTotalInBTC: "BTC-total",
          NoMessages: "Ingen beskeder",
          PaymentProtection: "Betalingsbeskyttelse",
          ShipTo: "Afsend til",
          ViewRating: "(Se bedømmelse)",
          ContractDetails: "Kontraktdetaljer",
          HideDetails: "Skjul detaljer",
          ConfirmOrder: "Bekræft ordre",
          ReceivingAddress: "Modtagelsesadresse",
          RecievingAddressPlaceholder: "Bitcoin-adresse, du vil modtage betaling på",
          Comments: "Kommentarer",
          CommentsPlaceHolder: "Kommentarer til ordren, hvis du har nogen",
          Shipper: "Vare afsendt af",
          ShipperPlaceholder: "Navnet på virksomheden, der afsender varen",
          TrackingNumber: "Tracking-nummer",
          TrackingNumberPlaceholder: "Varens tracking-nummer",
          EstimatedDelivery: "Estimeret levering",
          EstimatedDeliveryPlaceholder: "Estimeret dato for levering af vare",
          URL: "Fil-URL",
          URLPlaceholder: "Link til download, plan eller mere information",
          Password: "Adgangskode",
          PasswordPlaceholder: "Adgangskode til link, hvis det kræves",
          DirectTransaction: "Direkte handel",
          ModeratedTransaction: "Modereret handel",
          Seller: "Sælger",
          Buyer: "Køber",
          Moderator: "Moderator",
          transferReceipt: "Overførselskvittering", // this is the bitcoin receipt for a transfer
          copyTxid: "Kopiér handels-ID",
          Close: "Luk",
          FundOrder: "Betal ordre", // this means to fund an order by sending bitcoin to an address
          sortByDateNewest: "Efter dato, nyeste",
          sortByDateOldest: "Efter dato, ældste",
          PayPurchase: "Betal for dette køb",
          CompleteOrder: "Gennemfør denne ordre",
          MarkAsShipped: "Markér som afsendt",
          RateThisTransaction: "Bedøm denne handel",
          TransactionReview: "Handelsbedømmelse",
          OverallRating: "Overordnet bedømmelse",
          Quality: "Kvalitet",
          MatchedDescription: "Beskrivelsen passede",
          DeliverySpeed: "Leveringstid",
          CustomerService: "Kundeservice",
          Review: "Bedøm",
          ReviewPlaceHolder: "Din bedømmelse af denne handel",
          NoFileProvided: "Ingen fil leveret",
          None: "Ingen",
          NoneSent: "Ingen sendt",
          ModerationFee: "Modereringsgebyr:",
          DisputeTransaction: "Start en uenighed",
          sendMessagePlaceholder: "Indtast din besked her.",
          DisputeInstructions: "For at oprette en uenighed for denne handel, indtast begrundelsen for uenigheden herunder og vælg boksen Start en uenighed. Dette vil inkludere moderatoren i samtalen, indtil uenigheden er løst. Moderatoren vil tage den endelige beslutning omkring hvorvidt der tilbagebetales et beløb til dig, og hvor meget. Moderatorens gebyr vil blive betalt ud af de beløb, du allerede har sendt.",
          SendMessage: "Send",
          CloseDispute: "Luk uenighed",
          TotalInTransaction: "Handel:",
          StartDisputeFlag: "START UENIGHED",
          CloseDisputeFlag: "AFSLUT UENIGHED",
          PayoutOnlyBuyer: "Ved at lukke denne uenighed vil 100% af pengene blive returneret til køberen."
        },
        errorMessages: {
          saveError: "Data kunne ikke gemmes.",
          getError: "Data kunne ikke modtages.",
          missingError: "Nogle felter mangler eller er ukorrekte.",
          serverError: "Et ukorrekt svar blev modtaget fra serveren.",
          userError: "Information om dette ID blev ikke fundet",
          userNotFoundError: "Denne persons information er ikke tilgængelig. Vedkommende kan være gået offline.",
          notFoundError: "Data kunne ikke indlæses for:",
          socketError: "URL for WebSocket mislykkedes. Forbinder til sokkel med standardadressen ws://localhost:18466.",
          contractError: "Denne vare kan ikke købes.",
          sellerError: "Sælgerens server har afvist købsanmodningen. Dette kan skyldes et forbindelsesproblem.",
          checkPurchaseData: "Tjek dine købsdata, så som købsmængde og Bitcoin-tilbagebetalingsadresse, og vær sikker på at den er gyldig. Hvis den er gyldig, så prøv igen om nogle få sekunder.",
          pageUnavailable: "Denne side er utilgængelig i øjeblikket.",
          badHandle: "Det brugernavn, du indtastede, har ikke et gyldigt OpenBazaar-ID.",
          serverDown: "Serveren er blevet lukket ned",
          tooManyPhotosTitle: "For mange billeder",
          tooManyPhotosBody: "Nogle eller alle dine billeder blev forhindret i at blive uploadet, da du ellers ville overskride det maksimalt tilladte antal.",
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "<p>OpenBazaar er et netværk af brugere, der køber og sælger varer og serviceydelser direkte med hinanden ved hjælp af Bitcoin. Dette netværk er decentraliseret og kontrolleres ikke af nogen organization.</p><p>Softwaren har åben kildekode (open source) og er MIT-licenseret. Du kan se programkoden på <a href=\"https://github.com/OpenBazaar/\">Github</a>.</p><p>OpenBazaar er et fællesskabsprojekt, og vi byder deltagelse i vores <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">Slack</a>-kanal e ller på vores <a href=\"http://www.reddit.com/r/openbazaar\">subreddit</a> velkommen.</p><p>Hvis du har brug for hjælp, bør du læse <a href=\"\">Gennemgangen</a> af OpenBazaar version 1.0.</p><p>Hvis du stadig har spørgsmål, kan du åbne en sag på vores <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\">support desk</a>.</p>",
          contributors: "<p>OpenBazaar er muliggjort af et internationalt fællesskab af udviklere og frivillige, der bidrager med deres tid for at gøre handel fri. Dette er en delvis liste over folk, der har bidraget til projektet, enten gennem kode eller anden assistance.</p><ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "<p>Du kan hjælpe OpenBazaar på flere forskellige måder med vores mission om at gøre handel fri.</p><p>Køb og salg af varer og serviceydelser på netværket hjælper til at fællesskabet bliver større og gør platformen mere attraktiv for nye brugere. En venlig forespørgsel til eksisterende visksomheder, der modtager Bitcoin, om at sælge på platformen hjælper med at sprede kendskabet og viser efterspørgsel efter peer-to-peer-handel.</p><p>Hvis du er udvikler kan du tjekke <a href=\"https://github.com/OpenBazaar/\">vores Github</a> og se, hvor du kan hjælpe os. Ud over at hjælpe med den centrale kode håber vi, at projektets tilladelsesfri og open source tilgang betyder, at du vil udvikle nye tjenester oven på det eksisterende netværk.</p><p>Du kan også <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\">donere Bitcoin</a> til projektet, hvilket vil blive brugt til at afholde omkostninger til besøg på konferencer, at tilbyde belønninger for udvikling og promovering af OpenBazaar.</p><p><a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">Tilmeld dig venligst vores Slack</a>, hvis du har nye idéer til OpenBazaar eller har spørgsmål til kerneudviklerne.</p>",
          licensing: "<p>OpenBazaar er open source software, der bruger MIT-licensen. Denne licens er tilladende og er designet til at tillade folk frit at genbruge koden til andre open source projekter eller til proprietær software. Den komplette licenstekst er herunder.</p><h4>The MIT License (MIT)</h4><h5>Copyright &#169 2016 OpenBazaar Developers</h5><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p><h4>Libraries</h4><p>The following libraries are used in OpenBazaar:</p><ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>",
        },
        saveMessages: {
          Saved: "Gemt",
          SaveSuccess: "Dine ændringer er blevet gemt."
        },
        discover: {
          searchDefaultText: "Skanner dit netværk",
          searchingText: "Skanner dit netværk efter",
          noResults: "Ingen listninger tagget med følgende blev fundet i dit netværk" // Note: Better (non-postfix) translation would be "Ingen listninger tagget med XXXXX blev fundet i dit netværk"
        },
        filters: {
          pagesAllTypes: "Alle typer",
          pagesStores: "Butikker",
          pagesMods: "Moderatortjenester",
          pagesBasic: "Basale brugere",
          listingsCurated: "Butikker, jeg følger",
          listingsAll: "Alle butikker",
          categoryAll: "Alle"
        },
        nav: {
          searchPlaceholder: "Indtast et @brugernavn, OpenBazaar-ID eller #tag…",
          myPage: "Min side",
          testMode: "Testtilstand",
          customizePage:"Tilpas side",
          sellItem:"Ny",
          createListing:"Opret listning",
          purchases:"Køb",
          sales:"Salg",
          cases:"Sager",
          notifications:"Notifikationer",
          settings:"Indstillinger",
          about:"Om OpenBazaar",
          support:"Støt OpenBazaar",
          Forward: "Frem",
          Back: "Tilbage"
        },
        onboarding: {
          intro: "OpenBazaar-opsætning",
          Introduction: "Introduktion",
          IntroductionBody: "OpenBazaar er et peer-to-peer socialt marked. Det er som at kombinere eBay&trade;, Twitter&trade; and BitTorrent i én. Bortset fra at der ikke er nogen gebyrer eller restriktioner, og OpenBazaar er open-source. \n\n Bemærk venligst, at det kan mærkes og se lidt anderledes ud, end hvad du er vandt til, så vær venligst tålmodig, efterhånden som du vænner dig til det.",
          theme: "Vælg et tema for din side",
          chooseLanguage: "Vælg dit sprog",
          contributors: "%{smart_count} bidragsyder |||| %{smart_count} bidragsydere",
          configure: "Opsæt din oplevelse",
          disclaimer_title: "Fraskrivelse",
          disclaimer_body: "OpenBazaar er et netværk til handel af varer og tjenesteydelser direkte mellem brugerne – ved hjælp af Bitcoin – uden nogen central organisation, der styrer platformen. Dette betyder, at du er ansvarlig for din egen aktivitet på netværket.\n\nOpenBazaar-brugere er i udgangspunktet ikke anonyme. Det meste kommunikation mellem parterne er krypteret, men IP-adresser er offentlige og kan hæftes sammen med aktivitet på netværket. Ondsindede parter kan bruge denne information imod dig; det er dit eget ansvar at beskytte dit privatliv.\n\nOpenBazaar-brugere skal følge lovene i deres egen jurisdiktion såvel som deres samvittighed. OpenBazaar-udviklerne tolererer ikke – og er ikke ansvarlige for – nogen form for brug af platformen til ulovlig aktivitet.\n\nFællesskabet af OpenBazaar-udviklere har arbejdet hårdt for at kunne tilbyde en fri handelsplatform til verden. Men som med al anden software vil fejl blive fundet. Udviklerne er ikke ansvarlige for nogen form for monetær tab, der kan sammenkobles med problemer i softwaren.\n\nVed at bruge OpenBazaar er du ansvarlig for dine egne handlinger på OpenBazaar-netværket.",
          yourCountry: "Vælg dit land",
          localCurrency: "Vælg din valuta",
          LanguagePlaceholder: "Søg efter sprog",
          CountryPlaceholder: "Søg efter land",
          CurrencyPlaceholder: "Søg efter valuta",
          TimezonePlaceholder: "Søg efter tidszone",
          ShortDescriptionPlaceholder: "Sig noget interessant… (maks 160 tegn)",
          timeZone: "Vælg din tidszone",
          yourDetails: "Opsæt din information",
          yourDescription: "Beskrivelse",
          handle: "Brugernavn",
          chooseHandle: "Vælg et brugernavn",
          knownAs: "Du kendes i øjeblikket som:",
          wouldYou: "Vil du registrere et brugernavn, der er nemt at huske?",
          registerNew: "Registrér nyt",
          recommended: "Anbefalede sider, der kan følges",
          avatar: "Opsæt en avatar",
          chooseAvatar: "Vælg avatar",
          discoverCallOut: "Udforsk listiner og sider på OpenBazaar",
          Finished: "Færdig"
        },
        guidStillCreating: {
          HangTight: "Hæng på et øjeblik…",
          YourPersonal: "Dine personlige nøgler og OpenBazaar-ID bliver genereret, og burde kun tage omkring 30 sekunder at færdiggøre.\n\nDu bliver automatisk forbundet til netværket, når processen er færdig, så hæng venligst på.",
          LookingFor: "Leder du efter noget at lave i mellemtiden? Læs <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">OpenBazaar-bloggen</a>."
        },
        walletProviders: {
          CoinbaseTagline: "Verdens mest populære måde at købe, sælge og bruge Bitcoin.",
          SamouraiTagline: "Sikker mobil tegnebog. Vægt på privatlivsbeskyttelse.",
          AirbitzTagline: "Privatlivsbeskyttelse. Sikkerhed. Autonom. Decentraliseret.",
          BreadwalletTagline: "Forbinder direkte til Bitcoin-netværket, ingen servere. Smuk simplicitet, maksimal sikkerhed.",
          RushWalletTagline: "Få en Bitcoin-adresse hurtigt og nemt i din browser.",
          MyceliumTagline: "En af dem, der har været længst på markedet, en af de mest sikre og pålidelige Bitcoin-tegnebøger.",
          CoinkiteTagline: "Den mest kraftfulde Bitcoin-tegnebog",
          BlockchaininfoTagline: "Verdens mest populære Bitcoin-tegnebog. Sikrere, venligere, nemmere.",
          DuoMoneyTagline: "Euro-tegnebog for dødnemme Bitcoin-betalinger. OpenBazaar for bedstemor.",
          BitGoTagline: "Verdens mest sikre Bitcoin-tegnebog. Tiltroet af ledende Bitcoin-virksomheder."
        },
        softwareUpdate: {
          updateAvailable: "OpenBazaar-opdatering er tilgængelig",
          installUpdate: "Installér opdatering",
          dismiss: "Afvis"
        },
        buyFlow: {
          PayForOrder: "Betal for ordre",
          NeedTempAddress: "Jeg har brug for en midlertidig Bitcoin-adresse",
          NeedTempAddressHelper: "Lav venligst et bogmærke til URL-adressen på din midlertidige Bitcoin-adresse",
          CantFindAddress: "Jeg kan ikke finde min Bitcoin-adresse",
          BitcoinWallet: "Bitcoin-tegnebog",
          ModeratedPaymentDescription: "Din betaling opbevares i en sikker tegnebog, indtil sælgeren gennemfører sin del af aftalen. Hvis der opstår problemer, vil en moderator hjælpe.",
          ModeratorFeeHelper: "Moderatoren opkræver måske et gebyr, men kun hvis der opstår en uenighed.",
          ModeratedPayment: "Modereret betaling",
          DisputeFee: "Uenighedsgebyr",
          HaveWallet: "Har du en Bitcoin-tegnebog?",
          QuickSetup: "Det tager kun nogle få minutter at oprette en",
          CreateWallet: "Opret en tegnebog",
          DirectPaymentDescription: "Pengene sendes direkte til sælgeren. Brug kun denne ved små beløb eller ved køb fra en sælger, du stoler på.",
          DirectPayment: "Direkte betaling",
          SendDirectlyTo: "Send direkte betaling til %{handle}",
          MustAddAddress: "Du skal tilføje en adresse, der kan sendes til",
          VendorShipsTo: "Afsendes til",
          DoesNotShipHere: "Sendes ikke hertil",
          Send: "Send",
          BTCto: "BTC til",
          SendBTCtoAddress: "Send %{amount} BTC til",
          OpenAddress: "Åbn i lokal tegnebog",
          CopyAddress: "Kopiér til udklipsholder",
          RefreshPayment: "Opdatér betalingsstatus",
          summaryMsg1: "Din betaling er blevet sendt til %{recipient}",
          summaryMsg2: "Den forventede håndteringstid for denne ordre er",
          summaryMsg3: "Du kan tjekke status for din ordre på din",
          purchasesPage: "købsside",
          returnAddress: "Refunderingsadresse", // This is the bitcoin address you enter in case a refund is issued by the vendor. They will refund your bitcoin transfer to this address.
          moderatorPaymentDisclaimer: "Betales ud fra totalbeløbet, hvis handelen ender i en uenighed.",
          directPaymentDisclaimer: "Brug direkte betaling med forsigtighed; pengene kan ikke trækkes tilbage!",
          paymentSent: "Betaling afsendt!",
          total: "Total"
        },
        chat: {
          noSearchResultsFound: "Ingen resultater fundet"
        },
        serverConnectModal: {
          statusTryingToConnect: "Prøver at forbinde til din server",
          statusConnected: "Forbundet",
          statusFailedConnection: "Forbindelse til din server mislykkedes",
          statusFailedAuthentication: "Autentificering mislykkedes",
          statusTooManyAttempts: "For mange mislykkedes loginforsøg",
          serverConfiguration: "Serveropsætning",
          connecting: "Forbinder",
          intro: "OpenBazaar er designet til at lade dig køre din server adskilt fra klienten. Som udgangspunkt vil din server køre lokalt, men dette kan du tilsidesætte herunder.",
          serverIP: "Server-IP",
          restApiPort: "Rest API-port",
          websocketApiPort: "Websocket API-port",
          heartbeatSocketApiPort: "Heartbeat sokkelport",
          username: "Brugernavn",
          password: "Adgangskode",
          restoreDefaults: "Gendan standardværdier",
          saveChanges: "Gæm ændringer",
          retry: "Prøv forbindelse igen",
        }
      },
      {
        langName: "Português do Brasil",
        langCode: "pt-BR",
        /* Use capitalized keys for widely reused text that must be capitalized */
        IHaveAWalletNow: "Eu tenho uma Carteira agora",
        Next: "Próximo",
        IAgree: "Eu aceito",
        Back: "Voltar",
        EnterMessage: "Inserir mensagem...",
        Recommended: "Recomendado",
        Reload: "Recarregar",
        You: "Você",
        Skip: "Pular",
        Done: "Finalizar",
        Status: "Status",
        Navigation: "Navegação",
        Cancel: "Cancelar",
        ClosingOpenBazaar: "Fechar (a sua página ficará offline))",
        Minimize: "Minimizar",
        Maximize: "Maximizar",
        Close: "Fechar",
        Yes: "Sim",
        No: "Não",
        of: "de",
        Sell: "Vender",
        New: "Novo",
        HighlightToStyle: "Destacar texto",
        Excellent: "Excelente",
        Good: "Bom",
        Poor: "Ruim",
        StillValidating: "Sua transação ainda está sendo validada",
        CheckStatus: "Verificar Status",
        ChangeCurrency: "Mudar moeda",
        SKU: "SKU",
        Refurbished: "Refurbished",
        Physical: "Física",
        Digital: "Digital",
        Service: "Serviço",
        Visit: "View",
        Item: "Item",
        Items: "Itens",
        Stores: "Lojas",
        Follow: "Seguir",
        Feed: "Feed",
        FeedPlaceholder: "Um feed de atualizações de todas as páginas que você segue",
        ViewListing: "Ver Lista",
        Unfollow: "Deixar de seguir",
        About: "Sobre",
        NoDescriptionAdded: "Sem descrição",
        NoListings: "Sem listagens",
        CoverPhoto: "Foto da Capa",
        AboutEmpty: "Sobre está vazio...",
        Followers: "Seguidores",
        Following: "Seguindo",
        FollowsYou: "Segue você",
        Message: "Mensagem",
        Messages: "Mensagens",
        Store: "Loja",
        Edit: "Editar",
        Clone: "Clone",
        Used: "Usado",
        Delete: "Apagar",
        DontDelete: "Não Apagar",
        ConfirmDelete: "Confirmar a exclusão",
        Website: "Website",
        Guid: "ID do OpenBazaar",
        Welcome: "Bem-vindo(a)",
        CreateStore: "Become a Store",
        GoToMyPage: "Minha Página",
        SearchForItemsPlaceholder: "Digite #jogos, #sapatos ou qualquer outra #tag...",
        SearchForPagesPlaceholder: "Busque pelo nome ou palavra-chave",
        SearchFeedPlaceholder: "Digite uma palavra-chave...",
        SearchForFollowersPlaceholder: "Digite um nome...",
        SearchForUsersPlaceholder: "Digite um nome...",
        SearchOnUserStorePlaceholder: "Digite um título...",
        EstDeliveryDomesticPlaceholder: "3-5 Dias Úteis",
        EstDeliveryInternationalPlaceholder: "7-15 Dias Úteis",
        OrderProcessingTimePlaceholder: "Insira o tempo necessário para processar o pedido",
        TermsAndConditionsPlaceholder: "Insira os termos e condições...",
        TitlePlaceholder: "Insira o título",
        DescriptionPlaceholder: "Insira a descrição...",
        ReturnPolicyPlaceholder: "Insira a política de devolução...",
        CategoryPlaceholder: "Insira a categoria",
        CategoryHelperText: "As categorias são usadas para agrupar e organizar a listagem da sua loja.",
        KeywordsHelperText: "Acrescentar tags facilita que a sua listagem seja descoberta no mercado.",
        ExpirationDateHelperText: "Defina uma data para que a listagem seja automaticamente removida de sua loja.",
        ClearExpirationDate: "Apagar Data de Expiração",
        ReturnPolicy: "Política de Devolução",
        TermsAndConditions: "Termos e Condições",
        Photos: "Fotos",
        Added: "Adicionado",
        Categorization: "Categorização",
        Expiration: "Expiração",
        Search: "Busca",
        Email: "E-mail",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Twitter: "Twitter",
        PGPKey: "Chave PGP",
        Signature: "Assinatura PGP",
        SignaturePlaceholder: "A PGP Signature is required if you enter a PGP Key", //not translated
        Snapchat: "Snapchat",
        BUYNOW: "Comprar agora",
        Description: "Descrição",
        Reviews: "Avaliações",
        Shipping: "Entrega",
        Addresses: "Endereços",
        Files: "Arquivos",
        NewAddress: "Novo Endereço",
        CurrentAddress: "Endereços Atuais",
        Returns: "Devoluções",
        ReturnsPolicy: "Política de Devolução",
        Ampersand: "&",
        Tags: "Tags",
        Keywords: "Palavras-chave",
        ShipsFrom: "Enviado De",
        ShipsTo: "Entrega para",
        Optional: "Opcional",
        Customize: "Personalizar",
        Save: "Salvar",
        Change: "Mudança",
        Changes: "Mudanças",
        SaveChanges: "Salvar Mudanças",
        YourName: "Seu nome",
        BitcoinReturnAddress: "Insira o seu Endereço Bitcoins",
        BitcoinReturnAddressPlaceholder: "Insira o endereço Bitcoin...",
        BitcoinReturnAddressInfo: "Se um reembolso for emitido, os fundos terão que ser enviados para um endereço Bitcoin. Por favor forneça abaixo um endereço para a sua Carteira.",
        LocalCurrency: "Moeda local",
        TimeZone: "Fuso horário",
        ShipToName: "Nome",
        ShipToStreet: "Rua",
        ShipToCity: "Cidade",
        ShipToState: "Estado/Província/Região",
        ShipToPostalCode: "CEP",
        PostalCode: "CEP",
        ShipToCountry: "País",
        EnableNotifications: "Ativar notificações",
        EnableSSL: "Ativar SSL",
        LibbitcoinServerAddress: "endereço do servidor Libbitcoin",
        ServerIPPort: "IP do Servidor:Porta",
        All: "Todos",
        Name: "Nome",
        Price: "Preço",
        Available: "Disponível",
        Type: "Tipo",
        Condition: "Condição",
        NSFW: "18+ (conteúdo adulto)",
        Select: "Selecionar",
        Social: "Social",
        Theme: "Tema",
        Listing: "Listagem",
        Listings: "Listagens",
        ViewPage: "Ver página",
        Pages: "Páginas",
        Page: "Página",
        Language: "Idioma",
        Reset: "Resetar",
        Local: "Local",
        Domestic: "Doméstico",
        Location: "Localização",
        International: "Internacional",
        Time: "Horário",
        Free: "Grátis",
        Category: "Categoria",
        ProcessingTime: "Tempo de Processamento",
        SelectPhotos: "Escolher fotos",
        DragOrUploadPhotos: "Arraste ou envie fotos",
        ExpirationDate: "Expira Em",
        UploadCoverPhoto: "Enviar uma foto de capa",
        ShortDescription: "Descrição resumida",
        UpTo140Characters: "Até 140 Caracteres",
        PrimaryColor: "Cor Primária",
        SecondaryColor: "Cor Secundária",
        TextColor: "Cor do Texto",
        CoverPhotoButton: "Escolher Foto de Capa",
        AboutPlaceholder: "Descrição completa",
        BackgroundColor: "Cor de Fundo",
        NotificationPaymentSent: "O pagamento foi enviado para",
        NotificationOrderFor: "fez um pedido de", 
        NotificationOrderConfirmed: "Seu pedido foi confirmado/enviado",
        NotificationFollow: "agora está seguindo você",
        NotificationDispute: "abriu uma disputa",
        NotificationDisputeClosed: "essa disputa está fechada",
        NotificationRefund: "reembolsou o seu pedido",
        NoticationOrderStatus: "O status do pedido foi atualizado e o comprador foi notificado",
        NotificationNewOrder: "fez uma compra",
        NoNotifications: "Sem notificações",
        WelcomeToYourPage: "Bem-vindo(a) à sua página!",
        SearchForCategory: "Buscar por uma categoria",
        Moderators: "Moderadores",
        CurrentModerators: "Moderadores Atuais",
        AddModerators: "Adicionar Novos Moderadores",
        DeselectToRemoveModerator: "Desmarque os moderadores que você quer remover",
        SelectToAddModerator: "Selecione os moderadores que você quer adicionar",
        Categories: "Categorias",
        UpTo3: "Até 3",
        AboutYourStore: "Uma descrição da sua loja",
        PaymentType: "Tipo de Pagamento",
        ShipTo: "Envia Para",
        FreeShipping: "Frete Grátis",
        OrderDetails: "Detalhes do Pedido",
        OrderSummary: "Resumo do Pedido",
        AllListings: "Todas as Listagens",
        ComingSoon: "Em Breve",
        PaymentPending: "Pagamento Pendente",
        FinalizePurchase: "Finalizar Compra",
        LoadingImage: "Carregando Imagem...",
        UploadAvatar: "Escolher Avatar",
        SaveAvatar: "Salvar Avatar",
        NewAvatar: "Escolher Novo Avatar",
        NewCoverImage: "Escolher Nova Imagem de Capa",
        Loading: "Carregando...",
        Purchases: "Compras",
        Sales: "Vendas",
        Cases: "Casos",
        Enter: "Entrar",
        Discover: "Descobrir",
        Block: "Bloquear",
        Unblock: "Desbloquear",
        Blocked: "Bloqueado",
        NoBlockedList: "Atualmente você não está bloqueado ninguém.",
        Advanced: "Avançado",
        General: "Geral",
        AllItems: "Todos os Itens",
        DomesticShippingPrice: "Preço do Frete Doméstico",
        InternationalShippingPrice: "Preço do Frete Internacional",
        MinimumIs: "Mínimo é",
        Visibility: "Visibilidade",
        Title: "Título",
        DigitalItem: "Item Digital",
        PhysicalItem: "Item Físico",
        MinimumPrice: "Um preço mínimo é necessário para garantir que os custos da transação bitcoin sejam cobertos",
        DomesticShippingTime: "Tempo de Entrega Doméstica",
        InternationalShippingTime: "Tempo de Entrega Internacional",
        DisplayNSFWcontent: "Mostrar conteúdo para adultos?",
        Basic: "Básico",
        Content: "Conteúdo",
        StandardThemes: "Temas padrões",
        NoPhotosAdded: "Nenhuma Foto Adicionada",
        Summary: "Resumo",
        Funds: "Fundos",
        Discussion: "Discussão",
        Quantity: "Quantidade",
        ShippingTo: "Enviando Para",
        ModeratedBy: "Moderado por",
        Submit: "Enviar",
        maxLength20: "máx de 20 caracteres",
        maxLength80: "máx de 80 caracteres",
        maxLength200: "máx de 200 caracteres",
        StoreModeratorsOptional: "Moderadores da Loja (Opcional)",
        Searchformoderators: "Procurar moderadores",
        Contributors: "Contribuidores",
        Support: "Suporte",
        Licensing: "Licença",
        On: "Ligado",
        Off: "Desligado",
        ClickToChange: "Clique para mudar",
        NotProvided: "não fornecido",
        NotFollowingAnyone: "Ninguém está sendo seguido",
        NoFollowers: "Sem seguidores",
        NoReviews: "Sem avaliações",
        Moderator: "Moderador",
        Firewall: "Firewall",
        ServerSettings: "Configurações do Servidor",
        ReadOnly: "(Esse Campo Não Pode Ser Editado)",
        HandleResolver: "Resolvedor de Apelidos",
        ServerSettings: "Configurações do Servidor",
        ShutDownServer: "Desligar o Servidor",
        LoadingBitcoinPrices: "Carregando Preços do Bitcoin...",
        ThisUserIsBlocked: "Esse usuário está escondido porque ele está em sua lista de bloqueados",
        ThisUserIsNSFW: "Esse usuário está escondido porque a página dele está listada como conteúdo adulto",
        ShowBlockedUser: "Mostrar a página desse usuário, com a exceção das listagens de conteúdo adulto",
        ShowNSFWContent: "Mostras a página desse usuário, incluindo todas as listagens de conteúdo adulto",
        ServerChangeWarningHeadline: "Cuidado: Salve suas Configurações",
        ServerChangeWarning: "Nós recomendamos que você faça uma cópia das suas configurações anteriores, que estão sendo mostradas abaixo. Após esse ponto, o seu usuário e senha antigos não estarão mais disponíveis.",
        moderatorSettings: {
          DisputeResolution: "Resolução de Disputa",
          ServiceFee: "Taxa do serviço",
          ServiceFeeNote: "Mín: 0%, Máx: 25%"
        },
        BecomeModerator: "Tornar-se um Moderador",
        EditModerator: "Configurações do Moderador",
        transactions: {
          OrderDetails: "Detalhes do Pedido",
          ViewOnBlockchain: "Ver Detalhes",
          SoldBy: "Vendedor",
          PurchasedBy: "Comprador",
          searchByOrder: "Buscar por id do pedido ou nome do item",
          sortByStatusAll: "Todos",
          sortByStatus0: "Comprando (Pagamento pendente)",
          sortByStatus1: "Pronto para processar (Pagamento efetuado)",
          sortByStatus2: "Confirmado/Enviado",
          sortByStatus3: "Finalizado (Pagamento liberado)",
          sortByStatus4: "Em disputa",
          OrderID: "ID do Pedido",
          OrderDate: "Data do Pedido",
          OrderStatus: "Status do Pedido",
          OrderStatus0: "Comprando (Pagamento pendente)",
          OrderStatus1: "Pronto para processar (Pagamento efetuado)",
          OrderStatus2: "Confirmado/Enviado",
          OrderStatus3: "Finalizado (Pagamento liberado)",
          OrderStatus4: "Em disputa",
          OrderStatusopen: "Em disputa",
          OrderStatus5: "Disputa Fechada",
          OrderStatusclosed: "Disputa Fechada",
          OrderStatus6: "Disputa Finalizada",
          OrderStatus7: "Reembolsado",
          AcceptDisputeResolution: "Aceitar Pagamento da Disputa",
          InEscrow: "- Em Custódia",
          OrderTotal: "Total do Pedido",
          OrderTotalInBTC: "Total em BTC",
          NoMessages: "Sem mensagens",
          PaymentProtection: "Proteção do Pagamento",
          ShipTo: "Enviar Para",
          ViewRating: "(Ver Avaliação)",
          ContractDetails: "Detalhes do Contrato",
          HideDetails: "Esconder Detalhes",
          ConfirmOrder: "Confirmar Pedido",
          RefundOrder: "Reembolsar Pedido",
          RefundReason: "Motivo do reembolso",
          RefundReasonPlaceholder: "Explique por que você está enviando um reembolso",
          ReceivingAddress: "Endereço de Recebimento",
          RecievingAddressPlaceholder: "Endereço Bitcoin que irá receber os fundos",
          Comments: "Comentários",
          CommentsPlaceHolder: "Comentários nesse pedido",
          Shipper: "Item Enviado Por",
          ShipperPlaceholder: "Nome da companhia enviando o item",
          TrackingNumber: "Número de Rastreamento",
          TrackingNumberPlaceholder: "Número de rastreamento do item",
          EstimatedDelivery: "Entrega estimada para",
          EstimatedDeliveryPlaceholder: "Data estimada para a entrega do item",
          URL: "URL do Arquivo",
          URLPlaceholder: "Link para download, horários ou maiores informações",
          Password: "Senha",
          PasswordPlaceholder: "Senha necessária para o link (opcional)",
          DirectTransaction: "Transação direta",
          ModeratedTransaction: "Transação moderada",
          Seller: "Vendedor",
          Buyer: "Comprador",
          Moderator: "Moderador",
          transferReceipt: "Recibo da Transferência",
          copyTxid: "copiar ID da transação",
          Close: "Fechar",
          FundOrder: "Fund Order",
          sortByDateNewest: "Por Data, Mais recente",
          sortByDateOldest: "Por Data, Mais antigo",
          PayPurchase: "Pagar por essa Compra",
          CompleteOrder: "Complete esse Pedido",
          MarkAsShipped: "Marcar como Enviado",
          RateThisTransaction: "Avaliar essa Transação",
          TransactionReview: "Avaliação da Transação",
          OverallRating: "Avaliação Geral",
          Quality: "Qualidade",
          MatchedDescription: "Corresponde à Descrição",
          DeliverySpeed: "Tempo de Entrega",
          CustomerService: "Atendimento ao Consumidor",
          Review: "Avaliar",
          ReviewPlaceHolder: "Sua Avaliação dessa transação",
          NoFileProvided: "Nenhum arquivo foi fornecido",
          None: "Nenhum",
          NoneSent: "Nenhum foi enviado",
          ModerationFee: "Taxa de Moderação:",
          DisputeTransaction: "Iniciar uma Disputa",
          sendMessagePlaceholder: "Inserir mensagem...",
          DisputeInstructions: "Para iniciar uma disputa para essa transação, escreva o motivo da disputa, e marque a caixa Iniciar uma Disputa. Isso irá incluir o moderador na sua conversa até que a disputa seja resolvida. O moderador é quem dará a decisão final, decidindo se o dinheiro será devolvido para você, e o quanto será devolvido. A taxa do moderador será paga a partir do dinheiro que você já enviou no pedido.",
          SendMessage: "Enviar",
          CloseDispute: "Fechar Disputa",
          TotalInTransaction: "Transação:",
          StartDisputeFlag: "INICIAR DISPUTA",
          CloseDisputeFlag: "FINALIZAR DISPUTA",
          PayoutOnlyBuyer: "Finalizar essa disputa irá retornar 100% dos fundos para o comprador."
        },
        errorMessages: {
          saveError: "Não foi possível salvar os dados.",
          getError: "Os dados não puderam ser recuperados.",
          missingError: "Alguns campos estão faltando ou estão incorretos.",
          serverError: "O servidor retornou uma resposta incorreta.",
          userError: "Não foi possível encontrar informações para esse ID",
          userNotFoundError: "As informações dessa pessoa não estão disponíveis. Pode ser que ela tenha ficado offline.",
          notFoundError: "Não foi possível carregar os dados para:",
          socketError: "Erro na URL para WebSocket. Conectando ao socket com o endereço padrão de ws://localhost:18466.",
          contractError: "Esse Item Não Pode ser Comprado.",
          sellerError: "O servidor do vendedor rejeitou essa requisição de compra. Isso pode ter ocorrido devido a um problema de conexão.",
          checkPurchaseData: "Verifique seus dados de compra, como a quantidade e o endereço Bitcoin de reembolso, para se certificar de que eles são válidos. Se eles forem válidos, tente novamente dentro de alguns segundos.",
          pageUnavailable: "Essa página está atualmente indisponível.",
          badHandle: "O apelido que você inseriu não possui um ID do OpenBazaar válido.",
          serverDown: "O servidor foi desligado",
          tooManyPhotosTitle: "Existem fotos em excesso",
          tooManyPhotosBody: "Algumas ou todas as suas fotos não puderam ser enviadas porque você excedeu a quantia máxima permitida.",
          badJSON: "The JSON data returned from the server was malformed" // notTranslated
        },
        aboutSection: {
          about: "<p>O OpenBazaar é uma rede de usuários que compram e vendem bens e serviços diretamente uns com os outros, utilizando Bitcoin. Essa rede é descentralizada e não é controlada por nenhuma organização.</p><p>O software tem código aberto e usa a licença. Você pode ver o código no <a href=\"https://github.com/OpenBazaar/\">Github</a>.</p><p>O OpenBazaar é um projeto de uma comunidade, e nós aceitamos participações em nosso canal <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">Slack</a> ou em nosso <a href=\"http://www.reddit.com/r/openbazaar\">subreddit</a>.</p><p>Se você precisar de ajuda, leia o <a href=\"\">Tutorial</a> do OpenBazaar versão 1.0 .</p><p>Se você ainda tiver dúvidas, abra um protocolo em nosso <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\">suporte técnico</a>.</p>",
          contributors: "<p>O OpenBazaar se tornou realidade graças a uma comunidade internacional de desenvolvedores e voluntários que contribuíram o seu tempo para ajudar na missão de fazer com que o comércio seja livre. Essa é uma lista parcial de pessoas que contribuíram para o projeto, seja através de programação ou outro tipo de assistência.</p><ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>",
          support: "<p>Você pode ajudar o OpenBazzar de diversas maneiras em nossa missão de tornar o comércio livre.</p><p>Comprar e vender bens e serviços na rede ajuda com o crescimento da comunidade e torna a plataforma mais atraente para novos usuários. Solicitar educadamente às empresas que já aceitam Bitcoin para que elas vendam na plataforma ajuda a divulgar o projeto e demonstra uma demanda por comércio ponto a ponto.</p><p>Se você é um desenvolvedor, verifique <a href=\"https://github.com/OpenBazaar/\">nosso Github</a> e veja onde você pode nos ajudar. Além de ajudar com o código do core, nós esperamos que a natureza do código aberto e da possibilidade de você poder criar sem ter que pedir permissão para ninguém fará com que você construa novos serviços no topo da rede já existente.</p><p>Você também pode <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\">doar Bitcoins</a> para esse projeto, que será usado para custear visitas a conferências, oferecer recompensas para desenvolvedores e divulgar o OpenBazaar.</p><p>Por favor <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\">entre no nosso Slack</a> se você tem novas ideias para o OpenBazaar, ou tem dúvidas para serem respondidas pelos desenvolvedores do core.</p>",
          licensing: "<p>O OpenBazaar é um software de código aberto sob a licença MIT. Essa licença é permissiva e é projetada para permitir que as pessoas reutilizem livremente o código para outros projetos de cógigo aberto ou para uso software de uso proprietário. O texto da licença completa está abaixo.</p><h4>A Licença MIT (MIT)</h4><h5>Copyright &#169 2016 Desenvolvedores do OpenBazaar</h5><p>A permissão é concedida, gratuitamente, para qualquer pessoa que obtenha uma cópia deste software e dos arquivos de documentação associados (o \"Software\"), para lidar com o Software sem restrição, incluindo, sem limitação dos direitos de uso, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do Software, e para permitir que as pessoas às quais o Software é fornecido a fazê-lo, mediante as seguintes condições:</p><p>O aviso de direito autoral acima e este aviso de permissão devem ser incluídos em todas as cópias ou partes substanciais do Software.</p><p>O SOFTWARE É FORNECIDO \"COMO ESTÁ\", SEM QUALQUER TIPO DE GARANTIA, EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO A, GARANTIAS DE COMERCIABILIDADE, ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA E NÃO VIOLAÇÃO. EM NENHUM CASO OS AUTORES OU OS DETENTORES DOS DIREITOS AUTORAIS SE RESPONSABILIZARÃO POR QUALQUER RECLAMAÇÃO, DANOS OU QUALQUER OUTRA RESPONSABILIDADE, SEJA EM RAZÃO DE CONTRATO, ATO ILÍCITO OU DE OUTRA FORMA, RESULTANTES DE OU EM CONEXÃO COM O SOFTWARE OU A UTILIZAÇÃO OU OUTRAS NEGOCIAÇÕES NO SOFTWARE.</p><h4>Livrarias</h4><p>As seguintes livrarias são usadas no OpenBazaar:</p><ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>txws</li><li>python-libbitcoin client</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li><li>python-bitcoinlib</li></ul>",
        },
        saveMessages: {
          Saved: "Salvo",
          SaveSuccess: "Sua modificações foram salvas."
        },
        discover: {
          searchDefaultText: "Procurando na sua rede",
          searchingText: "Procurando na sua rede por",
          noResults: "Nenhuma listagem foi encontrada na sua rede com o tag"
        },
        filters: {
          pagesAllTypes: "Todos os tipos",
          pagesStores: "Lojas",
          pagesMods: "Serviços de Moderação",
          pagesBasic: "Usuários comuns",
          listingsCurated: "Lojas que eu sigo",
          listingsAll: "Todas as lojas",
          categoryAll: "Todas"
        },
        nav: {
          searchPlaceholder: "Insira um @apelido, ID do OpenBazaar ou uma #tag...",
          myPage: "Minha Página",
          testMode: "Modo de Testes",
          customizePage:"Personalizar página",
          sellItem:"Novo",
          createListing:"Criar Listagem",
          purchases:"Compras",
          sales:"Vendas",
          cases:"Casos",
          notifications:"Notificações",
          settings:"Configurações",
          about:"Sobre o OpenBazaar",
          support:"Apoiar o OpenBazaar",
          Forward: "Próximo",
          Back: "Voltar"
        },
        onboarding: {
          intro: "Configuração do OpenBazaar",
          Introduction: "Introdução",
          IntroductionBody: "OpenBazaar é um mercado social ponto-a-ponto (P2P). É como se fosse uma combinação do Mercado Livre com o Twitter e o uTorrent. No entanto, o software do OpenBazaar tem código aberto e não existem taxas ou restrições. \n\n Como o OpenBazaar é uma tecnologia inovadora, você pode achar ele um pouco diferente da experiência de compra que você já está acostumado. Seja paciente enquanto você se adapta à sua nova maneira de comprar.",
          theme: "Escolha um Tema para sua Página",
          chooseLanguage: "Escolha o Seu Idioma",
          contributors: "%{smart_count} Colaborador |||| %{smart_count} Colaboradores",
          configure: "Configure a sua experiência",
          disclaimer_title: "Aviso legal",
          disclaimer_body: "O OpenBazaar é uma rede de comércio de bens e serviços diretamente entre pessoas - usando Bitcoin - sem nenhuma organização central controlando a plataforma. Isso significa que você é responsável pelas suas próprias atividades na rede.\n\nOs usuários do OpenBazaar não são anônimos por padrão. A maioria das comunicações entre as partes são criptografadas, mas os endereços IP são públicos e podem ser associados com a atividade na rede. Pessoas mal-intencionadas poderiam usar essas informações contra você; a proteção da sua privacidade é de sua própria responsabilidade.\n\nOs usuários do OpenBazaar devem respeitar as leis de suas próprias jurisdições legais, assim como as suas consciências. Os desenvolvedores do OpenBazaar não incentivam - e não são responsáveis por - qualquer uso da plataforma para atividades ilegais.\n\nA comunidade de desenvolvedores do OpenBazaar trabalhou duro para fornecer uma plataforma gratuita de comércio para o mundo. Mas, como qualquer outro tipo de software, bugs serão descobertos. Os desenvolvedores não são responsáveis por qualquer perda financeira associada com problemas no software.\n\nAo usar o OpenBazaar, você é responsável pelas suas próprias ações na rede OpenBazaar.",
          yourCountry: "Escolha o Seu País",
          localCurrency: "Escolha a Sua Moeda",
          LanguagePlaceholder: "Buscar idioma",
          CountryPlaceholder: "Buscar país",
          CurrencyPlaceholder: "Buscar moeda",
          TimezonePlaceholder: "Buscar fuso horário",
          ShortDescriptionPlaceholder: "Diga algo interessante... (máx 160 caracteres)",
          timeZone: "Escolha o Seu Fuso Horário",
          yourDetails: "Defina suas Informações",
          yourDescription: "Descrição",
          handle: "Apelido",
          chooseHandle: "Escolha um apelido",
          knownAs: "Atualmente você é conhecido como:",
          wouldYou: "Você gostaria de criar um apelido?",
          registerNew: "Criar Novo",
          recommended: "Páginas Recomendadas para Seguir",
          avatar: "Escolha uma imagem de perfil",
          chooseAvatar: "Escolher Imagem de Perfil",
          discoverCallOut: "Explore as Listagens e Páginas do OpenBazaar",
          Finished: "Finalizado"
        },
        guidStillCreating: {
          HangTight: "Aguarde alguns instantes...",
          YourPersonal: "As suas chave pessoais o seu ID do OpenBazaar estão sendo gerados. O processo deve levar cerca de 30 segundos para finalizar.\n\nAssim que o processo for finalizado, você será automaticamente conectado à rede.",
          LookingFor: "Quer fazer alguma coisa nesse intervalo? Leia o <a class=\"js-externalLink\" href=\"https://blog.openbazaar.org/\">blog do OpenBazaar</a>."
        },
        walletProviders: {
          ExchangeAndWallet: "Exchange e Carteira",
          WalletOnly: "Somente Carteira",
          CoinbaseTagline: "A maneira mais popular do mundo de se comprar, vender e usar bitcoin.",
          SamouraiTagline: "Carteira móvel segura. Com ênfase em privacidade.",
          AirbitzTagline: "Privacidade. Segurança. Autonomia. Descentralizada.",
          BreadwalletTagline: "Se conecta diretamente à rede bitcoin, sem servidores. Simplicidade com o máximo de segurança.",
          RushWalletTagline: "Receba um endereço Bitcoin de maneira fácil e rápida em seu navegador.",
          MyceliumTagline: "Uma das carteiras Bitcoin mais antiga no mercado, mais segura e mais confiável.",
          CoinkiteTagline: "A Carteira Bitcoin Mais Poderosa de Todas",
          BlockchaininfoTagline: "A carteira bitcoin mais popular do mundo. Mais segura, Mais Amigável, Mais Fácil.",
          DuoMoneyTagline: "Carteira em Euros para pagamentos Bitcoin ridiculamente fáceis. Um OpenBazaar que até a sua avó vai saber usar.",
          BitGoTagline: "A carteira bitcoin mais segura do mundo. Usada pelas maiores empresas de Bitcoin."
        },
        softwareUpdate: {
          updateAvailable: "Atualização do OpenBazaar Disponível",
          installUpdate: "Instalar Atualização",
          dismiss: "Ignorar"
        },
        buyFlow: {
          PayForOrder: "Pagar o Pedido",
          NeedTempAddress: "Eu preciso de um endereço Bitcoin temporário",
          NeedTempAddressHelper: "Por favor adicione aos favoritos essa url do seu endereço Bitcoin temporário",
          CantFindAddress: "Não consigo encontrar meu endereço bitcoin",
          BitcoinWallet: "Carteira Bitcoin",
          ModeratedPaymentDescription: "O seu pagamento é mantido em uma carteira segura até que o vendedor cumpra a sua parte do acordo. Se surgir algum problema, um Moderador irá ajudar.",
          ModeratorFeeHelper: "O moderador pode cobrar uma taxa, mas somente se surgir uma disputa.",
          ModeratedPayment: "Pagamento Moderado",
          DisputeFee: "Taxa de disputa",
          HaveWallet: "Você tem uma carteira Bitcoin?",
          QuickSetup: "Leva apenas alguns minutos para criar uma",
          CreateWallet: "Criar uma Carteira",
          DirectPaymentDescription: "Os fundos são enviados diretamente ao vendedor. Use apenas em compras de pequeno valor ou quando você estiver comprando de um vendedor de confiança.",
          DirectPayment: "Pagamento Direto",
          SendDirectlyTo: "Enviar um pagamento direto para %{handle}",
          MustAddAddress: "Você precisa adicionar um endereço de entrega",
          VendorShipsTo: "Envia para",
          DoesNotShipHere: "Entrega não disponível para essa região",
          Send: "Enviar",
          BTCto: "BTC para",
          SendBTCtoAddress: "Enviar %{amount} BTC para",
          OpenAddress: "Abrir na Carteira Local",
          CopyAddress: "Copiar para a Área de Transferência",
          RefreshPayment: "Atualizar Status do Pagamento",
          summaryMsg1: "O seu pagamento foi enviado para %{recipient}",
          summaryMsg2: "O tempo de processamento estimado de seu pedido é de",
          summaryMsg3: "Você pode verificar o status do seu pedido na sua",
          purchasesPage: "página de compras",
          returnAddress: "Endereço de Devolução",
          moderatorPaymentDisclaimer: "Pago do total se a transação terminar em uma disputa.",
          directPaymentDisclaimer: "Seja cuidadoso ao usar o pagamento direto, pois as transações são irreversíveis",
          paymentSent: "Pagamento Enviado!",
          total: "Total"
        },
        chat: {
          noSearchResultsFound: "Nenhum resultado foi encontrado"
        },
        serverConnectModal: {
          statusTryingToConnect: "Tentando conectar ao seu servidor",
          statusConnected: "Conectado",
          statusFailedConnection: "Não foi possível conectar ao seu servidor",
          statusFailedAuthentication: "Falha na autenticação",
          statusTooManyAttempts: "Muitas tentativas de login sem sucesso",
          serverConfiguration: "Configuração do Servidor",
          connecting: "Conectando",
          intro: "O OpenBazaar é projetado para permitir que você hospede o seu servidor separadamente do cliente. Por padrão, o seu servidor será executado localmente, mas você podecally, but you can override it below.",
          serverIP: "IP do Servidor",
          restApiPort: "Porta do Rest API",
          websocketApiPort: "Porta do Websocket API",
          heartbeatSocketApiPort: "Porta do Heartbeat socket",
          username: "Usuário",
          password: "Senha",
          restoreDefaults: "Restaurar padrões",
          saveChanges: "Salvar Modificações",
          retry: "Tentar novamente",
        } 
        },
        
        {
         langName: "Українська (Ukrainian)",
         langCode: "uk",
         /*
  
          Translator: Loderunner2, Bitcoin.ua
          02/28/2016: ~ 12 untranslated strings
  
          Use capitalized keys for widely reused text that must be capitalized
  
          */
         IHaveAWalletNow: "Ваш гаманець зареєстровано", 
         Next: "Далі",
         IAgree: "Згоден",
         Back: "Назад",
         EnterMessage: "Введіть повідомлення...",
         Reload: "Перезавантажити",
         You: "Ви",
         Skip: "Пропустити",
         Done: "Готово",
         Navigation: "Навігація",
         Cancel: "Скасувати",
         ClosingOpenBazaar: "Закрити (Сторінка буде недоступна онлайн)", 
         Minimize: "Згорнути",
         Maximize: "Розгорнути",
         Close: "Закрити",
         Yes: "Так",
         No: "Ні",
         of: "із",
         Sell: "Продати",
         New: "Новий",
         Excellent: "Відмінно",
         Good: "Добре",
         Poor: "Погно",
         SKU: "Номер Товару",
         Refurbished: "Відремонтованый",
         Physical: "Фізичний товар",
         Digital: "Цифровий товар",
         Service: "Послуга",
         Visit: "Переглядів",
         Item: "Штук",
         Items: "Штук",
         Stores: "Магазини",
         Follow: "Слідкувати",
         Feed: "Лента",
         FeedPlaceholder: "Всі магазини за котрими ви слідкуєте",
         ViewListing: "Відобразити перелік",
         Unfollow: "Не слідкувати",
         About: "Про нас",
         NoDescriptionAdded: "Опис не знайдено ...",
         NoListings: "Товари відсутні",
         CoverPhoto: "Головне зображення",
         AboutEmpty: "Опис відсутній ...",
         Followers: "Слідкують за вами",
         Following: "Ви слідкуєте",
         Message: "Повідомлення",
         Messages: "Повідомлення",
         Store: "Магазин",
         Edit: "Редагувати",
         Used: "Був у використанні",
         Delete: "Видалити",
         DontDelete: "Не видаляти",
         ConfirmDelete: "Так, знищити",
         Website: "Веб-сайт",
         Guid: "OpenBazaar ID", //notTranslated
         Welcome: "Вітаю",
         CreateStore: "Відкрити магазин",
         GoToMyPage: "Моя сторінка",
         SearchForItemsPlaceholder: "Введіть #games, #shoes або будь який тег #tag...",
         SearchForPagesPlaceholder: "Пошук за назвою або словом...",
         SearchFeedPlaceholder: "Пошук за словом ...",
         SearchForFollowersPlaceholder: "Пошук за ім'ям ...",
         SearchForUsersPlaceholder: "Пошук за ім'ям або OpenBazaar ID",
         SearchOnUserStorePlaceholder: "Введіть назву...",
         EstDeliveryDomesticPlaceholder: "3-5 Робочих Днів",
         EstDeliveryInternationalPlaceholder: "7-15 Робочих Днів",
         OrderProcessingTimePlaceholder: "Вкажіть час за який ви відправите замовлення",
         TermsAndConditionsPlaceholder: "Опишіть ваші правила та умови співпраці ...",
         TitlePlaceholder: "Вкажіть назву",
         DescriptionPlaceholder: "Додайте опис...",
         ReturnPolicyPlaceholder: "Умови повернення товару...",
         CategoryPlaceholder: "Оберіть категорію",
         CategoryHelperText: "Категорії що використовуються для сортування товарів вашого магазину.",
         KeywordsHelperText: "Додавання тегів полегшує пошук товарів, та збільшує продажі.",
         ExpirationDateHelperText: "Оберіть дату для автоматичного зняття з продажу.",
         ClearExpirationDate: "Дата зняття з продажу",
         ReturnPolicy: "Умови повернення товару",
         TermsAndConditions: "Правила роботи магазину",
         Photos: "Зображення",
         Added: "Додано",
         Categorization: "Ктегорізація",
         Expiration: "Дата закінчення продажу",
         Search: "Пошук",
         Email: "E-Mail", //notTranslated
         Facebook: "Сторінка Facebook",
         Instagram: "Сторінка Instagram",
         Twitter: "Twitter", //notTranslated
         PGPKey: "PGP Ключ",
         Snapchat: "Snapchat", //notTranslated
         BUYNOW: "Купити негайно",
         Description: "Опис",
         Reviews: "Відгуки",
         Shipping: "Доставка",
         Addresses: "Адреса",
         NewAddress: "Нова адреса",
         CurrentAddress: "Дійсна адреса",
         Returns: "Повернення",
         ReturnsPolicy: "Умови повернення товару",
         Ampersand: "&", //notTranslated
         Tags: "Tags, Теги",
         Keywords: "Пошукові слова",
         ShipsFrom: "Доставка з",
         ShipsTo: "Країни доставки",
         Optional: "Додатково",
         Customize: "Налаштувати",
         Save: "Зберігти",
         Changes: "Зміни",
         SaveChanges: "Зберігти зміни",
         YourName: "Ваше ім'я",
         BitcoinReturnAddress: "Біткойн-адреса для повернення коштів",
         BitcoinReturnAddressPlaceholder: "Введіть Біткойн-адресу",
         BitcoinReturnAddressInfo: "В разі повернення коштів, вони будуть надіслані на цю адресу, вона має бути постійною.",
         LocalCurrency: "Ваша валюта",
         TimeZone: "Часовий пояс",
         ShipToName: "Ім'я",
         ShipToStreet: "Вулиця",
         ShipToCity: "Місто",
         ShipToState: "Країна/Провінція/Місто",
         ShipToPostalCode: "Почтовий Індекс",
         PostalCode: "Почтовий Індекс",
         ShipToCountry: "Країна",
         EnableNotifications: "Повідомлення",
         EnableSSL: "Включити SSL",
         LibbitcoinServerAddress: "Адреса сервера Libbitcoin",
         ServerIPPort: "Сервер IP:Port",
         All: "Всі",
         Name: "Ім'я",
         Price: "Ціна",
         Available: "Доступно",
         Type: "Тип",
         Condition: "Стан",
         NSFW: "18+ (для Дорослих)",
         Select: "Вибір",
         Social: "Соціальний",
         Theme: "Тема оформлення",
         Listing: "Товар",
         Listings: "Товари",
         ViewPage: "Дивитись сторінку",
         Pages: "Сторінки",
         Page: "Сторінка",
         Language: "Мова",
         Reset: "Сброс",
         Local: "Локльний",
         Domestic: "В межах країни",
         Location: "Місцезнаходження",
         International: "Міжнродний",
         Time: "Час",
         Free: "Вільний",
         Category: "Категорія",
         ProcessingTime: "Днів на підготовку відправки",
         SelectPhotos: "Оберіть Фото",
         DragOrUploadPhotos: "Претащіть або оберіть фото",
         ExpirationDate: "Зкінчуется продаж",
         UploadCoverPhoto: "Завантажити головне фото",
         ShortDescription: "Стислий опис",
         UpTo140Characters: "До 140 знаків",
         PrimaryColor: "Головний колір",
         SecondaryColor: "Додатковий колір",
         TextColor: "Колір тексту",
         CoverPhotoButton: "Оберіть головне фото",
         AboutPlaceholder: "Детальний опис",
         BackgroundColor: "Фоновий колір",
         NotificationFollow: "Слідкує за вами",
         NoNotifications: "Нема повідомлень",
         WelcomeToYourPage: "Вітаємо вас",
         SearchForCategory: "Пошук Категорії",
         Moderators: "Модератори",
         CurrentModerators: "Дійсні модертори",
         AddModerators: "Додати модератора",
         DeselectToRemoveModerator: "Оберіть модератора для того щоб видалити.",
         SelectToAddModerator: "Оберіть модеретора для то щоб додати його.",
         Categories: "Категорії",
         UpTo3: "До 3-х",
         AboutYourStore: "Опис вашого магзину",
         PaymentType: "Засіб плтежу",
         ShipTo: "Доставка",
         FreeShipping: "Безкоштовна доставка",
         OrderDetails: "Подробиці замовлення",
         OrderSummary: "Інформація по замовленню",
         AllListings: "Всі позиції",
         ComingSoon: "Скоро",
         PaymentPending: "Платіж обробляється",
         FinalizePurchase: "Підтвердити Покупку",
         LoadingImage: "Завантаження...",
         UploadAvatar: "Оберіть Аватарку",
         SaveAvatar: "Зберігти Аватарку",
         NewAvatar: "Обрати нову аватарку",
         NewCoverImage: "Обрати головне фото",
         Loading: "Завантаження...",
         Purchases:"Покупки",
         Sales: "Продажі",
         Cases: "Кейсы",
         Enter: "Enter", //notTranslated
         Discover: "Перегляд",
         Block: "Зблокувати",
         Unblock: "Розблокувати",       
         Blocked: "Заблокованно",
         Advanced: "Додаткові налаштування",
         General: "Загальні",
         AllItems: "Всі інструменти",
         DomesticShippingPrice: "Доставка в межах країни",
         InternationalShippingPrice: "Ціна міжнародної доставки",
         MinimumIs: "Мінімум",
         Visibility: "Видимість",
         Title: "Назва",
         DigitalItem: "Цифровий товар",
         PhysicalItem: "Фізичний товар",
         DomesticShippingTime: "Термін доствки в межах країни",
         InternationalShippingTime: "Міжнародний термін доставки",
         DisplayNSFWcontent: "Відібржати NSFW контент?",
         Basic: "Базовий",
         Content: "Контент",
         StandardThemes: "Стандартні теми",
         NoPhotosAdded: "Фотографії не завнтежені",
         Summary: "Загалом",
         Funds: "Кошти",
         Discussion: "Дискусія",
         Quantity: "Кількість",
         ShippingTo: "Доставка",
         ModeratedBy: "Відмодеровано",
         Submit: "Відправити",
         maxLength20: "Максимум 20 знаків...",
         maxLength80: "Максимум 80 знаків...",
         maxLength200: "Максимум 200 знаків...",
         StoreModeratorsOptional: "Модертори мгазину (Не Обов'язково)",
         Searchformoderators: "Пошук модераторів",
         Contributors: "Підтримали", 
         Support: "Підтримка",
         Licensing: "Ліцензування",
         Forward: "Далі",
         On: "On", //notTranslated
         Off: "Off", //notTranslated
         ClickToChange: "Натисніть для змін",
         NotProvided: "Не вказано", 
         NotFollowingAnyone: "Ні за ким не слідкуете",
         NoFollowers: "За вми ніхто не слідкує",
         Moderator: "Модератор",
         Firewall: "Firewall",  //notTranslated
         ReadOnly: "(Тільки перегляд)",
         HandleResolver: "Handle Resolver",  //notTranslated
         moderatorSettings: { 
           ProvideResolution: "Забезпечити перегляд скарги",
           ServiceFee: "Вартість послуги",
           ServiceFeeNote: "Процент від сумми змовлення (max 25, Крок 0.01, min 0)"
         },
         BecomeModerator: "Стати Модертором",
         EditModerator: "Налаштування Модертора",
         transactions: {
           OrderDetails: "Інформація Замовлення",
           SoldBy: "Продано",
           PurchasedBy: "Куплено",
           searchByOrder: "Пошук за номером замовлення",
           sortByStatusAll: "Всі",
           sortByStatus0: "В Обробці (Очікування оплати)",
           sortByStatus1: "Сплачено (Замовлення обробляеться)",
           sortByStatus2: "Підтверджені/Відправлені",
           sortByStatus3: "Виконано (Кошти вивільнені)",
           sortByStatus4: "Оскаржені",
           OrderID: "Номер замовлення",
           OrderDate: "Дата змовлення",
           OrderStatus: "Статус замовлення",
           OrderStatus0: "В Обробці (Очікування оплати)",
           OrderStatus1: "Сплачено (Замовлення обробляеться)",
           OrderStatus2: "Підтверджено/Відправлено",
           OrderStatus3: "Виконано (Кошти вивільнені)",
           OrderStatus4: "Оскаржено",
           OrderTotal: "Загалом заказів",
           OrderTotalInBTC: "Загалом BTC",
           PaymentProtection: "Захист оплати",
           ShipTo: "Надіслати за адресою",
           ConfirmOrder: "Підтвердити замовлення",
           ReceivingAddress: "Адреса отримувача коштів",
           RecievingAddressPlaceholder: "Bitcoin адреса на котру будуть надходити кошти",
           Shipper: "Компанія що виконує доставку",
           ShipperPlaceholder: "Назва компанії шо виконує доставку",
           TrackingNumber: "Номер відстеження відправлення",
           TrackingNumberPlaceholder: "Номер відстеження відправлення",
           EstimatedDelivery: "Очікувана доставка",
           EstimatedDeliveryPlaceholder: "Приблизна дата надходження замовлення",
           URL: "URL адреса",
           URLPlaceholder: "Посилання на завантаження, або додаткову інформацію", 
           Password: "Пароль",
           PasswordPlaceholder: "Пароль необхідний для завантеження, якщо є",
           DirectTransaction: "Прямий переказ",
           ModeratedTransaction: "Угода що модеруется",
           Seller: "Продавець",
           Buyer: "Покупець",
           transferReceipt: "Підтвердження переказу (інформація)",
           copyTxid: "copy tx ID", //notTranslated
           Close: "Закрити",
           FundOrder: "Сплатити замовлення",
           sortByDateNewest: "За датою, Новіші",
           sortByDateOldest: "За датою, Старіші",
           PayPurchase: "Оплатити це замовлення", 
           CompleteOrder: "Змовлення виконано",
           MarkAsShipped: "Змовлення відправлено",
           RateThisTransaction: "Оцінити це замовлення",
           TransactionReview: "Відгук про замовлення",
           OverallRating: "Загальний рейтинг",
           Quality: "Якість",
           Description: "Відповідність Опису",
           DeliveryTime: "Час доставки",
           CustomerService: "Підтримка та зворотній зв'язок",
           Review: "Відгук",
           ReviewPlaceHolder: "Ваш відгут про це замовлення",
           NoneSent: "Не відпрвлене"
         },
         errorMessages: {
           saveError: "Не можливо зберігти інформацію.",
           getError: "Не можливо отримати інформцію.",
           missingError: "Деякі поля заповнені не вірно.",
           serverError: "Помилка зв'язку з сервером.",
           userError: "Не можу знайти інформацію за цим ID.",
           userNotFoundError: "Інформація користувача не доступна. Можливо він офлайн.",
           notFoundError: "Не можу завантажити інформцію для:",
           socketError: "URL для WebSocket втрачено. Підєднуюсь за стандартною адресою ws://localhost:18466",
           contractError: "Цей товар не можна придбати",
           sellerError: "Сервер продавця відхилив запит на придбання",
           checkPurchaseData: "Будь-ласка перевірте інформацію по замовленню, кількість товару, адресу, та інше...",
           pageUnavailable: "Ця сторінка зараз не доступна.",
           badHandle: "Не правильний OpenBazaar ID"
         },
        aboutSection: {
           about: "<p>OpenBazaar це мережа з користувачів котрі куплють та продають товари та послуги безпосередньо один одному, використовуючи Біткоін. Ця мережа не має власника, не управляєтся будь якою організаціею, являється розподіленою децентралізованою системою що існує в мережі.</p><p>OpenBazaar программа з відкритим кодом та MIT ліцензіею. Ви можете переглянути код за посиланням <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">Github</a>.</p><p>OpenBazaar це колективний поект, і ми запрошуемо всіх до участі у його розробці до каналу <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">Slack</a>, або <a href=\"http://www.reddit.com/r/openbazaar\" target=\"_blank\">subreddit</a>.</p><p>Якщо вам потрібна допомога, прочитайте OpenBazaar version 1.0 <a href=\"\" target=\"_blank\">інструкцію</a>.</p><p>Якщо у вас залишились питання, звертайтесь до служби підтримки (Англійською) <a href=\"https://openbazaar.zendesk.com/hc/en-us/articles/203219995-Question-not-answered-Read-this-post\" target=\"_blank\">support desk</a>.</p>",
           contributors: "<p>OpenBazaar став можливим завдяки міжнародному співтовариству розробників та волонтерів, що витратили свій час на розробку проекту, та допомогли зробити торгівлю вільною. Це частковий список тих хто допоміг проекту написанням коду та іншою допомогою</p><ul><li>Giannis Adamopoulos</li><li>Ariadni-Karolina Alexiou</li><li>Tikhon Bernstam</li><li>Brad Burnham</li><li>George Chatzisofroniou</li><li>Patrick Connolly</li><li>Chris Dixon</li><li>Simon de la Rouviere</li><li>Braden Glasgow</li><li>Brian Hoffman</li><li>Ben Holden-Crowther</li><li>Joshua Jeffryes</li><li>Nikolas Korasidis</li><li>Regan Lawton</li><li>Sami Lehtinen</li><li>Angel Leon</li><li>Joye Lin</li><li>Joel Monegro</li><li>William Mougayar</li><li>Jonas David Nick</li><li>Onename</li><li>Chris Pacia</li><li>Sam Patterson</li><li>Chara Podimata</li><li>Samuel Reed</li><li>Washington Sanchez</li><li>Aeron Paul Sioson</li><li>Adrian Smith</li><li>Adam Snodgrass</li><li>Thomas Stilwell</li><li>Amir Taaki</li><li>Mike Wolf</li><li>Dionysis Zindros</li><li>secret-bitcoin-login</li><li>Rav3nPL</li><li>El--Presidente</li><li>Tinytin</li><li>ULRichard</li></ul>", 
  
           support: "<p>Ви можете допомогти OpenBazaar в декілька способів та зробити торгівлю дійсно вільною.</p><p>Продаж або придбання товарів та послуг в мережі допомагає зростанню та розвитку товариства та робить платформу більш цікавою для нових користувачів. Порадьте тим хто приймає Bitcoin в бізнесі використовувати плтформу, допоможіть розповсюдженням інформації про можливості платформи, P2P торгівлі.</p><p>Якщо ви розробник, відвідайте нашу сторінку <a href=\"https://github.com/OpenBazaar/\" target=\"_blank\">Github</a>, можливо ви зможете допомогти чимось. Під допомогою з розробкою ядра, ми надіємося що бездозвільна та відкрита природа проекту, дасть вам змогу будувати нові сервіси поверх вже існуючої мережі.</p><p>Ткож вы можете <a href=\"https://blockchain.info/address/3MXYUBLWNETa5HTewZp1xMTt7AW9kbFNqs\" target=\"_blank\">допомогти з розробкою надавши трішки Bitcoin</a> що будуть використані для участі в конференціях, та як нагороди розробникам, та на рекламу та просування OpenBazaar.</p><p>Будьласка <a href=\"https://openbazaar-slackin-drwasho.herokuapp.com/\" target=\"_blank\">приєднуйтесь до Slack</a> якщо ви маєте ідеї для OpenBazaar, або якщо маєте питання до ключових розробників.</p>",
           
   	  licensing: "<p>OpenBazaar це програма з відкритим кодом та ліцензіею MIT. Ця ліцензія  дозволяє, та розроблена для того щоб дозволити людям вільно використовувти код прогрмми для інших відкритих проектів, іншого програмного забезпечення. Повний текст ліцензії нведено нижче.</p><h4>MIT Ліцензія (MIT)</h4><h5>Права користування &#169 2015 OpenBazaar розробників.</h5><p>Ціею ліцензіею надано дозвіл, безкоштовно, для будь якої особи отримувати копію ціеї прогрми та асоційовних файлів документації. (the \"Software\"), використовувати програму без будь яких обмежень, використання, копіювання, модифікації, злияння, публікації, розповсюдження, субліцензування, продажу копій, за умови дотримання наступних вимог:</p><p>Наведенні вище прва користування та дозвіл на використання має бути зазначений в кожній копії программи або її частині.</p><p>ПРОГРАММА НАДАЄТЬСЯ \"ЯК Є\", БЕЗ БУДЬ ЯКИХ ГАРАНТІЙ, ЯВНИХ АБО УЯВНИХ, БЕЗ ГАРАНТІЇ НА ТОВАРИ ТА ПОСЛУГИ, БЕЗ ГРАНТІЇ ПРИДАТНОСТІ ДЛЯ ВИКОРИСТАННЯ В БУДЬЯКИХ ЦІЛЯХ, АБО НЕ ПОРУШЕННЯ ВАШИХ ПРАВ. АВТРОРИ ПРОГРММИ НІ В ЯКОМУ РАЗІ НЕ НЕСУТЬ ВІДПОВІДАЛЬНОСТІ ЗА БУДЬ ЯКІ ПРЕТЕНЗІЇ, ШКОДУ, ВТРАЧЕНІ КОШТИ, ТА ІНШЕ. ПРОГРАММА НАДАЕТСЯ БЕЗ ГАРАНТІЙ В РАЗІ ВИКОРИСТАННЯ ПРОГРАМИИ, ПРАВОПОРУШЕННЯ АБО ІНШИМ ЧИНОМ, ВИКЛИКАНИМ, ПРОГРММОЮ АБО ІНШИМИ УМОВАМИ В ПРОГРАММІ. Ви ВИКОРИСТОВУЄТЕ ПРОГРАММУ НА ВЛАСНУ ВІДПОВІДАЛЬНІСТЬ ТА РИЗИК. ТА МАЄТЕ ВЛАСНОРУЧ НЕСТИ ВІДПОВІДАЛЬНІСЬ ЗА ДїЇ СПРИЧИНЕНІ ПРОГРАМОЮ АБо В ПРОГРАМІ.</p><h4>Бібліотеки</h4><p>Нступні бібліотеки були використані в OpenBazaar:</p><ul><li>protobuf</li><li>Twisted</li><li>txJSON-RPC</li><li>txrudp</li><li>pyelliptic</li><li>pystun</li><li>bitcoin</li><li>gnupg</li><li>pynacl</li><li>txrestapi</li><li>autobahn</li><li>python-obelisk</li><li>requests</li><li>backbone</li><li>underscore</li><li>moment.js</li><li>jquery</li><li>electron.js</li><li>backbone.linear</li><li>list.js</li><li>polyglot.js</li><li>taggle.js</li><li>safestart</li></ul>",
	 },
           
           saveMessages: {
           Saved: "Збереженно",
           SaveSuccess: "Ваші зміни збереженно."
         },
         discover: {
           searchDefaultText: "Сканую вашу мережу...",
           searchingText: "Сканую вашу мережу на ",
           noResults: "Не знайдено товарів в вашій мережі познчених як "
         },
         filters: {
           pagesAllTypes: "Всі типи",
           pagesStores: "Магазини",
           pagesMods: "Сервіси модератора",
           pagesBasic: "Звичайні користувачі",
           listingsCurated: "Магазини що я слідкую",
           listingsAll: "Зі всіх магазинів",
           categoryAll: "Всі"
         },
         nav: {
           searchPlaceholder: "Введіть OpenBazaar ID або тег...",
           myPage: "Моя сторінка",
           customizePage:"Налаштувати сторінку",
           sellItem:"Додати товар",
           createListing:"Створити товар",
           purchases:"Покупки",
           sales:"Продажі",
           cases:"Історія",
           notifications:"Повідомлення",
           settings:"Налаштування",
           about:"Про OpenBazaar",
           support:"Підтримай OpenBazaar"
         },
         onboarding: {
           intro: "Конфігурація OpenBazaar",
           Introduction: "Ознайомлення",
           IntroductionBody: "OpenBazaar - це вільний, соціальний, децентралізований, глобалльний, P2P ринок товарів та послуг. \n\n Це технологія торгівлі за аналогом eBay, де довіра до продавця грунтуєтся на його попередній репутації та відгуках про нього. Данні в мережі OpenBazaar, передаются безпосередньо між учасникам та зберігаються у самих учасників за технологіею P2P (Torrent). OpenBazaar являєтся децентралізованим та глобальним ринком, що не має комісій та зборон на товари та послуги, це программа з відкритим кодом що створена суспільно та не має має власника. \n\n Переклад виконано Openbazzare.org.ua та Bitcoin.ua. \n\n Користування OpenBazaar, може виглядати та здійснюватись трошки інакше від того як ви звикли купляти та продвати товари, тож будь ласка будьте стриманими, поки ви звикнете та навчитесь.",
           Theme: "Оберіть дизайн вашої сторінки",
           chooseLanguage: "Оберіть мову",
           contributors: "%{smart_count} вкладчик |||| %{smart_count} вкладчиків",
           configure: "Налаштуйте ваш досвід",
           disclaimer_title: "Відповідальність та Використання",
           disclaimer_body: "ПОПЕРЕДЖЕННЯ - Шановні Українці. \n\n НЕ Використовуйте OpenBazaar для продажу або придбання товарів що заборонені законодавством, або можуть порушувати норми моралі. Ви особисто несете відповідальність за всі ваші дії. \n\n Майте на увазі що система Біткоін та OpenBazaar забезпечують лише умовну анонімнісмть, та потребують додаткових заходів для забезпечення повної анонімності. Ці сиситеми зберігають всю історію транзакцій, що відкрита та може бути переглянута будьким. Всі ваші дії що були вчинені анонімно зараз, потенційно можуть бути відстежені в майбутньому, та не лише через вас, а й через дії тих з ким ви торгуєте. \n\n Користувачі OpenBazaar мають знати та дотримуватись зконів тих територій на яких здійснюють торгівлю. Та несуть власну відповідальністю за порушення законів. Розробники OpenBazaar, не несуть відповідальність за використання программи в протиправних цілях. Ви маєте самостійно переконатися в вашому праві, купувати чи продавати той чи інший товар чи послугу, та можливості доставки товару в ту чи іншу країну, згідно її законодавства. \n\n Спільнота OpenBazaar постійно працює для вдосконалення якості використання, вільної платформи для світової торгівлі. Але, так як і з будь яким програмним продуктом можливі помилки в роботі прогрмми. Розробники не несуть відповідальності з грошові втрати повязані з використанням прогрмми OpenBazaar. Використовуючи программу OpenBazaar, ви чините на свій власний роззсуд, та власну відповідальність, программа надается як є, без зобовязань. Якщо це не є прийнятним для вас, відмовтесь від використання OpenBazaar.",
           
	  	   yourCountry: "Оберіть вашу країну",
           localCurrency: "Оберіть валюту",
           LanguagePlaceholder: "Введіть мову",
           CountryPlaceholder: "Введіть країну",
           CurrencyPlaceholder: "Введіть валюту",
           TimezonePlaceholder: "Введіть часовий пояс",
           ShortDescriptionPlaceholder: "Напишіть щось про себе ... (160 літер максимум)",
           timeZone: "Оберіть часовий пояс",
           yourDetails: "Вкажіть вашу інформацію",
           yourDescription: "Про Вас",
           handle: "Логін",
           chooseHandle: "Вкажіть Логін (Англійською)",
           knownAs: "Зараз ваше ім'я:",
           wouldYou: "Ви бажаєте зарееструвати легкий логін?",
           registerNew: "Зареєструвати новий",
           recommended: "Рекомендована підписка на ці магазини",
           connectExisting: "Підключити існуючий",
           avatar: "Встановити аватарку",
           chooseAvatar: "Обрати аватарку",
           discoverCallOut: "Пошук сторінок на OpenBazaar (Англійською)",
           Finished: "Завершено"
         },
         buyFlow: {
           DirectPayment: "Прямий платіж",
           SendDirectlyTo: "Відправити прямий платіж %{handle}",
           MustAddAddress: "Ви маєте вказти адресу доставки",
           VendorShipsTo: "Можлива відправка в ці країни",
           DoesNotShipHere: "В ці країни доставка не здійснюється",
           Send: "Відправити",
           BTCto: "BTC to", //notTranslated
           SendBTCtoAddress: "Надіслати %{amount} BTC",
           OpenAddress: "Відкрити адресу в локальному гаманці Bitcoin",
           CopyAddress: "Скопіювати в буфер обміну",
           RefreshPayment: "Оновити статус платежу",
           summaryMsg1: "Ваш платіж надіслано %{recipient}",
           summaryMsg2: "Очікуваний час обробки замовлення складє",
           summaryMsg3: "Щоб перевірити статус змовлення, зайдіть в",
           purchasesPage: "Сторінка покупок",
           returnAddress: "Адреса Повернення",
           moderatorPaymentDisclaimer: "Використовується лише для спірних транзакцій",
           directPaymentDisclaimer: "Будьте обачні при відправці коштів на пряму, повернути кошти не можливо.",
           directPaymentTo: "Прамий плтіж",
           paymentSent: "Платіж надіслно!",
           total: "Загалом"
         },
         chat: {
           noSearchResultsFound: "Нічого не знайдено" 
         }        
       }
      ] 
  }
});
