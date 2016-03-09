# OpenBazaar-Client

[![Build Status](https://travis-ci.org/OpenBazaar/OpenBazaar-Client.svg)](https://travis-ci.org/OpenBazaar/OpenBazaar-Client)
[![Slack Status](https://slack.openbazaar.org/badge.svg)](https://slack.openbazaar.org)

You **must** be running the [OpenBazaar backend](https://github.com/OpenBazaar/OpenBazaar-Server) for the client to work!

Dependencies
-----------

- [NodeJS](https://nodejs.org/en/) v4.x LTS
  - Linux: `sudo apt-get install nodejs-legacy`
  - OSX using [homebrew](http://brew.sh/): `brew install homebrew/versions/node4-lts`
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

Remember you must be running the [OpenBazaar-Server](https://github.com/OpenBazaar/OpenBazaar-Server) for the client to function properly. If you want to access the test network (testnet), run the server using the `-t` flag (e.g. `$ python openbazaard.py start -t`).

If the server component has not generated a GUID (which happens only once, when the server is first started), then the client will not fully start up until the GUID is created.

Current (v1 Mainnet) Release Tracker can be found here: [#965](https://github.com/OpenBazaar/OpenBazaar-Client/issues/965)

API Documentation
-----------
The client uses the following REST API calls.
- [GET calls](https://gist.github.com/drwasho/742505589f62f6aa98b4)
- [POST calls](https://gist.github.com/drwasho/bd4b28a5a07c5a952e2f)

Websocket API calls are yet to be documented.
