---
title: 'Swiss deals API'
image: '/2022/swiss-deals-api/swiss-deals-api-bg.webp'
# flags:
# - unlisted
summary: An API that aggregates the offers of the day
created: 2022-10-20
# updated: 2022-10-20
tags: ['api', 'go']
---

> Picture: Gaël G.

## Introduction

A friend of mine told me how he missed out on a fantastic offer on a gaming monitor he really wanted. Then, he wondered if there was a platform that collected the deals of the day on the online stores that do it. We can mention the website [piratesdesprix.ch](https://www.piratesdesprix.ch/) which lists different deals from several shops. However, they did not have the stores we were interested in, namely **QoQa**, **Digitec** and **Galaxus**. It is from here that I had the idea to create a small service that aggregates the deals of the day!

<div class="alert shadow-inner">
  <div>
    <span class="text-lg i-simple-icons-github !w-5 !h-5"></span>
    <div>
      <a href="https://github.com/gaelgoth/swiss-deals-api"><h3 class="font-bold my-0">gaelgoth/swiss-deals-api</h3></a>
      <div class="text-xs">Aggregate deals of the day from Digitec, Galaxus, QoQa</div>
    </div>
  </div>
</div>

## Building API with Golang

Used to create backend in Python or typescript/JavaScript, this is a good opportunity for me to try Golang. Before we start coding the API, we need to figure out how to get the information we need. Then we will set up the Go dev environnement. Finally, we will be able to retrieve data from **QoQa**, **Digitec** and **Galaxus**.

### Retrieve data

Let's do some reverse engineering to find the best way to get the information about the offer of the day.

Let's get started with **QoQa**. By analyzing the traffic when we load the page, we can easily notice the `http` request that serves us the promotion of the day.
![Get http deal from QoQa](/2022/swiss-deals-api/qoqa-http-product.webp 'Get http traffic')

Basically, we found out that the following Request URL give use the deals: `https://api.qoqa.ch/v2/websites/wwwqoqach/offer_preview`. The `wwwqoqach` identifier can be retrieved from the following endpoint: `https://api.qoqa.ch/v2/websites`

```bash
# get identifiers list
curl https://api.qoqa.ch/v2/websites | jq

# get current deals by replacing <identifier>
curl https://api.qoqa.ch/v2/websites/<identifier>/offer_preview
```

Unfortunately for Digitec and co, this is a different matter. The offer of the day is displayed via several GraphQL queries. I am not very familiar with GraphQL, so for Digitec the idea is to scrape the [page](https://www.digitec.ch/fr/liveshopping/81) that gives us the offer of the day.

### Golang frameworks

In a nutshell, we require web frameworks that support HTTP methods and HTML scraping in order to build this API. [Swiss Deals API](https://deals-api.gothuey.dev/) will based on [Fiber](https://github.com/gofiber/fiber) that is an [Express](https://expressjs.com/) inspired web framework written in Go. We'll utilize [Coly](https://github.com/gocolly/colly), an elegant scraper and crawler framework for Golang, to extract web site content. To power this API other [sub-tools](https://github.com/gaelgoth/swiss-deals-api/blob/4d95d7477ddd8176541f05d7a77dafd3f1320ccb/main.go#L3-L17) are exploited for swagger documentation, query caching and logging.

![How Swiss deals will work](/2022/swiss-deals-api/swiss-deals-diagramm.svg)

### Environnement

The development environment with Golang is relatively easy to set up. I tested several alternatives:

- **Makefile**: The startup task runs the command `go run main.go` and writes its process ID to PID_FILE.
- **Docker-compose.dev**: Run the Golang build inside a container coupled with [Air](https://github.com/cosmtrek/air) for hot reloading when editing the code from IDE
- **Air** (the easiest one): As described by his creator, just `air` command in your project root directory, leave it alone, and focus on your code.

Everything is ready, let's see what [Swiss Deals API](https://deals-api.gothuey.dev/) can accomplish after a few hours of code.

## Demo

At the time of writing, the API serves two groups of endpoints, "QoQa" and "Digitec".

```bash
$ curl https://deals-api.gothuey.dev/api/deals/digitec | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   389  100   389    0     0    805      0 --:--:-- --:--:-- --:--:--   805
{
  "store": "Digitec",
  "title": "Netgear RBK353 Orbi WiFi 6 Dual Band set de 3",
  "url": "https://www.digitec.ch/liveshopping/",
  "remaining_stock": 61,
  "stock": 150,
  "offer_price": 179,
  "regular_price": 267,
  "image_url": "https://www.digitec.ch/im/files/..."
}
```

You can interact with [Swiss Deals API](https://deals-api.gothuey.dev/) by consulting the Swagger documentation on <https://deals-api.gothuey.dev/swagger/index.html>.

## Final thoughts

I was able to learn Golang programming through this short project. Along with improving the quality of the code, my goal is to increase the variety of offers the API returns.

## Next steps

- [x] Set up a frontend to make access to deals more welcoming
- [ ] Improve errors handling
- [ ] Add deals from other online stores
  - [ ] piratesdesprix.ch
  - [ ] steg-electronics.ch
  - [ ] microspot.ch
  - [ ] ...
