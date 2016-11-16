# OpenBazaar-Client

[![Build Status](https://travis-ci.org/OpenBazaar/OpenBazaar-Client.svg)](https://travis-ci.org/OpenBazaar/OpenBazaar-Client)
[![Slack Status](http://slack.openbazaar.org/badge.svg)](https://openbazaar-slackin-drwasho.herokuapp.com/)

You **must** be running the [OpenBazaar backend](https://github.com/OpenBazaar/OpenBazaar-Server) for the client to work! 
If you are using a remote server (a server on a different computer) your connection will fail on the first install, and you will need to enter the information for the remote server as a new connection.

Dependencies
-----------

- [NodeJS](https://nodejs.org/en/download/) v6.x
- Install via [Package Manager] (https://nodejs.org/en/download/package-manager/)
- Ensure that `npm` is added to your `PATH`!

Running
-------

1. Clone the client repository into a directory of your choice:
  - `git clone https://github.com/OpenBazaar/OpenBazaar-Client.git`
2. Navigate into the new folder created in (1)
  - `cd OpenBazaar-Client`
3. Install the client
  - `npm install`
4. Run the client
  - `npm start`

Remember you must be running the [OpenBazaar-Server](https://github.com/OpenBazaar/OpenBazaar-Server) for the client to function properly. If you want to access the test network (testnet), run the server using the `-t` flag (e.g. `$ python openbazaard.py start -t`). If your router blocks your port after starting and stopping the server, you can set your server to a new port with the '-p' flag (-p followed by a port number).

If the server component has not generated a GUID (which happens only once, when the server is first started), then the client will not fully start up until the GUID is created.

Current (v1 Mainnet) Release Tracker can be found here: [#965](https://github.com/OpenBazaar/OpenBazaar-Client/issues/965)

API Documentation
-----------
The client uses the following REST API calls.
- [GET calls](https://gist.github.com/drwasho/742505589f62f6aa98b4)
- [POST calls](https://gist.github.com/drwasho/bd4b28a5a07c5a952e2f)

Websocket API calls are yet to be documented.

Translations
-----------
Translators around the world are welcomed.

You can start translating at our Transifex project:

- https://www.transifex.com/ob1/openbazaar/

Many thanks!
