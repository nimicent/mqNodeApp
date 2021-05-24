# MQ Example Node App

Node example application using Axios, Express and IBM MQ messaging API to show interactivity with the messaging queue. 

You can use this application to send the requests to MQ and then see messages being posted and destroyed from the messaging queue management console on IBM Cloud. 

The messages on the queue stay put until they can be processed by other programs all around the world that may or may not be live at the moment those messages are available on the queue. But those messages stay there and will be there for the other apps when those apps are ready for the messages. MQ is for data that needs to be seen by other apps but might not be live/stable/running at the time. So they sit "on a queue" so to speak to stay put and available at the ready for any other apps when those apps need/can process the messages.

## Installation

Requires [IBM MQ](https://www.ibm.com/cloud/mq) service to run.

Create .env file to load environment variables. Here are some example values.
```sh
MQ_USER= [your username you chose for your MQ service setup, for ex: 'juliagulia']
MQ_PWD= [your API key, for ex: '534543uhurifwbsudifhbcwerfw']
MQ_AUTH= [your bearer token]
CSRF_TOKEN= [CSRF token required for MQ, can be any value like 'value']
MQ_URL= [URL for MQ manager URL, for ex: 'https://web-mypersonalmqmanageryay-4fbi.qm1.us-south.mq.appdomain.cloud/ibmmq/rest/v2/messaging/qmgr/mypersonalmqmanageryay/queue/DEV.QUEUE.1/message']
```

MQ_USER= Your username you chose for your MQ service. 
MQ_
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