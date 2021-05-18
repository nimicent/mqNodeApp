# MQ Example Node App

Node example application using Axios, Express and IBM MQ messaging API to show interactivity with the messaging queue. 

You can use this application to send the requests to MQ and then see messages being posted and destroyed from the messaging queue management console on IBM Cloud. 

The messages on the queue stay put until they can be processed by other programs all around the world that may or may not be live at the moment those messages are on the queue. But those messages stay there and will be there for the other apps. MQ is for data that need is needing to be seen by other apps but might not be live/stable/running at the time the messages are processed. So they sit "on a queue" so to speak and will stay put and available at the ready for any other apps when they need/can process the messages.

## Installation

Requires [Node.js](https://nodejs.org/) v10+ and [IBM MQ](https://www.ibm.com/cloud/mq) service to run.

Create .env file to load environment variables.
```sh
MQ_USER=
MQ_PWD=
MQ_AUTH=
CSRF_TOKEN=
MQ_URL=
```
Install dependencies.
```sh
cd mqNodeApp-main
npm i
npm start
```
If you have MQ running, then you have Swagger docs live already. 
Point your browser to: `https://host:port/ibm/api/explorer`

For example, your URL could look like...
```sh
https://web-[MQ manager name]-8380.qm2.us-south.mq.appdomain.cloud/ibm/api/explorer
```
When asked to login, use the username you made for MQ instance and your API key and you should be all set.

## Deployment

Working on this section