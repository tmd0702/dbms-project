const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
const http = require('http');

class WebsiteServer {
    #websiteServer;

    constructor() {
        this.#websiteServer = {
            app: express(),
            loginPageRoute: '/login',
            extractQueryRoute: '/extract_query',
            queryResultRoute: '/query_result',
            knowledgeBaseRoute: '/knowledge_base',
            port: '8080',
            hostName: 'localhost'
        };
        const websiteServer = this;
        this.#websiteServer.server = http.createServer(this.#websiteServer.app);
        this.#websiteServer.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', `http://${websiteServer.getWebsiteServer().hostName}:${websiteServer.getWebsiteServer().port}`);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
        // this.#websiteServer.app.use(requestIp.mw());
        this.#websiteServer.app.use(express.static(__dirname + '/assets'));
        this.#websiteServer.app.use(express.static(__dirname + '/views'));
        // this.#websiteServer.app.use(cors({
        //     origin: `http://${this.#websiteServer.hostName}:8081`
        // }));
        this.#websiteServer.server.listen(this.#websiteServer.port, () => {
            console.log(`Website Server listened on port ${this.#websiteServer.port}`);
        })
    }
    getWebsiteServer() {
        return this.#websiteServer;
    }
    handleLoginPage() {
        this.#websiteServer.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/views/login.html');
        });
    }
    handleViewPage() {
        this.#websiteServer.app.get('/view', (req, res) => {
            res.sendFile(__dirname + '/views/view.html');
        });
    }
    test() {
        this.#websiteServer.app.get('/login', (req, res) => {
            console.log('abcdefghijklmnopqrstuvw');
        });
    }
    handleSignUpPage() {
        this.#websiteServer.app.get('/sign_up', (req, res) => {
            res.sendFile(_dirname + '/sign_up.html');
        })
    }
    handleIndexPage() {
        this.#websiteServer.app.get('/sign_up', (req, res) => {
            res.sendFile(_dirname + '/index.html');
        })
    }
    run() {
        this.handleLoginPage();
        this.handleViewPage();
        this.test();
    }
}
function run() {
    const websiteServer = new WebsiteServer();
    websiteServer.run();
}
run();